function Modal({ isModalOpen, children }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs ${isModalOpen ? "visible" : "hidden"}`}
    >
      {children}
    </div>
  );
}

export default Modal;
