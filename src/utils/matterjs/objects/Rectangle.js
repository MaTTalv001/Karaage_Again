import { Bodies } from "matter-js";
import { MatterObject } from "./MatterObject";

class Rectangle extends MatterObject {
  DefaultWidth = 100;
  DefaultHeight = 100;

  /**
   * @method 初期化
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} heigth 高さ
   * @param {object} option オプション
   * @param {bool} isSpawn スポーンオブジェクトか否か
   */
  constructor(
    x = this.posX,
    y = this.posY,
    type = "default",
    width = this.DefaultWidth,
    height = this.DefaultHeight,
    option = {},
  ) {
    super(x, y, type);

    this.object = Bodies.rectangle(x, y, width, height, this.getOptionAddColor(option, type));
  }
}

export { Rectangle };