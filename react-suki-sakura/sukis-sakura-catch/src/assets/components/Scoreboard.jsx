export default function ScoreBoard({ score, misses, playerName }) {
  return (
    <div className="scoreBoard">
      <div>Player: {playerName}</div>
      <div>Score: {score}</div>
      <div>Misses: {misses}</div>
    </div>
  );
}
