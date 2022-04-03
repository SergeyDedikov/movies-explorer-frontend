import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ component: RouteComponent, ...props }) => {
  return props.loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <RouteComponent {...props} />
  );
};

export default ProtectedAuthRoute;
