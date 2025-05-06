import React, { useState } from 'react';

// Initial mock complex user data
const initialUserData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    {
      type: "work",
      street: "456 Office Blvd",
      city: "New York",
      state: "NY",
      zip: "10002"
    }
  ],
  orders: [
    {
      id: 1001,
      product: "Laptop",
      quantity: 1,
      price: 1200
    },
    {
      id: 1002,
      product: "Phone",
      quantity: 2,
      price: 800
    }
  ]
};

const ComplexNestedJsonWithTable = () => {
  const [user, setUser] = useState(initialUserData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [mainField, subField, subSubField] = field.split(".");
      if (subSubField) {
        setUser({
          ...user,
          [mainField]: user[mainField].map((item, index) => 
            index === parseInt(subField) 
            ? { ...item, [subSubField]: value }
            : item
          ),
        });
      } else {
        setUser({
          ...user,
          [mainField]: user[mainField].map((item, index) => 
            index === parseInt(subField) ? { ...item, [subField]: value } : item
          ),
        });
      }
    } else {
      setUser({ ...user, [field]: value });
    }
  };

  const handleSubmit = async () => {
    // Placeholder for API request
    console.log("Updated User Data", user);
    // Update user data on the server (using axios, fetch, etc.)
    setIsFormOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Table to display user data */}
      <h2>User Profile</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={handleOpenForm}>Update</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Form to edit user profile */}
      {isFormOpen && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <h3>Update User Profile</h3>
          
          {/* Name Input */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Addresses Input */}
          <h4>Addresses:</h4>
          {user.addresses.map((address, index) => (
            <div key={index}>
              <label>Type ({address.type}):</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) =>
                  handleChange(`addresses.${index}.street`, e.target.value)
                }
              />
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  handleChange(`addresses.${index}.city`, e.target.value)
                }
              />
              <input
                type="text"
                value={address.zip}
                onChange={(e) =>
                  handleChange(`addresses.${index}.zip`, e.target.value)
                }
              />
            </div>
          ))}

          {/* Orders Input */}
          <h4>Orders:</h4>
          {user.orders.map((order, index) => (
            <div key={index}>
              <label>Product: {order.product}</label>
              <input
                type="number"
                value={order.quantity}
                onChange={(e) =>
                  handleChange(`orders.${index}.quantity`, e.target.value)
                }
              />
              <input
                type="number"
                value={order.price}
                onChange={(e) =>
                  handleChange(`orders.${index}.price`, e.target.value)
                }
              />
            </div>
          ))}

          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsFormOpen(false)}>Cancel</button>
        </div>
      )}
{/* 
        <ol>
          <li><strong>దశ 1:</strong> మీరు మొదటగా JSON డేటా structure తయారు చేసుకుంటారు.</li>
          <li><strong>దశ 2:</strong> JSON లో nested objects ను handle చేయడానికి, మీరు object propertyలను సాధారణంగా access చేస్తారు.</li>
          <li><strong>దశ 3:</strong> Form లో ఉన్న input fields ను update చేసే చర్యను మీరు పరిక్షించాలి.</li>
          <li><strong>దశ 4:</strong> ప్రతీ input field కి state update చేయడం మరియు UI లో data render చేయడం చేయాలి.</li>
          <li><strong>దశ 5:</strong> డేటా submit చేయడానికి submit button తయారు చేయాలి.</li>
          <li><strong>దశ 6:</strong> form submission పై ఆధారపడి, backend API కి data ను post చేయాలి.</li>
          <li><strong>దశ 7:</strong> submission తరువాత, response ను console లో log చేసి, form close చేయాలి.</li>
        </ol> */}
    </div>
  );
};

export default ComplexNestedJsonWithTable;
