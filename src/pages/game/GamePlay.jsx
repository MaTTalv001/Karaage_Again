import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CollisionEvents from 'utils/matterjs/CollisionEvents';
import MatterEngine from 'utils/matterjs/MatterEngine';
import MouseEvents from 'utils/matterjs/MouseEvents';
import { createObject, createObjects } from 'utils/matterjs/objects/CreateObjects';

export const GamePlay = () => {
  const { id } = useParams();
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState({});
  const [switchObject, setSwitchObject] = useState({});
  const userPlacementRef = useRef([]);
  const [ball, setBall] = useState({});
  const selectObjectRef = useRef(null);
  const getSelectObjectParent = () => selectObjectRef.current ? selectObjectRef.current.getParent() : null;
  const isDragObjectRef = useRef(false);
  const [isMousePosXLeft, setIsMousePosXLeft] = useState(true);
  const [collisionEvents, setCollisionEvents] = useState(null);
  const [mouseEvents, setMouseEvents] = useState(null);
  const mouseClickPosition = useRef({ x: 0, y: 0 });
  const navigator = useNavigate();
  const wallPosX = 304;

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
    // const data = await supabase.from("テーブル名").select().eq('id', id);
    const data = Data;

    await matterInitialize(data);
  };

  const matterInitialize = async (data) => {
    const matterEngine = new MatterEngine();
    matterEngine.setup("#Game");

    setGameData(data);

    const switchObj = createObject(data.Switch, "Switch");
    setSwitchObject(switchObj);
    const stageObj = createObjects(data.Stage);
    const ball = createObject(data.Ball, "Ball");
    setBall(ball);
    const userPlacementObj = createObjects(data.UserPlacement, "User");
    // ユーザーは一オブジェクトの中に物理オブジェクトがあるとき、
    // 初めから物理が効いていると操作が難しいので、最初は切っておく。
    // ピタゴラスペースに配置するときに物理を効かせる
    userPlacementObj.forEach(obj => obj.setStatic(true));
    const placements = data.UserPlacement.map((obj, index) => {
      return {
        object: obj,
        id: userPlacementObj[index].getId()
      }
    });
    userPlacementRef.current = placements;

    // ユーザー配置オブジェクトとピタゴラスペースの仕切り壁
    // TODO : 仕切り壁の位置をどこかで管理したい
    // FIX : 右側と天井に壁がないのでふっとばすと消える
    const wall = {
      "bodiesType": "Rectangle",
      "x": wallPosX,
      "y": 370,
      "width": 30,
      "height": 740,
      "option": {
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "wall"
      }
    };
    const wallObj = createObject(wall, "Wall");

    const colEvents = new CollisionEvents(matterEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, data.Switch.y));
    colEvents.onTouchEvents();
    setCollisionEvents(colEvents);

    const mouseEvents = new MouseEvents(matterEngine.getRender(), matterEngine.getEngine());
    mouseEvents.registerClickEvent(handleClick);
    mouseEvents.onClickEvents();
    mouseEvents.registerDragEvent(handleDrag);
    mouseEvents.onDragEvents();
    mouseEvents.registerClickUpEvent(handleClickUp);
    mouseEvents.onClickUpEvents();
    setMouseEvents(mouseEvents);

    matterEngine.setRenderMouse(mouseEvents.getMouse());
    matterEngine.registerObject([switchObj, ...stageObj, ...userPlacementObj, ball, wallObj, mouseEvents.getMouseConstraint()]);
    matterEngine.run();
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
    setIsMousePosXLeft(e.source.mouse.position.x < wallPosX);
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
    // if (x < wallPosX) {
    //   parent.setStatic(true);
    //   return;
    // }
    parent.setStatic(false);
  }

  const onClickPlay = () => {
    ball.setStatic(false);
    setSelectObject(null);
  };

  const onClickReset = () => {
    const startPost = { x: gameData.Ball.x, y: gameData.Ball.y };
    ball.setStatic(true);
    ball.setPosition(startPost);

    setGameClear(false);
    switchObject.setPosition({ x: gameData.Switch.x, y: gameData.Switch.y });
  }

  return (
    <>
      {loading && <div>loading...</div>}
      <div className='h-[800px] w-[1200px] m-auto mt-14'>
        <div className='w-full h-[60px] flex'>
          <div className='w-1/4 flex flex-col'>
            <h3 className='my-4 text-center'>配置オブジェクト</h3>
          </div>
          <div className='w-3/4 flex flex-col'>
            <div className='flex justify-between items-center mx-5'>
              <button className='bg-blue-200 hover:bg-blue-400 text-slate-500 hover:text-slate-950 transition-all py-2 px-4 my-2' onClick={onClickReset}>BallReset</button>
              <h3>ゲーム画面</h3>
              <button className='text-slate-500 hover:text-slate-950 bg-red-200 hover:bg-red-400 transition-all py-2 px-4 my-2' onClick={onClickPlay}>▶</button>
            </div>
          </div>
        </div>
        <div id="Game" className='w-full h-[740px] bg-white overflow-hidden'>
        </div>
      </div>
    </>
  )
}

// 確認用データ
const Data = {
  "name": "Sample1",
  "version": "1.0.0",
  "description": "ボール出現サンプル",
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
