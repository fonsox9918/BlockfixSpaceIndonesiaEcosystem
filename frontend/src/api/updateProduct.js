// src/api/products/updateProduct.js
export const updateProduct = async (id, updates) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update produk gagal");

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};