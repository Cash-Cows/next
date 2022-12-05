//types
import type { NetworkConfig } from 'modules/web3/types';
import type { FloorItem, RankedData } from '../types';
//global
import { useState, useEffect } from 'react';
import { useSigner } from 'wagmi';
import axios from 'axios';
//local
import notify from '../components/global/notify';

export default function useMintForm(
  address: string | undefined,
  network: NetworkConfig
) {
  //track everytime we pull a new floor list
  const [ floorItems, setFloorItems ] = useState<FloorItem[]>([]);
  //mint amount (qty) state and total mint price state, used to update UI in form
  const [ fields, setFields ] = useState({ mintAmount: 1, totalPrice: 0 });
  //get the ethers signer for when we buy
  const { data: signer } = useSigner();

  //handler to add mint amount
  const addAmount = () => {
    //only add if the current amount is less than the floor items count
    if (fields.mintAmount < floorItems.length) {
      //set mint amount
      const mintAmount = fields.mintAmount + 1;
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
    }
  };
  //handler to less mint amount
  const lessAmount = () => {
    //only less if the current amount is more than 1
    if (fields.mintAmount > 1) {
      //set mint amount
      const mintAmount = fields.mintAmount - 1;
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
    }
  };
  //handler to buy items
  const buyItems = async () => {
    //if no address or no signer
    if (!address || !signer) {
      return notify('error', 'Wallet not connected');
    }
    //collect all the tokens up to the mint 
    //amount, respective of the floor list
    const tokens = [];
    for (let i = 0; i < fields.mintAmount && i < floorItems.length; i++) {
      tokens.push(`${network.contracts.crew.address}:${floorItems[i].token.tokenId}`);
    }

    //if for some reason there are no tokens
    if (!tokens.length) {
      return notify('error', 'Could not qualify any tokens for purchase');
    }
    
    //figure out how to buy all these items
    const response = await axios.post('/api/reservoir/execute/buy/v4', {
      onlyPath: false,
      partial: false,
      skipErrors: false,
      skipBalanceCheck: false,
      taker: address,
      currency: '0x0000000000000000000000000000000000000000',
      tokens: tokens
    });

    //process any errors from the remote call
    if (response.data.error) {
      if (response.data.message.indexOf('Service Unavailable') >= 0) {
        return notify('error', 'Error: Service Unavailable. You might not have enough gas.');
      }
      return notify('error', response.data.message);
    } else if (!Array.isArray(response.data.results?.steps)) {
      return notify('error', 'No buy steps found');
    }
    
    for (const step of response.data.results.steps) {
      if (!Array.isArray(step.items) || !step.items.length) continue
      for (const item of step.items) {
        //according to reservoir-client, it is possible 
        //for no data in item, we should poll if this is the case
        if (item.status !== 'incomplete' || !item.data) continue
        try {//to send the transaction
          await signer.sendTransaction(item.data)
        } catch(e) {
          const error = e as Error;
          if (error.message.indexOf('user rejected transaction') >= 0) {
            return notify('error', 'Error: user rejected transaction');
          }
          return notify('error', error.message);
        }
      }
    }
  }

  useEffect(() => {
    //if connected and no crews, try to load the floor list
    if (address) {
      //collect parameters as specified by reservoir
      const params = new URLSearchParams();
      params.set('collection', network.contracts.crew.address)
      params.set('limit', '10')
      params.set('sortBy', 'floorAskPrice')
      //make the remote local call
      axios.get(`/api/reservoir/tokens/v5?${
        decodeURIComponent(params.toString())
      }`).then(response => {
        //only use items in opensea and offer in ETH (zero address)
        const tokens = response.data.results.tokens.filter(
          (token: FloorItem) => {
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
    buyItems,
    floorItems
  };
};