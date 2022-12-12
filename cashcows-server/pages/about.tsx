//types
import type { AboutPageProps } from 'modules/static/types';
//components
import { LayoutPanelPage } from 'modules/common';
import { About } from 'modules/static';

const { Head, Body, getServerSideProps } = About;

const Page: React.FC<AboutPageProps> = props => (
  <LayoutPanelPage head={Head}><Body {...props} /></LayoutPanelPage>
);

export default Page;

export { getServerSideProps };
