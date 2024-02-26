import React from "react";

export const StageCard = ({ stageNumber, imageUrl }) => {
  return (
    <div className="relative m-2 p-6 border border-gray-300 shadow-lg rounded-md bg-white">
      <div className="flex">
        <div className="flex-grow"></div>
          <img src={imageUrl} alt={`Stage ${stageNumber}`} />
        </div>
        <p className="absolute top-16 left-4 text-6xl font-bold">Stage{stageNumber}</p>
        <button className="absolute bottom-14 left-16 bg-red-500 text-yellow-300 px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring text-4xl">
          ▶ Play
        </button>
    </div>
  );
};
