//types
import type { Attributes, SearchStates, SearchResult } from '../types';
//hooks
import { useEffect, useState } from 'react';
//others
import axios from 'axios'; 

const reset: SearchStates = { 
  attributes: {}, 
  range: 50, 
  sort: 'floorAskPrice',
  loading: false, 
  next: null,
  continuation: null,
  results: [] 
};

export default function useCollection(contractAddress: string) {
  const [ collection, setCollection ] = useState<SearchStates>(reset);
  const filter = (
    attributes: Attributes = {}, 
    sort = 'floorAskPrice', 
    range = 50, 
    next: string|null = null
  ) => {
    if (JSON.stringify(attributes) !== JSON.stringify(collection.attributes)) {
      setCollection({ ...reset, attributes, sort, range, next });
      return;
    }

    setCollection({ ...collection, attributes, sort, range, next });
  };

  useEffect(() => {
    if (collection.loading) {
      return;
    }
  
    const { attributes, sort, range, next } = collection;

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

    const url = `/api/marketplace/search?${
      decodeURIComponent(params.toString())
    }`;

    setCollection(prev => ({ ...prev, loading: true }));

    axios.get(url).then(response => setCollection(prev => ({ 
      ...prev, 
      results: response.data.results,
      continuation: response.data.next || null,
      loading: false
    })));
  }, [ 
    collection.attributes, 
    collection.sort,
    collection.next,
    collection.range 
  ]);

  return { ...collection, filter };
};