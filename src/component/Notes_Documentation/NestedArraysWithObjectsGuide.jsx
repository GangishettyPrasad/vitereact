import React from 'react';

const NestedArraysWithObjectsGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f9f9f9' }}>
      <h2 style={{ color: '#005aa7' }}>🔗 Nested Arrays with Objects – Real-Time Guide (JS & React)</h2>

      <p>Nested Arrays with Objects అనేవి JavaScript & React లో చాలానే ఉపయోగపడతాయి – ముఖ్యంగా:</p>
      <ul>
        <li>🧾 Dynamic form fields</li>
        <li>📦 JSON API Responses</li>
        <li>📊 Data tables with expandable rows</li>
        <li>🧩 Nested UI elements (Menus, Accordions)</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>✅ Example Structure:</h3>
      <pre><code>{`
const users = [
  {
    name: "Ravi",
    orders: [
      { id: 1, item: "Laptop", price: 50000 },
      { id: 2, item: "Mouse", price: 500 },
    ]
  },
  {
    name: "mounika",
    orders: [
      { id: 1, item: "Phone", price: 30000 },
      { id: 2, item: "Charger", price: 800 },
    ]
  }
];
`}</code></pre>

      <h3 style={{ color: '#0d7c8c' }}>🔍 1️⃣ Display Nested Data using <code>map</code></h3>
      <pre><code>{`
users.map(user => (
  <div>
    <h3>{user.name}</h3>
    {user.orders.map(order => (
      <p>{order.item} - ₹{order.price}</p>
    ))}
  </div>
))
`}</code></pre>
      <pre>👉 ప్రతి user యొక్క orders ని display చేయడానికి nested <code>map()</code> వాడాం.</pre>

      <h3 style={{ color: '#0d7c8c' }}>🔍 2️⃣ Filter Specific Items</h3>
      <pre><code>{`
const expensiveOrders = users.map(user => ({
  ...user,
  orders: user.orders.filter(order => order.price > 1000)
}));
`}</code></pre>
      <pre>👉 <code>filter()</code> వాడి, ప్రతి user orders లో ₹1000 కన్నా ఎక్కువ ఉన్నవి retain చేసాం.</pre>

      <h3 style={{ color: '#0d7c8c' }}>🔍 3️⃣ Add New Nested Item</h3>
      <pre><code>{`
const updatedUsers = users.map(user =>
  user.name === "Ravi"
    ? {
        ...user,
        orders: [...user.orders, { id: 3, item: "Keyboard", price: 1000 }]
      }
    : user
);
`}</code></pre>
      <pre>👉 Ravi కి కొత్త order add చేశాం without modifying original array (immutability maintained).</pre>

      <h3 style={{ color: '#0d7c8c' }}>🔍 4️⃣ Nested Update by ID</h3>
      <pre><code>{`
const updatedOrders = users.map(user => ({
  ...user,
  orders: user.orders.map(order =>
    order.id === 2 ? { ...order, item: "Wireless Mouse" } : order
  )
}));
`}</code></pre>
      <pre>👉 Specific nested object ని update చేయడానికి nested <code>map()</code> వాడాం.</pre>

      <h3 style={{ color: '#0d7c8c' }}>🔍 5️⃣ React UI Real-Time Example</h3>
      <pre><code>{`
{users.map(user => (
  <div key={user.name}>
    <h4>{user.name}</h4>
    <ul>
      {user.orders.map(order => (
        <li key={order.id}>{order.item} - ₹{order.price}</li>
      ))}
    </ul>
  </div>
))}
`}</code></pre>
      <pre>👉 Real UI rendering లో nested <code>map()</code> use చేసి, <code>key</code> provide చేశాం React best practice ప్రకారం.</pre>

      <h3 style={{ color: '#0d7c8c' }}>🎯 Best Practices (JS & React)</h3>
      <ul>
        <li>📌 Always use <code>key</code> props inside <code>map()</code> in JSX</li>
        <li>📌 Use spread operator to maintain immutability</li>
        <li>📌 Avoid deeply nested logic – break into components if needed</li>
        <li>📌 Use state setters carefully while updating nested data in React</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>🧠 Telugu Tip</h3>
      <pre>
        Nested Arrays లో data వాడేటప్పుడు → <code>map</code>, <code>filter</code>, <code>find</code>, <code>spread</code> operators వాడటం వల్ల cleaner & readable code వస్తుంది.
      </pre>
    </div>
  );
};

export default NestedArraysWithObjectsGuide;
