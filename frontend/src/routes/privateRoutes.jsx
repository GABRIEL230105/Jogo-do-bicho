import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";


export const PrivateRoute = () => {
    const {Signed} = useContext(AuthContext);

    return Signed ? <Outlet /> : <Navigate to="/" />;

    
}