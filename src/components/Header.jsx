import React from 'react';
import { RoutePath } from "../utils/RouteSetting";
import { Link } from "react-router-dom";
import supabase from 'services/supabaseClient';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout,  isGuest, setIsGuest } = useAuth();
  const navigate = useNavigate();
  const Logout = async(e) => {
    e.preventDefault();
    try{
      const { error:logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError;
      }
      setIsGuest(false); // ゲストログイン状態を解除
      alert('ログアウトしました');
      await navigate('/');
    }catch{
      alert('エラーが発生しました');
    }
  }

  //ゲストログイン
  const handleGuestLogin = (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ
    setIsGuest(true); // ゲストログインの状態をセット
    // ゲストログインの処理をここに記述
    alert('ゲストログインします');
  };

  return (
    <div className="font-bold bg-gray-200 text-black p-2.5 flex justify-between">
      <div className="mx-5">
        <Link to={RoutePath.home.path} className="text-xl mr-5  text-yellow-300 text-black-outline font-[DotGothic16]">
          {RoutePath.home.name}
        </Link>
      </div>
      <div className="mx-5">
        {user && (
        <span className="font-[DotGothic16] inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">User</span>
      )}
        {isGuest && (
        <span className="font-[DotGothic16] inline-block bg-green-300 rounded-full px-5 py-1 text-sm font-semibold text-black mr-2 mb-2">Guest</span>
      )}
        <Link to="#" className="text-black mr-2 font-[DotGothic16]">
          About_Us...
        </Link>
        {user || isGuest ? (
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