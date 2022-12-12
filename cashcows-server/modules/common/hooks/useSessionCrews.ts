//types
import type { RankedData } from '../types';
//global
import { useEffect, useState } from 'react';
import axios from 'axios';

type SessionCrewStates = {
  session: string|undefined,
  crews: RankedData[]
};

export default function useSessionCrews(address: string|undefined) {
  //track whenever we pull new crews
  //this happens when the wallet account changes
  const [ sessionCrews, setSessionCrews ] = useState<SessionCrewStates>({
    session: undefined,
    crews: []
  });
  useEffect(() => {
    if (address && address !== sessionCrews.session) {
      axios
        //remote local call
        .get(`/api/session/crew?address=${address}`)
        .then(response => setSessionCrews({
          session: address,
          crews: response.data.results
        }));
      return;
    }
    //if the address state is null, it means they logged out
    //so empty the crews
    setSessionCrews({ session: undefined, crews: [] });
  //only reload if the address changes (connect/disconnect/change account)
  }, [ address ]);

  return {
    session: sessionCrews.session,
    crews: sessionCrews.crews
  };
};