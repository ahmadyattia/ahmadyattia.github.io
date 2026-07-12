import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface CustomizedState {
  from: Location;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  const state = location.state as CustomizedState | null;

  if (loading) {
    return <div style={{ color: "white" }}>Loading Authentication...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"} state={state} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
