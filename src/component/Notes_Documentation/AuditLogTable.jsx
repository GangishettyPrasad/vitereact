import React from 'react';
import AuditLogWithCRUD from './AuditLogWithCRUD';

const auditLogs = [
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

const AuditLogTable = () => {
  return (
    <div className="container mt-4">
        <h5>audit log curd below ex : if you want you can comment</h5>
        <AuditLogWithCRUD/>
      <h4>🔍 Audit Log Table</h4>

      {/* Telugu Explanation */}
      <div className="bg-light p-3 mb-4 rounded border">
        <h5>📘 స్టెప్ బై స్టెప్ వివరణ:</h5>
        <ol>
          <li>Step 1: Audit Log అంటే user action history</li>
          <li>Step 2: JSON structure లో action, user, timestamp ఉంటాయి</li>
          <li>Step 3: changes అనే nested array ఉంటుంది — ఫీల్డ్స్ update అయ్యాయా అనే వివరాలతో</li>
          <li>Step 4: React లో మేము map చేసి ప్రతి log card/table రూపంలో చూపిస్తాం</li>
          <li>Step 5: changes ఉంటే nested map చేసి old → new values చూపించాలి</li>
          <li>Step 6: Empty changes array ఉన్నా fallback UI ఇవ్వాలి</li>
          <li>Step 7: Styling clean గా ఉండాలి for readability</li>
        </ol>
      </div>

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
           <div>
           <p>no changes made . </p>
           </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuditLogTable;
