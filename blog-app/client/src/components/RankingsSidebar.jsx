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

  const eastRanks = rankings.east || [];
  const westRanks = rankings.west || [];

  return (
    <aside className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Current Rankings</h2>
        <p className="text-sm text-gray-500">
          {rankings.division || "Makuuchi"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* East Side */}
        <div>
          <h3 className="font-semibold mb-2">East</h3>
          <div className="space-y-2">
            {eastRanks.length === 0 ? (
              <p className="text-sm text-gray-600">No data available.</p>
            ) : (
              eastRanks.slice(0, 10).map((rikishi, index) => (
                <div
                  key={`${rikishi.shikonaEn || "east"}-${index}`}
                  className="border rounded p-2"
                >
                  <p className="text-sm font-medium">
                    {rikishi.rank || "Unknown Rank"}
                  </p>
                  <p className="text-sm">
                    {rikishi.shikonaEn || "Unknown Rikishi"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* West Side */}
        <div>
          <h3 className="font-semibold mb-2">West</h3>
          <div className="space-y-2">
            {westRanks.length === 0 ? (
              <p className="text-sm text-gray-600">No data available.</p>
            ) : (
              westRanks.slice(0, 10).map((rikishi, index) => (
                <div
                  key={`${rikishi.shikonaEn || "west"}-${index}`}
                  className="border rounded p-2"
                >
                  <p className="text-sm font-medium">
                    {rikishi.rank || "Unknown Rank"}
                  </p>
                  <p className="text-sm">
                    {rikishi.shikonaEn || "Unknown Rikishi"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
