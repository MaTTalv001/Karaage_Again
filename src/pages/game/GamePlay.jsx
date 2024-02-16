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
  // TODO : useStateでいいのか勉強中
  const [stageData, setStageData] = useState([]);
  const [switchObject, setSwitchObject] = useState({});
  const [userPlacement, setUserPlacement] = useState([]);
  const selectObjectRef = useRef(null);
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
    }
  }, [gameClear]);

  const fetchData = async () => {
    // supabaseからデータを取得する処理をここに書く
    // 今回は確認用データを使う
    const data = Data;

    matterInitialize(data);
  };

  const matterInitialize = (data) => {
    const matterEngine = new MatterEngine();
    matterEngine.setup("#Game");

    const switchObj = createObject(data.Switch, "Switch");
    setSwitchObject(switchObj);
    const stageObj = createObjects(data.Stage);
    setStageData(stageObj);
    const userPlacementObj = createObjects(data.UserPlacement, "User");
    setUserPlacement(data.UserPlacement);
    matterEngine.registerObject([switchObj, ...stageObj, ...userPlacementObj]);

    matterEngine.run();

    const colEvents = new CollisionEvents(matterEngine.getEngine());
    colEvents.pushSwitch(() => handleSwitch(switchObj));
    setCollisionEvents(colEvents);

    const mouseEvents = new MouseEvents(matterEngine.getRender(), matterEngine.getEngine());
    mouseEvents.registerClickEvent(handleClick);
    mouseEvents.onClickEvents();
    mouseEvents.registerDragEvent(handleDrag);
    mouseEvents.onDragEvents();
    setMouseEvents(mouseEvents);
  }

  const handleSwitch = (switchObj) => {
    const intervalId = setInterval(() => {
      const pos = switchObj.getPosition();
      const results = switchObj.setPositionAnimate(pos.x, pos.y + 30);
      setGameClear(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30);
  };

  const handleClick = (e) => {
    const target = e.source.body;
    if (!target || !target.label.match(/user(.*)/g)) {
      if (selectObjectRef.current) {
        selectObjectRef.current.render.lineWidth = 0;
      }
      selectObjectRef.current = null;
      return;
    }

    // もう一度同じオブジェクトを選択したら選択解除
    if (target === selectObjectRef.current) {
      selectObjectRef.current.render.lineWidth = 0;
      selectObjectRef.current = null;
      return;
    }

    // TODO : もっといいやり方あったらリファクタリング
    target.render.lineWidth = 5;
    target.render.strokeStyle = "red";
    selectObjectRef.current = target;

    const diff_x = e.mouse.position.x - target.position.x;
    const diff_y = e.mouse.position.y - target.position.y;
    mouseClickPosition.current = { x: diff_x, y: diff_y };
  }

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
    }
  };

  return (
    <div className='h-[800px] w-[1200px] m-auto mt-14'>
      <div className='w-full h-full flex gap-3'>
        <div className='w-1/4 flex flex-col'>
          <h3 className='my-4'>配置オブジェクト</h3>
          <div id="Placement" className='h-full bg-white border-solid border-slate-400 hover:border-yellow-400 transition-all border-2'>
          </div>
        </div>
        <div className='w-3/4 flex flex-col'>
          <div className='flex justify-between items-center mx-5'>
            <button className='bg-blue-200 hover:bg-blue-400 text-slate-500 hover:text-slate-950 transition-all py-2 px-4 my-2'>Reset</button>
            <h3>ゲーム画面</h3>
            <button className='text-slate-500 hover:text-slate-950 bg-red-200 hover:bg-red-400 transition-all py-2 px-4 my-2'>▶</button>
          </div>
          <div id="Game" className='h-full bg-white border-solid hover:border-yellow-400 border-slate-400 transition-all border-2'>
          </div>
        </div>
      </div>
    </div>
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
      "x": 448,
      "y": 740,
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
      "x": 500,
      "y": 200,
      "width": 500,
      "height": 30,
      "option": {
        "angle": -0.2,
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
    "x": 600,
    "y": 550,
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
      "x": 300,
      "y": 400,
      "width": 500,
      "height": 30,
      "option": {
        "angle": 0.2,
        "isStatic": true,
        "collisionFilter": {
          "group": -1
        },
        "label": "userStatic"
      }
    }
  ],
  "Ball": {
    "bodiesType": "Circle",
    "x": 600,
    "y": 100,
    "radius": 30,
    "option": {
      "label": "ball"
    }
  }
}
