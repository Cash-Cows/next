//types
import type { MouseEventHandler } from 'react';
//global
import Link from 'next/link';

const Header: React.FC<{
  toggleMainMenu: MouseEventHandler,
  toggleUserMenu: MouseEventHandler
}> = ({ toggleMainMenu, toggleUserMenu }) => (
  <header className="dark:bg-gray-900 dark:text-white py-2 absolute top-0 left-0 right-0 h-16">
    <div className="container max-w-4xl m-auto px-3 flex items-center">
      <button className="text-white text-xl mr-3" onClick={toggleMainMenu}>
        <i className="fas fa-bars"></i>
      </button>
      <Link className="flex-grow" href="/">
        <img alt="cash cows club logo" className="h-12 block" src="/images/logo-cashcows-long.gif" />
      </Link>
      <button onClick={toggleUserMenu}>
        <img alt="cash cows club user" className="h-10 block rounded-full" src="/images/icon-user.png" />
      </button>
    </div>
  </header>
);

export default Header;