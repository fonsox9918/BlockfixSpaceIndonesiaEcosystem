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
    <div className="min-h-screen bg-white text-gray-900">
      <WelcomeWithActions />

      {/* Estimator Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 space-y-6 lg:space-y-8">
        <QuickAccessSection />
        <RecentTransactionCard />
        <ChatSection />
      </div>
    </div>
  );
};

export default Dashboard;