import { Game } from 'components/Game';
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { State } from 'utils/GameSetting';
import { RoutePath } from 'utils/RouteSetting';
import { getStageById } from 'services/supabaseStages';

export const GamePlay = () => {
  const { id } = useParams(); // ゲームID
  const [loading, setLoading] = useState(true);
  const [gameClear, setGameClear] = useState(false);
  const onClickPlay = useRef();
  const onClickBallReset = useRef();
  const onClickPlacementReset = useRef();
  const [gameData, setGameData] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (gameData) {
      setLoading(false);
    }
  }, [gameData]);

  useEffect(() => {
    if (gameClear) {
      // TODO : ゲームクリア処理や演出
      alert("ゲームクリア");
      navigator(RoutePath.stageSelect.path);
    }
  }, [gameClear]);


  const fetchData = async () => {
    let { result, data } = await getStageById(id);
    if (result === "error") {
      // TODO : エラー処理 暫定でステージ選択画面に遷移
      alert('存在しないページです');
      navigator(RoutePath.stageSelect.path);
      return;
    }

    // 公開状況
    if (data.state !== State.release) {
      alert('存在しないページです');
      // 404ページに遷移させたい 現在ページがないので暫定
      navigator(RoutePath.selectStage.path);
      return;
    }
    setGameData(data);
    setLoading(false);
  };

  const handlePlacementReset = () => {
    onClickPlacementReset.current();
  }

  const handleBallReset = () => {
    onClickBallReset.current();
  }

  const handleClickPlay = () => {
    onClickPlay.current();
  }

  return (
    <>
      {loading ? <div>loading...</div> :
        <div className={`w-[1200px] m-auto`}>
          <div className="w-full m-auto mt-14 flex flex-col font-[DotGothic16] ">
            <div className='w-full flex'>
              <div className='w-1/4 grid grid-flow-col items-center text-start'>
                <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2' onClick={handlePlacementReset}>Reset</button>
                <h3 className='text-xl mx-auto'>Placement</h3>
              </div>
              <div className='w-3/4 flex flex-col'>
                <div className='flex justify-between items-center mx-5'>
                  <button className='hover:bg-blue-200 bg-blue-400 hover:text-slate-500 text-slate-950 transition-all py-2 px-4 my-2' onClick={handleBallReset}>BallReset</button>
                  <h3 className='text-2xl'>{gameData.title}</h3>
                  <button className='hover:text-slate-500 text-slate-950 hover:bg-red-200 bg-red-400 transition-all py-2 px-4 my-2' onClick={handleClickPlay}>▶</button>
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