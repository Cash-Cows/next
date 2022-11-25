const Blockquote: React.FC<{
  children?: React.ReactNode
}> = props => {
  const { children, ...other} = props
  return (
    <blockquote className="border-l-8 border-gray-300 mt-2 my-2 py-2 px-4" {...other}>
      {children}
    </blockquote>
  );
};

export default Blockquote;