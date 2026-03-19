export default function Blossom({ x, y }) {
  return (
    <div
      className="blossom"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      🌸
    </div>
  );
}
