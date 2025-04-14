import React from 'react';

const DestructuringGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f9f9f9' }}>
      <h2 style={{ color: '#4a148c' }}>🔍 Destructuring in JavaScript & React – Full Guide in Telugu</h2>

      <p>
        <strong>Destructuring</strong> అనేది Arrays లేదా Objects లోని values ని individual variables గా easyగా extract చేయడానికి ఉపయోగిస్తారు.
      </p>
      <p>👉 ఇది code readability & maintainability పెంచుతుంది.</p>

      <h3 style={{ color: '#00695c' }}>✅ Basic Syntax:</h3>
      <pre><code>{`const [a, b] = array;
const { name, age } = object;`}</code></pre>

      <h3 style={{ color: '#00695c' }}>1️⃣ Array Destructuring – Basic</h3>
      <pre><code>{`const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first); // "red"
console.log(second); // "green"`}</code></pre>
      <p>👉 Array నుండి positional గా variables assign చేసుకోవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>2️⃣ Skipping Values</h3>
      <pre><code>{`const arr = [1, 2, 3];
const [ , , third] = arr;
console.log(third); // 3`}</code></pre>

      <h3 style={{ color: '#00695c' }}>3️⃣ Object Destructuring – Basic</h3>
      <pre><code>{`const person = { name: "Ravi", age: 25 };
const { name, age } = person;
console.log(name); // "Ravi"`}</code></pre>
      <p>👉 Object keys తో variables extract చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>4️⃣ Renaming While Destructuring</h3>
      <pre><code>{`const user = { id: 101, username: "prasad" };
const { username: name } = user;
console.log(name); // "prasad"`}</code></pre>
      <p>👉 Object property ని new variable name తో తీసుకోవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>5️⃣ Nested Destructuring</h3>
      <pre><code>{`const employee = {
  name: "Sneha",
  address: {
    city: "Hyderabad",
    pin: 500001
  }
};

const { address: { city } } = employee;
console.log(city); // "Hyderabad"`}</code></pre>

      <h3 style={{ color: '#00695c' }}>6️⃣ Destructuring in Function Parameters</h3>
      <pre><code>{`function greet({ name }) {
  console.log("Hello", name);
}

const user = { name: "Ram", age: 30 };
greet(user); // Hello Ram`}</code></pre>
      <p>👉 Function లోనే destructuring చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>7️⃣ Destructuring in React Props</h3>
      <pre><code>{`// Traditional way
function User(props) {
  return <h3>{props.name}</h3>;
}

// Destructuring way
function User({ name }) {
  return <h3>{name}</h3>;
}`}</code></pre>
      <p>👉 React లో frequently props destructuring చేస్తాం readability కోసం.</p>

      <h3 style={{ color: '#00695c' }}>8️⃣ Default Values in Destructuring</h3>
      <pre><code>{`const { name = "Guest", age = 18 } = {};
console.log(name); // "Guest"`}</code></pre>

      <h3 style={{ color: '#00695c' }}>9️⃣ Use in Loops</h3>
      <pre><code>{`const users = [
  { name: "A", age: 22 },
  { name: "B", age: 28 }
];

users.forEach(({ name }) => {
  console.log(name);
});`}</code></pre>

      <h3 style={{ color: '#00695c' }}>🔚 Summary:</h3>
      <ul>
        <li>Destructuring readability & code clarity పెంచుతుంది</li>
        <li>React లో props, useState returns, loops లో extensively వాడతాం</li>
        <li>Array & Object structure మీద ఆధారపడి correct destructuring చేయాలి</li>
        <li>Nested objects లో error avoid చేయడానికి careful గా destructure చేయాలి</li>
      </ul>
    </div>
  );
};

export default DestructuringGuide;
