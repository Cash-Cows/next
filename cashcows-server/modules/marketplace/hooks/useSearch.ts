//types
import type { SearchResult } from '../types';
//hooks
import { useMintForm, useBuyItems } from 'modules/common';
import { useWeb3 } from 'modules/web3';
import useTabs from './useTabs';
import useCart from './useCart';
import useCollection from './useCollection';

export default function useSearch() {
  const { network, account } = useWeb3();
  const {
    mintAmount,
    totalPrice,
    setAmount,
    floorItems
  } = useMintForm(account.address, network.config, 100, false);
  
  const {
    attributes,
    range, 
    sort,
    loading, 
    next,
    continuation,
    results,
    filter
  } = useCollection(network.config.contracts.crew.address);

  const { opened, openCart, openSweep, close } = useTabs();
  const { items, total, add, remove, purge, selected } = useCart();
  const buy = useBuyItems();

  const buySweep = () => {
    //collect all the tokens up to the mint 
    //amount, respective of the floor list
    const tokens = [];
    for (let i = 0; i < mintAmount && i < floorItems.length; i++) {
      tokens.push(`${network.config.contracts.crew.address}:${floorItems[i].token.tokenId}`);
    }

    buy(tokens);
  };
  const buyCart = () => buy(items.map(row => 
    `${network.config.contracts.crew.address}:${row.token.tokenId}`
  ));
  const buyItem = (item: SearchResult) => buy([
    `${network.config.contracts.crew.address}:${item.token.tokenId}`
  ]);

  return {
    network, 
    account,
    tabs: { opened, openCart, openSweep, close },
    collection: {
      attributes,
      range, 
      sort,
      loading, 
      next,
      continuation,
      items: results,
      filter
    },
    cart: { items, total, add, remove, purge, selected, buy: buyCart },
    sweep: {
      amount: mintAmount,
      total: totalPrice,
      buy: buySweep,
      items: floorItems,
      set: setAmount
    },
    buy: buyItem
  };
}