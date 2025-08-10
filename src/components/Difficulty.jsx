import Button from "./Button";
import Logo from "./Logo";

const DIFFICULTY = ["easy", "normal", "hard"];

function Difficulty({ onSetDifficulty }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="-mt-6 flex flex-col gap-8">
        <img src="images/logo.png" />
        <h1 className="font-creepster text-center text-8xl text-white text-shadow-lime-800 text-shadow-sm">
          Memory Game
        </h1>
        <div className="flex justify-center gap-5">
          {DIFFICULTY.map((item, index) => (
            <Button key={index} onClick={() => onSetDifficulty(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
