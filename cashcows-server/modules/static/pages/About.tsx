//types
import type { AboutPageProps } from '../types';
//enums
import { PixelButtonSizes, PixelButtonTypes } from 'modules/common/enums';
//components
import Script from 'next/script';
import { 
  HTMLHead, 
  PixelButton, 
  Heading, 
  PaperBox,
  modal
} from 'modules/common';
//config
import { cdn, host, networks } from 'project.config';
//others
import { ethers } from 'ethers';
import { toEther } from 'modules/web3/utils';

const goals = [
  { value: 10, image: `https://${cdn}/website/badges/community/morgan_stanley.png` },
  { value: 50, image: `https://${cdn}/website/badges/community/wells_fargo.png` },
  { value: 100, image: `https://${cdn}/website/badges/community/bank_of_america.png` },
  { value: 250, image: `https://${cdn}/website/badges/community/citi.png` },
  { value: 500, image: `https://${cdn}/website/badges/community/jpmorgan.png` },
  { value: 1000, image: `https://${cdn}/website/badges/community/ethereum.png` },
];

const Section1 = () => (
  <section className="bg-[#DEB273] bg-[length:1000px_auto] bg-treasure bg-bottom bg-repeat-x">
    <div className="container m-auto px-4 pt-12 pb-32 md:pt-24 md:flex">
      <div className="max-w-sm m-auto">
        <img className="w-full" alt="Cash Cows Club NFTs" src={`https://${cdn}/website/about/brady-bunch.png`} />
      </div>
      <div className="md:pl-10 text-gray-800 text-center md:text-left">
        <Heading level="1" font="pixel" size="lg" color="black" className="uppercase pt-5 md:pt-0">
          About Cash Cows Club
        </Heading>
        <p className="pt-5">
          We started as a free mint &hellip; As an experiment about sharing 
          wealth with every Cow holder. We have now evolved and aim to be 
          the next upcoming blue chip alpha NFT club.
        </p>
        <ul className="md:list-disc md:pl-10 pt-2">
          <li className="pt-2">Hold 2 Earn: Real crypto &amp; $MILK</li>
          <li className="pt-2">Play 2 Mint: More NFTs the more you play</li>
          <li className="pt-2">CC0 Personal &amp; Commercial Rights</li>
          <li className="pt-2">Zero Listing Fees</li>
          <li className="pt-2">Open Source</li>
          <li className="pt-2">100% on-chain</li>
        </ul>
      </div>
    </div>
  </section>
);

const Section2 = ({ redeemed, unclaimed }: AboutPageProps) => {
  //total sale is what the contract got times 10 (because 10% creators fee)
  const totalVolume = (unclaimed + redeemed) * 10;
  return (
    <>
      <section className={[
        'bg-gradient-to-b', 
        'from-black via-black to-blue-900', 
        'before:border-t-8', 
        'before:border-t-[#251205]', 
        `before:bg-dirt2`, 
        'before:bg-repeat-x', 
        `before:content-[' ']`, 
        'before:block', 
        'before:w-full', 
        'before:h-10'
      ].join(' ')}>
        <div className="container m-auto py-10">
          <Heading level="2" font="pixel" size="md" color="yellow-500" className="text-center">
            Community Achievements
          </Heading>
          <p className="text-center text-sm py-4">
            The Herd Effort. Members earn ETH per marketplace sale. We Win Together.
          </p>
          <div className="flex justify-center text-center">
            <div className="mr-5">
              <h6 className="font-bold">Redeemed</h6>
              <PixelButton type={PixelButtonTypes.DEFAULT} size={PixelButtonSizes.NORMAL} font="courier" className="font-bold text-sm">
                <img alt="ethereum logo" src={`https://${cdn}/website/crypto/eth.png`} className="inline-block max-w-none w-5 mr-2" />
                <span className="text-gray-800">{redeemed}</span>
              </PixelButton>
            </div>
            <div className="ml-5">
              <h6 className="font-bold">Unclaimed</h6>
              <PixelButton type={PixelButtonTypes.DEFAULT} size={PixelButtonSizes.NORMAL} font="courier" className="font-bold text-sm">
                <img alt="ethereum logo" src={`https://${cdn}/website/crypto/eth.png`} className="inline-block max-w-none w-5 mr-2" />
                <span className="text-gray-800">{unclaimed}</span>
              </PixelButton>
            </div>
          </div>
          <div className="flex items-center justify-center mx-auto my-10 w-full max-w-lg text-center">
            {goals.map(goal => (
              <aside key={goal.value} className={`${totalVolume > goal.value? '': ''} flex-shrink`}>
                <img alt={`Goal ${goal.value}ETH`} src={goal.image} className={`${totalVolume <= goal.value? 'opacity-30': ''} inline w-10 sm:w-14`} />
                <Heading level="6" size="xs" font="courier sm:font-pixel" color={totalVolume > goal.value? 'yellow-500': 'bg-gray-200'} className="p-2 sm:p-3">{goal.value}ETH</Heading>
                <div className={`${totalVolume > goal.value? 'bg-[#F9AF00]': 'bg-gray-400'} h-5`}></div>
              </aside>
            ))}
          </div>
        </div>
      </section>
      <section><img alt="farm" src={`https://${cdn}/website/about/farm.png`} /></section>
    </>
  );
};

const Section3 = () => {
  const show = {
    barn: () => {
      modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
      modal.body(
        <>
          <img alt="the barn" src={`https://${cdn}/website/about/about-bg-barn.png`} />
          <Heading level="3" font="pixel" size="xl" color="yellow-500" className="py-5">
            The Barn
          </Heading>
          <p className="text-sm leading-8">
            Your adventure starts at the Barn. This is where you go to $MILK
            your cow. $MILK can be redeemed by the second. Some cow crews 
            yield more $MILK than others.
          </p>
        </>
      );
      modal.open();
    },
    market: () => {
      modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
      modal.body(
        <>
          <img alt="farmers market" src={`https://${cdn}/website/about/about-bg-market.png`} />
          <Heading level="3" font="pixel" size="xl" color="yellow-500" className="py-5">
            Farmers Market
          </Heading>
          <p className="text-sm leading-8">
            Once you collect enough $MILK, you go to the Farmers Market to 
            sell it. Some cow crews are more skilled at selling $MILK than
            others.
          </p>
        </>
      );
      modal.open();
    },
    loot: () => {
      modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
      modal.body(
        <>
          <img alt="loot store" src={`https://${cdn}/website/about/about-bg-loot.png`} />
          <Heading level="3" font="pixel" size="xl" color="yellow-500" className="py-5">
            Loot Store
          </Heading>
          <p className="text-sm leading-8">
            Welcome to Rodeo Drive. An exclusive access to the stores of the
            rich and wealthy. Most items can be purchased with our in game 
            coin, $DOLLA. Some items can be acquired exclusively with ETH. 
            And some items are limited supply. 
          </p>
        </>
      );
      modal.open();
    },
    hustle: () => {
      modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
      modal.body(
        <>
          <img alt="the hustle" src={`https://${cdn}/website/about/about-bg-hustle.png`} />
          <Heading level="3" font="pixel" size="xl" color="yellow-500" className="py-5">
            The Hustle
          </Heading>
          <p className="text-sm leading-8">
            Welcome to South of Market. A street where you can buy 
            businesses to earn more $DOLLA monthly. These Hustles will help 
            you acquire the best of the best Loot.
          </p>
        </>
      );
      modal.open();
    },
    cribs: () => {
      modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
      modal.body(
        <>
          <img alt="cash cows cribs" src={`https://${cdn}/website/about/about-bg-cribs.png`} />
          <Heading level="3" font="pixel" size="xl" color="yellow-500" className="py-5">
            Cribs
          </Heading>
          <p className="text-sm leading-8">
            Welcome to Boardwalk where you can live lavishly next to the 
            rich and famous. This is a special collection that contains a 
            unique mini-metaverse all inside the NFT. Invite your friends, 
            showcase your loot. Earn your bragging rights.
          </p>
        </>
      );
      modal.open();
    }
  };
  return (
    <section>
      <div className="container m-auto py-10">
        <Heading level="2" font="pixel" size="xl" color="yellow-500" className="pb-5 text-center">
          Cash Cows Game
        </Heading>
        <p className="text-sm text-center pb-5">
          Designed for the Tycoon in mind. Earn $MILK, get LOOT, choose a 
          Hustle, buy a Crib, brag to your friends.
        </p>
        <PaperBox className="p-4 max-w-xl m-auto">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1500 1920" preserveAspectRatio="xMinYMin meet">
            <image width="1500" height="1920" xlinkHref={`https://${cdn}/website/map.png`}></image>
            <a title="The Barn" onClick={show.barn} className="cursor-pointer">
              <rect x="300" y="1500" width="600" height="250" fill="#FFFFFF" opacity="0"></rect>
            </a>
            <a title="Farmers Market" onClick={show.market} className="cursor-pointer">
              <rect x="550" y="1120" width="800" height="202" fill="#FFFFFF" opacity="0"></rect>
            </a>
            <a title="Loot Store" onClick={show.loot} className="cursor-pointer">
              <rect x="302" y="810" width="676" height="202" fill="#FFFFFF" opacity="0"></rect>
            </a>
            <a title="The Hustle" onClick={show.hustle} className="cursor-pointer">
              <rect x="470" y="400" width="930" height="202" fill="#FFFFFF" opacity="0"></rect>
            </a>
            <a title="Cribs" onClick={show.cribs} className="cursor-pointer">
              <rect x="500" y="100" width="620" height="250" fill="#FFFFFF" opacity="0"></rect>
            </a>
          </svg>
        </PaperBox>
      </div>
    </section>
  );
};

const Section4 = () => (
  <section className="bg-[#3D2C21] before:border-t-8 before:border-t-[#251205] before:bg-dirt1 before:bg-repeat-x before:content-[' '] before:block before:w-full before:h-10">
    <div className="container m-auto py-10">
      <div className="sm:flex justify-center">
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            What is CC0?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            This means there is no copyright. You can modify, 
            distribute and perform the work, even for commercial 
            purposes, all without asking permission.
          </p>
        </div>
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            What is the utility?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            Creator fees are given to Cow holders evenly As rewards 
            for passively staking. The rest of the utility will be 
            found on the smart contracts. We will be dropping hints 
            along the way and it is up to you to discover them all.
          </p>
        </div>
      </div>
      <div className="sm:flex justify-center">
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            How do I stake and earn rewards?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            Rewards are passively earned, meaning you only need to hold the Cows.
          </p>
        </div>
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            How can I redeem my rewards?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            Current holders of Cash Cows can redeem their reward in the
            treasury or directly from the &nbsp;
            <a className="underline" href="https://etherscan.io/address/0x837844a20cFe576057b58bcF6f1556BF6795FB2F" target="_blank">
              contract</a>.
          </p> 
        </div>
      </div>
      <div className="sm:flex justify-center">
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            If I sell my Cows can I still redeem?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            Once you sell your Cow you no longer have the rights 
            to redeem its rewards (it passes to the new owner).
          </p> 
        </div>
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            What do I need to know before owning a Cow?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            Rewards are driven by sales volume. No volume means no rewards.
          </p> 
        </div>
      </div>
      <div className="sm:flex justify-center">
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            How do you fund this project?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            We fund this project through the rewards earned by 
            holding Cows like everyone else. The community 
            milestones measure the funding needed to activate 
            the other utilities of the project.
          </p> 
        </div>
        <div className="basis-6/12 mx-3 pb-6">
          <Heading level="3" size="xs" className="leading-8">
            Can I see the contracts?
          </Heading>
          <p className="pt-3 text-xs leading-6">
            In the <a className="underline" href="/ethereum/opensource.html">contracts page</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const Head = () => (
  <HTMLHead>
    <title>About Cash Cows Club</title>
    <meta name="description" content="An upcoming blue chip alpha NFT club exploring sharing fortune in the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <link rel="canonical" href={`https://${host}/about`} />
    
    <meta property="og:title" content="About Cash Cows Club" />
    <meta property="og:description" content="An upcoming blue chip alpha NFT club exploring sharing fortune in the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta property="og:image" content={`https://${cdn}/website/banner/banner-about.png`} />
    <meta property="og:url" content={`https://${host}/about`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="About Cash Cows Club" />
    <meta name="twitter:description" content="An upcoming blue chip alpha NFT club exploring sharing fortune in the Metaverse. Free mint a cash cow. Make icon memes. Earn loot." />
    <meta name="twitter:image" content={`https://${cdn}/website/banner/banner-about.png`} />
  </HTMLHead>
);

export const Body: React.FC<AboutPageProps> = ({ redeemed, unclaimed }) => (
  <main className="h-full relative overflow-auto">
    <Section1 />
    <Section2 redeemed={redeemed} unclaimed={unclaimed}/>
    <Section3 />
    <Section4 />
    <Script type='application/ld+json'>
      {JSON.stringify({
        "@context": "http://www.schema.org",
        "@type": "Organization",
        "name": "Cash Cows Club",
        "url": "https://www.cashcows.club/about",
        "logo": "https://www.cashcows.club/images/coin-cow.png",
        "image": "images/banner/banner-about.png",
        "description": "An upcoming blue chip alpha NFT club exploring sharing fortune in the Metaverse. Free mint a cash cow. Make icon memes. Earn loot.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "0x1A371de4634c3DEBf7196A1EFc59e620aff0915F",
          "addressLocality": "The Farm",
          "addressRegion": "Farmland",
          "postalCode": "17700",
          "addressCountry": "Ethereum"
        },
        "openingHours": "Mo 08:00-18:00 Tu 08:00-18:00 We 08:00-18:00 Th 08:00-18:00 Fr 08:00-18:00"
      }, null, 2)}
    </Script>
  </main>
);

export const getServerSideProps = async () => {
  const provider = new ethers.providers.JsonRpcProvider(networks.ethereum.rpc.http);
  const contract = new ethers.Contract(
    networks.ethereum.contracts.royalty.address, 
    networks.ethereum.contracts.royalty.abi, 
    provider
  );

  const redeemed = toEther(await contract['totalReleased()']());
  const unclaimed = toEther(await provider.getBalance(
    networks.ethereum.contracts.royalty.address
  ));

  return { props: { redeemed, unclaimed } };
};
