import React, { useState } from 'react';

const MixedJsonCrud = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ajay',
      address: {
        city: 'Hyderabad',
        pin: 500081
      },
      skills: ['React', 'Node.js']
    },
    {
      id: 2,
      name: 'Kiran',
      address: {
        city: 'Bangalore',
        pin: 560001
      },
      skills: ['Angular', 'Java']
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    city: '',
    pin: '',
    skills: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    const existing = employees.find(emp => emp.id === Number(formData.id));

    const newEmp = {
      id: Number(formData.id),
      name: formData.name,
      address: {
        city: formData.city,
        pin: Number(formData.pin)
      },
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    if (existing) {
      setEmployees(employees.map(emp => emp.id === newEmp.id ? newEmp : emp));
    } else {
      setEmployees([...employees, newEmp]);
    }

    setFormData({ id: '', name: '', city: '', pin: '', skills: '' });
  };

  const handleEdit = (emp) => {
    setFormData({
      id: emp.id,
      name: emp.name,
      city: emp.address.city,
      pin: emp.address.pin,
      skills: emp.skills.join(', ')
    });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="container">
      <h2>Employee Details Table</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>PIN</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.address.city}</td>
              <td>{emp.address.pin}</td>
              <td>{emp.skills.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>{' '}
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{formData.id && employees.find(emp => emp.id === Number(formData.id)) ? 'Update Employee' : 'Add New Employee'}</h3>

      <input name="id" type="number" placeholder="ID" value={formData.id} onChange={handleInputChange} />
      <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleInputChange} />
      <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleInputChange} />
      <input name="pin" type="number" placeholder="PIN" value={formData.pin} onChange={handleInputChange} />
      <input name="skills" type="text" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleInputChange} />

      <button onClick={handleAddOrUpdate}>
        {formData.id && employees.find(emp => emp.id === Number(formData.id)) ? 'Update' : 'Add'}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '10px' }}>
        <h4>📘 React UI Step-by-Step Guide in Telugu</h4>
        <ol>
          <li><strong>Step 1:</strong> Employees అనే array లో nested address object & skills array ఉన్నాయి.</li>
          <li><strong>Step 2:</strong> ఈ employees array ని React state గా manage చేస్తున్నాం.</li>
          <li><strong>Step 3:</strong> Table ద్వారా employee details చూపిస్తున్నాం.</li>
          <li><strong>Step 4:</strong> New employee add చేయడానికి form తీసుకున్నాం (ID, Name, City, PIN, Skills).</li>
          <li><strong>Step 5:</strong> Edit button ద్వారా data form లోకి prefill చేస్తాం.</li>
          <li><strong>Step 6:</strong> Update చేసిన తర్వాత state update చేస్తాం & UI refresh అవుతుంది.</li>
          <li><strong>Step 7:</strong> Delete button ద్వారా record remove చేస్తాం.</li>
        </ol>
      </div>
    </div>
  );
};

export default MixedJsonCrud;
