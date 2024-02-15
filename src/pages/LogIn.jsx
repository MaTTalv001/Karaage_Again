import React from 'react';
import Header from '../components/Header';

const LogInPage = () => {
  return (
    <>
      <div className="w-full h-full relative font-[DotGothic16]">
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100%-40px)]">
          <div className="p-10 rounded-3xl text-center max-w-screen-lg mx-auto">
            <h1 className="text-4xl  mb-6">  　　　ログイン画面　　　  </h1>
            <form className="flex flex-col items-center gap-4 w-full px-1">
              <div className="flex w-full max-w-md items-center">
                <input type="email" id="email" placeholder="Email" className="w-full p-2 rounded" />
              </div>

              <div className="flex w-full max-w-md items-center">
                <input type="password" id="password" placeholder="password" className="w-full p-2 rounded" />
              </div>
              <div className="mt-4 bg-yellow-200 hover:bg-yellow-400 rounded-full">
                <button type="submit" className=" text-black font-bold py-2 px-4">
                  Let's Login!
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default LogInPage;