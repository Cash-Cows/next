//types
import type { NetworkConfig } from 'modules/web3/types';
import type { FloorItem } from '../types';
//hooks
import useBuyItems from './useBuyItems';
//global
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useMintForm(
  address: string | undefined,
  network: NetworkConfig,
  limit = 10,
  requireAddress = true
) {
  //track everytime we pull a new floor list
  const [ floorItems, setFloorItems ] = useState<FloorItem[]>([]);
  //mint amount (qty) state and total mint price state, used to update UI in form
  const [ fields, setFields ] = useState({ mintAmount: 1, totalPrice: 0 });
  const buy = useBuyItems();

  //handler to add mint amount
  const addAmount = () => {
    //only add if the current amount is less than the floor items count
    if (fields.mintAmount < floorItems.length) {
      setAmount(fields.mintAmount + 1);
    }
  };
  //handler to less mint amount
  const lessAmount = () => {
    //only less if the current amount is more than 1
    if (fields.mintAmount > 1) {
      setAmount(fields.mintAmount - 1);
    }
  };
  //handler to set mint amount
  const setAmount = (mintAmount: number) => {
    //re add up all the prices again
    let totalPrice = 0;
    for (let i = 0; i < mintAmount && i < floorItems.length; i++) {
      totalPrice += floorItems[i].market.floorAsk.price.amount.decimal;
    }
    //update the total price
    setFields({ 
      mintAmount: mintAmount, 
      totalPrice: parseFloat(totalPrice.toFixed(6)) 
    });
  };

  //handler to buy items
  const buyItems = async () => {
    //collect all the tokens up to the mint 
    //amount, respective of the floor list
    const tokens = [];
    for (let i = 0; i < fields.mintAmount && i < floorItems.length; i++) {
      tokens.push(`${network.contracts.crew.address}:${floorItems[i].token.tokenId}`);
    }

    buy(tokens);
  }

  useEffect(() => {
    //if connected and no crews, try to load the floor list
    if (!requireAddress || address) {
      //collect parameters as specified by reservoir
      const params = new URLSearchParams();
      params.set('collection', network.contracts.crew.address)
      params.set('limit', String(limit))
      params.set('sortBy', 'floorAskPrice')
      //make the remote local call
      axios.get(`/api/reservoir/tokens/v5?${
        decodeURIComponent(params.toString())
      }`).then(response => {
        //only use items in opensea and offer in ETH (zero address)
        const tokens = response.data.results.tokens.filter(
          (token: FloorItem) => {
            if (!token.market.floorAsk.price) {
              return false;
            }
            const zero = '0x0000000000000000000000000000000000000000';
            const currency = token.market.floorAsk.price.currency.contract;
            const source = token.market.floorAsk.source.name.toLowerCase();
            const marketplace = 'opensea';
            return currency === zero && source === marketplace;
          }
        );
        //update the floor list
        setFloorItems(tokens);
      });
      return;
    }
    //if no account or crew length, purge 
    //the floor list to semi allow updates 
    setFloorItems([]);
  }, []);

  return {
    mintAmount: fields.mintAmount,
    totalPrice: fields.totalPrice,
    addAmount,
    lessAmount,
    setAmount,
    buyItems,
    floorItems
  };
};