import { useEffect, useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  const fallSpeed = 2;
  const [catcherX, setCatcherX] = useState(50); // percent
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [game, setGame] = useState({
    blossoms: [],
    misses: 0,
  });

  function addOneToScore() {
    setScore((s) => s + 1);
  }

  function startGame() {
    setScore(0);
    setGame({ blossoms: [], misses: 0 });
    setIsRunning(true);
  }

  function stopGame() {
    setIsRunning(false);
  }

  function spawnBlossom() {
    const newBlossom = {
      id: Date.now(),
      x: Math.floor(Math.random() * 90) + 5,
      y: 0,
    };

    setGame((prev) => ({
      ...prev,
      blossoms: [...prev.blossoms, newBlossom],
    }));
  }

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      spawnBlossom();
    }, 800);

    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const tickId = setInterval(() => {
      setGame((prev) => {
        const moved = prev.blossoms.map((b) => ({ ...b, y: b.y + fallSpeed }));
        const stillOnScreen = moved.filter((b) => b.y <= 110);
        const fellOffCount = moved.length - stillOnScreen.length;

        return {
          ...prev,
          blossoms: stillOnScreen,
          misses: prev.misses + fellOffCount,
        };
      });
    }, 50);

    return () => clearInterval(tickId);
  }, [isRunning, fallSpeed]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isRunning) return;

      if (e.key === "ArrowLeft") {
        setCatcherX((x) => Math.max(0, x - 5));
      }

      if (e.key === "ArrowRight") {
        setCatcherX((x) => Math.min(100, x + 5));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  return (
    <div className="gameWrap">
      <Controls
        onAddScore={addOneToScore}
        onAddMiss={() => {}} // temporary; we’ll remove this button soon
        playerName={playerName}
        onChangePlayerName={onChangePlayerName}
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
        isRunning={isRunning}
        onStart={startGame}
        onStop={stopGame}
      />

      <ScoreBoard
        score={score}
        misses={game.misses}
        playerName={playerName}
        difficulty={difficulty}
        isRunning={isRunning}
      />

      <div className="arena">
        {game.blossoms.map((b) => (
          <Blossom key={b.id} x={b.x} y={b.y} />
        ))}

        <div
          className="catcher"
          style={{ left: `${catcherX}%` }}
          aria-label="Suki catcher"
        >
          🐾🐾
        </div>
      </div>
    </div>
  );
}
