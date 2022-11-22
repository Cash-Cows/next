//types
import type { NextApiRequest, NextApiResponse } from 'next';
//others
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean,
    message?: string,
    results?: any
  }>
) {
  const path = `https://api.reservoir.tools/${(req.url as string).substring(15)}`;
  const options = {
    headers: {
      'Accept': '*/*',
      'X-API-KEY': process.env.RESERVOIR_KEY
    }
  };

  let response;
  try {
    if (req.method === 'POST') {
      response = await axios.post(path, req.body, options);
    } else {
      response = await axios.get(path, options);
    }
  } catch(e) {
    return res.status(200).json({
      error: true,
      message: 'Service Unavailable'
    }); 
  }

  return res.status(200).json({
    error: false,
    results: response.data
  }); 
}
