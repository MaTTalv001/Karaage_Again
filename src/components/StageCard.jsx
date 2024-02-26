import React from "react";

export const StageCard = ({ stageNumber, imageUrl }) => {
  return (
    <div className="relative m-2 p-2 border border-gray-300 shadow-lg rounded-md bg-white">
      <div className="flex">
        <div className="flex-grow"></div>
        {/* ↓ここに各ステージのjsxを表示できるようにしたい */}
          <img src={imageUrl} alt={`Stage ${stageNumber}`} />
        </div>
        <button className="absolute bottom-16  left-8 bg-red-500 text-yellow-300 px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring text-4xl">
          ▶ Play
        </button>
      <p className="mt-8 text-6xl font-bold">Stage{stageNumber}</p>
    </div>
  );
};
