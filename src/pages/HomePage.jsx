import "./HomePage.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { RoutePath } from "utils/RouteSetting";
import { Bodies, Composite, Engine, Render, Runner } from "matter-js";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    matterInitialize();
  }, []);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(RoutePath.home.path);
    }
  }, [user, isLoading, navigate]);

  // MatterEngineがゲーム専用に作ってしまっておりこちらへの実用が難しかったため、matter.jsでやっています。
  const matterInitialize = () => {
    const parent = document.getElementById("Back-Object");
    const engine = Engine.create();
    const render = Render.create({
      element: parent,
      engine: engine,
      options: {
        width: 2000,
        height: 750,
        wireframes: false,
        background: "transparent",
      },
    });
    Render.run(render);

    // 床部分。透過して見えなくしている。
    const ground = Bodies.rectangle(2000 / 2, 740, 2000, 30, { isStatic: true, render: { fillStyle: "transparent" } });
    // タイトル部分の物理判定。透過して見えなくしている。
    const box = Bodies.rectangle((2000 / 2) - 235, 300, 520, 265, { isStatic: true, render: { fillStyle: "transparent" } });
    const composite = Composite.create();
    // ランダムで物理オブジェクトを生成
    for (let i = 0; i < 50; i++) {
      const type = Math.floor(Math.random() * 3);
      const posX = Math.random() * 2000;
      const posY = Math.random() * 520 - 500;
      const rotate = Math.random() * 360;
      const size = 50;
      let createObject;
      switch (type) {
        case 1: // ボール
          createObject = Bodies.polygon(posX, posY, 3, size, { rotate });
          break
        case 2: // 方形
          createObject = Bodies.rectangle(posX, posY, size, size, { rotate });
          break;
        default:
          // 大きくなりすぎてバランス悪くなるので他のサイズから半分にしています
          createObject = Bodies.circle(posX, posY, size / 2, { rotate });
          break;
      }
      Composite.add(composite, createObject);
    }

    Composite.add(engine.world, [ground, box, composite]);
    Runner.run(Runner.create(), engine);

  }

  return (
    <>
      <div className="w-full h-full relative">
        <div id="Back-Object" className="w-full absolute top-0 left-0 overflow-hidden"></div>
        <div className="relative font-[DotGothic16] flex flex-col items-center justify-center h-full pt-10 z-10">
          <div className="pt-5 pb-5 pl-15 pr-15 rounded-3xl border-4 border-black text-center font-dotgothic16 text-shadow-black ">
            <h1 className="text-8xl my-3 mx-10 text-yellow-300">Pythagora<br />maker</h1>
          </div>
          {/* tailwindで表現が難しそうだったので別途cssファイル作成してそちらに記述しています。 */}
          <Link
            to={user ? RoutePath.stageSelect.path : "#"}
            className="game-start-button"
          >
            Game Start
          </Link>
        </div>
      </div>
    </>
  );
};
export default HomePage;
