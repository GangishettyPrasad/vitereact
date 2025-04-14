import React from 'react';

const JSXPropsGuide = () => {
  const hobbies = ['Reading', 'Coding', 'Drawing'];
  const user = { name: 'Prasad', city: 'Hyderabad' };
  const greet = (name) => `Welcome ${name} to React!`;

  const CustomComponent = () => (
    <p>This is a custom component sent as a prop ✨</p>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2e86de' }}>📘 JSX Props Guide (Full Visual)</h1>

      <p>
        JSX లో మనం props రూపంలో data పంపగలము. వీటిని string, number, boolean, array, object, function, component
        లా పంపవచ్చు. ఈ component వాటి usage, syntax, మరియు real-time use cases ను చూపుతుంది.
      </p>

      {/* String Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>1️⃣ String Prop</h2>
        <p><strong>Usage:</strong> Name, Title, Labels వంటి UI string values కు ఉపయోగపడుతుంది.</p>
        <h4>👉 Syntax:</h4>
        <code>{`<Greeting name="Prasad" />`}</code>
        <h4>👉 Output:</h4>
        <p>Hello, <strong>Prasad</strong>!</p>
      </section>

      {/* Number Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>2️⃣ Number Prop</h2>
        <p><strong>Usage:</strong> Age, price, quantity వంటి నెంబర్లు చూపించడానికి.</p>
        <code>{`<ShowAge age={28} />`}</code>
        <p>Output: <strong>User Age: 28</strong></p>
      </section>

      {/* Boolean Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>3️⃣ Boolean Prop</h2>
        <p><strong>Usage:</strong> Login status, toggles, flags కోసం ఉపయోగించవచ్చు.</p>
        <code>{`<LoginStatus isLoggedIn={true} />`}</code>
        <p>Output: ✅ User is Logged In</p>
      </section>

      {/* Array Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>4️⃣ Array Prop</h2>
        <p><strong>Usage:</strong> Hobbies, product list, tasks వంటి repeatable items.</p>
        <code>{`<HobbyList hobbies={["Reading", "Coding", "Drawing"]} />`}</code>
        <h4>👉 Output:</h4>
        <ul>
          {hobbies.map((item, index) => (
            <li key={index}>📌 {item}</li>
          ))}
        </ul>
      </section>

      {/* Object Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>5️⃣ Object Prop</h2>
        <p><strong>Usage:</strong> User info, product details వంటి structure data కోసం.</p>
        <code>{`<UserCard user={{ name: "Prasad", city: "Hyderabad" }} />`}</code>
        <h4>👉 Output:</h4>
        <div>
          <p>👤 Name: <strong>{user.name}</strong></p>
          <p>🏙️ City: <strong>{user.city}</strong></p>
        </div>
      </section>

      {/* Function Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>6️⃣ Function Prop</h2>
        <p><strong>Usage:</strong> Dynamic greeting, callbacks, event handlers కోసం.</p>
        <code>{`<Greeter greet={(name) => \`Welcome \${name}\`} />`}</code>
        <h4>👉 Output:</h4>
        <p>{greet("Prasad")}</p>
      </section>

      {/* Component Prop */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#8e44ad' }}>7️⃣ Component Prop</h2>
        <p><strong>Usage:</strong> Layout injection, slot-like features.</p>
        <code>{`<Wrapper component={CustomComponent} />`}</code>
        <h4>👉 Output:</h4>
        <div style={{ border: '1px dashed #aaa', padding: '10px' }}>
          <CustomComponent />
        </div>
      </section>

      {/* Summary */}
      <section>
        <h2 style={{ color: '#196f3d' }}>📋 Summary</h2>
        <ul>
          <li>✅ String → Display names, text</li>
          <li>✅ Number → Age, Price, Count</li>
          <li>✅ Boolean → Status flags, toggles</li>
          <li>✅ Array → List rendering (map)</li>
          <li>✅ Object → Structured user/product info</li>
          <li>✅ Function → Callbacks, dynamic logic</li>
          <li>✅ Component → Dynamic UI blocks</li>
        </ul>
      </section>

      <section>
        <h3 style={{ color: '#e67e22' }}>🧠 Telugu Tips:</h3>
        <ul>
          <li>👉 Props అనేవి data పంపడానికి ఉపయోగపడతాయి</li>
          <li>👉 Parent నుంచి child component కి దేన్నైనా పంపొచ్చు</li>
          <li>👉 Clean UI, reusable components కోసం props must</li>
        </ul>
      </section>
    </div>
  );
};

export default JSXPropsGuide;
