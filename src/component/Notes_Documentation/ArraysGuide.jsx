import React from 'react';

const ArraysGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fffefc' }}>
      <h2 style={{ color: '#4a148c' }}>📘 Arrays in JavaScript & React – Real-Time Use Cases with Telugu Explanation</h2>
      <p>
        <strong>Arrays</strong> అనేవి multiple values ని single variable లో store చేసేందుకు ఉపయోగిస్తారు. React లో arrays చాలా ముఖ్యమైనవి – UI rendering, API data handling, & state management లో విపరీతంగా ఉపయోగపడతాయి.
      </p>

      <h3 style={{ color: '#00695c' }}>1️⃣ Array Creation</h3>
      <pre><code>{`const fruits = ["apple", "banana", "mango"];
const numbers = new Array(1, 2, 3);`}</code></pre>
      <p>👉 2 ways to create arrays – literal & constructor.</p>

      <h3 style={{ color: '#00695c' }}>2️⃣ Access Elements</h3>
      <pre><code>{`console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "mango"`}</code></pre>
      <p>👉 Indexing తో values access చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>3️⃣ Add/Remove Elements (push, pop, shift, unshift)</h3>
      <pre><code>{`const arr = [1, 2, 3];
arr.push(4);    // [1, 2, 3, 4]
arr.pop();      // [1, 2, 3]
arr.shift();    // [2, 3]
arr.unshift(0); // [0, 2, 3]`}</code></pre>

      <h3 style={{ color: '#00695c' }}>4️⃣ Looping through Arrays (map)</h3>
      <pre><code>{`fruits.map(fruit => console.log(fruit));`}</code></pre>
      <p>👉 React లో lists rendering కు <code>map()</code> చాలా ఉపయోగపడుతుంది.</p>

      <h3 style={{ color: '#00695c' }}>5️⃣ Filtering Arrays</h3>
      <pre><code>{`const nums = [1, 2, 3, 4, 5];
const even = nums.filter(n => n % 2 === 0);
console.log(even); // [2, 4]`}</code></pre>

      <h3 style={{ color: '#00695c' }}>6️⃣ Searching (find, includes)</h3>
      <pre><code>{`const data = [5, 10, 15];
data.includes(10); // true
data.find(n => n > 7); // 10`}</code></pre>

      <h3 style={{ color: '#00695c' }}>7️⃣ Spread Operator with Arrays</h3>
      <pre><code>{`const base = [1, 2];
const updated = [...base, 3, 4];`}</code></pre>

      <h3 style={{ color: '#00695c' }}>8️⃣ Destructuring Arrays</h3>
      <pre><code>{`const [a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20`}</code></pre>

      <h3 style={{ color: '#00695c' }}>9️⃣ Nested Arrays Access</h3>
      <pre><code>{`const matrix = [[1, 2], [3, 4]];
console.log(matrix[1][0]); // 3`}</code></pre>
      <p>👉 Nested structures లో careful indexing అవసరం.</p>

      <h3 style={{ color: '#00695c' }}>🔟 React State with Arrays</h3>
      <pre><code>{`const [items, setItems] = useState(["a", "b"]);

const addItem = () => {
  setItems(prev => [...prev, "c"]);
};`}</code></pre>

      <h3 style={{ color: '#00695c' }}>1️⃣1️⃣ Arrays with Objects (Real-time)</h3>
      <pre><code>{`const users = [
  { id: 1, name: "mounika" },
  { id: 2, name: "Prasad" }
];

users.map(user => console.log(user.name));`}</code></pre>

      <h3 style={{ color: '#00695c' }}>1️⃣2️⃣ React Lists Rendering</h3>
      <pre><code>{`{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}`}</code></pre>
      <p>👉 React లో loop చేయాలంటే <strong>key</strong> తప్పనిసరిగా ఇవ్వాలి.</p>

      <h3 style={{ color: '#00695c' }}>✅ Final Summary</h3>
      <ul>
        <li><strong>map()</strong>, <strong>filter()</strong>, <strong>find()</strong> – React UI updates లో key</li>
        <li><strong>spread operator</strong> తో arrays merge చేయవచ్చు</li>
        <li><strong>useState()</strong> లో array update immutable గా చేయాలి</li>
        <li>Nested array structures ను handle చేయడంలో correct indexing చాలా ముఖ్యం</li>
      </ul>
    </div>
  );
};

export default ArraysGuide;
