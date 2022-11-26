import { LayoutPanelPage } from 'modules/ui';
import { Detail } from 'modules/memes';

const { Head, Body } = Detail;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
