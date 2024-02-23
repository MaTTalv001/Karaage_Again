import { useState, useRef, useEffect, memo } from "react";
import { CollisionEvents } from 'utils/matterjs/CollisionEvents';
import { MatterEngine } from 'utils/matterjs/MatterEngine';
import { MouseEvents } from 'utils/matterjs/MouseEvents';
import { createObject, createObjects } from 'utils/matterjs/objects/CreateObjects';
import { ObjectType, UserPlacementBox, WallX } from 'utils/GameSetting';

export const Game = ({ stageData, setOnClickPlay, setOnClickPlacementReset, setOnClickBallReset, setGameClear }) => {
  const [gameData, setGameData] = useState(null);
  const [matterEngine, setMatterEngine] = useState();
  const [userPlacementComposite, setUserPlacementComposite] = useState(null);
  const [ballComposite, setBallComposite] = useState(null);
  const [isMousePosXLeft, setIsMousePosXLeft] = useState(true);
  const [collisionEvents, setCollisionEvents] = useState(null);
  const [mouseEvents, setMouseEvents] = useState(null);
  const isDragObjectRef = useRef(false);
  const mouseClickPosition = useRef({ x: 0, y: 0 });
  const selectObjectRef = useRef(null);
  const getSelectObjectParent = () => selectObjectRef.current ? selectObjectRef.current.getParent() : null;

  useEffect(() => {
    fetchData();

    return () => {
      collisionEvents && collisionEvents.clear();
      mouseEvents && mouseEvents.clear();
      matterEngine && matterEngine.clear();
    };
  }, []);

  useEffect(() => {
    if (!matterEngine) return;

    if (ballComposite) {
      setOnClickPlay.current = play;
      setOnClickBallReset.current = resetBall;
    }

    if (userPlacementComposite) {
      setOnClickPlacementReset.current = resetPlacement;
    }

  }, [matterEngine, ballComposite, userPlacementComposite]);

  useEffect(() => {
    if (selectObjectRef.current === null || isDragObjectRef.current === false) return;
    let parent = getSelectObjectParent();
    // ユーザーが配置できるオブジェクトはそのままのサイズだと配置画面からはみ出るので、スケールを縮小している
    if (isMousePosXLeft) {
      parent.multiplyScale(0.5);
      return;
    }
    // 初期配置はすべて半分のサイズなのでピタゴラスペースへ移動させるときはサイズを戻す
    parent.multiplyScale(2);
  }, [isMousePosXLeft]);

  const fetchData = async () => {
    await matterInitialize();
  };

  const matterInitialize = async () => {
    const mEngine = new MatterEngine();
    mEngine.setup("#Game");

    setGameData(stageData);
    const switchObj = createObject(stageData.Switch, ObjectType.Switch);

    const ball = createObjects(stageData.Ball, ObjectType.Ball);
    const ballComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(ballComposite, ball);
    setBallComposite(ballComposite);

    // ユーザーが配置するオブジェクト
    // 配置リセットがしやすいのでCompositeで管理
    const userPlacementObj = createObjects(stageData.UserPlacement, ObjectType.User);
    const userPlacementComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(userPlacementComposite, userPlacementObj);
    setUserPlacementComposite(userPlacementComposite);

    const colEvents = new CollisionEvents(mEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, stageData.Switch.y));
    colEvents.onTouchEvents();
    setCollisionEvents(colEvents);

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

    mEngine.registerObject([switchObj, ...createObjects(stageData.Stage), ballComposite, userPlacementComposite, ...createObjects(UserPlacementBox, ObjectType.Wall), mouseEvents.getMouseConstraint()]);

    mEngine.run();
    setMatterEngine(mEngine);
  }

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

  const handleClick = (e) => {
    const target = e.source.body;
    if (setSelectObject(target)) {
      const diff_x = e.mouse.position.x - target.position.x;
      const diff_y = e.mouse.position.y - target.position.y;
      mouseClickPosition.current = { x: diff_x, y: diff_y };
    }
  };

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

  const handleClickUp = (e) => {
    isDragObjectRef.current = false;
  };

  const resetBall = () => {
    matterEngine.clearComposite(ballComposite);
    const ball = createObjects(gameData.Ball, ObjectType.Ball);
    matterEngine.registerObjectInComposite(ballComposite, ball);
  };

  const play = () => {
    ballComposite.bodies.forEach((ball) => {
      ball.getParent().setStatic(false);
    });
    setSelectObject(null);
  };

  const resetPlacement = () => {
    matterEngine.clearComposite(userPlacementComposite);
    const userPlacementObj = createObjects(gameData.UserPlacement, ObjectType.User);
    matterEngine.registerObjectInComposite(userPlacementComposite, userPlacementObj);
  };

  return (
    <div id="Game" className={`w-[1200px] m-auto bg-white overflow-hidden`}></div>
  );
}

export default memo(Game);