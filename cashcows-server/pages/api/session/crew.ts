import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';

import { NetworkNames } from 'modules/web3/enums';
import { NetworkConfig } from 'modules/web3/types';
import { Metadata } from 'modules/ui/types';

import CrewData from 'data/crew.json';
import GoerliConfig from 'data/ethereum.json';
import EthereumConfig from 'data/ethereum.json';

type Data = {
  error: boolean,
  message?: string,
  results?: number[]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, network = NetworkNames.ETHEREUM } = req.query;
  
  if (!address) {
    return res.status(200).json({
      error: true,
      message: 'Address Missing'
    });
  }

  let config: NetworkConfig;
  switch (network) {
    case NetworkNames.ETHEREUM:
      config = EthereumConfig;
      break;
    case NetworkNames.GOERLI:
      config = GoerliConfig;
      break;
    default:
      return res.status(200).json({
        error: true,
        message: 'Invalid Network'
      });
  }

  const provider = new ethers.providers.JsonRpcProvider(config.rpc.http);
  const contract = new ethers.Contract(
    config.contracts.index.address, 
    config.contracts.index.abi, 
    provider
  );

  const metadata = CrewData as Metadata;
  const results = (await contract.ownerTokens(
    config.contracts.crew.address, 
    address,
    4030
  )).map((tokenId: string|number) => {
    return metadata.rows.filter(
      row => parseInt(tokenId.toString()) === row.edition
    )[0];
  });

  res.status(200).json({ error: false, results: results });
}
