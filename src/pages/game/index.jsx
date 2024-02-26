import React, { useState, useMemo } from "react";
import { DefaultStageCard } from "components/DefaultStageCard";
import { UsersStageCard } from "components/UsersStageCard";
import { MyIdeaStageCard } from "components/MyIdeaStageCard";

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

 // 現在のページに表示するアイテムを計算
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return stages.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, stages]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getTabButtonClass = (tabName) => ({
    'Default': "bg-teal-100",
    'User\'s': "bg-yellow-300",
    'My idea': "bg-red-500"
  }[tabName] || "bg-gray-200");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Default、User'sのタブボタン */}
     <div className={`${getTabButtonClass(activeTab)} p-4 h-[720px] w-[1280px] m-auto mt-36`}>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            {tabs.slice(0, -1).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 text-3xl font-semibold rounded-md transition-colors duration-300 ${activeTab === tab ? getTabButtonClass(tab) : 'bg-gray-200 text-black'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* My ideaのタブボタンを右端に設置 */}
          <button
            onClick={() => handleTabClick('My idea')}
            className={`px-4 py-2 text-3xl font-semibold rounded-md transition-colors duration-300 ${activeTab === 'My idea' ? getTabButtonClass('My idea') : 'bg-gray-200 text-black'}`}
          >
            My idea
          </button>
        </div>

        {/* 各ステージ情報を表示 */}
        <div className="grid grid-cols-2 gap-4">
          {currentItems.map((stage) => (
            <DefaultStageCard key={`stage-${stage.stageNumber}`} {...stage} />
          ))}
        </div>
      </div>

      {/* ページネーション */}
      {activeTab === 'Default' && (
        <div className="flex justify-center mt-8">
          <button onClick={() => paginate(Math.max(1, currentPage - 1))} className="bg-gray-200 text-black px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50" disabled={currentPage === 1}>
            前へ
          </button>
          <button onClick={() => paginate(currentPage + 1)} className="bg-gray-200 text-black px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50" disabled={currentPage >= Math.ceil(stages.length / itemsPerPage)}>
            次へ
          </button>
        </div>
      )}
    </>
  );
};

export default StageSelectPage;