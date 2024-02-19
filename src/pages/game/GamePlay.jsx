import React, { useEffect, useRef, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'; // ページ遷移用
import CollisionEvents from 'utils/matterjs/CollisionEvents';
import MatterEngine from 'utils/matterjs/MatterEngine';
import MouseEvents from 'utils/matterjs/MouseEvents';
import { createObject, createObjects } from 'utils/matterjs/objects/CreateObjects';
import { GameHeight, GameWidth, ObjectType, UserPlacementBox, WallX } from 'utils/GameSetting';

export const GamePlay = () => {
  //const { id } = useParams(); // ゲームID
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
  //const navigator = useNavigate(); // ページ遷移用

  useEffect(() => {
    fetchData();
    setLoading(false);

    return () => {
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

  useEffect(() => {
    if (selectObjectRef.current === null || isDragObjectRef.current === false) return;
    let parent = getSelectObjectParent();
    if (isMousePosXLeft) {
      parent.multiplyScale(0.5);
      parent.setStatic(true);
      return;
    }
    parent.multiplyScale(2);
  }, [isMousePosXLeft]);


  const fetchData = async () => {
    // supabaseからデータを取得する処理をここに書く
    // 今回は確認用データを使う
    const data = Data;

    await matterInitialize(data);
  };

  const matterInitialize = async (data) => {
    const mEngine = new MatterEngine();
    mEngine.setup("#Game");

    setGameData(data);

    const switchObj = createObject(data.Switch, ObjectType.Switch);

    const ball = createObjects(data.Ball, ObjectType.Ball);
    const ballComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(ballComposite, ball);
    setBallComposite(ballComposite);

    const userPlacementObj = createObjects(data.UserPlacement, ObjectType.User);
    const userPlacementComposite = mEngine.createComposite();
    mEngine.registerObjectInComposite(userPlacementComposite, userPlacementObj);
    setUserPlacementComposite(userPlacementComposite);

    const colEvents = new CollisionEvents(mEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, data.Switch.y));
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

    mEngine.setRenderMouse(mouseEvents.getMouse());
    mEngine.registerObject([switchObj, ...createObjects(data.Stage), ballComposite, userPlacementComposite, ...createObjects(UserPlacementBox, ObjectType.Wall), mouseEvents.getMouseConstraint()]);
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
  }

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
    if (!selectObjectRef.current || selectObjectRef.current.label !== "userMove") return;
    const parent = getSelectObjectParent();
    // FIX : 左側のユーザー配置エリアに戻すと物理判定がバグるためオフにしてます。
    // const x = e.mouse.position.x;
    // if (x < WallX) {
    //   parent.setStatic(true);
    //   return;
    // }
    parent.setStatic(false);
  }

  const onClickPlay = () => {
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
      <div className='w-full'>
        <div className={`h-[${GameHeight}px] w-[${GameWidth}px] m-auto mt-14 flex flex-col`}>
          <div className='w-full h-[60px] flex'>
            <div className='w-1/4 grid grid-flow-col items-center text-start'>
              <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2' onClick={onClickPlacementReset}>Reset</button>
              <h3 className='mx-auto'>You Placement</h3>
            </div>
            <div className='w-3/4 flex flex-col'>
              <div className='flex justify-between items-center mx-5'>
                <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2 px-4 my-2' onClick={onClickBallReset}>BallReset</button>
                <h3>{gameData.title}</h3>
                <button className='hover:text-slate-500 text-slate-950 hover:bg-red-200 bg-red-400 transition-all py-2 px-4 my-2' onClick={onClickPlay}>▶</button>
              </div>
            </div>
          </div>
          <div id="Game" className={`w-[${GameWidth}px] h-[${GameHeight}px] bg-white overflow-hidden`}>
          </div>
        </div>
      </div>
    </>
  )
}

// 確認用データ
const Data = {
  "name": "Sample1",
  "version": "1.0.0",
  "title": "Tutorial",
  "description": "どんなゲーム？",
  "Stage": [
    {
      "bodiesType": "Rectangle",
      "x": 752,
      "y": 730,
      "width": 896,
      "height": 30,
      "option": {
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "stage"
      }
    },
    {
      "bodiesType": "Rectangle",
      "x": 904,
      "y": 200,
      "width": 400,
      "height": 30,
      "option": {
        "angle": -0.5,
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "stage"
      }
    }
  ],
  "Switch": {
    "bodiesType": "Rectangle",
    "x": 904,
    "y": 700,
    "width": 100,
    "height": 50,
    "option": {
      "isStatic": true,
      "collisionFilter": {
        "group": -1
      },
      "label": "switch"
    }
  },
  "UserPlacement": [
    {
      "bodiesType": "Rectangle",
      "x": 150,
      "y": 100,
      "width": 500,
      "height": 30,
      "option": {
        "angle": 0.5,
        "isStatic": true,
        "label": "userStatic"
      }
    },
    {
      "bodiesType": "Circle",
      "x": 150,
      "y": 200,
      "radius": 30,
      "option": {
        "label": "userMove",
        "mass": 10,
      }
    }
  ],
  "Ball": {
    "bodiesType": "Circle",
    "x": 1000,
    "y": 80,
    "radius": 30,
    "option": {
      "label": "ball",
      "isStatic": true,
    }
  }
}
