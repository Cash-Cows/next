import type { MutableRefObject } from 'react';
import type { RankedData } from 'modules/common/types';
import { Market } from 'modules/game';

export type Attributes = Record<string, string|number>;

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
  attributes: Attributes,
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

export type SearchResultToken = Record<string, any> & {
  contract: string,
  tokenId: number,
  name: string,
  description: string,
  image: string,
  kind: string,
  rarity: number,
  rarityRank: number,
  collection: {
    id: string,
    name: string,
    image: string,
    slug: string
  },
  lastBuy: {
    value: number|null,
    timestamp: number|null
  },
  lastSell: {
    value: number|null,
    timestamp: number|null
  },
  owner: string
};

export type SearchResultMarket = Record<string, any> & {
  floorAsk: {
    id: string,
    price: {
      currency: {
        contract: string,
        name: string,
        symbol: string,
        decimals: number
      },
      amount: {
        raw: number,
        decimal: number,
        usd: number,
        native: number
      }
    },
    maker: string,
    validFrom: number,
    validUntil: number,
    source: {
      id: string,
      domain: string,
      name: string,
      icon: string,
      url: string
    }
  }
};

export type SearchResult = Record<string, any> & {
  token: SearchResultToken,
  market: SearchResultMarket
};

export type SearchStates = {
  attributes: Attributes,
  sort: string,
  start: number,
  range: number,
  loading: boolean,
  next: string|null,
  results: SearchResult[]
};