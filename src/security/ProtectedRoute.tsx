import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const ProtectedRoute = ({children}: {children?: ReactNode}) => {
    const {token} = useAuth();
    return token ? children : <Navigate to="/entrar"/>
}