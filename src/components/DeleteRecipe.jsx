import React from "react";
import supabase from "../services/supabaseClient";

const HandleDelete = ({ recipeId, recipes, setRecipes }) => {
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("本当にからあげを消しますか");

    if (isConfirmed) {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .match({ recipe_id: id });

      if (error) {
        console.error("Error deleting recipe:", error);
      } else {
        // recipes ステートの更新は親コンポーネントで行う
        setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
      }
    }
  };

  return (
    <button
      className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
      onClick={() => handleDelete(recipeId)}
    >
      Delete
    </button>
  );
};

export default HandleDelete;
