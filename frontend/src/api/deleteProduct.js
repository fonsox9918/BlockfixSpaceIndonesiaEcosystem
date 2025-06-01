// src/api/products/deleteProduct.js
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Gagal menghapus produk ID ${id}`);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};