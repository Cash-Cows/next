//types
import type { NextApiRequest, NextApiResponse } from 'next';
//others
import axios from 'axios';

export default async function RestLeaderCrew(
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean,
    results: string
  }>
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const response = await axios.get(
    'https://api.ethplorer.io/getTopTokenHolders/0x1A371de4634c3DEBf7196A1EFc59e620aff0915F?apiKey=freekey&limit=100'
  );

  return res.status(200).send(response.data);
}
