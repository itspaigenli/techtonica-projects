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
        <span className="scoreLeft">
          <span className="sakuraIcon">🌸</span>
          <span className="scoreLabel">Player:</span>
        </span>
        <strong className="scoreValue">{playerName}</strong>
      </div>

      <div className="scoreRow">
        <span className="scoreLeft">
          <span className="sakuraIcon">🌸</span>
          <span className="scoreLabel">Difficulty:</span>
        </span>
        <strong className="scoreValue">{difficulty}</strong>
      </div>

      <div className="scoreRow">
        <span className="scoreLeft">
          <span className="sakuraIcon">🌸</span>
          <span className="scoreLabel">Score:</span>
        </span>
        <strong className="scoreValue">{score}</strong>
      </div>

      <div className="scoreRow">
        <span className="scoreLeft">
          <span className="sakuraIcon">🌸</span>
          <span className="scoreLabel">Misses:</span>
        </span>
        <strong className="scoreValue">
          {misses} / {maxMisses}
        </strong>
      </div>

      <div className="scoreRow">
        <span className="scoreLeft">
          <span className="sakuraIcon">🌸</span>
          <span className="scoreLabel">Status:</span>
        </span>
        <strong className="scoreValue">
          {isRunning ? "Running" : "Stopped"}
        </strong>
      </div>
    </div>
  );
}
