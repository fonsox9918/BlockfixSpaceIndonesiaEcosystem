import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getServices, deleteService } from "@/services/serviceService";
import { UNIT_OPTIONS, BADGE_OPTIONS } from "@/schema/serviceSchema";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Terbaru", value: "createdAt_desc" },
  { label: "Harga Tertinggi", value: "price_desc" },
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Rating Tertinggi", value: "rating_desc" },
];

const AdminServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    unit: "",
    badges: [],
    sort: "createdAt_desc",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    limit: 12,
  });

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching services with filters:', filters);
      const response = await getServices(filters);
      console.log('Service API Response:', response);
      console.log('Services data to render:', response.data);
      setServices(response.data || []);
      setPagination({
        total: response.total || 0,
        totalPages: response.totalPages || 1,
        limit: filters.limit || 12,
      });
    } catch (error) {
      toast.error(error.message || "Gagal memuat data layanan");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset page when filter changes
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      return;
    }

    try {
      await deleteService(id);
      toast.success("Layanan berhasil dihapus");
      fetchServices();
    } catch (error) {
      toast.error(error.message || "Gagal menghapus layanan");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Layanan</h1>
        <Link
          to="/admin/services/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Layanan
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filters.unit}
          onChange={(e) => handleFilterChange("unit", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Semua Satuan</option>
          {UNIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          multiple
          value={filters.badges}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (option) => option.value);
            handleFilterChange("badges", values);
          }}
          className="border rounded px-3 py-2"
        >
          {BADGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="border rounded px-3 py-2"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Gambar</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Harga</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Satuan</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Badges</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Memuat data...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Tidak ada layanan
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4">
                    {service.images?.[0] && (
                      <img
                        src={service.images[0]}
                        alt={service.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{service.name}</td>
                  <td className="px-6 py-4">{formatPrice(service.price)}</td>
                  <td className="px-6 py-4">{service.unit}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {service.badges?.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/services/edit/${service.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleFilterChange("page", filters.page - 1)}
            disabled={filters.page === 1}
            className="flex items-center gap-1 px-4 py-2 border rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
          <span>
            Halaman {filters.page} dari {pagination.totalPages}
          </span>
          <button
            onClick={() => handleFilterChange("page", filters.page + 1)}
            disabled={filters.page === pagination.totalPages}
            className="flex items-center gap-1 px-4 py-2 border rounded disabled:opacity-50"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminServiceList;
