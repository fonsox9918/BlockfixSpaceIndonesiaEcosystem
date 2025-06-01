import React, { useEffect, useState } from "react";

const ProductTable = ({ refresh, onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Gagal ambil data dari backend:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductById = async (id) => {
    if (!window.confirm("Yakin mau hapus produk ini?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Produk berhasil dihapus");
        fetchProducts();
      } else {
        alert(result.error || "Gagal menghapus produk");
      }
    } catch (error) {
      alert("Gagal menghapus produk: " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]); // reload data setiap refresh berubah

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Produk</h2>

      {loading ? (
        <div className="text-center">Memuat data produk...</div>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Thumbnail</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Stok</th>
              <th className="p-2 border">Kategori</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
{products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Tidak ada produk.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2 border text-center">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </td>
                  <td className="p-2 border text-center">{product.stock}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProductById(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;