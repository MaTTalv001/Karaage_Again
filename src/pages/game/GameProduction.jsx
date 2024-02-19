import React from 'react'
import { Link } from 'react-router-dom';


export const GameProduction = () => {
  return (
    <div className="w-full relative font-[DotGothic16] mt-14">
      <Link to="RoutePath.gameMake.path">
        <h1 className="font-bold text-4xl flex mb-7">Create</h1>
      </Link>
        <h1 className="font-bold text-4xl flex ">Edit</h1>
    </div>
  )
}