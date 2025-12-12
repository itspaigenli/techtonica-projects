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
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);

  function addOneToScore() {
    setScore((s) => s + 1);
  }

  function addOneToMisses() {
    setMisses((m) => m + 1);
  }

  return (
    <div className="gameWrap">
      <Controls
        onAddScore={addOneToScore}
        onAddMiss={addOneToMisses}
        playerName={playerName}
        onChangePlayerName={onChangePlayerName}
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />

      <ScoreBoard
        score={score}
        misses={misses}
        playerName={playerName}
        difficulty={difficulty}
      />

      <div className="arena">
        <Blossom x={50} y={20} />
      </div>
    </div>
  );
}
