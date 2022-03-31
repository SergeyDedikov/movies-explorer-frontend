import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...props }) => {
  return props.loggedIn ? (
    <RouteComponent {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
