const ProtectedRouteGuide = () => {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#e3f2fd' }}>
        <h2 style={{ color: '#0d47a1' }}>🛡️ ProtectedRoute.jsx</h2>
  
        <p>
          <strong>ఈ Component</strong> user login అయ్యాడా? మరియు allowed role ఉన్నాడా? అనే రెండు checks చేస్తుంది.
        </p>
  
        <pre style={{ background: '#bbdefb', padding: '1rem', borderRadius: '10px', color: '#0d47a1' }}>
  {`import React from 'react';
  import { Navigate } from 'react-router-dom';
  
  const ProtectedRoute = ({ children, allowedRoles }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
  
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
  
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;`}
        </pre>
      </div>
    );
  };
  
  export default ProtectedRouteGuide;
  