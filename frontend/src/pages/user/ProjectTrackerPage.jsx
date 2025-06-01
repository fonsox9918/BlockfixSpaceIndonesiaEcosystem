// src/pages/user/ProjectTrackerPage.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import ProjectHeader from "../../components/user/tracker/ProjectHeader";
import ProgressStepper from "../../components/user/tracker/ProgressStepper";
import TimelineUpdates from "../../components/user/tracker/TimelineUpdates";
import ContactTechnicianCard from "../../components/user/tracker/ContactTechnicianCard";

const ProjectTrackerPage = () => {
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [technician, setTechnician] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "projects"), where("clientId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const projData = querySnapshot.docs[0].data();
          setProject({
            name: projData.name,
            location: projData.location,
            startDate: projData.startDate,
            status: projData.status,
          });
          setUpdates(projData.updates || []);
          setTechnician(projData.technician || null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!project) {
    return (
      <div className="bg-[#0a142f] min-h-screen text-white flex justify-center items-center">
        <p>Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a142f] min-h-screen text-white">
      <div className="max-w-3xl mx-auto p-4">
        <ProjectHeader project={project} />
        <ProgressStepper currentStep={3} />
        <TimelineUpdates updates={updates} />
        {technician && <ContactTechnicianCard technician={technician} />}
      </div>
    </div>
  );
};

export default ProjectTrackerPage;