// src/components/ArrayOfNestedJsonObjectsWithTable.jsx

import React, { useState } from 'react';
import axios from 'axios';

// Initial mock data
const initialUsers = [
  {
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
  },
  {
    id: 2,
    name: "Ravi Singh",
    email: "ravi@example.com",
    address: {
      street: "456 Elm St",
      city: "Bangalore",
      zip: "560001"
    },
    company: {
      name: "Design Studio",
      department: "UI/UX"
    }
  }
];

const ArrayOfNestedJsonObjects = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (user) => {
    setSelectedUser(user);  // Set the selected user data for editing
    setIsFormOpen(true);     // Open the form
  };

  const handleChange = (field, value) => {
    const updatedUser = { ...selectedUser };
    if (field.includes(".")) {
      const [mainField, subField] = field.split(".");
      updatedUser[mainField][subField] = value;
    } else {
      updatedUser[field] = value;
    }
    setSelectedUser(updatedUser);  // Update selected user's data
  };

  const handleSubmit = async () => {
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("https://yourapi.com/users/update", selectedUser);
      console.log("✅ Data posted:", response.data);

      // After updating, update the users list
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setIsFormOpen(false); // Close the form
    } catch (error) {
      console.error("❌ Error posting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Table to Display Data */}
      <h2>User List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleOpenForm(user)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for Editing the User */}
      {isFormOpen && (
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", maxWidth: "500px", margin: "0 auto" }}>
          <h3>Update User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <h4>Address:</h4>
          <div>
            <label>Street:</label>
            <input
              type="text"
              value={selectedUser.address.street}
              onChange={(e) => handleChange("address.street", e.target.value)}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={selectedUser.address.city}
              onChange={(e) => handleChange("address.city", e.target.value)}
            />
          </div>
          <div>
            <label>Zip:</label>
            <input
              type="text"
              value={selectedUser.address.zip}
              onChange={(e) => handleChange("address.zip", e.target.value)}
            />
          </div>
          <h4>Company:</h4>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              value={selectedUser.company.name}
              onChange={(e) => handleChange("company.name", e.target.value)}
            />
          </div>
          <div>
            <label>Department:</label>
            <input
              type="text"
              value={selectedUser.company.department}
              onChange={(e) => handleChange("company.department", e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsFormOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ArrayOfNestedJsonObjects;
