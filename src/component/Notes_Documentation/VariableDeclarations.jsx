import React from "react";

const VariableDeclarations = () => {
  return (
    <div className="p-4 text-sm leading-6">
      <h1 className="text-2xl font-bold mb-4">🔍 let, const & Temporal Dead Zone (TDZ) – In-depth Guide</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1️⃣ let – All Possibilities</h2>
        <pre>{`
let x = 10;
x = 20; // ✅ Reassignment allowed

if (true) {
  let y = 100;
  console.log("Inside block y:", y); // ✅ 100
}
// console.log(y); ❌ Error: block scoped
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>let అనేది block scope కలిగి ఉంటుంది. Reassign చేయవచ్చు కానీ Redeclare చేయలేం.</em></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2️⃣ const – All Possibilities</h2>
        <pre>{`
const name = "Prasad";
// name = "New"; ❌ Cannot reassign

const arr = [1, 2, 3];
arr.push(4); // ✅ Allowed (mutating)

const obj = { a: 1 };
obj.b = 2; // ✅
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>const వాడితే reassign చేయలేం కానీ object/array modify చేయొచ్చు.</em></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3️⃣ Temporal Dead Zone (TDZ)</h2>
        <pre>{`
try {
  console.log(a); // ❌ ReferenceError
  let a = 5;
} catch (e) {
  console.error("TDZ Error:", e.message);
}
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>TDZ అనేది variable declare line కి ముందు access చేస్తే error వచ్చే concept.</em></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4️⃣ var vs let/const</h2>
        <pre>{`
console.log(varTest); // ✅ undefined
var varTest = "I am var";

// sayHello(); ✅
function sayHello() {
  console.log("Hello!");
}

// greet(); ❌ TDZ
const greet = () => console.log("Hi");
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>var old-school; TDZ లేదు కానీ issues ఎక్కువగా వస్తాయి.</em></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5️⃣ Shadowing & Redeclaration</h2>
        <pre>{`
let food = "Biryani";
{
  let food = "Pizza"; // ✅ Shadowed
  console.log(food); // Pizza
}
console.log(food); // Biryani
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>Shadowing అంటే block లో variable మళ్ళీ declare చేయడం (అది OK).</em></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">6️⃣ Loops & Closures – var vs let</h2>
        <pre>{`
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 1000); // 3,3,3
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let i:", i), 1000); // 0,1,2
}
        `}</pre>
        <p className="mt-2">✅ Telugu: <em>let block scoped కాబట్టి closures లో కూడా correct value వస్తుంది.</em></p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">📊 Summary Table</h2>
        <table className="table-auto border border-collapse border-gray-400 w-full text-left mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Feature</th>
              <th className="border px-2 py-1">var</th>
              <th className="border px-2 py-1">let</th>
              <th className="border px-2 py-1">const</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-2 py-1">Scope</td><td className="border px-2 py-1">Function</td><td className="border px-2 py-1">Block</td><td className="border px-2 py-1">Block</td></tr>
            <tr><td className="border px-2 py-1">Redeclare</td><td className="border px-2 py-1">✅</td><td className="border px-2 py-1">❌</td><td className="border px-2 py-1">❌</td></tr>
            <tr><td className="border px-2 py-1">Reassign</td><td className="border px-2 py-1">✅</td><td className="border px-2 py-1">✅</td><td className="border px-2 py-1">❌</td></tr>
            <tr><td className="border px-2 py-1">Hoisting</td><td className="border px-2 py-1">✅ (undefined)</td><td className="border px-2 py-1">✅ (TDZ)</td><td className="border px-2 py-1">✅ (TDZ)</td></tr>
            <tr><td className="border px-2 py-1">TDZ Error</td><td className="border px-2 py-1">❌</td><td className="border px-2 py-1">✅</td><td className="border px-2 py-1">✅</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default VariableDeclarations;