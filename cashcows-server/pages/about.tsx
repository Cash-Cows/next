//types
import type { PageProps } from 'modules/about/types';
//components
import PanelPage from 'modules/ui/layouts/PanelPage';
import { Head, Body, getServerSideProps } from 'modules/about/Page';

//since we are accepting props in this page, we should be 
//returning a functional compoent (component wrapper) 
//instead of a react node
const BodyWrap = ({ redeemed, unclaimed }: PageProps) => {
  //return a functional component with no args
  return () => Body({ redeemed, unclaimed });
}

const Page: React.FC<PageProps> = props => (
  <PanelPage head={Head} body={BodyWrap(props)} />
);

export default Page;

export { getServerSideProps };
