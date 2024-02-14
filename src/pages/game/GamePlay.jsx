import React from 'react'

export const GamePlay = () => {
  return (
    <div className='h-screen flex flex-col justify-center m-auto bg-green-200'>
      {/* TODO : headerはここでは書かない */}
      <header className='flex justify-between items-center bg-slate-200 h-14'>
        <h1 className='ml-5'>Pythagora maker</h1>
        <nav className='mr-5'>
          <ul className='flex gap-4'>
            <li>Help</li>
            <li>Game</li>
            <li>Profile</li>
          </ul>
        </nav>
      </header>
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
      {/* TODO : footerはここでは書かない */}
      <footer className='flex justify-end items-center mb-2 mr-10'>
        <ul className='flex gap-4'>
          <li>COPY RIGHT</li>
          <li>プライバシーポリシー</li>
          <li>規約</li>
        </ul>
      </footer>
    </div>
  )
}
