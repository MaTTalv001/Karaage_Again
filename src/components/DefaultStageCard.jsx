import React, { useState, useEffect } from 'react';
import { STAGE_PER_PAGE } from 'utils/Paginate';
import { Link } from 'react-router-dom';
import { RoutePath } from 'utils/RouteSetting';
import { getStagesRange, getStagesCount } from 'services/supabaseStages';

export const DefaultStageCard = () => {
  // 現在表示されているページに関するステート
  const [currentPage, setCurrentPage] = useState(1);

  // 表示するステージのリストに関するステート
  const [stages, setStages] = useState([]);

  // ステージの総数に関するステート
  const [totalStages, setTotalStages] = useState(0);

  // エラーメッセージに関するステート
  const [error, setError] = useState('');

  useEffect(() => {
    // データベースに登録されているステージの総数を取得する
    // ページネーションを実装する際、全ページ数の計算に必要なため
    const fetchTotalStages = async () => {
      try {
        const response = await getStagesCount();
        setTotalStages(response.count);
         // エラーハンドリングについては、拡張の余地ありあり
      } catch (error) {
        setError('ステージ情報を取得中にエラーが発生しました。');
        console.error(error);
      }
    };

    // ユーザーが現在表示しているページに合わせて、データベースのステージ情報を区切る
    const fetchStages = async () => {
      try {
        const startPage = (currentPage - 1) * STAGE_PER_PAGE;
        const response = await getStagesRange({ start: startPage, end: startPage + STAGE_PER_PAGE - 1 });
        setStages(response.data);
         // エラーハンドリングについては、拡張の余地ありあり
    } catch(error) {
      setError('ステージ情報を取得中にエラーが発生しました。');
      console.error(error);
    }
  };

    fetchTotalStages();
    fetchStages();
  }, [currentPage]);

  // エラーハンドリングについては、拡張の余地ありあり
  if (error) {
    return <div className="error">{error}</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* 1つのステージを表示する要素 */}
      <div className="grid grid-cols-2 gap-4">
        {stages.map(({ id, title, image }) => (
          <div key={id} className="relative m-2 p-6 border border-gray-300 shadow-lg rounded-md bg-white">
            <div className="flex">
               {/* ↓　【fix】このタグ調査、修正する。 */}
              <div className="flex-grow"></div>
              {/* ↓　【fix】src内のassetsから画像データを取得する方法が分からなかったため、現状はpublicから取得しています。 */}
              <img src={`${process.env.PUBLIC_URL}/assets/imgs/defaultstage/${image}.png`} alt={title} />
            </div>
            <p className="absolute top-16 left-4 text-6xl font-bold">{title}</p>
            <Link
              to={RoutePath.gamePlay.path(id)}
              className="absolute bottom-14 left-16 bg-red-500 text-yellow-300 px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring text-4xl">
                ▶ Play
            </Link>
          </div>
        ))}
      </div>

      {/* ページネーションのボタン部分 */}
      <div className="flex justify-center mt-8">
        <button onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
        className="bg-gray-300 text-black px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50">前のページへ</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= Math.ceil(totalStages / STAGE_PER_PAGE)}
        className="bg-gray-300 text-black px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50">次のページへ</button>
      </div>
    </div>
  );
};