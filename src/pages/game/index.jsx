import React from "react";
import { StageCard } from "components/StageCard";

export const StageSelectPage = () => {

  const stages = [
    { stageNumber: 1, imageUrl: 'path/to/image1.jpg' },
    { stageNumber: 2, imageUrl: 'path/to/image2.jpg' }
  ];

  return (
    <div className="bg-teal-100 p-4 h-[720px] w-[1280px] m-auto mt-36">
      <div className="grid grid-cols-2 h-[300px] w-[1250px]">
        {stages.map((stage) => (
          <StageCard
            key={`stage-${stage.stageNumber}`}
            stageNumber={stage.stageNumber}
            imageUrl={stage.imageUrl}
          />
        ))}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className='font-[DotGothic16] '>
  //       <div class='container m-5 mx-auto'>
  //         <div class='bg-blue-200 h-[720px] w-[1280px] m-auto mt-36'>
  //           <nav class='flex flex-col sm:flex-row max-w-screen-lg'>
  //             <button class='mr-1 bg-blue-200 text-gray-600 py-4 px-16 block hover:text-blue-300'>
  //               Default
  //             </button>
  //             <button class='mr-1 bg-yellow-300 text-gray-600 py-4 px-16 block hover:text-blue-300'>
  //               User's
  //             </button>
  //             <button class='mr-1 bg-red-300 text-gray-600 py-4 px-16 block hover:text-blue-300'>
  //               My idea
  //             </button>
  //           </nav>
  //           <div class='flex'>
  //             <div class='bg-white h-[200px] w-[500px]'></div>
  //             <div class='bg-white h-[200px] w-[500px]'></div>
  //           </div>
  //         </div>
  //         <div className='text-center'>
  //           {/* {activeTab === 'tab1' && <DefaultStages />}
  //           {activeTab === 'tab2' && <UserCreates />} */}
  //         </div>
  //       </div>
  //       {/* <div className='bg-blue-100 h-[700px] w-[1200px] m-auto mt-40'></div> */}
  //     </div>
  //   </div>
  // );
};

export default StageSelectPage;