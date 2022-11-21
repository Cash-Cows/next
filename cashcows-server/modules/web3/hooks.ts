import { useState, useEffect } from 'react';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import { networks } from './config';
import { NetworkNames } from './enums';

export function useNetwork(defaultNetwork: NetworkNames = NetworkNames.ETHEREUM) {
  const [ network, setNetwork ] = useState(
    networks[defaultNetwork] || networks.ethereum
  );

  const change = (network: NetworkNames) => {
    setNetwork(networks[network] || networks.ethereum)
  };

  return { network, change }
}

export function useWeb3(defaultNetwork: NetworkNames = NetworkNames.ETHEREUM) {
  const { network, change } = useNetwork(defaultNetwork);
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  
  const { 
    connect, 
    connectors, 
    error, 
    isLoading, 
    pendingConnector: pending
  } = useConnect({ chainId: network.id });

  const [ connected, setConnected ] = useState(false);
  useEffect(() => { setConnected(isConnected) }, [isConnected]);

  const [ loading, setLoading ] = useState(false);
  useEffect(() => { setLoading(isLoading) }, [isLoading]);

  const { disconnect } = useDisconnect();

  return {
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
  };
}