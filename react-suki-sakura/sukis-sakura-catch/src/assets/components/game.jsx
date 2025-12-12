import { useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  // --- state ---
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [blossoms, setBlossoms] = useState([
    { id: 1, x: 25, y: 20 },
    { id: 2, x: 50, y: 40 },
    { id: 3, x: 75, y: 30 },
  ]);

  // --- functions that change state ---
  function addOneToScore() {
    setScore((s) => s + 1);
  }

  function addOneToMisses() {
    setMisses((m) => m + 1);
  }

  function startGame() {
    setIsRunning(true);
  }

  function stopGame() {
    setIsRunning(false);
  }

  // --- UI ---
  return (
    <div className="gameWrap">
      <Controls
        onAddScore={addOneToScore}
        onAddMiss={addOneToMisses}
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
        misses={misses}
        playerName={playerName}
        difficulty={difficulty}
        isRunning={isRunning}
      />

      <div className="arena">
        {blossoms.map((b) => (
          <Blossom key={b.id} x={b.x} y={b.y} />
        ))}
      </div>
    </div>
  );
}
