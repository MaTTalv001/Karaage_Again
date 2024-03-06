import { Game } from "components/Game";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { State } from "utils/GameSetting";
import { getStageById } from "services/supabaseStages";

export const GamePlay = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const onClickPlay = useRef();
  const onClickBallReset = useRef();
  const onClickPlacementReset = useRef();
  const [gameData, setGameData] = useState(null);
  const [countTime, setCountTime] = useState(0);
  const [countIntervalId, setCountIntervalId] = useState(null);
  // ゲームスタート演出の遅延時間
  const GAME_START_DELAY = 300;
  // ミリ秒から秒に変換
  const SECONDS_TO_MILLISECONDS = 1000;

  // useEffectを先に書くと、useCallbackの関数が使えないので、useCallbackを先に書く
  const fetchData = useCallback(async () => {
    try {
      let { result, data } = await getStageById(id);
      if (result === "error") {
        throw new Error("505");
      }

      if (data.state !== State.release) {
        throw new Error("404");
      }

      setGameData(data);
    } catch (error) {
      if (error.message.includes("404")) {
        // TODO : 404ページに遷移？
        alert("存在しないページです");
        return;
      }
      // TODO : それ以外のエラー。モーダルなどで対処したい
    }
  }, [id]);

  // ページ読み込み時にデータを取得
  // 取得したデータの変更があるたびに走るが、fetchDataはuseCallBackで囲っているので変更がなければ再生成されない
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (gameData) {
      setLoading(false);
    }
  }, [gameData]);

  useEffect(() => {
    if (loading) return;
    // NOTE : ローディング終了直後だとレンダリングがされてないのでちょっと待つ
    const setTimeoutId = setTimeout(() => {
      // ゲームスタート演出
      gameStart();
    }, GAME_START_DELAY);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [loading]);

  const transformTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    // ミリ秒までやると再レンダリングの負荷がかかりそうなので、秒までにしています
    return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
  };

  // ゲームクリア時の処理
  // 先に宣言しないとuseEffect内で使えない
  const gameCompleted = useCallback(() => {
    clearInterval(countIntervalId);
    alert(`ゲームクリア！\nクリアタイム ${transformTime(countTime)}`);
  }, [countIntervalId, countTime, transformTime]);

  // gameCompletedはuseCallbackで囲っているので、変更がなければ再生成されない
  useEffect(() => {
    if (isGameCompleted) {
      gameCompleted();
    }
  }, [isGameCompleted, gameCompleted]);

  // 2桁表示
  const twoDigits = (num) => {
    return ("00" + num).slice(-2);
  };

  const gameStart = () => {
    // TODO : ゲームスタート演出
    alert("ゲームスタート");
    const intervalId = setInterval(() => {
      setCountTime((prev) => prev + 1);
    }, SECONDS_TO_MILLISECONDS);
    setCountIntervalId(intervalId);
  };

  // リセットボタンの処理
  const handlePlacementReset = useCallback(() => {
    onClickPlacementReset.current();
  }, [onClickPlacementReset]);

  // ボールリセットボタンの処理
  const handleBallReset = useCallback(() => {
    onClickBallReset.current();
  }, [onClickBallReset]);

  // 再生ボタンの処理
  const handleClickPlay = useCallback(() => {
    onClickPlay.current();
  }, [onClickPlay]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={`w-[1200px] m-auto`}>
          <div className="w-full m-auto mt-14 flex flex-col font-[DotGothic16] ">
            <div className="w-full flex">
              <div className="w-1/4 grid grid-flow-col items-center text-start">
                <button
                  className="hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2"
                  onClick={handlePlacementReset}
                  aria-label="ユーザーは位置オブジェクトのリセット"
                >
                  Reset
                </button>
                <h3 className="text-xl mx-auto">Placement</h3>
              </div>
              <div className="w-3/4 flex flex-col">
                <div className="flex justify-between items-center mx-5">
                  <button
                    className="hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2 px-4 my-2"
                    onClick={handleBallReset}
                    aria-label="ボールの位置をリセット"
                  >
                    BallReset
                  </button>
                  <h3 className="text-2xl">{gameData.title}</h3>
                  <p>{transformTime(countTime)}</p>
                  <button
                    className="hover:text-slate-500 text-slate-950 hover:bg-red-200 bg-red-400 transition-all py-2 px-4 my-2"
                    onClick={handleClickPlay}
                    aria-label="再生"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
            <Game
              stageData={gameData.content}
              setOnClickPlay={onClickPlay}
              setOnClickPlacementReset={onClickPlacementReset}
              setOnClickBallReset={onClickBallReset}
              setIsGameCompleted={setIsGameCompleted}
              stageId={id}
            />
          </div>
        </div>
      )}
    </>
  );
};
