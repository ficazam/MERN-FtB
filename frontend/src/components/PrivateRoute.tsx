import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./Spinner";

import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { logged, loading } = useAuthStatus();

  if (loading) return <Spinner />;
  return logged ? <Outlet /> : <Navigate to="/login" />;
};
