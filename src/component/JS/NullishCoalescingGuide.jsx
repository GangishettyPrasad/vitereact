import React from 'react';

const NullishCoalescingGuide = () => {
  const username = null;
  const age = 0;
  const title = '';
  const fallbackUser = 'Guest';
  const data = {
    user: {
      name: null,
      email: 'sneha@example.com',
    },
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fef9e7', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#d35400' }}>💡 Nullish Coalescing Operator (??) – JSX Telugu Guide</h2>

      <h3 style={{ color: '#6c3483' }}>👉 Nullish Coalescing అంటే ఏమిటి?</h3>
      <p>
        JavaScript లో variables లో null లేదా undefined ఉన్నప్పుడు, default value ఇవ్వడానికి <code>??</code> వాడుతాం. 
        ఇది logical OR (<code>||</code>) కు alternative but more accurate version.
      </p>

      <h3 style={{ color: '#1f618d' }}>📌 Syntax:</h3>
      <pre style={{ background: '#eaf2f8', padding: '1rem' }}>
        <code>{`const result = variable ?? fallbackValue;`}</code>
      </pre>

      <h3 style={{ color: '#117864' }}>🔄 Difference Between || and ??</h3>
      <ul>
        <li><code>||</code> considers: false, 0, '', null, undefined as falsy</li>
        <li><code>??</code> considers only: <strong>null & undefined</strong></li>
      </ul>

      <h3 style={{ color: '#7d6608' }}>✅ Real-Time Examples:</h3>
      <pre style={{ background: '#fcf3cf', padding: '1rem' }}>
        <code>{`const username = null;\nconst display = username ?? "Guest"; // "Guest"`}</code>
      </pre>
      <pre style={{ background: '#d4efdf', padding: '1rem' }}>
        <code>{`const age = 0;\nconst showAge = age ?? 18; // 0 (✅ correct)\nconst showAgeWrong = age || 18; // 18 (❌ unexpected)`}</code>
      </pre>

      <h3 style={{ color: '#b03a2e' }}>⛔ Common Mistake (with ||):</h3>
      <p><strong>Empty string, 0</strong> – these are valid values but <code>||</code> treats them as falsy:</p>
      <pre style={{ background: '#fadbd8', padding: '1rem' }}>
        <code>{`const title = '';\nconst result = title || 'Untitled'; // "Untitled" (❌)\nconst correct = title ?? 'Untitled'; // "" (✅)`}</code>
      </pre>

      <h3 style={{ color: '#2e86c1' }}>⚛️ React Usage:</h3>
      <p>JSX లో fallback values set చేయడానికి:</p>
      <pre style={{ background: '#d6eaf8', padding: '1rem' }}>
        <code>{`<p>{user?.name ?? "Guest User"}</p>\n<p>{user?.email ?? "No Email Found"}</p>`}</code>
      </pre>

      <h3 style={{ color: '#7d3c98' }}>📖 Summary in Telugu:</h3>
      <ul>
        <li><strong>??</strong> Operator null లేదా undefined ఉన్నప్పుడు fallback value set చేస్తుంది.</li>
        <li><strong>||</strong> తో compare చేస్తే, <code>0</code>, <code>''</code> వంటివి తప్పుగా fallbacks ఇస్తాయి.</li>
        <li>React లో data rendering, API data fallback, UI defaults కోసం చాలా useful.</li>
      </ul>

      <p style={{ marginTop: '2rem', color: '#6c3483', fontWeight: 'bold' }}>
        ✅ ఇప్పుడు Next Step: Shall I give deep JSX guide for <strong>JavaScript Promises chaining, error handling</strong>?<br />
        👉 లేదా నీ choice లో ఏదైనా concept next చెప్పు, I’ll build that visually too 🔥
      </p>
    </div>
  );
};

export default NullishCoalescingGuide;
