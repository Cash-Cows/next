import { LayoutPanelPage } from 'modules/ui';
import { Barn } from 'modules/game';

const { Head, Body } = Barn;

const Page = () => (
  <LayoutPanelPage head={Head}><Body /></LayoutPanelPage>
);

export default Page;
