// src/api/products/fetchProducts.js
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal mengambil produk");

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};