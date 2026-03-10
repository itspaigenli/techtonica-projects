export async function getSightings(startDate, endDate) {
  let url = "/sightings";

  const params = new URLSearchParams();

  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);

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
