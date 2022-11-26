import { LayoutPanelPage } from 'modules/ui';
import { Home } from 'modules/static';

const { Head, Body } = Home;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
