import { Body } from 'matter-js';
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
  const [stageData, setStageData] = useState([]);
  const [switchObject, setSwitchObject] = useState({});
  const [userPlacement, setUserPlacement] = useState([]);
  const [ball, setBall] = useState({});
  const [wall, setWall] = useState({});
  const selectObjectRef = useRef(null);
  const [selectObjectLeft, setSelectObjectLeft] = useState(true); // TODO : ネーミングセンス
  const [collisionEvents, setCollisionEvents] = useState(null);
  const [mouseEvents, setMouseEvents] = useState(null);
  const mouseClickPosition = useRef({ x: 0, y: 0 });
  const navigator = useNavigate();

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
    if (selectObjectRef.current === null) return;
    if (selectObjectLeft) {
      Body.scale(selectObjectRef.current, 0.5, 0.5);
      return;
    }
    Body.scale(selectObjectRef.current, 2, 2);
  }, [selectObjectLeft]);


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
    setStageData(data.Stage);
    const ball = createObject(data.Ball, "Ball");
    setBall(ball);
    const userPlacementObj = createObjects(data.UserPlacement, "User");
    const placements = data.UserPlacement.map((obj, index) => {
      return {
        object: obj,
        id: userPlacementObj[index].getId()
      }
    });
    setUserPlacement(placements);

    const wall = {
      "bodiesType": "Rectangle",
      "x": 304,
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
    setWall(wallObj);

    matterEngine.registerObject([switchObj, ...stageObj, ...userPlacementObj, ball, wallObj]);

    matterEngine.run();

    const colEvents = new CollisionEvents(matterEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj, data.Switch.y));
    setCollisionEvents(colEvents);

    const mouseEvents = new MouseEvents(matterEngine.getRender(), matterEngine.getEngine());
    mouseEvents.registerClickEvent(handleClick);
    mouseEvents.onClickEvents();
    mouseEvents.registerDragEvent(handleDrag);
    mouseEvents.onDragEvents();
    setMouseEvents(mouseEvents);
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

    if (selectObjectRef.current === target) {
      selectObjectRef.current.render.lineWidth = 0;
      selectObjectRef.current = null;
      return false;
    }

    target.render.lineWidth = 5;
    target.render.strokeStyle = "red";
    selectObjectRef.current = target;
    return true;
  };

  const handleDrag = (e) => {
    const target = e.source.body;
    if (!target || target.label === "useMove") return;
    if (selectObjectRef.current && selectObjectRef.current === target) {
      const position = e.source.mouse.position;
      const x = position.x - mouseClickPosition.current.x;
      const y = position.y - mouseClickPosition.current.y;
      // TODO : BodyをMatterEngineとかでラップしたい
      // あっちこっちにmatterjsがあると管理が大変なのでラップしたい
      // FIX : たまに座標がずれる
      Body.setPosition(selectObjectRef.current, { x, y });

      // マジックナンバァァァァ！！！！
      if (x < 304) {
        setSelectObjectLeft(true);
        return;
      }
      setSelectObjectLeft(false);
    }
  };

  const onClickPlay = () => {
    ball.setStatic(false);
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
            <h3 className='my-4'>配置オブジェクト</h3>
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
    }
  ],
  "Ball": {
    "bodiesType": "Circle",
    "x": 1000,
    "y": 80,
    "radius": 30,
    "option": {
      "label": "ball",
      "mass": 1,
      "isStatic": true,
    }
  }
}
