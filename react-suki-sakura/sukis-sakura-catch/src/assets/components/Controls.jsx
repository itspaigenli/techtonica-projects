export default function Controls({
  onAddScore,
  onAddMiss,
  playerName,
  onChangePlayerName,
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

      <button onClick={onAddScore}>+1 Score</button>
      <button onClick={onAddMiss}>+1 Miss</button>
    </div>
  );
}
