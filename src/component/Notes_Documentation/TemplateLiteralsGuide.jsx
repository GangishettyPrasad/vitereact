import React from "react";

const TemplateLiteralsGuide = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🚀 Template Literals – JSX Guide (with Telugu)</h1>

      {/* 1. Basic String Interpolation */}
      <section>
        <h2>1️⃣ Basic String Interpolation</h2>
        <pre>{`const name = "Prasad";
const greeting = \`Hello, \${name}!\`; // Hello, Prasad!`}</pre>
        <p>
          👉 **${}** notation is used to inject JavaScript expressions inside
          strings.
        </p>
      </section>

      {/* 2. Multi-line Strings */}
      <section>
        <h2>2️⃣ Multi-line Strings</h2>
        <pre>{`const multiLine = \`Hello, 
this is a multi-line string! 
It spans multiple lines.\`;`}</pre>
        <p>
          📌 **Template literals** allow multi-line strings, unlike normal
          quotes that don't support them.
        </p>
      </section>

      {/* 3. Expressions Inside Template Literals */}
      <section>
        <h2>3️⃣ Expressions Inside Template Literals</h2>
        <pre>{`const x = 5;
const y = 10;
const sum = \`Sum of \${x} and \${y} is \${x + y}\`;`}</pre>
        <p>🧠 You can include any JavaScript expression inside the curly braces.</p>
      </section>

      {/* 4. Template Literals with React */}
      <section>
        <h2>4️⃣ Template Literals in React JSX</h2>
        <pre>{`const name = "Prasad";
return <h1>Hello, \${name}!</h1>;`}</pre>
        <p>
          ✅ In React, you can also use template literals for dynamic rendering
          in JSX.
        </p>
      </section>

      {/* 5. Expressions & Functions in JSX */}
      <section>
        <h2>5️⃣ Template Literals with Functions</h2>
        <pre>{`const greet = (name) => \`Hello, \${name}\`;
return <p>{greet("Prasad")}</p>;`}</pre>
        <p>
          📌 Functions can be used inside template literals to dynamically
          create strings.
        </p>
      </section>

      {/* 6. Conditional Expressions in Template Literals */}
      <section>
        <h2>6️⃣ Conditional Expressions in Template Literals</h2>
        <pre>{`const isLoggedIn = true;
const message = \`User is \${isLoggedIn ? "logged in" : "not logged in"}\`;`}</pre>
        <p>🎯 Conditional logic can be used directly inside template literals.</p>
      </section>

      {/* 7. Complex Expressions */}
      <section>
        <h2>7️⃣ Complex Expressions</h2>
        <pre>{`const user = { name: "Prasad", age: 25 };
const userInfo = \`Name: \${user.name}, Age: \${user.age}\`;`}</pre>
        <p>
          🧠 Complex objects, arrays, and other structures can be easily
          interpolated into strings.
        </p>
      </section>

      {/* 8. Styling with Template Literals */}
      <section>
        <h2>8️⃣ Dynamic Styling in JSX</h2>
        <pre>{`const color = "blue";
return <div style={{ color: \`\${color}\` }}>Styled Text</div>;`}</pre>
        <p>🎨 You can dynamically set styles using template literals in React.</p>
      </section>

      {/* 9. Ternary Conditional for Rendering */}
      <section>
        <h2>9️⃣ Ternary Conditional for Rendering in JSX</h2>
        <pre>{`const isVisible = true;
return <p>{\`Visibility is \${isVisible ? "Visible" : "Hidden"}\`}</p>;`}</pre>
        <p>
          🔥 The ternary operator works seamlessly with template literals for
          conditional rendering.
        </p>
      </section>

      {/* 10. String Templates in Arrays */}
      <section>
        <h2>🔟 Array with Template Literals</h2>
        <pre>{`const users = ["Prasad", "Sneha"];
const userList = users.map(user => \`User: \${user}\`);`}</pre>
        <p>📌 Use **map()** with template literals to format array data.</p>
      </section>

      {/* 11. Using Template Literals for Multi-line JSX */}
      <section>
        <h2>1️⃣1️⃣ Multi-line JSX with Template Literals</h2>
        <pre>{`const description = \`
  <p>This is a multi-line 
  description with <strong>HTML</strong> tags!</p>
\`;`}</pre>
        <p>🔨 This allows you to handle multi-line strings inside JSX or even HTML.</p>
      </section>

      {/* 12. String Formatting */}
      <section>
        <h2>1️⃣2️⃣ String Formatting with Template Literals</h2>
        <pre>{`const score = 85;
const message = \`Your score is: \${score} points\`;`}</pre>
        <p>💡 Template literals can format strings dynamically for clear messaging.</p>
      </section>

      {/* 13. String Escaping */}
      <section>
        <h2>1️⃣3️⃣ Escaping Characters</h2>
        <pre>{`const quote = \`He said, \\"Hello!\"\`;`}</pre>
        <p>📌 Use escape sequences like <code>\"</code> in template literals.</p>
      </section>

      {/* 14. Summary Table */}
      <section>
        <h2>✅ Summary Table</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Feature</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Template Literals
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Regular Strings
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                Multi-line Strings
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ✅ Supports
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ❌ Not Supported
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                String Interpolation
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ✅ Supports <code>${}</code> for expressions
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ❌ Not Supported
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                Escape Sequences
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ✅ Supports escaping
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ✅ Supports escaping
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                Functions in Strings
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ✅ Supports
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ❌ Not Supported
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TemplateLiteralsGuide;
