import { useEffect, useState } from "react";
import { getRankings } from "../api/rankings";

export default function RankingsSidebar() {
  const [rankings, setRankings] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRankings() {
      try {
        const data = await getRankings();
        setRankings(data);
      } catch (err) {
        console.error("Failed to load rankings:", err);
        setError("Failed to load rankings.");
      }
    }

    loadRankings();
  }, []);

  if (error) {
    return (
      <aside className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Current Rankings</h2>
        <p className="text-sm text-red-600">{error}</p>
      </aside>
    );
  }

  if (!rankings) {
    return (
      <aside className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Current Rankings</h2>
        <p className="text-sm text-gray-600">Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Current Rankings</h2>
        <p className="text-sm text-gray-500">
          {rankings.division || "Makuuchi"}
        </p>
      </div>

      <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded">
        {JSON.stringify(rankings, null, 2)}
      </pre>
    </aside>
  );
}
