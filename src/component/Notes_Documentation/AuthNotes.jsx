import React from 'react';

/**
 * ✅ AUTH NOTES COMPONENT
 * Single file with Axios setup, Login page, Profile API usage, and Routing explained in UI.
 * Telugu + Code shown in <pre> format for easy learning.
 */
const AuthNotes = () => {
  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <h5>📘 React Token Authentication Guide (Code Notes)</h5>

      {/* 1️⃣ Axios Instance Setup */}
      <h2>1️⃣ AxiosInstance.js – Axios Setup with Token</h2>
      <pre style={style}>
{`// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default axiosInstance;
`}
      </pre>
      <p><strong>🗒️ Telugu Explanation:</strong><br />
        ✅ Axios instance తయారు చేసి, ప్రతి API కాల్ లో token attach చేయడానికి interceptor వాడాం.<br />
        ✅ దీన్ని అన్ని pages/components లో reuse చేయవచ్చు.</p>

      {/* 2️⃣ Login Page */}
      <h2>2️⃣ TokenLogin.jsx – Login Page with Token Storage</h2>
      <pre style={style}>
{`// TokenLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TokenLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.example.com/login', {
        username,
        password
      });

      localStorage.setItem('authToken', response.data.token);
      alert('Login successful!');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TokenLogin;
`}
      </pre>
      <p><strong>🗒️ Telugu Explanation:</strong><br />
        🔐 యూజర్ లాగిన్ చేస్తాడు → API కి request పంపిస్తాం → టోకెన్ వస్తే localStorage లో నిల్వ చేస్తాం.<br />
        🔁 తరువాత protected pages లో టోకెన్ వాడుతాం.</p>

      {/* 3️⃣ Protected API Usage */}
      <h2>3️⃣ UserProfile.jsx – Protected API Call Using Token</h2>
      <pre style={style}>
{`// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/profile');
        setProfile(res.data);
      } catch (err) {
        setError('Token expired or invalid');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
};

export default UserProfile;
`}
      </pre>
      <p><strong>🗒️ Telugu Explanation:</strong><br />
        🔒 Login జరిగిన తరువాత మాత్రమే ఈ API పనిచేస్తుంది.<br />
        ✅ axiosInstance టోకెన్‌తో beraber request పంపుతుంది.<br />
        ✅ Server టోకెన్‌ను వెరిఫై చేసి డేటా పంపుతుంది.</p>

      {/* 4️⃣ App.js with Routing */}
      <h2>4️⃣ App.js – Main App Routing (Optional)</h2>
      <pre style={style}>
{`// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenLogin from './TokenLogin';
import UserProfile from './UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenLogin />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
`}
      </pre>
      <p><strong>🗒️ Telugu Explanation:</strong><br />
        🚦 React Router ద్వారా pages navigate అవుతాయి.<br />
        👉 Login పేజీ root (/) లో ఉంటుంది.<br />
        👉 Profile పేజీకు access ఇచ్చే ముందు user login అయ్యాడా అనే విషయాన్ని వెరిఫై చేయాలి.</p>
    </div>
  );
};

const style = {
  background: '#f4f4f4',
  padding: '12px',
  borderRadius: '8px',
  overflowX: 'auto',
  marginBottom: '20px',
  fontSize: '14px',
};

export default AuthNotes;
