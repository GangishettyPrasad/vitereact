import React from 'react';

const PromiseChainingGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#2e86de' }}>🔗 JavaScript Promises – Chaining & Error Handling (Telugu Guide)</h2>

      <h3 style={{ color: '#d35400' }}>👉 Promise అంటే ఏమిటి?</h3>
      <p>
        Promise అనేది asynchronous operation complete అయ్యే దాకా wait చేయడానికి JavaScript లోని special object.<br />
        ఉదాహరణకి: API call, Timer, File read/write.
      </p>

      <h3 style={{ color: '#16a085' }}>📌 Basic Syntax:</h3>
      <pre style={{ background: '#ecf0f1', padding: '1rem' }}>
        <code>
          {`const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve("Success!");
  } else {
    reject("Error occurred!");
  }
});`}
        </code>
      </pre>

      <h3 style={{ color: '#8e44ad' }}>🔄 Chaining Promises:</h3>
      <pre style={{ background: '#f5eef8', padding: '1rem' }}>
        <code>
          {`fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => displayPosts(posts))
  .catch(error => console.error("Error:", error))
  .finally(() => console.log("Done ✅"));`}
        </code>
      </pre>
      <p>
        ప్రతి `.then()` ముందు result ని తీసుకొని next step కు పంపుతుంది.<br />
        `.catch()` → Error handle చేస్తుంది. <br />
        `.finally()` → Always execute అవుతుంది, success/gailure కీ సంబంధం లేకుండా.
      </p>

      <h3 style={{ color: '#c0392b' }}>🔥 Real-Time Example:</h3>
      <pre style={{ background: '#fdebd0', padding: '1rem' }}>
        <code>
          {`const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username === 'admin') resolve("Login Success");
    else reject("Invalid User");
  });
};

login('admin', '1234')
  .then(res => console.log(res))
  .catch(err => console.log(err));`}
        </code>
      </pre>

      <h3 style={{ color: '#117864' }}>⚛️ React లో Promise Chaining Example:</h3>
      <pre style={{ background: '#eafaf1', padding: '1rem' }}>
        <code>
          {`useEffect(() => {
  fetch('https://api.example.com/user')
    .then(res => res.json())
    .then(data => {
      console.log("User data:", data);
      return fetch(\`https://api.example.com/posts?user=\${data.id}\`);
    })
    .then(res => res.json())
    .then(posts => console.log("Posts:", posts))
    .catch(err => console.error("API Error", err));
}, []);`}
        </code>
      </pre>

      <h3 style={{ color: '#2c3e50' }}>✅ Telugu Summary (Recap):</h3>
      <ul>
        <li><strong>Promises</strong> asynchronous operations handle చేయటానికి ఉపయోగపడతాయి.</li>
        <li><strong>.then()</strong> → Success case లో chaining కోసం.</li>
        <li><strong>.catch()</strong> → Errors handle చేయటానికి.</li>
        <li><strong>.finally()</strong> → Last step, always run అవుతుంది.</li>
        <li><strong>React లో</strong> → API calls, form submits, button clicks తర్వాత logic chain చేయడానికి వాడతాం.</li>
      </ul>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', color: '#34495e' }}>
        ✅ మళ్ళీ ఏ concept deep-dive కావాలా? లేక Async/Await version కావాలా? Let’s go to next step! 🚀
      </p>
    </div>
  );
};

export default PromiseChainingGuide;
