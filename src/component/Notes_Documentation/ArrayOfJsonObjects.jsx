// src/components/ArrayOfJsonObjects.jsx

import React, { useState } from 'react';
import axios from 'axios';

const initialUsers = [
  { id: 1, name: "Ajay", email: "ajay@example.com" },
  { id: 2, name: "Bhanu", email: "bhanu@example.com" },
  { id: 3, name: "Charan", email: "charan@example.com" }
];

const ArrayOfJsonObjects = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleSubmit = async () => {
    try {
      // Replace with your backend endpoint
      const response = await axios.post("https://yourapi.com/users/update", users);
      console.log("✅ Data sent:", response.data);
    } catch (error) {
      console.error("❌ Error posting data:", error);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>👥 Array of JSON Objects</h2>

      {users.map((user, index) => (
        <div key={user.id} style={{ marginBottom: "10px", padding: "10px", border: "1px dashed gray" }}>
          <strong>ID:</strong> {user.id} <br />
          <input
            type="text"
            value={user.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            placeholder="Name"
          />{" "}
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleChange(index, "email", e.target.value)}
            placeholder="Email"
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit All</button>
    </div>
  );
};

export default ArrayOfJsonObjects;
