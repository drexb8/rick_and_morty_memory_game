function Card({ onShuffleCards, character, setAnswers }) {
  const { id, name, image } = character;

  function handleCardClick() {
    onShuffleCards();
    setAnswers(); // Set the answer when the card is clicked
  }
  return (
    <div
      onClick={handleCardClick}
      className={`flex h-[340px] w-[225px] cursor-pointer flex-col items-center justify-between rounded-3xl border border-none border-gray-200 bg-[url(/images/card_background.jpg)] bg-cover bg-center p-3 transition-all duration-100 ease-in hover:scale-105 hover:shadow-2xl/80 hover:shadow-lime-400`}
    >
      <img
        className="h-62 w-70 rounded-xl"
        src={
          image === "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
            ? "images/antenna_rick.jpg"
            : image
        }
      />
      <p className="font-creepster text-center text-3xl text-white text-shadow-lime-500 text-shadow-sm">
        {name}
      </p>
    </div>
  );
}

export default Card;
