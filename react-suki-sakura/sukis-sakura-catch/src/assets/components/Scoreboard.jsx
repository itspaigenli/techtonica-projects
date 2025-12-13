import React from "react";

function ScoreBoard({
  score,
  misses,
  maxMisses,
  playerName,
  difficulty,
  isRunning,
}) {
  return (
    <div className="scoreBoard">
      <div>Player: {playerName}</div>
      <div>Difficulty: {difficulty}</div>
      <div>Score: {score}</div>
      <div>
        Misses: {misses} / {maxMisses}
      </div>
      <div>Status: {isRunning ? "Running" : "Stopped"}</div>
    </div>
  );
}

export default React.memo(ScoreBoard);
