// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "1";

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
