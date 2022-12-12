const Link: React.FC<{ children?: React.ReactNode }> = props => {
  const { children, ...other} = props
  return (
    <a className="underline" target="_blank" {...other}>{children}</a>
  );
};

export default Link;