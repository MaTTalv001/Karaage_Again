import React from 'react';
import { RoutePath } from "utils/RouteSetting";
import { useNavigate } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default ({ clearTime }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleStageSelect = () => {
    navigate(RoutePath.stageSelect.path); // ステージセレクトへの移動
  };

  const handleRetry = () => {
    window.location.reload(); // ブラウザをリロードしてリトライ
  };

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={true}
      />
      <div className="fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-black text-shadow-md z-50">
        <p>ゲームクリア！</p>
        <p>タイム {clearTime}</p>
        {/* ボタン追加 */}
        <div className="mt-8">
          <button onClick={handleStageSelect} className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 text-2xl rounded">
            ステージセレクト
          </button>
          <button onClick={handleRetry} className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 text-2xl rounded">
            リトライ
          </button>
        </div>
      </div>
    </>
  );
};
