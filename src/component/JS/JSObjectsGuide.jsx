import React from 'react';

const JSObjectsGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#f4f8fb', lineHeight: '1.8' }}>
      <h2 style={{ color: '#0d6efd' }}>🔍 JavaScript & React లో Objects – Full Guide (with Telugu Explanation)</h2>
      <p><strong>Objects</strong> అనేవి <code>key-value pairs</code> ఆధారంగా డేటా ను store చేయడానికీ, access చేయడానికీ ఉపయోగిస్తాం. React లో state, props, APIs లో objects చాలా ముఖ్యమైనవి.</p>

      <h3 style={{ color: '#198754' }}>1️⃣ Basic Object Creation</h3>
      <pre><code>{`const person = {
  name: 'Prasad',
  age: 25
};`}</code></pre>
      <p><strong>Explanation:</strong> ఇది ఒక simple object. ఇది ఒక person యొక్క వివరాలు కలిగి ఉంది.</p>

      <h3 style={{ color: '#198754' }}>2️⃣ Accessing Object Properties</h3>
      <pre><code>{`console.log(person.name); // Prasad
console.log(person['age']); // 25`}</code></pre>
      <p><strong>Explanation:</strong> Dot notation & bracket notation రెండూ values access చేయడానికి ఉపయోగిస్తాం.</p>

      <h3 style={{ color: '#198754' }}>3️⃣ Nested Objects Access</h3>
      <pre><code>{`const user = {
  name: 'Sneha',
  address: {
    city: 'Hyderabad',
    pincode: 500001
  }
};

console.log(user.address.city); // Hyderabad`}</code></pre>
      <p>Object లో object ఉంటే nested structure గా ఉండుతుంది.</p>

      <h3 style={{ color: '#198754' }}>4️⃣ Object Destructuring</h3>
      <pre><code>{`const { name, age } = person;
console.log(name); // Prasad`}</code></pre>
      <p>Direct గా variables లో values assign చేయడానికి ఈ విధానం వాడతాం.</p>

      <h3 style={{ color: '#198754' }}>5️⃣ Object Spread Operator</h3>
      <pre><code>{`const updatedPerson = {
  ...person,
  age: 26
};`}</code></pre>
      <p><strong>React లో ఈ విధంగా immutable updates చేయడానికి వాడతాం.</strong></p>

      <h3 style={{ color: '#198754' }}>6️⃣ Looping through Object Properties</h3>
      <pre><code>{`for (let key in person) {
  console.log(key, person[key]);
}`}</code></pre>
      <p>Object లో ఉన్న అన్ని properties ని iterate చేయడానికి వాడతాం.</p>

      <h3 style={{ color: '#198754' }}>7️⃣ Object.keys(), Object.values(), Object.entries()</h3>
      <pre><code>{`Object.keys(person); // ['name', 'age']
Object.values(person); // ['Prasad', 25]
Object.entries(person); // [['name', 'Prasad'], ['age', 25]]`}</code></pre>
      <p>ఈ methods తో object ని array గా treat చేసి లూప్ లో వాడచ్చు.</p>

      <h3 style={{ color: '#198754' }}>8️⃣ Object.freeze()</h3>
      <pre><code>{`const obj = Object.freeze({ name: 'React' });
obj.name = 'Angular'; // No effect`}</code></pre>
      <p><strong>Object.freeze()</strong> ద్వారా object immutable అవుతుంది.</p>

      <h3 style={{ color: '#198754' }}>9️⃣ Object.assign()</h3>
      <pre><code>{`const copy = Object.assign({}, person);`}</code></pre>
      <p>Old object ని clone చేయడానికి వాడతాం.</p>

      <h3 style={{ color: '#198754' }}>🔟 Objects in React State</h3>
      <pre><code>{`const [user, setUser] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
};`}</code></pre>
      <p><strong>React లో form values లేదా nested updates చేయాలంటే object state structure చాలా important.</strong></p>

      <h3 style={{ color: '#198754' }}>🔁 Bonus: Optional Chaining (?.)</h3>
      <pre><code>{`console.log(user?.address?.city);`}</code></pre>
      <p>Object లో nested structure ఉంటే, value ఉందో లేదో check చేయడానికి safe గా వాడతాం.</p>

      <h3 style={{ color: '#0d6efd' }}>✅ Summary</h3>
      <ul>
        <li>Objects are core for React state, API data, and UI structure.</li>
        <li>Spread operator, destructuring, freeze, keys/values – అన్నీ must-know.</li>
        <li>Immutable updates + nested object handling = better performance in React.</li>
      </ul>
    </div>
  );
};

export default JSObjectsGuide;
