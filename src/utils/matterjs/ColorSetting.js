/* NOTE : matter.jsの色周りの設定（抜粋）
render = {
  塗りつぶし
  初期値：動かないとなし、動くとランダム
  fillStyle: string,

  枠線の太さ
  初期値：0
  lineWidth: number,

  透過度
  初期値：1
  opacity: number,

  枠線の色
  初期値：動かないと白系、動くと塗りつぶしと同じ色
  strokeStyle: string,

  可視
  初期値：true
  visible: boolean,
}
*/

/* TODO : 仮の色設定
          ここのStaticなどの管理は必要であれば別途管理したほうがいいかも知れない
*/
const ColorSetting = {
  Static: "gray",
  Switch: "red",
  Move: "yellow",
  UserStatic: "blue",
  UserMove: "green",
  Ball: "cyan",
  Wall: "#4ADE80", // TODO 背景色と同じ
}


/* TODO : 初期設定、スイッチ、ユーザー配置だけであればこれでもいいが、
          他に追加する場合は、同様の対処をするのか別の方法を考えるのか考える必要がある
*/
const getColor = (type, isStatic) => {
  let colorSet = {};
  switch (type) {
    case "default":
      if (isStatic) colorSet = { fillStyle: ColorSetting.Static }; // 初期配置且つ動かない
      else colorSet = { fillStyle: ColorSetting.Move }; // 初期配置且つ動く
      break;
    case "Switch":
      colorSet = { fillStyle: ColorSetting.Switch }; // スイッチ
      break;
    case "User":
      if (isStatic) colorSet = { fillStyle: ColorSetting.UserStatic }; // ユーザー配置且つ動かない
      else colorSet = { fillStyle: ColorSetting.UserMove };  // ユーザー配置且つ動く
      break;
    case "Ball":
      colorSet = { fillStyle: ColorSetting.Ball }; // ボール
      break;
    case "Wall":
      colorSet = { fillStyle: ColorSetting.Wall }; // 壁
      break;
  }

  return colorSet;
}

export default getColor;