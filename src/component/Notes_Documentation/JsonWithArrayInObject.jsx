import React, { useState } from 'react';

const initialOrder = {
  orderId: "ORD123",
  customer: {
    name: "Kiran Kumar",
    email: "kiran@example.com",
  },
  items: [
    { itemId: "P101", productName: "Smartphone", price: 12000, quantity: 1 },
    { itemId: "P102", productName: "Wireless Earbuds", price: 3000, quantity: 2 },
  ],
};

const JsonWithArrayInObject = () => {
  const [order, setOrder] = useState(initialOrder);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQty, setEditedQty] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedQty(order.items[index].quantity);
  };

  const handleSave = () => {
    const updatedItems = [...order.items];
    updatedItems[editingIndex].quantity = parseInt(editedQty);
    setOrder({ ...order, items: updatedItems });
    setEditingIndex(null);
    setEditedQty('');
  };

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-3">🧾 Order Summary</h2>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Customer:</strong> {order.customer.name} ({order.customer.email})</p>

      <h3 className="text-lg font-semibold mt-5">🛒 Ordered Items</h3>
      <table className="w-full border mt-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={item.itemId}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.productName}</td>
              <td className="border p-2">₹{item.price}</td>
              <td className="border p-2">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={editedQty}
                    onChange={(e) => setEditedQty(e.target.value)}
                    className="w-16 border px-2 py-1"
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="border p-2">
                {editingIndex === index ? (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🪄 Telugu Explanation Steps */}
      {/* <div className="mt-6 bg-yellow-50 border border-yellow-300 p-4 rounded-lg text-sm leading-loose">
        <strong className="text-md block mb-2">🪜 React లో Step-by-Step Explanation (Telugu):</strong>
        <p>✅ Step 1: JSON Object లో customer మరియు items array data వుంటుంది.</p>
        <p>✅ Step 2: Customer info ని header లో simple text లాగా display చేసాం.</p>
        <p>✅ Step 3: Items array ని React Table లో map చేసి చూపించాం.</p>
        <p>✅ Step 4: ప్రతి item row కి "Edit" బటన్ వుంది – అది నొక్కితే quantity input field వస్తుంది.</p>
        <p>✅ Step 5: Quantity మార్చిన తర్వాత "Save" నొక్కితే, items array ని update చేయడం జరుగుతుంది.</p>
        <p>✅ Step 6: React state (`setOrder`) తో array లో value ని మళ్ళీ render చేయించాం.</p>
        <p>✅ Step 7: Props/Backend కి పాస్ చేయాలంటే `order` state ని POST చేయొచ్చు.</p>
      </div> */}
    </div>
  );
};

export default JsonWithArrayInObject;
