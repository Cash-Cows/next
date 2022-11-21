import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { useWeb3, NetworkNames } from 'modules/web3';

import { usePanelPage } from '../../hooks';
import notify from '../../notify';

import Head from './Head';
import Header from './Header';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const LayoutPanelPage: React.FC<{
  head?: React.FC,
  body?: React.FC,
  children?: React.ReactNode
}> = props => {
  const web3 = useWeb3(NetworkNames.ETHEREUM);
  const { network, account, status } = web3;
  
  const panel = usePanelPage(account.address, network.config);
  const { main, user } = panel.panel;

  useEffect(() => {
    if (status.error) {
      notify('error', status.error.message);
    }
  }, [status.error])
  
  return (
    <section className="dark font-courier relative w-full h-full overflow-hidden">
      <>{props.head && <props.head />}</>
      <Header 
        toggleMainMenu={() => main.toggle()} 
        toggleUserMenu={() => user.toggle()}
      />
      <MainMenu open={main.opened} />
      <UserMenu open={user.opened} web3={web3} panel={panel} />
      <>{props.body && (
        <section className="dark:bg-gray-800 dark:text-white py-2 absolute top-16 bottom-0 left-0 right-0">
          <props.body />
        </section>
      )}</>
      {props.children}
      <ToastContainer />
    </section>
  )
};

export { Head, Header, MainMenu, UserMenu };

export default LayoutPanelPage;