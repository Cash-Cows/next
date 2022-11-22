import { useState, useEffect } from 'react';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import useNetwork from './useNetwork';

import { NetworkNames } from '../enums';

/**
 * Hook that aggregates network, account, status, actions, connector states
 */
export default function useWeb3(defaultNetwork: NetworkNames = NetworkNames.ETHEREUM) {
  //network config state
  const { network, change } = useNetwork(defaultNetwork);
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