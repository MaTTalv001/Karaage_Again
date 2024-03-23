import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "utils/RouteSetting";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="w-full h-full relative pt-10">
      <div
        id="Back-Object"
        className="w-screen h-screen absolute top-0 left-0 overflow-hidden"
      ></div>

      <div className="relative  flex flex-col items-center justify-center h-full pt-5 z-10">
        <p>いつでもあのからあげを</p>
        <h1 className="text-black text-xl font-bold py-2 px-4">
          からあげアゲイン
        </h1>
        <Link to={RoutePath.mainpage.path}>
          <div className="pt-1 pb-1 pl-15 pr-15 rounded-3xl  text-center text-shadow-black">
            <img
              src="/assets/imgs/karaage_image.png"
              alt="からあげアゲイン"
              className="mx-auto"
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </div>
        </Link>
      </div>
      
    </div>
  );
};
export default HomePage;
