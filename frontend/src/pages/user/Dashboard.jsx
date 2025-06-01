import React, { useState } from "react";
import WelcomeWithActions from "../../components/user/dashboard/WelcomeWithActions";
import QuickAccessSection from "../../components/user/dashboard/QuickAccessSection";
import RecentTransactionCard from "../../components/user/dashboard/RecentTransactionCard";
import ChatSection from "../../components/user/dashboard/ChatSection";
import EstimatorWidget from "../../components/user/estimator/EstimatorWidget";
import EstimatorPopupForm from "../../components/user/estimator/EstimatorPopupForm";


const Dashboard = () => {
  const [isEstimatorOpen, setEstimatorOpen] = useState(false);
  const [estimatorInput, setEstimatorInput] = useState(null);

  const handleOpenEstimator = (inputData) => {
    setEstimatorInput(inputData);
    setEstimatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <WelcomeWithActions />

      {/* Estimator Section */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <EstimatorWidget onOpenPopup={handleOpenEstimator} />
      </div>

      {/* Estimator Popup */}
      {isEstimatorOpen && estimatorInput && (
        <EstimatorPopupForm
          input={estimatorInput}
          onClose={() => setEstimatorOpen(false)}
        />
      )}

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <QuickAccessSection />
        <RecentTransactionCard />
        <ChatSection />
      </div>
    </div>
  );
};

export default Dashboard;