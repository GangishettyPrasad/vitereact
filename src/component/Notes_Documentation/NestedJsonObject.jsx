// src/components/NestedJsonObject.jsx

import React, { useState } from 'react';
import axios from 'axios';

const initialUser = {
  id: 1,
  name: "Ajay Kumar",
  email: "ajay@example.com",
  address: {
    street: "123 Main St",
    city: "Hyderabad",
    zip: "500062"
  },
  company: {
    name: "Tech Solutions",
    department: "Development"
  }
};

const NestedJsonObject = () => {
  const [user, setUser] = useState(initialUser);

  const handleChange = (field, value) => {
    if (field in user) {
      setUser({ ...user, [field]: value });
    } else {
      const fieldParts = field.split(".");
      const newUser = { ...user };
      newUser[fieldParts[0]] = {
        ...newUser[fieldParts[0]],
        [fieldParts[1]]: value,
      };
      setUser(newUser);
    }
  };

  const handleSubmit = async () => {
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("https://yourapi.com/user/update", user);
      console.log("✅ Data posted:", response.data);
    } catch (error) {
      console.error("❌ Error posting data:", error);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>🏠 Nested JSON Object</h2>
      <div>
        <strong>Name:</strong> {user.name} <br />
        <input
          type="text"
          value={user.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <strong>Email:</strong> {user.email} <br />
        <input
          type="email"
          value={user.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Email"
        />
      </div>

      <h3>Address:</h3>
      <div>
        <strong>Street:</strong> {user.address.street} <br />
        <input
          type="text"
          value={user.address.street}
          onChange={(e) => handleChange("address.street", e.target.value)}
          placeholder="Street"
        />
      </div>
      <div>
        <strong>City:</strong> {user.address.city} <br />
        <input
          type="text"
          value={user.address.city}
          onChange={(e) => handleChange("address.city", e.target.value)}
          placeholder="City"
        />
      </div>
      <div>
        <strong>Zip:</strong> {user.address.zip} <br />
        <input
          type="text"
          value={user.address.zip}
          onChange={(e) => handleChange("address.zip", e.target.value)}
          placeholder="Zip"
        />
      </div>

      <h3>Company:</h3>
      <div>
        <strong>Company Name:</strong> {user.company.name} <br />
        <input
          type="text"
          value={user.company.name}
          onChange={(e) => handleChange("company.name", e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div>
        <strong>Department:</strong> {user.company.department} <br />
        <input
          type="text"
          value={user.company.department}
          onChange={(e) => handleChange("company.department", e.target.value)}
          placeholder="Department"
        />
      </div>

      <button onClick={handleSubmit}>Update & Submit</button>
    </div>
  );
};

export default NestedJsonObject;
