import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "../utils/RouteSetting";



const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoading, isGuest } = useAuth();

  useEffect(() => {
		// ユーザーが取得できなければログイン画面に飛ばします
    if (!user && !isLoading) {
      console.log("no_user")
      navigate('/');
    }
  }, [user, isLoading, navigate]);


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
            to={user || isGuest ? RoutePath.stageSelect.path : "#"}
            className="inline-block mt-0.5 text-5xl py-5 px-10 rounded-xl cursor-pointer font-dotgothic16 font-bold bg-transparent border-none no-underline text-inherit"
          >
            Game Start
          </Link>
          {!(user || isGuest) && (
        <div className="text-center mt-4 font-[DotGothic16]">
          Please logIn from the Header Menu.
        </div>
      )}
          
        </div>
      </div>
    </>
  );
}
export default HomePage;