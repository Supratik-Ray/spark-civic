import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const { profile, session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p> Loading...</p>;

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (role && profile?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

