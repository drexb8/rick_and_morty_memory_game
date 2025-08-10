function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="font-creepster cursor-pointer rounded-xl border-b-6 border-b-lime-700 bg-lime-500 px-10 py-4 text-4xl tracking-widest text-white transition-all duration-100 text-shadow-neutral-800/80 text-shadow-sm active:translate-y-0.5 active:scale-95 active:border-b-4"
    >
      {children}
    </button>
  );
}

export default Button;
