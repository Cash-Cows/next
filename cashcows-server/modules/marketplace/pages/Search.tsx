//types
import type { RankedData } from 'modules/common/types';
//enums
import { BadgeTypes, BadgeLayouts } from 'modules/common/enums';
//hooks
import { useCollection } from '../hooks';
import { useWeb3 } from 'modules/web3';
//components
import Link from 'next/link';
import { HTMLHead, Heading, Badge } from 'modules/common';
//config
import { cdn, host, filters } from 'project.config';

export const Head = () => (
  <HTMLHead>
    <title>TODO</title>
    <meta name="description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    
    <meta property="og:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta property="og:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta property="og:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
    <meta property="og:url" content={`https://${host}/`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta name="twitter:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
  </HTMLHead>
);

type FilterGroupProps = {
  trait: string,
  filters: Record<string, number>
};

const FilterGroup: React.FC<FilterGroupProps> = ({ trait, filters }) => {
  return (
    <div className="form-fieldset">
      <h5 className="flex items-center py-2 border-b border-b-gray-600" onClick={() => {}}>
        <span className="flex-grow">{trait}</span>
        <i className={`fas fa-chevron-left pr-2`}></i>
      </h5>
      <div className="hidden">
        {Object.keys(filters).map(value => (
          <Filter key={value} trait={trait} value={value} count={filters[value]} />
        ))}
      </div>
    </div>
  );
};

type FilterProps = { trait: string, value: string, count: number };

const Filter: React.FC<FilterProps> = ({ trait, value, count }) => {
  return (
    <div className="py-2">
      <label className="flex items-center">
        <input type="radio" name={trait} onChange={() => {}} />
        <span className="ml-2 flex-grow text-xs">{value}</span>
        <Badge type={BadgeTypes.WARNING} layout={BadgeLayouts.SOLID} className="rounded-2xl">
          {count}
        </Badge>
      </label>
    </div>
  );
};

const Crew: React.FC<{ chain: string, data: RankedData }> = ({ chain, data }) => {
  let rarity = BadgeTypes.MUTED;
  if (data.rank < 100) {
    rarity = BadgeTypes.SUCCESS;
  } else if (data.rank < 500) {
    rarity = BadgeTypes.WARNING;
  } else if (data.rank < 1000) {
    rarity = BadgeTypes.INFO;
  }

  let level = BadgeTypes.MUTED;
  if (data.attributes.Level.value === 2) {
    level = BadgeTypes.WARNING;
  } else if (data.attributes.Level.value === 3) {
    level = BadgeTypes.SUCCESS;
  }

  return (
    <Link 
      key={data.edition}
      className="block relative m-2"
      href={`/${chain}/crew/${data.edition}/profile`}
    >
      <img className="w-full rounded-lg" src={`https://${cdn}/crew/preview/${data.edition}_${data.attributes.Level.value}.png`} />
      <Badge type={BadgeTypes.MUTED} className="absolute top-1 left-1 rounded-lg">
        <i className="fas fa-hashtag"></i>
        <span className="inline-block ml-1">{data.edition}</span>
      </Badge>
      <Badge type={rarity} className="absolute bottom-1 left-1 rounded-lg">
        <i className="fas fa-trophy"></i>
        <span className="inline-block ml-1">{data.rank}</span>
      </Badge>
      <Badge type={level} className="absolute bottom-1 right-1 rounded-lg">
        Level {data.attributes.Level.value}
      </Badge>
    </Link>
  );
};

export const Body = () => {
  const { network } = useWeb3();
  const {
    attributes, 
    start, 
    range, 
    sort,
    loading, 
    next,
    results
  } = useCollection(network.config.contracts.crew.address);
  console.log({
    attributes, 
    start, 
    range, 
    sort,
    loading, 
    next,
    results
  });

  return (
    <main className="h-full relative overflow-auto">
      <header className="flex items-center py-8 pl-56 pr-4">
        <Heading level="1" size="xl" className="flex-grow uppercase">Cash Cows Crew</Heading>
        <div className="md:hidden">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={() => {}}>
            <i className="fas fa-filter"></i>
          </a>
        </div>
        <div className="text-black ml-5">
          <select className="bg-[#E1C18A] py-2 px-3" onChange={() => {}}>
            <option value="floorAskPrice">Floor</option>
            <option value="rarity">Rarity</option>
            <option value="tokenId">Token ID</option>
          </select>
        </div>
        <div className="ml-5 relative">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={() => {}}>
            <i className="fas fa-shopping-cart"></i>
          </a>
          <div className={`hidden absolute right-0 w-80 p-4 border-2 border-black rounded-t-lg rounded-b-lg rounded-l-lg bg-gray-500`}>
            <header className="flex items-center border-b border-b-gray-300 text-sm">
              <h5 className="uppercase flex-grow">
                My Cart <Badge type={BadgeTypes.INFO} layout={BadgeLayouts.SOLID}>0</Badge>
              </h5>
              <a className="underline" onClick={() => {}}>
                Clear
              </a>
            </header>
            <div className="border border-white py-4 px-5">Cart is Empty</div>
            <main className="card-body cart-body"></main>
            <footer className="uppercase pt-5 border-t border-t-gray-300">
              <div className="flex items-center">
                <div className="flex-grow">You Pay</div>
                <div className="mt-3">
                  <img className="inline-block mr-3 w-6" src={`https://${cdn}/website/crypto/eth.png`} />
                  0
                </div>
              </div>
              <div className="actions">
                <a className="btn-pixel btn-pixel-lg btn-pixel-success" onClick={() => {}}>
                  Purchase
                </a>
              </div>
            </footer>
          </div>
        </div>
        <div className="ml-5 relative">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={() => {}}>
            <i className="fas fa-broom"></i>
          </a>
          <div className={`hidden absolute right-0 w-80 p-4 border-2 border-black rounded-t-lg rounded-b-lg rounded-l-lg bg-gray-500`}>
            <header className="card-head sweep-head">
              <div className="range">
                <input 
                  onChange={() => {}}
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1" 
                  value="0" 
                />
              </div>
              <div className="count">0</div>
            </header>
            <main className="card-body sweep-body"></main>
            <footer className="card-foot sweep-foot">
              <div className="total">
                <div className="label">You Pay</div>
                <div className="amount amount-eth"> 0 </div>
              </div>
              <div className="actions">
                <a className="btn-pixel btn-pixel-lg btn-pixel-success" onClick={() => {}}>
                  Purchase
                </a>
              </div>
            </footer>
          </div>
        </div>
      </header>
      <section className="flex">
        <aside className="w-full max-w-[224px] pb-4">
          <div className="pl-4">
            <header className="hidden cursor-pointer p-4 bg-black uppercase items-center" onClick={() => {}}>
              <Heading level="2" className="flex-grow">Filters</Heading>
              <i className="fas fa-times"></i>
            </header>
            <main className="attributes-body">
              {Object.keys(filters.crew).map(trait => (
                <FilterGroup key={trait} trait={trait} filters={filters.crew[trait]} />
              ))}
            </main>
          </div>
        </aside>
        <main className="flex-grow px-4">
          <main className="results">
            {results.map(row => (
              <div className="item">
                <a className="preview" href="{HREF}" target="_blank">
                  <img src="{IMAGE}" loading="lazy" />
                  <span className="badge badge-muted badge-edition">
                    <i className="fas fa-hashtag"></i>
                    {row.token.tokenId}
                  </span>
                  <span className="badge badge-success badge-action">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <span className="badge badge-rank badge-{RARITY}">
                    <i className="fas fa-trophy"></i>
                    {1}
                  </span>
                  <span className="badge badge-muted badge-level">Level {1}</span>
                </a>
              </div>
            ))}
          </main>
          <a className="block rounded-lg border border-gray-600 text-center w-full p-4" onClick={() => {}}>
            Load More
          </a>
        </main>
      </section>
    </main>
  );
};