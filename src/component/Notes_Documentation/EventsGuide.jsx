import React from 'react';

const EventsGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f9f9f9' }}>
      <h2 style={{ color: '#005aa7' }}>🎯 Events in JavaScript & React – Real-Time Guide with </h2>

      <p>Events అనేవి user interactions (click, input, keypress, mouseover, etc) handle చేయడానికి ఉపయోగిస్తారు. React లో state updates, validations, API calls & UI interactivity కోసం వీటి importance చాలా ఎక్కువ!</p>

      <h3 style={{ color: '#0d7c8c' }}>1️⃣ JavaScript Click Event</h3>
      <pre>
        <code>{`<button onclick="alert('Clicked!')">Click Me</button>`}</code>
      </pre>
      <p><strong>Explanation:</strong> HTML + JavaScript లో inline event use చేసాం. Click చేస్తే alert వస్తుంది.</p>

      <h3 style={{ color: '#0d7c8c' }}>2️⃣ JavaScript addEventListener</h3>
      <pre>
        <code>{`document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked");
});`}</code>
      </pre>
      <p><strong>Explanation:</strong> Button click అయ్యే event handle చేసాం using JS.</p>

      <h3 style={{ color: '#0d7c8c' }}>3️⃣ React Click Event</h3>
      <pre>
        <code>{`<button onClick={() => alert('React Button Clicked!')}>Click</button>`}</code>
      </pre>
      <p><strong>React లో:</strong> <code>onClick</code> camelCase లో use చేస్తాం, inline function works perfectly.</p>

      <h3 style={{ color: '#0d7c8c' }}>4️⃣ React Input Change Event</h3>
      <pre>
        <code>{`<input type="text" onChange={(e) => setText(e.target.value)} />`}</code>
      </pre>
      <p><strong>Explanation:</strong> Input లో type చేసిన ప్రతి change ని track చేసాం using <code>onChange</code>.</p>

      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Keyboard Event in React</h3>
      <pre>
        <code>{`<input type="text" onKeyDown={(e) => console.log(e.key)} />`}</code>
      </pre>
      <p><strong>Explanation:</strong> ఏ key press అవుతుందో <code>console.log</code> చేస్తాం.</p>

      <h3 style={{ color: '#0d7c8c' }}>6️⃣ Form Submit Event</h3>
      <pre>
        <code>{`<form onSubmit={(e) => { e.preventDefault(); console.log("Submitted!"); }}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>`}</code>
      </pre>
      <p><strong>Explanation:</strong> React లో <code>onSubmit</code> తో form submit handle చేస్తాం, default refresh ని prevent చేస్తాం.</p>

      <h3 style={{ color: '#0d7c8c' }}>7️⃣ Mouse Over & Mouse Out</h3>
      <pre>
        <code>{`<div onMouseOver={() => console.log("Hovered")} onMouseOut={() => console.log("Mouse Left")}>
  Hover Here
</div>`}</code>
      </pre>
      <p><strong>Explanation:</strong> UI interactions కోసం excellent!</p>

      <h3 style={{ color: '#0d7c8c' }}>8️⃣ Button Double Click</h3>
      <pre>
        <code>{`<button onDoubleClick={() => alert("Double Clicked")}>Double Click</button>`}</code>
      </pre>
      <p><strong>Explanation:</strong> React లో double click events కూడా handle చేయవచ్చు.</p>

      <h3 style={{ color: '#0d7c8c' }}>9️⃣ Event Delegation in JavaScript</h3>
      <pre>
        <code>{`document.getElementById("parent").addEventListener("click", (e) => {
  if(e.target.tagName === "BUTTON") console.log("Button clicked:", e.target);
});`}</code>
      </pre>
      <p><strong>Explanation:</strong> Parent level నుండి child clicks handle చేయడం delegation అంటారు. Performance friendly!</p>

      <h3 style={{ color: '#0d7c8c' }}>🔟 Real-Time Use: Dynamic Button Click</h3>
      <pre>
        <code>{`{items.map((item, index) => (
  <button key={index} onClick={() => handleClick(item.id)}>
    {item.name}
  </button>
))}`}</code>
      </pre>
      <p><strong>Explanation:</strong> Lists లోని dynamic data కోసం <code>onClick</code> లో function bind చేయడం చాలా common.</p>

      <h3 style={{ color: '#0d7c8c' }}>✅ Best Practices</h3>
      <ul>
        <li>Always use <code>e.preventDefault()</code> for form submissions</li>
        <li>Prefer named functions for performance (instead of inline in big lists)</li>
        <li>Use event delegation for large dynamic lists (in JS)</li>
        <li>Use memoization (like useCallback) to prevent re-renders in React</li>
      </ul>
    </div>
  );
};

export default EventsGuide;
