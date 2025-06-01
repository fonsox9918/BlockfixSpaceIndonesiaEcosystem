import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BlockfixSpinner from "../animasi/BlockfixSpinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return <BlockfixSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login-email" replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
