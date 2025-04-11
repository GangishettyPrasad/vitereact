import React from 'react';

const AsyncAwaitGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', backgroundColor: '#f4f6f7' }}>
      <h2 style={{ color: '#2980b9' }}>🔄 Async / Await – JavaScript & React (Telugu JSX Guide)</h2>

      <h3 style={{ color: '#1abc9c' }}>👉 Async / Await అంటే ఏమిటి?</h3>
      <p>
        JavaScript లో asynchronous code ని synchronous లా handle చేయడానికే <b>async/await</b> వాడతాం.
        ఇది <code>.then()</code> కంటే readable & cleaner syntax అందిస్తుంది.
      </p>

      <h3 style={{ color: '#9b59b6' }}>📌 Basic Syntax:</h3>
      <pre style={{ backgroundColor: '#fceade', padding: '1rem' }}>
        <code>{`
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}
        `}</code>
      </pre>

      <h3 style={{ color: '#d35400' }}>✅ Real-Time Example:</h3>
      <p>ఒక API నుంచి users list తీసి console లో print చేయడం:</p>
      <pre style={{ backgroundColor: '#f9ebea', padding: '1rem' }}>
        <code>{`
async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
        `}</code>
      </pre>

      <h3 style={{ color: '#2471a3' }}>⚛️ React Example:</h3>
      <p>Component load అయ్యినప్పుడు data fetch చేయాలి:</p>
      <pre style={{ backgroundColor: '#e8f8f5', padding: '1rem' }}>
        <code>{`
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};
        `}</code>
      </pre>

      <h3 style={{ color: '#c0392b' }}>⚠️ Common Mistakes:</h3>
      <ul>
        <li><b>await</b> must be used only inside <code>async</code> functions.</li>
        <li>Always use <code>try/catch</code> for error handling.</li>
        <li>Don’t forget <code>[]</code> in <code>useEffect</code> dependency array!</li>
      </ul>

      <h3 style={{ color: '#7d3c98' }}>📖 Summary (Telugu Recap):</h3>
      <ul>
        <li><b>async/await</b> వల్ల code readable & manageable అవుతుంది.</li>
        <li>React లో mostly <code>useEffect</code>, <code>onClick</code>, <code>form submit</code> లో వాడతాం.</li>
        <li>Promises ను synchronous structure లో handle చేయొచ్చు.</li>
      </ul>

      <p style={{ marginTop: '2rem', color: '#2980b9', fontWeight: 'bold' }}>
        ✅ నెక్స్ట్ స్టెప్: Want to continue with <b>Promise chaining + Error handling?</b><br />
        Or move into 🔁 <b>Custom Promises + Advanced Async Patterns?</b>
      </p>
    </div>
  );
};

export default AsyncAwaitGuide;
