//types
import type { FetchSignerResult, Signer } from '@wagmi/core';
//hooks
import { useState, useEffect } from 'react';
//others
import { notify } from 'modules/common';
import { toEther, getNetwork, read, write } from 'modules/web3';

export default function useCulling(
  chain: string, 
  tokenId: number,
  signer: FetchSignerResult<Signer> | undefined
) {
  const network = getNetwork(chain);
  const [ conversion, setConversion ] = useState(0);
  const [ releaseable, setReleaseable ] = useState(0);

  const burn = async () => {
    try {
      await write(network.name, 'culling', signer).burnRedeem(tokenId);
    } catch (e) {
      const error = e as Error;
      if (error.message.indexOf('user rejected transaction') >= 0) {
        return notify('error', 'You rejected the transaction.');  
      }
      notify('error', error.message || error.toString());
    }
  };

  useEffect(() => {
    (async() => {
      setConversion(parseInt(
        await read(network.name, 'culling').tokenConversion()
      ));

      setReleaseable(toEther(
        await read(network.name, 'royalty')['releaseable(uint256)'](tokenId)
      ));
    })();
  }, []);

  return { conversion, releaseable, burn };
};