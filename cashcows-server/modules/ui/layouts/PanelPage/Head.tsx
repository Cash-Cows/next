import HTMLHead from 'next/head';

const Head: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <HTMLHead>{children} </HTMLHead>;
};

export default Head;