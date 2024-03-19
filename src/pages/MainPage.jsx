import React, { useState, useEffect } from "react";
import { useProfile } from "contexts/ProfileContext";
import supabase from "services/supabaseClient";

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
    path: "/karaagame",
    title: "カラアゲーム",
    description: "からあげで遊ぼう",
    imageUrl: "/assets/imgs/chikencard4.png",
  },
];

const MainMenu = () => {
  const { profile } = useProfile();
  const [statement, setStatement] = useState([]);
  useEffect(() => {
    const fetchRandomStatement = async () => {
      const randomId = Math.floor(Math.random() * 50) + 1;
      const { data, error } = await supabase
        .from("statements")
        .select("id, statement_ja, statement_en")
        .eq("id", randomId)
        .single();
      if (error) {
        console.error("Error fetching statements:", error);
      } else {
        setStatement(data);
      }
    };

    fetchRandomStatement();
  }, []);
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-20 px-4 md:px-20">
        <h3 className="text-lg font-bold text-gray-800">
          今日のからあげメッセージ
        </h3>

        <p className="pt-2 flex items-center">
          <em>{statement.statement_en}</em>
          <button
            onClick={() => speak(statement.statement_en)}
            className="ml-2 bg-transparent border-0 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-headphones"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
            </svg>
          </button>
        </p>
      </div>
      <p className="text-center pt-2">{statement.statement_ja}</p>

      <div className="flex items-center justify-center ">
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
    </>
  );
};
export default MainMenu;
