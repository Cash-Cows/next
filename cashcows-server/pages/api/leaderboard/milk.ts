//types
import type { NextApiRequest, NextApiResponse } from 'next';
//others
import axios from 'axios';

type Data = {
  error: boolean,
  results: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const response = await axios.get(
    'https://api.ethplorer.io/getTopTokenHolders/0x981E826E1238213b6848EFD54015BA83F48406Ba?apiKey=freekey&limit=100'
  );

  return res.status(200).send(response.data);
}