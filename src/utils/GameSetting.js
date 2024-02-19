
// ゲーム画面
export const GameWidth = 1200;
export const GameHeight = 800;

// ユーザー配置とピタゴラスペースの仕切りX座標
export const WallX = 304;

// ユーザー配置を囲うボックス
export const UserPlacementBox = [
  {
    bodiesType: "Rectangle",
    x: WallX,
    y: 370,
    width: 30,
    height: 740,
    option: {
      isStatic: true,
      collisionFilter: {
        group: -1
      },
      label: "wall"
    }
  },
  {
    "bodiesType": "Rectangle",
    "x": 152,
    "y": 730,
    "width": WallX,
    "height": 30,
    "option": {
      "isStatic": true,
      "collisionFilter": {
        "group": -1
      },
      "label": "wall"
    }
  },
  {
    bodiesType: "Rectangle",
    x: -30,
    y: 370,
    width: 30,
    height: 740,
    option: {
      isStatic: true,
      collisionFilter: {
        group: -1
      },
      label: "wall"
    }
  },
  {
    "bodiesType": "Rectangle",
    "x": 152,
    "y": -30,
    "width": WallX,
    "height": 30,
    "option": {
      "isStatic": true,
      "collisionFilter": {
        "group": -1
      },
      "label": "wall"
    }
  },
]

// オブジェクトの配色
export const ColorSetting = {
  Static: "gray",
  Switch: "red",
  Move: "yellow",
  UserStatic: "blue",
  UserMove: "green",
  Ball: "cyan",
  Wall: "#4ADE80", // TODO 背景色と同じ
}