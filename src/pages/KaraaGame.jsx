import React from "react";
import { RoutePath } from "utils/RouteSetting";
import { Link } from "react-router-dom";

const KaraaGame = () => {
  // サンプルデータ
  const GamePath = [
    {
      title: "からあげしかないレストラン",
      image_url: "/assets/imgs/game/retrogame.png",
      description:
        "プレイヤーは、レシピに従って迅速にからあげを調理するシェフとなります。タイムマネジメントと正確なレシピが成功の鍵。",
      url: RoutePath.recipegame.path,
    },
    {
      title: "KARAAGE SOULS（開発予定）",
      image_url: "/assets/imgs/game/karaagesoul.png",
      description:
        "強力な敵と立ち向かいながら、「究極のからあげ」を探求します。剣とからあげの力を解放し、闇に立ち向かう。",
      url: "#",
    },
    {
      title: "唐揚げの野望（開発予定）",
      image_url: "/assets/imgs/game/karaagenoyabo.png",
      description:
        "日本統一を目指し、からあげを使って大名たちとの同盟を深め、敵を出し抜く戦略シミュレーションゲーム。美味しいからあげが大義名分となる。",
      url: "#",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-5 px-4 md:px-20">
      <h1 className="text-2xl font-semibold text-gray-800 pb-2 pt-5">
        からあゲーム
      </h1>
      <Link
        to={RoutePath.mainpage.path}
        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        メインページへ
      </Link>
      <div className="flex flex-wrap -m-4 pt-10">
        {GamePath.map((game, index) => (
          <div key={index} className="p-4 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              {/* 画像をリンクとして使用 */}
              <Link to={game.url}>
                <img
                  className="w-full h-auto rounded-t-xl cursor-pointer"
                  src={game.image_url}
                  alt="Image Description"
                />
              </Link>
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {game.title}
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {game.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 text-right text-md text-gray-800">
        ※実際は開発予定すらない場合があります
      </div>
    </div>
  );
};

export default KaraaGame;
