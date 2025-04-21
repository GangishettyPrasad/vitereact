import React from 'react';

const OptionalChainingGuide = () => {
  const user = {
    id: 1,
    name: 'mounika',
    address: {
      city: 'Hyderabad',
      country: 'India',
      pin: 500001
    },
    posts: [
      { id: 1, title: 'React Guide' },
      { id: 2, title: 'JavaScript Deep Dive' }
    ]
  };

  const undefinedUser = null;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5eef8', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#8e44ad' }}>💡 Optional Chaining & Safe Accessing (Telugu JSX Guide)</h2>

      <h3 style={{ color: '#1f618d' }}>👉 Optional Chaining అంటే ఏమిటి?</h3>
      <p>
        JavaScript లో nested properties లేక object లో ఏదైనా value <code>undefined</code> అవ్వచ్చూ. 
        అలాంటి time లో dot notation వాడితే <strong>error వస్తుంది</strong>.<br />
        ఈ సమస్యకి solution అంటే <strong>Optional Chaining (?.)</strong>.
      </p>

      <h3 style={{ color: '#117864' }}>📌 Syntax:</h3>
      <pre style={{ background: '#eafaf1', padding: '1rem' }}>
        <code>{`object?.property?.subProperty`}</code>
      </pre>

      <h3 style={{ color: '#b9770e' }}>✅ Real-Time Example:</h3>
      <pre style={{ background: '#fcf3cf', padding: '1rem' }}>
        <code>{`user?.address?.city // "Hyderabad"
undefinedUser?.name // undefined (but no error)`}</code>
      </pre>

      <h3 style={{ color: '#b03a2e' }}>⛔ Without Optional Chaining:</h3>
      <pre style={{ background: '#fadbd8', padding: '1rem' }}>
        <code>{`// ❌ Error: Cannot read properties of null
const pin = undefinedUser.address.pin;`}</code>
      </pre>

      <h3 style={{ color: '#1f618d' }}>✅ With Optional Chaining:</h3>
      <pre style={{ background: '#d5f5e3', padding: '1rem' }}>
        <code>{`const pin = undefinedUser?.address?.pin; // ✅ undefined`}</code>
      </pre>

      <h3 style={{ color: '#154360' }}>🔄 Optional Chaining in Arrays</h3>
      <p>Array లో nth item access చేయాలంటే:</p>
      <pre style={{ background: '#d6eaf8', padding: '1rem' }}>
        <code>{`user?.posts?.[0]?.title // "React Guide"`}</code>
      </pre>

      <h3 style={{ color: '#0b5345' }}>📌 React Usage Example:</h3>
      <pre style={{ background: '#e8f8f5', padding: '1rem' }}>
        <code>{`<p>{user?.address?.city}</p>
<p>{undefinedUser?.name || "Guest User"}</p>`}</code>
      </pre>

      <h3 style={{ color: '#7d3c98' }}>📖 Summary (Recap in Telugu):</h3>
      <ul>
        <li><strong>Optional chaining</strong> వల్ల nested property undefined అయినా error రాదు.</li>
        <li>It gives <code>undefined</code> instead of crashing your app.</li>
        <li>React లో API responses, conditional rendering, nested data checks లో useful.</li>
      </ul>

      <p style={{ marginTop: '2rem', color: '#6c3483', fontWeight: 'bold' }}>
        ✅ నెక్స్ట్ స్టెప్: Execution Context & Call Stack already complete. <br />
        👉 మళ్ళీ ఏదైనా concept deep-dive కావాలా? లేక Summary page with all links కావాలా?
      </p>
    </div>
  );
};

export default OptionalChainingGuide;
