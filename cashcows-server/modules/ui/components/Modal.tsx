const Modal: React.FC<{
  open: boolean,
  onClose: Function,
  title?: string,
  className?: string,
  children?: React.ReactNode
}> = ({ open, title, className, onClose, children }) => (
  <div className={`${open? '': 'hidden'} bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 flex items-center justify-center`}>
    <section className={`relative max-w-lg m-auto rounded ${className}`}>
      <header className="flex items-center">
        <h6 className="flex-grow">{title}</h6>
        <button onClick={() => { onClose() }}>
          <i className="fas fa-times"></i>
        </button>
      </header>
      <main>{children}</main>
    </section>
  </div>
);


export default Modal;