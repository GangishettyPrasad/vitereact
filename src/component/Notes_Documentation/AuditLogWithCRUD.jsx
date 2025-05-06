import React, { useState } from 'react';

// Sample initial JSON data
const initialAuditLogs = [
  {
    logId: "LOG1001",
    user: "Ajay",
    action: "Updated Profile",
    timestamp: "2025-04-01T10:22:00Z",
    changes: [
      { field: "email", oldValue: "old@example.com", newValue: "new@example.com" },
      { field: "mobile", oldValue: "1234567890", newValue: "9876543210" }
    ]
  },
  {
    logId: "LOG1002",
    user: "Bhanu",
    action: "Reset Password",
    timestamp: "2025-04-02T15:30:00Z",
    changes: []
  }
];

const AuditLogWithCRUD = () => {
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [editingLog, setEditingLog] = useState(null);
  const [newLog, setNewLog] = useState({
    logId: "",
    user: "",
    action: "",
    timestamp: "",
    changes: []
  });

  // Step 3: Create new audit log
  const handleCreate = () => {
    setAuditLogs([...auditLogs, newLog]);
    setNewLog({ logId: "", user: "", action: "", timestamp: "", changes: [] });
  };

  // Step 4: Update an existing log
  const handleUpdate = (logId) => {
    const updatedLogs = auditLogs.map((log) =>
      log.logId === logId ? { ...log, ...editingLog } : log
    );
    setAuditLogs(updatedLogs);
    setEditingLog(null);
  };

  // Step 5: Delete an audit log
  const handleDelete = (logId) => {
    setAuditLogs(auditLogs.filter((log) => log.logId !== logId));
  };

  return (
    <div className="container mt-4">
      <h4>🔍 Audit Log Table with CRUD</h4>

      {/* Step-by-step Telugu Explanation */}
      <div className="bg-light p-3 mb-4 rounded border">
        <h5>📘 స్టెప్ బై స్టెప్ వివరణ:</h5>
        <ol>
          <li>Step 1: అప్రూవ్డ్ ఆడిట్ లాగ్ డేటా యొక్క array</li>
          <li>Step 2: Create operation కోసం కొత్త లాగ్ ను form లో జోడించండి</li>
          <li>Step 3: Edit operation కోసం ఎడిట్ బటన్ పై క్లిక్ చేసి లాగ్‌ను మార్చండి</li>
          <li>Step 4: Delete operation తో ప్రస్తుత లాగ్‌ని తొలగించండి</li>
          <li>Step 5: అన్ని లాగ్‌లను చదవండి, కొత్తది జోడించండి, ఉన్నవి మార్చండి లేదా తొలగించండి</li>
        </ol>
      </div>

      {/* Create New Log */}
      <div>
        <h5>✍️ Create New Log</h5>
        <input
          type="text"
          placeholder="Log ID"
          value={newLog.logId}
          onChange={(e) => setNewLog({ ...newLog, logId: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={newLog.user}
          onChange={(e) => setNewLog({ ...newLog, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Action"
          value={newLog.action}
          onChange={(e) => setNewLog({ ...newLog, action: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newLog.timestamp}
          onChange={(e) => setNewLog({ ...newLog, timestamp: e.target.value })}
        />
        <button onClick={handleCreate}>Add New Log</button>
      </div>

      {/* Edit Existing Log */}
      {editingLog && (
        <div>
          <h5>Edit Log</h5>
          <input
            type="text"
            value={editingLog.user}
            onChange={(e) => setEditingLog({ ...editingLog, user: e.target.value })}
          />
          <input
            type="text"
            value={editingLog.action}
            onChange={(e) => setEditingLog({ ...editingLog, action: e.target.value })}
          />
          <input
            type="datetime-local"
            value={editingLog.timestamp}
            onChange={(e) => setEditingLog({ ...editingLog, timestamp: e.target.value })}
          />
          <button onClick={() => handleUpdate(editingLog.logId)}>Update Log</button>
        </div>
      )}

      {/* Display Audit Logs */}
      {auditLogs.map((log) => (
        <div key={log.logId} className="mb-3 p-3 border rounded shadow-sm">
          <h5>{log.user} - {log.action}</h5>
          <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>

          {log.changes.length > 0 ? (
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                </tr>
              </thead>
              <tbody>
                {log.changes.map((change, index) => (
                  <tr key={index}>
                    <td>{change.field}</td>
                    <td>{change.oldValue}</td>
                    <td>{change.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No changes made.</p>
          )}

          <button onClick={() => setEditingLog(log)}>Edit</button>
          <button onClick={() => handleDelete(log.logId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AuditLogWithCRUD;
