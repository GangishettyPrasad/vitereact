import React from 'react';

const ExecutionContextGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#005aa7' }}>🔥 JavaScript Execution Context & Call Stack – In-Depth Guide (Telugu)</h2>

      {/* 1. Execution Context */}
      <h3 style={{ color: '#0d7c8c' }}>1️⃣ Execution Context అంటే ఏంటి?</h3>
      <p>
        Execution Context అనేది JavaScript code ఎక్కడ మరియు ఎలా execute అవుతుందో define చేస్తుంది.
        ఇది రెండు రకాలుగా ఉంటుంది:
      </p>
      <ul>
        <li><strong>Global Execution Context (GEC)</strong> – Entire script execution కోసం.</li>
        <li><strong>Function Execution Context (FEC)</strong> – Function call అయినప్పుడు create అవుతుంది.</li>
      </ul>

      <pre style={{ background: '#eee', padding: '1rem' }}>
        <code>{`function greet() {
  var msg = "Hello!";
  console.log(msg);
}
greet();`}</code>
      </pre>
      <p>ఒక్కో function call కి కొత్త Execution Context వస్తుంది.</p>

      {/* 2. Call Stack */}
      <h3 style={{ color: '#0d7c8c' }}>2️⃣ Call Stack ఎలా Work చేస్తుంది?</h3>
      <p>
        JavaScript uses a <strong>Call Stack</strong> to manage execution contexts.
        Functions call అవుతున్న క్రమంలో stack లో push చేస్తుంది. Complete అయితే pop చేస్తుంది.
      </p>

      <pre style={{ background: '#eee', padding: '1rem' }}>
        <code>{`function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.log("Inside C");
}
a();`}</code>
      </pre>
      <p>Call Stack:</p>
      <ul>
        <li>Global → a() → b() → c()</li>
        <li>Then reverse లో pop అవుతాయి.</li>
      </ul>

      {/* 3. Hoisting */}
      <h3 style={{ color: '#0d7c8c' }}>3️⃣ Hoisting అంటే ఏంటి?</h3>
      <p>
        JavaScript లో variables & functions <strong>top కు move అవుతాయి</strong> compilation time లో. ఇది Hoisting.
      </p>
      <pre style={{ background: '#eee', padding: '1rem' }}>
        <code>{`console.log(a); // undefined
var a = 10;

hoisted();
function hoisted() {
  console.log("Function Hoisted!");
}`}</code>
      </pre>
      <p><strong>var</strong> → undefined గా hoist అవుతుంది.  
        <strong>let/const</strong> → Temporal Dead Zone లో ఉంటాయి (Reference Error వస్తుంది).
      </p>

      {/* 4. Synchronous vs Asynchronous */}
      <h3 style={{ color: '#0d7c8c' }}>4️⃣ Synchronous vs Asynchronous Execution</h3>
      <p>
        JavaScript is <strong>synchronous & single-threaded</strong>. కానీ async operations తో non-blocking behavior వస్తుంది.
      </p>

      <pre style={{ background: '#eee', padding: '1rem' }}>
        <code>{`console.log("Start");
setTimeout(() => {
  console.log("Async Task");
}, 1000);
console.log("End");`}</code>
      </pre>
      <p><strong>Output:</strong> Start → End → Async Task</p>

      {/* 5. Real-Time Use Case */}
      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Real-Time Use Case</h3>
      <p>
        Execution Context, Call Stack, Hoisting, Async knowledge వల్ల మీకు:
      </p>
      <ul>
        <li>Bug-free functions handle చేయడం</li>
        <li>Async calls కి proper sequencing plan చేయడం</li>
        <li>React useEffect లో dependencies understand చేయడం</li>
      </ul>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', color: '#005aa7' }}>
        🔁 Next Step: <strong>⚛️ React State & Complex Data Updates</strong> JSX Guide కొరకు "ok" అనండి!
      </p>
    </div>
  );
};

export default ExecutionContextGuide;
