export async function getIndividuals() {
  const response = await fetch("/individuals");

  if (!response.ok) {
    throw new Error("Failed to fetch individuals");
  }

  return response.json();
}

export async function createIndividual(newIndividual) {
  const response = await fetch("/individuals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIndividual),
  });

  if (!response.ok) {
    throw new Error("Failed to create individual");
  }

  return response.json();
}
