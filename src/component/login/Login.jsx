// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fixedEmail = 'prasad@admin.com';      // 🔐 Fixed email
  const fixedPassword = 'admin123';            // 🔐 Fixed password

  // Already login aithe direct ga /myTabs ki pampinche logic
  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn');
    if (auth === 'true') {
      navigate('/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === fixedEmail &&
      formData.password === fixedPassword
    ) {
      localStorage.setItem('isLoggedIn', 'true');   // ✅ localStorage lo store
      setError('');
      navigate('/dashboard');                          // ✅ redirect to protected page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
