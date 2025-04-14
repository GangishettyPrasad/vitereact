import React from "react";

const ArrowFunctionsGuide = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🚀 Arrow Functions – JSX Guide (with Telugu)</h1>

      {/* 1. Basic Syntax */}
      <section>
        <h2>1️⃣ Basic Syntax</h2>
        <pre>{`const greet = () => console.log("Hello!");`}</pre>
        <p>👉 చిన్న ఫంక్షన్లు declare చేయడానికి short & sweet syntax.</p>
      </section>

      {/* 2. Syntax Variations */}
      <section>
        <h2>2️⃣ Syntax Variations</h2>
        <ul>
          <li>Single param: <code>n =&gt; n * 2</code></li>
          <li>No param: <code>() =&gt; console.log("Hi")</code></li>
          <li>Multiple param: <code>(a, b) =&gt; a + b</code></li>
          <li>
            Return object: <code>() =&gt; (&#123; name: "Prasad" &#125;)</code>
          </li>
        </ul>
      </section>

      {/* 3. Lexical this */}
      <section>
        <h2>3️⃣ Lexical <code>this</code></h2>
        <pre>{`const user = {
  name: "Prasad",
  greet: () => console.log(this.name) // ❌ undefined
};`}</pre>
        <p>🧠 Telugu: Arrow function లో <code>this</code> bind కాదు. Parent scope నుంచి తీసుకుంటుంది.</p>
      </section>

      {/* 4. No arguments object */}
      <section>
        <h2>4️⃣ No <code>arguments</code> Object</h2>
        <pre>{`const test = () => console.log(arguments); // ❌ ReferenceError`}</pre>
        <p>🧠 Telugu: Arrow function లో <code>arguments</code> object ఉండదు.</p>
      </section>

      {/* 5. No constructor */}
      <section>
        <h2>5️⃣ Cannot be used as Constructor</h2>
        <pre>{`const Person = () => {};
const p = new Person(); // ❌ TypeError`}</pre>
        <p>🧠 Telugu: Arrow functions కి <code>new</code> keyword తో constructor behavior ఉండదు.</p>
      </section>

      {/* 6. Inside object */}
      <section>
        <h2>6️⃣ Arrow Function Inside Object</h2>
        <pre>{`const obj = {
  name: "Test",
  greet: () => console.log(this.name) // ❌ undefined
};`}</pre>
        <p>✅ Regular function వాడాలి to access <code>this</code>.</p>
      </section>

      {/* 7. Class Method */}
      <section>
        <h2>7️⃣ Arrow Function as Class Method</h2>
        <pre>{`class Person {
  name = "Prasad";
  sayHi = () => console.log("Hi " + this.name); // ✅ works
}`}</pre>
        <p>📌 Telugu: Class components లో methods కి arrow functions వాడొచ్చు (lexical this).</p>
      </section>

      {/* 8. Return Object */}
      <section>
        <h2>8️⃣ Return Object – Parentheses Needed</h2>
        <pre>{`const getUser = () => ({ name: "Prasad" });`}</pre>
        <p>❗ Parentheses లేకపోతే – object కాదు అని treat చేస్తుంది.</p>
      </section>

      {/* 9. Chaining */}
      <section>
        <h2>9️⃣ Chaining Arrow Functions</h2>
        <pre>{`const double = x => x * 2;
const add5 = x => x + 5;
const result = add5(double(10)); // ✅ 25`}</pre>
        <p>👉 Telugu: chaining ఉపయోగించి multiple operations cleanly manage చేయవచ్చు.</p>
      </section>

      {/* 10. React Events */}
      <section>
        <h2>🔟 React Events with Arrow Functions</h2>
        <pre>{`<button onClick={() => console.log("Clicked!")}>Click</button>`}</pre>
        <p>📌 Telugu: React లో inline handlers గా arrow functions perfect fit.</p>
      </section>

      {/* 11. Promises */}
      <section>
        <h2>1️⃣1️⃣ Promises with Arrow Functions</h2>
        <pre>{`fetch("/api")
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>
        <p>👉 Telugu: Arrow functions chaining కి ideal.</p>
      </section>

      {/* 12. setTimeout / setInterval */}
      <section>
        <h2>1️⃣2️⃣ Arrow in setTimeout / setInterval</h2>
        <pre>{`setTimeout(() => console.log("Hello after 2s"), 2000);`}</pre>
        <p>🔥 Telugu: Lexical <code>this</code> issues avoid అవుతాయి arrow function వాడితే.</p>
      </section>

      {/* 13. Array Methods */}
      <section>
        <h2>1️⃣3️⃣ Arrow in Array Methods</h2>
        <pre>{`const nums = [1, 2, 3];
const squares = nums.map(n => n * n);`}</pre>
        <p>✅ Telugu: map, filter, reduce లాంటి array methods లో arrow functions clean & efficient.</p>
      </section>

      {/* 14. Summary Table */}
      <section>
        <h2>✅ Summary Table</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Feature</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Arrow Function</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Regular Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>this binding</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Lexical</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Dynamic</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>arguments object</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>❌</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>✅</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Constructor</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>❌</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>✅</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>React Events</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>✅ Preferred</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>⚠️ Inline Not Recommended</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Use in Objects</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>❌ Avoid</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>✅ Works</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ArrowFunctionsGuide;
