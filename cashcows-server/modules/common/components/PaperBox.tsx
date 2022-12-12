const PaperBox: React.FC<{
  className?: string,
  children?: React.ReactNode
}> = ({ className, children }) => {
  return (
    <div className={`rounded-lg border border-[#BD9F6D] bg-[#E1C18A] text-black ${className}`}>
      {children}
    </div>
  );
};


export default PaperBox;