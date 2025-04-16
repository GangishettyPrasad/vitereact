// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role');

  if (!isLoggedIn) {
    return <Navigate to="/" />; // 👈 Not logged in? Go to Login
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // 👈 Role mismatch
  }

  return children; // ✅ All OK
};

export default RProtectedRoute;
