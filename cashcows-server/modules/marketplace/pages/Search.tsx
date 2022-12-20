//types
import type { SearchResult, FilterGroupProps, FilterProps } from '../types';
//enums
import { BadgeTypes, BadgeLayouts } from 'modules/common/enums';
import { PixelButtonTypes, PixelButtonSizes } from 'modules/common/enums';
//hooks
import React from 'react';
import { toShortAddress } from 'modules/web3';
import { useSearch } from '../hooks';
//components
import Link from 'next/link';
import { HTMLHead, Heading, Badge, PixelButton } from 'modules/common';
//config
import { cdn, host, filters } from 'project.config';

export const Head = () => (
  <HTMLHead>
    <title>Cash Cows Crew | Cash Cows</title>
    <meta name="description" content="Dont have a cow? Find one now on the #1 Cow Search Engine!" />
    
    <meta property="og:title" content="Cash Cows Crew | Cash Cows" />
    <meta property="og:description" content="Dont have a cow? Find one now on the #1 Cow Search Engine!" />
    <meta property="og:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
    <meta property="og:url" content={`https://${host}/ethereum/crew`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Cash Cows Crew | Cash Cows" />
    <meta name="twitter:description" content="Dont have a cow? Find one now on the #1 Cow Search Engine!" />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
  </HTMLHead>
);

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

const Crew: React.FC<{ 
  chain: string, 
  item: SearchResult, 
  add: Function, 
  remove: Function,
  buy: Function,
  selected: Function
}> = ({ chain, item, add, remove, buy, selected }) => {
  const { data, market, token } = item;

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

  const index = parseInt(String(data.attributes.Level.value)) - 1;
  const isSelected = selected(item.token.tokenId);

  return (
    <article className="m-2 border border-gray-500 rounded-lg overflow-hidden">
      <Link className="block relative" href={`/${chain}/crew/${data.edition}/profile`}>
        <img className="w-full" src={`https://${cdn}/crew/preview/${data.edition}_${index}.png`} />
        <Badge type={BadgeTypes.MUTED} className="absolute top-1 left-1 rounded-lg">
          <i className="fas fa-hashtag"></i>
          <span className="inline-block ml-1">{data.edition}</span>
        </Badge>
        {isSelected && (
          <Badge type={BadgeTypes.SUCCESS} className="absolute top-1 right-1 rounded-lg">
            <i className="fas fa-shopping-cart"></i>
          </Badge>
        )}
        <Badge type={rarity} className="absolute bottom-1 left-1 rounded-lg">
          <i className="fas fa-trophy"></i>
          <span className="inline-block ml-1">{data.rank}</span>
        </Badge>
        <Badge type={level} className="absolute bottom-1 right-1 rounded-lg">
          Level {data.attributes.Level.value}
        </Badge>
      </Link>
      {market.floorAsk?.price?.amount?.decimal && (
        <div className="flex items-center justify-center p-2">
          <img className="w-6" src={`https://${cdn}/website/crypto/eth.png`} />
          <span className="ml-2 flex-grow">{market.floorAsk?.price?.amount?.decimal}</span>
          <a href={`https://opensea.io/assets/${chain}/${token.contract}/${token.tokenId}`} target="_blank">
            <img className="w-6" src={`https://${cdn}/website/logo/logo-opensea.png`} />
          </a>
        </div>
      )} 
      {market.floorAsk?.price?.amount?.decimal && (
        <div className="flex border-t border-t-gray-500 cursor-pointer">
          <a className="basis-1/2 text-xs text-white text-center uppercase bg-yellow-500 py-2" onClick={() => buy(item)}>
            <i className="fas fa-check-circle text-white mr-1"></i>
            <span>Buy Now</span>
          </a>
          {isSelected && (
            <a className="basis-1/2 text-xs text-red-500 text-center uppercase py-2" onClick={() => remove(item)}>
              <i className="fas fa-times mr-1"></i>
              <span>Remove</span>
            </a>
          )}
          {!isSelected && (
            <a className="basis-1/2 text-xs text-white text-center uppercase py-2" onClick={() => add(item)}>
              <i className="fas fa-shopping-cart text-white mr-1"></i>
              <span>Add</span>
            </a>
          )}
        </div>
      )}
      {!market.floorAsk?.price?.amount?.decimal && (
        <div className="text-xs text-center py-2">
          <span>Owned By:</span>
          <Link href={`/member/${token.owner}`} className="ml-1 underline">
            {toShortAddress(token.owner || '')}
          </Link>
        </div>
      )}
      {!market.floorAsk?.price?.amount?.decimal && (
        <Link className="block text-sm text-white text-center uppercase bg-yellow-500 py-2" href={`/${chain}/crew/${data.edition}/profile`}>
          View
        </Link>
      )}
    </article>
  );
};

export const Body = () => {
  const { network, tabs, collection, cart, sweep, buy } = useSearch();

  const sweepInputRef = React.createRef<HTMLInputElement>();
  const updateSweepAmount = () => {
    if (sweepInputRef.current?.value) {
      sweep.set(parseInt(sweepInputRef.current.value));
    }
  };

  const collectionSortRef = React.createRef<HTMLSelectElement>();
  const sort = () => {
    if (collectionSortRef.current?.value) {
      collection.filter(
        collection.attributes, 
        collectionSortRef.current.value, 
        collection.range, 
        collection.next
      );
    }
  };

  return (
    <main className="h-full relative overflow-auto">
      <header className="flex flex-wrap justify-center items-center py-8 pl-4 pr-4 md:justify-start md:flex-nowrap md:pl-60">
        <Heading level="1" size="xl" className="text-center md:text-left w-full mb-2 md:mb-0 md:w-auto flex-grow uppercase">
          Cash Cows Crew
        </Heading>
        <div className="md:hidden">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={tabs.close}>
            <i className="fas fa-filter"></i>
          </a>
        </div>
        <div className="text-black ml-3">
          <select ref={collectionSortRef} className="bg-[#E1C18A] py-2 px-3" onChange={sort}>
            <option value="floorAskPrice">Floor</option>
            <option value="rarity">Rarity</option>
            <option value="tokenId">Token ID</option>
          </select>
        </div>
        <div className="ml-3 md:relative">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={tabs.openCart}>
            <i className="fas fa-shopping-cart"></i>
          </a>
          <div className={`${tabs.opened.cart ? 'flex md:block': 'hidden'} absolute flex-col z-10 right-0 top-32 w-full bottom-0 md:bottom-auto md:w-80 px-2 py-1 border-2 border-black rounded-tr-none bg-gray-500 md:top-8 md:rounded-lg`}>
            <header className="flex items-center border-b border-b-gray-800 mb-2 text-sm py-1">
              <h5 className="uppercase flex-grow">
                My Cart <Badge type={BadgeTypes.INFO} layout={BadgeLayouts.SOLID} className="rounded-2xl">{cart.items.length}</Badge>
              </h5>
              <a className="underline cursor-pointer" onClick={cart.purge}>
                Clear
              </a>
            </header>
            {!cart.items.length && <div className="border border-white py-4 px-5">Cart is Empty</div>}
            {!!cart.items.length && (
              <main className="flex flex-wrap flex-grow">
                {cart.items.map(item => (
                  <div key={item.token.tokenId} className="basis-1/4 md:basis-1/3">
                    <div className="mx-2 my-2 text-center">
                      <img className="w-full" src={item.token.image} />
                      <img className="inline-block w-4 mr-1" src={`https://${cdn}/website/crypto/eth.png`} />
                      <span className="text-xs">{item.market.floorAsk.price.amount.decimal}</span>
                    </div>
                  </div>
                ))}
              </main>
            )}
            <footer className="uppercase mt-2 pt-2 border-t border-t-gray-800">
              <div className="flex items-center">
                <div className="flex-grow">You Pay</div>
                <div className="">
                  <img className="inline-block mr-3 w-6" src={`https://${cdn}/website/crypto/eth.png`} />
                  {cart.total.toFixed(4)}
                </div>
              </div>
              <div className="text-center">
                <PixelButton type={PixelButtonTypes.SUCCESS} size={PixelButtonSizes.LARGE} onClick={cart.buy} className="w-[calc(100%-20px)]">
                  Purchase
                </PixelButton>
              </div>
            </footer>
          </div>
        </div>
        <div className="ml-3 md:relative">
          <a className="text-black bg-[#E1C18A] py-2 px-3 cursor-pointer" onClick={tabs.openSweep}>
            <i className="fas fa-broom"></i>
          </a>
          <div className={`${tabs.opened.sweep ? 'flex md:block': 'hidden'} absolute flex-col z-10 right-0 top-32 w-full bottom-0 md:bottom-auto md:w-80 px-2 py-1 border-2 border-black rounded-tr-none bg-gray-500 md:top-8 md:rounded-lg`}>
            <header className="flex items-center border-b border-b-gray-800 mb-2 text-sm py-1">
              <div className="w-full">
                <input 
                  className="w-full"
                  ref={sweepInputRef}
                  onChange={updateSweepAmount}
                  type="range" 
                  min="0" 
                  max={sweep.items.length} 
                  step="1" 
                  value={sweep.amount} 
                />
              </div>
              <div className="px-4 mb-1">{sweep.amount}</div>
            </header>
            <main className="flex flex-wrap flex-grow overflow-auto">
              {sweep.items.filter((floor, i) => i < sweep.amount).map(floor => (
                <div key={floor.token.tokenId} className="basis-1/4 md:basis-1/3">
                  <div className="mx-2 my-2 text-center">
                    <img className="w-full" src={floor.token.image} />
                    <img className="inline-block w-4 mr-1" src={`https://${cdn}/website/crypto/eth.png`} />
                    <span className="text-xs">{floor.market.floorAsk.price.amount.decimal}</span>
                  </div>
                </div>
              ))}
            </main>
            <footer className="uppercase mt-2 pt-2 border-t border-t-gray-800">
              <div className="flex items-center">
                <div className="flex-grow">You Pay</div>
                <div className="">
                  <img className="inline-block mr-3 w-6" src={`https://${cdn}/website/crypto/eth.png`} />
                  {sweep.total.toFixed(4)}
                </div>
              </div>
              <div className="text-center">
                <PixelButton type={PixelButtonTypes.SUCCESS} size={PixelButtonSizes.LARGE} onClick={sweep.buy} className="w-[calc(100%-20px)]">
                  Purchase
                </PixelButton>
              </div>
            </footer>
          </div>
        </div>
      </header>
      <section className="flex">
        <aside className="flex-grow-0 flex-shrink-0 hidden md:block md:w-[224px] pb-4">
          <div className="pl-4">
            <header className="md:hidden cursor-pointer p-4 bg-black uppercase items-center" onClick={() => {}}>
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
        <main className="flex-grow px-3">
          <main className="flex flex-wrap">
            {collection.items.filter(row => parseInt(String(row.data.attributes.Level.value)) > 0).map(row => (
              <div key={row.data.edition} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Crew chain={network.config.name} item={row} add={cart.add} remove={cart.remove} buy={buy} selected={cart.selected} />
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