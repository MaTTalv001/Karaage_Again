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
    もも肉: 1,
    醤油: 2,
    生姜: 1,
    ニンニク: 1,
    片栗粉: 1,
  },
  {
    むね肉: 1,
    酒: 2,
    塩: 1,
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
    醤油: 1,
    中華スープの素: 1,
    カレー粉: 1,
    小麦粉: 1,
  },
  {
    もも肉: 1,
    酒: 2,
    生姜: 2,
    塩: 1,
    片栗粉: 1,
  },
  {
    むね肉: 1,
    醤油: 1,
    胡椒: 1,
    砂糖: 2,
    小麦粉: 2,
  },
  {
    手羽先: 3,
    ニンニク: 3,
    塩: 2,
    酒: 1,
    片栗粉: 2,
  },
  {
    手羽元: 1,
    胡椒: 1,
    醤油: 2,
    生姜: 2,
    小麦粉: 1,
  },
  {
    もも肉: 2,
    ニンニク: 2,
    カレー粉: 2,
  },
  {
    むね肉: 4,
    醤油: 2,
    生姜: 1,
    小麦粉: 5,
  },
  {
    手羽先: 2,
    胡椒: 2,
    塩: 1,
    酒: 1,
    片栗粉: 2,
  },
  {
    手羽元: 3,
    ニンニク: 1,
    醤油: 2,
    中華スープの素: 2,
    小麦粉: 1,
  },
  {
    もも肉: 2,
    胡椒: 1,
    醤油: 2,
    片栗粉: 1,
  },
  {
    むね肉: 4,
    ニンニク: 1,
    生姜: 1,
    小麦粉: 1,
  },
  {
    手羽先: 3,
    中華スープの素: 3,
    酒: 1,
    片栗粉: 1,
  },
  {
    手羽元: 2,
    醤油: 1,
    生姜: 2,
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
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // ドラッグアンドドロップ
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
    // ドロップエリアのスタイル
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
    setUserSelection((prevSelection) => {
      // 新しい選択を計算
      const newSelection = {
        ...prevSelection,
        [ingredient]: (prevSelection[ingredient] || 0) + 1,
      };
      // コンソールに出力
      console.log(newSelection);
      // 新しい状態を返す
      return newSelection;
    });
  }

  // 具材の並び方をランダムにするFisher-Yatesアルゴリズム
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
        <div className="w-full max-w-4xl mb-4">
          <div className="max-w-[85rem] px-2 py-1 sm:px-4 lg:px-6 md:py-1 lg:py-1 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="grid sm:grid-cols-2">
              {/* 成功回数とタイマーのカード */}
              <div className="p-0.5 md:p-0.5">
                <div>
                  {/* 成功回数を示すアイコン */}
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-gray-500" // アイコンサイズを調整
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
                  <div className="mt-2">
                    <p className="text-xl uppercase tracking-wide text-gray-500">
                      成功回数
                    </p>
                    <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                      <h3 className="text-3xl sm:text-xl font-semibold text-gray-800">
                        {successCount}回
                      </h3>
                      {/* 成功回数に応じた画像を表示 */}
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
                  </div>
                </div>
              </div>
              {/* タイマーのカード */}
              <div className="p-0.5 md:p-0.5">
                <div>
                  {/* タイマーを示すアイコン */}
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-gray-500" // アイコンサイズを調整
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
                  <div className="mt-2">
                    <p className="text-xl uppercase tracking-wide text-gray-500">
                      タイマー
                    </p>
                    <div className="mt-1 lg:flex lg:justify-between lg:items-center">
                      <h3 className="text-3xl sm:text-xl font-semibold text-gray-800">
                        {formatTime(time)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
