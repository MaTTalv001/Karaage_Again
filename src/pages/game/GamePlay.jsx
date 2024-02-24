import { Game } from 'components/Game';
import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { State } from 'utils/GameSetting';
import { getStageById } from 'services/supabaseStages';

export const GamePlay = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [gameClear, setGameClear] = useState(false);
  const onClickPlay = useRef();
  const onClickBallReset = useRef();
  const onClickPlacementReset = useRef();
  const [gameData, setGameData] = useState(null);
  const GAME_START_DELAY = 300;

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
    };
  }, [id]);

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
    }
  }, [loading]);

  useEffect(() => {
    if (gameClear) {
      // TODO : ゲームクリア処理や演出
      alert("ゲームクリア");
      // TODO : クリア後の演出が終わったらステージ選択画面に遷移
    }
  }, [gameClear]);

  const gameStart = () => {
    // TODO : ゲームスタート演出
    alert("ゲームスタート");
  };

  const handlePlacementReset = useCallback(() => {
    onClickPlacementReset.current();
  }, [onClickPlacementReset]);

  const handleBallReset = useCallback(() => {
    onClickBallReset.current();
  }, [onClickBallReset]);

  const handleClickPlay = useCallback(() => {
    onClickPlay.current();
  }, [onClickPlay]);

  return (
    <>
      {loading ? <div>loading...</div> :
        <div className={`w-[1200px] m-auto`}>
          <div className="w-full m-auto mt-14 flex flex-col font-[DotGothic16] ">
            <div className='w-full flex'>
              <div className='w-1/4 grid grid-flow-col items-center text-start'>
                <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2' onClick={handlePlacementReset} aria-label="ユーザーは位置オブジェクトのリセット">Reset</button>
                <h3 className='text-xl mx-auto'>Placement</h3>
              </div>
              <div className='w-3/4 flex flex-col'>
                <div className='flex justify-between items-center mx-5'>
                  <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2 px-4 my-2' onClick={handleBallReset} aria-label="ボールの位置をリセット">BallReset</button>
                  <h3 className='text-2xl'>{gameData.title}</h3>
                  <button className='hover:text-slate-500 text-slate-950 hover:bg-red-200 bg-red-400 transition-all py-2 px-4 my-2' onClick={handleClickPlay} aria-label="再生">▶</button>
                </div>
              </div>
            </div>
            <Game
              stageData={gameData.content}
              setOnClickPlay={onClickPlay}
              setOnClickPlacementReset={onClickPlacementReset}
              setOnClickBallReset={onClickBallReset}
              setGameClear={setGameClear} />
          </div>
        </div>
      }
    </>
  )
}