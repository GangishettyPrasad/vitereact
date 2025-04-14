import React, { useState } from "react";

function NestedObjectsWithArrays() {
  const [user, setUser] = useState({
    name: "Prasad",
    age: 28,
    addresses: [
      { id: 1, type: "Home", city: "Hyderabad" },
      { id: 2, type: "Office", city: "Bangalore" }
    ]
  });

  // Step 2: Add new address
  const addAddress = () => {
    const newAddress = {
      id: Date.now(),
      type: "Vacation",
      city: "Goa"
    };
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
  };

  // Step 3: Update address
  const updateCity = (id, newCity) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr =>
        addr.id === id ? { ...addr, city: newCity } : addr
      )
    }));
  };

  // Step 4: Delete address
  const deleteAddress = (id) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">👤 {user.name}'s Addresses</h2>

      {/* Step 1: Display nested array */}
      {user.addresses.map((addr) => (
        <div key={addr.id} className="border p-2 my-2 rounded bg-gray-100">
          <p>🏠 Type: {addr.type}</p>
          <p>📍 City: {addr.city}</p>

          {/* Update */}
          <button
            className="bg-yellow-400 px-2 py-1 rounded mr-2"
            onClick={() => updateCity(addr.id, "Vijayawada")}
          >
            Update City
          </button>

          {/* Delete */}
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteAddress(addr.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add Address */}
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded mt-4"
        onClick={addAddress}
      >
        ➕ Add Address
      </button>
    </div>
  );
}

export default NestedObjectsWithArrays;
