import { useEffect, useState } from 'react';
import axios from 'axios';

import type { RankedData } from '../types';

export default function useCrew(address: string | undefined) {
  const [ crews, setCrews ] = useState<RankedData[]>([]);
  const [ loading, isLoading ] = useState(false);

  useEffect(() => {
    if (address) {
      isLoading(true);
      axios
        .get(`/api/session/crew?address=${address}`)
        .then(response => {
          setCrews(response.data.results);
          isLoading(false)
        });
      return;
    }

    setCrews([]);
  }, [ address ]);

  return { crews, loading };
};