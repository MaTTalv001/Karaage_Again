import React from 'react'
import { RoutePath } from "utils/RouteSetting";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons'
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiPlay } from "react-icons/fi";



export const GameProduction = () => {
  return (
    <div className="w-full relative font-[DotGothic16] mt-14">
      <Link to={RoutePath.gameMake.path}>
        <h1 className="font-bold text-4xl flex mb-7">{RoutePath.gameMake.name}</h1>
      </Link>
      <div>
        <h1 className="font-bold text-4xl items-center justify-center flex">Edit</h1>
        <ul className="flex-col">
          <li className="flex my-14 items-center justify-center">
            <div className="bg-gray-300 flex">
              <div className="flex-col">
                <h1 className="font-bold text-2xl py-4 px-8">Title:aaaaa</h1>   {/* textは関数化する*/} 
                <h1 className="font-bold text-2xl py-4 px-8">Open Now</h1> {/*textはstateで関数化する*/} 
              </div>
              <div className="flex-col">
                  <div className="pt-4 px-8">
                    <FiEdit2 size={40}/>
                  </div>
                  <div className="pt-4 px-8">
                    <FiTrash2 size={40}/>
                  </div>            
              </div>
              <div className="flex-col">
                <h1 className="font-bold text-2xl py-12 px-8 bg-red-400"><FiPlay />Test</h1>   {/* textは関数化する*/} 
              </div>
              <div className="flex-col">
                <h1 className="font-bold text-2xl py-12 px-8">画像</h1>   {/* textは関数化する*/}               
              </div>
            </div>
          </li>
          <li className="flex my-7 items-center justify-center">

          </li>
          <li className="flex my-7 items-center justify-center">

          </li>
        </ul>
      </div>
    </div>
  )
}
