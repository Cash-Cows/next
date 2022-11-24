//types
import type { PageProps } from 'modules/opensource/types';
//components
import { LayoutPanelPage } from 'modules/ui';
import { Head, Body } from 'modules/opensource';

const Page: React.FC<PageProps> = props => (
  <LayoutPanelPage head={Head}><Body {...props} /></LayoutPanelPage>
);

export default Page;