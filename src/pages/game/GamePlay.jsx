import React, { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export const GamePlay = () => {
  const { id } = useParams();
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  let stageData = useRef(null);
  let switchObject = useRef(null);
  let userPlacement = useRef(null);
  let selectObject = useRef(null);
  const navigator = useNavigate();


  return (
    <div className='h-[800px] w-[1200px] m-auto mt-14'>
      <div className='w-full h-full flex gap-3'>
        <div className='w-1/4 flex flex-col'>
          <h3 className='my-4'>配置オブジェクト</h3>
          <div className='h-full bg-white border-solid border-slate-400 hover:border-slate-950 transition-all border-2'>
          </div>
        </div>
        <div className='w-3/4 flex flex-col'>
          <div className='flex justify-between items-center mx-5'>
            <button className='bg-blue-200 hover:bg-blue-400 text-slate-500 hover:text-slate-950 transition-all py-2 px-4 my-2'>Reset</button>
            <h3>ゲーム画面</h3>
            <button className='text-slate-500 hover:text-slate-950 bg-red-200 hover:bg-red-400 transition-all py-2 px-4 my-2'>▶</button>
          </div>
          <div className='h-full bg-white border-solid border-slate-400 hover:border-slate-950 transition-all border-2'>
          </div>
        </div>
      </div>
    </div>
  )
}

// 確認用データ
const Data = {
  "name": "Sample1",
  "version": "1.0.0",
  "description": "ボール出現サンプル",
  "Stage": [
    {
      "bodiesType": "Rectangle",
      "x": 500,
      "y": 685,
      "width": 1000,
      "height": 30,
      "option": {
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "stage"
      }
    },
    {
      "bodiesType": "Rectangle",
      "x": 500,
      "y": 200,
      "width": 500,
      "height": 30,
      "option": {
        "angle": -0.2,
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "stage"
      }
    }
  ],
  "Switch": {
    "bodiesType": "Rectangle",
    "x": 600,
    "y": 550,
    "width": 100,
    "height": 50,
    "option": {
      "isStatic": true,
      "collisionFilter": {
        "group": -1
      },
      "label": "switch"
    }
  },
  "UserPlacement": [
    {
      "bodiesType": "Rectangle",
      "x": 300,
      "y": 400,
      "width": 500,
      "height": 30,
      "option": {
        "angle": 0.2,
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "userStatic"
      }
    }
  ],
  "Ball": {
    "bodiesType": "Circle",
    "x": 600,
    "y": 100,
    "radius": 30,
    "option": {
      "label": "ball"
    }
  }
}
