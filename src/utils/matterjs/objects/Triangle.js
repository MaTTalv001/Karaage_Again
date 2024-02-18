import { Bodies } from "matter-js";
import { MatterObject } from "./MatterObject";

class Triangle extends MatterObject {
  DefaultHeight = 100;
  /**
   * @method 三角形生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} height 高さ
   * @param {object} option オプション
   * @description 三角形を生成
   */
  constructor(
    x,
    y,
    type = "default",
    height = this.DefaultHeight,
    option = {},
  ) {
    super(x, y, type);
    this.object = Bodies.polygon(x, y, 3, height, this.getOptionAddColor(option, type));
  }
}

export { Triangle };