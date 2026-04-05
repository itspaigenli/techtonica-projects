const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getRankings() {
  const response = await fetch(`${BASE_URL}/rankings`);

  if (!response.ok) {
    throw new Error("Failed to fetch rankings");
  }

  return response.json();
}
