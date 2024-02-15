import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full relative">
        {/* 全画面で表示するものなので、App.jsで読み込むようにさせていただきました。<Header /> */}
        <div className="font-[DotGothic16] flex flex-col items-center justify-center h-[calc(100%-40px)]">
          <div className="pt-5 pb-5 pl-15 pr-15 rounded-3xl border-4 border-black text-center font-dotgothic16 text-shadow-black ">
            <h1 className="text-8xl my-3 mx-10 text-yellow-300">Pythagora</h1>
            <h1 className="text-8xl my-3 mx-10 text-yellow-300">maker</h1>
          </div>
          <Link
            to="#" //{RoutePath.stageselect.path}
            className="inline-block mt-0.5 text-5xl py-5 px-10 rounded-xl cursor-pointer font-dotgothic16 font-bold bg-transparent border-none no-underline text-inherit"
          >
            Game Start
          </Link>
          {/* Footerコンポーネントへ移動させていただきました。 */}
          {/* <footer className="flex justify-between items-center p-2.5 absolute bottom-2 right-0 left-0">
            <div className="flex ml-10">
              <div className="mx-1">COPY RIGHT</div>
              <div className="mx-1">プラバシーポリシー</div>
              <div className="mx-1">利用規約</div>
            </div>
            <p className="text-base text-black mb-2 mx-4">
              ※本ゲームはPC専用となっております。
            </p>
          </footer> */}
        </div>
      </div>
    </>
  );
}
export default HomePage;