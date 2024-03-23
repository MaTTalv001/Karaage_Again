import React, { useState, useEffect } from "react";
import { useProfile } from "contexts/ProfileContext";
import supabase from "services/supabaseClient";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

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
const recipes = [
  {
    もも肉: 3,
    醤油: 4,
    生姜: 1,
    ニンニク: 3,
    片栗粉: 2,
  },
  {
    むね肉: 2,
    酒: 3,
    塩: 4,
    胡椒: 1,
    小麦粉: 2,
  },
  {
    手羽先: 1,
    胡椒: 2,
    砂糖: 2,
    醤油: 1,
    片栗粉: 1,
  },
  {
    手羽元: 3,
    醤油: 2,
    中華スープの素: 1,
    カレー粉: 5,
    小麦粉: 3,
  },
  {
    もも肉: 2,
    酒: 3,
    生姜: 2,
    塩: 5,
    片栗粉: 3,
  },
  {
    むね肉: 2,
    醤油: 2,
    胡椒: 4,
    砂糖: 1,
    小麦粉: 3,
  },
  {
    手羽先: 3,
    ニンニク: 3,
    塩: 4,
    酒: 2,
    片栗粉: 2,
  },
  {
    手羽元: 2,
    胡椒: 2,
    醤油: 2,
    生姜: 2,
    小麦粉: 1,
  },
  {
    もも肉: 2,
    ニンニク: 6,
    酒: 5,
    カレー粉: 5,
    片栗粉: 2,
  },
  {
    むね肉: 4,
    醤油: 1,
    生姜: 1,
    砂糖: 4,
    小麦粉: 5,
  },
  {
    手羽先: 2,
    胡椒: 5,
    塩: 2,
    酒: 1,
    片栗粉: 3,
  },
  {
    手羽元: 3,
    ニンニク: 3,
    醤油: 2,
    中華スープの素: 6,
    小麦粉: 3,
  },
  {
    もも肉: 4,
    胡椒: 3,
    塩: 1,
    醤油: 2,
    片栗粉: 4,
  },
  {
    むね肉: 6,
    ニンニク: 3,
    酒: 4,
    生姜: 4,
    小麦粉: 5,
  },
  {
    手羽先: 3,
    中華スープの素: 3,
    カレー粉: 5,
    酒: 2,
    片栗粉: 1,
  },
  {
    手羽元: 2,
    醤油: 3,
    生姜: 4,
    砂糖: 1,
    小麦粉: 1,
  },
];

function generateRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

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

function KaraageGame() {
  const { profile } = useProfile();
  const [currentRecipe, setCurrentRecipe] = useState(generateRecipe());
  const [userSelection, setUserSelection] = useState({});
  const [successCount, setSuccessCount] = useState(0);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(Math.random());

  // ドラッグアンドドロップ
  function DroppableArea() {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: "ingredient",
      drop: (item, monitor) => {
        // handle drop event
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
    // ドロップエリアのスタイル。ドラッグ中やドロップ可能な状態に応じて変化します。
    const style = {
      height: "200px",
      width: "100%",
      border: "2px dashed gray",
      backgroundColor: isOver && canDrop ? "lightgreen" : "white",
      color: "black",
      padding: "10px",
      textAlign: "center",
      lineHeight: "180px", // 中央揃えのための設定
    };

    return (
      <div ref={drop} style={style}>
        {isOver && canDrop ? "ここに材料をドロップ" : "材料をここにドラッグ"}
      </div>
    );
  }

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
        <button
          key={ingredient}
          className=" p-2 relative text-gray−800 font-bold flex flex-col items-center"
          onClick={() => selectIngredient(ingredient)}
          style={{ height: "100px" }}
        >
          <img
            src={ingredientImages[ingredient]}
            alt={ingredient}
            className="h-full w-auto"
          />
          <span className="z-10 relative">{ingredient}</span>
          <div className="absolute inset-0 "></div>
        </button>
      </div>
    );
  }
  const handleDrop = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  };

  // タイマーを開始する関数
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => clearInterval(timer);
  }, []);

  // ユーザーが材料を選んだ時の処理
  function selectIngredient(ingredient) {
    setUserSelection((prevSelection) => ({
      ...prevSelection,
      [ingredient]: (prevSelection[ingredient] || 0) + 1,
    }));
  }

  // タイムのフォーマットを修正する関数
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  // フライヤーのボタンが押された時の判定
  function operateFryer() {
    if (compareRecipes(currentRecipe, userSelection)) {
      setSuccessCount((prevCount) => prevCount + 1);
      alert("正解！");
    } else {
      alert("不正解...");
    }
    // 次のレシピを生成
    setCurrentRecipe(generateRecipe());
    // ユーザーの選択をリセット
    setUserSelection({});
    // キーを更新
    setKey(Math.random());
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-20">
        <div className="w-full max-w-6xl mb-4">
          <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 md:py-2 lg:py-2 mx-auto  bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="grid sm:grid-cols-2">
              {/* 成功回数とタイマーのカード */}
              <div className="p-1 md:p-1">
                <div>
                  {/* 成功回数を示すアイコン */}
                  <svg
                    className="flex-shrink-0 size-10 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l2 7h7l-6 4.28L21 20l-7-5-7 5 2.9-6.72L5 9h7z"></path>
                  </svg>
                  <div className="mt-3">
                    <p className="text-2xl uppercase tracking-wide text-gray-500">
                      成功回数
                    </p>
                    <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                      <h3 className="text-4xl sm:text-2xl font-semibold text-gray-800 ">
                        {successCount}回
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* タイマーのカード */}
              <div className="p-1 md:p-1">
                <div>
                  {/* タイマーを示すアイコン */}
                  <svg
                    className="flex-shrink-0 size-10 text-gray-500"
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
                  <div className="mt-3">
                    <p className="text-2xl uppercase tracking-wide text-gray-500">
                      タイマー
                    </p>
                    <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                      <h3 className="text-4xl sm:text-2xl font-semibold text-gray-800 ">
                        {formatTime(time)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-6xl mt-4">
          {/* レシピのセクション */}
          <div className="flex-1">
            <div className="max-w-[85rem] px-1 py-10 sm:px-6 lg:px-3 lg:py-14 mx-auto">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
                      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                        <h2 className="text-xl font-semibold text-gray-800 ">
                          現在のオーダー
                        </h2>
                      </div>
                      <TransitionGroup>
                        <CSSTransition
                          key={key}
                          timeout={500}
                          classNames="fade"
                        >
                          <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50 ">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider text-gray-800 "
                                >
                                  材料
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xl font-semibold uppercase tracking-wider text-gray-800 "
                                >
                                  量
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                              {Object.entries(currentRecipe).map(
                                ([ingredient, quantity]) => (
                                  <tr key={ingredient}>
                                    <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                                      {ingredient}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                                      {quantity}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </CSSTransition>
                      </TransitionGroup>
                      <button
                        onClick={operateFryer}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                      >
                        レシピを変更
                      </button>
                    </div>
                    <DroppableArea onDrop={handleDrop} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 材料選択セクション */}
          <div className="flex-1 p-4  bg-white border border-gray-200 rounded-xl shadow-sm ml-4">
            <h2 className="text-lg font-bold mb-2">材料を選ぶ</h2>
            <div className="grid grid-cols-3 gap-4">
              {ingredients.map((ingredient) => (
                <DraggableIngredient key={ingredient} ingredient={ingredient} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KaraageGame;
