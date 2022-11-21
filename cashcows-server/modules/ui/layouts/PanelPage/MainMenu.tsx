import Link from 'next/link';

const MainMenu: React.FC<{
  open?: boolean,
  network?: string
}> = ({ network = 'ethereum', open = false }) => (
  <aside className={`flex flex-col w-full max-w-sm duration-200 absolute top-16 bottom-0 z-50 dark:bg-gray-900 ${open? 'left-0': '-left-96' }`}>
    <header className="dark:bg-gray-700">
      <Link className="block p-3 text-white border-b border-solid border-gray-900" href={`/${network}/crew`}>
        <i className="text-yellow-500 fas fa-fw fa-users"></i>
        <span className="uppercase inline-block pl-2">Crew Collection</span>
      </Link>
      <Link className="block p-3 text-white border-b border-solid border-gray-900" href={`/${network}/club`}>
        <i className="text-yellow-500 fas fa-fw fa-ghost"></i>
        <span className="uppercase inline-block pl-2">Club Collection</span>
      </Link>
      <Link className="block p-3 text-white border-b border-solid border-gray-900" href={`/${network}/loot`}>
        <i className="text-yellow-500 fas fa-fw fa-gem"></i>
        <span className="uppercase inline-block pl-2">Loot Store</span>
      </Link>
      <Link className="block p-3 text-white border-b border-solid border-gray-900" href={`/${network}/memes`}>
        <i className="text-yellow-500 fas fa-fw fa-face-grin-tongue-wink"></i>
        <span className="uppercase inline-block pl-2">Meme Database</span>
      </Link>
      <Link className="block p-3 text-white border-b border-solid border-gray-900" href={`/${network}/leaders`}>
        <i className="text-yellow-500 fas fa-medal"></i>
        <span className="uppercase inline-block pl-2">Leaderboard</span>
      </Link>
    </header>
    <main className="flex-grow"></main>
    <footer className="flex flex-wrap text-center">
      <Link className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href="/about">
        About
      </Link>
      <a className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href="https://opensea.io/collection/cash-cows-crew" target="_blank">
        Opensea
      </a>
      <Link className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href="/updates">
        Updates
      </Link>
      <a className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href="https://twitter.com/wearecashcows" target="_blank">
        Twitter
      </a>
      <Link className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href={`/${network}/opensource`}>
        Open Source
      </Link>
      <a className="uppercase basis-1/2 p-3 text-white border-t border-solid border-gray-600" href="https://github.com/cash-cows" target="_blank">
        Github
      </a>
    </footer>
  </aside>
);

export default MainMenu;