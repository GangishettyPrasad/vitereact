import React from 'react';

const JsArrayMethodsDemo = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f8f9fa' }}>
      <h2 style={{ color: '#005aa7' }}>📘 JavaScript Array Methods, Spread Operator & Destructuring – Telugu Explanation</h2>

      {/* 1️⃣ map() */}
      <h3 style={{ color: '#0d7c8c' }}>1️⃣ map() - Array Iteration</h3>
      <p><strong>Use:</strong> ప్రతి item మీద action చేయాలి అనుకుంటే వాడతాం</p>
      <pre>
        <code>
{`const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2); 
console.log(doubled); // [2, 4, 6, 8]`}
        </code>
      </pre>
      <p><strong>React Use:</strong> Lists render చేయడానికీ Ideal (Ex: looping through users)</p>

      {/* 2️⃣ filter() */}
      <h3 style={{ color: '#0d7c8c' }}>2️⃣ filter() - Filter Specific Items</h3>
      <p><strong>Use:</strong> కొన్ని elements మాత్రమే అవసరమైతే వాడతాం</p>
      <pre>
        <code>
{`const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
console.log(even); // [2, 4]`}
        </code>
      </pre>

      {/* 3️⃣ find() */}
      <h3 style={{ color: '#0d7c8c' }}>3️⃣ find() - First Match Return</h3>
      <p><strong>Use:</strong> ఒక object/item match అయ్యే first element కావాలంటే</p>
      <pre>
        <code>
{`const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Teja" }
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Teja" }`}
        </code>
      </pre>

      {/* 4️⃣ Spread Operator */}
      <h3 style={{ color: '#0d7c8c' }}>4️⃣ Spread Operator (...) – Copy/Expand Data</h3>
      <p><strong>Use:</strong> Arrays/objects copy చేయాలి, merge చేయాలి, modify చేయాలి అంటే</p>
      <pre>
        <code>
{`const arr = [1, 2];
const newArr = [...arr, 3];
console.log(newArr); // [1, 2, 3]

const user = { name: "Ravi" };
const newUser = { ...user, age: 25 };
console.log(newUser); // { name: "Ravi", age: 25 }`}
        </code>
      </pre>

      {/* 5️⃣ Destructuring */}
      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Destructuring – Variables గా Values Extract చేయడం</h3>
      <p><strong>Use:</strong> Array/Object నుండి values తీసుకోవడం easy అవుతుంది</p>
      <pre>
        <code>
{`const user = { name: "Ravi", age: 25 };
const { name, age } = user;
console.log(name); // Ravi

const arr = [10, 20];
const [a, b] = arr;
console.log(a); // 10`}
        </code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>✅ Summary</h3>
      <ul>
        <li><strong>map()</strong> – Loop over all items → returns new array</li>
        <li><strong>filter()</strong> – Get subset of items → returns new array</li>
        <li><strong>find()</strong> – Get first matching item → returns item (not array)</li>
        <li><strong>Spread (...)</strong> – Copy or merge arrays/objects</li>
        <li><strong>Destructuring</strong> – Extract values directly into variables</li>
      </ul>

      <p>💡 <strong>React లో ఇవన్నీ List rendering, State updates, Props destructure, Immutable updates కోసం extensively వాడతాం.</strong></p>
    </div>
  );
};

export default JsArrayMethodsDemo;
