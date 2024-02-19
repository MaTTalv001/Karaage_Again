
// ゲーム画面
export const GameWidth = 1200;
export const GameHeight = 800 - 56; // 高さ - 親要素のmtのpx

// ユーザー配置とピタゴラスペースの仕切りX座標
export const WallX = 304;

// ユーザー配置を囲うボックス
export const UserPlacementBox = [
  {
    bodiesType: "Rectangle",
    x: WallX,
    y: GameHeight / 2,
    width: 30,
    height: GameHeight,
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
    "x": WallX / 2,
    "y": GameHeight - 15, // 高さ - オブジェクトの高さの半分
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
    y: GameHeight / 2,
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
    "x": WallX / 2,
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

// オブジェクトの種類
export const ObjectType = {
  Stage: "Stage",
  Switch: "Switch",
  User: "User",
  Ball: "Ball",
  Wall: "Wall",
}

// オブジェクトの配色
export const ColorSetting = {
  StageStatic: "gray",
  StageMove: "yellow",
  Switch: "red",
  UserStatic: "blue",
  UserMove: "green",
  Ball: "cyan",
  Wall: "#4ADE80", // TODO 背景色と同じ
}