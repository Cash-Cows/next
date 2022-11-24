//types
import type { NetworkNames } from 'modules/web3';
import type { PageProps } from './types';
//hooks
import { useWeb3 } from 'modules/web3';
import { useEffect } from 'react';
//components
import { HTMLHead, Heading } from 'modules/ui';

const Section1 = () => (
  <section className="max-w-3xl m-auto pt-10">
    <Heading level="1" className="text-center" size="xl">Open Source Initiative</Heading>
    <p className="py-10 text-center">
      Moo. Before using cow code, please respect our MIT license 
      <a href="https://github.com/Cash-Cows/contracts/blob/main/LICENSE" target="_blank">here</a>.
    </p>
    <hr />
  </section>
);

const Section2: React.FC<PageProps> = ({ chain }) => {
  const { network } = useWeb3();
  const config = network.config;
  const contracts = config.contracts;
  useEffect(() => {
    network.change(chain as NetworkNames);
  });
  return (
    <section className="max-w-3xl m-auto py-5">
      <Heading level="2" className="pb-5 pl-5">Smart Contracts</Heading>
      <table className="w-full mb-5">
        <tbody>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCows<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.crew.address}`} target="_blank">
                {contracts.crew.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">NFT Contract for Cash Cows Crew</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsTreasury<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.royalty.address}`} target="_blank">
                {contracts.royalty.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Community Treasury for Cash Cows Crew. The original royalty splitter</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsMetadata<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.metadata.address}`} target="_blank">
                {contracts.metadata.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Metadata Contract for Cash Cows Crew. A variable controller based on the rewards per cow.</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsIndex<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.index.address}`} target="_blank">
                {contracts.index.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Contract used to return search results in one call</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsMilk<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.milk.address}`} target="_blank">
                {contracts.milk.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">$MILK Token Contract</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsDolla<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.dolla.address}`} target="_blank">
                {contracts.dolla.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">$DOLLA Token Contract</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsCulling<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.culling.address}`} target="_blank">
                {contracts.culling.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Contract used to reward holders for burning cows</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsBarn<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.barn.address}`} target="_blank">
                {contracts.barn.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Barn contract used to milk your cows</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsMarket<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.market.address}`} target="_blank">
                {contracts.market.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Farmers market contract used to sell your $MILK for $DOLLA</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsLoot<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.loot.address}`} target="_blank">
                {contracts.loot.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Open loot store contract</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsGame<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.game.address}`} target="_blank">
                {contracts.game.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Binds loot to your NFT. Not just cows</td>
          </tr>
          <tr>
            <td valign="top" className="p-5 text-sm">
              CashCowsStore<br />
              <a className="text-xs underline" href={`${config.scanner}/address/${contracts.store.address}`} target="_blank">
                {contracts.store.address}
              </a>
            </td>
            <td valign="top" className="p-5 text-sm">Retail prices for loot</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </section>
  )
};

const Section3 = () => (
  <section className="max-w-3xl m-auto py-5">
    <Heading level="2" className="pb-5 pl-5">Code Repositories</Heading>
    <table className="w-full">
      <tbody>
        <tr>
          <td valign="top" className="p-5 text-sm">
            <a className="underline" href="https://github.com/Cash-Cows/contracts" target="_blank">
              Cash-Cows/contracts
            </a>
          </td>
          <td valign="top" className="p-5 text-sm">The official repo for Cash Cows smart contracts.</td>
        </tr>
        <tr>
          <td valign="top" className="p-5 text-sm">
            <a className="underline" href="https://github.com/Cash-Cows/artengine" target="_blank">
              Cash-Cows/artengine
            </a>
          </td>
          <td valign="top" className="p-5 text-sm">The art engine used on the first collection Cash Cows Crew.</td>
        </tr>
        <tr>
          <td valign="top" className="p-5 text-sm">
            <a className="underline" href="https://github.com/Cash-Cows/website" target="_blank">
              Cash-Cows/website
            </a>
          </td>
          <td valign="top" className="p-5 text-sm">The code used to build the entire Cash Cows website.</td>
        </tr>
        <tr>
          <td valign="top" className="p-5 text-sm">
            <a className="underline" href="https://github.com/Cash-Cows/memebot" target="_blank">
              Cash-Cows/memebot
            </a>
          </td>
          <td valign="top" className="p-5 text-sm">The code created for the Memebot meme generator.</td>
        </tr>
      </tbody>
    </table>
  </section>
);

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

export const Body: React.FC<PageProps> = props => (
  <main className="bg-black h-full relative overflow-auto">
    <Section1 />
    <Section2 {...props} />
    <Section3 />
  </main>
);