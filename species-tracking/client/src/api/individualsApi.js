export async function getIndividuals() {
  const response = await fetch("/individuals");

  if (!response.ok) {
    throw new Error("Failed to fetch individuals");
  }

  return response.json();
}

export async function getIndividualById(id) {
  const response = await fetch(`/individuals/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch individual");
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

export async function deleteIndividual(id) {
  const response = await fetch(`/individuals/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete individual");
  }

  return response.json();
}
