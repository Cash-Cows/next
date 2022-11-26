import { LayoutPanelPage } from 'modules/ui';
import { Detail } from 'modules/marketplace';

const { Head, Body } = Detail;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
