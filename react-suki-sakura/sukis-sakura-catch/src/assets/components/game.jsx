import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import Blossom from "./Blossom";

export default function Game() {
  return (
    <div className="gameWrap">
      <Controls />
      <ScoreBoard />

      <div className="arena">
        <Blossom />
      </div>
    </div>
  );
}
