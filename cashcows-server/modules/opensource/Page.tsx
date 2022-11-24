//types
import type { NetworkNames } from 'modules/web3';
import type { PageProps } from './types';
//hooks
import { useWeb3 } from 'modules/web3';
//components
import { HTMLHead } from 'modules/ui/components';

export const Head = () => (
  <HTMLHead>
    <title>Open Source Initiative | Cash Cows Club</title>
    <meta name="description" content="The first full featured open source NFT collection found on GitHub and Ethereum" />
    <link rel="canonical" href="https://www.cashcows.club/ethereum/opensource" />
    
    <meta property="og:title" content="Open Source Initiative | Cash Cows Club" />
    <meta property="og:description" content="The first full featured open source NFT collection found on GitHub and Ethereum" />
    <meta property="og:image" content="https://www.cashcows.club/images/banner/banner-opensource.png" />
    <meta property="og:url" content="https://www.cashcows.club/ethereum/opensource" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Open Source Initiative | Cash Cows Club" />
    <meta name="twitter:description" content="The first full featured open source NFT collection found on GitHub and Ethereum" />

    <meta name="twitter:image" content="https://www.cashcows.club/images/banner/banner-opensource.png" />
  </HTMLHead>
);

export const Body: React.FC<PageProps> = ({ chain }) => {
  const { network } = useWeb3();
  network.change(chain as NetworkNames);
  return (
    <main className="h-full relative">
      opensource
    </main>
  );
};