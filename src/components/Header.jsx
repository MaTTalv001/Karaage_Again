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
  return (
    <div className="font-bold bg-gray-200 text-black p-2.5 flex justify-between">
      <div className="mx-5">
        <a href="/" className="text-black mr-5 font-[DotGothic16]">
          Home
        </a>
      </div>
      <div className="mx-5">
        <a href="/about" className="text-black mr-5 font-[DotGothic16]">
          About_Us...
        </a>
        {user ? (
          <button onClick={Logout} className="text-black font-[DotGothic16] mx-2">
            LogOut
          </button>
        ) : (
            <>
              <a href="/login" className="text-black font-[DotGothic16] mx-2">
                LogIn
              </a>
              <a href="/signup" className="text-black mx-2 font-[DotGothic16]">SignUp</a>
              <a href="/guest-login" className="text-black mx-2 font-[DotGothic16]">Guest_LogIn</a>
              
            </>
        )}

      </div>
    </div>
  );
};

export default Header;