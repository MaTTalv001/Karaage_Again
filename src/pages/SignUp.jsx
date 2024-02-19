import React from "react";
import Header from "components/Header";
import { useState } from "react";
import supabase from "services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "utils/RouteSetting";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (signUpError) {
        throw signUpError;
      }
      // メール確認をスキップして、ユーザーが直接ログイン状態になる
    } catch (error) {
      alert("エラーが発生しました: " + error.message);
    }
    // そのままログインする
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data.user);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("ユーザー登録完了しました");
      setUser(data.user);
      navigate(RoutePath.stageSelect.path);
    }
  };

  return (
    <>
      <div className="w-full h-full relative font-[DotGothic16]">
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100%-40px)]">
          <div className="p-10 rounded-3xl text-center max-w-screen-lg mx-auto">
            <h1 className="text-4xl  mb-6">　新規ユーザー登録画面　</h1>
            <form
              className="flex flex-col items-center gap-4 w-full px-1"
              onSubmit={signUpSubmit}
            >
              <div className="flex w-full max-w-md items-center">
                {/* <input type="text" id="username" placeholder="Username" className="w-full p-2 rounded" /> */}
              </div>

              <div className="flex w-full max-w-md items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded"
                />
              </div>

              <div className="flex w-full max-w-md items-center">
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded"
                />
              </div>

              <div className="flex w-full max-w-md items-center">
                <input
                  type="password"
                  id="password-confirm"
                  placeholder="password確認"
                  required
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  className="w-full p-2 rounded"
                />
              </div>

              <div className="mt-4 bg-yellow-200 hover:bg-yellow-400 rounded-full">
                <button
                  type="submit"
                  className=" text-black font-bold py-2 px-4"
                >
                  Let's Sign Up!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
