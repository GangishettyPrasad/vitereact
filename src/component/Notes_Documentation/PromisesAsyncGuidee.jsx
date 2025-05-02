import React from 'react';

const PromisesAsyncGuidee = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#fef9e7', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#d35400' }}>⚡ Promises, Chaining & Error Handling </h2>

      <h3 style={{ color: '#6e2c00' }}>📌 Promise అంటే ఏంటి?</h3>
      <p>
        Promise అనేది asynchronous operations (like API calls) complete అవ్వబోతున్నాయి అనే ఒక <strong>guarantee</strong>.
        <br />అంటే future లో ఓ value వస్తుందని చెప్పే object. ✅/❌
      </p>

      <h3 style={{ color: '#2874a6' }}>✅ Promise Syntax:</h3>
      <pre style={{ background: '#eaf2f8', padding: '1rem' }}>
        <code>{`
const promise = new Promise((resolve, reject) => {
  // async work
  if (success) resolve(data);
  else reject(error);
});
        `}</code>
      </pre>

      <h3 style={{ color: '#1abc9c' }}>👉 Promise Use Case (Simulated API):</h3>
      <pre style={{ background: '#e8f8f5', padding: '1rem' }}>
        <code>{`
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
  });
}

fetchData().then(data => console.log(data)); // "Data loaded!"
        `}</code>
      </pre>

      <h3 style={{ color: '#af601a' }}>🔗 Chaining Promises (.then)</h3>
      <pre style={{ background: '#fdebd0', padding: '1rem' }}>
        <code>{`
fetchData()
  .then(data => {
    console.log("Step 1", data);
    return "Next step";
  })
  .then(next => {
    console.log("Step 2", next);
  });
        `}</code>
      </pre>

      <h3 style={{ color: '#c0392b' }}>❌ Error Handling with .catch()</h3>
      <pre style={{ background: '#fadbd8', padding: '1rem' }}>
        <code>{`
new Promise((resolve, reject) => {
  reject("Something went wrong");
})
.catch(error => {
  console.error("Caught:", error);
});
        `}</code>
      </pre>

      <h3 style={{ color: '#1f618d' }}>🧼 .finally() for Cleanup</h3>
      <pre style={{ background: '#d6eaf8', padding: '1rem' }}>
        <code>{`
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log("Always runs"));
        `}</code>
      </pre>

      <h3 style={{ color: '#8e44ad' }}>⚛️ React లో Promises ఎలా Handle చేయాలి?</h3>
      <pre style={{ background: '#f5eef8', padding: '1rem' }}>
        <code>{`
useEffect(() => {
  fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => setState(data))
    .catch(err => console.error(err));
}, []);
        `}</code>
      </pre>

      <h3 style={{ color: '#196f3d' }}>📌 Summary (Recap in Telugu):</h3>
      <ul>
        <li><strong>Promise</strong> ⇒ future లో resolve లేదా reject అయ్యే object.</li>
        <li><code>.then()</code> ⇒ success chaining.</li>
        <li><code>.catch()</code> ⇒ error handling.</li>
        <li><code>.finally()</code> ⇒ cleanup after everything.</li>
        <li>React లో useEffect లో Promises handle చేయాలి.</li>
      </ul>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', color: '#6c3483' }}>
        ✅ నెక్స్ట్ స్టెప్: Shall we go to <strong>Async / Await</strong> next for cleaner Promise code?<br />
        👉 Or you want summary component / revisit something?
      </p>
    </div>
  );
};

export default PromisesAsyncGuidee;
