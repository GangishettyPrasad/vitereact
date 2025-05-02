import React from 'react';

const NestedArraysWithObjects = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fefefe' }}>
      <h2 style={{ color: '#005aa7' }}>🔗 Nested Arrays with Objects – JavaScript & React Guide </h2>
      <p><strong>Nested Arrays with Objects</strong> అనేవి complex data structures manage చేయడానికి వాడతాం. ఇవి real-time applications లో చాలా common గా ఉంటాయి (Forms, Tables, API responses).</p>

      <h3 style={{ color: '#0d7c8c' }}>📌 Structure Example</h3>
      <pre>
        <code>{`const users = [
  {
    id: 1,
    name: "Prasad",
    skills: [
      { type: "frontend", tech: "React" },
      { type: "backend", tech: "Node.js" }
    ]
  },
  {
    id: 2,
    name: "mounika",
    skills: [
      { type: "frontend", tech: "Vue" },
      { type: "backend", tech: "Django" }
    ]
  }
];`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>1️⃣ Specific Data Access (like all frontend techs)</h3>
      <pre>
        <code>{`const frontendTechs = users.flatMap(user => 
  user.skills.filter(skill => skill.type === "frontend").map(skill => skill.tech)
);`}</code>
      </pre>
      <p><strong>Output:</strong> ["React", "Vue"]</p>
      <p>👉 ప్రతి user లోని frontend techs ని filter చేసి array గా తీస్తాం.</p>

      <h3 style={{ color: '#0d7c8c' }}>2️⃣ Add New Skill to Specific User</h3>
      <pre>
        <code>{`const updatedUsers = users.map(user => {
  if (user.id === 1) {
    return {
      ...user,
      skills: [...user.skills, { type: "devops", tech: "Docker" }]
    };
  }
  return user;
});`}</code>
      </pre>
      <p>👉 User 1 కి కొత్త skill add చేసాం – using spread operator and immutability maintained.</p>

      <h3 style={{ color: '#0d7c8c' }}>3️⃣ Display Nested Data in React UI</h3>
      <pre>
        <code>{`{users.map(user => (
  <div key={user.id}>
    <h4>{user.name}</h4>
    <ul>
      {user.skills.map((skill, i) => (
        <li key={i}>{skill.type} – {skill.tech}</li>
      ))}
    </ul>
  </div>
))}`}</code>
      </pre>
      <p>👉 Nested loops (map inside map) React లో nested arrays render చేయడానికి.</p>

      <h3 style={{ color: '#0d7c8c' }}>4️⃣ Remove a Skill from a User</h3>
      <pre>
        <code>{`const updated = users.map(user => {
  if (user.id === 2) {
    return {
      ...user,
      skills: user.skills.filter(skill => skill.tech !== "Django")
    };
  }
  return user;
});`}</code>
      </pre>
      <p>👉 mounika నుండి Django remove చేసాం using <code>filter()</code>.</p>

      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Update a Nested Skill</h3>
      <pre>
        <code>{`const modified = users.map(user => {
  if (user.id === 1) {
    return {
      ...user,
      skills: user.skills.map(skill => 
        skill.tech === "React" ? { ...skill, tech: "Next.js" } : skill
      )
    };
  }
  return user;
});`}</code>
      </pre>
      <p>👉 User 1 లో React ని Next.js తో update చేసాం (immutably).</p>

      <h3 style={{ color: '#0d7c8c' }}>6️⃣ Count Skills per User</h3>
      <pre>
        <code>{`const counts = users.map(user => ({
  name: user.name,
  totalSkills: user.skills.length
}));`}</code>
      </pre>
      <p>👉 ప్రతీ user కి ఎన్ని skills ఉన్నాయో తెలుసుకోవడం కోసం.</p>

      <h3 style={{ color: '#0d7c8c' }}>7️⃣ Flatten All Skills</h3>
      <pre>
        <code>{`const allSkills = users.flatMap(user => user.skills);`}</code>
      </pre>
      <p>👉 అన్ని users లోని skills ని single array లోకి తెచ్చాం.</p>

      <h3 style={{ color: '#0d7c8c' }}>8️⃣ Find User by Skill</h3>
      <pre>
        <code>{`const found = users.find(user => 
  user.skills.some(skill => skill.tech === "Vue")
);`}</code>
      </pre>
      <p>👉 Vue tech ఉన్న user ని కనుగొన్నాం using <code>find + some</code>.</p>

      <h3 style={{ color: '#0d7c8c' }}>✅ Best Practices</h3>
      <ul>
        <li>✅ Always use <code>map/filter</code> instead of <code>for</code> loops for immutability</li>
        <li>✅ Spread operator ద్వారా nested updates చేయండి</li>
        <li>✅ Keys ని use చేసి React లో performance improve చేయండి</li>
        <li>✅ Data transformations కోసం <code>flatMap</code>, <code>some</code>, <code>every</code> use చేయండి</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>🔥 Real-Time Usage</h3>
      <ul>
        <li>🧾 Form Data: Dynamic rows with input fields inside each</li>
        <li>📊 Table UI: Expandable rows for sub-data (like orders)</li>
        <li>📦 JSON APIs: Handling deeply nested API responses</li>
        <li>🎛️ Menu Systems: Sidebar menus with submenus</li>
      </ul>
    </div>
  );
};

export default NestedArraysWithObjects;
