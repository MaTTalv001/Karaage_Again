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
    // ステージ番号(stage+番号)
    const stageNumber = `stage${this.theme}`;

    // フォルダ内のpng画像をWebpackerで抽出（この時点では全ステージの画像を取得）
    const images = require.context(
      "../../../assets/imgs/circle",
      true,
      /\.png$/
    );

    // ステージに応じた画像ファイルのパスを配列として取得
    const stageTextures = images
      .keys()
      .filter((path) => path.includes(stageNumber)) //stage番号を含む画像のみ抽出
      .map(images);

    // テクスチャのパスをランダムに選択
    const randomTexture =
      stageTextures[Math.floor(Math.random() * stageTextures.length)];

    // optionがnullまたはundefinedでないことを確認し、"render"と"sprite"オブジェクトが存在するかをチェック
    if (!option.render) option.render = {};
    if (!option.render.sprite) option.render.sprite = {};

    // ランダムに選んだテクスチャで"texture"を更新
    option.render.sprite.texture = randomTexture;

    return option;
  }
}

export { Circle };
