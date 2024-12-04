import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ role, allowedRoles, children }) => {
    if (!allowedRoles.includes(role)) {
        // Redirige si el rol no está permitido
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleProtectedRoute;
