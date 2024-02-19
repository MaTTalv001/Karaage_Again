import React from 'react'
import { Link } from 'react-router-dom';


export const GameCreate = () => {
  return (
    <div className="max-w-screen-xl max-h-screen-lg relative font-[DotGothic16] mt-14">
      <Link to="/game/make">
        <h1 className="font-bold text-4xl flex mb-7">Create</h1>
      </Link>
        <h1 className="font-bold text-4xl flex ">Edit</h1>
    </div>
  )
}