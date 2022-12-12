//components
import { LayoutPanelPage } from 'modules/common';
import { Search } from 'modules/loot';

const { Head, Body } = Search;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;