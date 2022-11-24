//hooks
import { useEffect } from 'react';
import { useWeb3 } from 'modules/web3';
import { usePanelPage } from '../../hooks';
//components
import { ToastContainer } from 'react-toastify';
import notify from '../../notify';

import Header from './Header';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const LayoutPanelPage: React.FC<{
  chain?: string,
  head?: React.FC,
  children?: React.ReactNode
}> = props => {
  //get all the aggregated web3 hooks
  const web3 = useWeb3();
  const { network, account, status } = web3;
  //get all the aggregated panel hooks
  const panel = usePanelPage(account.address, network.config);
  const { main, user } = panel.panel;
  //any time the error changes, notify it
  useEffect(() => {
    if (status.error) {
      notify('error', status.error.message);
    }
  }, [status.error]);
  
  return (
    <section className="dark font-courier relative w-full h-full overflow-hidden">
      <>{props.head && <props.head />}</>
      <Header 
        toggleMainMenu={() => main.toggle()} 
        toggleUserMenu={() => user.toggle()}
      />
      <MainMenu open={main.opened} />
      <UserMenu open={user.opened} web3={web3} panel={panel} />
      <section className="dark:bg-gray-800 dark:text-white absolute top-16 bottom-0 left-0 right-0">
        {props.children}
      </section>
      <ToastContainer />
    </section>
  )
};

export { Header, MainMenu, UserMenu };

export default LayoutPanelPage;