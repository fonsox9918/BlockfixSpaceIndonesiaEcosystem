//src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../components/admin/AdminLayout";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import AdminMessageCenterPage from "../pages/admin/AdminMessageCenterPage";
import EstimationsPage from "../pages/admin/EstimationsPage";
import NotFound from "../pages/user/NotFound";
import AdminProductList from "@/pages/admin/AdminProductList";
import AddProduct from "@/pages/admin/AddProduct";
import EditProduct from "@/pages/admin/EditProduct";
import AdminServiceList from "@/components/admin/services/AdminServiceList";
import ServiceForm from "@/components/admin/services/ServiceForm";



const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      {/* Redirect default /admin ke /admin/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<DashboardAdmin />} />
      <Route path="users" element={<ManageUsersPage />} />
      <Route path="messages" element={<AdminMessageCenterPage />} />
      <Route path="estimations" element={<EstimationsPage />} />
      <Route path="products" element={<AdminProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      <Route path="services" element={<AdminServiceList />} />
      <Route path="services/add" element={<ServiceForm mode="add" />} />
      <Route path="services/edit/:id" element={<ServiceForm mode="edit" />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;