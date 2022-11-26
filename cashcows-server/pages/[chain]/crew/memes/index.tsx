import { LayoutPanelPage } from 'modules/ui';
import { Search } from 'modules/memes';

const { Head, Body } = Search;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
