import { NetworkNames } from './enums';
import type { Connector } from 'wagmi';

export type ContractConfig = {
  address: string,
  type?: string, 
  symbol?: string, 
  decimals?: number, 
  image?: string,
  abi: Record<string, any>[]
};

export type NetworkConfig = {
  id: number,
  name: string,
  rpc: {
    http: string,
    wss: string
  },
  symbol: string,
  label?: string,
  scanner?: string,
  marketplace?: string,
  contracts: Record<string, ContractConfig>
};

export type NetworkProps = {
  config: NetworkConfig,
  change: (network: NetworkNames) => void
};

export type AccountProps = {
  address: string | undefined,
  name: string | null | undefined,
  avatar: string | null | undefined
};

export type StatusProps = {
  connected: boolean,
  loading: boolean, 
  pending: Connector<any, any, any> | undefined,
  error: Error | null| undefined
};

export type ActionProps = {
  connect: Function,
  disconnect: Function
};

export type ConnectorsProps = {
  active: Connector<any, any, any> | undefined,
  available: Connector<any, any, any>[]
};

export type Web3Props = {
  network: NetworkProps,
  account: AccountProps,
  status: StatusProps,
  actions: ActionProps,
  connectors: ConnectorsProps
};