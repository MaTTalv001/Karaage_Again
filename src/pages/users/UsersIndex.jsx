import React, { useEffect, useState } from "react";
import supabase from "services/supabaseClient";
import { useAuth } from "contexts/AuthContext";
import { useProfile } from "contexts/ProfileContext";
import Loading from "components/Loading";

const UsersIndex = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // プロファイルのroleが管理者でなければデータ取得をスキップ
    if (profile?.role !== "管理者") {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }

        setUsers(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [profile]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // プロファイルのroleが管理者でない場合の処理
  if (profile?.role !== "管理者") {
    return (
      <p className="text-center mt-14">
        権限がありません
        <Loading />
      </p>
    );
  }

  // ユーザーデータが見つからない場合の処理
  if (!users.length) {
    return <p>No users found.</p>;
  }

  // 管理者の場合、ユーザーリストを表示
  return (
    <div className="bg-yellow-100 w-screen min-h-screen relative mt-11">
      <h1 className="text-center text-4xl pt-5">ユーザー一覧</h1>

      <table className="mx-auto my-5 bg-white border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="py-1 px-5 bg-green-300 border border-slate-600">
              ID
            </th>
            <th className="py-1 px-5 bg-green-300 border border-slate-600">
              Username
            </th>
            <th className="py-1 px-5 bg-green-300 border border-slate-600">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-1 px-5 text-center border border-slate-700">
                {user.id}
              </td>
              <td className="py-1 px-5 text-center border border-slate-700">
                {user.name}
              </td>
              <td className="py-1 px-5 text-center border border-slate-700">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Loading />
    </div>
  );
};

export default UsersIndex;
