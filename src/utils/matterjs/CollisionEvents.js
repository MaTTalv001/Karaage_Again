import { Events } from "matter-js";

class CollisionEvents {
  constructor(engine) {
    this.engine = engine;
    this.switchCallback = null;
    this.collisionStartCallback = null;
  }

  /**
    * @method タッチイベント
    * @param {function} callback 衝突時のコールバック関数
    * @description 衝突時のコールバック関数を登録する
   */
  touchEvents(callback) {
    this.collisionStartCallback = function (event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        callback(pairs[i].bodyA, pairs[i].bodyB);
      }
    };
    Events.on(this.engine, 'collisionStart', this.collisionStartCallback);
  }

  /**
    * @method タッチイベント削除
    * @description 登録したタッチイベントを削除する
   */
  removeTouchEvents() {
    if (this.collisionStartCallback) {
      this.events.off(this.engine, 'collisionStart', this.collisionStartCallback);
      this.collisionStartCallback = null;
    }
  }

  /**
    * TODO : このファイルでやることじゃないかも知れない・・・
    * @method スイッチ押下
    * @description スイッチ押下時にイベント発火
   */
  pushSwitch(callback) {
    this.switchCallback = callback;
    this.touchEvents(this.triggerSwitch);
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

export default CollisionEvents;
