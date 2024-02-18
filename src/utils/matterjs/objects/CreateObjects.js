import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Triangle } from "./Triangle";
import { Polygon } from "./Polygon";

// 引数作成のマッパー
const mapper = {
  Rectangle: (object, type, size) => {
    return [object.x, object.y, type, object.width * size, object.height * size, object.option];
  },

  Circle: (object, type, size) => {
    return [object.x, object.y, type, object.radius * size, object.option];
  },

  Triangle: (object, type, size) => {
    return [object.x, object.y, type, object.height * size, object.option];
  },

  Polygon: (object, type, size) => {
    return [object.x, object.y, type, object.sides, object.radius * size, object.option];
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
  const size = type === "User" ? 0.5 : 1;
  const args = mapper[data.bodiesType](data, type, size);
  return new Class(...args);
}

export { createObjects, createObject };