export default function Controls({ onAddScore }) {
  return (
    <div>
      <button onClick={onAddScore}>+1 Score</button>
    </div>
  );
}
