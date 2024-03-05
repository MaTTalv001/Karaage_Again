import React, { useState } from "react";
import { STAGE_PER_PAGE } from "utils/Paginate";
import { Link } from 'react-router-dom';
import { RoutePath } from 'utils/RouteSetting';

  // ここにステージのデータを追加していく
  // 画像データは320x242（適当に選択）
  const stages = [
    { id: 1, stageNumber: 1, imageUrl: '/image1.png' },
    { id: 2, stageNumber: 2, imageUrl: '/image2.png' },
    { id: 3, stageNumber: 3, imageUrl: '/image3.png' },
    { id: 4, stageNumber: 4, imageUrl: '/image4.png' }
  ];

export const MyIdeaStageCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 現在のページに表示するアイテム(ステージ)を計算
  const currentStages = (() => {
    const startIndex = (currentPage - 1) * STAGE_PER_PAGE;
    const endIndex = startIndex + STAGE_PER_PAGE;
    return stages.slice(startIndex, endIndex);
  })();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* 1つのステージを表示する要素 */}
      <div className="grid grid-cols-2 gap-4">
        {currentStages.map(({ id, stageNumber, imageUrl }) => (
          <div key={id} className="relative m-2 p-6 border border-gray-300 shadow-lg rounded-md bg-white">
            <div className="flex">
              {/* ↓　【fix】このタグ調査、修正する。 */}
              <div className="flex-grow"></div>
            <img src={imageUrl} alt={`Stage ${stageNumber}`} />
            </div>
            <p className="absolute top-16 left-4 text-6xl font-bold">Stage{stageNumber}</p>
            <Link
              to={RoutePath.gamePlay.path(id)} className="absolute bottom-14 left-16 bg-red-500 text-yellow-300 px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring text-4xl"
              >
              ▶ Play
            </Link>
          </div>
        ))}
      </div>

      {/* ページネーションのボタン部分 */}
      <div className="flex justify-center mt-8">
        <button onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
        className="bg-gray-300 text-black px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50">前のページへ</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(stages.length / STAGE_PER_PAGE)}
        className="bg-gray-300 text-black px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50">次のページへ</button>
      </div>
    </div>
  );
};
