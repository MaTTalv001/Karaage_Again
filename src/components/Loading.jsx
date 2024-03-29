import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const Loading = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const engine = Matter.Engine.create();
      const render = Matter.Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: 1800,
          height: 600,
          wireframes: false,
          background: "transparent",
        },
      });
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        ref={sceneRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      ></div>
      <div className="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-gray-700 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 z-10 relative">
        <span
          className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
        <a className="font-[DotGothic16]">Loading</a>
      </div>
    </div>
  );
};

export default Loading;
