//hooks
import { useEffect, useState } from 'react';
//web3
import { read } from 'modules/web3';

export default function useSteaks(chain: string, address: string) {
  const [ steaks, setSteaks ] = useState(0);
  useEffect(() => {
    if (chain && address && !steaks) {
      read(chain, 'culling').balanceOf(address).then(
        (balance: string) => setSteaks(parseInt(balance))
      );
    } else {
      setSteaks(0);
    }
  }, [ chain, address ]);

  return steaks;
};