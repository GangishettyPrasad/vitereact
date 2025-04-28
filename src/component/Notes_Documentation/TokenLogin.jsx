import React, { useState } from 'react';
import axios from 'axios';

const TokenLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Login API Call
  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password,
      });

      // Step 2: Storing the Token
      localStorage.setItem('authToken', response.data.token);

      alert('Login Successful');
      // Redirect to Dashboard or another page if needed

    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Step 3: Display Explanation in UI */}
      <div style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <h3>Step-by-Step Explanation in Telugu:</h3>
        <p><strong>Step 1 - Login API Call (లాగిన్ API కాల్):</strong> API నుండి క్రెడెన్షియల్స్ పంపి, టోకెన్‌ను పొందడం.</p>
        <p><strong>Step 2 - Storing the Token (టోకెన్‌ను నిల్వ చేయడం):</strong> సర్వర్ నుండి లభించిన టోకెన్‌ను <code>localStorage</code> లో నిల్వ చేయడం.</p>
        <p><strong>Step 3 - Sending the Token (టోకెన్‌ను పంపించడం):</strong> ఫ్యూచర్ API కాల్స్ కోసం Authorization హెడ్డర్‌లో టోకెన్‌ను పంపడం.</p>
        <p><strong>Step 4 - Verifying the Token (టోకెన్‌ను నిర్ధారించటం):</strong> సర్వర్ ఈ టోకెన్‌ని వెరిఫై చేసి యూజర్‌కు ప్రాపర్టీ పేజీలకు యాక్సెస్ ఇవ్వడం.</p>
      </div>

      {/* Step 4: Error and Loading States */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Step 5: Login Form */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          Login
        </button>
      </div>
    </div>
  );
};

export default TokenLogin;
