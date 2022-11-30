//types
import type { FetchSignerResult, Signer } from '@wagmi/core';
//hooks
import { useEffect, useRef } from 'react';
//others
import { notify } from 'modules/ui';
import { toEther, getNetwork, read, write } from 'modules/web3';

export default function useReward(
  chain: string, 
  tokenId: number, 
  currency: string,
  signer: FetchSignerResult<Signer> | undefined
) {
  const network = getNetwork(chain);
  const reward = useRef<string>('???');

  const releaseable = currency === 'eth'
    ? 'releaseable(uint256)'
    : 'releaseable(address,uint256)';

  const release = currency === 'eth'
    ? 'release(uint256)'
    : 'release(address,uint256)';

  const args = currency === 'eth'
    ? [ tokenId ]
    : [ network.contracts[currency].address, tokenId ];
  
  useEffect(() => {
    (async() => {
      reward.current = toEther(
        await read(network.name, 'royalty')[releaseable](...args)
      ).toFixed(6);
    })();
  }, []);

  const redeem = async () => {
    //if no address or no signer
    if (!signer) {
      return notify('error', 'Wallet not connected');
    }
    
    try {
      await write(network.name, 'royalty', signer)[release](...args);
    } catch (e) {
      const error = e as Error;
      if (error.message.indexOf('user rejected transaction') >= 0) {
        return notify('error', 'You rejected the transaction.');  
      }
      notify('error', error.message || error.toString());
    }
  };

  return { reward, redeem };
};