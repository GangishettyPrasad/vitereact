import React, { useState } from 'react';

const SpeechRecognition = () => {
  const [transcription, setTranscription] = useState('');

  const handleStartListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
    };

    recognition.start();
  };

  return (
    <div>
      <h2>Speech Recognition API (Google Speech-to-Text)</h2>
      <p><strong>Speech Recognition APIs వివరణ:</strong> Google Speech-to-Text API ద్వారా మీరు యూజర్ యొక్క ధ్వనిని వాక్యంగా మార్చవచ్చు.</p>
      <p><strong>UI వివరణ:</strong> 'Start Listening' బటన్‌ను క్లిక్ చేసిన తర్వాత, Speech Recognition API వాడి యూజర్ మాట్లాడిన వాక్యాన్ని టెక్స్ట్‌గా పొందుతాము.</p>
      <button onClick={handleStartListening}>Start Listening</button>
      <p>Transcription: {transcription}</p>
    </div>
  );
};

export default SpeechRecognition;
