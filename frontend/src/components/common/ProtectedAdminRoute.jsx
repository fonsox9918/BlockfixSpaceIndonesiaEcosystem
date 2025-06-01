import { Navigate } from 'react-router-dom';
import BlockfixSpinner from '../animasi/BlockfixSpinner';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
const { currentAdmin, loading } = useAdminAuth();

if (loading) return <BlockfixSpinner />;

if (!currentAdmin || currentAdmin.role !== 'admin') {
return <Navigate to="/admin/login" />;
}

return children;
};

export default ProtectedAdminRoute;

