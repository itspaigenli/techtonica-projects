export default function ScoreBoard({
  score,
  misses,
  playerName,
  difficulty,
  isRunning,
}) {
  return (
    <div className="scoreBoard">
      <div>Player: {playerName}</div>
      <div>Difficulty: {difficulty}</div>
      <div>Score: {score}</div>
      <div>Misses: {misses}</div>
      <div>Status: {isRunning ? "Running" : "Stopped"}</div>
    </div>
  );
}
