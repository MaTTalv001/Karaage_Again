import HomePage from "pages/HomePage";
import LogInPage from "pages/LogIn";
import SignUpPage from "pages/SignUp";
import { StageSelectPage } from "pages/game";
import UsersIndex from "pages/users/UsersIndex";
import { GameCreate } from "pages/game/GameCreate";
import { GameEdit } from "pages/game/GameEdit";
import { GamePlay } from "pages/game/GamePlay";
import { UserProfile } from "pages/users/UserProfile";
import  Header  from "components/Header";

// NOTE : 暫定処理なので必要に応じて修正してくださいっ

// ルートパス設定
/**
 * NOTE :
 * ルーティング設定用と各ページで呼び出す用の２種類設定している状態です。
 * この設定は暫定的なもので、必要に応じて修正してください。
 * タイポや設定漏れを防ぐために、パスの文字列設定はここだけでいいようにしています。
 * ルーティング設定と呼び出し用の設定にパスを設定する箇所があるので
 * こちらに設定したものを使うようにするといいかなと考えました。
 */
const Path = {
  home: "/",
  header: "/header",
  signup: "/signup",
  login: "/login",
  users: "/users",
  usersProfile: "/users/:id",
  stageSelect: "/game",
  gamePlay: "/game/:id",
  gameEdit: "/game/:id/edit",
  gameNew: "/game/new",
};

// NOTE : ルーティング設定用
// RoutesComponentでのみ使用状態
export const RouteSetting = [
  {
    path: Path.home,
    component: <HomePage />,
  },
  {
    path: Path.signup,
    component: <SignUpPage />,
  },
  {
    path: Path.login,
    component: <LogInPage />,
  },
  {
    path: Path.header,
    component: <Header />,
  },
  // ユーザー周り
  {
    path: Path.users,
    component: <UsersIndex />,
  },
  {
    path: Path.usersProfile,
    component: <UserProfile />,
  },
  // ゲーム周り
  {
    path: Path.stageSelect,
    component: <StageSelectPage />,
  },
  {
    path: Path.gamePlay,
    component: <GamePlay />,
  },
  {
    path: Path.gameEdit,
    component: <GameEdit />,
  },
  {
    path: Path.gameNew,
    component: <GameCreate />,
  },
];

// 各ページのパスと名前を定義
// 各ページで呼び出すときに使用する
export const RoutePath = {
  home: {
    path: Path.home,
    name: "ホーム",
  },
  header: {
    path: Path.header,
    name: "ヘッダ",
  },
  signup: {
    path: Path.signup,
    name: "ユーザー登録",
  },
  login: {
    path: Path.login,
    name: "ログイン",
  },
  // ユーザー周り
  users: {
    path: Path.users,
    name: "ユーザー一覧",
  },
  usersProfile: {
    path: Path.usersProfile,
    name: "ユーザー詳細",
  },
  // ゲーム周り
  stageSelect: {
    path: Path.stageSelect,
    name: "ステージ選択",
  },
  gamePlay: {
    path: Path.gamePlay,
    name: "ゲーム画面",
  },
  gameEdit: {
    path: Path.gameEdit,
    name: "ゲーム編集",
  },
  gameNew: {
    path: Path.gameNew,
    name: "ゲーム新規作成",
  }
};