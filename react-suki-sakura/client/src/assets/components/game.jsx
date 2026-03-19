import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const catchLineY = 70;
  const catchZoneHeight = 18;

  // Difficulty-tuned constants
  const { fallSpeed, spawnMs, maxMisses, moveStep, catchWindowX, maxOnScreen } =
    useMemo(() => {
      if (difficulty === "easy") {
        return {
          fallSpeed: 1.1,
          spawnMs: 1150,
          maxMisses: 10,
          moveStep: 6,
          catchWindowX: 10,
          maxOnScreen: 7,
        };
      }
      if (difficulty === "hard") {
        return {
          fallSpeed: 2.0,
          spawnMs: 500,
          maxMisses: 5,
          moveStep: 10,
          catchWindowX: 10,
          maxOnScreen: 10,
        };
      }
      return {
        fallSpeed: 1.4,
        spawnMs: 800,
        maxMisses: 7,
        moveStep: 8,
        catchWindowX: 10,
        maxOnScreen: 8,
      };
    }, [difficulty]);

  const holdStep = Math.max(1, Math.round(moveStep / 3));

  // --- state ---
  const [isRunning, setIsRunning] = useState(false);
  const [catcherX, setCatcherX] = useState(50);

  const dirRef = useRef(0); // -1 left, 0 none, +1 right
  const catcherXRef = useRef(50); // stable reference for collision checks

  useEffect(() => {
    catcherXRef.current = catcherX;
  }, [catcherX]);

  const [game, setGame] = useState({
    blossoms: [],
    misses: 0,
    score: 0,
  });

  // --- game control helpers ---
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
    dirRef.current = 0;
    setIsRunning(false);
  }, [resetGameState]);

  // --- blossom spawning ---
  const spawnBlossom = useCallback(() => {
    setGame((prev) => {
      if (prev.blossoms.length >= maxOnScreen) return prev;

      const newBlossom = {
        id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        x:
          Math.floor(Math.random() * (catcherMaxX - catcherMinX)) + catcherMinX,
        y: 0,
      };

      return { ...prev, blossoms: [...prev.blossoms, newBlossom] };
    });
  }, [catcherMinX, catcherMaxX, maxOnScreen]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(spawnBlossom, spawnMs);
    return () => clearInterval(id);
  }, [isRunning, spawnMs, spawnBlossom]);

  // --- blossom tick loop (movement + collision) ---
  useEffect(() => {
    if (!isRunning) return;

    const tickMs = 16;
    const speedScale = tickMs / 50; // preserves old fall speed feel

    const id = setInterval(() => {
      setGame((prev) => {
        const moved = prev.blossoms.map((b) => ({
          ...b,
          y: b.y + fallSpeed * speedScale,
        }));

        let caughtCount = 0;
        const remaining = [];

        for (const b of moved) {
          const inCatchZone =
            b.y >= catchLineY && b.y <= catchLineY + catchZoneHeight;

          const closeToCatcher =
            Math.abs(b.x - catcherXRef.current) <= catchWindowX;

          if (inCatchZone && closeToCatcher) {
            caughtCount += 1;
            continue; // caught → remove immediately
          }

          remaining.push(b);
        }

        const stillOnScreen = remaining.filter((b) => b.y <= 110);
        const fellOff = remaining.length - stillOnScreen.length;

        return {
          ...prev,
          blossoms: stillOnScreen,
          misses: prev.misses + fellOff,
          score: prev.score + caughtCount,
        };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [isRunning, fallSpeed, catchLineY, catchWindowX, catchZoneHeight]);

  // --- game over ---
  useEffect(() => {
    if (!isRunning) return;
    if (game.misses >= maxMisses) setIsRunning(false);
  }, [game.misses, maxMisses, isRunning]);

  // --- keyboard input ---
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isRunning) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        dirRef.current = -1;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        dirRef.current = 1;
      }
    }

    function handleKeyUp(e) {
      if (e.key === "ArrowLeft" && dirRef.current === -1) dirRef.current = 0;
      if (e.key === "ArrowRight" && dirRef.current === 1) dirRef.current = 0;
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning]);

  // --- smooth cat movement loop ---
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const dir = dirRef.current;
      if (dir === 0) return;

      setCatcherX((x) =>
        Math.min(catcherMaxX, Math.max(catcherMinX, x + dir * holdStep))
      );
    }, 33);

    return () => clearInterval(id);
  }, [isRunning, catcherMinX, catcherMaxX, holdStep]);

  const isGameOver = game.misses >= maxMisses;
  const hasStarted = game.score > 0 || game.misses > 0;

  // --- render ---
  return (
    <div className="gameWrap">
      <div className="uiColumn">
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

        {/* Decorative banner panel (wide + short) */}
        <div className="sakuraPanel sakuraArt" aria-hidden="true" />
      </div>

      <div className="arena">
        {game.blossoms.map((b) => (
          <Blossom key={b.id} x={b.x} y={b.y} />
        ))}

        <div
          className="catcher"
          style={{ left: `${catcherX}%` }}
          aria-label="Suki catcher"
        >
          <img
            src="/suki-sprite.png"
            alt=""
            className="catcherImage"
            draggable="false"
          />
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
