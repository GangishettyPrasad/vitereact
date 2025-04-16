// Layout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // ✅ login info remove
    navigate('/');                         // ✅ redirect to Login
  };

  return (
    <div>
      {/* ✅ Logout Button (place wherever needed) */}
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
          Logout
        </button>
      </div>

      {/* Rest of your app pages */}
      {children}
    </div>
  );
};

export default Layout;
