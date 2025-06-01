import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/services/productService";
import { Pencil, Trash2, Loader2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log('AdminProductList: Fetching products...');
        const response = await getAllProducts();
        console.log('AdminProductList: Response received:', response);
        
        // Handle the response structure from the API
        const productData = response.data || response || [];
        
        if (!Array.isArray(productData)) {
          console.error('Expected array but got:', typeof productData);
          toast.error("Invalid product data received");
          setProducts([]);
        } else {
          console.log('Setting products:', productData);
          setProducts(productData);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        toast.error(err.response?.data?.message || err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Failed to delete product");
      }
    }
  };

  const handleInfo = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
    } else {
      toast.error("Product not found");
    }
  };

  const paginatedProducts = Array.isArray(products) ? products.slice((page - 1) * perPage, page * perPage) : [];
  const totalPages = Array.isArray(products) && products.length > 0 ? Math.ceil(products.length / perPage) : 0;

  if (loading) {
    return (
      <div className="p-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Loader2 className="w-4 h-4 animate-spin text-[#7C3AED]" />
        Memuat produk...
      </div>
    );
  }

  return (
    <div className="p-4 flex gap-6">
      {/* Tabel produk */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Manajemen Produk</h1>
          <Link
            to="/admin/products/add"
            className="bg-[#7C3AED] text-white px-4 py-2 rounded-xl hover:bg-[#6B21A8] text-sm"
          >
            Tambah Produk
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3 font-medium">Gambar</th>
                <th className="p-3 font-medium">Nama</th>
                <th className="p-3 font-medium">Harga</th>
                <th className="p-3 font-medium">Kategori</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Tidak ada gambar</span>
                  )}
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">
                  Rp {product.price?.toLocaleString("id-ID")}
                </td>
                <td className="p-3">{product.category || "-"}</td>
                <td className="p-3">{product.status || "-"}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleInfo(product.id)}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Info className="w-4 h-4 text-blue-500" />
                  </button>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Pencil className="w-4 h-4 text-[#7C3AED]" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  Tidak ada produk untuk ditampilkan
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-end gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm border ${page === i + 1 ? 'bg-[#7C3AED] text-white' : 'bg-white text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail produk di kanan */}
      {selectedProduct && (
        <div className="w-[320px] p-4 bg-white rounded-xl border shadow dark:bg-gray-900 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Detail Produk</h2>
          <img
            src={selectedProduct.images?.[0]}
            alt={selectedProduct.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <p className="text-sm font-medium">{selectedProduct.name}</p>
          <p className="text-sm text-gray-500">{selectedProduct.category}</p>
          <p className="text-sm mt-2">Harga: Rp {selectedProduct.price?.toLocaleString("id-ID")}</p>
          {selectedProduct.originalPrice && (
            <p className="text-sm text-gray-400 line-through">Rp {selectedProduct.originalPrice?.toLocaleString("id-ID")}</p>
          )}
          {selectedProduct.discountPercent && (
            <p className="text-sm text-red-500">Diskon {selectedProduct.discountPercent}%</p>
          )}
          <p className="text-sm mt-2">Rating: {selectedProduct.rating || 0}</p>
          <p className="text-sm">Terjual: {selectedProduct.soldCount || 0}</p>
          <p className="text-sm mt-2">Lokasi: {selectedProduct.location}</p>
          <p className="text-sm">Estimasi Kirim: {selectedProduct.shippingEstimate}</p>
          {selectedProduct.badges?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedProduct.badges.map((badge, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
