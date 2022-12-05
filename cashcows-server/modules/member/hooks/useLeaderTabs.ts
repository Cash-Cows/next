//hooks
import { useState } from 'react';

const hidden = {
  crew: false,
  milk: false,
  dolla: false
};

export default function useLeaderTabs() {
  const [ toggles, setToggles ] = useState(
    Object.assign({}, hidden, { crew: true })
  );
  const show = {
    crew: () => setToggles(Object.assign({}, hidden, { crew: true })),
    milk: () => setToggles(Object.assign({}, hidden, { milk: true })),
    dolla: () => setToggles(Object.assign({}, hidden, { dolla: true }))
  };

  return { toggles, show };
};