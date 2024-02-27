import React, { useState } from "react";
import { DefaultStageCard } from "components/DefaultStageCard";
import { UsersStageCard } from "components/UsersStageCard";
import { MyIdeaStageCard } from "components/MyIdeaStageCard";

const tabs = ['Default', 'User\'s', 'My idea'];

const tabButtonClasses = {
  'Default': "bg-teal-100",
  'User\'s': "bg-yellow-300",
  'My idea': "bg-red-500"
};

export const StageSelectPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // タブに応じて背景色を設定
  const getTabButtonClass = (tabName) => tabButtonClasses[tabName] || "bg-gray-200";

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // それぞれのタブのコンポーネントをレンダリングする
  const renderStageCards = () => {
    switch (activeTab) {
      case 'User\'s':
        return <UsersStageCard />;
      case 'My idea':
        return <MyIdeaStageCard />;
      default:
        return <DefaultStageCard />;
    }
  };

  return (
      <div className={`${getTabButtonClass(activeTab)} p-4 h-[720px] w-[1280px] m-auto mt-36`}>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            {/* ↓ My idea以外のタブボタンをdiv内に表示する */}
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

          {/* My ideaボタン */}
          <button
            onClick={() => handleTabClick('My idea')}
            className={`px-4 py-2 text-3xl font-semibold rounded-md transition-colors duration-300 ${activeTab === 'My idea' ? getTabButtonClass('My idea') : 'bg-gray-200 text-black'}`}
          >
            My idea
          </button>
        </div>

        <div>
          {renderStageCards()}
        </div>
      </div>
  );
};

export default StageSelectPage;