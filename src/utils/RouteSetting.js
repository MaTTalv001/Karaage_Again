import HomePage from "pages/HomePage";
import LogInPage from "pages/LogIn";
import SignUpPage from "pages/SignUp";
import UsersIndex from "pages/users/UsersIndex";
import { UserProfile } from "pages/users/UserProfile";
import MainPage from "pages/MainPage";
import MakeKaraage from "pages/MakeKaraage";
import RecipeIndex from "pages/recipes/RecipeIndex";
import RecipeShow from "pages/recipes/RecipeShow";
import EatKaraage from "pages/EatKaraage";
import PostKaraage from "pages/PostKaraage";
import ReviewIndex from "pages/reviews/ReviewIndex";
import ViewKaraage from "pages/ViewKaraage";
import MyPage from "pages/users/MyPage";

const Path = {
  home: "/",
  signup: "/signup",
  login: "/login",
  users: "/users",
  usersProfile: (id = ":id") => `/users/${id}`,
  mainpage: "/mainpage",
  makekaraage: "/makekaraage",
  recipeindex: "/recipeindex",
  recipeshow: "/karaages/:recipe_id",
  eatkaraage: "/eatkaraage",
  postkaraage: "/postkaraage",
  viewkaraage: "/viewkaraage",
  reviewindex: "/reviewindex",
  mypage: "/mypage",
};

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
    path: Path.users,
    component: <UsersIndex />,
  },
  {
    path: Path.usersProfile(),
    component: <UserProfile />,
  },
  {
    path: Path.mainpage,
    component: <MainPage />,
  },
  {
    path: Path.makekaraage,
    component: <MakeKaraage />,
  },
  {
    path: Path.recipeindex,
    component: <RecipeIndex />,
  },
  {
    path: Path.recipeshow,
    component: <RecipeShow />,
  },
  {
    path: Path.eatkaraage,
    component: <EatKaraage />,
  },
  {
    path: Path.postkaraage,
    component: <PostKaraage />,
  },
  {
    path: Path.viewkaraage,
    component: <ViewKaraage />,
  },
  {
    path: Path.reviewindex,
    component: <ReviewIndex />,
  },
  {
    path: Path.mypage,
    component: <MyPage />,
  },
];

export const RoutePath = {
  home: {
    path: Path.home,
    name: "KARAAGE AGAIN",
  },
  signup: {
    path: Path.signup,
    name: "ユーザー登録",
  },
  login: {
    path: Path.login,
    name: "ログイン",
  },
  users: {
    path: Path.users,
    name: "ユーザー一覧",
  },
  usersProfile: {
    path: (id) => Path.usersProfile(id),
    name: "ユーザー詳細",
  },
  mainpage: {
    path: Path.mainpage,
    name: "メインメニュー",
  },
  makekaraage: {
    path: Path.makekaraage,
    name: "からあげ登録",
  },
  recipeindex: {
    path: Path.recipeindex,
    name: "からあげ一覧",
  },
  karaageshow: {
    path: (id) => Path.recipeshow(id),
    name: "からあげ詳細",
  },
  eatkaraage: {
    path: Path.eatkaraage,
    name: "からあげ食レポ",
  },
  postkaraage: {
    path: Path.postkaraage,
    name: "からあげ投稿",
  },
  viewkaraage: {
    path: Path.viewkaraage,
    name: "からあげ閲覧",
  },
  viewkaraage: {
    path: Path.reviewindex,
    name: "からあげレビュー",
  },
  mypage: {
    path: Path.mypage,
    name: "からあげマイページ",
  },
};
