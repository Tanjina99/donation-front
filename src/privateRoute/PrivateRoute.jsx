import React from "react";
import AuthProvider from "../utils/authProvider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ element, requiredRole }) => {
  const { user, loading } = AuthProvider();
  console.log(user);
  if (loading) {
    return (
      <div>
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return element;
};

export default PrivateRoute;
