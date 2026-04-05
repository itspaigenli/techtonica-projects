const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  return response.json();
}

export async function updatePost(id, postData) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });

  return response.json();
}
