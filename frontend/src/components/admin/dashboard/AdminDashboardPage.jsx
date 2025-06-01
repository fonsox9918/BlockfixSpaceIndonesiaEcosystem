import React from "react";
import AdminStatsCards from "./AdminStatsCards";
import AdminAnalyticsOverview from "./AdminAnalyticsOverview";
import EstimationDashboardWidget from "./EstimationDashboardWidget";
import AdminRecentProjectsTable from "./AdminRecentProjectsTable";

const AdminDashboardPage = () => {
  return (
    <main className="p-4 md:p-6 space-y-6 bg-white text-[#0a142f] min-h-screen">
      <AdminStatsCards />
      <AdminAnalyticsOverview />
      <EstimationDashboardWidget />
      <AdminRecentProjectsTable />
    </main>
  );
};

export default AdminDashboardPage;