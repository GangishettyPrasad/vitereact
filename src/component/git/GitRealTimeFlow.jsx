import React from "react";

const GitRealTimeAdvanced = () => {
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

  const textStyle = {
    fontSize: "14px",
    marginBottom: "10px",
    lineHeight: "1.6"
  };

  const commandStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    whiteSpace: "pre-wrap",
    fontSize: "14px"
  };

  return (
    <div style={{ maxWidth: "950px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        🚀 Git Real-Time Workflow (HRMS Project)
      </h2>

      {/* 1. Understanding origin */}
      <div style={{ ...sectionStyle, borderLeftColor: "#007bff" }}>
        <div style={{ ...titleStyle, color: "#007bff" }}>
          1️⃣ What is origin?
        </div>

        <pre style={commandStyle}>
{`origin = remote repository (server)

origin/hrms_prod
origin/hrmsReact_dev`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> "origin" means remote repo (GitLab/GitHub server).  
          <br />
          <b>Telugu:</b> "origin" ante remote server (GitLab/GitHub).
        </p>
      </div>

      {/* 2. Daily start */}
      <div style={{ ...sectionStyle, borderLeftColor: "#28a745" }}>
        <div style={{ ...titleStyle, color: "#28a745" }}>
          2️⃣ Daily Start (Fetch Latest)
        </div>

        <pre style={commandStyle}>
{`git checkout hrmsReact_dev
git fetch origin
git merge origin/hrms_prod`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> QA branch gets latest PROD updates.  
          <br />
          <b>Telugu:</b> QA branch ki PROD latest code vastundi.
        </p>
      </div>

      {/* 3. Feature from prod */}
      <div style={{ ...sectionStyle, borderLeftColor: "#ffc107" }}>
        <div style={{ ...titleStyle, color: "#ffc107" }}>
          3️⃣ Create Feature Branch from PROD
        </div>

        <pre style={commandStyle}>
{`git checkout hrms_prod
git pull origin hrms_prod
git checkout -b prasad_movetoqa`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> Always create feature branch from production.  
          <br />
          <b>Telugu:</b> Feature branch ni production nundi create cheyyali.
        </p>
      </div>

      {/* 4. Merge QA */}
      <div style={{ ...sectionStyle, borderLeftColor: "#dc3545" }}>
        <div style={{ ...titleStyle, color: "#dc3545" }}>
          4️⃣ Move Feature → QA
        </div>

        <pre style={commandStyle}>
{`git checkout hrmsReact_dev
git fetch origin
git merge origin/prasad_movetoqa
git push`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> Move feature branch into QA for testing.  
          <br />
          <b>Telugu:</b> QA lo testing kosam feature branch merge chestaru.
        </p>
      </div>

      {/* 5. QA to PROD */}
      <div style={{ ...sectionStyle, borderLeftColor: "#17a2b8" }}>
        <div style={{ ...titleStyle, color: "#17a2b8" }}>
          5️⃣ Move QA → PROD
        </div>

        <pre style={commandStyle}>
{`git checkout hrms_prod
git fetch origin
git merge origin/hrmsReact_dev
git push`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> After testing, QA changes go to production.  
          <br />
          <b>Telugu:</b> QA lo test ayina changes production ki velthayi.
        </p>
      </div>

      {/* 6. Single commit */}
      <div style={{ ...sectionStyle, borderLeftColor: "#6f42c1" }}>
        <div style={{ ...titleStyle, color: "#6f42c1" }}>
          6️⃣ Merge ONLY One Commit (Cherry-pick)
        </div>

        <pre style={commandStyle}>
{`git checkout hrms_prod
git fetch origin
git cherry-pick commit_id`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> Only one feature/commit is merged, not full branch.  
          <br />
          <b>Telugu:</b> Oka commit matrame merge avutundi, full branch kaadu.
        </p>
      </div>

      {/* 7. Why origin */}
      <div style={{ ...sectionStyle, borderLeftColor: "#fd7e14" }}>
        <div style={{ ...titleStyle, color: "#fd7e14" }}>
          7️⃣ Why use origin?
        </div>

        <pre style={commandStyle}>
{`git merge hrms_prod        ❌ (may be old)
git merge origin/hrms_prod  ✅ (latest)`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> origin ensures you use latest remote code.  
          <br />
          <b>Telugu:</b> origin use chesthe latest remote code vastundi.
        </p>
      </div>

      {/* 8. Conflict */}
      <div style={{ ...sectionStyle, borderLeftColor: "#e83e8c" }}>
        <div style={{ ...titleStyle, color: "#e83e8c" }}>
          8️⃣ Conflict Example
        </div>

        <pre style={commandStyle}>
{`<<<<<<< HEAD
QA code
=======
PROD code
>>>>>>> branch`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> Resolve conflict manually and commit.  
          <br />
          <b>Telugu:</b> Conflict ni manual ga fix chesi commit cheyyali.
        </p>
      </div>

      {/* Final summary */}
      <div style={{ ...sectionStyle, borderLeftColor: "#343a40" }}>
        <div style={{ ...titleStyle, color: "#343a40" }}>
          🔥 Final Real-Time Summary
        </div>

        <pre style={commandStyle}>
{`git fetch → get latest
git merge origin/... → safe merge
git pull → quick update
git cherry-pick → one commit`}
        </pre>

        <p style={textStyle}>
          <b>English:</b> Git works on commits, not modules.  
          <br />
          <b>Telugu:</b> Git commits meeda work chestundi, modules kaadu.
        </p>
      </div>
    </div>
  );
};

export default GitRealTimeAdvanced;