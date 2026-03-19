import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Arena from "./Arena";
import Leaderboard from "./Leaderboard";

export default function Game({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  const catcherMinX = 5;
  const catcherMaxX = 95;
  const catchLineY = 70;
  const catchZoneHeight = 18;

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

  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [catcherX, setCatcherX] = useState(50);
  const [leaderboard, setLeaderboard] = useState([]);
  const [game, setGame] = useState({
    blossoms: [],
    score: 0,
    misses: 0,
  });

  const dirRef = useRef(0);

  function resetGameState() {
    setGame({
      blossoms: [],
      score: 0,
      misses: 0,
    });
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
    setGame((prevGame) => {
      if (prevGame.blossoms.length >= maxOnScreen) {
        return prevGame;
      }

      const newBlossom = {
        id: `${Date.now()}-${Math.random()}`,
        x:
          Math.floor(Math.random() * (catcherMaxX - catcherMinX)) + catcherMinX,
        y: 0,
      };

      return {
        ...prevGame,
        blossoms: [...prevGame.blossoms, newBlossom],
      };
    });
  }

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      spawnBlossom();
    }, spawnMs);

    return () => clearInterval(intervalId);
  }, [isRunning, spawnMs]);

  useEffect(() => {
    if (!isRunning) return;

    const tickMs = 16;
    const speedScale = tickMs / 50;

    const intervalId = setInterval(() => {
      setGame((prevGame) => {
        const movedBlossoms = prevGame.blossoms.map((blossom) => {
          return {
            ...blossom,
            y: blossom.y + fallSpeed * speedScale,
          };
        });

        let caughtCount = 0;
        let missedCount = 0;
        const remainingBlossoms = [];

        for (let i = 0; i < movedBlossoms.length; i++) {
          const blossom = movedBlossoms[i];

          const inCatchZone =
            blossom.y >= catchLineY &&
            blossom.y <= catchLineY + catchZoneHeight;

          const closeToCatcher = Math.abs(blossom.x - catcherX) <= catchWindowX;

          if (inCatchZone && closeToCatcher) {
            caughtCount += 1;
          } else if (blossom.y > 110) {
            missedCount += 1;
          } else {
            remainingBlossoms.push(blossom);
          }
        }

        return {
          blossoms: remainingBlossoms,
          score: prevGame.score + caughtCount,
          misses: prevGame.misses + missedCount,
        };
      });
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

  useEffect(() => {
    if (game.misses >= maxMisses) {
      setIsRunning(false);
    }
  }, [game.misses, maxMisses]);

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

  const isGameOver = game.misses >= maxMisses;

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
          score={game.score}
          misses={game.misses}
          maxMisses={maxMisses}
          playerName={playerName}
          difficulty={difficulty}
          isRunning={isRunning}
        />

        <div className="sakuraPanel sakuraArt" aria-hidden="true" />
      </div>

      <Arena
        blossoms={game.blossoms}
        catcherX={catcherX}
        isRunning={isRunning}
        isGameOver={isGameOver}
        hasStarted={hasStarted}
        score={game.score}
        onStart={startGame}
        onResume={resumeGame}
      />
    </div>
  );
}
