import { Events, Mouse, MouseConstraint } from "matter-js";

class MouseEvents {
  /**
   * @method コンストラクタ
   * @description 初期化
   */
  constructor(render, engine) {
    this.mouse = Mouse.create(render.canvas);
    this.mouseConstraint = MouseConstraint.create(engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    this.clickEvents = [];
    this.dragEvents = [];
    this.clickUpEvents = [];
  }

  getMouse() {
    return this.mouse;
  }

  getMouseConstraint() {
    return this.mouseConstraint;
  }

  /**
   * @method クリックイベント登録
   * @param {function} events 登録したいイベントコールバック
   * @description クリックイベントを登録する。配列も可能。引数はイベント
   */
  registerClickEvent(callback) {
    if (Array.isArray(callback)) {
      this.clickEvents.push(...callback);
      return;
    }
    this.clickEvents.push(callback);
  }

  /**
   * @method クリックイベント実行
   * @description クリックイベントを実行する
   */
  onClickEvents() {
    Events.on(this.mouseConstraint, "mousedown", (e) => {
      this.clickEvents.forEach((event) => {
        event(e);
      });
    });
  }

  offClickEvents() {
    Events.off(this.mouseConstraint, "mousedown");
  }

  /**
   * @method ドラッグイベント登録
   * @param {function} callback 登録したいイベントコールバック
   */
  registerDragEvent(callback) {
    if (Array.isArray(callback)) {
      this.dragEvents.push(...callback);
      return;
    }
    this.dragEvents.push(callback);
  }

  /**
   * @method ドラッグイベント実行
   * @description ドラッグイベントを実行する
   */
  onDragEvents() {
    Events.on(this.mouseConstraint, "mousemove", (e) => {
      this.dragEvents.forEach((event) => {
        event(e);
      });
    });
  }

  offDragEvents() {
    Events.off(this.mouseConstraint, "mousemove");
  }

  registerClickUpEvent(callback) {
    if (Array.isArray(callback)) {
      this.clickUpEvents.push(...callback);
      return;
    }
    this.clickUpEvents.push(callback);
  }

  onClickUpEvents() {
    Events.on(this.mouseConstraint, "mouseup", (e) => {
      this.clickUpEvents.forEach((event) => {
        event(e);
      });
    });
  }

  offClickUpEvents() {
    Events.off(this.mouseConstraint, "mouseup");
  }
}

export default MouseEvents;
