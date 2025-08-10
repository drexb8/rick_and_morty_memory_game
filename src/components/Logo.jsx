function Logo({ onClick }) {
  return (
    <div onClick={onClick} className="absolute top-6 left-9 cursor-pointer">
      <img className="w-80 bg-transparent" src="/images/logo.png" alt="logo" />
    </div>
  );
}

export default Logo;
