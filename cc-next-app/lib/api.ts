// Example structure for api.ts
const API_BASE_URL = '/api'; // Adjust this based on your backend URL

export async function getItems() {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
}

export async function addItem(item: any) {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error('Failed to add item');
  }
  return response.json();
}

// Add other API functions (markAsWatched, deleteItem, etc.) here