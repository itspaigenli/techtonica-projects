const API_URL = import.meta.env.VITE_API_URL;

export async function getContacts() {
  const response = await fetch(`${API_URL}/contacts`);

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json();
}

export async function createContact(contact) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error("Failed to create contact");
  }

  return response.json();
}

export async function updateContact(id, contact) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error("Failed to update contact");
  }

  return response.json();
}

/* for later
export async function deleteContact(id) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
}
*/
