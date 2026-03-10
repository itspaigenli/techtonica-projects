export async function getIndividuals() {
  const response = await fetch("/individuals");

  if (!response.ok) {
    throw new Error("Failed to fetch individuals");
  }

  return response.json();
}
