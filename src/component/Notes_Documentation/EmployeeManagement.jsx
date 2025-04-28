import React, { useState, useEffect } from 'react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]); // Complex Data
  const [loading, setLoading] = useState(true); // Loading State
  const [responseMessage, setResponseMessage] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeePosition, setNewEmployeePosition] = useState('');
  
  const authToken = "your-jwt-token"; // Security

  // 1. Fetching Employees (Complex Data + Loading)
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://api.example.com/employees');
      const data = await response.json();
      setEmployees(data); // Complex Array of Employees Set చేస్తున్నాం
    } catch (error) {
      console.error('Employees Fetch Error:', error);
    } finally {
      setLoading(false); // Finally లోడింగ్ false చేస్తాం
    }
  };

  // 2. Sending New Employee (Security Consideration)
  const addNewEmployee = async () => {
    if (!newEmployeeName || !newEmployeePosition) {
      setResponseMessage('Fill all details!');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Security
        },
        body: JSON.stringify({
          name: newEmployeeName,
          position: newEmployeePosition
        }),
      });

      if (response.ok) {
        setResponseMessage('Employee Added Successfully!');
        fetchEmployees(); // కొత్తగా ఫెచ్ చేస్తాం
      } else {
        setResponseMessage('Failed to Add Employee');
      }
    } catch (error) {
      console.error('Add Employee Error:', error);
      setResponseMessage('Server Error!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Employee Management (ఉద్యోగి నిర్వహణ)</h1>

      {/* ---- Steps Explained in Telugu ---- */}
      <div style={{ backgroundColor: '#e8f0fe', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>Step by Step Process (ప్రతీ దశ వివరించండి)</h2>
        <ol style={{ lineHeight: '2' }}>
          <li><strong>Step 1:</strong> <br /> <span>useState తో Employees Array, Loading Flag మరియు Response Message ని డిక్లేర్ చేసాం.</span></li>
          <li><strong>Step 2:</strong> <br /> <span>useEffect లో Employees ని API నుంచి ఫెచ్ చేస్తున్నాం. Fetch అయ్యేంతవరకూ Loading... చూపిస్తున్నాం.</span></li>
          <li><strong>Step 3:</strong> <br /> <span>కొత్త ఉద్యోగిని జోడించడానికి ఫార్మ్ ఉంచాం. Submit చేసినప్పుడు, Authorization Token తో డేటా పంపుతున్నాం.</span></li>
          <li><strong>Step 4:</strong> <br /> <span>Successfully Add అయితే Message చూపిస్తున్నాం. మళ్ళీ Refresh చేయకుండా New Employee ని Fetch చేస్తున్నాం.</span></li>
          <li><strong>Step 5:</strong> <br /> <span>ఏ Error వస్తే, Console లో Error చూపిస్తూ, యూజర్ కు Error Message చూపిస్తున్నాం.</span></li>
        </ol>
      </div>

      {/* ---- Form for Adding Employee ---- */}
      <div style={{ marginBottom: '20px' }}>
        <h3>కొత్త ఉద్యోగిని జోడించండి</h3>
        <input
          type="text"
          placeholder="Employee Name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px' }}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployeePosition}
          onChange={(e) => setNewEmployeePosition(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '5px' }}
        />
        <button onClick={addNewEmployee} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>Add Employee</button>
      </div>

      {responseMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{responseMessage}</p>}

      {/* ---- Employee List ---- */}
      <div>
        <h2>ఉద్యోగుల జాబితా:</h2>
        {loading ? (
          <p>Data Loading... Please Wait!</p>
        ) : (
          <ul>
            {employees.map((emp) => (
              <li key={emp.id} style={{ padding: '5px 0' }}>
                {emp.name} - {emp.position}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
