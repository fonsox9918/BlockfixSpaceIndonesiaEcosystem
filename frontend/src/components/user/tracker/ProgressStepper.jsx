import React from "react";

const steps = ["Survey", "Desain", "Produksi", "Pemasangan", "Selesai"];

const ProgressStepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mt-6 mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              index <= currentStep ? "bg-blue-500 text-white" : "bg-slate-600 text-slate-300"
            }`}
          >
            {index + 1}
          </div>
          <p className="text-xs mt-1 text-center text-white">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;