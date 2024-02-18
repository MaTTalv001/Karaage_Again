import { useContext, useEffect, useState, createContext } from 'react';

// 作成したsupabaseクライアントを使用
import supabase from 'services/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	// ユーザーの情報
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  /*
		セッションの読み込みは非同期で行われるため、
		ログイン判定時にユーザーが読み込めていないケースが発生します。
		それを回避するための読み込み中か否かを判定するのが以下のステートです。
	*/
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

			// supabaseの認証機能からセッションを取得
      const { data: session } = await supabase.auth.getSession();

			// セッションが存在すればユーザーを設定
      setUser(session?.session?.user || null);


      setIsLoading(false);
    };

    fetchSession();

		// ログイン状態を監視するリスナー
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
			// アンマウント時にリスナーを解放
      authListener.subscription.unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading , isGuest, setIsGuest}}>
      {children}
    </AuthContext.Provider>
  );
};

// コンテキストアクセス用カスタムフック
export const useAuth = () => useContext(AuthContext);