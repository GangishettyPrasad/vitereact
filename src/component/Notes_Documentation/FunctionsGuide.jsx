import React from 'react';

const FunctionsGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f4f8fb' }}>
      <h2 style={{ color: '#0d47a1' }}>🔧 JavaScript & React లో Functions – Complete Guide with </h2>

      <p><strong>Functions</strong> అనేవి JavaScript లో reusable code blocks. React లో ఇవి components, events, rendering & API calls లో key role play చేస్తాయి.</p>

      <h3 style={{ color: '#1565c0' }}>1️⃣ Function Declaration</h3>
      <pre><code>{`function greet(name) {
  return 'Hi, ' + name;
}
console.log(greet('Prasad')); // Hi, Prasad`}</code></pre>
      <p><strong>Telugu:</strong> ఇది classic function syntax. Normal usage కి చాలా వాడతాం.</p>

      <h3 style={{ color: '#1565c0' }}>2️⃣ Function Expression</h3>
      <pre><code>{`const greet = function(name) {
  return 'Hi, ' + name;
};`}</code></pre>
      <p>Anonymous function ని variable లో assign చేయడం – scopes లో useful.</p>

      <h3 style={{ color: '#1565c0' }}>3️⃣ Arrow Functions</h3>
      <pre><code>{`const greet = (name) => 'Hi, ' + name;`}</code></pre>
      <p><strong>React లో:</strong> Event handlers & map/filter లో చాలా ఉపయోగిస్తారు.</p>

      <h3 style={{ color: '#1565c0' }}>4️⃣ Default Parameters</h3>
      <pre><code>{`function greet(name = 'Guest') {
  return 'Hi, ' + name;
}`}</code></pre>
      <p>Parameter pass చేయకపోతే కూడా function properly work చేస్తుంది.</p>

      <h3 style={{ color: '#1565c0' }}>5️⃣ Rest Parameters (...args)</h3>
      <pre><code>{`function sum(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}`}</code></pre>
      <p>Multiple values ను single parameter గా handle చేయడానికిది ఉపయోగిస్తారు.</p>

      <h3 style={{ color: '#1565c0' }}>6️⃣ Callback Functions</h3>
      <pre><code>{`const numbers = [1, 2, 3];
numbers.forEach((n) => console.log(n * 2));`}</code></pre>
      <p>Function ను argument గా pass చేయడమే callback – map, filter, forEach వంటివి వాడతాం.</p>

      <h3 style={{ color: '#1565c0' }}>7️⃣ IIFE – Immediately Invoked Function</h3>
      <pre><code>{`(function() {
  console.log('Executed!');
})();`}</code></pre>
      <p>Script load అయ్యగానే execute కావాల్సిన logic లో ఉపయోగిస్తారు.</p>

      <h3 style={{ color: '#1565c0' }}>8️⃣ Functions inside Objects (Methods)</h3>
      <pre><code>{`const user = {
  name: 'Prasad',
  greet() {
    return 'Hi ' + this.name;
  }
};`}</code></pre>
      <p><strong>React లో:</strong> Object-based logic maintain చేయడానికిది key.</p>

      <h3 style={{ color: '#1565c0' }}>9️⃣ Functions Returning Functions</h3>
      <pre><code>{`function outer(a) {
  return function inner(b) {
    return a + b;
  };
}
const add5 = outer(5);
console.log(add5(3)); // 8`}</code></pre>
      <p>React custom hooks లో చాలా ఇలానే structure ఉంటుంది.</p>

      <h3 style={{ color: '#1565c0' }}>🔟 Real-Time Usage in React</h3>
      <pre><code>{`const handleClick = () => {
  console.log('Button clicked!');
};

return <button onClick={handleClick}>Click Me</button>;`}</code></pre>
      <p>React లో every event/function interaction లో inline లేదా declared arrow functions వాడతాం.</p>

      <h3 style={{ color: '#2e7d32' }}>✅ Best Practices</h3>
      <ul>
        <li>Reusable logic ను separate function గా ఉంచండి</li>
        <li>Functional components లో arrow functions వాడడం మేలు</li>
        <li>Avoid unnecessary re-renders – useMemo/useCallback with functions</li>
      </ul>

      <h3 style={{ color: '#2e7d32' }}>🚀 Use Cases in Large Projects</h3>
      <ul>
        <li>Event handling (onClick, onChange)</li>
        <li>Form submission & validation</li>
        <li>API integration with async functions</li>
        <li>Logic extraction using custom hooks</li>
        <li>Reusable utility/helper functions (date format, calculations)</li>
      </ul>
    </div>
  );
};

export default FunctionsGuide;
