import React from 'react';
import GitFourS from './GitFourS';

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

      <>
      <div style={{
  background: "#f0f4f8",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "1.5rem",
  fontFamily: "monospace",
  lineHeight: "1.8",
  whiteSpace: "pre-wrap",
  color: "#333"
}}>
  🚀 <strong>Git Stash Step-by-Step Guide (with Explanation)</strong>

  <br /><br />
  1️⃣ <strong>Save current changes (safe backup)</strong>:
  <br />
  <code>git stash push -m "my changes before switching"</code>
  <br />
  👉 Temporarily stores your local changes (staged + unstaged) and cleans your working directory, so you can switch branches or pull code safely.
  
  <br /><br />
  2️⃣ <strong>View your stash list</strong>:
  <br />
  <code>git stash list</code>
  <br />
  👉 Shows all saved stashes with their index and message. Example: <code>stash@&#123;0&#125;: On main: my changes before switching</code>
  
  <br /><br />
  3️⃣ <strong>Apply the latest stash without removing it</strong>:
  <br />
  <code>git stash apply</code>
  <br />
  👉 Brings back your stashed changes into your working directory. Keeps the stash saved in case you want to apply it again.
  
  <br /><br />
  4️⃣ <strong>Apply and remove stash in one go</strong>:
  <br />
  <code>git stash pop</code>
  <br />
  👉 Same as `apply`, but also deletes the stash entry after applying it. Use this when you're done with that stash.
  
  <br /><br />
  5️⃣ <strong>Remove specific stash (optional)</strong>:
  <br />
  <code>git stash drop stash@&#123;0&#125;</code>
  <br />
  👉 Manually deletes a specific stash if you no longer need it.
  
  <br /><br />
  6️⃣ <strong>Remove all stashes</strong>:
  <br />
  <code>git stash clear</code>
  <br />
  👉 Permanently deletes all stashed entries. Use with caution.
  
  <br /><br />
  🔁 <strong>When to use stash?</strong>
  <br />
  Use stash when you want to:
  <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
    <li>Switch branches without committing your current work</li>
    <li>Pull latest code without merge errors</li>
    <li>Temporarily back up your WIP changes</li>
  </ul>
</div>

      </>
      
      <>
      
      <GitFourS/>
      </>

      <>
      
    
      
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600">🔁 Clone → Run → Edit → Push Guide</h2>

      {/* Step 1: Clone */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 1: Clone the Repository</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`git clone https://github.com/username/repository-name.git`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">⏬ This will download the project to your local system.</p>
      </div>

      {/* Step 2: Go to Project Folder */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 2: Navigate to Project Folder</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`cd repository-name`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">📁 Move into the downloaded project directory.</p>
      </div>

      {/* Step 3: Install Dependencies */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 3: Install Dependencies</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`npm install`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">📦 Installs packages listed in <code>package.json</code>.</p>
      </div>

      {/* Step 4: Run the Project */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 4: Run the Project</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`npm start`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">🚀 Opens the React app on <code>http://localhost:3000</code>.</p>
      </div>

      {/* Step 5: Make Changes */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 5: Make Changes</h3>
        <p className="text-sm text-gray-600">🛠️ Open your project in VS Code or any editor and update the code.</p>
      </div>

      {/* Step 6: Push Changes to GitHub */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">🔹 Step 6: Push Code to GitHub</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`git add .
git commit -m "Your change message"
git push origin main`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">☁️ Push your updated code to GitHub.</p>
      </div>
    </div>



    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-green-700">🌿 Git: Create & Push New Branch</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">🔸 Step 1: Create a New Branch</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm">
{`git checkout -b feature-branch-name`}
        </pre>
        <p className="text-gray-600 text-sm mt-1">🛠️ You are now working on a new branch.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">🔸 Step 2: Make Code Changes</h3>
        <p className="text-gray-600 text-sm">Edit your code in your editor like VS Code.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">🔸 Step 3: Add & Commit</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm">
{`git add .
git commit -m "Describe your changes"`}
        </pre>
        <p className="text-gray-600 text-sm">📦 This saves your changes in Git.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">🔸 Step 4: Push Branch to GitHub</h3>
        <pre className="bg-gray-100 p-3 rounded-md text-sm">
{`git push -u origin feature-branch-name`}
        </pre>
        <p className="text-gray-600 text-sm">☁️ Your branch is now on GitHub!</p>
      </div>
    </div>
      </>
    </div>
  );
};

export default GitGuide;
