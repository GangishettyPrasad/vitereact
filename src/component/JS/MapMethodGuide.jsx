import React from 'react';

const MapMethodGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#fafafa', lineHeight: 1.7 }}>
      <h2 style={{ color: '#007acc' }}>🧠 JavaScript & React - <code>map()</code> Method – Full Guide in Telugu</h2>

      <p>
        <strong>map()</strong> method అనేది array లోని ప్రతి element మీద operation చేసి, ఒక కొత్త array return చేస్తుంది.
        ఇది original array ని change చెయ్యదు (immutability).
      </p>

      {/* Syntax */}
      <h3 style={{ color: '#0d7c8c' }}>🔹 Basic Syntax</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`const newArray = oldArray.map((item, index) => {
  return item * 2;
});`}</code>
      </pre>

      {/* Example 1 */}
      <h3 style={{ color: '#0c7a6f' }}>1️⃣ Simple Array – Multiply Each Element by 2</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
// Output: [2, 4, 6, 8]
        `}</code>
      </pre>
      <p>📘 <strong>Telugu:</strong> ప్రతి number ని double చేస్తుంది, కానీ original array change అవదు.</p>

      {/* Example 2 */}
      <h3 style={{ color: '#0c7a6f' }}>2️⃣ Array of Objects – Add New Key</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const users = [
  { name: 'Ravi' },
  { name: 'Sita' }
];
const updatedUsers = users.map(user => ({
  ...user,
  role: 'User'
}));
        `}</code>
      </pre>
      <p>📘 ప్రతి objectకి role key add చేయడం React లో common pattern.</p>

      {/* Example 3 */}
      <h3 style={{ color: '#0c7a6f' }}>3️⃣ React List Rendering with map()</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const fruits = ['Apple', 'Banana', 'Grapes'];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
        `}</code>
      </pre>
      <p>📘 React లో dynamic UI elements create చేయడానికి best usage.</p>

      {/* Example 4 */}
      <h3 style={{ color: '#0c7a6f' }}>4️⃣ index సహాయం తో numbering చేయడం</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const tasks = ['Eat', 'Code', 'Sleep'];

const numbered = tasks.map((task, index) => \`\${index + 1}. \${task}\`);
// Output: ["1. Eat", "2. Code", "3. Sleep"]
        `}</code>
      </pre>
      <p>📘 index help తో serial numbers generate చేయవచ్చు.</p>

      {/* Example 5 */}
      <h3 style={{ color: '#0c7a6f' }}>5️⃣ Nested Object Access</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const students = [
  { name: 'A', marks: { math: 90 } },
  { name: 'B', marks: { math: 80 } }
];

const mathScores = students.map(s => s.marks.math);
// Output: [90, 80]
        `}</code>
      </pre>
      <p>📘 nested values retrieve చేయడానికి map() perfect.</p>

      {/* Example 6 */}
      <h3 style={{ color: '#0c7a6f' }}>6️⃣ map + filter + reduce Integration</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
const prices = [100, 200, 300];
const gstPrices = prices
  .map(p => p + (p * 0.18))
  .filter(p => p > 250);
// Output: [236, 354]
        `}</code>
      </pre>
      <p>📘 Chaining methods for real calculations.</p>

      {/* Example 7 */}
      <h3 style={{ color: '#0c7a6f' }}>7️⃣ map() with Conditional Rendering (React)</h3>
      <pre style={{ background: '#f4f4f4', padding: '1rem' }}>
        <code>{`
{users.map(user => (
  <div key={user.id}>
    <h4>{user.name}</h4>
    {user.isAdmin && <span>🛡 Admin</span>}
  </div>
))}
        `}</code>
      </pre>
      <p>📘 React లో conditionally UI చూపించడానికి perfect use-case.</p>

      {/* Summary */}
      <h3 style={{ color: '#d35400' }}>✅ Summary – map() ఎప్పుడు వాడాలి?</h3>
      <ul>
        <li>✅ array ని transform చేయాలి అంటే</li>
        <li>✅ React లో UI list rendering చేయాలి అంటే</li>
        <li>✅ object structure update చేయాలి అంటే</li>
        <li>✅ chaining తో calculations చేయాలి అంటే</li>
      </ul>

      <h3 style={{ color: '#007acc' }}>🔥 Real-Time Applications</h3>
      <ul>
        <li><strong>🧾 UI Tables Render</strong> (React)</li>
        <li><strong>📦 Cart Price Calculation</strong> (eCommerce)</li>
        <li><strong>👨‍🎓 Student Score Sheets</strong> (Dashboards)</li>
        <li><strong>🎯 Search Suggestions</strong> (Search Bar)</li>
      </ul>
    </div>
  );
};

export default MapMethodGuide;
