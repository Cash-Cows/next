//types
import type { LeaderboardProps } from 'modules/leaderboard/types';
//components
import { LayoutPanelPage } from 'modules/ui';
import { Head, Body, getServerSideProps } from 'modules/leaderboard';

const Page: React.FC<LeaderboardProps> = props => (
  <LayoutPanelPage head={Head}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };