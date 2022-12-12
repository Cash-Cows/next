import { LayoutPanelPage } from 'modules/common';
import { Soon } from 'modules/static';

const { Head, Body } = Soon;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
