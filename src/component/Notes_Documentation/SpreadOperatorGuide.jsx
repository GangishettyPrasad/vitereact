import React from 'react';

const SpreadOperatorGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#0070f3' }}>🚀 Spread Operator (...) in JavaScript & React – Full Guide </h2>

      <p><strong>👉 Spread Operator అంటే:</strong> Array లేదా Object ని expand చేయడానికి, clone చేయడానికి లేదా కొత్త values కలపడానికి వాడే JavaScript feature.</p>

      {/* 1. Clone Array */}
      <h3 style={{ color: '#0c7a6f' }}>1️⃣ Clone an Array</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3]
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> Original array ను copy చేయడానికి వాడతాం.</p>

      {/* 2. Merge Arrays */}
      <h3 style={{ color: '#0c7a6f' }}>2️⃣ Merge Arrays</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1, 2, 3, 4]
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> రెండు లేదా ఎక్కువ arrays ని కలపడానికి.</p>

      {/* 3. Add Elements to Array */}
      <h3 style={{ color: '#0c7a6f' }}>3️⃣ Add Elements while Copying</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const numbers = [2, 3];
const result = [1, ...numbers, 4]; // [1, 2, 3, 4]
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> Existing arrayకి కొత్త elements కలపాలి అంటే.</p>

      {/* 4. Clone Object */}
      <h3 style={{ color: '#0c7a6f' }}>4️⃣ Clone an Object</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const user = { name: 'Ravi', age: 25 };
const newUser = { ...user }; // { name: 'Ravi', age: 25 }
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> Object ని shallow copy చేయడానికి.</p>

      {/* 5. Merge Objects */}
      <h3 style={{ color: '#0c7a6f' }}>5️⃣ Merge Objects</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const combined = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> రెండు object valuesని కలపడం.</p>

      {/* 6. Overriding Object Properties */}
      <h3 style={{ color: '#0c7a6f' }}>6️⃣ Override Object Properties</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const user = { name: 'Ravi', age: 25 };
const updated = { ...user, age: 30 }; // { name: 'Ravi', age: 30 }
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> Object లో కొన్ని properties override చేయాలి అంటే.</p>

      {/* 7. Spread in React State Update */}
      <h3 style={{ color: '#0c7a6f' }}>7️⃣ React State Update with Spread</h3>
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        <code>{`
const [user, setUser] = useState({ name: 'Ravi', age: 25 });

const updateAge = () => {
  setUser(prev => ({ ...prev, age: 30 }));
};
        `}</code>
      </pre>
      <p><strong>📌 Telugu:</strong> React లో immutable state update చేయాలి అంటే spread operator తప్పనిసరి.</p>

      <h3 style={{ color: '#d35400' }}>✅ Summary – ఎప్పుడు వాడాలి?</h3>
      <ul>
        <li>✅ Clone చేయడానికి → Array/Object</li>
        <li>✅ Merge చేయడానికి → Arrays లేదా Objects</li>
        <li>✅ Object property override చేయడానికి</li>
        <li>✅ React state update చేయడానికి</li>
      </ul>

      <h3 style={{ color: '#0070f3' }}>🔥 Real-Time Use Cases in React</h3>
      <ul>
        <li><strong>Form values update చేయడంలో</strong> – useState లో object spread చేయాలి</li>
        <li><strong>Table లేదా Lists update చేయడం</strong> – array spread</li>
        <li><strong>Redux reducers</strong> – state ని update చేయడం</li>
      </ul>
    </div>
  );
};

export default SpreadOperatorGuide;
