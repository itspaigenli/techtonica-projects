export default function ScoreBoard({ score, misses }) {
  return (
    <div>
      <div>Score: {score}</div>
      <div>Misses: {misses}</div>
    </div>
  );
}
