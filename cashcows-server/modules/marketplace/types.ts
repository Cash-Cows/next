import type { MutableRefObject } from 'react';
import type { RankedData } from 'modules/ui/types';
import { Market } from 'modules/game';

export type Collection = {
  collectionAddress: string,
  collectionTokenId: string|number|BigInt
};

export type LootData = {
  edition: number,
  itemId: string,
  name: string,
  image: string,
  category: string,
  rarity: string,
  available: number,
  limit: number,
  attributes: Record<string, string>,
  pricing: Record<string, string>
};

export type RewardsHooks = Record<string, { 
  reward: MutableRefObject<string>, 
  redeem: () => Promise<void> 
}>;

export type { RankedData };

export type MarketplaceDetailProps = {
  chain: string,
  metadata: RankedData, 
  owner: string 
};