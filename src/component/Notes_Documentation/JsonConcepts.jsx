import React from "react";

const JsonConcepts = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-blue-50 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-700">🧠 JSON Concepts Explained</h1>

      {/* JSON.stringify */}
      <section className="bg-purple-100 border-l-8 border-purple-500 p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-purple-800">1️⃣ JSON.stringify()</h2>
        <p className="text-gray-700">✅ Converts a JavaScript object into a JSON string.</p>
        <p className="text-sm text-purple-600 italic">📘 Telugu: JavaScript object ను string గా మార్చడానికిది ఉపయోగిస్తారు.</p>
        <pre className="bg-gray-800 text-green-300 p-3 rounded mt-2 overflow-auto">
{`const user = { name: "Ravi", age: 25 };
const jsonString = JSON.stringify(user);
console.log(jsonString); // "{\"name\":\"Ravi\",\"age\":25}"`}
        </pre>
      </section>

      {/* JSON.parse */}
      <section className="bg-green-100 border-l-8 border-green-500 p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-green-800">2️⃣ JSON.parse()</h2>
        <p className="text-gray-700">✅ Converts a JSON string back into a JavaScript object.</p>
        <p className="text-sm text-green-600 italic">📘 Telugu: JSON string ని మళ్లీ JavaScript object గా మార్చడానికిది ఉపయోగిస్తారు.</p>
        <pre className="bg-gray-800 text-yellow-200 p-3 rounded mt-2 overflow-auto">
{`const jsonString = '{"name":"Ravi","age":25}';
const userObj = JSON.parse(jsonString);
console.log(userObj.name); // Ravi`}
        </pre>
      </section>

      {/* .json() */}
      <section className="bg-blue-100 border-l-8 border-blue-500 p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">3️⃣ .json() with fetch()</h2>
        <p className="text-gray-700">✅ Used to convert API response to JS object inside fetch.</p>
        <p className="text-sm text-blue-600 italic">📘 Telugu: API నుంచి వచ్చిన JSON ని object గా మార్చడానికిది ఉపయోగిస్తారు.</p>
        <pre className="bg-gray-800 text-pink-200 p-3 rounded mt-2 overflow-auto">
{`fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data));`}
        </pre>
      </section>

      {/* Use Cases */}
      <section className="bg-yellow-100 border-l-8 border-yellow-400 p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-800">🔎 7 Real-Time Use Cases</h2>

        <ul className="list-disc list-inside space-y-6 mt-4 text-gray-800">
          <li>
            <strong className="text-purple-700">1. Sending Data to Server:</strong> Use <code className="bg-purple-200 px-1 rounded">JSON.stringify()</code> to send objects as JSON string.
            <pre className="bg-gray-900 text-green-300 p-3 rounded mt-1 overflow-auto">
{`fetch('/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ravi' })
});`}
            </pre>
          </li>

          <li>
            <strong className="text-green-700">2. Cloning an Object:</strong> Use <code className="bg-green-200 px-1 rounded">JSON.parse(JSON.stringify(obj))</code> for deep copy.
            <pre className="bg-gray-900 text-yellow-300 p-3 rounded mt-1 overflow-auto">
{`const copy = JSON.parse(JSON.stringify(original));`}
            </pre>
          </li>

          <li>
            <strong className="text-blue-700">3. Comparing Objects:</strong> Convert both to strings using <code className="bg-blue-200 px-1 rounded">JSON.stringify()</code>.
            <pre className="bg-gray-900 text-blue-300 p-3 rounded mt-1 overflow-auto">
{`JSON.stringify(obj1) === JSON.stringify(obj2)`}
            </pre>
          </li>

          <li>
            <strong className="text-pink-700">4. Debugging:</strong> Pretty print objects in console using:
            <pre className="bg-gray-900 text-pink-200 p-3 rounded mt-1 overflow-auto">
{`console.log(JSON.stringify(data, null, 2));`}
            </pre>
          </li>

          <li>
            <strong className="text-orange-700">5. Cookies:</strong> Save object to cookie after stringifying.
            <pre className="bg-gray-900 text-orange-200 p-3 rounded mt-1 overflow-auto">
{`document.cookie = 'prefs=' + JSON.stringify({ theme: 'dark' });`}
            </pre>
          </li>

          <li>
            <strong className="text-red-700">6. Component Communication:</strong> Use <code className="bg-red-200 px-1 rounded">postMessage()</code> or props with stringified data.
            <pre className="bg-gray-900 text-red-200 p-3 rounded mt-1 overflow-auto">
{`window.postMessage(JSON.stringify({ type: 'greet' }));`}
            </pre>
          </li>

          <li>
            <strong className="text-indigo-700">7. Node.js File Read/Write:</strong>
            <pre className="bg-gray-900 text-indigo-200 p-3 rounded mt-1 overflow-auto">
{`fs.writeFileSync('data.json', JSON.stringify(data));
const dataFromFile = JSON.parse(fs.readFileSync('data.json'));`}
            </pre>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default JsonConcepts;