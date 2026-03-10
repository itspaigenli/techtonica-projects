export async function getSpecies() {
  const response = await fetch("/species");

  if (!response.ok) {
    throw new Error("Failed to fetch species");
  }

  return response.json();
}
