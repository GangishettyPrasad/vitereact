// src/components/SimpleFlatJsonObject.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SimpleFlatJsonObject = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Ajay Kumar",
    email: "ajay@example.com",
    phone: "9876543210",
    city: "Hyderabad"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("https://yourapi.com/update-user", user);
      console.log("✅ Data posted:", response.data);
    } catch (error) {
      console.error("❌ Error posting data:", error);
    }
  };

  return (<>
   <div>
        <h3> json obj.....</h3>
        <li><Link   to = '/dashboard/ArrayOfJsonObjects'>ArrayOfJsonObjects</Link></li>
        <li><Link   to = '/dashboard/NestedJsonObject'>NestedJsonObject</Link></li>
        <li><Link   to = '/dashboard/ArrayOfNestedJsonObjects'>ArrayOfNestedJsonObjects</Link></li>
        <li><Link   to = '/dashboard/ComplexNestedJsonWithTable'>ComplexNestedJsonWithTable</Link></li>
        <li><Link   to = '/dashboard/JsonWithArrayInObject'>JsonWithArrayInObject</Link></li>
        <li><Link   to = '/dashboard/ArrayOfJsonObject'>ArrayOfJsonObject</Link></li>
        <li><Link   to = '/dashboard/NestedArraysAndObjects'>NestedArraysAndObjects</Link></li>
        <li><Link   to = '/dashboard/PaginatedJsonTable'>PaginatedJsonTable</Link></li>
        <li><Link   to = '/dashboard/AuditLogTable'>AuditLogTable</Link></li>
        <li><Link   to = '/dashboard/AuditLogWithNestedData'>AuditLogWithNestedData</Link></li>
        <li><Link   to = '/dashboard/ProductCrud'>ProductCrud</Link></li>
        <li><Link   to = '/dashboard/BankTransactionCrud'>BankTransactionCrud</Link></li>
        <li><Link   to = '/dashboard/ChatMessageCrud'>ChatMessageCrud</Link></li>
        <li><Link   to = '/dashboard/DepartmentSubDepartmentCrud'>DepartmentSubDepartmentCrud</Link></li>
  
        

      </div>

      <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>

     
<h2>🧍 Simple Flat JSON Object</h2>
<p><strong>ID:</strong> {user.id}</p>
<p><strong>Name:</strong> {user.name}</p>
<p><strong>Email:</strong> {user.email}</p>
<p><strong>Phone:</strong> {user.phone}</p>
<p><strong>City:</strong> {user.city}</p>

<hr />

<h3>✍️ Edit User Info</h3>
<form onSubmit={handleSubmit}>
  <input name="name" value={user.name} onChange={handleChange} placeholder="Name" /><br />
  <input name="email" value={user.email} onChange={handleChange} placeholder="Email" /><br />
  <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" /><br />
  <input name="city" value={user.city} onChange={handleChange} placeholder="City" /><br />
  <button type="submit">Update & Send</button>
</form>
</div>
  </>
   
  );
};

export default SimpleFlatJsonObject;
