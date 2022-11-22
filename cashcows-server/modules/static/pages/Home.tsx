//enums
import { PixelButtonSizes, PixelButtonTypes } from 'modules/ui/enums';
//components
import { HTMLHead, PixelButton } from 'modules/ui/components';

export const Head = () => (
  <HTMLHead>
    <title>Cash Cows Club - NFT, Loots, Memes, Metaverse</title>
    <meta name="description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    
    <meta property="og:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta property="og:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta property="og:image" content="https://www.cashcows.club/images/banner/banner-home.png" />
    <meta property="og:url" content="https://www.cashcows.club/" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Cash Cows Club - NFT, Loots, Memes, Metaverse" />
    <meta name="twitter:description" content="Cash Cows is an upcoming blue chip alpha NFT club and a collection of 4,000 PFPs entering the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />

    <meta name="twitter:image" content="https://www.cashcows.club/images/banner/banner-home.png" />
  </HTMLHead>
);

export const Body = () => (
  <main className="h-full relative">
    <div className="absolute top-5 left-0 right-0 bottom-24 overflow-hidden">
      <video className="w-full" autoPlay loop muted playsInline>
        <source src="/media/home-teaser.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="lg:hidden flex justify-center text-center absolute top-5 left-0 right-0 bottom-24 overflow-hidden">
      <img className="h-full w-auto max-w-none" src="/media/home-mobile-teaser.gif" />
    </div>
    <div className="flex justify-center text-center absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
      <img className="h-full min-h-screen w-auto max-w-none" src="/images/stage.png" />
    </div>
    <div className="flex justify-center text-center absolute left-0 right-0 bottom-10 overflow-hidden">
      <PixelButton 
        type={PixelButtonTypes.WARNING} 
        size={PixelButtonSizes.LARGE} 
        onClick={() => (window.location.href = '/about')}
        className="text-xs"
      >
        Learn More
      </PixelButton>
    </div>
  </main>
);