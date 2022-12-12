//types
import type { NextApiRequest, NextApiResponse } from 'next';
//others
import axios from 'axios';

export default async function RestLeaderDolla(
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean,
    results: string
  }>
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const response = await axios.get(
    'https://api.ethplorer.io/getTopTokenHolders/0xa61a3d600db91942E0BD36EA7f1a8f9cc7F99086?apiKey=freekey&limit=100'
  );

  return res.status(200).send(response.data);
}