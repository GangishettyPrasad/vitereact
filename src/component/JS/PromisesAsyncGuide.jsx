import React from 'react';

const PromisesAsyncGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fdfdfd' }}>
      <h2 style={{ color: '#005aa7' }}>🔥 JavaScript Promises & Async/Await – Complete Guide with Telugu Explanation</h2>

      <h3 style={{ color: '#0d7c8c' }}>1️⃣ What is a Promise?</h3>
      <p>JavaScript లో Promise అనేది asynchronous operation result represent చేయడానికి వాడతారు. ఇది 3 states లో ఉంటుంది:</p>
      <ul>
        <li><strong>Pending</strong> – ఇంకా complete కాలేదు</li>
        <li><strong>Fulfilled</strong> – success అయ్యింది</li>
        <li><strong>Rejected</strong> – error వచ్చింది</li>
      </ul>
      <pre>
        <code>{`const promise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("✅ Done");
  } else {
    reject("❌ Failed");
  }
});`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>2️⃣ .then() మరియు .catch()</h3>
      <pre>
        <code>{`promise
  .then((res) => console.log(res))
  .catch((err) => console.log(err));`}</code>
      </pre>
      <p><strong>.then()</strong> → success result, <strong>.catch()</strong> → error handle చేయడానికి ఉపయోగిస్తారు.</p>

      <h3 style={{ color: '#0d7c8c' }}>3️⃣ Async/Await – Cleaner Way</h3>
      <pre>
        <code>{`async function getData() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
getData();`}</code>
      </pre>
      <p><strong>await</strong> keyword promise complete అయ్యే వరకు wait చేస్తుంది.</p>

      <h3 style={{ color: '#0d7c8c' }}>4️⃣ Fetch API Example</h3>
      <pre>
        <code>{`fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Fetch with Async/Await</h3>
      <pre>
        <code>{`const getPost = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>6️⃣ Axios Example in React</h3>
      <pre>
        <code>{`import axios from 'axios';

const getPost = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>7️⃣ Promise.all & Promise.race</h3>
      <pre>
        <code>{`const p1 = Promise.resolve("First");
const p2 = Promise.resolve("Second");

Promise.all([p1, p2]).then(values => console.log(values));
// ["First", "Second"]

Promise.race([p1, p2]).then(value => console.log(value));
// "First"`}</code>
      </pre>

      <h3 style={{ color: '#0d7c8c' }}>📌 Real-Time Use Cases</h3>
      <ul>
        <li>Form submit చేసినప్పుడు API call చేయడం</li>
        <li>Multiple APIs call చేసి UI లో చూపించడం</li>
        <li>Loading indicators manage చేయడం</li>
        <li>Network errors handle చేయడం</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>✅ Final Tips</h3>
      <ul>
        <li><strong>Async/Await</strong> cleaner & readable</li>
        <li>Always use <code>try/catch</code> for error handling</li>
        <li>React లో mostly Axios + Async/Await use చేయడం మంచిది</li>
      </ul>
    </div>
  );
};

export default PromisesAsyncGuide;
