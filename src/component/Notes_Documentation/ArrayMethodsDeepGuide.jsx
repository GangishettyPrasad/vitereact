import React from 'react';

const ArrayMethodsDeepGuide = () => {
  // ===== REDUCE Examples =====
  const numbers = [10, 20, 30, 40];
  const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);

  const users = [
    { name: 'Ravi', gender: 'male' },
    { name: 'Sneha', gender: 'female' },
    { name: 'Ajay', gender: 'male' },
  ];

  const genderCount = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  // ===== SOME Example =====
  const scores = [40, 55, 70];
  const hasHighScore = scores.some(score => score > 60);

  // ===== EVERY Example =====
  const allPassed = scores.every(score => score >= 35);

  // ===== INCLUDES Example =====
  const fruits = ['apple', 'banana', 'mango'];
  const hasBanana = fruits.includes('banana');
  const hasPineapple = fruits.includes('pineapple');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📘 Array Methods In-depth Guide (React + JSX)</h1>

      {/* REDUCE */}
      <section>
        <h2>🔁 1. reduce()</h2>
        <p>
          <strong>Use:</strong> Array ని ఒక single value (sum/object/anything) గా
          convert చేయటానికి ఉపయోగిస్తారు.
        </p>
        <p>
          <strong>Example:</strong> [10, 20, 30, 40] → total sum =
          <strong> {totalSum}</strong>
        </p>

        <h4>👥 Reduce for Counting (By Gender)</h4>
        <pre>{JSON.stringify(genderCount, null, 2)}</pre>
      </section>

      {/* SOME */}
      <section>
        <h2>✅ 2. some()</h2>
        <p>
          <strong>Use:</strong> Array లో కనీసం ఒక్క value condition satisfy చేస్తే{' '}
          <code>true</code> return చేస్తుంది.
        </p>
        <p>Example Scores: [40, 55, 70]</p>
        <p>
          <strong>Someone scored above 60?</strong>{' '}
          <span style={{ color: 'green' }}>{hasHighScore ? 'Yes ✅' : 'No ❌'}</span>
        </p>
      </section>

      {/* EVERY */}
      <section>
        <h2>🧪 3. every()</h2>
        <p>
          <strong>Use:</strong> Array లోని ప్రతీ item condition satisfy చేయాలి →{' '}
          <code>true</code> return అవుతుంది.
        </p>
        <p>
          <strong>Everyone passed (= 35)?</strong>{' '}
          <span style={{ color: 'green' }}>{allPassed ? 'Yes ✅' : 'No ❌'}</span>
        </p>
      </section>

      {/* INCLUDES */}
      <section>
        <h2>🍍 4. includes()</h2>
        <p>
          <strong>Use:</strong> ఒక value array లో ఉందా అనే విషయం true/false return
          చేస్తుంది.
        </p>
        <p>Fruits: ['apple', 'banana', 'mango']</p>
        <p>
          ✅ Includes 'banana'?{' '}
          <span style={{ color: 'green' }}>{hasBanana ? 'Yes' : 'No'}</span>
        </p>
        <p>
          ❌ Includes 'pineapple'?{' '}
          <span style={{ color: 'red' }}>{hasPineapple ? 'Yes' : 'No'}</span>
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section>
        <h2>📊 Comparison Table</h2>
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f0f0f0' }}>
            <tr>
              <th>Method</th>
              <th>Use Case</th>
              <th>Telugu Explanation</th>
              <th>Return Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>reduce()</strong></td>
              <td>Array → Single value (sum/object)</td>
              <td>array ని ఒక value గా reduce చేయటం</td>
              <td>Number/Object</td>
            </tr>
            <tr>
              <td><strong>some()</strong></td>
              <td>At least one condition true</td>
              <td>ఒక్క item అయినా condition satisfy చేస్తే</td>
              <td>Boolean</td>
            </tr>
            <tr>
              <td><strong>every()</strong></td>
              <td>All items must satisfy condition</td>
              <td>ప్రతి item condition satisfy చేయాలి</td>
              <td>Boolean</td>
            </tr>
            <tr>
              <td><strong>includes()</strong></td>
              <td>Check if value exists</td>
              <td>ఒక value array లో ఉందా?</td>
              <td>Boolean</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ArrayMethodsDeepGuide;
