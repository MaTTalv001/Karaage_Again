import React, { useState, useEffect } from "react";
import supabase from "services/supabaseClient";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { useProfile } from "contexts/ProfileContext";
import  HandleDeleteReview  from "components/DeleteReview";

const ReviewIndex = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    const fetchReviews = async () => {
      // profileテーブルからnameを取得する
      const { data, error } = await supabase
        .from("reports")
        .select("*, profile:profile_id(name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

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
    <div className="flex flex-col justify-start min-h-screen m-24">
      <h1 className="text-xl font-bold">からあげレビュー</h1>
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
                  <HandleDeleteReview reviewId={review.id} reviews={reviews} setReviews={setReviews} />
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

export default ReviewIndex;
