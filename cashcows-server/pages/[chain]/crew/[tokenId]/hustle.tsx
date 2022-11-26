import { LayoutPanelPage } from 'modules/ui';
import { Hustle } from 'modules/game';

const { Head, Body } = Hustle;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
