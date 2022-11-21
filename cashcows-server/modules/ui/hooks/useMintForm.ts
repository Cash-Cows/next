import { useState, useEffect } from 'react';
import { useSigner } from 'wagmi';
import axios from 'axios';

import notify from '../notify';

import type { NetworkConfig } from 'modules/web3/types';
import type { FloorItem, RankedData } from '../types';

export default function useMintForm(
  address: string | undefined,
  network: NetworkConfig, 
  crews: RankedData[]
) {
  const [ floor, setFloor ] = useState<FloorItem[]>([]);
  const [ mintAmount, setMintAmount ] = useState(1);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const { data: signer } = useSigner();

  const addAmount = () => {
    if (mintAmount < floor.length) {
      const amount = mintAmount + 1;
      setMintAmount(amount);
      let price = 0;
      for (let i = 0; i < amount && i < floor.length; i++) {
        price += (floor as FloorItem[])[i].market.floorAsk.price.amount.decimal;
      }
      setTotalPrice(parseFloat(price.toFixed(6)));
    }
  };

  const lessAmount = () => {
    if (mintAmount > 1) {
      const newAmount = mintAmount - 1;
      setMintAmount(newAmount);
      let price = 0;
      for (let i = 0; i < newAmount && i < floor.length; i++) {
        price += (floor as FloorItem[])[i].market.floorAsk.price.amount.decimal;
      }
      setTotalPrice(parseFloat(price.toFixed(6)));
    }
  };

  const buyItems = async () => {
    if (!address || !signer) {
      return;
    }
    const tokens = [];
    for (let i = 0; i < mintAmount && i < floor.length; i++) {
      tokens.push(`${network.contracts.crew.address}:${
        (floor as FloorItem[])[i].token.tokenId
      }`);
    }

    if (!tokens.length) return

    const response = await axios.post('/api/reservoir/execute/buy/v4', {
      onlyPath: false,
      partial: false,
      skipErrors: false,
      skipBalanceCheck: false,
      taker: address,
      currency: '0x0000000000000000000000000000000000000000',
      tokens: tokens
    });

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
        try {
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
    if (address && !crews.length) {
      const params = new URLSearchParams();
      params.set('collection', network.contracts.crew.address)
      params.set('limit', '10')
      params.set('sortBy', 'floorAskPrice')
      axios
        .get(`/api/reservoir/tokens/v5?${
          decodeURIComponent(params.toString())
        }`)
        .then(response => {
          const tokens = response.data.results.tokens.filter(
            (token: FloorItem) => {
              const zero = '0x0000000000000000000000000000000000000000';
              const currency = token.market.floorAsk.price.currency.contract;
              const source = token.market.floorAsk.source.name.toLowerCase();
              const marketplace = 'opensea';
              return currency === zero && source === marketplace;
            }
          );
          setFloor(tokens);
          if (tokens.length && mintAmount === 1) {
            setTotalPrice(tokens[0].market.floorAsk.price.amount.decimal);
          } 
        });
    } else {
      setFloor([]);
    }
  }, [ crews.length ]);

  return {
    mintAmount,
    totalPrice,
    addAmount,
    lessAmount,
    buyItems,
    floor
  };
};