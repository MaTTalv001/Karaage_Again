import React, { useState } from "react";
import MakeKaraage from "./MakeKaraage";
import EatKaraage from "./EatKaraage";

const PostPage = () => {
  const [selection, setSelection] = useState("none");

  return (
    <div>
      <div class="pt-24 px-10 flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setSelection("make")}
          class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          レシピ投稿
        </button>
        <button
          type="button"
          onClick={() => setSelection("eat")}
          class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          食レポ投稿
        </button>
      </div>
      <div>
        {selection === "make" && <MakeKaraage />}
        {selection === "eat" && <EatKaraage />}
      </div>
    </div>
  );
};

export default PostPage;
