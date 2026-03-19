export default function Leaderboard({ leaderboard, onClear }) {
  return (
    <div className="scoreBoard">
      <h2 className="leaderboardTitle">Leaderboard</h2>

      {leaderboard.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <ol className="leaderboardList">
          {leaderboard.map((entry, index) => (
            <li key={index} className="leaderboardItem">
              <span>
                {entry.name} - {entry.score}
              </span>
              <span>({entry.difficulty})</span>
            </li>
          ))}
        </ol>
      )}

      <button onClick={onClear}>Clear Leaderboard</button>
    </div>
  );
}
