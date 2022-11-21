import useCrew from './useCrew';
import useMintForm from './useMintForm';
import usePanelMenus from './usePanelMenu';

import type { NetworkConfig } from 'modules/web3/types';

export default function usePanelPage(
  address: string | undefined, 
  network: NetworkConfig
) {
  const { main, user } = usePanelMenus();
  const { crews, loading } = useCrew(address);
  const {
    mintAmount,
    totalPrice,
    addAmount,
    lessAmount,
    buyItems
  } = useMintForm(address, network, crews);

  return {
    session: { crews, loading },
    panel: { main, user },
    form: {
      mintAmount,
      totalPrice,
      addAmount,
      lessAmount,
      buyItems
    }
  }
};