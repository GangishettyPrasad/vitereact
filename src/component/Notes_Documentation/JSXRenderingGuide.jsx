import React from 'react';

const JSXDynamicRenderingFullGuide = () => {
  const userName = 'Mounika';

  const user = {
    name: 'Prasad',
    city: 'Hyderabad',
    hobbies: ['Coding', 'Reading'],
  };

  const greetUser = (name) => `Hi, ${name}! Welcome to React World!`;

  const fruits = ['Apple', 'Banana', 'Mango'];

  const usersList = [
    { id: 1, name: 'Mounika', city: 'Hyd' },
    { id: 2, name: 'Sagar', city: 'Delhi' },
    { id: 3, name: 'Radha', city: 'Mumbai' },
  ];

  const complexData = {
    department: 'Development',
    teamMembers: [
      { id: 1, name: 'Akhil', skills: ['React', 'JS'] },
      { id: 2, name: 'Bhavana', skills: ['Node', 'MongoDB'] },
    ],
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fef9e7', fontFamily: 'monospace' }}>
      <h2 style={{ color: '#7d3c98' }}>⚛️ JSX Dynamic Rendering – Real-Time Full Guide</h2>

      {/* 🔤 String */}
      <h3>1️⃣ String Rendering</h3>
      <pre>{`const userName = 'Mounika';`}</pre>
      <p>👋 Hello, <strong>{userName}</strong></p>

      {/* 🧠 Function */}
      <h3>2️⃣ Function Rendering</h3>
      <pre>{`const greetUser = (name) => \`Hi, \${name}!\`;`}</pre>
      <p>{greetUser(userName)}</p>

      {/* 🧾 Object Rendering */}
      <h3>3️⃣ Object Rendering</h3>
      <pre>{`const user = { name: 'Prasad', city: 'Hyderabad', hobbies: ['Coding', 'Reading'] };`}</pre>
      <p>👤 {user.name} from {user.city}</p>
      <p>📚 Hobbies: {user.hobbies.join(', ')}</p>

      {/* 🍎 Array Rendering */}
      <h3>4️⃣ Array Rendering (Fruits List)</h3>
      <pre>{`const fruits = ['Apple', 'Banana', 'Mango'];`}</pre>
      <ul>
        {fruits.map((fruit, i) => <li key={i}>🍉 {fruit}</li>)}
      </ul>

      {/* 👥 Array of Objects */}
      <h3>5️⃣ Array of Objects Rendering</h3>
      <pre>{`const usersList = [
  { id: 1, name: 'Mounika', city: 'Hyd' },
  { id: 2, name: 'Sagar', city: 'Delhi' },
];`}</pre>
      <ul>
        {usersList.map(user => (
          <li key={user.id}>
            👩‍💼 {user.name} — 🏙️ {user.city}
          </li>
        ))}
      </ul>

      {/* 🧩 Complex Nested Structure */}
      <h3>6️⃣ Complex Nested Structure</h3>
      <pre>{`const complexData = {
  department: 'Development',
  teamMembers: [
    { id: 1, name: 'Akhil', skills: ['React', 'JS'] },
    { id: 2, name: 'Bhavana', skills: ['Node', 'MongoDB'] },
  ],
};`}</pre>
      <p>🏢 Department: {complexData.department}</p>
      <ul>
        {complexData.teamMembers.map(member => (
          <li key={member.id}>
            🧑‍💻 {member.name} — Skills: {member.skills.join(', ')}
          </li>
        ))}
      </ul>

      {/* 📘  */}
      <h3 style={{ color: '#21618c' }}>📘 :</h3>
      <ul>
        <li>🧵 JSX లో మీరు strings, arrays, functions, objects అన్నీ render చేయవచ్చు.</li>
        <li>🔁 Arrays ని `map()` ద్వారా loop చేయడం చాలా సాధారణ practice.</li>
        <li>🧩 Nested structures కి key values, nested loops అవసరం అవుతాయి.</li>
        <li>💡 Object లో direct render చెయ్యాలంటే `object.property` syntax వాడాలి.</li>
      </ul>

      {/* 🧠 Real-Time Scenarios */}
      <h3>🧠 Real-Time Scenarios Where JSX Rendering is Used:</h3>
      <ul>
        <li>✅ Login user name display</li>
        <li>✅ Profile info rendering</li>
        <li>✅ List of items or records</li>
        <li>✅ Dynamic tables / rows</li>
        <li>✅ Loops of nested structures from APIs</li>
        <li>✅ Forms with default values (controlled components)</li>
      </ul>

      {/* 🎯 Summary */}
      <h3 style={{ color: '#a04000' }}>🎯 Summary:</h3>
      <ul>
        <li>✔️ JSX supports rendering everything — strings, arrays, functions, objects, nested data.</li>
        <li>✔️ Use `map()` for array rendering and provide unique `key`.</li>
        <li>✔️ Render functions directly: <code>{'{greetUser("Mounika")}'}</code></li>
        <li>✔️ Access object properties safely, avoid rendering raw objects.</li>
      </ul>

      <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
        👉 Shall we now go for <strong>Conditional Rendering</strong> or <strong>Props Rendering & Children?</strong>
      </p>
    </div>
  );
};

export default JSXDynamicRenderingFullGuide;
