import React from 'react';

const GitGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fafafa' }}>
      <h2 style={{ color: '#005aa7' }}>🌟 Git & GitHub Full Workflow Guide with Telugu Explanation</h2>

      <h3 style={{ color: '#0d7c8c' }}>1️⃣ GitHub Repository Creation</h3>
      <ul>
        <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a> లోకి వెళ్లి → <strong>+</strong> → <strong>New Repository</strong></li>
        <li><code>vitereact</code> అనే పేరు పెట్టండి → description ఇవ్వండి → Create Click చేయండి</li>
      </ul>
      <pre>GitHub లో కొత్త repository create చేయాలంటే పై స్టెప్స్ follow చేయాలి.</pre>

      <h3 style={{ color: '#0d7c8c' }}>2️⃣ Clone Repository</h3>
      <pre><code>git clone https://github.com/username/repo-name.git</code></pre>
      <pre>GitHub లో ఉన్న project ని మన system లోకి తీసుకోవడానికి ఇది వాడతాం.</pre>

      <h3 style={{ color: '#0d7c8c' }}>3️⃣ Create New Branch</h3>
      <pre><code>git checkout -b branch_name</code></pre>
      <pre>కొత్త feature కోసం కొత్త branch తీసుకోవాలి.</pre>

      <h3 style={{ color: '#0d7c8c' }}>4️⃣ Daily Work Steps</h3>
      <ul>
        <li><code>git status</code></li>
        <li><code>git add .</code></li>
        <li><code>git commit -m "message"</code></li>
        <li><code>git push --set-upstream origin branch_name</code> (first time only)</li>
        <li>తరువాత <code>git push</code> మాత్రమే చాలుతుంది</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>5️⃣ Merge into Main</h3>
      <ul>
        <li>GitHub → Compare & Pull Request</li>
        <li>Create Pull Request → Merge Pull Request</li>
      </ul>
      <pre>మన changes main లోకి రావాలంటే Pull Request create చేయాలి.</pre>

      <h3 style={{ color: '#0d7c8c' }}>6️⃣ Merge Conflicts</h3>
      <strong>In VS Code:</strong>
      <pre>
        <code>{`<<<<<<< HEAD
మీ code
=======
main code
>>>>>>> main`}</code>
      </pre>
      <ul>
        <li>మీకు కావలసిన code merge చేయండి</li>
        <li><code>git add .</code> → <code>git commit -m "resolved conflict"</code> → <code>git push</code></li>
      </ul>

      <strong>In GitHub:</strong>
      <ul>
        <li>Resolve Conflicts → Mark as Resolved → Commit</li>
      </ul>

      <h3 style={{ color: '#0d7c8c' }}>7️⃣ Track Remote Branches</h3>
      <pre><code>git branch -r</code></pre>

      <h3 style={{ color: '#0d7c8c' }}>8️⃣ Switch Branch</h3>
      <pre><code>git checkout branch_name</code></pre>

      <h3 style={{ color: '#0d7c8c' }}>✅ Final Tips</h3>
      <ul>
        <li><code>main</code> always clean ఉండాలి</li>
        <li>ప్రతి feature కోసం కొత్త branch తీసుకోండి</li>
        <li>Work మొదలుపెట్టే ముందు → <code>git pull origin main</code></li>
      </ul>
    </div>
  );
};

export default GitGuide;
