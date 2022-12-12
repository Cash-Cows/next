//types
import type { MarketplaceDetailProps } from 'modules/marketplace/types';
//components
import { LayoutPanelPage } from 'modules/common';
import { Detail } from 'modules/marketplace';

const { Head, Body, getServerSideProps } = Detail;

const HeadWrap = (props: MarketplaceDetailProps) => {
  return () => (<Head {...props} />);
};

const Page: React.FC<MarketplaceDetailProps> = props => (
  <LayoutPanelPage head={HeadWrap(props)}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };