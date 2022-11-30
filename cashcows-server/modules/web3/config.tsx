//types
import type { Web3Props } from './types';
//enums
import { NetworkNames } from './enums';
//hooks
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useEnsAvatar,
  useEnsName
} from 'wagmi';
//config
import { networks, connectors } from 'project.config';
import { 
  defaultChains, 
  configureChains, 
  createClient, 
  WagmiConfig 
} from 'wagmi';
//connectors
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
//providers
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

//Configure chains & providers with whatever was set in the config.
const { chains, provider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (chain) => {
      for (const network of Object.values(networks)) {
        if (network.id === chain.id) {
          return {
            http: network.rpc.http,
            webSocket: network.rpc.wss,
          };
        }
      }

      return null;
    }
  }),
  publicProvider()
]);

export { networks, chains, provider };

// Set up client
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: connectors.coinbase }),
    new WalletConnectConnector({ chains, options: connectors.walletconnect })
  ],
  provider
});

/**
 * The web3 context (web3 states)
 */
export const Web3Context = React.createContext<Web3Props>({
  network: {
    config: networks[NetworkNames.ETHEREUM],
    change: () => {}
  },
  account: {
    address: undefined,
    name: null,
    avatar: null
  },
  status: {
    connected: false,
    loading: false, 
    pending: undefined,
    error: null
  },
  actions: {
    connect: () => {},
    disconnect: () => {}
  },
  connectors: {
    active: undefined,
    available: []
  }
});

export const Web3Provider: React.FC<{
  chain?: NetworkNames,
  children?: React.ReactNode
}> = ({ children, chain = NetworkNames.ETHEREUM }) => {
  //network config state
  const { network, change } = useNetwork(chain);
  //account states
  const { address, connector, isConnected } = useAccount();
  //ens states
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  //wallet connect states
  const { 
    connect, 
    connectors, 
    error, 
    isLoading, 
    pendingConnector: pending
  } = useConnect({ chainId: network.id });
  const { disconnect } = useDisconnect();

  //this is a patch to fix reported wagmi hydration bug/error
  const [ connected, setConnected ] = useState(false);
  useEffect(() => { setConnected(isConnected) }, [isConnected]);
  //this is a patch to fix reported wagmi hydration bug/error
  const [ loading, setLoading ] = useState(false);
  useEffect(() => { setLoading(isLoading) }, [isLoading]);

  const router = useRouter();

  useEffect(() => {
    change(router.query.chain as NetworkNames || NetworkNames.ETHEREUM);
  }, [router.query.chain]);

  return (
    <Web3Context.Provider value={{
      network: {
        config: network,
        change: change
      },
      account: {
        address,
        name: ensName,
        avatar: ensAvatar
      },
      status: {
        connected,
        loading, 
        pending,
        error
      },
      actions: {
        connect,
        disconnect
      },
      connectors: {
        active: connector,
        available: connectors
      }
    }}>
      {children}
    </Web3Context.Provider>
  );
};

/**
 * Component wrapper to access web3 context (the web3 states)
 */
export const Web3Config: React.FC<{
  chain?: NetworkNames,
  children?: React.ReactNode
}> = ({ children, chain = NetworkNames.ETHEREUM }) => (
  <WagmiConfig client={client}>
    <Web3Provider chain={chain}>
      {children}
    </Web3Provider>
  </WagmiConfig>
);

/**
 * Hook that updates network config when the network changes
 */
export function useNetwork(defaultNetwork: NetworkNames = NetworkNames.ETHEREUM) {
  const [ network, setNetwork ] = useState(
    networks[defaultNetwork] || networks.ethereum
  );

  const change = (network: NetworkNames) => {
    setNetwork(networks[network] || networks.ethereum)
  };

  return { network, change }
};

/**
 * Hook that aggregates network, account, status, actions, connector states
 */
export const useWeb3 = () => useContext(Web3Context);