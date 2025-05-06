import React, { useState } from "react";

const JsonCrudPage = () => {
  const [data, setData] = useState([
    { id: 1, name: "Ajay", role: "Developer" },
    { id: 2, name: "Bhanu", role: "Designer" }
  ]);
  const [formData, setFormData] = useState({ id: "", name: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    const newEntry = { ...formData, id: Date.now() };
    setData([...data, newEntry]);
    setFormData({ id: "", name: "", role: "" });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
  };

  const handleUpdate = () => {
    const updated = data.map((d) =>
      d.id === formData.id ? formData : d
    );
    setData(updated);
    setIsEditing(false);
    setFormData({ id: "", name: "", role: "" });
  };

  const handleDelete = (id) => {
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧾 React JSON CRUD Page</h2>

      {/* 👇 Telugu Step-by-Step Explanation */}
      <div className="p-3 mb-4 bg-light border rounded">
        <h5>📘 React JSON CRUD UI స్టెప్స్:</h5>
        <ol>
          <li>Step 1: టేబుల్‌లో JSON డేటాను ప్రదర్శించడం (Read)</li>
          <li>Step 2: Input ఫీల్డ్స్‌ ద్వారా కొత్త డేటా చేర్చడం (Create)</li>
          <li>Step 3: Edit బటన్‌పై క్లిక్‌ చేస్తే ఫారంలో డేటా వస్తుంది</li>
          <li>Step 4: డేటాను మార్చి "Update" క్లిక్ చేస్తే, JSON అప్డేట్ అవుతుంది</li>
          <li>Step 5: Delete బటన్ ద్వారా ఏ లైన్ అయినా తీసేయవచ్చు</li>
          <li>Step 6: స్టేట్ (useState) ద్వారా CRUD హ్యాండిల్ అవుతుంది</li>
          <li>Step 7: డేటాను APIకి పంపాలంటే Fetch/axios POST చేయాలి</li>
        </ol>
      </div>

      {/* 👇 Form */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Emp Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="role"
          placeholder="Emp Role"
          value={formData.role}
          onChange={handleChange}
          className="form-control mb-2"
        />
        {isEditing ? (
          <button onClick={handleUpdate} className="btn btn-warning">Update</button>
        ) : (
          <button onClick={handleCreate} className="btn btn-success">Add</button>
        )}
      </div>

      {/* 👇 Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Emp Name</th>
            <th>Emp Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.role}</td>
              <td>
                <button onClick={() => handleEdit(d)} className="btn btn-sm btn-primary me-2">Edit</button>
                <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JsonCrudPage;
