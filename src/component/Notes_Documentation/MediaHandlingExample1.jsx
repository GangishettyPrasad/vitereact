import React, { useState, useEffect } from 'react';

const MediaHandlingExample1 = () => {
  // State hooks for each type of data
  const [textData, setTextData] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  // Fetching Text Data
  useEffect(() => {
    fetch('https://api.example.com/text')
      .then(response => response.text())
      .then(data => setTextData(data))
      .catch(error => console.error('Error fetching text data:', error));
  }, []);

  // Fetching Audio Data
  useEffect(() => {
    fetch('https://api.example.com/audio')
      .then(response => response.blob())
      .then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      })
      .catch(error => console.error('Error fetching audio data:', error));
  }, []);

  // Fetching Video Data
  useEffect(() => {
    fetch('https://api.example.com/video')
      .then(response => response.blob())
      .then(blob => {
        const videoUrl = URL.createObjectURL(blob);
        setVideoSrc(videoUrl);
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, []);

  // Fetching Image Data
  useEffect(() => {
    fetch('https://api.example.com/image')
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      })
      .catch(error => console.error('Error fetching image data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>React Media Handling Example</h1>

      {/* 1. Text Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>1. టెక్స్ట్ డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> టెక్స్ట్ డేటా సాధారణంగా JSON లేదా plain text రూపంలో పొందబడుతుంది. 
          ఈ డేటా API నుండి సాధారణ టెక్స్ట్ గా తీసుకోబడుతుంది మరియు ఉపయోగించిన తర్వాత UI లో ప్రదర్శించబడుతుంది.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/text')
  .then(response => response.text())
  .then(data => setTextData(data));`}
            </code>
          </pre>
        </p>
        <p><strong>Received Text Data:</strong> {textData}</p>
      </div>

      {/* 2. Audio Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>2. ఆడియో డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> ఆడియో డేటా సాధారణంగా **Blob** ఫార్మాట్‌లో ఉంటుంది. 
          ఈ డేటా ప్రాసెస్ చేసి, ఆ తరువాత **URL.createObjectURL()** ద్వారా ఆడియో ఫైల్‌ను ప్రదర్శించవచ్చు.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/audio')
  .then(response => response.blob())
  .then(blob => {
    const audioUrl = URL.createObjectURL(blob);
    setAudioSrc(audioUrl);
  });`}
            </code>
          </pre>
        </p>
        {audioSrc && <audio controls src={audioSrc}>Your browser does not support the audio element.</audio>}
      </div>

      {/* 3. Video Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>3. వీడియో డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> వీడియో డేటా కూడా బ్లాబ్ రూపంలో ఉంటుంది. 
          ఈ వీడియోను **URL.createObjectURL()** ద్వారా క్రియేట్ చేసి, వీడియో ప్లేయర్ ద్వారా ప్రదర్శించవచ్చు.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/video')
  .then(response => response.blob())
  .then(blob => {
    const videoUrl = URL.createObjectURL(blob);
    setVideoSrc(videoUrl);
  });`}
            </code>
          </pre>
        </p>
        {videoSrc && <video controls width="100%">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>}
      </div>

      {/* 4. Image Data Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#3E4E55' }}>4. ఇమేజ్ డేటా</h2>
        <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          <strong>వివరణ:</strong> ఇమేజ్ డేటా బైనరీ (Blob) రూపంలో ఉంటుంది. 
          ఇమేజ్ URL క్రియేట్ చేసి, దానిని వెబ్‌పేజీలో ప్రదర్శించవచ్చు.
        </p>
        <p style={{ backgroundColor: '#e1f7d5', padding: '15px', borderRadius: '5px' }}>
          <strong>ఉదాహరణ:</strong> <br />
          <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
            <code>
              {`fetch('https://api.example.com/image')
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);
  });`}
            </code>
          </pre>
        </p>
        {imageSrc && <img src={imageSrc} alt="Fetched Image" style={{ width: '100%', borderRadius: '5px' }} />}
      </div>
    </div>
  );
};

export default MediaHandlingExample1;
