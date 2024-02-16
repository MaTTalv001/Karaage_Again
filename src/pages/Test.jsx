import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // React Router v5
import supabase from 'services/supabaseClient'; // supabaseの設定をインポート

export default function Test() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        throw signInError;
      }
      history.push("/"); // ページ遷移
    } catch {
      alert('エラーが発生しました');
    }
  };

  return (
    <div className="container mt-14">
      <head>
        <title>ログイン画面</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className="main">
        <div className="grid">
          <form onSubmit={onLogin}>
            <div>
              <label>メールアドレス</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード（確認）</label>
              <input
                type="password"
                required
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">ログイン</button><br />
              
            </div>
          </form>
        </div>
      </main>
</div>
  );
}
