import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <div>Loading Authentication...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  if (user) {
    return <Outlet />;
  }
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
