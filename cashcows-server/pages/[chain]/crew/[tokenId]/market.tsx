import { LayoutPanelPage } from 'modules/common';
import { Market } from 'modules/game';

const { Head, Body } = Market;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
