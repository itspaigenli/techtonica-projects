import Blossom from "./Blossom";

export default function Arena({
  blossoms,
  catcherX,
  isRunning,
  isGameOver,
  hasStarted,
  score,
  onStart,
  onResume,
}) {
  return (
    <div className="arena">
      {blossoms.map((blossom) => (
        <Blossom key={blossom.id} x={blossom.x} y={blossom.y} />
      ))}

      <div
        className="catcher"
        style={{ left: `${catcherX}%` }}
        aria-label="Suki catcher"
      >
        <img
          src="/suki-sprite.png"
          alt=""
          className="catcherImage"
          draggable="false"
        />
      </div>

      {!isRunning && (
        <div className="overlay">
          {isGameOver ? (
            <div>Game over! Final score: {score}</div>
          ) : hasStarted ? (
            <div>Paused</div>
          ) : (
            <div>Press Start to play 🌸</div>
          )}

          {isGameOver ? (
            <button className="overlayBtn" onClick={onStart}>
              Restart
            </button>
          ) : hasStarted ? (
            <button className="overlayBtn" onClick={onResume}>
              Resume
            </button>
          ) : (
            <button className="overlayBtn" onClick={onStart}>
              Start
            </button>
          )}
        </div>
      )}
    </div>
  );
}
