function Scoreboard({ scores }) {
  const textStyle =
    "font-creepster text-4xl text-white text-shadow-lime-500 text-shadow-sm";
  return (
    <div className="absolute right-9 flex flex-col rounded-br-xl rounded-bl-xl bg-[#03b0b9] px-10 py-3">
      <div className="py-1">
        <span className={textStyle}>Score: </span>
        <span className={textStyle}>{scores.score}</span>
      </div>
      <div className="py-1">
        <span className={textStyle}>High Score: </span>
        <span className={textStyle}>{scores.highScore}</span>
      </div>
    </div>
  );
}

export default Scoreboard;
