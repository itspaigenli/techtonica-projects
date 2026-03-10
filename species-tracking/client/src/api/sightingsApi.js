export async function getSightings() {
  const response = await fetch("/sightings");

  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }

  return response.json();
}

export async function createSighting(newSighting) {
  const response = await fetch("/sightings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSighting),
  });

  if (!response.ok) {
    throw new Error("Failed to create sighting");
  }

  return response.json();
}
