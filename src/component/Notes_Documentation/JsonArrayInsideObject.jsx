import React, { useState } from 'react';

const JsonArrayInsideObject = () => {
  const [userData, setUserData] = useState({
    userDetails: [
      { id: 1, name: 'Ajay', age: 28 },
      { id: 2, name: 'Bheem', age: 30 },
    ],
  });

  const [newUser, setNewUser] = useState({ id: '', name: '', age: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = () => {
    if (!newUser.id || !newUser.name || !newUser.age) return;
    setUserData({
      userDetails: [...userData.userDetails, newUser],
    });
    setNewUser({ id: '', name: '', age: '' });
  };

  const handleEdit = (user) => {
    setNewUser(user);
  };

  const handleUpdate = () => {
    const updatedUsers = userData.userDetails.map((user) =>
      user.id === newUser.id ? newUser : user
    );
    setUserData({ userDetails: updatedUsers });
    setNewUser({ id: '', name: '', age: '' });
  };

  const handleDelete = (id) => {
    const updatedUsers = userData.userDetails.filter((user) => user.id !== id);
    setUserData({ userDetails: updatedUsers });
  };

  return (
    <div className="container">
      <h2>User Details Table</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.userDetails.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>{' '}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{newUser.id ? 'Update User' : 'Add New User'}</h3>
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={newUser.id}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={newUser.age}
        onChange={handleInputChange}
      />
      <button onClick={newUser.id && userData.userDetails.some(u => u.id === newUser.id) ? handleUpdate : handleSubmit}>
        {userData.userDetails.some(u => u.id === newUser.id) ? 'Update' : 'Add'}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <h4>📘 React UI Explanation in Telugu</h4>
        <ol>
          <li><strong>Step 1:</strong> మన JSON object లో userDetails అనే array ఉంది, దాన్ని తీసుకొని React state గా ఉపయోగిస్తున్నాం.</li>
          <li><strong>Step 2:</strong> ఈ array ని table లో map చేసి display చేస్తున్నాం.</li>
          <li><strong>Step 3:</strong> కొత్త user add చేయడానికి form fields ఉన్నాయి: id, name, age.</li>
          <li><strong>Step 4:</strong> Add button click చేసినపుడు, ఆ data ని userDetails లో జత చేస్తున్నాం.</li>
          <li><strong>Step 5:</strong> ప్రతి row లో Edit మరియు Delete buttons ఉన్నాయి. Edit చేస్తే form లో values వస్తాయి.</li>
          <li><strong>Step 6:</strong> Update button click చేస్తే existing record ని update చేస్తున్నాం.</li>
          <li><strong>Step 7:</strong> Delete button ద్వారా user ని list నుండి తీసివేస్తున్నాం.</li>
        </ol>
      </div>
    </div>
  );
};

export default JsonArrayInsideObject;
