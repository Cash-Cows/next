import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';

import { Web3Config } from 'modules/web3';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Config>
      <Component {...pageProps} />
    </Web3Config>
  );
};
