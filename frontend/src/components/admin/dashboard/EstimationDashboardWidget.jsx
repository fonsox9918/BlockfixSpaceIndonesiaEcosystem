// src/components/admin/dashboard/EstimationDashboardWidget.jsx
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig"; // pastikan path ini sesuai
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const EstimationDashboardWidget = () => {
  const [latestEstimations, setLatestEstimations] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "estimations"),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLatestEstimations(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Permintaan Estimasi Terbaru</h3>
      {latestEstimations.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada permintaan terbaru.</p>
      ) : (
        <ul className="space-y-3">
          {latestEstimations.map((item) => (
            <li key={item.id} className="border-b pb-2">
              <p className="text-sm text-gray-800 font-medium">{item.name} - {item.propertyType}</p>
              <p className="text-xs text-gray-600">{new Date(item.createdAt?.seconds * 1000).toLocaleString()}</p>
              <p className="text-xs text-gray-500">{item.email} | {item.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EstimationDashboardWidget;