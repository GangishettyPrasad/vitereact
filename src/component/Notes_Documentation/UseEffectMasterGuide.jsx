import React, { useEffect, useState } from 'react';

const UseEffectRealTimeExamples = () => {
  const [apiData, setApiData] = useState(null);
  const [status, setStatus] = useState('Offline');
  const [titleCount, setTitleCount] = useState(0);
  const [user, setUser] = useState(null);
  const [propsValue, setPropsValue] = useState('Initial');

  // 1️⃣ 📋 Fetching API data once (on mount)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1') // dummy API
      .then(res => res.json())
      .then(data => setApiData(data));
  }, []);

  // 2️⃣ 🧾 Subscribing to online/offline (or WebSocket)
  useEffect(() => {
    const handleStatus = () => {
      setStatus(navigator.onLine ? 'Online' : 'Offline');
    };
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    handleStatus(); // initial check

    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  // 3️⃣ 💬 Auto-updating document title (on state change)
  useEffect(() => {
    document.title = `🔁 You clicked ${titleCount} times`;
  }, [titleCount]);

  // 4️⃣ 🔐 Auth check or Redirect
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('🔐 No token found, redirecting...');
      // redirect to login: window.location.href = '/login';
    } else {
      setUser({ name: 'John', role: 'Admin' });
    }
  }, []);

  // 5️⃣ 📊 Re-render based on props-like change (simulated here)
  useEffect(() => {
    console.log(`📊 propsValue changed to: ${propsValue}`);
  }, [propsValue]);

  return (
    <div style={{ fontFamily: 'Segoe UI', padding: '2rem', lineHeight: '1.8' }}>
      <h1 style={{ color: '#2e86c1' }}>📘 useEffect Real-Time Examples</h1>

      {/* 1. API Data */}
      <section style={{ marginTop: '2rem', border: '2px solid #aed6f1', padding: '1rem' }}>
        <h2>📋 1️⃣ API Fetch on Mount</h2>
        <p><strong>Title:</strong> {apiData?.title}</p>
        <p><strong>Body:</strong> {apiData?.body}</p>
        <code>✅ useEffect([]) → fetches data once</code>
      </section>

      {/* 2. Online/Offline */}
      <section style={{ marginTop: '2rem', border: '2px solid #f7dc6f', padding: '1rem' }}>
        <h2>🧾 2️⃣ Online/Offline Status</h2>
        <p>🌐 You are currently: <strong>{status}</strong></p>
        <code>✅ useEffect with event listeners (online/offline)</code>
      </section>

      {/* 3. Document Title */}
      <section style={{ marginTop: '2rem', border: '2px solid #d7bde2', padding: '1rem' }}>
        <h2>💬 3️⃣ Auto Update Title</h2>
        <button onClick={() => setTitleCount(prev => prev + 1)}>
          Click Me: {titleCount}
        </button>
        <p>🔁 Title will update every click</p>
      </section>

      {/* 4. Auth Check */}
      <section style={{ marginTop: '2rem', border: '2px solid #f5b7b1', padding: '1rem' }}>
        <h2>🔐 4️⃣ Auth Redirect</h2>
        <p>{user ? `Welcome, ${user.name} 🎉` : 'Redirecting to login...'}</p>
        <code>🔐 Check auth token on mount</code>
      </section>

      {/* 5. Re-render Based on Props */}
      <section style={{ marginTop: '2rem', border: '2px solid #a9dfbf', padding: '1rem' }}>
        <h2>📊 5️⃣ Props Simulation</h2>
        <button onClick={() => setPropsValue('Updated Value')}>
          Update "Props"
        </button>
        <p>Value: <strong>{propsValue}</strong></p>
        <code>📊 Simulates prop change with state</code>
      </section>

      {/* Telugu Explanation */}
      <section style={{ marginTop: '2rem', border: '2px dashed #bbb', padding: '1rem', background: '#fcf3cf' }}>
        <h3 style={{ color: '#af601a' }}>📗 Telugu Explanation</h3>
        <ul>
          <li>📋 API Calls: Component load అవగానే fetch చేయడానికి</li>
          <li>🧾 Online/Offline: Event listener ద్వారా డిటెక్ట్ చేయడానికి</li>
          <li>💬 Title Update: UI interaction తో టైటిల్ మార్చడానికి</li>
          <li>🔐 Auth: Token check చేసి redirect చేయడానికి</li>
          <li>📊 Props-like Changes: prop value simulate చేయడానికి</li>
        </ul>
      </section>
    </div>
  );
};

export default UseEffectRealTimeExamples;
