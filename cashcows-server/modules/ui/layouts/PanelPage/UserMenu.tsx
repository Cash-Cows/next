//types
import type { Connector } from 'wagmi';
import type { Web3Props } from 'modules/web3/types';
import type { PanelPageProps } from '../../types';
//enums
import { 
  BadgeTypes, 
  PixelButtonSizes, 
  PixelButtonTypes 
} from '../../enums';
//components
import Link from 'next/link';
import { Badge, PixelButton } from '../../components';

import { host } from '../../config';

type MenuProps = { 
  open?: boolean 
  web3: Web3Props,
  panel: PanelPageProps
};

const MenuLoading: React.FC<MenuProps> = ({ open = false }) => (
  <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-700 ${open? 'right-0': '-right-96' }`}>
    <main className="flex flex-col flex-grow items-center justify-center">
      <div className="text-white">Moo. Please Wait...</div>
    </main>
  </aside>
);

const MenuDisconnected: React.FC<MenuProps> = props => {
  const { web3, open = false } = props;
  const { actions, connectors } = web3;
  const connect = (connector: Connector) => {
    //if metamask and not installed
    if (connector.id === 'metaMask' && !window?.ethereum) {
      //redirect to install
      window.location.href = `https://metamask.app.link/dapp/${
        host
      }${
        window.location.pathname
      }${
        window.location.search
      }`;
      return;
    }
    actions.connect({ connector });
  }
  return (
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-700 ${open? 'right-0': '-right-96' }`}>
      <main className="flex flex-col flex-grow items-center justify-center">
        <div className="uppercase text-white">Connect With</div>
        {connectors.available.map(connector => (
          <PixelButton 
            key={connector.id}
            type={PixelButtonTypes.WARNING} 
            size={PixelButtonSizes.LARGE} 
            onClick={() => connect(connector)}
            className="w-[calc(100%-80px)] text-xs"
          >
            {connector.name}
          </PixelButton>
        ))}
      </main>
    </aside>
  );
};

const MenuConnected: React.FC<MenuProps> = props => {
  //if crews are still loading
  if (props.panel.session.loading) {
    //show loading
    return MenuLoading(props); 
  //if wallet has no crews
  } else if (!props.panel.session.crews.length) {
    //show mint form
    return MenuMint(props);
  }
  //show member section
  return MenuMember(props);
};

const MenuMint: React.FC<MenuProps> = ({ panel, open = false }) => {
  const { 
    mintAmount,
    totalPrice,
    addAmount,
    lessAmount,
    buyItems
  } = panel.form;

  return (
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-900 ${open? 'right-0': '-right-96' }`}>
      <header className="dark:bg-gray-700">
        <h3 className="px-2 py-3 text-md text-yellow-500 font-bold font-pixel text-md uppercase">1. Get Some Cows</h3>
      </header>
      <main className="flex flex-col flex-grow items-center justify-center">
        <div className="overflow-hidden px-16 pb-2">
          <img className="w-full" src="/images/about/brady-bunch.png" />
        </div>
        <h4 className="font-medium text-center uppercase text-white pb-2">How Many Cows?</h4>
        <div className="flex items-center">
          <PixelButton type={PixelButtonTypes.WARNING} onClick={lessAmount}>
            <i className="fas fa-minus"></i>
          </PixelButton>
          <div className="px-4 py-1 mx-2 text-center bg-white">{mintAmount}</div>
          <PixelButton type={PixelButtonTypes.WARNING} onClick={addAmount}>
            <i className="fas fa-plus"></i>
          </PixelButton>
        </div>
      </main>
      <footer className="p-2 border-t border-solid dark:bg-gray-700 dark:border-gray-600">
        <div className="pb-2 flex items-center text-white uppercase">
          <span className="block flex-grow font-bold">Total</span>
          <img className="h-6" src="/images/crypto/eth.png" />
          <span>{totalPrice}</span>
        </div>
        <PixelButton 
          type={PixelButtonTypes.SUCCESS} 
          size={PixelButtonSizes.LARGE} 
          className="w-[calc(100%-20px)]" 
          onClick={buyItems}
        >
          Moo!
        </PixelButton>
      </footer>
    </aside>
  );
};

const MenuMember: React.FC<MenuProps> = props => {
  const { web3, panel, open = false } = props;
  const { network } = web3;

  //add badges to crews
  const items = panel.session.crews.map(row => {
    let badge = BadgeTypes.MUTED;
    if (row.rank < 100) {
      badge = BadgeTypes.SUCCESS;
    } else if (row.rank < 500) {
      badge = BadgeTypes.WARNING;
    } else if (row.rank < 1000) {
      badge = BadgeTypes.INFO;
    }

    return {...row, badge}
  });

  return (
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-900 ${open? 'right-0': '-right-96' }`}>
      <header className="bg-gray-700 flex items-center">
        <h3 className="flex-grow px-2 py-3 text-md text-yellow-500 font-pixel text-md uppercase">Choose a Cow</h3>
        <Link className="text-white p-2" href={`/${network.config.name}/crew/manage`}>
          <i className="fas block fa-cog"></i>
        </Link>
      </header>
      <main className="flex flex-wrap flex-grow items-center justify-center overflow-auto p-2">
        {items.map(row => (
          <Link 
            key={row.edition}
            className="relative m-1 rounded-lg overflow-hidden w-[calc(50%-8px)]"
            href={`/${network.config.name}/crew/${row.edition}/profile`}
          >
            <img src={`https://cdn.cashcows.club/crew/preview/${row.edition}_${row.attributes.Level.value}.png`} loading="lazy" />

            <Badge type={row.badge} className="absolute bottom-1 left-1 rounded-lg">#{row.rank}</Badge>
          </Link>
        ))}
      </main>
      <footer className="dark:bg-gray-700">
        <Link className="block px-2 py-4 text-white border-t border-solid border-gray-600" href={`/${network.config.name}/member`}>
          <i className="text-yellow-500 fas fa-fw fa-fingerprint"></i>
          <span className="uppercase inline-block pl-2">My Profile</span>
        </Link>
        <a className="block px-2 py-4 text-white border-t border-solid border-gray-600" href="https://dao.cashcows.club" target="_blank">
          <i className="text-yellow-500 fas fa-fw fa-gavel"></i>
          <span className="uppercase inline-block pl-2">DAO</span>
        </a>
        <button className="block px-2 py-4 text-white border-t border-solid border-gray-600" onClick={() => web3.actions.disconnect()}>
          <i className="text-yellow-500 fas fa-fw fa-power-off"></i>
          <span className="uppercase inline-block pl-2">Disconnect</span>
        </button>
      </footer>
    </aside>
  );
}

const UserMenu: React.FC<MenuProps> = props => {
  //if wallet is connected
  if (props.web3.status.connected) {
    return MenuConnected(props);
  }

  return MenuDisconnected(props);
};

export default UserMenu;