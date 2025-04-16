import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginWithGuide = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard')
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '30px' }}>
      {/* Login Form */}
      <div style={{ flex: 1 }}>
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br /><br />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Step-by-step Guide with Code */}
      <div style={{
        flex: 2,
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        maxHeight: '80vh',
        overflowY: 'scroll'
      }}>
        <h3>📘 Step-by-Step Login Auth Guide with Code</h3>
        <ol>
          <li>
            <strong>Step 1: Login Page</strong>
            <p>Create a login form with username and password. Authenticate and store login status.</p>
            <pre style={{ background: '#eee', padding: '10px' }}>
{`if (username === 'admin' && password === '1234') {
  localStorage.setItem('isLoggedIn', 'true');
  navigate('/dashboard');
}`}
            </pre>
          </li><br />

          <li>
            <strong>Step 2: ProtectedRoute Component</strong>
            <p>If user is not logged in, redirect them to login page.</p>
            <pre style={{ background: '#eee', padding: '10px' }}>
{`const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/" />;
};`}
            </pre>
          </li><br />

          <li>
            <strong>Step 3: Dashboard Page</strong>
            <p>Show welcome text and allow logout by clearing login state.</p>
            <pre style={{ background: '#eee', padding: '10px' }}>
{`const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  navigate('/');
};`}
            </pre>
          </li><br />

          <li>
            <strong>Step 4: Routing in App.jsx</strong>
            <p>Wrap the dashboard route with ProtectedRoute.</p>
            <pre style={{ background: '#eee', padding: '10px' }}>
{`<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />`}
            </pre>
          </li>
        </ol>
        <p><strong>🧪 Test Credentials:</strong> Username: <code>admin</code> | Password: <code>1234</code></p>
      </div>
    </div>
  );
};

export default LoginWithGuide;
