const List: React.FC<{ children?: React.ReactNode }> = props => {
  const { children, ...other} = props
  return (
    <ul className="list-disc pl-5 my-2" {...other}>
      {children}
    </ul>
  );
};

export default List;

export const ListItem: React.FC<{ children?: React.ReactNode }> = props => {
  const { children, ...other} = props
  return (
    <li className="leading-8" {...other}>
      {children}
    </li>
  );
};