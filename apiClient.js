export const API_URL = "http://localhost:4000/api/products";

export async function fetchProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
