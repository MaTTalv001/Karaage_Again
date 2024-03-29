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
    <div className="font-bold bg-gray-200 text-black p-5 flex justify-between">
      <div className="mx-5 flex items-center">
        <Link
          to={RoutePath.home.path}
          className="text-xl mr-5 text-white text-black-outline"
        >
          {RoutePath.home.name}
        </Link>
        {profile?.role === "admin" && (
          <span className="bg-green-300  px-2 mr-5 font-bold rounded-md">
            Admin
          </span>
        )}
      </div>
      <div className="mx-5">
        <Link to={RoutePath.privacypolicy.path} className="text-black mx-2">
          {RoutePath.privacypolicy.name}
        </Link>
        <Link to={RoutePath.termsofuse.path} className="text-black mx-2">
          {RoutePath.termsofuse.name}
        </Link>
        {user ? (
          <button onClick={logout} className="text-black mx-2">
            Logout
          </button>
        ) : (
          <>
            <Link to={RoutePath.login.path} className="text-black mx-2">
              {RoutePath.login.name}
            </Link>
            <Link to={RoutePath.signup.path} className="text-black mx-2 ">
              {RoutePath.signup.name}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
