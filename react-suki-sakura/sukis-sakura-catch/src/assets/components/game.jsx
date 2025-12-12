import { useState } from "react";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game() {
  const [score, setScore] = useState(0);

  return (
    <div className="gameWrap">
      <Controls />
      <ScoreBoard score={score} />

      <div className="arena">
        <Blossom x={50} y={20} />
      </div>
    </div>
  );
}
