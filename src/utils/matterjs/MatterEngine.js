import { Composite, Engine, Render, Runner } from "matter-js";
import { GameHeight, GameWidth } from "utils/GameSetting";

export class MatterEngine {
  constructor() {
    this.engine = Engine.create();
  }

  /**
   * @method セットアップ
   * @param {string} 表示する要素のクラス名
   * @description 表示する要素のクラス名を指定して、表示設定を行う
   */
  setup(elementName) {
    const parent = document.body.querySelector(elementName);
    this.render = Render.create({
      element: parent,
      engine: this.engine,
      options: {
        width: GameWidth,
        height: GameHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    Render.run(this.render);
  }

  /**
   * @method 実行
   * @description 登録したオブジェクトの実行
   */
  run() {
    Runner.run(Runner.create(), this.engine);
  }

  clear() {
    Render.stop(this.render);
    Runner.stop(this.engine);
    this.clearComposite(this.engine.world);
    this.unregisterObjects();
  }

  /**
   * @method オブジェクト登録
   * @param {Bodies} object 登録したいオブジェクト
   * @description オブジェクトを登録する。配列も可能。
   */
  registerObject(object) {
    if (Array.isArray(object)) {
      object.forEach((item) => {
        if (typeof item.getObject === 'function') {
          Composite.add(this.engine.world, item.getObject());
          return
        }
        Composite.add(this.engine.world, item);
      });
      return;
    }

    if (typeof object.getObject === 'function') {
      Composite.add(this.engine.world, object.getObject());
      return;
    }
    Composite.add(this.engine.world, object);
  }

  createComposite() {
    return Composite.create();
  }

  registerObjectInComposite(composite, object) {
    if (Array.isArray(object)) {
      object.forEach((item) => {
        if (typeof item.getObject === 'function') {
          Composite.add(composite, item.getObject());
          return
        }
        Composite.add(composite, item);
      });
      return;
    }
    Composite.add(composite, object);
  }

  clearComposite(composite) {
    Composite.clear(composite);
  }

  /**
   * @method オブジェクト登録解除
   * @description 登録したオブジェクトを解除する
   */
  unregisterObjects() {
    Composite.clear(this.engine.world, false, true);
  }

  /* ゲッター */
  getEngine() {
    return this.engine;
  }

  getRender() {
    return this.render;
  }

  setRenderMouse(mouse) {
    this.render.mouse = mouse;
  }
}
