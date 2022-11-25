import type { HeadingProps } from '../../types';

const Heading: React.FC<HeadingProps> = props => {
  let { level = 3, size = 'lg', font = 'pixel', color = 'yellow-500', className, children } = props;
  level = parseInt(String(level));
  const names = `font-bold text-${size} font-${font} text-${color} ${className}`.trim()
  switch(true) {
    case level < 2:
      return <h1 className={names}>{children}</h1>;
    case level === 2:
      return <h2 className={names}>{children}</h2>;
    case level === 3:
      return <h3 className={names}>{children}</h3>;
    case level === 4:
      return <h4 className={names}>{children}</h4>;
    case level === 5:  
      return <h5 className={names}>{children}</h5>;
    case level > 5:
    default:
      return <h6 className={names}>{children}</h6>;
  }
};

export default Heading;

export const H1: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="1" size="4xl" className="mt-6 mb-3" {...others}>{children}</Heading>;
};

export const H2: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="2" size="3xl" className="mt-6 mb-3" {...others}>{children}</Heading>;
};

export const H3: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="3" size="2xl" className="mt-6 mb-3" {...others}>{children}</Heading>;
};

export const H4: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="4" size="xl" className="mt-6 mb-3" {...others}>{children}</Heading>;
};

export const H5: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="5" size="lg" className="mt-6 mb-3" {...others}>{children}</Heading>;
};

export const H6: React.FC<HeadingProps> = props => {
  const {children, ...others} = props;
  return <Heading level="6" size="md" className="mt-6 mb-3" {...others}>{children}</Heading>;
};