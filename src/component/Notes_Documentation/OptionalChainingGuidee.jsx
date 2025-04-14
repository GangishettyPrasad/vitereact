import React from 'react';

const OptionalChainingGuidee = () => {
  const user = {
    id: 1,
    name: "Prasad",
    profile: {
      email: "prasad@example.com",
      address: {
        city: "Hyderabad",
        pin: 500001
      }
    }
  };

  // Example 1: Traditional access (risky if undefined)
  // const pinCode = user.profile.address.pin;

  // Example 2: Safe Access with Optional Chaining
  const pinCode = user?.profile?.address?.pin;

  const noCrash = user?.settings?.darkMode; // undefined → but no crash!

  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", background: "#fafafa" }}>
      <h2>💡 Optional Chaining (`?.`) & Safe Accessing</h2>

      <p><strong>Telugu:</strong> Object లో deep property access చేసే ముందు అది ఉంది లేదా లేదో check చేయడానికి optional chaining ఉపయోగిస్తాం.</p>

      <h3>📦 Syntax:</h3>
      <code>object?.property?.subProperty</code>

      <h3>🛑 Traditional Way:</h3>
      <pre>
        <code>
{`if (user && user.profile && user.profile.address) {
  console.log(user.profile.address.pin);
}`}
        </code>
      </pre>

      <h3>✅ With Optional Chaining:</h3>
      <pre>
        <code>console.log(user?.profile?.address?.pin);</code>
      </pre>

      <h3>🧪 Output:</h3>
      <p><strong>Pincode:</strong> {pinCode}</p>
      <p><strong>Dark Mode Setting (undefined):</strong> {JSON.stringify(noCrash)}</p>

      <h3>🧠 Real-time Use Cases in React:</h3>
      <ul>
        <li>🔥 API Data Load అయిన తరువాత check చేయడం</li>
        <li>🌐 Nested object లు ఉన్న Data Tables</li>
        <li>📦 Props లేదా State లో deep data access</li>
      </ul>

      <h3>🚫 Without Optional Chaining – Danger Zone!</h3>
      <code>{`TypeError: Cannot read property 'address' of undefined`}</code>

      <h3>💡 Best Practices:</h3>
      <ul>
        <li>Use it for accessing deep nested props (like user?.profile?.details?.email)</li>
        <li>Combine with default values – user?.profile?.email || "No Email"</li>
        <li>Perfect for React Conditional Rendering</li>
      </ul>
    </div>
  );
};

export default OptionalChainingGuidee;
