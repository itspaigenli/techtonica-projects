export default function Controls({
  onAddScore,
  onAddMiss,
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
  isRunning,
  onStart,
  onStop,
  onSpawnBlossom,
}) {
  return (
    <div className="controls">
      <label>
        Player name:
        <input
          value={playerName}
          onChange={(e) => onChangePlayerName(e.target.value)}
          disabled={isRunning}
        />
      </label>

      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => onChangeDifficulty(e.target.value)}
          disabled={isRunning}
        >
          <option value="easy">easy</option>
          <option value="normal">normal</option>
          <option value="hard">hard</option>
        </select>
      </label>

      {!isRunning ? (
        <button onClick={onStart}>Start</button>
      ) : (
        <button onClick={onStop}>Stop</button>
      )}
    </div>
  );
}
