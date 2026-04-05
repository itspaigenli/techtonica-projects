const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
