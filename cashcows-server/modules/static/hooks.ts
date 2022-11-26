import { useState } from 'react';

const closed = {
  barn: false,
  market: false,
  loot: false,
  hustle: false,
  cribs: false
};

export function useAboutModals() {
  const [ toggles, setToggles ] = useState(closed);
  const open = {
    barn: () => setToggles(Object.assign({}, closed, { barn: true })),
    market: () => setToggles(Object.assign({}, closed, { market: true })),
    loot: () => setToggles(Object.assign({}, closed, { loot: true })),
    hustle: () => setToggles(Object.assign({}, closed, { hustle: true })),
    cribs: () => setToggles(Object.assign({}, closed, { cribs: true }))
  };

  const close = () => setToggles(closed);

  return { toggles, open, close };
};