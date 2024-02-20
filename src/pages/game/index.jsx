import React from "react";

export const StageSelectPage = () => {

  return (
    <>
      {/* 色は暫定 */}
      <div className='font-[DotGothic16]'>
        <div class="container m-5 mx-auto">
          <div class='bg-blue-200 h-[700px] w-[1200px] m-auto mt-14'>
            <nav class="flex flex-col sm:flex-row max-w-screen-lg mx-auto">
              <button class="mr-1 bg-green-400 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500  font-medium">
                Default
              </button>
              <button class="mr-1 bg-pink-100 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                UserCreate
              </button>
              <button class="mr-1 bg-purple-200 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                YourStage
              </button>
            </nav>
          </div>
          <div className="text-center ">
            {/* {activeTab === 'tab1' && <DefaultStages />}
            {activeTab === 'tab2' && <UserCreates />} */}
          </div>
        </div>
      </div>
        {/* <div className='bg-blue-100 h-[700px] w-[1200px] m-auto mt-40'></div> */}
    </>
  );
};
