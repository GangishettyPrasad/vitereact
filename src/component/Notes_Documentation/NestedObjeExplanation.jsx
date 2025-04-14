import React from "react"
const NestedObjeExplanation = ()=>{
    return(
<div className="guide-container p-4 bg-gray-100 rounded-2xl shadow-md space-y-6">

{/* 🔹 Title */}
<h1 className="text-2xl font-bold text-blue-600">📚 Nested Objects with Arrays – Full Guide</h1>

{/* 🔍 Concept Description */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">🔍 What are Nested Objects with Arrays?</h2>
  <p>
    ఒక object లో ఉన్న key-value pairs లో values గా arrays ఉండటం, లేదా array లో objects ఉండటం – ఇది nested structure అని అంటారు. 
  </p>
  <p>
    👉 ఈ structure కి deep access, update, looping, and CRUD చేయడం అంటే అర్ధం చేసుకోవాలి.
  </p>
</section>

{/* 🧱 Example Structure */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">🧱 Example Structure:</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`
const user = {
name: "Prasad",
age: 28,
addresses: [
  { type: "home", city: "Hyderabad" },
  { type: "office", city: "Bangalore" }
]
};
`}
  </pre>
  <p>🔁 `addresses` అనేది array of objects. ఇది object లో nested structure.</p>
</section>

{/* 🧠 Accessing Nested Data */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">🧠 Accessing Nested Data</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`console.log(user.addresses[0].city); // "Hyderabad"
console.log(user.addresses[1].type);  // "office"`}
  </pre>
  <p>➡️ Arrays లో index తో access చేసి object లో key access చేయాలి.</p>
</section>

{/* 🔄 Loop through Nested Arrays */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">🔄 Loop through Nested Arrays (JSX UI)</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`
{user.addresses.map((address, index) => (
<div key={index}>
  <p>{address.type} - {address.city}</p>
</div>
))}
`}
  </pre>
  <p>🌀 `map()` వాడి nested object array ని UI లో display చేయవచ్చు.</p>
</section>

{/* ✍️ Update Nested Data */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">✍️ Updating Nested Object in React</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`
setUser(prev => ({
...prev,
addresses: prev.addresses.map(addr =>
  addr.type === "home"
    ? { ...addr, city: "Vijayawada" }
    : addr
)
}));
`}
  </pre>
  <p>🔁 Array update + spread operator + condition based nested update ✅</p>
</section>

{/* ➕ Add New Item to Nested Array */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">➕ Adding New Object to Nested Array</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`
setUser(prev => ({
...prev,
addresses: [...prev.addresses, { type: "vacation", city: "Goa" }]
}));
`}
  </pre>
  <p>📌 Spread operator తో nested array కి కొత్త object add ✅</p>
</section>

{/* ❌ Delete Object from Nested Array */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">❌ Deleting Object from Nested Array</h2>
  <pre className="bg-gray-200 p-3 rounded-md">
{`
setUser(prev => ({
...prev,
addresses: prev.addresses.filter(addr => addr.type !== "office")
}));
`}
  </pre>
  <p>🧹 `filter()` వాడి nested array లోనుండి item తొలగించవచ్చు</p>
</section>

{/* 🧪 Real-Time Usage Example */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">🧪 Real-Time Usage Example</h2>
  <p>💡 Address form, dynamic multiple entries, survey form with nested responses — ఇవన్నీ ఈ concept తో build అవుతాయి.</p>
</section>

{/* ✅ Summary */}
<section className="bg-white p-4 rounded-xl shadow space-y-2">
  <h2 className="text-xl font-semibold">✅ Summary & Best Practices</h2>
  <ul className="list-disc list-inside space-y-1">
    <li>Spread operator వాడడం వల్ల immutable updates సాధ్యం అవుతాయి</li>
    <li>Always use keys in JSX maps</li>
    <li>Avoid direct mutation – use `map`, `filter`, `find`, etc.</li>
    <li>Update nested state carefully using functions in `setState`</li>
  </ul>
</section>

</div>
    )
}
export default NestedObjeExplanation



