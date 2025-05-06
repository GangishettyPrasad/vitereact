import React, { useState } from 'react';
import JsonArrayInsideObject from './JsonArrayInsideObject';
import MixedJsonCrud from './MixedJsonCrud';

const initialProducts = [
  { id: 1, name: "Product A", price: 2500, available: true },
  { id: 2, name: "Product B", price: 4000, available: false },
  { id: 3, name: "Product C", price: 1500, available: true },
];

const ArrayOfJsonObject = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editIndex, setEditIndex] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPrice(products[index].price);
  };

  const handleSave = () => {
    const updated = [...products];
    updated[editIndex].price = parseInt(newPrice);
    setProducts(updated);
    setEditIndex(null);
    setNewPrice('');
  };

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🧾 Product List (Array of JSON Objects)</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod.id}>
              <td className="border p-2">{prod.id}</td>
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="border px-2 py-1 w-24"
                  />
                ) : (
                  `₹${prod.price}`
                )}
              </td>
              <td className="border p-2">
                {prod.available ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border p-2">
                {editIndex === index ? (
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                ) : (
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🪄 Telugu Explanation Steps */}
      <div className="mt-6 bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-sm leading-loose">
        <strong className="text-md block mb-2">🪜 React లో Step-by-Step Explanation (Telugu):</strong>
        <p>✅ Step 1: ఈ Structureలో JSON పూర్తిగా ఒక Array గా ఉంటుంది.</p>
        <p>✅ Step 2: ప్రతి object కి `id`, `name`, `price`, `available` వంటివి ఉంటాయి.</p>
        <p>✅ Step 3: React లో ఈ Array ని `map()` చేసి Table గా చూపించాం.</p>
        <p>✅ Step 4: ఒక్కో row కి Edit బటన్ వుంచి, Price ని మారుస్తున్నాం.</p>
        <p>✅ Step 5: Save నొక్కిన తర్వాత updated array ని React state లో సెట్ చేస్తున్నాం.</p>
        <p>✅ Step 6: ఇవన్నీ UI లో live reflect అవుతున్నాయి.</p>
        <p>✅ Step 7: Backend కి పాస్ చేయాలంటే `products` ని POST చేయొచ్చు.</p>
      </div>

      <h1>another complete example and you can comment also and open page and refer</h1>
      <JsonArrayInsideObject/>
      <MixedJsonCrud/>
    </div>
  );
};

export default ArrayOfJsonObject;
