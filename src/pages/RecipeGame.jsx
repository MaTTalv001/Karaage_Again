// ミニゲーム　レシピ通りに具材を集めてからあげをあげる

import React, { useState, useEffect } from "react";
import { useProfile } from "contexts/ProfileContext";
import supabase from "services/supabaseClient";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import FlyingKaraage from "components/FlyingKaraage";
import { Link } from "react-router-dom";
import { RoutePath } from "utils/RouteSetting";

// To Do リファクタリング

// 材料リスト
const ingredients = [
  "むね肉",
  "もも肉",
  "手羽先",
  "手羽元",
  "醤油",
  "酒",
  "塩",
  "胡椒",
  "砂糖",
  "ニンニク",
  "生姜",
  "中華スープの素",
  "カレー粉",
  "片栗粉",
  "小麦粉",
];
// 材料画像（DALLEで作成　著作権OK）
const ingredientImages = {
  もも肉: "/assets/imgs/game/recipe/001.png",
  むね肉: "/assets/imgs/game/recipe/002.png",
  手羽先: "/assets/imgs/game/recipe/003.png",
  手羽元: "/assets/imgs/game/recipe/004.png",
  醤油: "/assets/imgs/game/recipe/005.png",
  酒: "/assets/imgs/game/recipe/006.png",
  塩: "/assets/imgs/game/recipe/007.png",
  胡椒: "/assets/imgs/game/recipe/008.png",
  砂糖: "/assets/imgs/game/recipe/009.png",
  ニンニク: "/assets/imgs/game/recipe/010.png",
  生姜: "/assets/imgs/game/recipe/011.png",
  中華スープの素: "/assets/imgs/game/recipe/012.png",
  カレー粉: "/assets/imgs/game/recipe/013.png",
  片栗粉: "/assets/imgs/game/recipe/014.png",
  小麦粉: "/assets/imgs/game/recipe/015.png",
};
// ユーザーに出題するレシピのリスト
const recipes = [
  {
    もも肉: 1,
    醤油: 2,
    片栗粉: 1,
  },
  {
    むね肉: 1,
    酒: 1,
    胡椒: 1,
    小麦粉: 1,
  },
  {
    手羽先: 1,
    胡椒: 1,
    醤油: 1,
    片栗粉: 1,
  },
  {
    手羽元: 2,
    醤油: 1,
    中華スープの素: 1,
  },
  {
    もも肉: 1,
    塩: 1,
    片栗粉: 1,
  },
  {
    むね肉: 1,
    醤油: 1,
    胡椒: 1,
    小麦粉: 1,
  },
  {
    手羽先: 1,
    ニンニク: 1,
    片栗粉: 1,
  },
  {
    手羽元: 1,
    醤油: 2,
    小麦粉: 1,
  },
  {
    もも肉: 2,
    ニンニク: 1,
    カレー粉: 1,
  },
  {
    むね肉: 2,
    醤油: 2,
  },
  {
    手羽先: 1,
    酒: 1,
    片栗粉: 1,
  },
  {
    手羽元: 2,
    中華スープの素: 1,
    小麦粉: 1,
  },
  {
    もも肉: 1,
    醤油: 1,
    片栗粉: 1,
  },
  {
    むね肉: 4,
  },
  {
    手羽先: 3,
    中華スープの素: 1,
  },
  {
    手羽元: 1,
    生姜: 1,
    砂糖: 1,
    小麦粉: 1,
  },
];

// レシピをランダムで抽選する
function generateRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

// ユーザーが準備した具材とレシピを照合する。順不同
function compareRecipes(recipe1, recipe2) {
  const keys1 = Object.keys(recipe1);
  const keys2 = Object.keys(recipe2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!recipe2.hasOwnProperty(key) || recipe1[key] !== recipe2[key]) {
      return false;
    }
  }

  return true;
}

// ここから最後までゲームのメイン部分
function RecipeGame() {
  const { profile } = useProfile();
  const [currentRecipe, setCurrentRecipe] = useState(generateRecipe());
  const [userSelection, setUserSelection] = useState({});
  const [successCount, setSuccessCount] = useState(0);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(Math.random());
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [karaages, setKaraages] = useState([]);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const [countDown, setCountDown] = useState(3); // カウントダウン用
  const [showCountDown, setShowCountDown] = useState(false); // カウントダウン表示用
  const [showGauge, setShowGauge] = useState(false);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [gaugeDirection, setGaugeDirection] = useState(1);
  const [intervalId, setIntervalId] = useState(null);

  const post = {
    title: "からあげアゲイン",
    url: "https://karaage-again.vercel.app/karaagame",
  };
  const handleTweet = () => {
    const tweetText = `【リストランテからあげ】${time}秒でクリアしました！！ #からあげアゲイン `;
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(
      post.url
    )}&text=${encodeURIComponent(tweetText)}`;

    // 新しいタブでTwitter共有ページを開く
    window.open(twitterUrl, "_blank");
  };

  // ゲームクリアフラグの制御
  useEffect(() => {
    if (successCount >= 5) {
      setIsGameCleared(true); // ゲームクリア状態をtrueに設定
      setIsGameStarted(false); // ゲーム開始フラグをfalseにして計測を停止
    }
  }, [successCount]); // 成功回数が変化するたびにチェック

  // おまけ要素　からあげが飛ぶ演出
  useEffect(() => {
    if (isGameStarted) {
      const interval = setInterval(() => {
        setKaraages((prevKaraages) => {
          // 唐揚げの数が50個未満の場合のみ新しい唐揚げを追加
          if (prevKaraages.length < 50) {
            return [...prevKaraages, <FlyingKaraage key={Date.now()} />];
          } else {
            // 既に50個ある場合は何も追加しない
            return prevKaraages;
          }
        });
      }, 3000); // 1秒ごとに唐揚げを追加する試みを行う

      return () => clearInterval(interval);
    }
  }, [isGameStarted]);

  // ゲームスタート時のカウントダウン
  useEffect(() => {
    if (!isGameStarted) return;

    setShowCountDown(true);
    setCountDown(3); // カウントダウンを3から開始する
    const countDownInterval = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(countDownInterval);
  }, [isGameStarted]); // isGameStarted の変化をトリガーとする

  // カウントダウンが終わったらゲーム開始フラグをオン
  useEffect(() => {
    if (countDown <= 0) {
      setShowCountDown(false); // カウントダウンを非表示にする
      if (!isGameStarted) {
        setIsGameStarted(true); // ゲーム開始フラグ
      }
    }
  }, [countDown]);

  // 具材のドラッグアンドドロップ　react-dndのインストールが必要
  function DroppableArea() {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: "ingredient",
      drop: (item, monitor) => {
        // selectIngredient関数を呼び出して、ドラッグ＆ドロップされた材料のカウントを増やす
        selectIngredient(item.ingredient);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
    // ドロップエリア（まな板）のスタイル
    const style = {
      height: "100px",
      width: "100%",
      border: "2px dashed gray",
      backgroundColor: isOver && canDrop ? "lightgreen" : "white",
      color: "black",
      padding: "10px",
      textAlign: "center",
      lineHeight: "80px", // 中央揃えのための設定
    };

    return (
      <>
        <h2 className="pt-2 text-left text-xl font-semibold text-gray-800 ">
          まな板
        </h2>
        <div ref={drop} style={style}>
          {isOver && canDrop ? "ここに材料をドロップ" : "材料をここにドラッグ"}
        </div>
        <div className="mt-2">
          {Object.entries(userSelection).length > 0 ? (
            <ul className="list-disc pl-5">
              {Object.entries(userSelection).map(
                ([ingredient, count], index) => (
                  <li key={index} className="text-gray-800">
                    {ingredient} x {count}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="text-gray-800">まだ材料が追加されていません。</p>
          )}
        </div>
      </>
    );
  }

  // 材料表示エリア（ドラッグ可能）
  function DraggableIngredient({ ingredient }) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "ingredient",
      item: { ingredient },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {/* 材料の表示 */}
        <div
          key={ingredient}
          className="p-2 relative text-gray-800 font-bold flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out"
          style={{ height: "100px" }}
        >
          <img
            src={ingredientImages[ingredient]}
            alt={ingredient}
            className="h-full w-auto"
          />
          <span className="z-10 relative">{ingredient}</span>
          <div className="absolute inset-0"></div>
        </div>
      </div>
    );
  }

  // 現在未使用部分　ToDo動作確認後削除
  const handleDrop = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  };

  // ゲームの状態と時間計測を監視
  useEffect(() => {
    // カウントダウンが表示されている間は、タイマーを開始しない
    if (showCountDown) {
      return;
    }

    // カウントダウンが非表示で、ゲームが開始された場合のみ、タイマーを開始する
    if (isGameStarted) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      // コンポーネントのクリーンアップ時にタイマーをクリア
      return () => clearInterval(timer);
    }
  }, [isGameStarted, showCountDown]); // 依存配列にisGameStartedとshowCountDownを追加

  // ユーザーが材料を選んだ時の処理
  function selectIngredient(ingredient) {
    setUserSelection((prevSelection) => {
      // 新しい選択を計算
      const newSelection = {
        ...prevSelection,
        [ingredient]: (prevSelection[ingredient] || 0) + 1,
      };
      // 新しい状態を返す
      return newSelection;
    });
  }

  // 具材の並び方をランダムにする。Fisher-Yatesアルゴリズム
  useEffect(() => {
    // ingredients配列をランダムに並び替える関数
    const shuffleIngredients = (ingredients) => {
      const array = [...ingredients];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setRandomIngredients(shuffleIngredients(ingredients));
  }, [ingredients]); // 依存配列にingredientsを設定

  // タイムのフォーマットを修正する関数
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  // フライヤーのボタンが押された時の判定
  // 材料の配列もシャッフルする
  const operateFryer = () => {
    if (compareRecipes(currentRecipe, userSelection)) {
      // ゲージの表示を開始
      setShowGauge(true);
      // ゲージのアニメーション開始
      startGaugeAnimation();
    } else {
      alert("材料が間違っている！");
      // 次のレシピを生成
      resetGame();
    }
  };

  // ingredients配列をランダムに並び替えて設定する
  const shuffleIngredientsAndSet = () => {
    const shuffledIngredients = ingredients.sort(() => 0.5 - Math.random());
    setRandomIngredients(shuffledIngredients);
  };

  const startGaugeAnimation = () => {
    setShowGauge(true); // ゲーム開始時にゲージを表示する
    // すでに動作中のインターバルがあればクリアする
    if (intervalId !== null) clearInterval(intervalId);

    const interval = setInterval(() => {
      setGaugeValue((g) => {
        let nextValue = g + 1;
        if (nextValue >= 100) {
          // ゲージが100に到達したら自動的に失敗と判断
          alert("失敗...");
          clearInterval(interval); // ここでインターバルを停止
          resetGame(); // ゲームをリセット
          return nextValue; // ここで100を返して更新を止める
        }
        return nextValue;
      });
    }, 12);

    setIntervalId(interval); // インターバルIDをステートに設定
  };

  // からあげを揚げるボタンを押した後の具材などのリセット
  const resetGame = () => {
    if (intervalId !== null) {
      clearInterval(intervalId); // インターバルをクリア
      setIntervalId(null); // インターバルIDのステートをリセット
    }
    setGaugeValue(0); // ゲームのリセット時にゲージを0に設定
    setShowGauge(false); // ゲージを非表示にする
    setCurrentRecipe(generateRecipe());
    setUserSelection({});
    setKey(Math.random());
    shuffleIngredientsAndSet();
  };

  // ゲージクリック時のリアクション
  // To Do アラート表示ではなくモーダル化
  const handleGaugeClick = () => {
    if (showGauge) {
      if (gaugeValue >= 70 && gaugeValue <= 90) {
        // 成功範囲内であれば成功
        alert("こんがり揚がりました！");
        setSuccessCount((prevCount) => prevCount + 1); // 成功回数を更新
      } else {
        // 成功範囲外であれば失敗
        alert("からあげ失敗...");
      }
      resetGame(); // ゲームをリセット
    }
  };

  return (
    <>
      {karaages}
      {showGauge && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-3/4">
          <div className="relative w-full h-10 bg-gray-200">
            <div
              className={`h-full ${
                gaugeValue < 70
                  ? "bg-blue-500"
                  : gaugeValue <= 90
                  ? "bg-red-500"
                  : "bg-black"
              }`}
              style={{ width: `${gaugeValue}%` }}
            ></div>
            {/* 75%のマーカー */}
            <div className="absolute top-0 left-3/4 w-0.5 h-full bg-black"></div>
          </div>
          <div className="flex justify-center items-center py-2">
            <button
              onClick={handleGaugeClick}
              className="mx-10 py-10 px-8 bg-orange-500 text-white font-bold text-lg rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              揚げる！！
            </button>
          </div>
        </div>
      )}
      {isGameCleared && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-700 z-50">
          <div className="text-center">
            <p className="text-4xl text-white mb-8">
              ゲームクリア！クリアタイム{time}秒
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      <div className="flex flex-col items-center justify-center p-20">
        <h1 className="text-2xl font-semibold text-gray-800 pb-10 pt-5">
          リストランテからあげ
        </h1>

        <div className="w-full max-w-4xl mb-4">
          <div className="max-w-[85rem] px-2 py-1 sm:px-4 lg:px-6 md:py-1 lg:py-1 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              {/* 成功回数 */}
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Goodアゲ: {successCount}回
                </h3>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {Array.from({ length: successCount }, (_, i) => i).map(
                    (_, index) => (
                      <img
                        key={index}
                        src="/favicon.png"
                        alt="からあげ"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* タイマー */}
              <div className="flex items-center space-x-2">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {formatTime(time)}
                </h3>
              </div>

              {/* スタート/リセットボタン */}
              <div>
                {!isGameStarted ? (
                  <button
                    onClick={() => setIsGameStarted(true)}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded shadow"
                  >
                    スタート
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.reload()}
                    className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded shadow"
                  >
                    リセット
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {!isGameStarted && (
          <div className="flex justify-center items-center w-full max-w-4xl mx-auto">
            <img
              src="/assets/imgs/game/recipe/instructions.png"
              alt="イントロダクション"
              className="max-w-full h-auto"
            />
          </div>
        )}

        {showCountDown ? (
          <div className="fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-black text-shadow-md z-50">
            <h2 className="text-6xl text-black font-bold">
              {countDown >= 0 ? countDown : "ゲームスタート！"}
            </h2>
          </div>
        ) : (
          isGameStarted && (
            <div className="flex justify-between w-full max-w-4xl">
              {/* レシピのセクション */}
              <div className="flex-1">
                <div className="max-w-[85rem] px-1 py-1 sm:px-2 lg:px-1 lg:py-2 mx-auto">
                  <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <div className="px-4 py-2 grid gap-2 md:flex md:justify-between md:items-center border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">
                              現在のオーダー
                            </h2>
                          </div>
                          <TransitionGroup>
                            <CSSTransition
                              key={key}
                              timeout={500}
                              classNames="fade"
                            >
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-4 py-2 text-left text-lg font-semibold uppercase tracking-wider text-gray-800"
                                    >
                                      材料
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-2 text-left text-lg font-semibold uppercase tracking-wider text-gray-800"
                                    >
                                      量
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {Object.entries(currentRecipe).map(
                                    ([ingredient, quantity]) => (
                                      <tr key={ingredient}>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg font-medium text-gray-800">
                                          {ingredient}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg text-gray-800">
                                          {quantity}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </CSSTransition>
                          </TransitionGroup>
                        </div>
                        <DroppableArea />
                        <button
                          onClick={operateFryer}
                          className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
                        >
                          揚げる！！
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 材料選択セクション */}
              <div className="flex-1 p-4  bg-white border border-gray-200 rounded-xl shadow-sm ml-4">
                <h2 className="text-lg font-bold mb-2">材料を選ぶ</h2>
                <div className="grid grid-cols-4 gap-4">
                  {randomIngredients.map((ingredient) => (
                    <DraggableIngredient
                      key={ingredient}
                      ingredient={ingredient}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
        <div className="pt-10">
          <Link
            to={RoutePath.karaagame.path}
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            ゲームセレクトに戻る
          </Link>
        </div>
      </div>
    </>
  );
}

export default RecipeGame;
