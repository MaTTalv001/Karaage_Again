import HomePage from "pages/HomePage";
import LogInPage from "pages/LogIn";
import SignUpPage from "pages/SignUp";
import { StageSelectPage } from "pages/game";
import UsersIndex from "pages/users/UsersIndex";
import { GameProduction } from "pages/game/GameProduction";
import { GameMake } from "pages/game/GameMake";
import { GameEdit } from "pages/game/GameEdit";
import { GamePlay } from "pages/game/GamePlay";
import { UserProfile } from "pages/users/UserProfile";

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
  signup: "/signup",
  login: "/login",
  users: "/users",
  usersProfile: (id = ':id') => `/users/${id}`,
  stageSelect: "/game",
  gamePlay: (id = ':id') => `/game/${id}`,
  gameEdit: (id = ':id') => `/game/${id}/edit`,
  gameProduction: "/game/new",  // TODO : 本来はユーザーidが必要。暫定処理
  gameMake: "/game/make",
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
  // ユーザー周り
  {
    path: Path.users,
    component: <UsersIndex />,
  },
  {
    path: Path.usersProfile(),
    component: <UserProfile />,
  },
  // ゲーム周り
  {
    path: Path.stageSelect,
    component: <StageSelectPage />,
  },
  {
    path: Path.gamePlay(),
    component: <GamePlay />,
  },
  {
    path: Path.gameEdit(),
    component: <GameEdit />,
  },
  {
    path: Path.gameProduction,
    component: <GameProduction />,
  },
  {
    path: Path.gameMake,
    component: <GameMake />,
  },
];

// 各ページのパスと名前を定義
// 各ページで呼び出すときに使用する
export const RoutePath = {
  home: {
    path: Path.home,
    name: "Pythagora maker",
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
    path: (id) => Path.usersProfile(id),
    name: "ユーザー詳細",
  },
  // ゲーム周り
  stageSelect: {
    path: Path.stageSelect,
    name: "ステージ選択",
  },
  gamePlay: {
    path: Path.gamePlay(),
    name: "ゲーム画面",
  },
  gameEdit: {
    path: (id) => Path.gameEdit(id),
    name: "ゲーム編集",
  },
  gameProduction: {
    path: Path.gameProduction,
    name: "ゲーム制作画面",
  },
  gameMake: {
    path: Path.gameMake,
    name: "ゲーム新規作成",
  }
};