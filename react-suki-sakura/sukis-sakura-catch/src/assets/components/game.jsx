import { useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game() {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);

  function addOneToScore() {
    setScore((s) => s + 1);
  }

  return (
    <div className="gameWrap">
      <Controls onAddScore={addOneToScore} />

      <ScoreBoard score={score} misses={misses} />

      <div className="arena">
        <Blossom x={50} y={20} />
      </div>
    </div>
  );
}
