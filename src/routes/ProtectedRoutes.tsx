import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const ProtectedRoutes: React.FC = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;