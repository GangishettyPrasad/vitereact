import React, { useState } from 'react';

const UseStateCompleteGuide = () => {
  // ✅ 1. Basic useState – string example
  const [username, setUsername] = useState('Prasad');

  // ✅ 2. useState returns an Array → [stateValue, setStateFunction]
  // Destructuring example:
  const [age, setAge] = useState(25);

  // ✅ 3. Boolean State Example
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ 4. Array State Example
  const [languages, setLanguages] = useState(['JavaScript', 'React']);

  // ✅ 5. Object State Example
  const [profile, setProfile] = useState({
    name: 'Prasad',
    city: 'Hyderabad',
    experience: 3,
  });

  // ✅ 6. useState with function (runs only once to set initial state)
  const [randomNumber] = useState(() => {
    console.log('Runs only once!');
    return Math.floor(Math.random() * 100);
  });

  // ✅ 7. useState with Function Data
  const [callback, setCallback] = useState(() => () => alert('Hello from function!'));

  // 🔁 Realtime Update Examples
  const toggleLogin = () => setIsLoggedIn((prev) => !prev);
  const addLanguage = () => setLanguages((prev) => [...prev, 'TypeScript']);
  const updateProfile = () =>
    setProfile((prev) => ({ ...prev, city: 'Bangalore', experience: prev.experience + 1 }));

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#f7f9f9' }}>
      <h2 style={{ color: '#2e86c1' }}>🔍 React useState - Complete JSX Guide </h2>

      <h3 style={{ color: '#117a65' }}>📌 useState working:</h3>
      <pre style={{ background: '#fef9e7', padding: '1rem' }}>
        <code>{`const [stateValue, setStateValue] = useState(initialValue);`}</code>
      </pre>
      <ul>
        <li>📦 Returns an <strong>array</strong></li>
        <li>🛠️ We use <strong>destructuring</strong> to access state and setter</li>
        <li>📈 Setter will re-render the component</li>
      </ul>

      <h3 style={{ color: '#884ea0' }}>✅ Real-time Values</h3>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Is Logged In:</strong> {isLoggedIn ? 'Yes' : 'No'}</p>
      <p><strong>Languages:</strong> {languages.join(', ')}</p>
      <p><strong>Profile:</strong> {profile.name} from {profile.city}, {profile.experience} yrs exp</p>
      <p><strong>Random Number:</strong> {randomNumber}</p>

      <h3 style={{ color: '#e67e22' }}>🎯 Actions</h3>
      <button onClick={() => setUsername('Ravi')} style={{ marginRight: '1rem' }}>Change Name</button>
      <button onClick={() => setAge(age + 1)} style={{ marginRight: '1rem' }}>Increase Age</button>
      <button onClick={toggleLogin} style={{ marginRight: '1rem' }}>Toggle Login</button>
      <button onClick={addLanguage} style={{ marginRight: '1rem' }}>Add Language</button>
      <button onClick={updateProfile} style={{ marginRight: '1rem' }}>Update Profile</button>
      <button onClick={callback}>Run Function State</button>

      <h3 style={{ color: '#5d6d7e', marginTop: '2rem' }}>📌 All useState Supported Types:</h3>
      <ul>
        <li>✅ String (e.g. name)</li>
        <li>✅ Number (e.g. age)</li>
        <li>✅ Boolean (e.g. isLoggedIn)</li>
        <li>✅ Arrays (e.g. skills, fruits)</li>
        <li>✅ Objects (e.g. user, product)</li>
        <li>✅ Functions (used as state too)</li>
      </ul>

      <h3 style={{ color: '#196f3d' }}>🧠 Real-time Use Cases:</h3>
      <ul>
        <li>📋 Form input handling</li>
        <li>🧾 Toggle UI (login/logout)</li>
        <li>📊 List rendering and updates</li>
        <li>🔁 Dynamic object updates</li>
        <li>💡 Using pre-state logic safely</li>
        <li>🧩 Functional state for one-time calculations</li>
      </ul>

      <h3 style={{ color: '#a93226' }}>📘 :</h3>
      <ul>
        <li>🧠 useState ఒక React Hook → state ని manage చేయడానికి వాడతాం</li>
        <li>🔁 ఇది UI re-render చేయడానికి Trigger అవుతుంది</li>
        <li>📦 return అయ్యేది: array లో state మరియు setter function</li>
        <li>🔍 Destructuring ద్వారా access చేస్తాం</li>
        <li>🔄 prev state అవసరం అయితే function ద్వారా update చేయవచ్చు</li>
      </ul>

      <h3 style={{ marginTop: '2rem', color: '#1f618d' }}>🤔 Want to try:</h3>
      <ul>
        <li>✅ useState with Forms?</li>
        <li>✅ useState in Lists (like Todo)?</li>
        <li>✅ useState + useEffect combo?</li>
      </ul>
    </div>
  );
};

export default UseStateCompleteGuide;
