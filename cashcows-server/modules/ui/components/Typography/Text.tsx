const Blockquote: React.FC<{ children?: React.ReactNode }> = props => {
  const { children, ...other} = props
  return (
    <p className="my-2" {...other}>
      {children}
    </p>
  );
};

export default Blockquote;