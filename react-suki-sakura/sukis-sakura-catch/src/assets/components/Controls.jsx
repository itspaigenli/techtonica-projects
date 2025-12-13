export default function Controls({
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
  isRunning,
  onStart,
  onStop,
  onReset,
}) {
  return (
    <div className="controls">
      {/* Row 1: inputs */}
      <div className="controlsRow">
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
      </div>

      {/* Row 2: buttons */}
      <div className="controlsRow controlsButtons">
        {!isRunning ? (
          <button onClick={onStart}>Start</button>
        ) : (
          <button onClick={onStop}>Pause</button>
        )}
        <button onClick={onReset}>Reset</button>

        {/* Spacer button to keep 3-column grid stable */}
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          style={{ visibility: "hidden" }}
        >
          Spacer
        </button>
      </div>
    </div>
  );
}
