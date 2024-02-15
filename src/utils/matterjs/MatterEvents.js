import { Events } from "matter-js";

export class MatterEvents {
  constructor(engine) {
    this.engine = engine;
    this.afterUpdateEvents = [];
    this.beforeUpdateEvents = [];
    this.afterRenderEvents = [];
    this.beforeRenderEvents = [];
    // イベントが残っていては困るので全削除
    this.allOffAfterRenderEvent();
    this.allOffAfterUpdateEvent();
    this.allOffBeforeRenderEvent();
    this.allOffBeforeUpdateEvent();
  }

  /**
   * @method 更新後イベント登録
   * @param {function} event 登録したいイベント
   * @description 更新後イベントを登録する
   */
  registerAfterUpdateEvent(event) {
    this.afterUpdateEvents.push(event);
  }

  /**
   * @method 更新後イベント発火
   * @description 登録した更新後イベントを発火する
   * NOTE : 厳密には発火するのは更新後です。
   */
  onAfterUpdateEvent() {
    this.afterUpdateEvents.forEach((event) => {
      Events.on(this.engine, "afterUpdate", (e) => {
        event(e);
      });
    });
  }

  /**
   * @method 更新後イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した更新後イベントを解除する
   */
  offAfterUpdateEvent(event) {
    Events.off(this.engine, "afterUpdate", (e) => {
      event(e);
    });
  }

  /**
   * @method 更新後イベント全解除
   * @description 登録した更新後イベントを全て解除する
   */
  allOffAfterUpdateEvent() {
    Events.off(this.engine, "afterUpdate");
  }

  /**
   * @method 更新前イベント登録
   * @param {function} event 登録したいイベント
   * @description 更新前イベントを登録する
   */
  registerBeforeUpdateEvent(event) {
    this.beforeUpdateEvents.push(event);
  }

  /**
   * @method 更新前イベント発火
   * @description 登録した更新前イベントを発火する
   * NOTE : 厳密には発火するのは更新前です。
   */
  onBeforeUpdateEvent() {
    this.beforeUpdateEvents.forEach((event) => {
      Events.on(this.engine, "beforeUpdate", (e) => {
        event(e);
      });
    });
  }

  /**
   * @method 更新前イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した更新前イベントを解除する
   */
  offBeforeUpdateEvent(event) {
    Events.off(this.engine, "beforeUpdate", (e) => {
      event(e);
    });
  }

  /**
   * @method 更新前イベント全解除
   * @description 登録した更新前イベントを全て解除する
   */
  allOffBeforeUpdateEvent() {
    Events.off(this.engine, "beforeUpdate");
  }

  /**
   * @method 描画後イベント登録
   * @param {function} event 登録したいイベント
   * @description 描画後イベントを登録する
   */
  registerAfterRenderEvent(event) {
    this.afterRenderEvents.push(event);
  }

  /**
   * @method 描画後イベント発火
   * @description 登録した描画後イベントを発火する
   * NOTE : 厳密には発火するのは描画後です。
   */
  onAfterRenderEvent() {
    this.afterRenderEvents.forEach((event) => {
      Events.on(this.engine, "afterRender", (e) => {
        event(e);
      });
    });
  }

  /**
   * @method 描画後イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した描画後イベントを解除する
   */
  offAfterRenderEvent(event) {
    Events.off(this.engine, "afterRender", (e) => {
      event(e);
    });
  }

  /**
   * @method 描画後イベント全解除
   * @description 登録した描画後イベントを全て解除する
   */
  allOffAfterRenderEvent() {
    Events.off(this.engine, "afterRender");
  }

  /**
   * @method 描画前イベント登録
   * @param {function} event 登録したいイベント
   * @description 描画前イベントを登録する
   */
  registerBeforeRenderEvent(event) {
    this.beforeRenderEvents.push(event);
  }

  /**
   * @method 描画前イベント発火
   * @description 登録した描画前イベントを発火する
   * NOTE : 厳密には発火するのは描画前です。
   */
  onBeforeRenderEvent() {
    this.beforeRenderEvents.forEach((event) => {
      Events.on(this.engine, "beforeRender", (e) => {
        event(e);
      });
    });
  }

  /**
   * @method 描画前イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した描画前イベントを解除する
   */
  offBeforeRenderEvent(event) {
    Events.off(this.engine, "beforeRender", (e) => {
      event(e);
    });
  }

  /**
   * @method 描画前イベント全解除
   * @description 登録した描画前イベントを全て解除する
   */
  allOffBeforeRenderEvent() {
    Events.off(this.engine, "beforeRender");
  }
}