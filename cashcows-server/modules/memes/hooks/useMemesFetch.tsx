//types
import type { MemeStates } from '../types';
//hooks
import { useEffect, useState } from 'react';
import { useTaskQueue } from 'modules/ui';
//config
import { api } from 'project.config';
//others
import axios from 'axios'; 
import faceswap from '../faceswap';

const reset: MemeStates = { 
  q: null, 
  start: 0, 
  range: 50, 
  loading: false, 
  next: false,
  results: [] 
};

export default function useMemesFetch(headshot: string|Function) {
  const [ memes, setMemes ] = useState<MemeStates>(reset);
  const { tasks, purge, queue } = useTaskQueue();

  const isFunc = typeof headshot === 'function';
  const filter = (q: string|null, start = 0, range = 50) => {
    if (q !== memes.q) {
      purge();
      setMemes({ ...reset, q, start, range });
      return;
    }

    setMemes({ ...memes, q, start, range });
  };

  useEffect(() => {
    if (memes.loading) {
      return;
    }
  
    const { q, start, range } = memes;
    const url = q?.length 
      ? `https://${api}/meme/search.php?q=${q}&start=${start}&range=${range}`
      : `https://${api}/meme/search.php?start=${start}&range=${range}`;

    setMemes(prev => ({ ...prev, loading: true }));

    axios.get(url).then(response => {
      if (response.data.results.length > 0) {
        for (let i = 0; i < response.data.results.length; i++) {
          const row = response.data.results[i];
          queue(async () => {
            const blob = await faceswap(row, isFunc ? headshot(): headshot);
            //if there not a gif
            if (!blob) {
              return;
            }
  
            setMemes(prev => ({
              ...prev,
              loading: false,
              next: true,
              results: [
                ...prev.results,
                {
                  id: parseInt(row.id),
                  up: row.up,
                  description: row.description,
                  name: row.description.replace(/\s+/g, '-'),
                  down: row.down,
                  image: URL.createObjectURL(blob)
                }
              ]
            }));
          });
        }
      } else {
        setMemes(prev => ({ ...prev, next: false }));
      }
    });
  }, [ memes.q, memes.start, memes.range ]);

  return { ...memes, filter, tasks, purge, queue };
};