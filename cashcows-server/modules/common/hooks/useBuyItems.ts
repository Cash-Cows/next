//global
import { useSigner } from 'wagmi';
import axios from 'axios';
//local
import notify from '../components/global/notify';

export default function useBuyItems() {
  //get the ethers signer for when we buy
  const { data: signer } = useSigner();
  //handler to buy items
  return async (tokens: string[]) => {
    //if no address or no signer
    if (!signer) {
      return notify('error', 'Wallet not connected');
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
      taker: await signer.getAddress(),
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
  };
};