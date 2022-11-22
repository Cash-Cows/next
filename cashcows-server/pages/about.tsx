//types
import type { BodyProps } from 'modules/static/pages/About';
//components
import PanelPage from 'modules/ui/layouts/PanelPage';
import { Head, Body, getServerSideProps } from 'modules/static/pages/About';

const Page: React.FC<BodyProps> = props => {
  return <PanelPage head={Head} body={Body(props)} />
}

export default Page;

export { getServerSideProps };
