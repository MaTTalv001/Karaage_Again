import React from 'react'

export const GamePlay = () => {
  return (
    <div className='h-screen flex flex-col justify-center'>
      <header className='flex justify-between items-center bg-slate-300 h-14'>
        <h1 className='ml-5'>Pythagora maker</h1>
        <nav className='mr-5'>
          <ul className='flex gap-4'>
            <li>Help</li>
            <li>Game</li>
            <li>Profile</li>
          </ul>
        </nav>
      </header>
      <div className='w-full h-[calc(100vh-3.5rem*2)] bg-green-200'>
        <div className='w-full h-full flex p-3 gap-3'>
          <div className='w-1/4 flex flex-col'>
            <h3 className='my-4'>配置オブジェクト</h3>
            <div className='h-full bg-slate-500'>
            </div>
          </div>
          <div className='w-3/4 flex flex-col'>
            <div className='flex justify-between items-center mx-5'>
              <button className='bg-slate-200 py-2 px-4 my-2'>Reset</button>
              <h3>ゲーム画面</h3>
              <button className='bg-red-200 py-2 px-4 my-2'>▶</button>
            </div>
            <div className='h-full bg-slate-500'>
            </div>
          </div>
        </div>
      </div>
      <footer className='h-14 flex justify-end items-center mr-3'>
        <ul className='flex gap-4'>
          <li>COPY RIGHT</li>
          <li>プライバシーポリシー</li>
          <li>規約</li>
        </ul>
      </footer>
    </div>
  )
}
