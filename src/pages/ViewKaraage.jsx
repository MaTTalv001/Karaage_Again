import React, { useState } from "react";
import ResipeIndex from "pages/recipes/RecipeIndex";
import ReviewIndex from "pages/reviews/ReviewIndex";

const ViewPage = () => {
  const [selection, setSelection] = useState("none");

  return (
    <div>
      <div className="pt-24 px-10 flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setSelection("make")}
          className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          レシピ閲覧
        </button>
        <button
          type="button"
          onClick={() => setSelection("eat")}
          className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          食レポ閲覧
        </button>
      </div>
      <div>
        {selection === "make" && <ResipeIndex />}
        {selection === "eat" && <ReviewIndex />}
      </div>
    </div>
  );
};

export default ViewPage;
