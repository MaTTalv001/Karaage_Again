import React, { useState } from "react";
import supabase from "services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useProfile } from "contexts/ProfileContext";

const EatKaraage = () => {
  const { profile } = useProfile();
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    profile_id: profile ? profile.id : 5,
    title: "",
    place: "",
    review: "",
    rating: 0,
    photo_URL: "",
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRatingChange = (name, value) => {
    setRating(value);
    setReportData({ ...reportData, rating: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let publicURL = "";

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
        .getPublicUrl(`${fileName}`, {
          transform: {
            width: 600,
            height: 400,
          },
        });

      if (urlData.error) {
        console.error("画像URLの取得に失敗しました", urlData.error);
        return;
      } else {
        publicURL = urlData.data.publicUrl;
      }
    }
    const updatedFormData = {
      ...reportData,
      photo_URL: publicURL,
    };

    // レポートデータの登録
    const { error: reportError } = await supabase
      .from("reports")
      .insert([{ ...updatedFormData, rating: rating }]);

    if (reportError) {
      console.error("レポートの登録に失敗しました", reportError);
      return;
    }

    alert("唐揚げの食レポートを登録しました！");
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
        <h1 className="text-xl font-bold mt-10 mb-6">からあげ食レポ投稿</h1>
        {/* フォームのレイアウトと入力フィールド */}
        <form onSubmit={handleSubmit}>
          <div className="relative py-5">
            <input
              type="text"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-400 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-400 dark:text-gray-800 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              placeholder="タイトル"
              name="title"
              value={reportData.title}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
          </div>
          <div className="relative py-5">
            <input
              type="text"
              className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-400 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-400 dark:text-gray-800 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
              placeholder="食べた場所・店"
              name="place"
              value={reportData.place}
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
          </div>
          <h2 className="text-xl font-bold mb-4">評価</h2>
          {renderRating("評価", rating)}
          <div className="py-5">
            <label
              htmlFor="insight"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              メモ
            </label>
            <textarea
              name="review"
              id="review"
              rows="4"
              placeholder="レビュー"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 "
              value={reportData.review}
              onChange={handleChange}
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
          <div className="pt-5">
            <button
              type="submit"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
            >
              登録
            </button>
          </div>
        </form>
      </div>
      <div className="p-10 text-right text-sm text-gray-800">
        からあげに関係なさすぎる投稿はチキンシ（禁止）です
      </div>
    </div>
  );
};

export default EatKaraage;
