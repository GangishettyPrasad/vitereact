import React, { useState, useEffect } from 'react';

const DepartmentFormModal = ({ isEditMode, initialData, onSave, onClose }) => {
  const [departmentName, setDepartmentName] = useState(initialData?.name || '');
  const [subDepartments, setSubDepartments] = useState(
    initialData?.subDepartments?.map((sub) => sub.name) || ['']
  );

  const handleSubChange = (index, value) => {
    const updated = [...subDepartments];
    updated[index] = value;
    setSubDepartments(updated);
  };

  const addSubDepartment = () => {
    setSubDepartments([...subDepartments, '']);
  };

  const removeSubDepartment = (index) => {
    const updated = subDepartments.filter((_, i) => i !== index);
    setSubDepartments(updated);
  };

  const handleSubmit = () => {
    const updatedData = {
      id: initialData?.id,
      name: departmentName,
      subDepartments: subDepartments.map((name, idx) => ({ id: initialData?.subDepartments?.[idx]?.id || idx, name }))
    };
    onSave(updatedData);
  };

  return (
    <div className="modal">
      <h2>{isEditMode ? 'Update' : 'Add'} Department</h2>
      <label>Department Name *</label>
      <input
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
        placeholder="Department Name"
      />

      <label>Sub Department</label>
      {subDepartments.map((sub, index) => (
        <div key={index}>
          <input
            value={sub}
            onChange={(e) => handleSubChange(index, e.target.value)}
            placeholder="Sub Department Name"
          />
          <button onClick={() => removeSubDepartment(index)}>X</button>
        </div>
      ))}
      <button onClick={addSubDepartment}>+</button>

      <div>
        <button onClick={onClose}>CLOSE</button>
        <button onClick={handleSubmit}>{isEditMode ? 'UPDATE' : 'ADD DEPARTMENT'}</button>
      </div>
    </div>
  );
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await fetch('/api/departments');
    const data = await response.json();
    setDepartments(data);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedDepartment(null);
    setShowModal(true);
  };

  const handleEdit = (dept) => {
    setIsEditMode(true);
    setSelectedDepartment(dept);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    if (isEditMode) {
      await fetch(`/api/departments/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    fetchDepartments();
    setShowModal(false);
  };

  return (
    <div>
      <h1>Department Manager</h1>
      <button onClick={handleAdd}>Add Department</button>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sub Departments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.name}</td>
              <td>
                {dept.subDepartments?.map((sub) => sub.name).join(', ')}
              </td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <DepartmentFormModal
          isEditMode={isEditMode}
          initialData={selectedDepartment}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DepartmentPage;
