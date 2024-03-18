import React from "react";
import { useProfile } from "contexts/ProfileContext";

// カード用のデータを定義する
const menuItems = [
  {
    path: "/viewkaraage",
    title: "からあげを観察する",
    description: "みんなのからあげを見て回ろう",
    imageUrl: "/assets/imgs/chikencard1.png",
  },
  {
    path: "/postkaraage",
    title: "からあげを投稿する（登録ユーザー限定）",
    description:
      "からあげレシピを作成したり、店で食べたからあげをレビューしよう",
    imageUrl: "/assets/imgs/chikencard2.png",
    requiresProfile: true, // このリンクはプロファイルが必要
  },
  {
    path: "/mypage",
    title: "マイページ（登録ユーザー限定）",
    description: "あなたのからあげを管理しよう",
    imageUrl: "/assets/imgs/chikencard3.png",
    requiresProfile: true,
  },
  {
    path: "/eat-karaage",
    title: "カラアゲーム",
    description: "からあげで遊ぼう",
    imageUrl: "/assets/imgs/chikencard4.png",
  },
];

const MainMenu = () => {
  const { profile } = useProfile();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 gap-4 p-4">
        {menuItems.map((item) => {
          const isDisabled = item.requiresProfile && !profile;
          const Component = isDisabled ? "div" : "a"; // リンクが無効な場合はdiv、有効な場合はaを使用
          return (
            <Component
              key={item.title}
              href={!isDisabled ? item.path : null}
              className={`flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] overflow-hidden ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault(); // リンクが無効な場合はクリックイベントを無効にする
                }
              }}
            >
              <img
                className="w-full h-40 rounded-t-xl object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
                src={item.imageUrl}
                alt={item.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
};
export default MainMenu;
