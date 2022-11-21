import type { NextApiRequest, NextApiResponse } from 'next';
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
    'https://api.ethplorer.io/getTopTokenHolders/0xa61a3d600db91942E0BD36EA7f1a8f9cc7F99086?apiKey=freekey&limit=100'
  );

  return res.status(200).send(response.data);
}