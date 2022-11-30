//types
import type { Collection, LootData } from '../types';
//hooks
import { useEffect, useRef } from 'react';
//config
import { cdn } from 'project.config';
//others
import { getNetwork, read } from 'modules/web3';
import axios from 'axios';

export default function useLoot(chain: string, characterId: string) {
  const network = getNetwork(chain);
  const loots = useRef<LootData[]>([]);

  useEffect(() => {
    (async() => {
      const metadata: LootData[] = (
        await axios.get(`https://${cdn}/loot/metadata.json`)
      ).data;
      const owned: Collection[] = await read(network.name, 'game')
        .items(characterId);
      loots.current = owned.map(
        item => metadata.filter(
          row => row.itemId === item.collectionTokenId.toString()
        )[0]
      );
    })();
  }, []);

  return loots;
};