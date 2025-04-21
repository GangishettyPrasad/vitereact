import React from 'react';

const SpreadOperatorGuidee = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f3f9f9' }}>
      <h2 style={{ color: '#4a148c' }}>🚀 Spread Operator (...) – JavaScript & React లో Full Guide (Telugu)</h2>
      <p>
        <strong>Spread Operator (...)</strong> అనేది Arrays, Objects, & Function arguments లో values spread చేయడానికి ఉపయోగిస్తారు. ఇది Immutable updates కోసం React లో ముఖ్యమైన concept.
      </p>

      <h3 style={{ color: '#00695c' }}>✅ Basic Syntax:</h3>
      <pre><code>{`const newArray = [...oldArray];
const newObject = {...oldObject};`}</code></pre>

      <h3 style={{ color: '#00695c' }}>1️⃣ Array Copy (Shallow Copy)</h3>
      <pre><code>{`const fruits = ["apple", "banana"];
const newFruits = [...fruits];
console.log(newFruits); // ["apple", "banana"]`}</code></pre>
      <p>👉 Original array modify కాకుండా copy తయారవుతుంది.</p>

      <h3 style={{ color: '#00695c' }}>2️⃣ Array Merge</h3>
      <pre><code>{`const a = [1, 2];
const b = [3, 4];
const result = [...a, ...b];
console.log(result); // [1, 2, 3, 4]`}</code></pre>

      <h3 style={{ color: '#00695c' }}>3️⃣ Adding Elements in Array</h3>
      <pre><code>{`const base = [2, 3];
const updated = [1, ...base, 4];
console.log(updated); // [1, 2, 3, 4]`}</code></pre>

      <h3 style={{ color: '#00695c' }}>4️⃣ Object Copy (Shallow)</h3>
      <pre><code>{`const user = { name: "Prasad", age: 25 };
const copy = { ...user };
console.log(copy); // { name: "Prasad", age: 25 }`}</code></pre>

      <h3 style={{ color: '#00695c' }}>5️⃣ Object Merge</h3>
      <pre><code>{`const a = { x: 1 };
const b = { y: 2 };
const merged = { ...a, ...b };
console.log(merged); // { x: 1, y: 2 }`}</code></pre>

      <h3 style={{ color: '#00695c' }}>6️⃣ Updating Object Properties (Immutable)</h3>
      <pre><code>{`const user = { name: "mounika", age: 24 };
const updated = { ...user, age: 25 };
console.log(updated); // { name: "mounika", age: 25 }`}</code></pre>
      <p>👉 React state update లో విపరీతంగా ఉపయోగపడుతుంది.</p>

      <h3 style={{ color: '#00695c' }}>7️⃣ Spread in Function Arguments</h3>
      <pre><code>{`function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6`}</code></pre>
      <p>👉 Arrays ను individual arguments గా pass చేయడానికీ ఉపయోగిస్తాం.</p>

      <h3 style={{ color: '#00695c' }}>8️⃣ React State Update (Array)</h3>
      <pre><code>{`const [tasks, setTasks] = useState(["Task 1"]);

const addTask = () => {
  setTasks(prev => [...prev, "Task 2"]);
};`}</code></pre>
      <p>👉 Old state ని retain చేసి కొత్త item add చేయడంలో ఉపయోగిస్తాం.</p>

      <h3 style={{ color: '#00695c' }}>9️⃣ React State Update (Object)</h3>
      <pre><code>{`const [user, setUser] = useState({ name: "A", age: 20 });

const updateAge = () => {
  setUser(prev => ({ ...prev, age: 21 }));
};`}</code></pre>
      <p>👉 Object properties ని preserve చేసి specific value update చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>🔚 Summary & Tips:</h3>
      <ul>
        <li><strong>Spread Operator</strong> immutable updates కోసం perfect tool</li>
        <li>React state update లో చాలా కీలకం</li>
        <li>Shallow copy మాత్రమే చేస్తుంది (nested structures అయితే deep copy అవసరం)</li>
        <li>Performance గా efficient & readable</li>
      </ul>
    </div>
  );
};

export default SpreadOperatorGuidee;
