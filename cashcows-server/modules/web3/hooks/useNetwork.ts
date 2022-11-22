//enums
import { NetworkNames } from '../enums';
//hooks
import { useState } from 'react';
//config
import { networks } from '../config';


/**
 * Hook that updates network config when the network changes
 */
export default function useNetwork(defaultNetwork: NetworkNames = NetworkNames.ETHEREUM) {
  const [ network, setNetwork ] = useState(
    networks[defaultNetwork] || networks.ethereum
  );

  const change = (network: NetworkNames) => {
    setNetwork(networks[network] || networks.ethereum)
  };

  return { network, change }
};