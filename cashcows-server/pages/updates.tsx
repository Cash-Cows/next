//type
import type { PageProps } from 'modules/updates/types';

//components
import { LayoutPanelPage } from 'modules/ui';
import { Latest } from 'modules/updates';

const { Head, Body, getStaticProps } = Latest;

//since we are accepting props in this page, we should be 
//returning a functional compoent (component wrapper) 
//instead of a react node
const HeadWrap = (props: PageProps) => {
  //return a functional component with no args
  return () => Head(props);
}

const Page: React.FC<PageProps> = props => (
  <LayoutPanelPage head={HeadWrap(props)}>
    <Body {...props} />
  </LayoutPanelPage>
);

export default Page;

export { getStaticProps };