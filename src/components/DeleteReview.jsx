import React from "react";
import supabase from "../services/supabaseClient";

const HandleDeleteReview = ({ reviewId, reviews, setReviews }) => {
  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm("本当にからあげを消しますか");

    if (isConfirmed) {
      const { error } = await supabase
        .from("reports")
        .delete()
        .match({ id: reviewId });

      if (error) {
        console.error("Error deleting review:", error);
      } else {
        // recipes ステートの更新は親コンポーネントで行う
        setReviews(reviews.filter((review) => review.id !== reviewId));
      }
    }
  };

  return (
    <button
      className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
      onClick={() => handleDelete(reviewId)}
    >
      Delete
    </button>
  );
};

export default HandleDeleteReview;
