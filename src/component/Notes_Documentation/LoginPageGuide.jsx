const LoginPageGuide = () => {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#fffde7' }}>
        <h2 style={{ color: '#4a148c' }}>🔐 Login Page (Login.jsx)</h2>
  
        <p><strong>ఈ Page</strong> user login attempt చేసినప్పుడు backend తో check చేసి, role (admin/user) localStorage లో save చేస్తుంది.</p>
  
        <pre style={{ background: '#f3e5f5', padding: '1rem', borderRadius: '10px', color: '#4a148c' }}>
  {`import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // ✅ Backend తో Authenticate చేయడం
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', data.role); // 👉 Server నుంచి వచ్చిన Role
        navigate('/dashboard');
      } else {
        setError('Invalid Credentials');
      }
    };
  
    return (
      <div>
        <h2>🔐 Login Page</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} placeholder="Email" /><br />
          <input type="password" name="password" onChange={handleChange} placeholder="Password" /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;`}
        </pre>
      </div>
    );
  };
  
  export default LoginPageGuide;
  