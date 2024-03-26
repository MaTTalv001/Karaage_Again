import React, { useState, useEffect } from "react";
import supabase from "services/supabaseClient";
import { Link } from "react-router-dom";
import { useProfile } from "contexts/ProfileContext";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { formatISO } from "date-fns";
import HandleDelete from "components/DeleteRecipe";
import HandleDeleteReview from "components/DeleteReview";

const MyPage = () => {
  const [reviews, setReviews] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [totalEaten, setTotalEaten] = useState(0);
  const { profile } = useProfile();
  const [eatAt, setEatAt] = useState(null);
  const [amount, setAmount] = useState("");
  const [eatTimes, setEatTimes] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!profile) {
        // profileがnullまたはundefinedの場合は早期リターン
        console.log("Profile is not loaded yet.");
        return;
      }
      // profileテーブルからnameを取得する
      const { data, error } = await supabase
        .from("reports")
        .select("*, profile:profile_id(name)")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, [profile]);

  useEffect(() => {
    const fetchEatLogs = async () => {
      if (!profile) {
        console.log("Profile is not loaded yet.");
        return;
      }
      const { data, error } = await supabase
        .from("eatlogs")
        .select("amount")
        .eq("profile_id", profile.id);

      if (error) {
        console.error("Error fetching eat logs:", error);
      } else {
        // 個数
        const eatenSum = data.reduce((sum, log) => sum + log.amount, 0);
        setTotalEaten(eatenSum);
        // 食べた回数
        setEatTimes(data.length);
      }
    };

    fetchEatLogs();
  }, [profile]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!profile) {
        // profileがnullまたはundefinedの場合は早期リターン
        console.log("Profile is not loaded yet.");
        return;
      }
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, [profile]);

  const renderRating = (rating) => {
    return [...Array(5)].map((star, index) => {
      index += 1;
      return (
        <span key={index} className="text-red-400">
          {index <= rating ? "★" : "☆"}
        </span>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      alert("プロフィールがロードされていません。");
      return;
    }

    const amountNumber = parseInt(amount, 10);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("からあげは常にプラス");
      return;
    }

    const eatAtUTC = eatAt
      ? formatISO(eatAt, { representation: "complete" })
      : null;

    const { error } = await supabase.from("eatlogs").insert([
      {
        profile_id: profile.id,
        eat_at: eatAtUTC,
        amount: parseInt(amount, 10) || 0,
      },
    ]);

    if (error) {
      alert(`エラーが発生しました: ${error.message}`);
    } else {
      alert("唐揚げの食事ログを記録しました！");
      setEatAt(null);
      setAmount("");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-screen m-24">
      <h1 className="text-xl font-bold pt-5">からあげマイページ</h1>
      <div className="flex flex-col items-stretch sm:flex-row justify-center items-start gap-4 mb-4 p-5">
        <div
          className="bg-white shadow-sm rounded-lg p-5 flex-none"
          style={{ flex: 3 }}
        >
          <p className="text-lg font-bold">からあげ実食数: {totalEaten}個</p>
          <p className="text-lg  pt-5">トータル回数: {eatTimes}回</p>
          <p className="text-lg  pt-5">
            トータル重量: {(totalEaten * 30) / 1000}kg
          </p>
          <p className="text-lg  pt-5">
            トータル距離: {(totalEaten * 5) / 100}m
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-5 flex-grow">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            style={{ flex: 1 }}
          >
            <DatePicker
              label="Karaage Date"
              value={eatAt}
              onChange={(newValue) => {
                setEatAt(newValue);
              }}
              slotProps={{ textField: { variant: "outlined" } }}
            />

            <TextField
              label="食べた量（個）"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="1"
            />
            <Button variant="contained" type="submit">
              記録する
            </Button>
          </form>
        </div>
      </div>
      <h1 className="text-xl font-bold pt-5">からあげマイレシピ</h1>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          >
            <Link to={`/karaages/${recipe.recipe_id}`}>
              <img
                className="w-full h-48 object-cover rounded-t-xl"
                src={recipe.photo_URL}
                alt="Recipe"
              />
            </Link>
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {recipe.title}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                自己評価: {renderRating(recipe.self_rating)}
              </p>
              <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                Posted {new Date(recipe.created_at).toLocaleDateString()}
              </p>
              {profile && profile.id === recipe.profile_id && (
                <>
                  <HandleDelete
                    recipeId={recipe.recipe_id}
                    recipes={recipes}
                    setRecipes={setRecipes}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <h1 className="pt-5 text-xl font-bold">からあげマイレビュー</h1>
      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          >
            <img
              className="w-full h-48 object-cover rounded-t-xl"
              src={review.photo_URL || "/assets/imgs/no_photo.png"}
              alt="Recipe"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {review.title}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                評価: {renderRating(review.rating)}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                投稿者: {review.profile.name}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                場所: {review.place}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {review.review}
              </p>
              {profile && profile.id === review.profile_id && (
                <>
                  <HandleDeleteReview
                    reviewId={review.id}
                    reviews={reviews}
                    setReviews={setReviews}
                  />
                </>
              )}
              <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                Posted {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
