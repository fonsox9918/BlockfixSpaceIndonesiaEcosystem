import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Package, Clock, CheckCircle, XCircle, Calendar, MapPin, DollarSign } from "lucide-react";

const dummyOrders = [
  {
    id: "ORD-2024-001",
    title: "Pemasangan Wall Panel Ruang Tamu",
    description: "Pemasangan panel dinding WPC untuk ruang tamu dengan finishing premium",
    status: "Menunggu Konfirmasi",
    statusColor: "yellow",
    date: "2024-12-15",
    price: 15000000,
    location: "Jakarta Selatan",
    items: [
      { name: "Panel WPC Premium", quantity: 20, unit: "m²" },
      { name: "Jasa Pemasangan", quantity: 1, unit: "paket" }
    ],
    progress: 25
  },
  {
    id: "ORD-2024-002", 
    title: "Desain AI Kamar Tidur",
    description: "Konsultasi desain interior kamar tidur menggunakan AI dengan 3 alternatif desain",
    status: "Sedang Diproses",
    statusColor: "blue",
    date: "2024-12-10",
    price: 2500000,
    location: "Jakarta Pusat",
    items: [
      { name: "Konsultasi Desain AI", quantity: 1, unit: "sesi" },
      { name: "Render 3D", quantity: 3, unit: "desain" }
    ],
    progress: 60
  },
  {
    id: "ORD-2024-003",
    title: "Renovasi Plafon Kantor",
    description: "Pemasangan plafon PVC untuk area kantor dengan sistem pencahayaan LED",
    status: "Selesai",
    statusColor: "green", 
    date: "2024-11-28",
    price: 25000000,
    location: "Tangerang",
    items: [
      { name: "Plafon PVC", quantity: 50, unit: "m²" },
      { name: "LED Strip", quantity: 100, unit: "meter" },
      { name: "Jasa Instalasi", quantity: 1, unit: "paket" }
    ],
    progress: 100
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Menunggu Konfirmasi":
      return <Clock className="w-5 h-5" />;
    case "Sedang Diproses":
      return <Package className="w-5 h-5" />;
    case "Selesai":
      return <CheckCircle className="w-5 h-5" />;
    case "Dibatalkan":
      return <XCircle className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const getStatusColor = (statusColor) => {
  switch (statusColor) {
    case "yellow":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "blue":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "green":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "red":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const MyOrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true);
      // In real implementation, fetch from API with user authentication
      // const response = await fetch(`/api/orders?userId=${currentUser.uid}`);
      // const data = await response.json();
      
      // For now, use dummy data
      setTimeout(() => {
        setOrders(dummyOrders);
        setLoading(false);
      }, 1000);
    };

    if (currentUser) {
      fetchOrders();
    } else {
      setOrders(dummyOrders);
      setLoading(false);
    }
  }, [currentUser]);

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Pesanan Saya</h1>
          <p className="text-lg text-gray-600">Kelola dan pantau status pesanan Anda</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 lg:mb-12">
          {[
            { key: "all", label: "Semua", count: orders.length },
            { key: "menunggu", label: "Menunggu", count: orders.filter(o => o.status.includes("Menunggu")).length },
            { key: "proses", label: "Diproses", count: orders.filter(o => o.status.includes("Diproses")).length },
            { key: "selesai", label: "Selesai", count: orders.filter(o => o.status.includes("Selesai")).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                filter === tab.key
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 lg:py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Belum Ada Pesanan</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Mulai berbelanja untuk melihat pesanan Anda di sini</p>
            <button className="bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg">
              Mulai Berbelanja
            </button>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow">
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(order.statusColor)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <span className="text-gray-500 text-sm font-mono">#{order.id}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString('id-ID')}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {order.location}
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Order Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{order.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{order.description}</p>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-lg">Item Pesanan:</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
                          <span className="text-gray-900 font-medium">{item.name}</span>
                          <span className="text-gray-600 text-sm">{item.quantity} {item.unit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Progress Pesanan</span>
                        <span className="text-[#7C3AED] font-bold">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <span className="font-semibold text-gray-900">Total Pembayaran</span>
                      </div>
                      <p className="text-2xl lg:text-3xl font-bold text-green-600">
                        Rp {order.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white py-4 rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg">
                        Lihat Detail
                      </button>
                      {order.status !== "Selesai" && (
                        <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors font-medium border border-gray-200">
                          Hubungi Support
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
