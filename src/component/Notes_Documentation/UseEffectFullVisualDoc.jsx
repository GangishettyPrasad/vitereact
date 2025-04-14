import React, { useEffect, useState } from 'react';

const UseEffectFullVisualDoc = () => {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(navigator.onLine);
  const [user, setUser] = useState(null);
  const [titleToggle, setTitleToggle] = useState(false);
  const [auth, setAuth] = useState(true);

  // ✅ 1. useEffect without dependency – every render
  useEffect(() => {
    console.log('🔁 Every render');
  });

  // ✅ 2. useEffect with [] – only once (on mount)
  useEffect(() => {
    console.log('📋 Mounted: API call');
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  // ✅ 3. useEffect with [count] – runs on count change
  useEffect(() => {
    console.log('🧾 Count changed:', count);
  }, [count]);

  // ✅ 4. Cleanup function (event listener)
  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      console.log('🧹 Cleaned up listeners');
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // ✅ 5. DOM Title Update
  useEffect(() => {
    document.title = titleToggle ? '🌙 Dark Mode' : '☀️ Light Mode';
  }, [titleToggle]);

  // ✅ 6. Simulate Auth redirect
  useEffect(() => {
    if (!auth) {
      console.log('🔐 Redirecting to login...');
      alert('You are not logged in! Redirecting...');
    }
  }, [auth]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#fffdf9' }}>
      <h2 style={{ color: '#8e44ad' }}>📚 useEffect Full Visual Guide (JSX Style + Telugu)</h2>

      <h3 style={{ color: '#1f618d' }}>📌 useEffect అంటే ఏంటి?</h3>
      <p>
        React లో <strong>side effects</strong> (API calls, title changes, event listeners, etc.)
        handle చేయాలంటే useEffect వాడతాం. <br />
        ఇది <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code> equivalent గా పని చేస్తుంది.
      </p>

      <h3 style={{ color: '#117864' }}>🧩 Syntax:</h3>
      <pre style={{ background: '#f4f9f9', padding: '1rem' }}>
        <code>{`useEffect(() => {
  // logic here
  return () => {
    // optional cleanup
  };
}, [dependencies]);`}</code>
      </pre>

      <h3 style={{ color: '#b9770e' }}>🔁 Types of useEffect</h3>
      <ul>
        <li>✅ No dependencies – runs every render</li>
        <li>✅ Empty array <code>[]</code> – runs only on mount</li>
        <li>✅ With [deps] – runs when deps change</li>
        <li>🧹 With cleanup – to clear event/timer</li>
      </ul>

      <h3 style={{ color: '#6e2c00' }}>🧠 Real-time Examples:</h3>
      <ul>
        <li>📋 Fetching API data once (on mount)</li>
        <li>💬 Listening to online/offline status change</li>
        <li>🎯 Auto-updating document title</li>
        <li>🔐 Authentication redirect simulation</li>
        <li>📊 Re-render UI when state (count) changes</li>
      </ul>

      <hr />

      <h3 style={{ color: '#2471a3' }}>⚙ Live Demo</h3>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Count:</strong> {count}
        <button onClick={() => setCount(prev => prev + 1)} style={{ marginLeft: '1rem' }}>
          ➕ Increment
        </button>
      </div>

      <div>
        <strong>👤 User from API:</strong> {user?.name || 'Loading...'}
      </div>

      <div>
        <strong>📶 Online Status:</strong>{' '}
        <span style={{ color: online ? 'green' : 'red' }}>
          {online ? 'Online' : 'Offline'}
        </span>
      </div>

      <div>
        <strong>🌙 Title Toggle:</strong>
        <button onClick={() => setTitleToggle(!titleToggle)} style={{ marginLeft: '1rem' }}>
          Toggle Title
        </button>
      </div>

      <div>
        <strong>🔐 Simulate Logout:</strong>
        <button onClick={() => setAuth(false)} style={{ marginLeft: '1rem', color: 'white', background: 'crimson' }}>
          Logout
        </button>
      </div>

      <hr />

      <h3 style={{ color: '#5d6d7e' }}>📝 Recap in Telugu</h3>
      <ul>
        <li>✅ Mount time API calls – use <code>[]</code></li>
        <li>✅ State-based updates – use <code>[state]</code></li>
        <li>✅ Cleanup – use <code>return()</code> inside effect</li>
        <li>✅ DOM changes, document.title update, online/offline</li>
        <li>🔐 Props/state check + conditional logic</li>
      </ul>

      <p style={{ marginTop: '1rem', color: '#7d6608' }}>
        💡 Deep understanding of useEffect is a **must** for real-time, large-scale React applications.
      </p>
    </div>
  );
};

export default UseEffectFullVisualDoc;
