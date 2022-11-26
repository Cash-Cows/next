import { LayoutPanelPage } from 'modules/ui';
import { Search } from 'modules/marketplace';

const { Head, Body } = Search;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
