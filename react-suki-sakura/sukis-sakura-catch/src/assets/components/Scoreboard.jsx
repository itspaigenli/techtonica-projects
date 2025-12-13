import React from "react";

export default function ScoreBoard({
  score,
  misses,
  maxMisses,
  playerName,
  difficulty,
  isRunning,
}) {
  return (
    <div className="scoreBoard">
      <div className="scoreRow">
        <span className="sakuraIcon">🌸</span>
        <span>Player:</span>
        <strong>{playerName}</strong>
      </div>

      <div className="scoreRow">
        <span className="sakuraIcon">🌸</span>
        <span>Difficulty:</span>
        <strong>{difficulty}</strong>
      </div>

      <div className="scoreRow">
        <span className="sakuraIcon">🌸</span>
        <span>Score:</span>
        <strong>{score}</strong>
      </div>

      <div className="scoreRow">
        <span className="sakuraIcon">🌸</span>
        <span>Misses:</span>
        <strong>
          {misses} / {maxMisses}
        </strong>
      </div>

      <div className="scoreRow">
        <span className="sakuraIcon">🌸</span>
        <span>Status:</span>
        <strong>{isRunning ? "Running" : "Stopped"}</strong>
      </div>
    </div>
  );
}
