import React, { useState, useEffect } from 'react';

const ContentTypeHandlingExample = () => {
  // State hooks for each type of data
  const [jsonData, setJsonData] = useState('');
  const [textData, setTextData] = useState('');
  const [xmlData, setXmlData] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');

  // Fetch data and check Content-Type
  useEffect(() => {
    // Example: Fetching JSON data
    fetch('https://api.example.com/data.json')
      .then(response => {
        // Check the Content-Type of the response
        const contentType = response.headers.get('Content-Type');
        
        // Handle JSON Data
        if (contentType && contentType.includes('application/json')) {
          response.json().then(data => setJsonData(JSON.stringify(data, null, 2)));
        }
        // Handle Text Data
        else if (contentType && contentType.includes('text/plain')) {
          response.text().then(data => setTextData(data));
        }
        // Handle XML Data
        else if (contentType && contentType.includes('application/xml')) {
          response.text().then(data => setXmlData(data));
        }
        // Handle Image Data
        else if (contentType && contentType.includes('image')) {
          response.blob().then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
          });
        }
        // Handle Audio Data
        else if (contentType && contentType.includes('audio')) {
          response.blob().then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            setAudioSrc(audioUrl);
          });
        }
        // Handle Video Data
        else if (contentType && contentType.includes('video')) {
          response.blob().then(blob => {
            const videoUrl = URL.createObjectURL(blob);
            setVideoSrc(videoUrl);
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>React Content-Type Handling Example</h1>

      {/* 1. JSON Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>1. JSON డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> JSON డేటా సాధారణంగా **application/json** Content-Type తో API నుండి పొందబడుతుంది.
          JSON డేటా సాధారణంగా సాఫ్ట్‌వేర్ వ్యవస్థలు లేదా వెబ్ API లలో ఉపయోగిస్తారు.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/data.json')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      response.json().then(data => setJsonData(JSON.stringify(data, null, 2)));
    }
  });`}
            </code>
          </pre>
        </p>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
          <code>{jsonData}</code>
        </pre>
      </div>

      {/* 2. Text Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>2. టెక్స్ట్ డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> టెక్స్ట్ డేటా సాధారణంగా **text/plain** Content-Type తో API నుండి పొందబడుతుంది.
          ఇది సాధారణంగా సర్వర్ నుండి సాధారణ టెక్స్ట్ లేదా ఇన్పుట్ డేటా సవరించడానికి ఉపయోగించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/text')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('text/plain')) {
      response.text().then(data => setTextData(data));
    }
  });`}
            </code>
          </pre>
        </p>
        <p><strong>Received Text Data:</strong> {textData}</p>
      </div>

      {/* 3. XML Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>3. XML డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> XML డేటా సాధారణంగా **application/xml** Content-Type తో API నుండి పొందబడుతుంది.
          ఇది సమాచారాన్ని పరస్పరం మార్పిడి చేసే సిస్టమ్స్ లో ఉపయోగించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/data.xml')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/xml')) {
      response.text().then(data => setXmlData(data));
    }
  });`}
            </code>
          </pre>
        </p>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
          <code>{xmlData}</code>
        </pre>
      </div>

      {/* 4. Image Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>4. ఇమేజ్ డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> ఇమేజ్ డేటా సాధారణంగా **image/jpeg**, **image/png** వంటి Content-Type తో API నుండి వస్తుంది.
          ఇది దృశ్య డేటాను ప్రదర్శించడానికి ఉపయోగించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/image')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('image')) {
      response.blob().then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      });
    }
  });`}
            </code>
          </pre>
        </p>
        {imageSrc && <img src={imageSrc} alt="Fetched Image" style={{ width: '100%', borderRadius: '5px' }} />}
      </div>

      {/* 5. Audio Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>5. ఆడియో డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> ఆడియో డేటా సాధారణంగా **audio/mpeg**, **audio/wav** వంటి Content-Type తో API నుండి వస్తుంది.
          ఇది సౌండ్ ఫైల్స్ వినడానికి ఉపయోగించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/audio')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('audio')) {
      response.blob().then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      });
    }
  });`}
            </code>
          </pre>
        </p>
        {audioSrc && <audio controls src={audioSrc}>Your browser does not support the audio element.</audio>}
      </div>

      {/* 6. Video Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>6. వీడియో డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> వీడియో డేటా సాధారణంగా **video/mp4**, **video/webm** వంటి Content-Type తో API నుండి వస్తుంది.
          ఇది వీడియో ఫైల్స్ ప్రదర్శించడానికి ఉపయోగించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/video')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('video')) {
      response.blob().then(blob => {
        const videoUrl = URL.createObjectURL(blob);
        setVideoSrc(videoUrl);
      });
    }
  });`}
            </code>
          </pre>
        </p>
        {videoSrc && <video controls width="100%">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>}
      </div>
    </div>
  );
};

export default ContentTypeHandlingExample;
