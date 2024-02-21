import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "utils/RouteSetting";
import supabase from "services/supabaseClient";
import { useProfile } from "contexts/ProfileContext";

const Header = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        throw logoutError;
      }
      alert("ログアウトしました");
      navigate(RoutePath.home.path);
    } catch {
      alert("ログアウト時にエラーが起きました");
    }
  };

  return (
    <div className="font-bold bg-gray-200 text-black p-2.5 flex justify-between">
      <div className="mx-5 flex items-center">
        <Link
          to={RoutePath.home.path}
          className="text-xl mr-5 text-yellow-300 text-black-outline font-[DotGothic16]"
        >
          {RoutePath.home.name}
        </Link>
        {profile?.role === "管理者" && (
          <span className="bg-green-300  px-2 mr-5 font-bold rounded-md">
            Admin
          </span>
        )}
      </div>
      <div className="mx-5">
        <Link to="#" className="text-black mr-2 font-[DotGothic16]">
          About Us...
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="text-black font-[DotGothic16] mx-2"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to={RoutePath.login.path}
              className="text-black font-[DotGothic16] mx-2"
            >
              {RoutePath.login.name}
            </Link>
            <Link
              to={RoutePath.signup.path}
              className="text-black mx-2 font-[DotGothic16]"
            >
              {RoutePath.signup.name}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
