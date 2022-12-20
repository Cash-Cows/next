//types
import type { SearchResult } from '../types';
//hooks
import { useState } from 'react';

type CartStates = { totalPrice: number, items: SearchResult[] };

const empty = { totalPrice: 0, items: [] };

export default function useCart() {
  const [ cart, set ] = useState<CartStates>(empty);
  const add = (item: SearchResult) => {
    if (cart.items.filter(active => active.token.tokenId === item.token.tokenId).length) {
      return;
    }

    set({
      totalPrice: cart.totalPrice + item.market.floorAsk.price.amount.decimal,
      items: [...cart.items, item]
    });
  };

  const remove = (item: SearchResult) => set({
    totalPrice: cart.totalPrice - item.market.floorAsk.price.amount.decimal,
    items: cart.items.filter(active => active.token.tokenId !== item.token.tokenId)
  });

  const purge = () => set(empty);

  const selected = (tokenId: number) => cart.items.filter(
    item => item.token.tokenId == tokenId
  ).length > 0 

  return { add, remove, purge, selected, items: cart.items, total: cart.totalPrice };
}