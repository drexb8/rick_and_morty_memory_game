import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Scoreboard from "./components/Scoreboard";
import SoundButton from "./components/SoundButton";
import Difficulty from "./components/Difficulty";
import Modal from "./components/Modal";
import Button from "./components/Button";
import { FaArrowRotateLeft, FaHouse } from "react-icons/fa6";
import Instruction from "./components/Instruction";

function App() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const [difficulty, setDifficulty] = useState("");
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [isGameWon, setIsGameWon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scores, setScores] = useState({ score: 0, highScore: 0 }); // Calculate score based on answers

  //Fetch characters from Rick and Morty API
  useEffect(() => {
    async function fetchData() {
      setStatus("pending");
      try {
        // Create a minimum 2-second delay
        const [response] = await Promise.all([
          fetch("https://rickandmortyapi.com/api/character"),
          new Promise((resolve) => setTimeout(resolve, 2000)), // 2-second delay
        ]);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCharacters(
          data.results.sort(() => Math.random() - 0.5).slice(0, 12),
        );
        setStatus("level");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //Start game
  function gameStart(difficulty) {
    setDifficulty(difficulty);
    setStatus("success");
    handleSetOfCards(difficulty);
    handleShuffleCards(); // Shuffle cards after setting difficulty
  }

  function checkAnswers(answerId) {
    if (answers.includes(answerId)) {
      setIsGameWon(false);
      setIsModalOpen(true);
    } else {
      setAnswers([...answers, answerId]); // Add the clicked card's ID to answers
      setScores({
        ...scores,
        score: scores.score + 1,
        highScore: Math.max(scores.highScore, scores.score + 1),
      });
      if (scores.score + 1 === characters.length) {
        setIsGameWon(true);
        setIsModalOpen(true); // Open modal when all cards are matched
      }
    }
  }

  //Restart level
  function restartLevel() {
    setIsGameWon(null);
    setIsModalOpen(false);
    setAnswers([]);
    setScores({ ...scores, score: 0 }); // Reset score
    handleShuffleCards(); // Shuffle cards again
  }

  function handleShuffleCards() {
    setCharacters((characters) => {
      const shuffled = [...characters];
      return [...shuffled].sort(() => Math.random() - 0.5);
    }); // Set shuffled characters
  }
  //Set the number of cards based on difficulty
  function handleSetOfCards(difficulty) {
    if (difficulty === "easy") {
      setCharacters((characters) => [...characters].slice(0, 5));
    } else if (difficulty === "normal") {
      setCharacters((characters) => [...characters].slice(0, 8));
    } else if (difficulty === "hard") {
      setCharacters((characters) => [...characters].slice(0, 12));
    }
  }

  function handlePlayMusic() {
    if (!audioRef.current) {
      //If audioRef is null, assign new Audio
      audioRef.current = new Audio("/audio/background_music.mp3");
      audioRef.current.volume = 0.07; // Set volume to 7%
      audioRef.current.loop = true;
    }

    //Toggle music on and off
    if (!isMusicPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Playback failed", error);
        });
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[url('/images/background.gif')] bg-cover bg-fixed bg-center">
      {status === "pending" && <Loader />}
      {status === "level" && <Difficulty onSetDifficulty={gameStart} />}
      {status === "success" && (
        <>
          <Logo onClick={() => window.location.reload()} />
          <Instruction />
          <Scoreboard scores={scores} />
          {/* Card container */}
          <div className="flex min-h-screen flex-wrap items-center justify-center">
            <div
              className={`grid ${difficulty === "easy" ? "grid-cols-5" : difficulty === "normal" ? "grid-cols-4" : "grid-cols-6"} gap-x-6 gap-y-4`}
            >
              {characters.map((character) => (
                <Card
                  onShuffleCards={handleShuffleCards}
                  key={character.id}
                  character={character}
                  setAnswers={() => checkAnswers(character.id)}
                />
              ))}
            </div>
          </div>

          <SoundButton
            isMusicPlaying={isMusicPlaying}
            onPlayMusic={handlePlayMusic}
          />
        </>
      )}

      <Modal isModalOpen={isModalOpen}>
        <div
          className={`animate-scale-up relative -z-20 h-[550px] w-[900px] rounded-2xl border ${isGameWon ? "bg-[url('/images/success.jpg')]" : "bg-[url('/images/failed.jpg')]"} bg-cover bg-center`}
        >
          <div className="absolute -z-10 flex h-full w-full items-center justify-center">
            <h2 className="font-creepster text-[150px] text-[#07c0ca] text-shadow-lg text-shadow-lime-400">
              {isGameWon ? "You win!" : "You lose!"}
            </h2>
          </div>
          <div className="flex h-full items-end justify-around pb-8">
            <Button onClick={() => window.location.reload()}>
              <FaHouse size={60} />
            </Button>
            <Button onClick={restartLevel}>
              <FaArrowRotateLeft size={60} />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
