//types
import type { Attributes, SearchStates } from '../types';
//hooks
import { useEffect, useState } from 'react';
//others
import axios from 'axios'; 

const reset: SearchStates = { 
  attributes: {}, 
  start: 0, 
  range: 50, 
  sort: 'floorAskPrice',
  loading: false, 
  next: null,
  results: [] 
};

export default function useCollection(contractAddress: string) {
  const [ collection, setCollection ] = useState<SearchStates>(reset);
  const filter = (attributes: Attributes = {}, start = 0, range = 50) => {
    if (JSON.stringify(attributes) !== JSON.stringify(collection.attributes)) {
      setCollection({ ...reset, attributes, start, range });
      return;
    }

    setCollection({ ...collection, attributes, start, range });
  };

  useEffect(() => {
    if (collection.loading) {
      return;
    }
  
    const { attributes, sort, start, range, next } = collection;

    const params = new URLSearchParams();
    params.set('collection', `0x.${contractAddress.substring(2)}`);
    params.set('limit', String(range));
    params.set('sortBy', sort);

    for (const trait in attributes) {
      params.set(`attributes[${trait}]`, String(attributes[trait]));
    }
    
    if (next) {
      params.set('continuation', next);
    }

    const url = `https://api.cashcows.club/reservoir/tokens/v5?${
      decodeURIComponent(params.toString())
    }`;

    setCollection(prev => ({ ...prev, loading: true }));

    axios.get(url).then(response => setCollection(prev => ({ 
      ...prev, 
      results: response.data.results.tokens,
      next: response.data.results.continuation || null,
      loading: false
    })));
  }, [ collection.attributes, collection.start, collection.range ]);

  return { ...collection, filter };
};