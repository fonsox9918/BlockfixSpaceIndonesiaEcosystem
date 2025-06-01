import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import EstimationCard from "@/components/admin/estimations/EstimationCard";
import EstimationDetailModal from "@/components/admin/estimations/EstimationDetailModal";
import EstimationFilterBar from "@/components/admin/estimations/EstimationFilterBar";

const EstimationsPage = () => {
  const [estimations, setEstimations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "estimations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEstimations(data);
    };
    fetchData();
  }, []);

  const filtered = estimations.filter(e =>
    e.name?.toLowerCase().includes(filter.toLowerCase()) ||
    e.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Permintaan Estimasi</h1>
      <EstimationFilterBar filter={filter} onChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((estimation) => (
          <EstimationCard key={estimation.id} data={estimation} onClick={setSelected} />
        ))}
      </div>
      <EstimationDetailModal data={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default EstimationsPage;