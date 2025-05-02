import React from 'react';

const ReactArrayMethods = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#0070f3' }}>⚛️ React లో map, filter, find, Spread Operator & Destructuring – Visual Guide </h2>

      {/* map */}
      <h3 style={{ color: '#0c7a6f' }}>1️⃣ map()</h3>
      <p><strong>ఉపయోగం:</strong> Array ని iterate చేసి, ప్రతి element ని UI లో చూపించడానికి.</p>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const names = ['Ravi', 'Sita', 'Krishna'];

return (
  <ul>
    {names.map(name => (
      <li key={name}>{name}</li>
    ))}
  </ul>
);
        `}</code>
      </pre>
      <p><strong>Output:</strong></p>
      <ul>
        <li>Ravi</li>
        <li>Sita</li>
        <li>Krishna</li>
      </ul>
      <p>👉 <strong>JSX లో `map` వాడి dynamic data ని loop చేసి చూపించవచ్చు.</strong></p>

      {/* filter */}
      <h3 style={{ color: '#0c7a6f' }}>2️⃣ filter()</h3>
      <p><strong>ఉపయోగం:</strong> Array నుండి కొన్ని elements మాత్రమే తీసుకోవాలి అంటే.</p>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const users = [
  { name: 'Ravi', age: 25 },
  { name: 'Teja', age: 32 }
];

const young = users.filter(user => user.age < 30);
        `}</code>
      </pre>
      <p>👉 <strong>Condition-based filtering UI కి అవసరమైన data మాత్రమే చూపించడానికి.</strong></p>

      {/* find */}
      <h3 style={{ color: '#0c7a6f' }}>3️⃣ find()</h3>
      <p><strong>ఉపయోగం:</strong> ఒకే ఒక్క item అవసరం అయితే, array లో search చేయడానికి.</p>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const users = [
  { name: 'Ravi', age: 25 },
  { name: 'Teja', age: 32 }
];

const foundUser = users.find(user => user.name === 'Teja');
        `}</code>
      </pre>
      <p>👉 <strong>`find()` తో ఒకే ఒక్క object/item పొందవచ్చు.</strong></p>

      {/* spread */}
      <h3 style={{ color: '#0c7a6f' }}>4️⃣ Spread Operator (...)</h3>
      <p><strong>ఉపయోగం:</strong> Array/Object లో కొత్త data ని కలపడానికి, లేదా clone చేయడానికి.</p>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const oldArray = [1, 2];
const newArray = [...oldArray, 3]; // [1, 2, 3]

const oldUser = { name: 'Ravi' };
const newUser = { ...oldUser, age: 25 }; // { name: 'Ravi', age: 25 }
        `}</code>
      </pre>
      <p>👉 <strong>React లో state update చేయడానికి ఎక్కువగా spread వాడతాం.</strong></p>

      {/* destructuring */}
      <h3 style={{ color: '#0c7a6f' }}>5️⃣ Destructuring</h3>
      <p><strong>ఉపయోగం:</strong> Object లేదా Array నుండి values తీయడానికి easy way.</p>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
// Object destructuring
const user = { name: 'Ravi', age: 25 };
const { name, age } = user;

// Array destructuring
const numbers = [10, 20];
const [first, second] = numbers;
        `}</code>
      </pre>
      <p>👉 <strong>Cleaner code కోసం destructuring చాలా use అవుతుంది.</strong></p>

      <h3 style={{ color: '#0070f3' }}>📌 Summary – ఎప్పుడు ఏది వాడాలి?</h3>
      <ul>
        <li><strong>map()</strong> – JSX లో List render చేయాలి అంటే</li>
        <li><strong>filter()</strong> – Conditions apply చేసి elements display చేయాలి</li>
        <li><strong>find()</strong> – ఒక object లేదా value మాత్రమే కావాలి</li>
        <li><strong>spread (...)</strong> – Arrays/Objects merge చేయాలి, update చేయాలి</li>
        <li><strong>destructuring</strong> – Data ని separate variables లో తీసుకోవాలి</li>
      </ul>

      <h3 style={{ color: '#d35400' }}>💡 React Real-Time Use Cases:</h3>
      <ul>
        <li><code>map()</code> → List of users, products, posts చూపించడానికి</li>
        <li><code>filter()</code> → Active users మాత్రమే, filtered data UIకి</li>
        <li><code>spread()</code> → State update చేయడంలో (immutability 유지)</li>
        <li><code>destructuring</code> → Props తీసుకోవడానికి, cleaner code కోసం</li>
      </ul>
    </div>
  );
};

export default ReactArrayMethods;
