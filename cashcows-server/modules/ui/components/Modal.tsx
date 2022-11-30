const Modal: React.FC<{
  opened: boolean,
  onClose: Function,
  title?: string,
  className?: string,
  children?: React.ReactNode
}> = ({ opened, title, className, onClose, children }) => (
  <div className={[
    opened? '': 'hidden',
    'bg-black bg-opacity-80', 
    'fixed top-0 bottom-0 left-0 right-0', 
    'flex items-center justify-center'
  ].join(' ').trim()}>
    <section className={`relative max-w-lg m-auto rounded ${className}`}>
      <header className="flex items-center">
        <h6 className="flex-grow">{title}</h6>
        <button className="text-2xl" onClick={() => { onClose() }}>
          <i className="fas fa-times"></i>
        </button>
      </header>
      <main>{children}</main>
    </section>
  </div>
);


export default Modal;