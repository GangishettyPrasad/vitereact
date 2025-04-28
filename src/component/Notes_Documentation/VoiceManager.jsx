import React, { useState } from 'react';

function VoiceManager() {
  const [audioUrl, setAudioUrl] = useState(null); // వాయిస్ ఫెచ్ చేసేటప్పుడు URL కోసం
  const [voiceFile, setVoiceFile] = useState(null); // వాయిస్ అప్లోడ్ కోసం సెలెక్ట్ చేసిన ఫైల్

  // వాయిస్ ఫెచ్ చేసేటప్పుడు
  const fetchVoice = async () => {
    try {
      const response = await fetch('https://your-api.com/voicefile'); // మీరు మీ API URL మార్చుకోవాలి
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Voice Fetch Error:', error);
    }
  };

  // వాయిస్ అప్లోడ్ చేసేటప్పుడు
  const handleUpload = async () => {
    if (!voiceFile) {
      alert('దయచేసి వాయిస్ ఫైల్ సెలెక్ట్ చేయండి');
      return;
    }

    const formData = new FormData();
    formData.append('file', voiceFile);

    try {
      const response = await fetch('https://your-api.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('వాయిస్ ఫైల్ విజయవంతంగా అప్లోడ్ అయింది!');
      } else {
        alert('అప్లోడ్ విఫలమైంది!');
      }
    } catch (error) {
      console.error('Voice Upload Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>🎤 వాయిస్ మేనేజర్</h1>

      {/* Voice Fetch Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>📥 వాయిస్ ఫెచ్ చేయడం</h2>
        <p style={{ backgroundColor: '#e1f7d5', padding: '10px', borderRadius: '5px' }}>
          <strong>Step:</strong> మీరు బటన్ క్లిక్ చేసినప్పుడు, API నుండి వాయిస్ ఫెచ్ చేసి ప్లేయర్ ద్వారా వినిపించబడుతుంది.
        </p>
        <button onClick={fetchVoice} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          వాయిస్ ఫెచ్ చేయండి
        </button>

        {audioUrl && (
          <div style={{ marginTop: '20px' }}>
            <audio controls src={audioUrl}></audio>
          </div>
        )}
      </section>

      {/* Voice Upload Section */}
      <section style={{ padding: '20px', backgroundColor: '#f1f1f1', borderRadius: '8px' }}>
        <h2>📤 వాయిస్ అప్లోడ్ చేయడం</h2>
        <p style={{ backgroundColor: '#fce4ec', padding: '10px', borderRadius: '5px' }}>
          <strong>Step:</strong> మీరు వాయిస్ ఫైల్ సెలెక్ట్ చేసి "వాయిస్ అప్లోడ్ చేయండి" బటన్ ద్వారా Server కి పంపవచ్చు.
        </p>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setVoiceFile(e.target.files[0])}
          style={{ marginBottom: '15px' }}
        />
        <br />
        <button onClick={handleUpload} style={{ padding: '10px 20px', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '5px' }}>
          వాయిస్ అప్లోడ్ చేయండి
        </button>
      </section>
    </div>
  );
}

export default VoiceManager;
