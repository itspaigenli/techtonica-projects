export default function Controls({ onAddScore, onAddMiss }) {
  return (
    <div>
      <button onClick={onAddScore}>+1 Score</button>
      <button onClick={onAddMiss}>+1 Miss</button>
    </div>
  );
}
