import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <div>Loading Authentication...</div>;
  }

  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }

  if (user) {
    return <div>{children}</div>;
  }

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
