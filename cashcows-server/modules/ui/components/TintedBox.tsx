const TintBox: React.FC<{
  className?: string,
  children?: React.ReactNode
}> = ({ className, children }) => {
  return (
    <div className={`rounded-lg border-4 border-yellow-500 bg-tint backdrop-blur-xl text-white ${className}`}>
      {children}
    </div>
  );
};


export default TintBox;