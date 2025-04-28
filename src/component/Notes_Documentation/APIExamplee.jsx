import React, { useState, useEffect } from 'react';

const APIExamplee = () => {
  const [receivedData, setReceivedData] = useState(null);
  const [sendData, setSendData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  // Fetch Data Function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/data');
      
      // Error Handling if response is not OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReceivedData(data);
      } else if (contentType && contentType.includes('text/plain')) {
        const data = await response.text();
        setReceivedData(data);
      } else if (contentType && contentType.includes('image')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        setError('Unsupported content type');
      }
    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send Data Function
  const sendDataToAPI = async () => {
    if (!sendData.trim()) {
      setError('Please enter some data to send');
      return;
    }
    
    // Define authToken here, you can replace it with actual token retrieval logic
    const authToken = 'your-jwt-token';  // Replace this with actual token logic, e.g., from localStorage

    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,  // Add authorization header
        },
        body: JSON.stringify({ data: sendData }),
      });

      const result = await response.json();
      console.log('Data sent successfully:', result);
    } catch (err) {
      setError('Failed to send data: ' + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Data Handling Examples</h1>

      {/* Error Handling Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>1. Error Handling (ఎర్రర్ హ్యాండ్లింగ్)</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Explanation:</strong> If the API response is not `200 OK`, an error message is shown to the user.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>Example:</strong> 
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
{`const response = await fetch('https://api.example.com/data');
if (!response.ok) {
  throw new Error('Network response was not ok');
}
// Continue with response handling`}
          </pre>
        </p>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>

      {/* Loading State Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>2. Loading State (లోడింగ్ స్టేట్)</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Explanation:</strong> A loading state is useful to let the user know that data is being fetched or a request is in progress.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>Example:</strong> 
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
{`const [loading, setLoading] = useState(false);
const fetchData = async () => {
  setLoading(true);
  const response = await fetch('https://api.example.com/data');
  setLoading(false);
};
return loading ? <div>Loading...</div> : <div>Data: {receivedData}</div>;`}
          </pre>
        </p>
        {loading ? <div>Loading...</div> : <div>Data: {receivedData}</div>}
      </div>

      {/* Form Validation Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>3. Form Validation (ఫారమ్ వాలిడేషన్)</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Explanation:</strong> It’s important to validate user input before sending data to an API to ensure valid data.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>Example:</strong> 
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
{`const sendDataToAPI = async () => {
  if (!sendData.trim()) {
    setError('Please enter some data to send');
    return;
  }
}`}
          </pre>
        </p>
        <input
          type="text"
          value={sendData}
          onChange={(e) => setSendData(e.target.value)}
          placeholder="Enter data to send"
        />
        <button onClick={sendDataToAPI}>Send Data</button>
      </div>

      {/* Security Considerations Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>4. Security Considerations (భద్రతా మార్గదర్శకాలు)</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Explanation:</strong> Always ensure that sensitive data is securely transmitted using authentication tokens (e.g., JWT).
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>Example:</strong> 
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
{`const authToken = 'your-jwt-token';
const response = await fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer {$authToken}..like this is {$authToken variable}\`
  },
});
`}
          </pre>
        </p>
      </div>

      {/* Image Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>5. Image Data (ఇమేజ్ డేటా)</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Explanation:</strong> Image data is received as a Blob and converted into a URL for display.
        </p>
        <img src={imageSrc} alt="Fetched Image" style={{ width: '100%', borderRadius: '5px' }} />
      </div>
    </div>
  );
};

export default APIExamplee;
