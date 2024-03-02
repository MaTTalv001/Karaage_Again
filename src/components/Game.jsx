import { useState, useRef, useEffect, memo, useCallback } from "react";
import { CollisionEvents } from 'utils/matterjs/CollisionEvents';
import { MatterEngine } from 'utils/matterjs/MatterEngine';
import { MouseEvents } from 'utils/matterjs/MouseEvents';
import { createObject, createObjects } from 'utils/matterjs/objects/CreateObjects';
import { ObjectType, UserPlacementBox, WallX } from 'utils/GameSetting';

export const Game = memo(({ stageData, setOnClickPlay, setOnClickPlacementReset, setOnClickBallReset, setIsGameCompleted }) => {
  const [isMousePosXLeft, setIsMousePosXLeft] = useState(true);
  const gameDataRef = useRef();
  const matterEngineRef = useRef();
  const userPlacementCompositeRef = useRef();
  const ballCompositeRef = useRef();
  const collisionEventsRef = useRef();
  const mouseEventsRef = useRef();
  const isDragObjectRef = useRef(false);
  const mouseClickPosition = useRef({ x: 0, y: 0 });
  const selectObjectRef = useRef(null);
  const getSelectObjectParent = () => selectObjectRef.current ? selectObjectRef.current.getParent() : null;
  const HALF_SCALE = 0.5;
  const MULTIPLY_SCALE = 2;
  const FPS30 = 1000 / 30;
  const PUSH_SWITCH_MOVEMENT = 15;
  const SELECT_OBJECT_OUTLINE_WIDTH = 5;

  const fetchData = useCallback(async () => {
    try {
      await matterInitialize();
    } catch (error) {
      // TODO : エラー処理
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      // TODO : エラー処理
      console.error(error);
    }

    return () => {
      collisionEventsRef.current && collisionEventsRef.current.clear();
      mouseEventsRef.current && mouseEventsRef.current.clear();
      matterEngineRef.current && matterEngineRef.current.clear();
    };
  }, [fetchData]);

  useEffect(() => {
    if (selectObjectRef.current === null || isDragObjectRef.current === false) return;
    let parent = getSelectObjectParent();
    // ユーザーが配置できるオブジェクトはそのままのサイズだと配置画面からはみ出るので、スケールを縮小している
    if (isMousePosXLeft) {
      parent.multiplyScale(HALF_SCALE);
      return;
    }
    // 初期配置はすべて半分のサイズなのでピタゴラスペースへ移動させるときはサイズを戻す
    parent.multiplyScale(MULTIPLY_SCALE);
  }, [isMousePosXLeft]);

  const matterInitialize = async () => {
    matterEngineRef.current = new MatterEngine();
    matterEngineRef.current.setup("#Game");
    gameDataRef.current = stageData;

    // スイッチ作成
    const switchObj = createObject(stageData.Switch, ObjectType.Switch);

    // ボールとユーザー配置作成
    createBall(stageData.Ball);
    createUserPlacement(stageData.UserPlacement);

    // 衝突イベント登録
    const colEvents = new CollisionEvents(matterEngineRef.current.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, stageData.Switch.y));
    colEvents.onTouchEvents();
    collisionEventsRef.current = colEvents;

    // マウスイベント登録
    const mouseEvents = new MouseEvents(matterEngineRef.current.getRender(), matterEngineRef.current.getEngine());
    mouseEvents.onEvents(handleClick, handleDrag, handleClickUp);
    mouseEventsRef.current = mouseEvents;

    // マウスをmatter.jsのレンダーに設定。これをしないと物理オブジェクトの移動ができない
    matterEngineRef.current.setRenderMouse(mouseEvents.getMouse());

    // オブジェクト登録
    matterEngineRef.current.registerObject([switchObj, ...createObjects(stageData.Stage), ballCompositeRef.current, userPlacementCompositeRef.current, ...createObjects(UserPlacementBox, ObjectType.Wall), mouseEvents.getMouseConstraint()]);

    // ゲーム実行
    matterEngineRef.current.run();
  }

  const createBall = (ballData) => {
    // ボールの位置を再設定するときにコンポージットをリセットしたほうが楽なのでコンポジットで管理
    ballCompositeRef.current = createCompositeObject(ballData, ObjectType.Ball);
    setOnClickPlay.current = play;
    setOnClickBallReset.current = resetBall;
  }

  const createUserPlacement = (userPlacementData) => {
    // ユーザーが配置できるオブジェクトの位置を再設定するときにコンポージットをリセットしたほうが楽なのでコンポジットで管理
    userPlacementCompositeRef.current = createCompositeObject(userPlacementData, ObjectType.User);
    setOnClickPlacementReset.current = resetPlacement;
  }

  const createCompositeObject = (objData, type) => {
    const object = createObjects(objData, type);
    const composite = matterEngineRef.current.createComposite();
    matterEngineRef.current.registerObjectInComposite(composite, object);
    return composite;
  }

  const handleSwitch = (switchObj, startPos_y) => {
    const intervalId = setInterval(() => {
      const pos = switchObj.getPosition();
      const results = switchObj.setPositionAnimate(pos.x, startPos_y + PUSH_SWITCH_MOVEMENT);
      setIsGameCompleted(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, FPS30);
  };

  const handleClick = (e) => {
    const target = e.source.body;
    // クリックしたオブジェクトがユーザーが配置できるオブジェクトなら選択する
    if (setSelectObject(target)) {
      const diff_x = e.mouse.position.x - target.position.x;
      const diff_y = e.mouse.position.y - target.position.y;
      mouseClickPosition.current = { x: diff_x, y: diff_y };
    }
  };

  const setSelectObject = (target) => {
    // ラベルからユーザーが配置できるオブジェクトかチェック
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
    target.render.lineWidth = SELECT_OBJECT_OUTLINE_WIDTH;
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
    // 親コンポーネントのボールリセットボタンの処理
    matterEngineRef.current.clearComposite(ballCompositeRef.current);
    const ball = createObjects(gameDataRef.current.Ball, ObjectType.Ball);
    matterEngineRef.current.registerObjectInComposite(ballCompositeRef.current, ball);
  };

  const play = () => {
    // 親コンポーネントのプレイボタンの処理
    ballCompositeRef.current.bodies.forEach((ball) => {
      ball.getParent().setStatic(false);
    });
    setSelectObject(null);
  };

  const resetPlacement = () => {
    // 親コンポーネントの配置リセットボタンの処理
    matterEngineRef.current.clearComposite(userPlacementCompositeRef.current);
    const userPlacementObj = createObjects(gameDataRef.current.UserPlacement, ObjectType.User);
    matterEngineRef.current.registerObjectInComposite(userPlacementCompositeRef.current, userPlacementObj);
  };

  return (
    <div id="Game" className={`w-[1200px] m-auto bg-white overflow-hidden`}></div>
  );
});
