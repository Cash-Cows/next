import Link from 'next/link';

import {
  CollectionItemSummary,
  NetworkState,
  ModalState,
  AccountState
} from 'modules/ui/types';

import { Badge, BadgeTypes, PixelButton, PixelButtonSizes, PixelButtonTypes } from 'modules/ui/components';

type MenuProps = {
  items?: CollectionItemSummary[],
  open?: boolean,
  network: NetworkState,
  modal: ModalState,
  account: AccountState
};

const MenuDisconnected: React.FC<MenuProps> = (props) => {
  const { open = false, modal } = props;

  const toMetaMaskMobile = () => {
    window.location.href = `https://metamask.app.link/dapp/www.cashcows.club${window.location.pathname}${window.location.search}`
  };

  return (
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-700 ${open? 'right-0': '-right-96' }`}>
      <main className="flex flex-col flex-grow items-center justify-center">
        <PixelButton type={PixelButtonTypes.WARNING} size={PixelButtonSizes.LARGE} onClick={() => modal.open()}>
          Connect Wallet
        </PixelButton>
        <button className="mt-3 text-white underline" onClick={toMetaMaskMobile}>
          MetaMask Browser
        </button>
      </main>
    </aside>
  );
};

const MenuConnected: React.FC<MenuProps> = (props) => {
  const { open = false, account, network } = props;
  
  if (!account?.crew || !account.crew.length)  {
    return MenuMint(props);
  }

  const crew = account.crew.map(row => {
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
        <Link className="text-white p-2" href={`/${network.config.chain_name}/manage`}>
          <i className="fas block fa-cog"></i>
        </Link>
      </header>
      <main className="flex flex-wrap flex-grow items-center justify-center overflow-auto p-2">
        {crew.map(row => (
          <Link 
            key={row.edition}
            className="relative m-1 rounded-lg overflow-hidden w-[calc(50%-8px)]"
            href={`/${network.config.chain_name}/crew/${row.edition}/profile`}
          >
            <img src={`https://cdn.cashcows.club/crew/preview/${row.edition}_${row.attributes.Level.value}.png`} loading="lazy" />

            <Badge type={row.badge} className="absolute bottom-1 left-1 rounded-lg">#{row.rank}</Badge>
          </Link>
        ))}
      </main>
      <footer className="dark:bg-gray-700">
        <Link className="block px-2 py-4 text-white border-t border-solid border-gray-600" href={`/${network.config.chain_name}/member`}>
          <i className="text-yellow-500 fas fa-fw fa-fingerprint"></i>
          <span className="uppercase inline-block pl-2">My Profile</span>
        </Link>
        <a className="block px-2 py-4 text-white border-t border-solid border-gray-600" href="https://dao.cashcows.club" target="_blank">
          <i className="text-yellow-500 fas fa-fw fa-gavel"></i>
          <span className="uppercase inline-block pl-2">DAO</span>
        </a>
      </footer>
    </aside>
  );
};

const MenuMint: React.FC<MenuProps> = ({ open = false }) => {
  const addAmount = () => {}
  const lessAmount = () => {}
  const updateTotal = () => {}
  const buyItems = () => {}

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
          <input 
            className="box-border w-full px-3 py-1 text-center"
            onInput={updateTotal}
            type="number" 
            min="1" 
            max="10" 
            step="1" 
            value="1" 
          />
          <PixelButton type={PixelButtonTypes.WARNING} onClick={addAmount}>
            <i className="fas fa-plus"></i>
          </PixelButton>
        </div>
      </main>
      <footer className="p-2 border-t border-solid dark:bg-gray-700 dark:border-gray-600">
        <div className="pb-2 flex items-center text-white uppercase">
          <span className="block flex-grow font-bold">Total</span>
          <img className="h-6" src="/images/crypto/eth.png" />
          <span>0</span>
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

const UserMenu: React.FC<MenuProps> = props => {
  const { account } = props;

  if (account.info.isConnected) {
    return MenuConnected(props);
  }

  return MenuDisconnected(props);
};

export default UserMenu;