import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  // Arena constants
  const catcherMinX = 5;
  const catcherMaxX = 95;
  const catchLineY = 70;
  const catchZoneHeight = 18;

  // Difficulty settings
  let fallSpeed;
  let spawnMs;
  let maxMisses;
  let moveStep;
  let catchWindowX;
  let maxOnScreen;

  if (difficulty === "easy") {
    fallSpeed = 1.1;
    spawnMs = 1150;
    maxMisses = 10;
    moveStep = 6;
    catchWindowX = 10;
    maxOnScreen = 7;
  } else if (difficulty === "hard") {
    fallSpeed = 2.0;
    spawnMs = 500;
    maxMisses = 5;
    moveStep = 10;
    catchWindowX = 10;
    maxOnScreen = 10;
  } else {
    fallSpeed = 1.4;
    spawnMs = 800;
    maxMisses = 7;
    moveStep = 8;
    catchWindowX = 10;
    maxOnScreen = 8;
  }

  const holdStep = Math.max(1, Math.round(moveStep / 3));

  // State
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [catcherX, setCatcherX] = useState(50);
  const [blossoms, setBlossoms] = useState([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);

  // Refs for held keyboard movement
  const dirRef = useRef(0);

  function resetGameState() {
    setBlossoms([]);
    setScore(0);
    setMisses(0);
  }

  function startGame() {
    resetGameState();
    setCatcherX(50);
    dirRef.current = 0;
    setHasStarted(true);
    setIsRunning(true);
  }

  function pauseGame() {
    setIsRunning(false);
  }

  function resumeGame() {
    setIsRunning(true);
  }

  function resetGame() {
    resetGameState();
    setCatcherX(50);
    dirRef.current = 0;
    setIsRunning(false);
    setHasStarted(false);
  }

  function spawnBlossom() {
    setBlossoms((prevBlossoms) => {
      if (prevBlossoms.length >= maxOnScreen) {
        return prevBlossoms;
      }

      const newBlossom = {
        id: `${Date.now()}-${Math.random()}`,
        x:
          Math.floor(Math.random() * (catcherMaxX - catcherMinX)) + catcherMinX,
        y: 0,
      };

      return [...prevBlossoms, newBlossom];
    });
  }

  // Spawn blossoms
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      spawnBlossom();
    }, spawnMs);

    return () => clearInterval(intervalId);
  }, [isRunning, spawnMs, maxOnScreen, difficulty]);

  // Move blossoms and check catches/misses
  useEffect(() => {
    if (!isRunning) return;

    const tickMs = 16;
    const speedScale = tickMs / 50;

    const intervalId = setInterval(() => {
      let caughtThisTick = 0;
      let missedThisTick = 0;

      setBlossoms((prevBlossoms) => {
        const updatedBlossoms = [];

        for (let i = 0; i < prevBlossoms.length; i++) {
          const blossom = prevBlossoms[i];
          const newY = blossom.y + fallSpeed * speedScale;

          const inCatchZone =
            newY >= catchLineY && newY <= catchLineY + catchZoneHeight;

          const closeToCatcher = Math.abs(blossom.x - catcherX) <= catchWindowX;

          if (inCatchZone && closeToCatcher) {
            caughtThisTick += 1;
          } else if (newY > 110) {
            missedThisTick += 1;
          } else {
            updatedBlossoms.push({
              ...blossom,
              y: newY,
            });
          }
        }

        return updatedBlossoms;
      });

      if (caughtThisTick > 0) {
        setScore((prevScore) => prevScore + caughtThisTick);
      }

      if (missedThisTick > 0) {
        setMisses((prevMisses) => prevMisses + missedThisTick);
      }
    }, tickMs);

    return () => clearInterval(intervalId);
  }, [
    isRunning,
    fallSpeed,
    catchLineY,
    catchZoneHeight,
    catchWindowX,
    catcherX,
  ]);

  // Game over
  useEffect(() => {
    if (misses >= maxMisses) {
      setIsRunning(false);
    }
  }, [misses, maxMisses]);

  // Keyboard input
  useEffect(() => {
    function handleKeyDown(event) {
      if (!isRunning) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        dirRef.current = -1;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        dirRef.current = 1;
      }
    }

    function handleKeyUp(event) {
      if (event.key === "ArrowLeft" && dirRef.current === -1) {
        dirRef.current = 0;
      }

      if (event.key === "ArrowRight" && dirRef.current === 1) {
        dirRef.current = 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning]);

  // Move catcher while key is held
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      if (dirRef.current === 0) return;

      setCatcherX((prevX) => {
        const nextX = prevX + dirRef.current * holdStep;

        if (nextX < catcherMinX) return catcherMinX;
        if (nextX > catcherMaxX) return catcherMaxX;

        return nextX;
      });
    }, 33);

    return () => clearInterval(intervalId);
  }, [isRunning, holdStep]);

  const isGameOver = misses >= maxMisses;

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
          onStop={pauseGame}
          onReset={resetGame}
        />

        <ScoreBoard
          score={score}
          misses={misses}
          maxMisses={maxMisses}
          playerName={playerName}
          difficulty={difficulty}
          isRunning={isRunning}
        />

        <div className="sakuraPanel sakuraArt" aria-hidden="true" />
      </div>

      <div className="arena">
        {blossoms.map((blossom) => (
          <Blossom key={blossom.id} x={blossom.x} y={blossom.y} />
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
              <div>Game over! Final score: {score}</div>
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
