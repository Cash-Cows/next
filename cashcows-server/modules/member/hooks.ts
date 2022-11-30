//types
import type { NetworkConfig } from 'modules/web3/types';
//hooks
import { useState, useEffect } from 'react';
//config
import { cdn } from 'project.config';
//web3
import { read } from 'modules/web3';

const hidden = {
  crew: false,
  milk: false,
  dolla: false
};

export function useTabs() {
  const [ toggles, setToggles ] = useState(
    Object.assign({}, hidden, { crew: true })
  );
  const show = {
    crew: () => setToggles(Object.assign({}, hidden, { crew: true })),
    milk: () => setToggles(Object.assign({}, hidden, { milk: true })),
    dolla: () => setToggles(Object.assign({}, hidden, { dolla: true }))
  };

  return { toggles, show };
};

export function useAvatar(network: NetworkConfig, address: string) {
  const [ avatar, setAvatar ] = useState(`https://${cdn}/website/about/cow-bored.png`);
  useEffect(() => {
    (async () => {
  
      const tokens = await read(network.name, 'index').ownerTokens(
        network.contracts.crew.address, 
        address,
        4030
      );

      if (!tokens.length) {
        return;
      }

      setAvatar(`https://cdn.cashcows.club/crew/preview/${tokens[0]}_2.png`)
    })();
  }, []);
  return avatar;
}