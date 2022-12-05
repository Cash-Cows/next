//types
import type { RankedData } from 'modules/ui/types';
//global
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCrews(address: string|undefined) {
  //track whenever we pull new crews
  //this happens when the wallet account changes
  const [ crews, setCrews ] = useState<{
    loaded: boolean,
    crews: RankedData[]
  }>({
    loaded: false,
    crews: []
  });
  useEffect(() => {
    axios.get(
      `/api/session/crew?address=${address}`
    ).then(
      response => setCrews({
        loaded: true,
        crews: response.data.results
      })
    );
  }, []);

  return crews;
};