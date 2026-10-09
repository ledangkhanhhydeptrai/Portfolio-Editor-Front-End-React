import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import { authRoutes } from "./AuthRoutes";

import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";
import UserLayout from "../components/layouts/UserLayout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* AUTH */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* PRIVATE */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<UserLayout />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
