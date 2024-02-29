import { RoutePath } from "utils/RouteSetting";
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { HiMiniPlay } from 'react-icons/hi2';
import React, { useState } from 'react';


  const UserStageList = () => {
    const [stages, setStages] = useState([
      { id: 1, title: 'Stage 1', isOpen: false, imageSrc: "/NotSet.png" },
      { id: 2, title: 'Stage 2', isOpen: false, imageSrc: "/NotSet.png" },
      { id: 3, title: 'Stage 3', isOpen: false, imageSrc: "/NotSet.png" }
    ]);
    const handleToggleStage = (index) => {
      const updatedStages = [...stages];
      updatedStages[index].isOpen = !updatedStages[index].isOpen;
  
      if (updatedStages[index].isOpen) {
        // 制限を設ける
        updatedStages.forEach((stage, i) => {
          if (i !== index && stage.isOpen) {
            stage.isOpen = false;
          }
        });
      }
      setStages(updatedStages);
    };
    return (
      <ul>
      {stages.map((stage, index) => (
      <li className="flex my-7 items-center justify-center" key={stage.id}>
        <div className="bg-gray-300 flex">
        <div>
          <h1 className="font-bold text-2xl py-4 px-8 w-[200px] truncate">
            {stage.title}
          </h1>
          <div>
              <h1 className="font-bold text-2xl py-4 px-8">
                <span className="bg-blue-500 text-yellow-200 flex rounded-lg justify-center">
                <button onClick={() => handleToggleStage(index)}>
                  {stage.isOpen ? "Open Now" : "To Open"}
                </button>
                </span>
              </h1>
          </div>
        </div>
          <div className="flex-col">
            <div className="pt-4 px-8">
              <FiEdit2 size={40}/>
            </div>
            <div className="pt-4 px-8">
              <FiTrash2 size={40}/>
            </div>
          </div>
          <div >
            <h1 className="font-bold text-2xl py-12 px-8 text-yellow-200">
              <div className="bg-red-500 flex rounded-lg px-4 py-2">
                <HiMiniPlay />Test
              </div>
            </h1>
          </div>
          <div className="flex-col">
            <h1 className="font-bold text-2xl pt-9 px-8">
              <img src={stage.imageSrc} alt="NotSet" style={{ width: "150px", height: "auto" }} />
            </h1>
          </div>
        </div>
      </li>
      ))}
      </ul>
  );}

export const GameProduction = () => {
  
    return (
      <div className="w-full relative font-[DotGothic16] mt-14">
        <Link to={RoutePath.gameMake.path}>
          <h1 className="font-bold text-4xl flex mb-7">{RoutePath.gameMake.name}</h1>
        </Link>
        <div>
          <h1 className="font-bold text-4xl items-center justify-center flex">
            Edit
          </h1>
          <UserStageList />
        </div>
      </div>
  )
}
