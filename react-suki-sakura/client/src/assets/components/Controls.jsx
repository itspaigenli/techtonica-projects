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
      {/* Left stack: inputs + buttons */}
      <div className="controls-left">
        <label>
          Player Name
          <input
            type="text"
            value={playerName}
            onChange={(e) => onChangePlayerName(e.target.value)}
            placeholder="Type your name…"
          />
        </label>

        <label>
          Difficulty
          <select
            value={difficulty}
            onChange={(e) => onChangeDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <div className="controlsRow controlsButtons">
          {!isRunning ? (
            <button onClick={onStart}>Start</button>
          ) : (
            <button onClick={onStop}>Pause</button>
          )}
          <button onClick={onReset}>Reset</button>
        </div>
      </div>

      {/* Right side stays empty so the blossom background shows */}
      <div className="controls-art" aria-hidden="true" />
    </div>
  );
}
