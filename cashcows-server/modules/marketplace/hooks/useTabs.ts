//hooks
import { useState } from 'react';

const hideAll = { cart: false, sweep: false };

export default function useTabs() {
  const [ opened, open ] = useState<Record<string, boolean>>(hideAll);

  const openCart = () => open({ cart: !opened.cart, sweep: false});
  const openSweep = () => open({ cart: false, sweep: !opened.sweep});
  const close = () => open(hideAll)

  return { opened, openCart, openSweep, close };
}