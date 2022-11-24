//types
import type { PageProps } from 'modules/about/types';
//components
import { LayoutPanelPage } from 'modules/ui';
import { Head, Body, getServerSideProps } from 'modules/about';

const Page: React.FC<PageProps> = props => (
  <LayoutPanelPage head={Head}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };
