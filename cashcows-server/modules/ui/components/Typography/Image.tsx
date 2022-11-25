const Image: React.FC<{}> = props => {
  return (
    <div className="my-2">
      <img className="w-full" {...props} />
    </div>
  );
};

export default Image;