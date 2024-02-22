import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CollisionEvents from 'utils/matterjs/CollisionEvents';
import MatterEngine from 'utils/matterjs/MatterEngine';
import MouseEvents from 'utils/matterjs/MouseEvents';
import { createObject, createObjects } from 'utils/matterjs/objects/CreateObjects';
import { ObjectType, State, UserPlacementBox, WallX } from 'utils/GameSetting';
import { RoutePath } from 'utils/RouteSetting';
import { getStageById } from 'services/supabaseStages';

export const GamePlay = () => {
  const { id } = useParams(); // ゲームID
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState({});
  const [matterEngine, setMatterEngine] = useState();
  const [userPlacementComposite, setUserPlacementComposite] = useState([]);
  const [ballComposite, setBallComposite] = useState([]);
  const [isMousePosXLeft, setIsMousePosXLeft] = useState(true);
  const [collisionEvents, setCollisionEvents] = useState(null);
  const [mouseEvents, setMouseEvents] = useState(null);
  const isDragObjectRef = useRef(false);
  const mouseClickPosition = useRef({ x: 0, y: 0 });
  const selectObjectRef = useRef(null);
  const getSelectObjectParent = () => selectObjectRef.current ? selectObjectRef.current.getParent() : null;
  const navigator = useNavigate();

  useEffect(() => {
    fetchData();
    setLoading(false);

    return () => {
      // イベントリスナのクリーンアップ
      collisionEvents && collisionEvents.clear();
      mouseEvents && mouseEvents.clear();
    };
  }, []);

  useEffect(() => {
    if (gameClear) {
      // TODO : ゲームクリア処理や演出
      alert("ゲームクリア");
    }
  }, [gameClear]);

  // オブジェクトドラッグ時の処理
  useEffect(() => {
    // ドラッグしているオブジェクトがなければ何もしない
    if (selectObjectRef.current === null || isDragObjectRef.current === false) return;
    let parent = getSelectObjectParent();
    if (isMousePosXLeft) {
      // マウスが左側にあれば選択しているオブジェクトのスケールを半分にする
      parent.multiplyScale(0.5);
      return;
    }
    // マウスが右側にあれば選択しているオブジェクトのスケールを初期のサイズに戻す
    parent.multiplyScale(2);
  }, [isMousePosXLeft]);


  const fetchData = async () => {
    let { result, data } = await getStageById(id);
    if (result === "error") {
      // TODO : エラー処理 暫定でステージ選択画面に遷移
      navigator(RoutePath.stageSelect.path);
      return;
    }

    // 公開状況
    if (data.state !== State.release) {
      alert('存在しないページです');
      // 404ページに遷移させたい 現在ページがないので暫定
      navigator(RoutePath.selectStage.path);
      return;
    }

    await matterInitialize(data);
  };

  const matterInitialize = async (data) => {
    const mEngine = new MatterEngine();
    mEngine.setup("#Game"); // ゲームを描画するタグのID

    // 初期データの保持
    setGameData(data);
    const stage = data.content;

    const switchObj = createObject(stage.Switch, ObjectType.Switch);

    // ボールは複数になる可能性を考えてCompositeで管理
    const ball = createObjects(stage.Ball, ObjectType.Ball);
    const ballComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(ballComposite, ball);
    setBallComposite(ballComposite);

    // ユーザーが配置するオブジェクト
    // 配置リセットがしやすいのでCompositeで管理
    const userPlacementObj = createObjects(stage.UserPlacement, ObjectType.User);
    const userPlacementComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(userPlacementComposite, userPlacementObj);
    setUserPlacementComposite(userPlacementComposite);

    // 衝突判定のイベント
    const colEvents = new CollisionEvents(mEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, stage.Switch.y));
    colEvents.onTouchEvents();
    setCollisionEvents(colEvents);

    // マウスのイベント。クリック、ドラッグ、クリックアップ
    const mouseEvents = new MouseEvents(mEngine.getRender(), mEngine.getEngine());
    mouseEvents.registerClickEvent(handleClick);
    mouseEvents.onClickEvents();
    mouseEvents.registerDragEvent(handleDrag);
    mouseEvents.onDragEvents();
    mouseEvents.registerClickUpEvent(handleClickUp);
    mouseEvents.onClickUpEvents();
    setMouseEvents(mouseEvents);

    // マウスをmatter.jsのレンダーに設定。これをしないと物理オブジェクトの移動ができない
    mEngine.setRenderMouse(mouseEvents.getMouse());

    // オブジェクトの登録
    mEngine.registerObject([switchObj, ...createObjects(stage.Stage), ballComposite, userPlacementComposite, ...createObjects(UserPlacementBox, ObjectType.Wall), mouseEvents.getMouseConstraint()]);

    // エンジンの実行
    mEngine.run();
    setMatterEngine(mEngine);
  }

  // スイッチ押下イベント
  const handleSwitch = (switchObj, startPos_y) => {
    const intervalId = setInterval(() => {
      const pos = switchObj.getPosition();
      const results = switchObj.setPositionAnimate(pos.x, startPos_y + 15);
      setGameClear(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30);
  };

  // ゲーム描画域内のクリックイベント
  // NOTE : ゲーム描画域外のクリックイベントはここには書かない
  const handleClick = (e) => {
    const target = e.source.body;
    if (setSelectObject(target)) {
      const diff_x = e.mouse.position.x - target.position.x;
      const diff_y = e.mouse.position.y - target.position.y;
      mouseClickPosition.current = { x: diff_x, y: diff_y };
    }
  }

  // 現在選択されているオブジェクト設定
  const setSelectObject = (target) => {
    if (target == null || !target.label.match(/user(.*)/g)) {
      if (selectObjectRef.current) {
        selectObjectRef.current.render.lineWidth = 0;
      }
      selectObjectRef.current = null;
      return false;
    }
    if (selectObjectRef.current && target !== selectObjectRef.current) {
      selectObjectRef.current.render.lineWidth = 0;
    }
    // ユーザーが配置できるオブジェクトは選択時に赤く縁取る
    target.render.lineWidth = 5;
    target.render.strokeStyle = "red";
    selectObjectRef.current = target;
    return true;
  };

  // オブジェクトのドラッグイベント。選択されているものがあればドラッグで移動できる
  const handleDrag = (e) => {
    setIsMousePosXLeft(e.source.mouse.position.x < WallX);
    const target = e.source.body;
    if (!target) return;

    isDragObjectRef.current = true;

    if (!target.isStatic) return;

    if (selectObjectRef.current && selectObjectRef.current === target) {
      const position = e.source.mouse.position;
      const x = position.x - mouseClickPosition.current.x;
      const y = position.y - mouseClickPosition.current.y;
      // FIX : たまに座標がずれるかも
      const parent = getSelectObjectParent();
      parent.setPosition({ x, y });
    }
  };

  // クリックを止めた時のイベント
  const handleClickUp = (e) => {
    isDragObjectRef.current = false;
  }

  const onClickPlay = () => {
    // ステージに初期配置されているボールの物理を働かせる
    ballComposite.bodies.forEach((ball) => {
      ball.getParent().setStatic(false);
    });
    setSelectObject(null);
  };

  const onClickBallReset = () => {
    matterEngine.clearComposite(ballComposite);
    const ball = createObjects(gameData.Ball, ObjectType.Ball);
    matterEngine.registerObjectInComposite(ballComposite, ball);
  }

  const onClickPlacementReset = () => {
    matterEngine.clearComposite(userPlacementComposite);
    const userPlacementObj = createObjects(gameData.UserPlacement, ObjectType.User);
    matterEngine.registerObjectInComposite(userPlacementComposite, userPlacementObj);
  };

  return (
    <>
      {loading && <div>loading...</div>}
      <div className={`w-[1200px] m-auto`}>
        <div className="w-full m-auto mt-14 flex flex-col font-[DotGothic16] ">
          <div className='w-full flex'>
            <div className='w-1/4 grid grid-flow-col items-center text-start'>
              <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2' onClick={onClickPlacementReset}>Reset</button>
              <h3 className='text-xl mx-auto'>Placement</h3>
            </div>
            <div className='w-3/4 flex flex-col'>
              <div className='flex justify-between items-center mx-5'>
                <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2 px-4 my-2' onClick={onClickBallReset}>BallReset</button>
                <h3 className='text-2xl'>{gameData.title}</h3>
                <button className='hover:text-slate-500 text-slate-950 hover:bg-red-200 bg-red-400 transition-all py-2 px-4 my-2' onClick={onClickPlay}>▶</button>
              </div>
            </div>
          </div>
          <div id="Game" className={`w-[1200px] m-auto bg-white overflow-hidden`}>
          </div>
        </div>
      </div>
    </>
  )
}