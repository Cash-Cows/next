//type
import type { PageProps } from 'modules/blog/types';

//components
import { LayoutPanelPage } from 'modules/common';
import { Post } from 'modules/blog';

const { Head, Body, getStaticPaths, getStaticProps } = Post;

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

export { getStaticPaths, getStaticProps };