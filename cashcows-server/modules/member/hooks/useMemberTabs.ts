//hooks
import { useState } from 'react';

const hidden = {
  crew: false,
  treasury: false,
  trophies: false
};

export default function useMemberTabs() {
  const [ toggles, setToggles ] = useState(
    Object.assign({}, hidden, { treasury: true })
  );
  const show = {
    crew: () => setToggles(Object.assign({}, hidden, { crew: true })),
    treasury: () => setToggles(Object.assign({}, hidden, { treasury: true })),
    trophies: () => setToggles(Object.assign({}, hidden, { trophies: true }))
  };

  return { toggles, show };
};