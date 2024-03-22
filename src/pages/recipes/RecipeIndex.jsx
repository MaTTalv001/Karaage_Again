import React, { useState, useEffect } from "react";
import supabase from "services/supabaseClient";
import { Link } from "react-router-dom";
import { useProfile } from "contexts/ProfileContext";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    const isConfirmed = window.confirm("本当にからあげを消しますか");

    if (isConfirmed) {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .match({ recipe_id: recipeId });

      if (error) {
        console.error("Error deleting recipe:", error);
      } else {
        setRecipes(recipes.filter((recipe) => recipe.recipe_id !== recipeId));
      }
    }
  };

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

  return (
    <div className="flex flex-col justify-start min-h-screen m-24 ">
      <h1 className="text-xl font-bold ">からあげレシピ</h1>
      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              {profile && profile.id === recipe.profile_id && (
                <button
                  className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                  onClick={() => handleDelete(recipe.recipe_id)}
                >
                  Delete
                </button>
              )}
              <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                Posted {new Date(recipe.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
