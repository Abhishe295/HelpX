import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) return null;

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
