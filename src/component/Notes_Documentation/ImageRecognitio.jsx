import React, { useState } from 'react';
import axios from 'axios';

const ImageRecognitio = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAnalyzeImage = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://api.clarifai.com/v2/models/YOUR_MODEL_ID/outputs', formData, {
        headers: {
          'Authorization': `Bearer YOUR_CLARIFAI_API_KEY`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.outputs[0].data.concepts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Image Recognition API (Clarifai)</h2>
      <p><strong>Image Recognition APIs వివరణ:</strong> Clarifai API ద్వారా మీరు చిత్రాన్ని విశ్లేషించి, దానిలో ఉన్న అంశాలను గుర్తించవచ్చు.</p>
      <p><strong>UI వివరణ:</strong> యూజర్ చిత్రం ఫైల్‌ను అప్‌లోడ్ చేసిన తర్వాత, దాన్ని Clarifai APIకి పంపి ఫలితాలను ప్రదర్శిస్తాము.</p>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleAnalyzeImage}>Analyze Image</button>
      <div>
        <h3>Analysis Result:</h3>
        {result && result.map((item, index) => <p key={index}>{item.name}: {item.value}</p>)}
      </div>
    </div>
  );
};

export default ImageRecognitio;
