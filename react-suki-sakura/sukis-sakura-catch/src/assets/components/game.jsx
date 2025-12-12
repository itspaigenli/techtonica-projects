import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";

export default function Game() {
  return (
    <div className="gameWrap">
      <Controls />
      <ScoreBoard />

      <div className="arena">Arena goes here</div>
    </div>
  );
}
