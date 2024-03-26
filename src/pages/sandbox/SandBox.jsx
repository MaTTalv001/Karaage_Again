import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

const SandBox = () => {
  const [position, setPosition] = useState({ x: 250, y: 250 });
  const [enemies, setEnemies] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = useCallback((e) => {
    setPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      switch (e.key) {
        case "ArrowUp":
          newY -= 10;
          break;
        case "ArrowDown":
          newY += 10;
          break;
        case "ArrowLeft":
          newX -= 10;
          break;
        case "ArrowRight":
          newX += 10;
          break;
        default:
          return prevPosition;
      }

      return { x: newX, y: newY };
    });
  }, []);

  useEffect(() => {
    const enemySpawnInterval = setInterval(() => {
      // 新しい敵をプレイヤーの周囲にランダムに生成する
      const newEnemy = {
        id: Math.random(), // 簡単なIDの生成方法ですが、実際にはより堅牢な方法を検討してください
        x: position.x + (Math.random() - 0.5) * 200, // プレイヤーの位置の周囲に生成
        y: position.y + (Math.random() - 0.5) * 200,
        createdAt: Date.now(),
      };

      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }, 5000); // 5秒ごとに新しい敵を生成

    return () => clearInterval(enemySpawnInterval);
  }, [position]); // 依存配列にpositionを追加することで、プレイヤーの位置が変わるたびに敵の生成位置も更新されます

  useEffect(() => {
    window.addEventListener("keydown", movePlayer);

    return () => window.removeEventListener("keydown", movePlayer);
  }, [movePlayer]);

  useEffect(() => {
    const moveEnemies = () => {
      setEnemies(
        (prevEnemies) =>
          prevEnemies
            .map((enemy) => {
              // 敵の動きをプレイヤーに向けて計算
              const directionX = position.x > enemy.x ? 1 : -1;
              const directionY = position.y > enemy.y ? 1 : -1;
              return {
                ...enemy,
                x: enemy.x + directionX * (Math.random() * 2), // 敵の速度をランダムに調整
                y: enemy.y + directionY * (Math.random() * 2),
              };
            })
            .filter((enemy) => Date.now() - enemy.createdAt < 10000) // 生成から10秒後に消滅
      );
    };

    // 敵の位置を0.5秒ごとに更新
    const intervalId = setInterval(moveEnemies, 500);

    return () => clearInterval(intervalId);
  }, [position]); // 依存配列にpositionを追加して、プレイヤーの位置が更新されるたびに敵も追従するように

  useEffect(() => {
    const checkCollision = () => {
      enemies.forEach((enemy) => {
        if (
          Math.abs(position.x - enemy.x) < 20 &&
          Math.abs(position.y - enemy.y) < 20
        ) {
          setGameOver(true);
        }
      });
    };

    checkCollision();
  }, [position, enemies]);

  return (
    <div className="pt-20">
      {gameOver ? (
        <div>Game Over!</div>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundColor: "lightgrey",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              width: "20px",
              height: "20px",
              backgroundColor: "red",
            }}
          ></div>
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              style={{
                position: "absolute",
                top: enemy.y,
                left: enemy.x,
                width: "20px",
                height: "20px",
                backgroundColor: "black",
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SandBox;
