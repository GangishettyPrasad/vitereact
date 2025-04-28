import React from 'react';
import StringMethodss from './StringMethodss';
import ObjtMethods from './ObjMethods';
import DateM from './DateM';
import AsynchronousMethods from './AsynchronousMethods';
import ErrorHandling from './ErrorHandling';
import { Link } from 'react-router-dom';


const JsMethods = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">

      <ol>

      <li><Link   to = '/dashboard/StringMethodss'>String methods</Link></li>

      <li><Link   to = '/dashboard/ObjtMethods'>obj m</Link></li>
      <li><Link   to = '/dashboard/DateM'>date m</Link></li>

      <li><Link   to = '/dashboard/AsynchronousMethods'>async m</Link></li>
      <li><Link   to = '/dashboard/ErrorHandling'>error handling </Link></li>

     
      
      </ol>
    

      {/* Table for JavaScript Methods */}
      <table className="min-w-full bg-white table-auto border-collapse">
        <thead>
          <tr className="bg-blue-200">
            <th className="py-3 px-6 text-left text-lg text-blue-800">Method Name</th>
            <th className="py-3 px-6 text-left text-lg text-blue-800">Explanation (Telugu)</th>
            <th className="py-3 px-6 text-left text-lg text-blue-800">Real-Time Example</th>
          </tr>
        </thead>
        <tbody>
          {/* String Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">String.split()</td>
            <td className="py-2 px-6 text-gray-700">ఈ method string ను ఒక array లోని substrings గా విడగొడుతుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const str = "apple,banana,grape";
const fruits = str.split(",");
console.log(fruits); // ["apple", "banana", "grape"]`}
              </code></pre>
            </td>
          </tr>
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">String.trim()</td>
            <td className="py-2 px-6 text-gray-700">ఈ method string నుండి leading మరియు trailing spaces ని తొలగిస్తుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const str = "  hello  ";
const trimmed = str.trim();
console.log(trimmed); // "hello"`}
              </code></pre>
            </td>
          </tr>

          {/* Date Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">Date.now()</td>
            <td className="py-2 px-6 text-gray-700">ప్రస్తుత timestamp ను milliseconds లో return చేస్తుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const timestamp = Date.now();
console.log(timestamp); // e.g., 1616161616161`}
              </code></pre>
            </td>
          </tr>
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">Date.parse()</td>
            <td className="py-2 px-6 text-gray-700">ఈ method string ని timestamp లో మార్చుతుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const timestamp = Date.parse('2025-04-25');
console.log(timestamp); // e.g., 1714204800000`}
              </code></pre>
            </td>
          </tr>

          {/* JSON Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">JSON.stringify()</td>
            <td className="py-2 px-6 text-gray-700">JavaScript object ను JSON string లోకి మార్చుతుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const person = { name: 'Alice', age: 25 };
const jsonString = JSON.stringify(person);
console.log(jsonString); // '{"name":"Alice","age":25}'`}
              </code></pre>
            </td>
          </tr>
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">JSON.parse()</td>
            <td className="py-2 px-6 text-gray-700">JSON string ను JavaScript object గా మార్చుతుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const jsonString = '{"name":"Alice","age":25}';
const person = JSON.parse(jsonString);
console.log(person); // { name: 'Alice', age: 25 }`}
              </code></pre>
            </td>
          </tr>

          {/* Object Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">Object.assign()</td>
            <td className="py-2 px-6 text-gray-700">ఈ method ఒక object నుండి మరొక object కు properties ని copy చేస్తుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const person = { name: 'Alice' };
const age = { age: 25 };
const newPerson = Object.assign({}, person, age);
console.log(newPerson); // { name: 'Alice', age: 25 }`}
              </code></pre>
            </td>
          </tr>

          {/* Error Handling */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">try...catch</td>
            <td className="py-2 px-6 text-gray-700">Error ను handle చేయడానికి use చేస్తారు.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`try {
  const result = someFunction();
} catch (error) {
  console.error('An error occurred:', error);
}`}
              </code></pre>
            </td>
          </tr>

          {/* Asynchronous Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">async/await</td>
            <td className="py-2 px-6 text-gray-700">Promises ను handle చేయడానికి use చేస్తారు, cleaner code కోసం.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}
fetchData();`}
              </code></pre>
            </td>
          </tr>

          {/* Promise Methods */}
          <tr className="border-b hover:bg-blue-50">
            <td className="py-2 px-6 font-medium text-blue-700">Promise.all()</td>
            <td className="py-2 px-6 text-gray-700">Array of promises ను parallel గా handle చేస్తుంది.</td>
            <td className="py-2 px-6 text-gray-700">
              <pre><code>
{`const promise1 = fetch('https://api1.com');
const promise2 = fetch('https://api2.com');
Promise.all([promise1, promise2]).then(results => {
  console.log(results);
});`}
              </code></pre>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default JsMethods;
