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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="p-6 flex gap-6">
        {/* Tabel produk */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Manajemen Produk</h1>
            <Link
              to="/admin/products/add"
              className="bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg font-medium"
            >
              + Tambah Produk
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700 bg-[#1e293b]/50 backdrop-blur-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-[#7C3AED]/20 to-[#4FACFE]/20 text-left border-b border-gray-600">
                <tr>
                  <th className="p-3 font-medium">Gambar</th>
                  <th className="p-3 font-medium">Nama</th>
                  <th className="p-3 font-medium">Harga</th>
                  <th className="p-3 font-medium">Kategori</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-[#7C3AED]/10 transition-colors"
                  >
                    <td className="p-4">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-white">{product.name}</td>
                    <td className="p-4 text-green-400 font-semibold">
                      Rp {product.price?.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-gray-300">{product.category || "-"}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        {product.status || "Active"}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleInfo(product.id)}
                        className="inline-flex items-center justify-center p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="inline-flex items-center justify-center p-2 bg-[#7C3AED]/20 text-[#7C3AED] rounded-lg hover:bg-[#7C3AED]/30 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center justify-center p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <span className="text-2xl">📦</span>
                        </div>
                        <p>Tidak ada produk untuk ditampilkan</p>
                        <p className="text-sm text-gray-500">Mulai dengan menambahkan produk pertama Anda</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1 
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail produk di kanan */}
        {selectedProduct && (
          <div className="w-[360px] p-6 bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-xl border border-gray-600 shadow-2xl backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-white">Detail Produk</h2>
            <div className="space-y-4">
              <img
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">{selectedProduct.name}</h3>
                <p className="text-gray-300 text-sm">{selectedProduct.category}</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold text-lg">
                    Rp {selectedProduct.price?.toLocaleString("id-ID")}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      Rp {selectedProduct.originalPrice?.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
                {selectedProduct.discountPercent && (
                  <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                    Diskon {selectedProduct.discountPercent}%
                  </span>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                    <div className="text-yellow-400 font-semibold">⭐ {selectedProduct.rating || 0}</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                    <div className="text-blue-400 font-semibold">{selectedProduct.soldCount || 0}</div>
                    <div className="text-xs text-gray-400">Terjual</div>
                  </div>
                </div>
                <div className="pt-2 space-y-1">
                  <p className="text-sm text-gray-300">📍 {selectedProduct.location}</p>
                  <p className="text-sm text-gray-300">🚚 {selectedProduct.shippingEstimate}</p>
                </div>
                {selectedProduct.badges?.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {selectedProduct.badges.map((badge, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-[#7C3AED]/20 text-[#7C3AED] rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
