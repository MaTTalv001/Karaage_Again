import React, { useState } from "react";
import supabase from "services/supabaseClient";
import { useNavigate } from "react-router-dom";
import RecipeForm from "components/RecipeForm";
import { useProfile } from "contexts/ProfileContext";

const sliderClass =
  "w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:dark:bg-slate-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:dark:bg-gray-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full";

const MakeKaraage = () => {
  const [ingredientsFormData, setIngredientsFormData] = useState([]);
  const { profile } = useProfile();
  const [image, setImage] = useState(null);
  const [physicalCondition, setPhysicalCondition] = useState(0);
  const [selfRating, setSelfRating] = useState(0);
  const [mentalCondition, setMentalCondition] = useState(0);
  const navigate = useNavigate();
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [formData, setFormData] = useState({
    profile_id: profile.id,
    title: "",
    process: "",
    meat_origin: "",
    expiration_remain: 0,
    block_size: 0,
    marination_time: 0,
    marination_temp: 0,
    oil_temp: 0,
    frying_time: 0,
    photo_URL: "",
    self_rating: 0,
    physical_condition: 0,
    mental_condition: 0,
    insight: "",
  });
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRatingChange = (name, value) => {
    if (name === "physicalCondition") {
      setPhysicalCondition(value);
    } else if (name === "selfRating") {
      setSelfRating(value);
    } else if (name === "mentalCondition") {
      setMentalCondition(value);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    });
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let publicURL = "";
    // 画像をストレージにアップロード
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("karaage-recipe")
        .upload(`${fileName}`, image);

      if (uploadError) {
        console.error("画像のアップロードに失敗しました", uploadError);
        return;
      }

      // 画像URLの取得
      const urlData = await supabase.storage
        .from("karaage-recipe")
        .getPublicUrl(`${fileName}`);

      if (urlData.error) {
        console.error("画像URLの取得に失敗しました", urlData.error);
        return;
      } else {
        publicURL = urlData.data.publicUrl;
      }
    }

    const updatedFormData = {
      ...formData,
      physical_condition: physicalCondition,
      self_rating: selfRating,
      mental_condition: mentalCondition,
      photo_URL: publicURL,
    };

    // recipes テーブルにレシピの基本情報を登録
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .insert([updatedFormData])
      .select();

    if (recipeError) {
      alert("Error: " + recipeError.message);
      return;
    }

    // 登録したレシピのIDを取得
    const recipeId = recipeData[0].recipe_id;

    // 材料情報を recipe_ingredients テーブルに登録
    const ingredientsData = ingredientsFormData.map((ingredient) => ({
      recipe_id: recipeId,
      ingredient_id: ingredient.ingredientId,
      quantity: ingredient.quantity,
      brand: ingredient.brand,
    }));

    const { error: ingredientsError } = await supabase
      .from("recipe_ingredients")
      .insert(ingredientsData);

    if (ingredientsError) {
      alert("Error: " + ingredientsError.message);
      return;
    }

    alert("からあげのレシピを登録しました！");
    navigate("/mainpage");
  };
  const renderRating = (name, rating) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleRatingChange(name, value)}
          className={`size-5 inline-flex justify-center items-center text-2xl rounded-full ${
            value <= rating
              ? "text-red-400 dark:text-red-500"
              : "text-gray-300 hover:text-yellow-400 dark:text-gray-600 dark:hover:text-yellow-500"
          } disabled:opacity-50 disabled:pointer-events-none`}
          aria-label={`Rate ${value}`}
        >
          <svg
            className="flex-shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <div className="max-w-xl w-full p-3 mx-auto">
        <h1 className="text-xl font-bold mt-10 mb-6">からあげレシピ登録</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-400 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-400 dark:text-gray-800 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              placeholder="タイトル"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
          </div>
          <div>
            <RecipeForm onIngredientsChange={setIngredientsFormData} />
          </div>
          <div className="relative">
            <textarea
              className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="調理過程"
              name="process"
              rows="5"
              value={formData.process}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <p className="text-md text-gray-800 ">画像投稿</p>

          <label htmlFor="file-input-medium" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="file-input-medium"
            id="file-input-medium"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
      file:bg-gray-50 file:border-0
      file:me-4
      file:py-3 file:px-4
      dark:file:bg-gray-700 dark:file:text-gray-400"
          />

          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium  text-gray-800 "
            onClick={toggleOffCanvas}
          >
            Advanced Setting　▶️▶️
          </button>
          {/* オフキャンバス */}
          {isOffCanvasOpen && (
            <div
              id="hs-custom-backdrop-offcanvas"
              className="fixed top-0 right-0 transition-all duration-300 transform h-full max-w-xs w-full z-50 bg-white dark:bg-gray-800"
              tabIndex="-1"
            >
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Advanced Setting
                </h3>
                <button
                  type="button"
                  className="text-gray-800 dark:text-white"
                  onClick={toggleOffCanvas}
                >
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="p-4">
                <div className="flex gap-x-6 py-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="meat_origin"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="meat_origin-domestic"
                      value="domestic"
                      checked={formData.meat_origin === "domestic"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="meat_origin-domestic"
                      className="text-md text-gray-700 ms-2 dark:text-white "
                    >
                      国産
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="meat_origin"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="meat_origin-imported"
                      value="imported"
                      checked={formData.meat_origin === "imported"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="meat_origin-imported"
                      className="text-md text-gray-700 ms-2 dark:text-white"
                    >
                      外国産
                    </label>
                  </div>
                </div>
                <div className="py-2">
                  <label
                    htmlFor="block_size"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    からあげ1個の大きさ
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.block_size || null}cm
                  </span>
                  <input
                    type="range"
                    name="block_size"
                    className={sliderClass}
                    min="1"
                    max="30"
                    step="1"
                    value={formData.block_size}
                    onChange={handleChange}
                    id="block_size"
                  />
                </div>
                <div className="py-2">
                  <label
                    htmlFor="expiration_remain"
                    className="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    消費期限の残り（日）
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.expiration_remain || null}日
                  </span>
                  <input
                    type="range"
                    name="expiration_remain"
                    className={sliderClass}
                    min="0"
                    max="7"
                    step="1"
                    value={formData.expiration_remain}
                    onChange={handleChange}
                    id="expiration_remain"
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="marination_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    漬け込み時間（時間）
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.marination_time || null}分
                  </span>
                  <input
                    type="range"
                    name="marination_time"
                    className={sliderClass}
                    min="0"
                    max="120"
                    value={formData.marination_time || 0}
                    onChange={handleChange}
                    id="marination_time"
                  />
                </div>

                {/* 漬け置き時の環境温度 */}
                <div className="py-2">
                  <label
                    htmlFor="marination_temp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    漬け置き時の環境温度（℃）
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.marination_temp || null}℃
                  </span>
                  <input
                    type="range"
                    name="marination_temp"
                    className={sliderClass}
                    min="0"
                    max="40"
                    value={formData.marination_temp || 0}
                    onChange={handleChange}
                    id="marination_temp"
                  />
                </div>

                {/* 油温度 */}
                <div className="py-2">
                  <label
                    htmlFor="oil_temp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    油温（℃）
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.oil_temp || null}℃
                  </span>
                  <input
                    type="range"
                    name="oil_temp"
                    className={sliderClass}
                    min="100"
                    max="250"
                    value={formData.oil_temp || 10}
                    onChange={handleChange}
                    id="oil_temp"
                  />
                </div>

                {/* 揚げ時間 */}
                <div className="py-2">
                  <label
                    htmlFor="frying_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    揚げ時間（秒）
                  </label>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formData.frying_time || null}秒
                  </span>
                  <input
                    type="range"
                    name="frying_time"
                    className={sliderClass}
                    min="1"
                    max="600"
                    value={formData.frying_time || 1}
                    onChange={handleChange}
                    id="frying_time"
                  />
                </div>
                <h2 className="pt-1 text-md font-bold mb-2 dark:text-gray-200">
                  食べた時の体調（フィジカル）
                </h2>
                {renderRating("physicalCondition", physicalCondition)}
                <h2 className="pt-1 text-md font-bold mb-2 dark:text-gray-200">
                  食べた時の体調（メンタル）
                </h2>
                {renderRating("mentalCondition", mentalCondition)}
              </div>
            </div>
          )}
          <h2 className="text-xl font-bold mb-4">評価</h2>
          {renderRating("selfRating", selfRating)}
          <div>
            <label
              htmlFor="insight"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              メモ
            </label>
            <textarea
              name="insight"
              id="insight"
              rows="4"
              placeholder="気づき、考察、推しポイントなど"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 "
              value={formData.insight}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
          >
            登録
          </button>
        </form>
      </div>
      <div className="p-5 text-right text-sm text-gray-800">
        からあげに関係ない場合、チキン南BANすることがあります
      </div>
    </div>
  );
};
export default MakeKaraage;
