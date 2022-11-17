import { useEffect } from 'react';
import Link from 'next/link';
import { useContract } from '@web3modal/react';
import {
  CollectionItemSummary,
  NetworkState,
  ModalState,
  AccountState,
  CrewDetailFormat
} from 'modules/utils/types';

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
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-900 ${open? 'right-0': '-right-96' }`}>
      <main className="flex flex-col flex-grow items-center justify-center">
        <button className="btn-pixel btn-pixel-lg btn-pixel-warning" onClick={() => modal.open()}>
          Connect Wallet
        </button>
        <button className="mt-3 text-white underline" onClick={toMetaMaskMobile}>
          MetaMask Browser
        </button>
      </main>
    </aside>
  );
};

const MenuConnected: React.FC<MenuProps> = (props) => {
  const { open = false, account, network } = props;
  
  if (!account?.crew)  {
    return MenuMint(props);
  }

  return (
    <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-900 ${open? 'right-0': '-right-96' }`}>
      <header className="bg-gray-800 flex items-center">
        <h3 className="flex-grow p-2 text-lg text-yellow-500 font-bold uppercase">Choose a Cow</h3>
        <a className="text-white p-2"><i className="fas block fa-cog"></i></a>
      </header>
      <main className="flex flex-wrap flex-grow items-center justify-center overflow-auto p-2">
        {account.crew.map(row => (
          <Link 
            key={row.edition}
            className="relative m-1 rounded-lg overflow-hidden w-[calc(50%-8px)]"
            href={`/${network.config.chain_name}/crew/${row.edition}/profile`}
          >
            <img src={`https://cdn.cashcows.club/crew/preview/${row.edition}_${row.attributes.Level.value}.png`} loading="lazy" />

            {row.rank > 100 && <span className="absolute bottom-1 left-1 rounded-lg px-2 py-1 text-xs text-white bg-green-800 border border-green-900">#{row.rank}</span>}
            {row.rank > 500 && <span className="absolute bottom-1 left-1 rounded-lg px-2 py-1 text-xs text-white bg-blue-800 border border-blue-900">#{row.rank}</span>}
            {row.rank > 1000 && <span className="absolute bottom-1 left-1 rounded-lg px-2 py-1 text-xs text-black bg-gray-300 border border-gray-400">#{row.rank}</span>}
          </Link>
        ))}
      </main>
      <footer>
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
      <header className="bg-gray-800">
        <h3 className="p-2 text-lg text-yellow-500 font-bold uppercase">1. Get Some Cows</h3>
      </header>
      <main className="flex flex-col flex-grow items-center justify-center">
        <div className="overflow-hidden px-16 pb-2">
          <img className="w-full" src="/images/about/brady-bunch.png" />
        </div>
        <h4 className="font-medium text-center uppercase text-white pb-2">How Many Cows?</h4>
        <div className="flex items-center">
          <button
            className="btn-pixel btn-pixel-warning"
            onClick={lessAmount}
          ><i className="fas fa-minus"></i></button>
          <input 
            className="box-border w-full px-3 py-1 text-center"
            onInput={updateTotal}
            type="number" 
            min="1" 
            max="10" 
            step="1" 
            value="1" 
          />
          <a 
            className="btn-pixel btn-pixel-warning"
            onClick={addAmount}
          ><i className="fas fa-plus"></i></a>
        </div>
      </main>
      <footer className="p-2 border-t border-solid border-gray-600">
        <div className="pb-2 flex items-center text-white uppercase">
          <span className="block flex-grow font-bold">Total</span>
          <img className="h-6" src="/images/crypto/eth.png" />
          <span>0</span>
        </div>
        <button 
          className="btn-pixel btn-pixel-lg btn-pixel-success w-[calc(100%-20px)]"
          onClick={buyItems}
        >Moo!</button>
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