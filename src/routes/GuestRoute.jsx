import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function GuestRoute({ children }) {
  const { session } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  if (session?.user && !from) return <Navigate to="/" replace />;

  return children;
}

export default GuestRoute;
