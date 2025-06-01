const ServiceTable = ({ services, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 text-sm text-white">
        <thead className="bg-gray-800 text-left">
          <tr>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t border-gray-700">
              <td className="px-4 py-2">
                {/* Thumbnail Image */}
                <img
                  src={service.thumbnail || "/default-thumbnail.jpg"} // Tambahkan fallback
                  alt={service.name || "Thumbnail"} // Deskripsi alternatif jika service.name kosong
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{service.name}</td>
              <td className="px-4 py-2">{service.category}</td>
              <td className="px-4 py-2">Rp {Number(service.price).toLocaleString()}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(service)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(service)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;