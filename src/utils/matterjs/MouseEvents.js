import { Events, Mouse, MouseConstraint } from "matter-js";

export class MouseEvents {
  /**
   * @method コンストラクタ
   * @description 初期化
   */
  constructor(render, engine) {
    this.mouse = Mouse.create(render.canvas);
    this.mouseConstraint = MouseConstraint.create(engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2, // マジックナンバー
        render: {
          visible: false,
        },
      },
    });
    this.clickEvents = [];
    this.dragEvents = [];
    this.clickUpEvents = [];
    this.clear();
  }

  getMouse() {
    return this.mouse;
  }

  getMouseConstraint() {
    return this.mouseConstraint;
  }

  clear() {
    this.offClickEvents();
    this.offDragEvents();
    this.offClickUpEvents();
  }

  /**
   * @method クリックイベント登録
   * @param {function} events 登録したいイベントコールバック
   * @description クリックイベントを登録する。配列も可能。引数はイベント
   */
  registerClickEvent(callback) {
    this.clickEvents.push(callback);
  }

  /**
   * @method クリックイベント実行
   * @description クリックイベントを実行する
   */
  onClickEvents() {
    this.clickCallback = (e) => {
      this.clickEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.mouseConstraint, "mousedown", this.clickCallback);
  }

  /**
   * @method クリックイベント解除
   * @description 登録したクリックイベントを解除する
   */
  offClickEvents() {
    if (!this.clickCallback) return;
    Events.off(this.mouseConstraint, "mousedown", this.clickCallback);
    this.clickCallback = null;
    this.clickEvents = [];
  }

  /**
   * @method ドラッグイベント登録
   * @param {function} callback 登録したいイベントコールバック
   */
  registerDragEvent(callback) {
    this.dragEvents.push(callback);
  }

  /**
   * @method ドラッグイベント実行
   * @description ドラッグイベントを実行する
   */
  onDragEvents() {
    this.dragCallback = (e) => {
      this.dragEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.mouseConstraint, "mousemove", this.dragCallback);
  }

  offDragEvents() {
    if (!this.dragCallback) return;
    Events.off(this.mouseConstraint, "mousemove", this.dragCallback);
    this.dragCallback = null;
    this.dragEvents = [];
  }

  registerClickUpEvent(callback) {
    this.clickUpEvents.push(callback);
  }

  onClickUpEvents() {
    this.clickUpCallback = (e) => {
      this.clickUpEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.mouseConstraint, "mouseup", this.clickUpCallback);
  }

  offClickUpEvents() {
    if (!this.clickUpCallback) return;
    Events.off(this.mouseConstraint, "mouseup", this.clickUpCallback);
    this.clickUpCallback = null;
    this.clickUpEvents = [];
  }
}
