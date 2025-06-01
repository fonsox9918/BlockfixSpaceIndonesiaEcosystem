import React from "react";
import OrderCard from "../../components/user/orders/OrderCard";

const dummyOrders = [
  {
    id: "order1",
    title: "Pemasangan Wall Panel Ruang Tamu",
    status: "Menunggu Konfirmasi",
    date: "2 Mei 2025",
  },
  {
    id: "order2",
    title: "Desain AI Kamar Tidur",
    status: "Sedang Diproses",
    date: "30 April 2025",
  },
];

const MyOrdersPage = () => {
  return (
    <div className="min-h-screen bg-[#0a142f] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Pesanan Saya</h2>

        {dummyOrders.length === 0 ? (
          <p className="text-gray-400">Belum ada pesanan yang dibuat.</p>
        ) : (
          dummyOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;