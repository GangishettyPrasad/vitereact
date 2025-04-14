const GitDailyWorkflowGuide = () => {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-blue-600">📘 Git Daily Workflow </h2>
  
        {/* Day 1 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">👉 Day 1 – కొత్త branch తీసుకోవడం</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-sm">
  {`git checkout main
  git pull origin main
  git checkout -b prasadlatest11`}
          </pre>
          <p className="text-gray-700 mt-2">ఇప్పుడు మీరు కొత్త branch (ex: prasadlatest11) లో development మొదలుపెడతారు.</p>
        </section>
  
        {/* Day 2 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">👉 Day 2 – Changes commit & push చేయడం</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-sm">
  {`git add .
  git commit -m "Completed feature XYZ"
  git push origin prasadlatest11`}
          </pre>
          <p className="text-gray-700 mt-2">మీ changes GitHubకి పంపారు. ఇప్పుడు PR తయారు చేయవచ్చు..</p>
          <p className="text-gray-700 mt-2">మీ changes GitHubకి పంపారు. ఇప్పుడు PR తయారు చేయవచ్చు..</p>

        </section>
  
        {/* Day 3 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">👉 Day 3 – PR తయారుచేయడం & Merge</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>GitHub Open చేయండి</li>
            <li>PR create: <code>prasadlatest11 → prasad20250409</code></li>
            <li>PR review చేసి Merge చేయండి</li>
          </ul>
        </section>
  
        {/* Day 4 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">👉 Day 4 – Local లో Merge sync చేయడం</h2>
          <p className="text-red-600">❌ తప్పు విధానం:</p>
          <pre className="bg-red-100 p-4 rounded-md text-sm">
  {`git checkout prasad20250409
  git pull origin prasadlatest11`}
          </pre>
          <p className="text-green-600">✅ సరైన విధానం:</p>
          <pre className="bg-green-100 p-4 rounded-md text-sm">
  {`git checkout prasad20250409
  git pull origin prasad20250409`}
          </pre>
          <p className="text-gray-700 mt-2">GitHub లో merge అయినది local లో తీసుకోవడానికి target branch (PR target) నుంచే pull చెయ్యాలి.</p>
        </section>
  
        {/* Day 5 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">👉 Day 5 – కొత్త feature branch తీసుకోవడం</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-sm">
  {`git checkout prasad20250409
  git pull origin prasad20250409
  git checkout -b prasad20250412`}
          </pre>
          <p className="text-gray-700 mt-2">ఇప్పుడు మీరు కొత్త feature కోసం fresh branch లో development చెయ్యవచ్చు.</p>
        </section>
  
        <hr className="my-4" />
  
        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-purple-600">📒 Summary Table</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Day</th>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Commands</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Day 1</td>
                <td className="border px-4 py-2">Branch create</td>
                <td className="border px-4 py-2">`git checkout -b branchname`</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Day 2</td>
                <td className="border px-4 py-2">Changes push</td>
                <td className="border px-4 py-2">`git add .` → `commit` → `push`</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Day 3</td>
                <td className="border px-4 py-2">PR & Merge</td>
                <td className="border px-4 py-2">GitHub PR</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Day 4</td>
                <td className="border px-4 py-2">Local pull after PR</td>
                <td className="border px-4 py-2">`git pull origin target-branch`</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Day 5</td>
                <td className="border px-4 py-2">New feature branch</td>
                <td className="border px-4 py-2">`git checkout -b new-feature`</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  };
  
  export default GitDailyWorkflowGuide;
  