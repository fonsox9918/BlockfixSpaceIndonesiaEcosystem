import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const WelcomeSection = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("Pengguna");

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data().name) {
          setDisplayName(userDoc.data().name);
        } else if (currentUser.displayName) {
          setDisplayName(currentUser.displayName);
        }
      }
    };

    fetchDisplayName();
  }, [currentUser]);

  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold">Halo, {displayName}!</h2>
      <p className="text-sm text-gray-300">
        Selamat datang di dashboard Blockfix
      </p>
    </div>
  );
};

export default WelcomeSection;