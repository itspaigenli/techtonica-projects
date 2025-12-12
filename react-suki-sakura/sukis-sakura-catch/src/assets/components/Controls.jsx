export default function Controls({
  onAddScore,
  onAddMiss,
  playerName,
  onChangePlayerName,
  difficulty,
  onChangeDifficulty,
}) {
  return (
    <div className="controls">
      <label>
        Player name:
        <input
          value={playerName}
          onChange={(e) => onChangePlayerName(e.target.value)}
        />
      </label>

      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => onChangeDifficulty(e.target.value)}
        >
          <option value="easy">easy</option>
          <option value="normal">normal</option>
          <option value="hard">hard</option>
        </select>
      </label>

      <button onClick={onAddScore}>+1 Score</button>
      <button onClick={onAddMiss}>+1 Miss</button>
    </div>
  );
}
