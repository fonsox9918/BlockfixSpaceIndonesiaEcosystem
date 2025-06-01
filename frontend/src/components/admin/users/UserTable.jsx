import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCol = collection(db, "users");
      const snapshot = await getDocs(usersCol);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full overflow-x-auto bg-white shadow rounded-xl p-4">
      <table className="min-w-[1000px] table-auto text-sm">
        <thead className="bg-[#0a142f] text-white">
          <tr>
            <th className="px-4 py-2 min-w-[50px] text-left">No</th>
            <th className="px-4 py-2 min-w-[150px] text-left">Nama</th>
            <th className="px-4 py-2 min-w-[200px] text-left">Email</th>
            <th className="px-4 py-2 min-w-[100px] text-left">Role</th>
            <th className="px-4 py-2 min-w-[100px] text-left">Status</th>
            <th className="px-4 py-2 min-w-[130px] text-left">No. HP</th>
            <th className="px-4 py-2 min-w-[200px] text-left">Alamat</th>
            <th className="px-4 py-2 min-w-[200px] text-left">UID</th>
            <th className="px-4 py-2 min-w-[160px] text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 text-black">
              <td className="px-4 py-2">{(currentPage - 1) * usersPerPage + index + 1}</td>
              <td className="px-4 py-2">{user.name || "-"}</td>
              <td className="px-4 py-2">{user.email || "-"}</td>
              <td className="px-4 py-2 capitalize">{user.role || "-"}</td>
              <td className="px-4 py-2">
                {user.isActive ? (
                  <span className="text-green-600 font-medium">Aktif</span>
                ) : (
                  <span className="text-red-500 font-medium">Nonaktif</span>
                )}
              </td>
              <td className="px-4 py-2">{user.phoneNumber || "-"}</td>
              <td className="px-4 py-2">{user.address || "-"}</td>
              <td className="px-4 py-2 text-xs break-all">{user.uid || "-"}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => alert(`Hubungi ${user.name}`)}
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                >
                  Chat
                </button>
                <button
                  onClick={() => alert(`Kirim notifikasi ke ${user.name}`)}
                  className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Notif
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Menampilkan {(currentPage - 1) * usersPerPage + 1} -{" "}
          {Math.min(currentPage * usersPerPage, users.length)} dari {users.length} pengguna
        </p>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm font-medium">
            Halaman {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;