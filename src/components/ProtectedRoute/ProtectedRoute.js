import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...props }) => {
  return props.loggedIn === false ? (
    <Navigate to="/" replace />
  ) : (
    <RouteComponent {...props} />
  );
};

export default ProtectedRoute;
