//types
import type { RankedData } from '../types';
//global
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCrew(address: string | undefined) {
  //track whenever we pull new crews
  //this happens when the wallet account changes
  const [ crews, setCrews ] = useState<RankedData[]>([]);
  //also track the transition of loading new crew data
  const [ loading, isLoading ] = useState(false);

  useEffect(() => {
    if (address) {
      //start loading
      isLoading(true);
      axios
        //remote local call
        .get(`/api/session/crew?address=${address}`)
        .then(response => {
          //update crews
          setCrews(response.data.results);
          //stop loading
          isLoading(false)
        });
      return;
    }
    //if the address state is null, it means they logged out
    //so empty the crews
    setCrews([]);
  //only reload if the address changes (connect/disconnect/change account)
  }, [ address ]);

  return { crews, loading };
};