// src/api/products/uploadProduct.js
export const uploadProduct = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload gagal");

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};