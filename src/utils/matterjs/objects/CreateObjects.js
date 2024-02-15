import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Triangle } from "./Triangle";
import { Polygon } from "./Polygon";

// 引数作成のマッパー
const mapper = {
  Rectangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.width, stage.height, stage.option];
  },

  Circle: (stage, type) => {
    return [stage.x, stage.y, type, stage.radius, stage.option];
  },

  Triangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.height, stage.option];
  },

  Polygon: (stage, type) => {
    return [stage.x, stage.y, type, stage.sides, stage.radius, stage.option];
  },
};

// 複数オブジェクト作成
const createObjects = (datas, type = "default") => {
  const stageObjects = [];

  for (let data of datas) {
    const object = createObject(data, type);
    stageObjects.push(object);
  }
  return stageObjects;
};

// 単数オブジェクト作成
const createObject = (data, type = "default") => {
  const Class = {
    Rectangle,
    Circle,
    Triangle,
    Polygon,
  }[data.bodiesType];
  const args = mapper[data.bodiesType](data, type);
  return new Class(...args);
}

export { createObjects, createObject };