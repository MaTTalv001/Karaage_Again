import { Bodies, Body } from "matter-js";
import { MatterObject } from "./MatterObject";

class Circle extends MatterObject {
  DefaultRadius = 25;

  constructor(
    theme,
    x,
    y,
    type = "default",
    radius = this.DefaultRadius,
    option = {}
  ) {
    super(x, y, type);
    this.theme = theme;
    this.object = Bodies.circle(x, y, radius, this.getOptionAddColor(option));
    this.object.getParent = () => this;
    this.initialScale = radius;
  }

  // このメソッド内でoptionの"texture"をランダムに選んだ値で更新
  getOptionAddColor(option) {
    //ステージ番号
    const stageNumber = this.theme;
    //10までの連番画像パスを生成
    const textures = Array.from(
      { length: 10 },
      (v, i) => `/assets/imgs/objects/circle/${stageNumber}/${i + 1}.png`
    );

    // テクスチャのパスをランダムに選択
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];

    // optionがnullまたはundefinedでないことを確認し、"render"と"sprite"オブジェクトが存在するかをチェック
    if (!option.render) option.render = {};
    if (!option.render.sprite) option.render.sprite = {};

    // ランダムに選んだテクスチャで"texture"を更新
    option.render.sprite.texture = randomTexture;

    return option;
  }
}

export { Circle };
