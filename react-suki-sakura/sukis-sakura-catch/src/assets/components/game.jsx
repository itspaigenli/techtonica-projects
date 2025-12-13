import { useCallback, useEffect, useMemo, useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  // --- arena + gameplay constants ---
  const catcherMinX = 5;
  const catcherMaxX = 95;

  const catchLineY = 85;
  const catchWindowX = 6;
  const catchZoneHeight = 6;

  // Difficulty-tuned constants (memoized so effects don't churn)
  const { fallSpeed, spawnMs, maxMisses } = useMemo(() => {
    if (difficulty === "easy") {
      return { fallSpeed: 1.6, spawnMs: 900, maxMisses: 10 };
    }
    if (difficulty === "hard") {
      return { fallSpeed: 2.8, spawnMs: 450, maxMisses: 5 };
    }
    return { fallSpeed: 2.2, spawnMs: 650, maxMisses: 7 };
  }, [difficulty]);

  // --- state ---
  const [isRunning, setIsRunning] = useState(false);
  const [catcherX, setCatcherX] = useState(50);

  // Keep score + misses together to avoid race/StrictMode surprises
  const [game, setGame] = useState({
    blossoms: [],
    misses: 0,
    score: 0,
  });

  const resetGameState = useCallback(() => {
    setGame({ blossoms: [], misses: 0, score: 0 });
  }, []);

  const startGame = useCallback(() => {
    resetGameState();
    setIsRunning(true);
  }, [resetGameState]);

  const stopGame = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeGame = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetGame = useCallback(() => {
    resetGameState();
    setCatcherX(50);
    setIsRunning(false);
  }, [resetGameState]);

  const spawnBlossom = useCallback(() => {
    const newBlossom = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      x: Math.floor(Math.random() * (catcherMaxX - catcherMinX)) + catcherMinX,
      y: 0,
    };

    setGame((prev) => ({
      ...prev,
      blossoms: [...prev.blossoms, newBlossom],
    }));
  }, [catcherMinX, catcherMaxX]);

  // --- spawn loop ---
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(spawnBlossom, spawnMs);
    return () => clearInterval(id);
  }, [isRunning, spawnMs, spawnBlossom]);

  // --- tick loop (move + catch + misses) ---
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
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
            continue;
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

    return () => clearInterval(id);
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
    if (game.misses >= maxMisses) setIsRunning(false);
  }, [game.misses, maxMisses, isRunning]);

  // --- keyboard movement ---
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isRunning) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCatcherX((x) => Math.max(catcherMinX, x - 5));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCatcherX((x) => Math.min(catcherMaxX, x + 5));
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, catcherMinX, catcherMaxX]);

  const isGameOver = game.misses >= maxMisses;
  const hasStarted = game.score > 0 || game.misses > 0;

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
            {isGameOver ? (
              <div>Game over! Final score: {game.score}</div>
            ) : hasStarted ? (
              <div>Paused</div>
            ) : (
              <div>Press Start to play 🌸</div>
            )}

            {isGameOver ? (
              <button className="overlayBtn" onClick={startGame}>
                Restart
              </button>
            ) : hasStarted ? (
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
