import React from 'react';

const FilterGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f9f9f9' }}>
      <h2 style={{ color: '#0a5c91' }}>🔍 JavaScript & React – <code>filter()</code> Method Full Guide in Telugu</h2>

      <p>
        <strong><code>filter()</code></strong> method అనేది JavaScript లో array లోని ప్రతి element ను check చేసి, condition satisfy అయిన elements తో కొత్త array తయారు చేయడానికి ఉపయోగిస్తారు.
      </p>
      <p>👉 ఇది original array ని modify చేయదు (immutability).</p>

      <h3 style={{ color: '#00796b' }}>✅ Basic Syntax:</h3>
      <pre><code>{`const newArray = array.filter((element, index, array) => condition);`}</code></pre>

      <h3 style={{ color: '#00796b' }}>1️⃣ Example – Even Numbers Only</h3>
      <pre><code>{`const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(num => num % 2 === 0); 
console.log(even); // [2, 4]`}</code></pre>
      <p><strong>Telugu Explanation:</strong> <code>% 2 === 0</code> అని check చేయడంతో, even numbers మాత్రమే retain అవుతాయి.</p>

      <h3 style={{ color: '#00796b' }}>2️⃣ Example – Remove Falsy Values</h3>
      <pre><code>{`const mixed = [0, "Hello", false, null, 42, undefined, "React"];
const truthy = mixed.filter(Boolean);
console.log(truthy); // ["Hello", 42, "React"]`}</code></pre>
      <p><strong>Explanation:</strong> <code>Boolean</code> constructor ని ఉపయోగించి, truthy values మాత్రమే వస్తాయి.</p>

      <h3 style={{ color: '#00796b' }}>3️⃣ Example – Filter Users Based on Age</h3>
      <pre><code>{`const users = [
  { name: "Ravi", age: 20 },
  { name: "Kiran", age: 30 },
  { name: "Raju", age: 17 }
];

const adults = users.filter(user => user.age >= 18);
console.log(adults);`}</code></pre>
      <p>👉 18 years కి పైగా ఉన్న users మాత్రమే వస్తారు.</p>

      <h3 style={{ color: '#00796b' }}>4️⃣ Example – Filter by String Includes</h3>
      <pre><code>{`const fruits = ["apple", "banana", "grape", "mango"];
const filtered = fruits.filter(fruit => fruit.includes("a"));
console.log(filtered); // ["apple", "banana", "grape", "mango"]`}</code></pre>

      <h3 style={{ color: '#00796b' }}>5️⃣ React Example – Filter Displayed List</h3>
      <pre><code>{`const names = ["Prasad", "mounika", "Ram", "Seetha"];
const filteredNames = names.filter(name => name.startsWith("S"));`}</code></pre>
      <p>👉 React component లో ఇది list rendering కోసం use చేస్తాం: <code>{`{filteredNames.map(name => <li>{name}</li>)}`}</code></p>

      <h3 style={{ color: '#00796b' }}>6️⃣ Example – Search Filter in Real-time</h3>
      <pre><code>{`const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();
  const result = users.filter(user => user.name.toLowerCase().includes(value));
};`}</code></pre>
      <p><strong>React లో Use Case:</strong> Search box తో users ని filter చేయడంలో ఇది ఉపయోగపడుతుంది.</p>

      <h3 style={{ color: '#00796b' }}>7️⃣ Example – Nested Object Filtering</h3>
      <pre><code>{`const companies = [
  { name: "TCS", location: { city: "Hyderabad" } },
  { name: "Infosys", location: { city: "Bangalore" } }
];

const hydCompanies = companies.filter(company => company.location.city === "Hyderabad");`}</code></pre>
      <p>👉 Nested property లో కూడా filter చేయవచ్చు!</p>

      <h3 style={{ color: '#00796b' }}>🔚 Summary:</h3>
      <ul>
        <li><strong>filter()</strong> returns a new array</li>
        <li>Immutability maintain చేస్తుంది</li>
        <li>Condition satisfy అయిన values retain అవుతాయి</li>
        <li>React లో rendering, search, permissions, status filtering కోసం బాగా ఉపయోగపడుతుంది</li>
      </ul>
    </div>
  );
};

export default FilterGuide;
