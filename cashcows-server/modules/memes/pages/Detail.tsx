//components
import { HTMLHead } from 'modules/common';
//config
import { cdn, host } from 'project.config';

export const Head = () => (
  <HTMLHead>
    <title>TODO</title>
    <meta name="description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    
    <meta property="og:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta property="og:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta property="og:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
    <meta property="og:url" content={`https://${host}/`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta name="twitter:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
  </HTMLHead>
);

export const Body = () => (
  <main className="h-full relative">
    TODO
  </main>
);