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
  // --- constants ---
  const fallSpeed =
    difficulty === "easy" ? 1.6 : difficulty === "hard" ? 2.8 : 2.2;
  const spawnMs =
    difficulty === "easy" ? 900 : difficulty === "hard" ? 450 : 650;
  const catchLineY = 85;
  const catchWindowX = 6;
  const catchZoneHeight = 6;

  const maxMisses = difficulty === "easy" ? 10 : difficulty === "hard" ? 5 : 7;

  // --- state ---
  const [isRunning, setIsRunning] = useState(false);
  const [catcherX, setCatcherX] = useState(50);

  // Keep score + misses INSIDE ONE state object to avoid race/StrictMode issues
  const [game, setGame] = useState({
    blossoms: [],
    misses: 0,
    score: 0,
  });

  function startGame() {
    setGame({ blossoms: [], misses: 0, score: 0 });
    setIsRunning(true);
  }

  function stopGame() {
    setIsRunning(false);
  }
  function resumeGame() {
    setIsRunning(true);
  }
  function resetGame() {
    setGame({ blossoms: [], misses: 0, score: 0 });
    setCatcherX(50);
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

  // --- auto-spawn blossoms ---
  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      spawnBlossom();
    }, spawnMs);

    return () => clearInterval(timerId);
  }, [isRunning, spawnMs]);

  // --- move blossoms + catch + misses ---
  useEffect(() => {
    if (!isRunning) return;

    const tickId = setInterval(() => {
      setGame((prev) => {
        const moved = prev.blossoms.map((b) => ({ ...b, y: b.y + fallSpeed }));

        let caughtCount = 0;
        const keptAfterCatch = [];

        for (const b of moved) {
          const inCatchZone =
            b.y >= catchLineY && b.y <= catchLineY + catchZoneHeight;
          const closeToCatcher = Math.abs(b.x - catcherX) <= catchWindowX;

          if (inCatchZone && closeToCatcher) {
            caughtCount += 1;
            continue; // caught -> remove
          }

          keptAfterCatch.push(b);
        }

        const stillOnScreen = keptAfterCatch.filter((b) => b.y <= 110);
        const fellOffCount = keptAfterCatch.length - stillOnScreen.length;

        return {
          ...prev,
          blossoms: stillOnScreen,
          misses: prev.misses + fellOffCount,
          score: prev.score + caughtCount,
        };
      });
    }, 50);

    return () => clearInterval(tickId);
  }, [
    isRunning,
    fallSpeed,
    catcherX,
    catchLineY,
    catchWindowX,
    catchZoneHeight,
  ]);

  // --- game over ---
  useEffect(() => {
    if (!isRunning) return;
    if (game.misses >= maxMisses) {
      setIsRunning(false);
    }
  }, [game.misses, maxMisses, isRunning]);

  // --- keyboard movement ---
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
        playerName={playerName}
        onChangePlayerName={onChangePlayerName}
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
        isRunning={isRunning}
        onStart={startGame}
        onStop={stopGame}
        onReset={resetGame}
      />

      <ScoreBoard
        score={game.score}
        misses={game.misses}
        maxMisses={maxMisses}
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

        {!isRunning && (
          <div className="overlay">
            {game.misses >= maxMisses ? (
              <div>Game over! Final score: {game.score}</div>
            ) : game.score > 0 || game.misses > 0 ? (
              <div>Paused</div>
            ) : (
              <div>Press Start to play 🌸</div>
            )}

            {game.misses >= maxMisses ? (
              <button className="overlayBtn" onClick={startGame}>
                Restart
              </button>
            ) : game.score > 0 || game.misses > 0 ? (
              <button className="overlayBtn" onClick={resumeGame}>
                Resume
              </button>
            ) : (
              <button className="overlayBtn" onClick={startGame}>
                Start
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
