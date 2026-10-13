import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRoutesProps {
  allowedRoles?: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  allowedRoles
}) => {
  const { isAuthenticated, role, authReady } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;