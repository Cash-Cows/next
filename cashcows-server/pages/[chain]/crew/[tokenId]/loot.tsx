import { LayoutPanelPage } from 'modules/common';
import { Loot } from 'modules/game';

const { Head, Body } = Loot;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
