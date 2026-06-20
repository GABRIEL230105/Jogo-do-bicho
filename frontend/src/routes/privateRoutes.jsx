import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";


export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};