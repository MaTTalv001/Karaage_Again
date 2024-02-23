import { Events } from "matter-js";

export class CollisionEvents {
  constructor(engine) {
    this.engine = engine;
    this.touchEvents = [];
    this.clear();
  }

  clear() {
    this.removeTouchEvents();
  }

  /**
   * @method 衝突開始イベント登録
   * @param {function} callback 衝突時のコールバック関数
   */
  registerCollisionStartEvent(callback) {
    this.touchEvents.push(callback);
  }

  /**
    * @method タッチイベント
    * @description 衝突時のコールバック関数を実行する
   */
  onTouchEvents() {
    this.collisionStartCallback = (e) => {
      this.touchEvents.forEach((event) => {
        e.pairs.forEach((pair) => {
          event(pair.bodyA, pair.bodyB);
        });
      });
    };
    Events.on(this.engine, 'collisionStart', this.collisionStartCallback);
  }

  /**
    * @method タッチイベント削除
    * @description 登録したタッチイベントを削除する
   */
  removeTouchEvents() {
    if (!this.collisionStartCallback) return;
    Events.off(this.engine, 'collisionStart', this.collisionStartCallback);
    this.collisionStartCallback = null;
    this.touchEvents = [];
  }

  /**
    * TODO : このファイルでやることじゃないかも知れない・・・
    * @method スイッチ押下
    * @description スイッチ押下時にイベント発火
   */
  pushSwitch(callback) {
    this.switchCallback = callback;
    this.registerCollisionStartEvent(this.triggerSwitch);
  }

  /**
    * TODO : このファイルでやることじゃないかも知れない・・・
    * @method スイッチ押下時の処理
    * @param {object} bodyA 衝突したオブジェクトA
    * @param {object} bodyB 衝突したオブジェクトB
    * @description スイッチ押下時の処理
   */
  triggerSwitch = (bodyA, bodyB) => {
    /**
     * TODO : スイッチに触れた判定していなので、スイッチに向きに合わせた判定処理が必要
     * 参考：https://chat.runteq.jp/runteq/pl/syz5hgi66pf85y637wrs13h1qa
     */
    if (bodyA.label === "switch" && bodyB.label === "ball") {
      // スイッチが衝突したときの処理
      if (this.switchCallback) {
        this.switchCallback();
      }
    }
  }
}


