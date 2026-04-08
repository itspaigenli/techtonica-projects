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
      <aside className="h-fit rounded-[2rem] border border-white/65 bg-white/80 p-6 shadow-[var(--shadow-dohyo)]">
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ink-950">
          Current Rankings
        </h2>
        <p className="mt-3 text-sm text-red-600">{error}</p>
      </aside>
    );
  }

  if (!rankings) {
    return (
      <aside className="h-fit rounded-[2rem] border border-white/65 bg-white/80 p-6 shadow-[var(--shadow-dohyo)]">
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ink-950">
          Current Rankings
        </h2>
        <p className="mt-3 text-sm text-stone-600">Loading...</p>
      </aside>
    );
  }

  const eastRanks = rankings.east || [];
  const westRanks = rankings.west || [];

  return (
    <aside className="h-fit overflow-hidden rounded-[2rem] border border-white/65 bg-white/80 shadow-[var(--shadow-dohyo)]">
      <div className="border-b border-stone-200 bg-clay-600 px-6 py-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-200">
          Official Board
        </p>
        <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.08em]">
          Current Rankings
        </h2>
        <p className="mt-2 text-sm text-white/70">
          {rankings.division || "Makuuchi"}
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-2xl uppercase tracking-[0.08em] text-ink-950">
            East
          </h3>
          <div className="space-y-2">
            {eastRanks.length === 0 ? (
              <p className="text-sm text-stone-600">No data available.</p>
            ) : (
              eastRanks.slice(0, 10).map((rikishi, index) => (
                <div
                  key={`${rikishi.shikonaEn || "east"}-${index}`}
                  className="rounded-2xl border border-clay-100 bg-clay-50 px-3 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-600">
                    {rikishi.rank || "Unknown Rank"}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-800">
                    {rikishi.shikonaEn || "Unknown Rikishi"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-display text-2xl uppercase tracking-[0.08em] text-ink-950">
            West
          </h3>
          <div className="space-y-2">
            {westRanks.length === 0 ? (
              <p className="text-sm text-stone-600">No data available.</p>
            ) : (
              westRanks.slice(0, 10).map((rikishi, index) => (
                <div
                  key={`${rikishi.shikonaEn || "west"}-${index}`}
                  className="rounded-2xl border border-stone-200 bg-white px-3 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-600">
                    {rikishi.rank || "Unknown Rank"}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-800">
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
