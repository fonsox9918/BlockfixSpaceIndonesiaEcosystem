import React from "react";
import UserTable from "../../components/admin/users/UserTable";

const ManageUsersPage = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex justify-center px-4 py-6">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manajemen Pengguna
        </h1>
        <UserTable />
      </div>
    </div>
  );
};

export default ManageUsersPage;