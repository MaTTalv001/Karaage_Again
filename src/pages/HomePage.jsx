import "./HomePage.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "utils/RouteSetting";
import { Bodies, Composite, Engine, Render, Runner } from "matter-js";

const HomePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    matterInitialize();
  }, []);

  // MatterEngineがゲーム専用に作ってしまっておりこちらへの実用が難しかったため、matter.jsでやっています。
  const matterInitialize = () => {
    // 画面の描画域サイズを取得
    const SCREEN_WIDTH = document.body.clientWidth;
    const SCREEN_HEIGHT = document.body.clientHeight;
    const parent = document.getElementById("Back-Object");
    const engine = Engine.create();
    const render = Render.create({
      element: parent,
      engine: engine,
      options: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        wireframes: false,
        background: "transparent",
      },
    });
    Render.run(render);

    const RENDER = { fillStyle: "transparent" }
    // 床部分。透過して見えなくしている。
    const ground = Bodies.rectangle(2000 / 2, SCREEN_HEIGHT - 30, 2000, 30, { isStatic: true, render: RENDER });
    // タイトル部分の物理判定。透過して見えなくしている。
    // TODO : スクリーンサイズから計算してタイトル部分の物理オブジェクトの配置を割り出しているが、これで本当に行けるかちょっと不安
    const POSITION_Y_ADJUST = 55;
    const CENTER_POSITION = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 - POSITION_Y_ADJUST }
    const TITLE_BOX_SIZE = { width: 520, height: 265 }
    const box = Bodies.rectangle(CENTER_POSITION.x, CENTER_POSITION.y, TITLE_BOX_SIZE.width, TITLE_BOX_SIZE.height, { isStatic: true, render: RENDER });
    const composite = Composite.create();
    // ランダムで物理オブジェクトを生成
    const SPAWN_HEIGHT = 500;
    const SPAWN_HEIGHT_RANGE = 20;
    const SPAWN_ANGLE = 360;
    const SPAWN_SIZE = 50;
    const SPAWN_TYPE = 3;
    for (let i = 0; i < 50; i++) {
      // ごちゃっと感を出すためにランダムで生成
      const objectType = Math.floor(Math.random() * SPAWN_TYPE);
      const posX = Math.random() * SCREEN_WIDTH;
      const posY = Math.random() * (SPAWN_HEIGHT + SPAWN_HEIGHT_RANGE) - SPAWN_HEIGHT;
      const rotate = Math.random() * SPAWN_ANGLE;
      let createObject;
      switch (objectType) {
        case 1: // 三角形
          createObject = Bodies.polygon(posX, posY, 3, SPAWN_SIZE, { rotate });
          break
        case 2: // 方形
          createObject = Bodies.rectangle(posX, posY, SPAWN_SIZE, SPAWN_SIZE, { rotate });
          break;
        default: // 円
          // 大きくなりすぎてバランス悪くなるので他のサイズから半分にしています
          createObject = Bodies.circle(posX, posY, SPAWN_SIZE / 2, { rotate });
          break;
      }
      Composite.add(composite, createObject);
    }

    Composite.add(engine.world, [ground, box, composite]);
    Runner.run(Runner.create(), engine);

  }

  return (
    <div className="w-full h-full relative pt-14">
      <div id="Back-Object" className="w-screen h-screen absolute top-0 left-0 overflow-hidden"></div>
      <div className="relative font-[DotGothic16] flex flex-col items-center justify-center h-full pt-10 z-10">
        <div className="pt-5 pb-5 pl-15 pr-15 rounded-3xl border-4 border-black text-center font-dotgothic16 text-shadow-black ">
          <h1 className="text-8xl my-3 mx-10 text-yellow-300">Pythagora<br />maker</h1>
        </div>
        {/* tailwindで表現が難しそうだったので別途cssファイル作成してそちらに記述しています。 */}
        <Link
          to={user ? RoutePath.stageSelect.path : RoutePath.login.path}
          className="game-start-button"
        >
          Game Start
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
