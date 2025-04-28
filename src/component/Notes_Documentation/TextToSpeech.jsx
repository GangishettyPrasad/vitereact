import React, { useState } from 'react';
import axios from 'axios';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post('https://api.ibm.com/tts/v1/synthesize', {
        text,
        voice: 'en-US_AllisonVoice',
      }, {
        headers: {
          'Authorization': `Bearer YOUR_IBM_API_KEY`,
        },
      });
      const audio = new Audio(URL.createObjectURL(response.data));
      audio.play();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Text to Speech API (IBM Watson)</h2>
      <p><strong>Text-to-Speech APIs వివరణ:</strong> IBM Watson Text-to-Speech API ద్వారా మీరు టెక్స్ట్‌ను ఆడియోలో మార్చవచ్చు.</p>
      <p><strong>UI వివరణ:</strong> యూజర్ ఇన్పుట్ చేసిన టెక్స్ట్‌ను IBM Watson APIకి పంపి, ఆడియోగా ప్లే చేస్తాము.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to convert to speech"
      />
      <button onClick={handleTextToSpeech}>Convert to Speech</button>
    </div>
  );
};

export default TextToSpeech;
