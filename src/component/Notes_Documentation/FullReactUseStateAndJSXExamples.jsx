
import React, { useState } from 'react';

const FullReactUseStateAndJSXExamples = () => {
  const userName = 'Tharun';
  const user = { name: 'Prasad', city: 'Hyderabad', hobbies: ['Coding', 'Reading'] };
  const greetUser = (name) => `Hi, ${name}! Welcome to React World!`;

  const fruits = ['Apple', 'Banana', 'Mango'];
  const usersList = [
    { id: 1, name: 'Tharun', city: 'Hyd' },
    { id: 2, name: 'Sagar', city: 'Delhi' },
    { id: 3, name: 'Radha', city: 'Mumbai' },
  ];

  const complexData = {
    department: 'Development',
    teamMembers: [
      { id: 1, name: 'Akhil', skills: ['React', 'JS'] },
      { id: 2, name: 'Bhavana', skills: ['Node', 'MongoDB'] }
    ]
  };

  const [formName, setFormName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState(['Buy Milk', 'Learn React']);
  const [userState, setUser] = useState({ name: 'Prasad', city: 'Hyderabad' });
  const [counter, setCounter] = useState(0);
  const [random, setRandom] = useState(() => Math.floor(Math.random() * 1000));

  const increaseCounter = () => setCounter(prev => prev + 1);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#fcf3cf' }}>
      <h2 style={{ color: '#2e86c1' }}>🔥 JSX + useState Real-time Full Examples </h2>

      {/* JSX Data Rendering Examples */}
      <section>
        <h3>🌟 Static + Dynamic JSX</h3>
        <p>{greetUser(userName)}</p>
        <p>Name: {user.name}, City: {user.city}</p>
        <ul>{user.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}</ul>
        <h4>Fruits:</h4>
        <ul>{fruits.map((fruit, i) => <li key={i}>{fruit}</li>)}</ul>
        <h4>User List:</h4>
        <ul>{usersList.map(user => <li key={user.id}>{user.name} - {user.city}</li>)}</ul>
        <h4>Complex Data (Nested):</h4>
        {complexData.teamMembers.map(member => (
          <div key={member.id}>
            <p>{member.name}</p>
            <ul>{member.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        ))}
      </section>

      {/* useState Form Handling */}
      <section style={{ marginTop: '2rem' }}>
        <h3>📋 Form Input Handling</h3>
        <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Enter Name" />
        <p>Hello, {formName}</p>
      </section>

      {/* Toggle UI */}
      <section style={{ marginTop: '2rem' }}>
        <h3>🧾 Toggle UI</h3>
        <button onClick={() => setIsLoggedIn(prev => !prev)}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        <p>Status: {isLoggedIn ? '✅ Logged In' : '❌ Logged Out'}</p>
      </section>

      {/* List Updates */}
      <section style={{ marginTop: '2rem' }}>
        <h3>📊 List Rendering + Update</h3>
        <ul>{todos.map((todo, i) => <li key={i}>{todo}</li>)}</ul>
        <button onClick={() => setTodos([...todos, `New Task ${todos.length + 1}`])}>Add Task</button>
      </section>

      {/* Dynamic Object Update */}
      <section style={{ marginTop: '2rem' }}>
        <h3>🔁 Object Updates</h3>
        <p>{userState.name} from {userState.city}</p>
        <button onClick={() => setUser(prev => ({ ...prev, city: 'Bangalore' }))}>Change City</button>
      </section>

      {/* Pre-state Logic */}
      <section style={{ marginTop: '2rem' }}>
        <h3>💡 Pre-state Safe Update</h3>
        <p>Counter: {counter}</p>
        <button onClick={increaseCounter}>+1</button>
      </section>

      {/* Functional State Initialization */}
      <section style={{ marginTop: '2rem' }}>
        <h3>🧩 One-Time Init Value</h3>
        <p>Generated Random: {random}</p>
      </section>
    </div>
  );
};

export default FullReactUseStateAndJSXExamples;
