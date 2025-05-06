import React, { useState } from 'react';

const BankTransactionCrud = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-05-01',
      amount: 1500.00,
      type: 'Credit',
      status: 'Success'
    },
    {
      id: 2,
      date: '2025-05-03',
      amount: 700.00,
      type: 'Debit',
      status: 'Success'
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    date: '',
    amount: '',
    type: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    const updatedTx = {
      id: Number(formData.id),
      date: formData.date,
      amount: parseFloat(formData.amount),
      type: formData.type,
      status: formData.status
    };

    const exists = transactions.some(tx => tx.id === updatedTx.id);
    if (exists) {
      setTransactions(transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx));
    } else {
      setTransactions([...transactions, updatedTx]);
    }

    setFormData({ id: '', date: '', amount: '', type: '', status: '' });
  };

  const handleEdit = (tx) => {
    setFormData({
      id: tx.id,
      date: tx.date,
      amount: tx.amount,
      type: tx.type,
      status: tx.status
    });
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  return (
    <div className="container">
      <h2>🏦 Banking Transaction Table</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#eee' }}>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.date}</td>
              <td>₹{tx.amount.toFixed(2)}</td>
              <td>{tx.type}</td>
              <td>{tx.status}</td>
              <td>
                <button onClick={() => handleEdit(tx)}>Edit</button>{' '}
                <button onClick={() => handleDelete(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{formData.id && transactions.find(tx => tx.id === Number(formData.id)) ? 'Update Transaction' : 'Add Transaction'}</h3>

      <input name="id" placeholder="ID" value={formData.id} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <input name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="">Select Type</option>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="Success">Success</option>
        <option value="Pending">Pending</option>
      </select>

      <button onClick={handleAddOrUpdate}>
        {formData.id && transactions.find(tx => tx.id === Number(formData.id)) ? 'Update' : 'Add'}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '10px' }}>
        <h4>📘 Telugu UI Steps</h4>
        <ol>
          <li><strong>Step 1:</strong> Transaction JSON ను state గా తీసుకున్నాం</li>
          <li><strong>Step 2:</strong> Table లో transaction list చూపించాం</li>
          <li><strong>Step 3:</strong> Add / Edit కోసం inputs పెట్టాం</li>
          <li><strong>Step 4:</strong> Edit చేసేప్పుడు form లో existing data వస్తుంది</li>
          <li><strong>Step 5:</strong> Add లేదా Update అయినపుడు array లో మార్చి state update చేస్తాం</li>
          <li><strong>Step 6:</strong> Delete బటన్ ద్వారా transaction remove చేస్తాం</li>
          <li><strong>Step 7:</strong> Credit/Debit type ని dropdown తో చూపించాం</li>
        </ol>
      </div>
    </div>
  );
};

export default BankTransactionCrud;
