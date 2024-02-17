import React from 'react';
import { RoutePath } from "../utils/RouteSetting";
import { Link } from "react-router-dom";
import supabase from 'services/supabaseClient';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const Logout = async(e) => {
    e.preventDefault();
    try{
      const { error:logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError;
      }
      alert('ログアウトしました');
      await navigate('/');
    }catch{
      alert('エラーが発生しました');
    }
  }

  //ゲストログイン
  const handleGuestLogin = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ
    // ゲストログインの処理をここに記述
    alert('ゲストログインの処理が作動します');
  };

  return (
    <div className="font-bold bg-gray-200 text-black p-2.5 flex justify-between">
      <div className="mx-5">
        <Link to={RoutePath.home.path} className="text-black mr-5 font-[DotGothic16]">
          {RoutePath.home.name}
        </Link>
      </div>
      <div className="mx-5">
        <Link to="#" className="text-black mr-5 font-[DotGothic16]">
          About_Us...
        </Link>
        {user ? (
          <button onClick={Logout} className="text-black font-[DotGothic16] mx-2">
            LogOut
          </button>
        ) : (
            <>
              <Link to={RoutePath.login.path} className="text-black font-[DotGothic16] mx-2">
                {RoutePath.login.name}
              </Link>
              <Link to={RoutePath.signup.path} className="text-black mx-2 font-[DotGothic16]">
                {RoutePath.signup.name}
              </Link>
              <Link to="#" className="text-black mx-2 font-[DotGothic16]" onClick={handleGuestLogin}>
                ゲストログイン
              </Link>
            </>
              )}
      </div>
    </div>
  );
};

export default Header;