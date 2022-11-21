//types
import type { NetworkConfig } from 'modules/web3/types';
//hooks
import useCrew from './useCrew';
import useMintForm from './useMintForm';
import usePanelMenus from './usePanelMenus';

export default function usePanelPage(
  address: string | undefined, 
  network: NetworkConfig
) {
  //get the menu states
  const { main, user } = usePanelMenus();
  //get the crew states
  const { crews, loading } = useCrew(address);
  //get all the form states
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