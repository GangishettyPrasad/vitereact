import React, { useState } from 'react';
import { FaCopy, FaCheck, FaTerminal } from 'react-icons/fa';

// Helper to escape HTML tags for syntax highlighting
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Custom VS-Code style Syntax Highlighter
function highlightCode(code) {
  if (!code) return '';
  const placeholders = [];
  let tokenized = code;

  // 1. Comments (Green)
  tokenized = tokenized.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 2. Strings (Orange)
  tokenized = tokenized.replace(/(["'`])(.*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 3. Escape HTML tags
  tokenized = escapeHtml(tokenized);

  // 4. JS/React Keywords (Blue)
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 
    'from', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'switch', 
    'case', 'break', 'new', 'throw', 'class', 'extends', 'super', 'true', 'false', 
    'null', 'undefined', 'delete', 'in', 'of'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: bold;">${kw}</span>`);
  });

  // 5. React Hooks & Built-in functions (Teal)
  const builtins = [
    'useState', 'useEffect', 'useContext', 'useRef', 'useNavigate', 'useLocation', 
    'useSelector', 'useDispatch', 'sessionStorage', 'localStorage', 'document', 
    'window', 'JSON', 'axios', 'CryptoJS', 'flatMap', 'filter', 'map', 'some', 'every', 'find'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 6. Function Invocations (Yellow)
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // 7. Numbers (Light Green)
  tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#2d3748',
        padding: '8px 16px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        color: '#a0aec0',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <span><FaTerminal style={{ marginRight: '6px' }} /> javascript_snippet</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? '#48bb78' : '#a0aec0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {copied ? <FaCheck /> : <FaCopy />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div style={{
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
        border: '1px solid #2d3748',
        borderTop: 'none'
      }}>
        <pre style={{
          margin: 0,
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: '16px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: '1.6',
          fontFamily: '"Fira Code", Courier, monospace',
          whiteSpace: 'pre-wrap'
        }} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </div>
    </div>
  );
};

const NestedArraysWithObjects = () => {
  const usersCode = `const users = [
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
];`;

  const flatMapCode = `const frontendTechs = users.flatMap(user => 
  user.skills.filter(skill => skill.type === "frontend").map(skill => skill.tech)
);`;

  const addNewSkillCode = `const updatedUsers = users.map(user => {
  if (user.id === 1) {
    return {
      ...user,
      skills: [...user.skills, { type: "devops", tech: "Docker" }]
    };
  }
  return user;
});`;

  const reactRenderCode = `{users.map(user => (
  <div key={user.id}>
    <h4>{user.name}</h4>
    <ul>
      {user.skills.map((skill, i) => (
        <li key={i}>{skill.type} – {skill.tech}</li>
      ))}
    </ul>
  </div>
))}`;

  const removeSkillCode = `const updated = users.map(user => {
  if (user.id === 2) {
    return {
      ...user,
      skills: user.skills.filter(skill => skill.tech !== "Django")
    };
  }
  return user;
});`;

  const updateSkillCode = `const modified = users.map(user => {
  if (user.id === 1) {
    return {
      ...user,
      skills: user.skills.map(skill => 
        skill.tech === "React" ? { ...skill, tech: "Next.js" } : skill
      )
    };
  }
  return user;
});`;

  const countSkillsCode = `const counts = users.map(user => ({
  name: user.name,
  totalSkills: user.skills.length
}));`;

  const flattenSkillsCode = `const allSkills = users.flatMap(user => user.skills);`;

  const findUserCode = `const found = users.find(user => 
  user.skills.some(skill => skill.tech === "Vue")
);`;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fefefe', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#005aa7', marginBottom: '1.5rem' }}>🔗 Nested Arrays with Objects – JavaScript & React Guide </h2>
      <p><strong>Nested Arrays with Objects</strong> అనేవి complex data structures manage చేయడానికి వాడతాం. ఇవి real-time applications లో చాలా common గా ఉంటాయి (Forms, Tables, API responses).</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>📌 Structure Example</h3>
      <CodeBlock code={usersCode} />

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>1️⃣ Specific Data Access (like all frontend techs)</h3>
      <CodeBlock code={flatMapCode} />
      <p><strong>Output:</strong> <code>["React", "Vue"]</code></p>
      <p>👉 ప్రతి user లోని frontend techs ని filter చేసి array గా తీస్తాం.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>2️⃣ Add New Skill to Specific User</h3>
      <CodeBlock code={addNewSkillCode} />
      <p>👉 User 1 కి కొత్త skill add చేసాం – using spread operator and immutability maintained.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>3️⃣ Display Nested Data in React UI</h3>
      <CodeBlock code={reactRenderCode} />
      <p>👉 Nested loops (map inside map) React లో nested arrays render చేయడానికి.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>4️⃣ Remove a Skill from a User</h3>
      <CodeBlock code={removeSkillCode} />
      <p>👉 mounika నుండి Django remove చేసాం using <code>filter()</code>.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>5️⃣ Update a Nested Skill</h3>
      <CodeBlock code={updateSkillCode} />
      <p>👉 User 1 లో React ని Next.js తో update చేసాం (immutably).</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>6️⃣ Count Skills per User</h3>
      <CodeBlock code={countSkillsCode} />
      <p>👉 ప్రతీ user కి ఎన్ని skills ఉన్నాయో తెలుసుకోవడం కోసం.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>7️⃣ Flatten All Skills</h3>
      <CodeBlock code={flattenSkillsCode} />
      <p>👉 అన్ని users లోని skills ని single array లోకి తెచ్చాం.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>8️⃣ Find User by Skill</h3>
      <CodeBlock code={findUserCode} />
      <p>👉 Vue tech ఉన్న user ని కనుగొన్నాం using <code>find + some</code>.</p>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>✅ Best Practices</h3>
      <ul>
        <li>✅ Always use <code>map/filter</code> instead of <code>for</code> loops for immutability</li>
        <li>✅ Spread operator ద్వారా nested updates చేయండి</li>
        <li>✅ Keys ని use చేసి React లో performance improve చేయండి</li>
        <li>✅ Data transformations కోసం <code>flatMap</code>, <code>some</code>, <code>every</code> use చేయండి</li>
      </ul>

      <h3 style={{ color: '#0d7c8c', marginTop: '2rem' }}>🔥 Real-Time Usage</h3>
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
