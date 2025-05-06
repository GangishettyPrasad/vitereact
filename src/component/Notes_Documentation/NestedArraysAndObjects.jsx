import React from 'react';
import JsonCrudPage from './JsonCrudPage';

const NestedArraysAndObjects = () => {
  const orderData = {
    orderId: "OD12345",
    customer: {
      name: "Ravi Kumar",
      phone: "9876543210",
      address: "Hyderabad"
    },
    items: [
      {
        productId: "P101",
        productName: "Mobile",
        price: 15000,
        warranty: {
          years: 1,
          type: "manufacturer"
        }
      },
      {
        productId: "P102",
        productName: "Headphones",
        price: 2000,
        warranty: {
          years: 2,
          type: "brand"
        }
      }
    ]
  };

  // POST handler function
  const postOrderData = async () => {
    try {
      const response = await fetch('https://your-api-url.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("Order successfully posted:", result);
      alert("Data Posted Successfully ✅");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">4. JSON with Arrays Inside Object</h2>
<h3>curd same data</h3>
<JsonCrudPage/>
      <table className="table-auto border border-gray-300 w-full text-sm mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Product Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Warranty (years)</th>
            <th className="border px-2 py-1">Warranty Type</th>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{item.productName}</td>
              <td className="border px-2 py-1">₹{item.price}</td>
              <td className="border px-2 py-1">{item.warranty.years}</td>
              <td className="border px-2 py-1">{item.warranty.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Post Button */}
      <button
        onClick={postOrderData}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post This Order Data
      </button>

      {/* 📘 Telugu Steps */}
      {/* <div className="bg-green-50 border border-green-300 p-4 rounded mt-6 text-sm leading-loose">
        <strong className="block mb-2 text-md">📤 Step-by-Step Posting Explanation (Telugu):</strong>
        <p>✅ Step 1: orderData అనే object create చేసాం.</p>
        <p>✅ Step 2: `fetch()` తో POST request పంపాం API కి.</p>
        <p>✅ Step 3: Headers లో `Content-Type: application/json` ఇచ్చాం.</p>
        <p>✅ Step 4: JSON.stringify() తో JSON format లో data పంపించాం.</p>
        <p>✅ Step 5: Response ని receive చేసి alert లో చూపించాం.</p>
        <p>✅ Step 6: Button మీద click చేస్తే postOrderData() function trigger అవుతుంది.</p>
        <p>✅ Step 7: Error ఉంటే catch block లో handle చేసాం.</p>
      </div> */}
    </div>
  );
};

export default NestedArraysAndObjects;
