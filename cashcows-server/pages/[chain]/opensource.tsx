//types
import type { PageProps } from 'modules/opensource/types';
//components
import PanelPage from 'modules/ui/layouts/PanelPage';
import { Head, Body } from 'modules/opensource/Page';

//since we are accepting props in this page, we should be 
//returning a functional compoent (component wrapper) 
//instead of a react node
const BodyWrap = ({ chain }: PageProps) => {
  //return a functional component with no args
  return () => Body({ chain });
}

const Page: React.FC<{ chain: string }> = props => (
  <PanelPage head={Head} body={BodyWrap(props)} {...props} />
);

export default Page;