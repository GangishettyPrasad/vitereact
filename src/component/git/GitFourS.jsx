import React from "react";

const GitFourS = () => {
  const sectionStyle = {
    border: "2px solid #ddd",
    borderLeft: "10px solid",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "monospace"
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px"
  };

  const commandStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    color: "#333"
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "26px", color: "#333", marginBottom: "30px" }}>
        🚀 Git Commands – 4 Real-World Scenarios
      </h2>

      {/* 1. Clone project */}
      <div style={{ ...sectionStyle, borderLeftColor: "#007bff" }}>
        <div style={{ ...titleStyle, color: "#007bff" }}>1️⃣ Clone Existing Project</div>
        <pre style={commandStyle}>
{`git clone https://github.com/username/repository-name.git
cd repository-name
npm install
npm start

// After changes
git checkout -b feature-branch
git add .
git commit -m "Your message"
git push -u origin feature-branch`}
        </pre>
      </div>

      {/* 2. New local project */}
      <div style={{ ...sectionStyle, borderLeftColor: "#28a745" }}>
        <div style={{ ...titleStyle, color: "#28a745" }}>2️⃣ Start New Project Locally</div>
        <pre style={commandStyle}>
{`npx create-react-app my-app
cd my-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/my-app.git
git push -u origin main`}
        </pre>
      </div>

      {/* 3. Already have local project */}
      <div style={{ ...sectionStyle, borderLeftColor: "#ffc107" }}>
        <div style={{ ...titleStyle, color: "#ffc107" }}>3️⃣ Existing Local Project</div>
        <pre style={commandStyle}>
{`cd your-project-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/project-name.git
git push -u origin main`}
        </pre>
      </div>

      {/* 4. Created repo first on GitHub */}
      <div style={{ ...sectionStyle, borderLeftColor: "#dc3545" }}>
        <div style={{ ...titleStyle, color: "#dc3545" }}>4️⃣ Created Repo on GitHub First</div>
        <p style={{ fontWeight: "bold", color: "#dc3545" }}>Option A – With README.md:</p>
        <pre style={commandStyle}>
{`echo "# my-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yourusername/my-repo.git
git push -u origin main`}
        </pre>

        <p style={{ fontWeight: "bold", color: "#dc3545", marginTop: "10px" }}>Option B – Full local project:</p>
        <pre style={commandStyle}>
{`git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/my-repo.git
git push -u origin main`}
        </pre>
      </div>
    </div>
  );
};

export default GitFourS;
