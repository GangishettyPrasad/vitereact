import React, { useState } from 'react';

// Sample JSON data with nested arrays and objects
const initialAuditLogs = [
  {
    logId: "LOG1001",
    user: "Ajay",
    action: "Updated Profile",
    timestamp: "2025-04-01T10:22:00Z",
    details: {
      fieldsUpdated: [
        { field: "email", oldValue: "old@example.com", newValue: "new@example.com" },
        { field: "mobile", oldValue: "1234567890", newValue: "9876543210" }
      ],
      location: "Office",
      ip: "192.168.1.1"
    }
  },
  {
    logId: "LOG1002",
    user: "Bhanu",
    action: "Reset Password",
    timestamp: "2025-04-02T15:30:00Z",
    details: {
      fieldsUpdated: [],
      location: "Home",
      ip: "192.168.1.2"
    }
  }
];

const AuditLogWithNestedData = () => {
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [editingLog, setEditingLog] = useState(null);
  const [newLog, setNewLog] = useState({
    logId: "",
    user: "",
    action: "",
    timestamp: "",
    details: {
      fieldsUpdated: [],
      location: "",
      ip: ""
    }
  });

  // Create a new audit log
  const handleCreate = () => {
    setAuditLogs([...auditLogs, newLog]);
    setNewLog({ logId: "", user: "", action: "", timestamp: "", details: { fieldsUpdated: [], location: "", ip: "" } });
  };

  // Update an existing audit log
  const handleUpdate = (logId) => {
    const updatedLogs = auditLogs.map((log) =>
      log.logId === logId ? { ...log, ...editingLog } : log
    );
    setAuditLogs(updatedLogs);
    setEditingLog(null);
  };

  // Delete a log
  const handleDelete = (logId) => {
    setAuditLogs(auditLogs.filter((log) => log.logId !== logId));
  };

  return (
    <div className="container mt-4">
      <h4>🔍 Audit Log with Nested Arrays and Objects - CRUD Operations</h4>
    <div>Form Setup:

మేము కొత్త లాగ్ క్రియేట్ చేయడానికి ఒక ఫారం సృష్టించాం. ఇందులో logId, user, action, timestamp (తేదీ మరియు సమయం) వంటి ముఖ్యమైన ఫీల్డ్స్ ఉంటాయి.

అలాగే, details అనే భాగం కూడా ఉంది, ఇది అనేక లెక్కింపు ఫీల్డ్స్‌ను కలిగి ఉంటుంది, ఉదాహరణకు, fieldsUpdated (మార్పు చేసిన ఫీల్డ్స్), location (స్థలం), మరియు ip (ఐపి అడ్రస్).

Form Input:

మీరు ఫారం ద్వారా సమాచారం ఇవ్వగలరు. ఉదాహరణకి:

logId: లాగ్ యొక్క గుర్తింపు

user: యూజర్ పేరు

action: యూజర్ చేసిన చర్య (ఉదా: "Updated Profile")

timestamp: లాగ్ నమోదు చేసిన తేదీ మరియు సమయం

Add New Log:

"Add New Log" బటన్‌ను క్లిక్ చేయడం ద్వారా ఈ కొత్త లాగ్ సమాచారాన్ని auditLogs లిస్ట్ లో జతచేస్తుంది.

Step 2: లాగ్ సవరించటం (Update Log)
Edit Option:

లాగ్‌ను సవరించడానికి మీరు "Edit" బటన్‌ను క్లిక్ చేస్తే, ఆ లాగ్ ఫీల్డ్స్ అన్ని ఎడిట్ చేయడానికి తెరవబడతాయి.

Update Fields:

మీరు సవరించిన ఎడిట్ ఫీల్డ్స్‌ను కొత్త విలువలతో అప్‌డేట్ చేయవచ్చు. ఉదాహరణకి:

user: యూజర్ పేరు

action: చర్య

timestamp: తేదీ/సమయం

Save Changes:

ఆ తర్వాత, "Update Log" బటన్‌ను క్లిక్ చేయడం ద్వారా సవరించిన లాగ్‌ను auditLogs లో పునఃస్థాపించవచ్చు.

Step 3: లాగ్ తీసివేయటం (Delete Log)
Delete Option:

"Delete" బటన్‌ను క్లిక్ చేసి, మీరు ఆ లాగ్‌ను తీసివేయవచ్చు.

Remove Log:

లాగ్ తీసివేయడం ద్వారా, ఆ లాగ్ auditLogs నుండి పూర్తిగా తొలగించబడుతుంది.

Step 4: లాగ్‌ను ప్రదర్శించటం (Display Logs)
Rendering Logs:

మేము అన్ని లాగ్స్‌ను UIలో చూపిస్తాము. ప్రతి లాగ్ యొక్క ముఖ్యమైన వివరాలు user, action, timestamp, location, ip ప్రదర్శిస్తాము.

Nested Fields:

fieldsUpdated అనే భాగంలో ఉన్న మార్పులు ఒక పట్టికలో చూపిస్తాము. ఇది సైట్లో మార్పులు చేసిన ఫీల్డ్స్ ను ఇన్నర్లతో చూపిస్తుంది.

Step 5: Nested Arrays & Objects Handling
Nested JSON Structure:

ఈ లాగ్స్ లోని details అనే భాగంలో అనేక "fieldsUpdated" అనే nested array ఉంటుంది. ఇది ఏవైనా మార్పులు చేసిన ఫీల్డ్స్‌ను ఉంచుతుంది.

ప్రతి ఫీల్డ్ field, oldValue, మరియు newValue కలిగి ఉంటుంది. ఇది చరిత్ర (history) ను ట్రాక్ చేయడంలో సహాయపడుతుంది.

Nested Array Rendering:

fieldsUpdated అనే array లోని మార్పులను ఒక table లో ప్రదర్శించబడుతుంది.

Step 6: క్రియేట్, సవరించు మరియు తీసివేయు (CRUD Operations)
Create: కొత్త లాగ్‌ను సృష్టించండి.

Read: లాగ్లను UIలో చూపించండి.

Update: ఒక లాగ్‌ను ఎడిట్ చేయండి.

Delete: ఒక లాగ్‌ను తీసివేయండి.

Step 7: వాడకం (Usage)
మీరు ఈ క్రియాత్మక లాగ్ వ్యవస్థను అభివృద్ధి చేసిన తర్వాత, ఇది ఇతర డేటాను కూడా CRUD ఆపరేషన్లతో హాండిల్ చేయడానికి ఉపయోగపడుతుంది.

ఈ విధంగా మీరు నెట్‌వర్క్‌/డేటాబేస్‌ని ఏదైనా API ద్వారా కనెక్ట్ చేసి, డేటాను పోస్టు (POST), అప్‌డేట్ (PUT), డిలీట్ (DELETE) చేయవచ్చు.

💡 సారాంశం (Summary)
ఈ క్రియాత్మక టేబుల్ మరియు CRUD ఆపరేషన్లు మాకు పెద్ద JSON డేటాను నిర్వహించడానికి సహాయపడతాయి, ఇది పెద్ద ప్రాజెక్టుల్లో ఉపయోగపడుతుంది, ఎక్కడైనా Nested Arrays మరియు Objects ఉండవచ్చు.

క్రియేట్, సవరించు, మరియు తీసివేయు ఆపరేషన్లు గమనించండి.</div>
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
          <p><strong>Location:</strong> {log.details.location}</p>
          <p><strong>IP Address:</strong> {log.details.ip}</p>

          {log.details.fieldsUpdated.length > 0 ? (
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                </tr>
              </thead>
              <tbody>
                {log.details.fieldsUpdated.map((change, index) => (
                  <tr key={index}>
                    <td>{change.field}</td>
                    <td>{change.oldValue}</td>
                    <td>{change.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No fields updated.</p>
          )}

          <button onClick={() => setEditingLog(log)}>Edit</button>
          <button onClick={() => handleDelete(log.logId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AuditLogWithNestedData;
