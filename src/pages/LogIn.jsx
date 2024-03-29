import React from "react";
import Header from "components/Header";
import { useState } from "react";
import supabase from "services/supabaseClient";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "utils/RouteSetting";

const LogInPage = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // supabaseを用いてメールアドレスとパスワードでサインイン
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      // ユーザー情報をコンテキストに設定
      console.log("success!!");
      alert("ログインしました");
      setUser(data.user);
      navigate(RoutePath.mainpage.path);
    }
  };
  return (
    <>
      <div className="w-full h-full relative">
        <div className="flex flex-col items-center justify-center h-[calc(100%-40px)]">
          <div className="p-10 rounded-3xl text-center max-w-screen-lg mx-auto">
            <h1 className="text-4xl  mb-6">からあげログイン</h1>
            <form
              className="flex flex-col items-center gap-4 w-full px-1"
              onSubmit={handleLogin}
            >
              <div className="flex w-full max-w-md items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-2 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full max-w-md items-center">
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="w-full p-2 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4 bg-white hover:bg-gray-200 rounded-lg">
                <button
                  className=" text-black font-bold py-2 px-4"
                  onClick={handleLogin}
                >
                  viva カラーゲ!!
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
