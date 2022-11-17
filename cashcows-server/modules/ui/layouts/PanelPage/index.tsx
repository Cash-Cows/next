import { Web3Modal } from '@web3modal/react';
import { NetworkNames } from 'modules/ui/types';
import { usePanelMenus, useWeb3 } from 'modules/ui/hooks';

import Head from './Head';
import Header from './Header';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

type PageProps = {
  head?: React.FC,
  body?: React.FC,
  network?: NetworkNames,
  children?: React.ReactNode
};

const LayoutPanelPage: React.FC<PageProps> = props => {
  //Hook: Manages the panel meny states
  const { main, user } = usePanelMenus();
  //Hook: Manages all the usable web3 states
  const { network, modal, account } = useWeb3(props.network || NetworkNames.ETHEREUM);
  
  return (
    <section className="dark font-courier relative w-full h-full overflow-hidden">
      <>{props.head && <props.head />}</>
      <Header 
        toggleMainMenu={() => main.toggle()} 
        toggleUserMenu={() => user.toggle()}
      />
      <MainMenu open={main.opened} />
      <UserMenu open={user.opened} network={network} modal={modal} account={account} />
      <>{props.body && (
        <section className="dark:bg-gray-800 dark:text-white py-2 absolute top-16 bottom-0 left-0 right-0">
          <props.body />
        </section>
      )}</>
      {props.children}
      <Web3Modal config={modal.config} />
    </section>
  )
};

export { Head, Header, MainMenu, UserMenu };

export default LayoutPanelPage;