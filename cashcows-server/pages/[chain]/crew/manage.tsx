import { LayoutPanelPage } from 'modules/ui';
import { Manage } from 'modules/game';

const { Head, Body } = Manage;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
