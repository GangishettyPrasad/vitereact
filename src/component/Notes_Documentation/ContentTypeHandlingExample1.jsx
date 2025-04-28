import React, { useState, useEffect } from 'react';

const ContentTypeHandlingExample1 = () => {
  // States to store received data
  const [receivedData, setReceivedData] = useState('');
  const [error, setError] = useState('');

  // State for sending data
  const [sendData, setSendData] = useState('');
  
  // Function to fetch and handle different data types
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const contentType = response.headers.get('Content-Type');

      // Check if contentType is JSON
      if (contentType.includes('application/json')) {
        const data = await response.json();
        setReceivedData(JSON.stringify(data, null, 2));
      } 
      // Check if contentType is plain text
      else if (contentType.includes('text/plain')) {
        const data = await response.text();
        setReceivedData(data);
      } 
      // Check if contentType is XML
      else if (contentType.includes('application/xml')) {
        const data = await response.text();
        setReceivedData(data);  // You may want to parse XML if necessary
      } 
      // Check if contentType is Image
      else if (contentType.includes('image')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setReceivedData(<img src={imageUrl} alt="Fetched Image" />);
      } 
      // Check if contentType is Audio
      else if (contentType.includes('audio')) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setReceivedData(<audio controls src={audioUrl}>Your browser does not support the audio element.</audio>);
      } 
      // Check if contentType is Video
      else if (contentType.includes('video')) {
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        setReceivedData(<video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>);
      } 
      else {
        setReceivedData('Unknown content type');
      }
    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
    }
  };

  // Function to send data with the appropriate Content-Type
  const sendDataToAPI = async () => {
    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify({ data: sendData }), // Sending JSON data
      });

      const result = await response.json();
      console.log('Data sent successfully:', result);
    } catch (err) {
      console.error('Error sending data:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#4CAF50' }}>Content-Type Identification and Sending Data</h1>
      
      {/* 1. Fetching Data */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>1. Received Data</h2>
        <button onClick={fetchData} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Fetch Data
        </button>
        <div style={{ marginTop: '20px', backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>Received Data:</strong>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            {receivedData || error}
          </pre>
        </div>
      </div>

      {/* 2. Sending Data */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>2. Send Data</h2>
        <textarea
          value={sendData}
          onChange={(e) => setSendData(e.target.value)}
          placeholder="Enter data to send"
          rows="4"
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
        />
        <button
          onClick={sendDataToAPI}
          style={{
            padding: '10px',
            backgroundColor: '#FF5722',
            color: 'white',
            marginTop: '10px',
            borderRadius: '5px',
          }}
        >
          Send Data
        </button>
      </div>

      {/* Explanation Section */}
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ color: '#3E4E55' }}>Content-Type Handling Explanations in Telugu</h2>
        
        {/* Data Reception Identification */}
        <div style={{ marginBottom: '30px' }}>
          <h3>1. Data Reception Identification:</h3>
          <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
            మీరు API నుండి వచ్చిన డేటా యొక్క ప్రాకారాన్ని తెలుసుకోవాలంటే, మీరు <code>response.headers.get('Content-Type')</code> ద్వారా <strong>Content-Type</strong> ను చూసి ఆ డేటా యొక్క ప్రాకారాన్ని అర్ధం చేసుకోవచ్చు.
          </p>
          <h4>ఉదాహరణ:</h4>
          <ul>
            <li><strong>JSON డేటా:</strong> <code>application/json</code> Content-Type తో వస్తుంది. ఈ డేటాను <code>response.json()</code> ద్వారా పొందవచ్చు.</li>
            <li><strong>టెక్స్ట్ డేటా:</strong> <code>text/plain</code> Content-Type తో వస్తుంది. దీనిని <code>response.text()</code> ద్వారా పొందవచ్చు.</li>
            <li><strong>XML డేటా:</strong> <code>application/xml</code> Content-Type తో వస్తుంది. దీనిని <code>response.text()</code> ద్వారా పొందవచ్చు, కానీ మీరు XML ని parse కూడా చేయవచ్చు.</li>
            <li><strong>ఇమేజ్ డేటా:</strong> <code>image/jpeg</code>, <code>image/png</code> వంటి Content-Type తో వస్తుంది. దీనిని <code>response.blob()</code> ద్వారా పొందాలి మరియు <code>URL.createObjectURL()</code> ద్వారా ప్రదర్శించాలి.</li>
            <li><strong>ఆడియో/వీడియో డేటా:</strong> <code>audio/mpeg</code>, <code>video/mp4</code> వంటి Content-Type తో వస్తుంది. <code>response.blob()</code> ద్వారా వీటిని పొందవచ్చు మరియు <code>URL.createObjectURL()</code> ద్వారా ప్రదర్శించాలి.</li>
          </ul>
        </div>

        {/* Data Sending */}
        <div>
          <h3>2. Data Sending:</h3>
          <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
            డేటాను API కి పంపడానికి, మీరు <strong>Content-Type</strong> ని సరైన రీతిలో సెట్ చేయాలి.
          </p>
          <h4>ఉదాహరణ:</h4>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            {`
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // JSON డేటా
  },
  body: JSON.stringify({ data: sendData }), // డేటాను JSON గా పంపండి
});
            `}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeHandlingExample1;
