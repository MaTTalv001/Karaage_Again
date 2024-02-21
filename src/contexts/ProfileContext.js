//Profileテーブルからname,roleを取得し、アプリ全体に共有するためのコンテキスト
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import supabase from "services/supabaseClient";

// プロファイル情報をアプリケーション全体で共有するためのコンテキストを作成
const ProfileContext = createContext();

// コンテキストを利用しやすくするためのカスタムフック
export const useProfile = () => useContext(ProfileContext);

// プロファイル情報を提供するコンテキストプロバイダーコンポーネント
export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  // ユーザー情報が変更された時（ログイン・ログアウト等）、プロファイル情報を取得またはリセット
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        // ユーザーがログインしている場合、Supabaseからプロファイル情報を取得
        const { data, error } = await supabase
          .from("profiles")
          .select("name, role")
          .eq("user_id", user.id)
          .single();
        if (error) {
          console.error("プロフィール情報の取得に失敗しました", error);
          return;
        }
        setProfile(data);
      } else {
        // ユーザーがログアウトしている場合、プロファイル情報をクリア
        setProfile(null);
      }
    };

    fetchProfile();
  }, [user]); // 依存配列にuserを指定して、userが変更されるたびにエフェクトを実行

  // コンテキストプロバイダーを使用してプロファイル情報を子コンポーネントに渡す
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
