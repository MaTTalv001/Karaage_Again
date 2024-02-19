import React from 'react'
import { Link } from 'react-router-dom';


export const GameStageCreate = () => {
  return (
    <div className="max-w-screen-xl max-h-screen-lg relative font-[DotGothic16] mt-14">
      <Link to="/game/new">
        <h1 className="font-bold text-4xl flex ">Create</h1>
      </Link>
      <Link to="/game/edit">
        <h1 className="font-bold text-4xl flex ">Edit</h1>
      </Link>
    </div>
  )
}