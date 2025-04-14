import React, { useState } from 'react';

const ReactStateGuide = () => {
  const [user, setUser] = useState({
    name: 'Prasad',
    hobbies: ['coding', 'music'],
    address: {
      city: 'Hyderabad',
      pincode: 500032
    }
  });

  const updateName = () => {
    setUser({ ...user, name: 'Prasad Kumar' });
  };

  const addHobby = () => {
    setUser({ ...user, hobbies: [...user.hobbies, 'travel'] });
  };

  const updateCity = () => {
    setUser({ ...user, address: { ...user.address, city: 'Vizag' } });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5faff', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#005aa7' }}>⚛️ React State & Complex Data Updates (Telugu Guide)</h2>

      {/* 1. State Basics */}
      <h3 style={{ color: '#007d65' }}>1️⃣ useState – Basic State Setup</h3>
      <p>
        React లో state అనేది component-level data ని manage చేయడానికి ఉపయోగిస్తాం.
        State change అయ్యే ప్రతి సారి component re-render అవుతుంది.
      </p>

      <pre style={{ background: '#e0f7fa', padding: '1rem' }}>
        <code>{`const [count, setCount] = useState(0);`}</code>
      </pre>

      {/* 2. Nested Object State */}
      <h3 style={{ color: '#007d65' }}>2️⃣ Nested Object State Update</h3>
      <p>
        Object లో nested structure (like address, profile) ఉంటే <strong>spread operator</strong>తో carefully update చేయాలి.
      </p>

      <pre style={{ background: '#e0f7fa', padding: '1rem' }}>
        <code>{`setUser({
  ...user,
  address: {
    ...user.address,
    city: 'Vizag'
  }
});`}</code>
      </pre>

      <button onClick={updateCity}>Update City</button>

      {/* 3. Array State Update */}
      <h3 style={{ color: '#007d65' }}>3️⃣ Array లో Values Add చేయడం</h3>
      <p>
        State లో arrays update చేయాలంటే spread చేసి కొత్త array ఇవ్వాలి (immutability).
      </p>

      <pre style={{ background: '#e0f7fa', padding: '1rem' }}>
        <code>{`setUser({
  ...user,
  hobbies: [...user.hobbies, 'travel']
});`}</code>
      </pre>

      <button onClick={addHobby}>Add Hobby</button>

      {/* 4. Complete Object Update */}
      <h3 style={{ color: '#007d65' }}>4️⃣ Name Update Example</h3>
      <p>
        Object level updates కూడా immutable గా spread చేసి చేయాలి:
      </p>

      <pre style={{ background: '#e0f7fa', padding: '1rem' }}>
        <code>{`setUser({
  ...user,
  name: 'Prasad Kumar'
});`}</code>
      </pre>

      <button onClick={updateName}>Update Name</button>

      {/* 5. Real-Time Example */}
      <h3 style={{ color: '#007d65' }}>5️⃣ Real-Time Example: Nested Form State</h3>
      <p>
        Complex forms, user profiles, multi-step wizards లాంటి features లో nested updates చాలా ఉపయోగపడతాయి.
      </p>
      <ul>
        <li>✅ Immutable Updates – Clean state history</li>
        <li>✅ Controlled inputs – Consistent UI</li>
        <li>✅ Best practice – Avoid direct mutation</li>
      </ul>

      {/* 6. Displaying State */}
      <h3 style={{ color: '#007d65' }}>6️⃣ Live State Output</h3>
      <pre style={{ background: '#fff8e1', padding: '1rem' }}>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', color: '#005aa7' }}>
        🔁 Next Step: <strong>🔄 Advanced CRUD with Nested Structures</strong> JSX Guide రాబోతుంది... proceed చేయమంటారా?
      </p>
    </div>
  );
};

export default ReactStateGuide;
