import { Events } from "matter-js";

export class MatterEvents {
  constructor(engine) {
    this.engine = engine;
    this.afterUpdateEvents = [];
    this.beforeUpdateEvents = [];
    this.afterRenderEvents = [];
    this.beforeRenderEvents = [];
    this.clear();
  }

  clear() {
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
    if (this.afterUpdateCallback) return;

    this.afterUpdateCallback = (e) => {
      this.afterUpdateEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.engine, "afterUpdate", this.afterUpdateCallback);
  }

  // TODO : 個別でイベント削除の必要が出たら改めて仕様を考え実装

  /**
   * @method 更新後イベント全解除
   * @description 登録した更新後イベントを全て解除する
   */
  allOffAfterUpdateEvent() {
    if (!this.afterUpdateCallback) return;
    Events.off(this.engine, "afterUpdate", this.afterUpdateCallback);
    this.afterUpdateEvents = [];
    this.afterUpdateCallback = null;
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
    if (this.beforeUpdateCallback) return;
    this.beforeUpdateCallback = (e) => {
      this.beforeUpdateEvents.forEach((event) => {
        event(e);
      });
    };
    Events.on(this.engine, "beforeUpdate", this.beforeUpdateCallback);
  }

  // TODO : 個別でイベント削除の必要が出たら改めて仕様を考え実装

  /**
   * @method 更新前イベント全解除
   * @description 登録した更新前イベントを全て解除する
   */
  allOffBeforeUpdateEvent() {
    if (!this.beforeUpdateCallback) return;
    Events.off(this.engine, "beforeUpdate", this.beforeUpdateCallback);
    this.beforeUpdateCallback = null;
    this.beforeUpdateEvents = [];
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
    this.afterRenderCallback = (e) => {
      this.afterRenderEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.engine, "afterRender", this.afterRenderCallback);
  }

  // TODO : 個別でイベント削除の必要が出たら改めて仕様を考え実装

  /**
   * @method 描画後イベント全解除
   * @description 登録した描画後イベントを全て解除する
   */
  allOffAfterRenderEvent() {
    if (!this.afterRenderCallback) return;
    Events.off(this.engine, "afterRender");
    this.afterRenderEvents = [];
    this.afterRenderCallback = null;
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
    this.beforeRenderCallback = (e) => {
      this.beforeRenderEvents.forEach((event) => {
        event(e);
      });
    }
    Events.on(this.engine, "beforeRender", this.beforeRenderCallback);
  }

  // TODO : 個別でイベント削除の必要が出たら改めて仕様を考え実装

  /**
   * @method 描画前イベント全解除
   * @description 登録した描画前イベントを全て解除する
   */
  allOffBeforeRenderEvent() {
    if (!this.beforeRenderCallback) return;
    Events.off(this.engine, "beforeRender", this.beforeRenderCallback);
    this.beforeRenderEvents = [];
    this.beforeRenderCallback = null;
  }
}