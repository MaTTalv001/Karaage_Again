import React, { useState, useEffect } from "react";
import { RoutePath } from "utils/RouteSetting";
import { Link } from "react-router-dom";

const generateCardImages = (difficulty) => {
  let pairs = 4; // easy のデフォルト
  if (difficulty === "normal") pairs = 8;
  else if (difficulty === "KARAAGE Must Die") pairs = 16;

  const cardImages = [];
  for (let i = 1; i <= pairs; i++) {
    cardImages.push({
      src: `/assets/imgs/game/flip/img${i}.jpg`,
      matched: false,
    });
  }
  return cardImages;
};

const Mekuri = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const post = {
    title: "からあげアゲイン",
    url: "https://karaage-again.vercel.app/karaagame",
  };

  const handleTweet = () => {
    const tweetText = `【からあげめくり】${difficulty}モードを${turns}ターンでクリアしました！！`;
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(
      post.url
    )}&text=${encodeURIComponent(tweetText)}`;

    // 新しいタブでTwitter共有ページを開く
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    shuffleCards(difficulty);
  }, [difficulty]);

  // ゲームクリアのチェック
  useEffect(() => {
    const unmatchedCards = cards.filter((card) => !card.matched);
    if (cards.length >= 0 && unmatchedCards.length === 0) {
      setIsGameCleared(true);
    }
  }, [cards]);

  const shuffleCards = (difficulty) => {
    const cardImages = generateCardImages(difficulty);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsGameCleared(false);
  };

  // カード選択
  const handleChoice = (card) => {
    if (!disabled) {
      if (!choiceOne) {
        setChoiceOne(card);
        setCards((prevCards) =>
          prevCards.map((item) =>
            item.id === card.id ? { ...item, flipped: true } : item
          )
        );
      } else if (!choiceTwo && card.id !== choiceOne.id) {
        setChoiceTwo(card);
        setCards((prevCards) =>
          prevCards.map((item) =>
            item.id === card.id ? { ...item, flipped: true } : item
          )
        );
        setDisabled(true);
      }
    }
  };

  // 選択したカードの比較
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // 2枚選択中は他のカードの選択を禁止
      setTimeout(() => {
        if (choiceOne.src === choiceTwo.src) {
          // 正解の場合
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.src === choiceOne.src ? { ...card, matched: true } : card
            )
          );
          alert("正解！");
        } else {
          // 不正解の場合
          setCards((prevCards) =>
            prevCards.map((card) => ({
              ...card,
              flipped: false, // 両方のカードを裏に戻す
            }))
          );
          alert("不正解！");
        }
        resetTurn();
      }, 1000); // 2枚のカードが表示された後、3秒待ってから処理を実行
    }
  }, [choiceOne, choiceTwo]);

  // ターンと選択のリセット
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    // 正解したカードを除去
    setCards((prevCards) => prevCards.filter((card) => !card.matched));
  };

  // ゲーム開始時にカードをシャッフル
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">からあげめくり</h2>
      <div className="flex flex-wrap justify-center mb-4">
        {["easy", "normal", "KARAAGE Must Die"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`py-2 px-4 m-2 text-sm font-medium ${
              difficulty === level
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            } rounded-lg shadow`}
          >
            {level}
          </button>
        ))}
      </div>
      <button
        onClick={shuffleCards}
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
      >
        New Game
      </button>
      <p className="my-2 text-2xl font-bold">ターン数: {turns}</p>
      <div className="card-grid grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            className="card aspect-w-1 aspect-h-1 w-40 h-40 flex justify-center items-center bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150 ease-in-out cursor-pointer"
            key={card.id}
            onClick={() => handleChoice(card)}
          >
            {card.flipped && (
              <img
                src={card.src}
                alt="card front"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {!card.flipped && (
              <img
                src="favicon.png"
                alt="card back"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

      {isGameCleared && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-700 z-50">
          <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
            <p className="text-4xl text-white mb-8">
              ゲームクリア！{difficulty}モード　ターン数: {turns}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              リトライ
            </button>
            <button
              onClick={handleTweet}
              className="mx-2 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              <i className="fab fa-twitter"></i> Xにポスト
            </button>
          </div>
        </div>
      )}
      <div className="py-5">
        <Link
          to={RoutePath.karaagame.path}
          className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          ゲームセレクトに戻る
        </Link>
      </div>
    </div>
  );
};

export default Mekuri;
