//types
import type { LeaderboardProps } from 'modules/member/types';
//components
import { LayoutPanelPage } from 'modules/ui';
import { Search } from 'modules/member';

const { Head, Body, getServerSideProps } = Search;

const Page: React.FC<LeaderboardProps> = props => (
  <LayoutPanelPage head={Head}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };