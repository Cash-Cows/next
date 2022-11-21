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
    'https://api.ethplorer.io/getTopTokenHolders/0x1A371de4634c3DEBf7196A1EFc59e620aff0915F?apiKey=freekey&limit=100'
  );

  return res.status(200).send(response.data);
}
