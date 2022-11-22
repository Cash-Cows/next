//types
import type { AboutBodyProps } from 'modules/static/types';
//components
import PanelPage from 'modules/ui/layouts/PanelPage';
import { Head, Body, getServerSideProps } from 'modules/static/pages/About';

const Page: React.FC<AboutBodyProps> = props => {
  return <PanelPage head={Head} body={Body(props)} />
}

export default Page;

export { getServerSideProps };
