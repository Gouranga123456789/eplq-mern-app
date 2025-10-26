import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useAuth();
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (!adminOnly && userInfo.isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute;