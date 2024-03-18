import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "services/supabaseClient";

const RecipeShow = () => {
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const { data: recipeData, error: recipeError } = await supabase
          .from("recipes")
          .select(
            `
          *,
          recipe_ingredients(
            quantity,
            brand,
            ingredient:ingredients(name)
          )
        `
          )
          .eq("recipe_id", recipe_id)
          .single();

        if (recipeError) throw recipeError;

        setRecipe({
          ...recipeData,
          ingredients: recipeData.recipe_ingredients.map(
            ({ ingredient, ...rest }) => ({
              name: ingredient.name,
              ...rest,
            })
          ),
        });
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipe_id]);

  if (!recipe) return <div>Loading...</div>;

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-6 w-6 ${
            i <= rating ? "text-red-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {recipe.title}
          </h2>
          <div className="mt-4 flex">{renderStars(recipe.self_rating)}</div>
          <p className="mt-4 text-gray-500">{recipe.insight}</p>
          <div className="border-t border-gray-200 mt-10"></div>
          <dl className="mt-8">
            {/* Add more details as needed */}
            <div className="py-2">
              <div className="font-medium text-gray-900 p-1.5">材料</div>
              <dd className="mt-2 text-sm text-gray-500">
                {/*テーブル*/}
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 ">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ingredient
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Brand
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 ">
                            {recipe.ingredients.map((ingredient, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                  {ingredient.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                  {ingredient.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                  {ingredient.brand || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/*テーブルここまで　todoコンポーネント化*/}
              </dd>
            </div>
            <div className="py-2">
              <div className="font-medium text-gray-900 p-1.5">作り方</div>
              <div className="mt-2 text-sm text-gray-500">{recipe.process}</div>
            </div>
            <div className="border-t border-gray-200 mt-10"></div>
            <div className="py-2"></div>
            <div className="py-2">
              <dt className="font-medium text-gray-900 mb-4">その他詳細記録</dt>
              <div className="text-sm text-gray-500">
                投稿日 : {new Date(recipe.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">
                国産/外国産 : {recipe.meat_origin}
              </div>
              <div className="text-sm text-gray-500">
                サイズ : {recipe.meat_size}cm
              </div>
              <div className="text-sm text-gray-500">
                漬け時間 : {recipe.marination_time}分
              </div>
              <div className="text-sm text-gray-500">
                漬け温度 : {recipe.marination_temp}℃
              </div>
              <div className="text-sm text-gray-500">
                消費期限残り : {recipe.expiration_remain}日
              </div>
              <div className="text-sm text-gray-500">
                油温 : {recipe.oil_temp}℃
              </div>
              <div className="text-sm text-gray-500">
                揚げ時間 : {recipe.frying_time}℃
              </div>
              <div className="text-sm text-gray-500 flex">
                作った時の体調 {renderStars(recipe.physical_condition)}
              </div>
              <div className="text-sm text-gray-500 flex">
                作った時のメンタル {renderStars(recipe.physical_condition)}
              </div>
            </div>
            {/* Add more details as needed */}
          </dl>
        </div>
        {/* Image */}
        <div className="flex justify-center items-center">
          {recipe.photo_URL && (
            <img
              src={recipe.photo_URL}
              alt={recipe.title}
              className="rounded-lg bg-gray-100"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeShow;
