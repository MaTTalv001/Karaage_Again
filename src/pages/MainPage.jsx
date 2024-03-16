import React from "react";
import { Link } from "react-router-dom"; // React Routerを使用している前提で

// カード用のデータを定義する
const menuItems = [
  {
    path: "/view-karaage",
    title: "からあげを観察する",
    description: "みんなのからあげを見て回ろう",
    imageUrl: "/assets/imgs/chikencard1.png",
  },
  {
    path: "/makekaraage",
    title: "からあげを登録する",
    description:
      "からあげレシピを作成したり、店で食べたからあげをレビューしよう",
    imageUrl: "/assets/imgs/chikencard2.png",
  },
  {
    path: "/my-page",
    title: "マイページ",
    description: "あなたのからあげを管理しよう",
    imageUrl: "/assets/imgs/chikencard3.png",
  },
  {
    path: "/eat-karaage",
    title: "カラアゲーム",
    description: "からあげで遊ぼう",
    imageUrl: "/assets/imgs/chikencard4.png",
  },
];

const MainMenu = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 gap-4 p-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.title}
            className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] overflow-hidden"
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
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MainMenu;
