export async function getItems() {
  const response = await fetch(`/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
}

export async function createItem(item) {
  const response = await fetch(`/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  return response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
}
