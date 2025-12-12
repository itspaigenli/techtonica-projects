export default function ScoreBoard({ score, misses }) {
  return (
    <div className="scoreBoard">
      <div>Score: {score}</div>
      <div>Misses: {misses}</div>
    </div>
  );
}
