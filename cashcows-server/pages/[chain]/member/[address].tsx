//types
import type { MemberProps } from 'modules/member/types';
//components
import { LayoutPanelPage } from 'modules/ui';
import { Detail } from 'modules/member';

const { Head, Body, getServerSideProps } = Detail;

const HeadWrap = (props: MemberProps) => {
  return () => (<Head {...props} />);
};

const Page: React.FC<MemberProps> = props => (
  <LayoutPanelPage head={HeadWrap(props)}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };