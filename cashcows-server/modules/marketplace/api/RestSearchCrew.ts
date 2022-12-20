//types
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NetworkConfig } from 'modules/web3/types';
import type { RankedData } from 'modules/common/types';
import type { SearchResult } from '../types';
//enums
import { NetworkNames } from 'modules/web3/enums';
//data
import { networks } from 'project.config';
import metadata from 'config/crew/rankdata.json';
//others
import axios from 'axios';

export default async function RestSearchCrew(
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean,
    message?: string,
    results?: number[],
    next?: string|null
  }>
) {
  const {
    chain = NetworkNames.ETHEREUM,
    ...query
  } = req.query;

  let config: NetworkConfig;
  switch (chain) {
    case NetworkNames.ETHEREUM:
      config = networks.ethereum;
      break;
    case NetworkNames.GOERLI:
      config = networks.goerli;
      break;
    default:
      return res.status(200).json({
        error: true,
        message: 'Invalid Network'
      });
  }

  const params = new URLSearchParams(query as Record<string, string>);
  params.set('collection', config.contracts.crew.address);
  const url = `https://api.reservoir.tools/tokens/v5?${
    decodeURIComponent(params.toString())
  }`;

  const response = await axios.get(url, {
    headers: {
      'Accept': '*/*',
      'X-API-KEY': process.env.RESERVOIR_KEY
    }
  });

  const results = response.data.tokens.map((row: SearchResult) => ({
    ...row,
    data: (metadata as RankedData[]).filter(
      data => parseInt(row.token.tokenId.toString()) === data.edition
    )[0]
  }));

  const next = response.data.continuation as string|null;
  res.status(200).json({ error: false, results, next });
}
