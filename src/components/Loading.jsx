// TODO : MatterEngineへの置き換え修正
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

      // 地面の配置を修正（画面全体にわたるように）
      const ground = Matter.Bodies.rectangle(600, 600, 1200, 20, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });
      Matter.World.add(engine.world, [ground]);

      // TODO <確認>　ボール生成をcompositeに変更
      // ボールを生成して追加する関数
      const createFallingBalls = () => {
        const x = Math.random() * 1200; // レンダリング範囲内でランダムにX座標を選択
        const ball = Matter.Bodies.circle(x, -30, 20, {
          restitution: 0.8,
          render: {
            fillStyle: "#F35e66",
          },
        });

        const ballComposite = Matter.Composite.create();
        Matter.Composite.add(ballComposite, ball);

        // そのCompositeを世界に追加
        Matter.World.add(engine.world, ballComposite);
      };

      // エンジンとレンダリングの開始
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

      // 1秒ごとにボールを生成
      const intervalId = setInterval(createFallingBalls, 1000);

      return () => {
        clearInterval(intervalId);
        Matter.Engine.clear(engine);
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        render.canvas.remove();
      };
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
      <div className="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-green-400 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 z-10 relative">
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
