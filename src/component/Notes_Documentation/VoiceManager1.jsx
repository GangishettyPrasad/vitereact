import React, { useState, useRef } from 'react';

function VoiceRecorderUploader() {
  const [voiceFile, setVoiceFile] = useState(null); // ఫైల్ సెలెక్ట్ చేసినప్పుడు
  const [recording, setRecording] = useState(false); // రికార్డింగ్ స్టేటస్
  const [mediaRecorder, setMediaRecorder] = useState(null); // మైక్రోఫోన్ రికార్డర్
  const [audioUrl, setAudioUrl] = useState(null); // ప్లేబ్యాక్ కోసం
  const chunks = useRef([]); // రికార్డ్ అవుతున్న డేటా స్టోర్

  // ఫైల్ సెలెక్ట్ చేసినప్పుడు
  const handleFileChange = (e) => {
    setVoiceFile(e.target.files[0]);
    setAudioUrl(URL.createObjectURL(e.target.files[0]));
  };

  // రికార్డింగ్ ప్రారంభించు
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setVoiceFile(blob);
        chunks.current = [];
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Mic Access Error:', error);
    }
  };

  // రికార్డింగ్ ఆపు
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  // వాయిస్ అప్లోడ్ చేయడం
  const uploadVoice = async () => {
    if (!voiceFile) {
      alert('దయచేసి ఫైల్ సెలెక్ట్ చేయండి లేదా రికార్డ్ చేయండి!');
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
        alert('వాయిస్ అప్లోడ్ విజయవంతం!');
      } else {
        alert('అప్లోడ్ విఫలమైంది!');
      }
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>🎤 వాయిస్ రికార్డ్ చేయడం లేదా అప్లోడ్ చేయడం</h1>

      {/* File Selection */}
      <section style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e1f7d5', borderRadius: '10px' }}>
        <h2>📂 ఫైల్ నుండి అప్లోడ్</h2>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <p>ఒక ఇప్పటికే ఉన్న వాయిస్ ఫైల్ ని ఎంపిక చేయండి.</p>
      </section>

      {/* Recording */}
      <section style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#fce4ec', borderRadius: '10px' }}>
        <h2>🎙️ బ్రౌజర్ ద్వారా రికార్డ్ చేయడం</h2>
        {!recording ? (
          <button onClick={startRecording} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
            రికార్డ్ ప్రారంభించండి
          </button>
        ) : (
          <button onClick={stopRecording} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px' }}>
            రికార్డ్ ఆపు
          </button>
        )}
        <p>మీరు నేరుగా మైక్రోఫోన్ ఉపయోగించి వాయిస్ రికార్డ్ చేయవచ్చు.</p>
      </section>

      {/* Audio Preview */}
      {audioUrl && (
        <section style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h2>🎧 వాయిస్ ప్లే చేయండి</h2>
          <audio controls src={audioUrl}></audio>
        </section>
      )}

      {/* Upload Button */}
      <section style={{ textAlign: 'center' }}>
        <button onClick={uploadVoice} style={{ padding: '15px 30px', backgroundColor: '#2196F3', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '8px' }}>
          వాయిస్ అప్లోడ్ చేయండి
        </button>
      </section>
    </div>
  );
}

export default VoiceRecorderUploader;
