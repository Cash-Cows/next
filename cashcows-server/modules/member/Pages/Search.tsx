//types
import type { NetworkConfig } from 'modules/web3/types';
import type { LeaderboardRow, LeaderboardProps } from '../types';
//enums
import { PixelButtonTypes, PixelButtonSizes } from 'modules/ui/enums';
//hooks
import { useWeb3 } from 'modules/web3';
import { useLeaderTabs, useAvatar } from '../hooks';
//components
import Link from 'next/link';
import { HTMLHead, H1, H2, PixelButton, TintedBox } from 'modules/ui';
//config
import { api, cdn, host } from 'project.config';
//others
import axios from 'axios';
import { toEther } from 'modules/web3';

export const Head = () => (
  <HTMLHead>
    <title>Leaderboards | Cash Cows Club</title>
    <meta name="description" content="View the top performing cowboys for Cash Cows Crew, Cash Cow Club, top milkers and top $DOLLA" />
    <link rel="canonical" href={`https://${host}/ethereum/leaderboard`} />
    
    <meta property="og:title" content="Leaderboards | Cash Cows Club" />
    <meta property="og:description" content="View the top performing cowboys for Cash Cows Crew, Cash Cow Club, top milkers and top $DOLLA" />
    <meta property="og:image" content={`https://${cdn}/website/banner/banner-leaderboard.png`} />
    <meta property="og:url" content={`https://${host}/ethereum/leaderboard`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@wearecashcows" />
    <meta name="twitter:title" content="Leaderboards | Cash Cows Club" />
    <meta name="twitter:description" content="View the top performing cowboys for Cash Cows Crew, Cash Cow Club, top milkers and top $DOLLA" />
    <meta name="twitter:image" content={`https://${cdn}/website/banner/banner-leaderboard.png`} />
  </HTMLHead>
);

const Tabs: React.FC<{
  show: Record<string, Function>,
  toggles: Record<string, boolean>
}> = ({ toggles, show }) => (
  <section className="text-center mt-24">
    <div className="max-w-2xl m-auto">
      <TintedBox className="pb-5">
        <H1 className="uppercase">Leaderboards</H1>
        <div className="tabs">
          <PixelButton 
            onClick={show.crew}
            size={PixelButtonSizes.NORMAL}
            type={toggles.crew? PixelButtonTypes.WARNING: PixelButtonTypes.DEFAULT} 
          >
            Top Cowboys
          </PixelButton>
          <PixelButton 
            onClick={show.milk}
            size={PixelButtonSizes.NORMAL}
            type={toggles.milk? PixelButtonTypes.WARNING: PixelButtonTypes.DEFAULT} 
            className="mx-5"
          >
            Top Milkers
          </PixelButton>
          <PixelButton 
            onClick={show.dolla}
            size={PixelButtonSizes.NORMAL}
            type={toggles.dolla? PixelButtonTypes.WARNING: PixelButtonTypes.DEFAULT} 
          >
            Top $DOLLA
          </PixelButton>
        </div>
      </TintedBox>
    </div>
  </section>
);

const Row: React.FC<{
  network: NetworkConfig,
  rank: number,
  leader: LeaderboardRow
}> = ({ rank, network, leader }) => {
  const avatar = useAvatar(network, leader.address)
  return (
    <tr>
      <td className="text-center p-5 border-b border-b-black">{rank <= 3 
        ? (<img className="inline-block w-6" src={`https://${cdn}/website/icon/icon-trophy-${rank}.png`} />)
        : rank
      }</td>
      <td className="text-center p-5 border-b border-b-black">
        <Link href={`/${network.name}/member/${leader.address}`}>
          <img alt={`Member ${leader.address} image`} src={avatar} className="w-16 rounded-full inline-block" />
        </Link>
      </td>
      <td className="text-center p-5 border-b border-b-black">
        <Link href={`/${network.name}/member/${leader.address}`} className="underline font-bold">
          {leader.address.substring(0, 4)}...{leader.address.substring(leader.address.length - 4)}
        </Link>
      </td>
      <td className="text-center p-5 border-b border-b-black">{leader.balance}</td>
    </tr>
  );
};

const Content: React.FC<{
  title: string,
  network: NetworkConfig,
  board: LeaderboardRow[],
  toggle: boolean
}> = props => {
  const { title, network, board, toggle } = props;
  return (
    <section className={`text-center my-20 ${toggle? '': 'hidden'}`}>
      <div className="max-w-2xl m-auto">
        <TintedBox>
          <H2 className="uppercase">{title}</H2>
          <table className="w-full">
            <tbody>
              {board?.length && board.map((leader, i) => (
                <Row key={i} network={network} rank={i + 1} leader={leader} /> 
              ))}
            </tbody>
          </table>
        </TintedBox>
      </div>
    </section>
  );
};

export const Body: React.FC<LeaderboardProps> = ({ boards }) => {
  const { network } = useWeb3();
  const { toggles, show } = useLeaderTabs();
  return (
    <main className="bg-leaderboard bg-no-repeat bg-cover bg-center h-full relative overflow-auto">
      <Tabs toggles={toggles} show={show} />
      <Content board={boards.crew} title="Top Cowboys" network={network.config} toggle={toggles.crew} />
      <Content board={boards.milk} title="Top Milkers" network={network.config} toggle={toggles.milk} />
      <Content board={boards.dolla} title="Top $DOLLA" network={network.config} toggle={toggles.dolla} />
    </main>
  );
};

export const getServerSideProps = async () => {
  const boards: Record<string, LeaderboardRow> = {};
  for (const name of ['crew', 'milk', 'dolla']) {
    const response = await axios.get(
      `https://${api}/leaderboard/${name}.php`
    );
    boards[name] = response.data.holders.map((row: LeaderboardRow) => {
      if (typeof row.balance === 'number' 
        && !/^[0-9]*(\.[0-9]+)*$/.test(String(row.balance))
      ) {
        row.balance = String(
          toEther(BigInt(row.balance).toString(), 2)
        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      return row;
    }).filter((row: LeaderboardRow, i: number) => i < 20)
  }

  return { props: { boards } };
};