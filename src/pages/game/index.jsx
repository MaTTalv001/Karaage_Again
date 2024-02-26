import React, { useState } from "react";
import { StageCard } from "components/StageCard";

const tabs = ['Default', 'User\'s', 'My idea'];

export const StageSelectPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const itemsPerPage = 4;

  // ここにステージのデータを追加していく
  // 画像データは320x242（適当）
  const stages = [
    { stageNumber: 1, imageUrl: '/image1.png' },
    { stageNumber: 2, imageUrl: '/image2.png' },
    { stageNumber: 3, imageUrl: '/image3.png' },
    { stageNumber: 4, imageUrl: '/image4.png' },
    { stageNumber: 5, imageUrl: '/image1.png' },
    { stageNumber: 6, imageUrl: '/image2.png' },
    { stageNumber: 7, imageUrl: '/image3.png' },
    { stageNumber: 8, imageUrl: '/image4.png' },
    { stageNumber: 9, imageUrl: '/image1.png' },
    { stageNumber: 10, imageUrl: '/image2.png' },
    { stageNumber: 11, imageUrl: '/image3.png' },
    { stageNumber: 12, imageUrl: '/image4.png' },
    { stageNumber: 13, imageUrl: '/image1.png' },
    { stageNumber: 14, imageUrl: '/image2.png' },
    { stageNumber: 15, imageUrl: '/image3.png' },
    { stageNumber: 16, imageUrl: '/image4.png' },
  ];

 // 現在のページに基づいてステージをスライスする
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stages.slice(indexOfFirstItem, indexOfLastItem);

  // ページを変更するハンドラー
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // タブに応じた背景色を返す関数
  const getTabButtonClass = (tabName) => {
    switch (tabName) {
      case 'Default':
        return "bg-teal-100";
      case 'User\'s':
        return "bg-yellow-300";
      case 'My idea':
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <>
    <div className={`${activeTab === 'Default' ? "bg-teal-100" : activeTab === "User's" ? "bg-yellow-300" : "bg-red-500"} p-4 h-[720px] w-[1280px] m-auto mt-36`}>
      {/* タブコントロール */}
      <div className="flex justify-between space-x-4 mb-4">
        <div className="flex space-x-4">
          {tabs.slice(0, -1).map(tab => ( // 最後のタブ以外を表示
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // タブを切り替えたら1ページ目にリセット
              }}
              className={`px-4 py-2 text-3xl font-semibold rounded-md transition-colors duration-300 ${activeTab === tab ? getTabButtonClass(tab) : 'bg-gray-200 text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 'My idea' タブボタンを右側に配置 */}
        {tabs.slice(-1).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1); // タブを切り替えたら1ページ目にリセット
            }}
            className={`px-4 py-2 text-3xl font-semibold rounded-md transition-colors duration-300 ${activeTab === tab ? getTabButtonClass(tab) : 'bg-gray-200 text-black'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="grid grid-cols-2 gap-4">
        {currentItems.map((stage) => (
          <StageCard
            key={`stage-${stage.stageNumber}`}
            stageNumber={stage.stageNumber}
            imageUrl={stage.imageUrl}
          />
        ))}
      </div>
    </div>

      {/* ページネーション */}
      {activeTab === 'Default' && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-black px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50"
          >
            前へ
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(stages.length / itemsPerPage)}
            className="bg-gray-200 text-black px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      )}
    </>
  );
};

export default StageSelectPage;