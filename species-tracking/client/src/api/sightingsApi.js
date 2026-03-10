export async function getSightings() {
  const response = await fetch("/sightings");

  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }

  return response.json();
}
