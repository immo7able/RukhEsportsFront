import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthenticated, isAdmin, requiresAdmin, ...rest }) => {
  // console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'isAdmin:', isAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiresAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
