//types
import type { MutableRefObject } from 'react';
import type { GetServerSideProps } from 'next';
import type { AccountProps, NetworkConfig } from 'modules/web3/types';
import type { RankedData, LootData, RewardsHooks, MarketplaceDetailProps } from '../types';
//enums
import { PixelButtonSizes, PixelButtonTypes } from 'modules/common/enums';
//hooks
import { useWeb3 } from 'modules/web3';
import { useProfile } from '../hooks';
//components
import Link from 'next/link';
import { 
  HTMLHead, 
  PaperBox, 
  Heading, 
  PixelButton, 
  modal, 
  notify 
} from 'modules/common';
//config
import { cdn, host } from 'project.config';
//others
import axios from 'axios';
import { read } from 'modules/web3';

export const Head: React.FC<MarketplaceDetailProps> = ({ metadata }) => (
  <HTMLHead>
    <title>Crew #{metadata.edition} Profile | Cash Cows Club</title>
    <meta name="description" content={`Rank ${metadata.rank}, from the ${metadata.attributes.Crew.value} crew. Check this ${metadata.attributes.Hide.value} cow and its traits, rewards and loot.`} />
    
    <meta property="og:title" content={`Crew #${metadata.edition} Profile | Cash Cows Club`} />
    <meta property="og:description" content={`Rank ${metadata.rank}, from the ${metadata.attributes.Crew.value} crew. Check this ${metadata.attributes.Hide.value} cow and its traits, rewards and loot.`} />
    <meta property="og:image" content={`https://${cdn}/crew/preview/${metadata.edition}_${metadata.attributes.Level.value}.png`} />
    <meta property="og:url" content={`https://${host}/`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content={`Crew #${metadata.edition} Profile | Cash Cows Club`} />
    <meta name="twitter:description" content={`Rank ${metadata.rank}, from the ${metadata.attributes.Crew.value} crew. Check this ${metadata.attributes.Hide.value} cow and its traits, rewards and loot.`} />
    <meta name="twitter:image" content={`https://${cdn}/website/images/banner/banner-home.png`} />
  </HTMLHead>
);

const SectionProfile: React.FC<{ 
  owned: boolean,
  metadata: RankedData, 
  owner: string,
  network: NetworkConfig
}> = ({ network, metadata, owner, owned }) => {
  const { contracts } = network;
  const level = parseInt(String(metadata.attributes.Level.value));
  const short = `${owner.substring(0, 4)}...${owner.substring(owner.length - 4)}`;
  return (
    <section className="container m-auto">
      <div className="text-center">
        <img className="m-auto" src={`https://${cdn}/crew/preview/${metadata.edition}_${level - 1}.png`} loading="lazy" />
      </div>
      <PaperBox className="mx-3 p-4 flex items-center">
        <i className="text-4xl fas fa-hashtag"></i>
        <div className="pl-5">
          <span className="text-sm block mb-2">Cash Cows - LEVEL {metadata.attributes.Level.value}</span>
          <Heading level="3" size="4xl" color="black" className="inline-block mr-5">{metadata.edition}</Heading>
          <div className="inline-block">
            <a 
              className="inline-block" 
              href={`https://opensea.io/assets/${network.name}/${contracts.crew.address}}/${metadata.edition}`} 
              target="_blank"
            >
              <img className="w-8" src={`https://${cdn}/website/logo/logo-opensea.png`} />
            </a>
            <a 
              className="inline-block mx-3" 
              href={`https://looksrare.org/collections/${contracts.crew.address}}/${metadata.edition}`} 
              target="_blank"
            >
              <img className="w-8" src={`https://${cdn}/website/logo/logo-looksrare.webp`} />
            </a>
            <a 
              className="inline-block" 
              href={`https://x2y2.io/eth/${contracts.crew.address}}/${metadata.edition}`} 
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
      <div className="text-right text-black uppercase my-2 mr-5">
        <span className="inline-block mr-2">Owned by</span> 
        <Link href={`/member/${owner}`} className="underline">
          {owned ? 'You': short}
        </Link>
      </div>
    </section>
  );
};

const SectionMenu: React.FC<{ 
  owned: boolean,
  tabs: {
    toggles: Record<string, boolean>,
    open: Record<string, Function>
  },
  network: NetworkConfig,
  metadata: RankedData
}> = ({ owned, tabs, network, metadata }) => (
  <section className="container m-auto mb-8">
    <PaperBox className="p-4 mx-3 flex text-center">
      <a className={`${tabs.toggles.traits? 'brightness-0': 'brightness-[.4]'} text-white mx-3 cursor-pointer`} onClick={() => tabs.open.traits()}>
        <img src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAoCAYAAACxbNkLAAAD/0lEQVRoge2YT4gcRRTGv/eqe2c3iCxeBBVjchARxXiIBxGyCHpOEBRRE8G7C+rBg7LZkychehDFRAge9KAYUbxsdDPgwT+XFUQU3EQx8SAIq5GYne56T95MtzuZ6pru7G4mO6u/pZmlXnVVf7xXr14VqSoATAOYAzADYA/GhxUApwDMA1iyrzZBJmZxzIRUcQDACRN0BMBsRYdxw7y1iwHs2wZiUCybPbwNQq2fGQ6axpz/tiBV/QbA6cCwxmlVXQpaR0hyGVNd9CLPMdF5InqPiG4aEPurqD6mIlNJknwMYEcwwgho6qE/AHQI2C2qX4rIQVU92yfmnIg84UW+ALAbQFak0S3pIfvI51V1JxE9nGfZAjMvisjjLkkOWQef5297EWvbOdlq7YdiFoQzAF4CcG8w4hWkTpAXkbc6nU6biJCk6bXOuTtU9YwXabNq2zqJCLr2JLlTgYULf184zsyYmJg4xsz3DJnH1uSJoLWemdj+GZuoxBHRC0Q0CeAdAMfzPHfd+k8VlKYAUVeQwcyfC6EtKnuZ+D4ierpmDhNzOGhtJmgxaK2ZrAsR3dxqtV713u9SkWeCDn2o6goRY2pqx7OO+ZGgw+YxHRupaZZTIvq6qMwrsZBDT5T9vAvgoQbjz8ZCp4ZbYubLEfSdcw72GHme/yvAJYmtH/QJXjaNwSgh00X4bBqN0raIHBWRn2ytlI8tevNK+Xjv0Wf/WUTeDAYaAXZ8iMdRzwM/eu/vJ6JfBm0myl42MYMQcKNz7jMiujUwrvEhgCNBaz37I0ee+SYh9ykzB2IKsb10XYThgO0cgJMAhglaKk6c66FKUKM1pOWCr8JL6B2DqRvN8Rd7RLNVDdEjT23IAfheRB4AcHbQYGJiglpp6wYiWgBwe2C8csw3SQq3EdFT/QmgfLohV/03SURzIxbTpWna3luEzyXedOwQcXDqvb/OVaytCtphUy3RvauJoN9XV1ffEJHgy81L6cRE8AKA8yJiXs2Y+dHAusb8Oksfy3IfBK1N9qEsy47lef5R/x5UPlXpuo8/ReRFVV0OLBsnejSp89Ci9/5lUcGwTFdF0X9ZVeeI6CiAyYpu+4aFzxAOxWxRQQr1BHodwG+BsQ/HtU5+H8BBAA8Gll7Zs959qJKoIO/9yayTfWL/W51GkS2lgecuZln2WpqmVYI2naggFf2Bmf8KDAOUZ6Eavi2riqsmiIiI68OpEc452gqCrmmyjzTxkI01CjEYJsg59ySA6wF8FRgv7Re0DXBARO4alaAmtdyGKIcfkaBGx4cNMSrPlPx/Wb/V4eKyb7twije79LiK2P37Ehfl+3bwkm0zKybISnErEl8ZQ2HmFbs5urt7rQzgH19HlTqyr4tBAAAAAElFTkSuQmCC" />
        <span className="block uppercase text-sm">Traits</span>
      </a>
      <a className={`${tabs.toggles.rewards? 'brightness-0': 'brightness-[.4]'} text-white cursor-pointer ml-5 mr-3`} onClick={() => tabs.open.rewards()}>
        <i className="fas fa-sack-dollar text-4xl"></i>
        <span className="block uppercase text-sm">Rewards</span>
      </a>
      <a className={`${tabs.toggles.loots? 'brightness-0': 'brightness-[.4]'} text-white cursor-pointer mx-3`} onClick={() => tabs.open.loots()}>
        <i className="fas fa-gem text-4xl"></i>
        <span className="block uppercase text-sm">Loots</span>
      </a>
      <Link className="text-white brightness-[.4] cursor-pointer mx-3" href={`/${network.name}/memes/crew/${metadata.edition}`}>
        <i className="fas fa-face-grin-tongue-wink text-4xl"></i>
        <span className="block uppercase text-sm">Memes</span>
      </Link>
      {owned && (
        <a className={`${tabs.toggles.brand? 'brightness-0': 'brightness-[.4]'} text-white cursor-pointer mx-3 text-4xl`} onClick={() => tabs.open.brand()}>
          <i className="fas fa-book-open"></i>
          <span className="block uppercase text-sm">Brand</span>
        </a>
      )}
      {owned && (
        <a className={`${tabs.toggles.map? 'brightness-0': 'brightness-[.4]'} text-white cursor-pointer mx-3`} onClick={() => tabs.open.map()}>
          <i className="fas fa-map-location-dot text-4xl"></i>
          <span className="block uppercase text-sm">Map</span>
        </a>
      )}
      <span className="flex-grow"></span>
      {owned && (
        <a className={`${tabs.toggles.culling? 'brightness-0': 'brightness-[.4]'} text-white cursor-pointer mx-3`} onClick={() => tabs.open.culling()}>
          <i className="fas fa-skull text-4xl"></i>
          <span className="block uppercase text-sm">Culling</span>
        </a>
      )}
    </PaperBox>
  </section> 
);

const ContentTraits: React.FC<{ metadata: RankedData }> = ({ metadata }) => (
  <section className="container m-auto pb-8">
    <Heading level="2" size="md" color="black" className="my-4 mx-5">
      Rank #{metadata.rank} - Rating {metadata.score.toFixed(2)}
    </Heading>
    <div className="flex flex-wrap mx-1">
      {Object.keys(metadata.attributes).map(name => (
        <div key={name} className="text-center basis-1/2 md:basis-1/3">
          <PaperBox className="mx-2 mb-3 py-4">
            <Heading level="6" color="gray-900" className="text-[10px] uppercase">{name}</Heading>
            <span className="text-sm">{metadata.attributes[name].value}</span>
            <p className="text-xs text-gray-800 mt-2">{Math.floor(metadata.attributes[name].occurances / .4030) / 100}% have this trait</p>
          </PaperBox>
        </div>
      ))}
    </div>
  </section>
);

const ContentRewards: React.FC<{ 
  rewards: RewardsHooks,
  account: AccountProps,
  owner: string 
}> = ({ rewards, account, owner }) => (
  <section className="container m-auto  pb-8">
    <div className="flex flex-wrap mx-1 text-black">
      {Object.keys(rewards).map(currency => (
        <div key={currency} className="text-center basis-1/2 md:basis-1/3">
          <PaperBox className="mx-2 mb-3 py-2 flex items-center justify-center">
            <img className="inline-block h-6" src={`https://${cdn}/website/crypto/${currency}.png`} />
            <span className="inline-block ml-2 text-sm">{rewards[currency].reward.current}</span>
          </PaperBox>
          {account.address === owner && (
            <a onClick={rewards[currency].redeem} className="cursor-pointer inline-block relative top-[-5px] mb-3 text-sm uppercase">
              Redeem {currency.toUpperCase()}
            </a>
          )}
        </div>
      ))}
    </div>
  </section>
);

const LootModal: React.FC<{ loot: LootData }> = ({ loot }) => {
  const open = () => {
    modal.className('border-yellow-500 border-4 bg-black px-4 pb-4 pt-2 text-white');
    modal.body(
      <div className="loot">
        <div className="preview">
          <img src={loot.image} loading="lazy" />
        </div>
        <div className="info">
          <div className="name">{loot.name}</div>
          <div className="attributes">
            {Object.keys(loot.attributes).map(trait => (
              <PaperBox>
                {trait}: {loot.attributes[trait]}
              </PaperBox>
            ))}
          </div>
        </div>
      </div>
    );
    modal.open();
  };
  return (
    <div className="loot-item" onClick={open}>
      <div className="preview">
        <img src={loot.image} loading="lazy" />
      </div>
    </div>
  );
};

const ContentLoot: React.FC<{ 
  loots: MutableRefObject<LootData[]>
}> = ({ loots }) => (
  <section className="container m-auto pb-8">
    <div className="loots" data-do="loots">
      {loots.current.map(
        loot => <LootModal key={loot.edition} loot={loot} />)
      }
    </div>
  </section> 
);

const ContentCulling: React.FC<{ 
  metadata: RankedData,
  culling: {
    quote: string;
    message: string;
    burn: () => void;
  }
}> = ({ metadata, culling }) => (
  <section className="container m-auto pb-8">
    <PaperBox className="mx-3 p-4">
      <Heading level="3" color="gray-900">Burning #{metadata.edition}</Heading>
      <blockquote className="bg-[#BD9F6D] p-4 my-4 border-l-8 border-black rounded">
        {culling.quote}
      </blockquote>
      <p>{culling.message}</p>
      <PixelButton type={PixelButtonTypes.WARNING} size={PixelButtonSizes.LARGE} onClick={culling.burn}>
        Burn. Moo!
      </PixelButton>
    </PaperBox>
  </section> 
);

const ContentMap: React.FC<{ 
  soon: Function,
  chain: string, 
  metadata: RankedData 
}> = ({ soon, chain, metadata }) => (
  <section className="container m-auto pb-8">
    <PaperBox className="mx-3 p-12">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1500 1920" preserveAspectRatio="xMinYMin meet">
        <image width="1500" height="1920" xlinkHref={`https://${cdn}/website/map.png`}></image>
        <Link href={`/${chain}/crew/${metadata.edition}/barn`} title="The Barn">
          <rect x="300" y="1500" width="600" height="250" fill="#FFFFFF" opacity="0"></rect>
        </Link>
        <Link href={`/${chain}/crew/${metadata.edition}/market`} title="Farmers Market">
          <rect x="550" y="1120" width="800" height="202" fill="#FFFFFF" opacity="0"></rect>
        </Link>
        <Link href={`/${chain}/crew/${metadata.edition}/store`} title="Loot Store">
          <rect x="302" y="810" width="676" height="202" fill="#FFFFFF" opacity="0"></rect>
        </Link>
        <a className="cursor-pointer" onClick={() => soon()} title="The Hustle">
          <rect x="470" y="400" width="930" height="202" fill="#FFFFFF" opacity="0"></rect>
        </a>
        <a className="cursor-pointer" onClick={() => soon()} title="Cribs">
          <rect x="500" y="100" width="620" height="250" fill="#FFFFFF" opacity="0"></rect>
        </a>
        <a className="cursor-pointer" onClick={() => soon()} title="???">
          <rect x="0" y="0" width="350" height="400" fill="#FFFFFF" opacity="0"></rect>
        </a>
      </svg>
    </PaperBox>
  </section> 
);

const ContentBrand: React.FC<{ metadata: RankedData }> = ({ metadata }) => (
  <section className="container m-auto pb-8">
    <div className="flex flex-wrap mx-1">
      <div className="basis-1/2 md:basis-1/3">
        <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
          <img src={`https://${cdn}/crew/image/${metadata.edition}_0.png`} loading="lazy" />
        </div>
      </div>
      {metadata.attributes.Level.value > 1 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/image/${metadata.edition}_1.png`} loading="lazy" />
          </div>
        </div>
      )}
      {metadata.attributes.Level.value > 2 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/image/${metadata.edition}_2.png`} loading="lazy" />
          </div>
        </div>
      )}
      
      <div className="basis-1/2 md:basis-1/3">
        <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
          <img src={`https://${cdn}/crew/transparent/${metadata.edition}_0.png`} loading="lazy" />
        </div>
      </div>
      {metadata.attributes.Level.value > 1 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/transparent/${metadata.edition}_1.png`} loading="lazy" />
          </div>
        </div>
      )}
      {metadata.attributes.Level.value > 2 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/transparent/${metadata.edition}_2.png`} loading="lazy" />
          </div>
        </div>
      )}
      <div className="basis-1/2 md:basis-1/3">
        <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
          <img src={`https://${cdn}/crew/headshots/${metadata.edition}_0.png`} loading="lazy" />
        </div>
      </div>
      {metadata.attributes.Level.value > 1 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/headshots/${metadata.edition}_1.png`} loading="lazy" />
          </div>
        </div>
      )}
      {metadata.attributes.Level.value > 2 && (
        <div className="basis-1/2 md:basis-1/3">
          <div className="bg-transblock border border-black rounded-lg overflow-hidden mx-2 mb-3">
            <img src={`https://${cdn}/crew/headshots/${metadata.edition}_2.png`} loading="lazy" />
          </div>
        </div>
      )}
      <PaperBox className="p-4">
        <Heading level="2" color="gray-900">Holder Usage Rights</Heading>
        <p className="mt-4 text-sm text-justify leading-10">
          The creators of the art <em>(the "Affirmer")</em> titled as 
          <strong>Cash Cows Crew #{metadata.edition}</strong> 
          <em>(the "Work")</em> hereby waives the rights of the Work under 
          copyright law for the owner of the Ethereum based wallet 
          <strong className="wallet-address"></strong> <em>(the "Holder")</em>, 
          including all related rights, to the extend allowed by law.
        </p>
        <p className="mt-4 text-sm text-justify leading-10">
          The Holder can copy, modify, distribute and perform the work, 
          even for commercial purposes, all without asking permission.
        </p>
        <p className="mt-4 text-sm text-justify leading-10">
          Unless expressly stated otherwise, the Affirmer makes no 
          warranties about the work, and disclaims liability for all 
          uses of the work, to the fullest extent permitted by 
          applicable law. Usage of the work by the Holder does not 
          imply endorsement by the Affirmer.
        </p>
      </PaperBox>
    </div>
  </section>
);

export const Body: React.FC<MarketplaceDetailProps> = props => {
  const { chain, metadata, owner } = props;
  const { network, account } = useWeb3();
  const { 
    tabs,
    loots, 
    owned,
    rewards, 
    culling
  } = useProfile(chain, metadata, account.address || '', owner);
  const soon = () => notify('info', 'Coming Soon!');
  return (
    <main className={`h-full overflow-auto relative pfp-${String(
      metadata.attributes.Background.value
    ).toLowerCase()}`}>
      <SectionProfile owned={owned} network={network.config} {...props} />
      <SectionMenu network={network.config} tabs={tabs} owned={owned} {...props} /> 
      {tabs.toggles.traits && <ContentTraits {...props} />}
      {tabs.toggles.rewards && <ContentRewards account={account} rewards={rewards} {...props} />}
      {tabs.toggles.loots && <ContentLoot loots={loots} />}
      {owned && tabs.toggles.culling && <ContentCulling culling={culling} {...props} />}
      {owned && tabs.toggles.map && <ContentMap soon={soon} {...props} />}
      {owned && tabs.toggles.brand && <ContentBrand {...props} />}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ( params ) => {
  const { chain, tokenId } = params.query;
  const data = await axios.get(`https://${cdn}/crew/${chain}/${tokenId}.json`);
  const owner = await read(chain as string, 'crew').ownerOf(tokenId);
  return { props: { chain, metadata: data.data, owner } };
};