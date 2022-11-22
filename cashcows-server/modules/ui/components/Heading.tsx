const Heading: React.FC<{
  level?: string|number,
  font?: string,
  color?: string,
  size?: string,
  className?: string,
  children?: React.ReactNode
}> = props => {
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