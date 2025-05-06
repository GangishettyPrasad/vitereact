import React, { useState } from 'react';

const ChatMessageCrud = () => {
  const [messages, setMessages] = useState([
    {
      messageId: 1,
      sender: 'Ajay',
      receiver: 'Ravi',
      timestamp: '2025-05-05T14:30:00',
      message: 'Hello Ravi!'
    },
    {
      messageId: 2,
      sender: 'Ravi',
      receiver: 'Ajay',
      timestamp: '2025-05-05T14:31:00',
      message: 'Hi Ajay! How are you?'
    }
  ]);

  const [formData, setFormData] = useState({
    messageId: '',
    sender: '',
    receiver: '',
    timestamp: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    const newMsg = { ...formData, messageId: Number(formData.messageId) };

    const exists = messages.some(msg => msg.messageId === newMsg.messageId);
    if (exists) {
      setMessages(messages.map(msg => msg.messageId === newMsg.messageId ? newMsg : msg));
    } else {
      setMessages([...messages, newMsg]);
    }

    setFormData({
      messageId: '',
      sender: '',
      receiver: '',
      timestamp: '',
      message: ''
    });
  };

  const handleEdit = (msg) => {
    setFormData({ ...msg });
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.messageId !== id));
  };

  return (
    <div className="container">
      <h2>💬 Chat Messages Table</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#eee' }}>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Timestamp</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg.messageId}>
              <td>{msg.messageId}</td>
              <td>{msg.sender}</td>
              <td>{msg.receiver}</td>
              <td>{msg.timestamp}</td>
              <td>{msg.message}</td>
              <td>
                <button onClick={() => handleEdit(msg)}>Edit</button>{' '}
                <button onClick={() => handleDelete(msg.messageId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{formData.messageId && messages.find(m => m.messageId === Number(formData.messageId)) ? 'Update Message' : 'Add Message'}</h3>

      <input name="messageId" placeholder="Message ID" value={formData.messageId} onChange={handleChange} />
      <input name="sender" placeholder="Sender" value={formData.sender} onChange={handleChange} />
      <input name="receiver" placeholder="Receiver" value={formData.receiver} onChange={handleChange} />
      <input name="timestamp" type="datetime-local" value={formData.timestamp} onChange={handleChange} />
      <input name="message" placeholder="Message" value={formData.message} onChange={handleChange} />

      <button onClick={handleAddOrUpdate}>
        {formData.messageId && messages.find(m => m.messageId === Number(formData.messageId)) ? 'Update' : 'Add'}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f3f3f3', padding: '20px', borderRadius: '10px' }}>
        <h4>📘 Telugu UI Steps</h4>
        <ol>
          <li><strong>Step 1:</strong> Chat JSON data ని `useState` లో పెట్టాం</li>
          <li><strong>Step 2:</strong> Message list ని table format లో చూపించాం</li>
          <li><strong>Step 3:</strong> Input form తో కొత్త message add/edit చేసేలా చేశాం</li>
          <li><strong>Step 4:</strong> Timestamp ఫార్మాట్ `datetime-local` input తీసుకున్నాం</li>
          <li><strong>Step 5:</strong> Edit చేసినపుడు form లో existing data pre-fill అవుతుంది</li>
          <li><strong>Step 6:</strong> Delete తో message remove అవుతుంది</li>
          <li><strong>Step 7:</strong> Final form submit తరువాత inputs reset చేస్తాం</li>
        </ol>
      </div>
    </div>
  );
};

export default ChatMessageCrud;
