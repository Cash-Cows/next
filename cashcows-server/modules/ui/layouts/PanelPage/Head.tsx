import HTMLHead from 'next/head';

type HeadProps = {
  children: React.ReactNode
};

const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <HTMLHead>
      {children}
    </HTMLHead>
  )
};

export default Head;