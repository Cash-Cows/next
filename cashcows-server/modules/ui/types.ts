import type { ConfigOptions as Web3ModalConfigOptions } from '@web3modal/core';

export enum NetworkNames { 
  GOERLI = 'goerli', 
  ETHEREUM = 'ethereum' 
};

export type ContractConfig = {
  address: string,
  type?: string, 
  symbol?: string, 
  decimals?: number, 
  image?: string,
  abi: Record<string, any>[]
};

export type NetworkConfig = {
  chain_id: number,
  chain_name: string,
  chain_symbol: string,
  chain_label: string,
  chain_uri: string,
  chain_marketplace: string,
  chain_scanner: string,
  contracts: Record<string, ContractConfig>
};

export type NetworkState = {
  config: NetworkConfig,
  change: Function
};

export type ModalState = {
  config: Web3ModalConfigOptions,
  opened: boolean,
  open: Function,
  close: Function
};

export type AccountState = {
  info: {
    address: string | '',
    connector?: import("@wagmi/core").Connector<any, any, any> | undefined,
    isConnecting?: boolean,
    isReconnecting?: boolean,
    isConnected?: boolean,
    isDisconnected?: boolean,
    status?: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
  },
  ready: boolean,
  crew: CrewDetailFormat[]|null
};

export type Web3States = { 
  network: NetworkState,
  modal: ModalState,
  account: AccountState
};

export type MenuStates = { 
  main: { opened: boolean, toggle: Function }, 
  user: { opened: boolean, toggle: Function } 
};

export type CollectionItemSummary = {
  edition: number,
  image: string,
  tier: number,
  rank: number
};

export type CrewDetailFormat = {
  edition: number,
  score: number,
  rank: number,
  images: string[],
  attributes: Record<string, Record<string, string|number>>
}

export type CrewSearchResultsFormat = {
  updated: 1667197887423,
  supply: 4030,
  occurances: Record<string, Record<string, number>>
  rows: CrewDetailFormat[]
};