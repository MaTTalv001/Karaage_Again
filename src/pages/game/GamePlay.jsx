import React from 'react'
import { useParams } from 'react-router-dom';

export const GamePlay = () => {
  const { id } = useParams();
  return (
    <div className='h-[800px] w-[1200px] m-auto'>
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
