import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const RoleRoute = ({ children, role }) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/" />;

  if (user.role !== role) return <Navigate to="/" />;

  return children;
};

export default RoleRoute;
