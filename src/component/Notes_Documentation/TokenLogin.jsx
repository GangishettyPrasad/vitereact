import React, { useState } from 'react';
import axios from 'axios';
import AuthNotes from './AuthNotes';

const TokenLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // For displaying protected data

  // Step 1: Login API Call
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password,
      });

      // Step 2: Storing the Token
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      alert('Login Successful');

      // Step 3: Call protected API using stored token
      await fetchProtectedData(token);
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Fetch Protected API Data using Token
  const fetchProtectedData = async (token) => {
    try {
      const response = await axios.get('https://api.example.com/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      setError('Failed to fetch protected data. Token may be invalid.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>🔐 Login Page with Token Authentication</h2>

      {/* Step-by-step Explanation in Telugu */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>📝 Step-by-Step Explanation in Telugu:</h3>
        <p><strong>Step 1 - Login API Call (లాగిన్ API కాల్):</strong> యూజర్‌నేమ్ మరియు పాస్వర్డ్ పంపించి, సర్వర్ నుండి టోకెన్ పొందడం.</p>
        <p><strong>Step 2 - Storing the Token (టోకెన్ నిల్వ):</strong> టోకెన్‌ని <code>localStorage</code> లో స్టోర్ చేయడం.</p>
        <p><strong>Step 3 - Sending Token (టోకెన్ పంపడం):</strong> టోకెన్‌ను <code>Authorization</code> హెడ్డర్‌లో పంపి ప్రొటెక్టెడ్ API లను access చేయడం.</p>
        <p><strong>Step 4 - Fetching Protected Data (ప్రొటెక్టెడ్ డేటా తీసుకోవడం):</strong> టోకెన్‌తో వెరిఫై అయిన యూజర్ డేటాను చూపించడం.</p>
      </div>

      {/* Form */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Protected Data */}
      {userData && (
        <div style={{ backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <h4>🎉 Logged-in User Data (Protected API Response):</h4>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}


      <> authonication full login and token stored in globally </>
      <><AuthNotes/></>
    </div>
  );
};

export default TokenLogin;
