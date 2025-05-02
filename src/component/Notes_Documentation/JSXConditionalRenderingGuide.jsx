import React from 'react';

const JSXConditionalRenderingGuide = () => {
  const isLoggedIn = true;
  const user = { name: 'Mounika', city: 'Hyderabad' };
  const messages = ['Hi', 'Welcome back!'];
  const todos = [];

  const getGreeting = (userName) => {
    if (userName) {
      return `Hi, ${userName}!`;
    }
    return 'Hi, Guest!';
  };

  return (
    <div style={{ padding: '2rem', background: '#fef9e7', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#af601a' }}>⚛️ JSX Conditional Rendering Guide </h2>

      <h3 style={{ color: '#884ea0' }}>1️⃣ if-else Statement</h3>
      <p>JSX లో outside condition check చేసి content return చేయవచ్చు.</p>
      <pre style={{ background: '#f5eef8', padding: '1rem' }}>
        <code>
{`function getGreeting(userName) {
  if (userName) return \`Hi, \${userName}!\`;
  return 'Hi, Guest!';
}`}
        </code>
      </pre>
      <p><strong>Output:</strong> {getGreeting(user.name)}</p>

      <h3 style={{ color: '#2471a3' }}>2️⃣ Ternary Operator</h3>
      <p>One-line condition check & return.</p>
      <pre style={{ background: '#d6eaf8', padding: '1rem' }}>
        <code>{`{isLoggedIn ? "Welcome, Mounika!" : "Please log in."}`}</code>
      </pre>
      <p><strong>Output:</strong> {isLoggedIn ? "Welcome, Mounika!" : "Please log in."}</p>

      <h3 style={{ color: '#239b56' }}>3️⃣ Logical AND (&&)</h3>
      <p>Condition true అయితే మాత్రమే show చేస్తుంది.</p>
      <pre style={{ background: '#d5f5e3', padding: '1rem' }}>
        <code>{`{messages.length > 0 && <p>You have {messages.length} messages</p>}`}</code>
      </pre>
      {messages.length > 0 && <p>You have {messages.length} messages</p>}

      <h3 style={{ color: '#ca6f1e' }}>4️⃣ Conditional Arrays Render</h3>
      <p>Array empty అయితే fallback message ఇవ్వొచ్చు.</p>
      <pre style={{ background: '#fdebd0', padding: '1rem' }}>
        <code>{`{todos.length === 0 ? <p>No tasks</p> : todos.map(...)}`}</code>
      </pre>
      {todos.length === 0 ? <p>No tasks</p> : todos.map((todo, i) => <li key={i}>{todo}</li>)}

      <h3 style={{ color: '#6c3483' }}>5️⃣ Optional Chaining + Fallback</h3>
      <p>object data ఉండకపోయినా fallback value ఇవ్వచ్చు.</p>
      <pre style={{ background: '#e8daef', padding: '1rem' }}>
        <code>{`<p>{user?.name || "Guest User"}</p>`}</code>
      </pre>
      <p>{user?.name || "Guest User"}</p>

      <h3 style={{ color: '#1a5276' }}>6️⃣ Real-Time Example with JSX & Array</h3>
      <p>Users Array ఉంటే list చూపించాలి, లేకపోతే message ఇవ్వాలి.</p>
      <pre style={{ background: '#d4efdf', padding: '1rem' }}>
        <code>
{`const usersList = [
  { id: 1, name: 'Mounika' },
  { id: 2, name: 'Sagar' }
];

{usersList.length > 0 
  ? usersList.map(user => <p key={user.id}>{user.name}</p>)
  : <p>No users found</p>
}`}
        </code>
      </pre>

      <h4>Rendered Output:</h4>
      {[
        { id: 1, name: 'Mounika' },
        { id: 2, name: 'Sagar' }
      ].length > 0
        ? [
            { id: 1, name: 'Mounika' },
            { id: 2, name: 'Sagar' }
          ].map(user => <p key={user.id}>{user.name}</p>)
        : <p>No users found</p>}

      <h3 style={{ color: '#117864', marginTop: '2rem' }}>📝 Summary (Telugu Recap):</h3>
      <ul>
        <li><strong>if / if-else</strong> → complex logic cases</li>
        <li><strong>ternary ( ? : )</strong> → inline simple conditions</li>
        <li><strong>&& operator</strong> → display only if true</li>
        <li><strong>optional chaining (?.)</strong> → avoid errors from undefined</li>
        <li><strong>Array.map + fallback</strong> → dynamic list rendering</li>
      </ul>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', color: '#9c640c' }}>
        ✅ ఈ concept React UI conditions build చేయడంలో core role play చేస్తుంది. <br />
        👉 Shall we move on to the next topic: <strong>JSX Event Handling Deep Dive?</strong>
      </p>
    </div>
  );
};

export default JSXConditionalRenderingGuide;
