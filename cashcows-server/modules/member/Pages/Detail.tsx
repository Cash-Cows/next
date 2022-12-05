//types
import type { GetServerSideProps } from 'next';
import type { MemberProps, TrophyProps } from '../types';
//enums
import { BadgeTypes } from 'modules/ui/enums';
//hooks
import { useWeb3 } from 'modules/web3';
import { useMember, useMemberTabs } from '../hooks';
//components
import Link from 'next/link';
import { HTMLHead, Heading, PaperBox, Badge } from 'modules/ui';
//config
import { cdn, host } from 'project.config';
import { RankedData } from 'modules/ui/types';

const toFixedNumber = (number: number, length = 6) => {
  const parts = number.toString().split('.')
  const size = length >= parts[0].length ? length - parts[0].length: 0
  if (parts[0].length > 9) {
    return (parseInt(parts[0]) / 1000000000).toFixed(2) + 'B'
  } else if (parts[0].length > 6) {
    return (parseInt(parts[0]) / 1000000).toFixed(2) + 'M'
  } else if (parts[0].length > 3) {
    return (parseInt(parts[0]) / 1000).toFixed(2) + 'K'
  }
  return number.toFixed(size)
}

export const Head: React.FC<MemberProps> = ({ address }) => (
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

const SectionProfile: React.FC<MemberProps>= ({ address }) => (
  <section className="container max-w-4xl m-auto pt-24">
    <PaperBox className="mx-3 p-4 flex items-center">
      <i className="text-4xl fas fa-fingerprint"></i>
      <div className="pl-5">
        <span className="text-sm block mb-2">Member</span>
        <Heading level="3" size="2xl" color="black" className="inline-block mr-5">{`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}</Heading>
        <div className="inline-block">
          <a 
            className="inline-block" 
            href={`https://opensea.io/${address}`} 
            target="_blank"
          >
            <img className="w-8" src={`https://${cdn}/website/logo/logo-opensea.png`} />
          </a>
          <a 
            className="inline-block mx-3" 
            href={`https://looksrare.org/accounts/${address}`} 
            target="_blank"
          >
            <img className="w-8" src={`https://${cdn}/website/logo/logo-looksrare.webp`} />
          </a>
          <a 
            className="inline-block" 
            href={`https://x2y2.io/user/${address}`} 
            target="_blank"
          >
            <img className="w-8" src={`https://${cdn}/website/logo/logo-x2y2.webp`} />
          </a>
          <a 
            className="inline-block mx-3 bg-[#1C9BEF] rounded-full h-8 w-8 leading-[34px] text-center text-white relative top-[-10px]" 
            href="https://twitter.com/intent/tweet?hashtags=cashcows,sharethewealth&text=Check+out+this+cow.+Moo!&url=cashcows.club/ethereum/crew/{{../metadata.edition}}/profile.html"
            target="_blank"
          ><i className="fab fa-twitter"></i></a>
          <a 
            className="inline-block bg-gray-600 rounded-full h-8 w-8 leading-[34px] text-center text-white relative top-[-10px]" 
          ><i className="fas fa-share-nodes"></i></a>
        </div>
      </div>
    </PaperBox>
  </section>
);

const SectionStats: React.FC<{ 
  steaks: number,
  rewards: Record<string, number>,
  crews: RankedData[],
  trophies: {
    active: TrophyProps[],
    inactive: TrophyProps[]
  },
  show: Record<string, Function>
}>= ({ steaks, rewards, crews, trophies, show }) => (
  <section className="container max-w-4xl m-auto">
    <Heading level="3" color="white" size="xl" className="my-4 ml-5">Stats</Heading>
    <div className="flex flex-wrap">
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-4 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/milk.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {toFixedNumber(rewards.milk || 0)}
          </span>
        </PaperBox>
      </div>
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-4 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/dolla.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {toFixedNumber(rewards.dolla || 0)}
          </span>
        </PaperBox>
      </div>
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-4 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/steak.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {steaks}
          </span>
        </PaperBox>
      </div>
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-1 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/cow.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {crews.length}
          </span>
        </PaperBox>
        <a className="block mr-5 text-white text-right text-xs cursor-pointer underline uppercase" onClick={() => show.crew()}>
          View Cows
        </a>
      </div>
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-1 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/eth.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {rewards.eth}
          </span>
        </PaperBox>
        <a className="block mr-5 text-white text-right text-xs cursor-pointer underline uppercase" onClick={() => show.treasury()}>
          View Treasury
        </a>
      </div>
      <div className="md:basis-1/3 basis-1/2">
        <PaperBox className="mx-3 mb-1 p-4 flex items-center">
          <img className="sm:w-12 w-8" src={`https://${cdn}/website/crypto/trophy.png`} />
          <span className="sm:text-md text-xs sm:ml-4 ml-2 font-pixel">
            {trophies.active.length} / {trophies.active.length + trophies.inactive.length}
          </span>
        </PaperBox>
        <a className="block mr-5 text-white text-right text-xs cursor-pointer underline uppercase" onClick={() => show.trophies()}>
          View Trophies
        </a>
      </div>
    </div>
  </section>
);

const SectionTreasury: React.FC<{ 
  rewards: Record<string, number>
}>= ({ rewards }) => (
  <section className="container max-w-4xl m-auto">
    <Heading level="3" color="white" size="xl" className="my-4 ml-5">
      Treasury
    </Heading>
    <div className="flex flex-wrap">
      {Object.keys(rewards).filter(currency => ['milk', 'dolla'].indexOf(currency) < 0).map(currency => (
        <div key={currency} className="md:basis-1/3 basis-1/2">
          <PaperBox className="mx-3 mb-4 py-4 flex items-center justify-center">
            <img className="w-8" src={`https://${cdn}/website/crypto/${currency}.png`} />
            <span className="text-xs ml-2 font-pixel">
              {rewards[currency].toFixed(4)}
            </span>
          </PaperBox>
        </div>
      ))}
    </div>
  </section>
);

const Crew: React.FC<{ chain: string, data: RankedData }> = ({ chain, data }) => {
  let rarity = BadgeTypes.MUTED;
  if (data.rank < 100) {
    rarity = BadgeTypes.SUCCESS;
  } else if (data.rank < 500) {
    rarity = BadgeTypes.WARNING;
  } else if (data.rank < 1000) {
    rarity = BadgeTypes.INFO;
  }

  let level = BadgeTypes.MUTED;
  if (data.attributes.Level.value === 2) {
    level = BadgeTypes.WARNING;
  } else if (data.attributes.Level.value === 3) {
    level = BadgeTypes.SUCCESS;
  }

  return (
    <Link 
      key={data.edition}
      className="block relative m-2"
      href={`/${chain}/crew/${data.edition}/profile`}
    >
      <img className="w-full rounded-lg" src={`https://${cdn}/crew/preview/${data.edition}_${data.attributes.Level.value}.png`} />
      <Badge type={BadgeTypes.MUTED} className="absolute top-1 left-1 rounded-lg">
        <i className="fas fa-hashtag"></i>
        <span className="inline-block ml-1">{data.edition}</span>
      </Badge>
      <Badge type={rarity} className="absolute bottom-1 left-1 rounded-lg">
        <i className="fas fa-trophy"></i>
        <span className="inline-block ml-1">{data.rank}</span>
      </Badge>
      <Badge type={level} className="absolute bottom-1 right-1 rounded-lg">
        Level {data.attributes.Level.value}
      </Badge>
    </Link>
  );
};

const SectionCrew: React.FC<{ 
  chain: string,
  crews: RankedData[]
}>= ({ chain, crews }) => (
  <section className="container max-w-4xl m-auto">
    <Heading level="3" color="white" size="xl" className="my-4 ml-5">
      Cash Cows Crew
    </Heading>
    <div className="flex flex-wrap mx-1">
      {crews.map(row => (
        <div key={row.edition}className="basis-1/2 md:basis-1/3 lg:basis-1/4">
          <Crew chain={chain} data={row} />
        </div>
      ))}
    </div>
  </section>
);

const SectionTrophies: React.FC<{ 
  trophies: {
    active: TrophyProps[],
    inactive: TrophyProps[]
  }
}>= ({ trophies }) => (
  <section className="container max-w-4xl m-auto">
    <Heading level="3" color="white" size="xl" className="my-4 ml-5">
      Trophies
    </Heading>
    <div className="flex flex-wrap mx-1">
      {trophies.active.map(row => (
        <div key={row.name} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 text-center">
          <div className="m-2">
            <img className="w-32 inline-block rounded-lg glow" src={row.image} />
            <Heading level="6" size="xs" color="white">{row.name}</Heading>
            <p className="text-sm">{row.content}</p>
          </div>
        </div>
      ))}
      {trophies.inactive.map(row => (
        <div key={row.name} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 text-center">
          <div className="m-2">
            <img className="w-32 inline-block rounded-lg opacity-50" src={row.image} />
            <Heading level="6" size="xs" color="white">{row.name}</Heading>
            <p className="text-sm">{row.content}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const Body: React.FC<MemberProps> = props => {
  const { network } = useWeb3();
  const { 
    steaks,
    rewards,
    crews, 
    trophies
  } = useMember(network.config.name, props.address);
  const { toggles, show } = useMemberTabs();
  return (
    <main className="h-full relative bg-member bg-cover overflow-auto">
      <SectionProfile {...props} />
      <SectionStats show={show} steaks={steaks} rewards={rewards} crews={crews.tokens} trophies={trophies} />
      {toggles.treasury && <SectionTreasury rewards={rewards} />}
      {toggles.crew && <SectionCrew crews={crews.tokens} chain={network.config.name} />}
      {toggles.trophies && <SectionTrophies trophies={trophies} />}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ( params ) => {
  return { props: params.query };
};