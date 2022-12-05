//types
import type { RankedData, RewardsHooks } from '../types';
//hooks
import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import useCulling from './useCulling';
import useLoot from './useLoot';
import useReward from './useReward';
//config
import { currencies, quotes } from 'project.config';

const closed = {
  traits: false,
  rewards: false,
  loots: false,
  map: false,
  brand: false,
  culling: false
};

export default function useProfile(
  chain: string, 
  metadata: RankedData,
  account: string,
  owner: string
) {
  //for managing tab states
  const [ toggles, setTabs ] = useState({...closed, traits: true });
  //we need to track is owned to fix hydration error
  const [ owned, isOwned ] = useState(false);
  const { data: signer } = useSigner();
  //to get all the loots
  const loots = useLoot(chain, metadata.characterId);
  //to get all the data needed for culling
  const { conversion, releaseable, burn } = useCulling(
    chain, 
    metadata.edition, 
    signer
  );
  //hooks to get all the rewards per currency
  const rewards: RewardsHooks = {};
  for (const currency of currencies) {
    rewards[currency] = useReward(
      chain, 
      metadata.edition, 
      currency, 
      signer
    );
  }
  //determine a quote to use based on the token id
  const quote = quotes[metadata.edition % quotes.length] || quotes[0];
  //build a message for the culling
  const message = releaseable > 0 
    ? `You will receive 1 steak and your unclaimed Ξ ${
      releaseable.toFixed(6)
    } will be exchanged for ${(
      releaseable * conversion).toFixed(6)
    } $MILK`
    : `You will receive 1 steak but, you claimed all your rewards! No milk for you. Are you sure?`;

  const open = {
    traits: () => setTabs({...closed, traits: true }),
    rewards: () => setTabs({...closed, rewards: true }),
    loots: () => setTabs({...closed, loots: true }),
    map: () => setTabs({...closed, map: true }),
    brand: () => setTabs({...closed, brand: true }),
    culling: () => setTabs({...closed, culling: true })
  };

  //this is a hydration fix
  useEffect(() => { isOwned(owner === account); }, [ account ]);

  return { 
    loots, 
    rewards, 
    owned,
    culling: { quote, message, burn },
    tabs: { toggles, open }
  };
};