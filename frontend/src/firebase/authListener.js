import { useState, useEffect } from "react";
import { listenToAuthChanges } from "./firebase/authListener";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    listenToAuthChanges(setUser, setRole);
  }, []);

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "client" && <ClientDashboard />}
      {role === "tukang" && <WorkerDashboard />}
      {!user && <LoginPage />}
    </>
  );
}