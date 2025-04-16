// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rlogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Fixed users list with role
  const fixedUsers = {
    'admin@prasad.com': { password: 'admin123', role: 'admin' },
    'user@prasad.com': { password: 'user123', role: 'user' },
  };

  // 🔁 If already logged in, redirect to dashboard
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, []);

  // 📥 Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = fixedUsers[formData.email];

    // 🔐 Check email & password
    if (user && user.password === formData.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', user.role); // ✅ Store role
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔐 Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>

      <br />
      <p><strong>Test Logins:</strong></p>
      <ul>
        <li><b>Admin:</b> admin@prasad.com / admin123</li>
        <li><b>User:</b> user@prasad.com / user123</li>
      </ul>
    </div>
  );
};

export default Rlogin;
