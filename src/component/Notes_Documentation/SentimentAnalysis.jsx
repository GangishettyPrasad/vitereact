import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalysis() {
  // Step 1: State Variables
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Step 2: Analyze Sentiment function
  const analyzeSentiment = async () => {
    if (!textInput.trim()) {
      setError('దయచేసి ఒక సందేశాన్ని నమోదు చేయండి');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // API Call to analyze sentiment
      const response = await axios.post(
        'https://language.googleapis.com/v1/documents:analyzeSentiment?key=YOUR_API_KEY',
        {
          document: {
            type: 'PLAIN_TEXT',
            content: textInput,
          },
        }
      );
      setResult(response.data.documentSentiment.score > 0 ? 'పాజిటివ్' : 'నెగటివ్');
    } catch (err) {
      setError('సెంటిమెంట్ అనాలిసిస్ లోపం');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#3E4E55' }}>Sentiment Analysis (సెంటిమెంట్ అనాలిసిస్)</h2>
      <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <strong>1. Text Input (టెక్స్ట్ ఇన్‌పుట్ ఫీల్డ్):</strong> ఈ టెక్స్ట్ బాక్స్ ద్వారా యూజర్ తన సందేశాన్ని టైప్ చేయవచ్చు.
      </p>
      <textarea
        id="textInput"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows="5"
        style={{ width: '100%', padding: '10px' }}
      />
      
      <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <strong>2. Analyze Sentiment Button (Sentiment అనాలిసిస్ బటన్):</strong> 
        ఈ బటన్ క్లిక్ చేస్తే, Sentiment Analysis API ను కాల్ చేసి, టెక్స్ట్ యొక్క సెంటిమెంట్ ను తెలుసుకోవచ్చు.
      </p>
      <button
        onClick={analyzeSentiment}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Analyze Sentiment
      </button>

      {loading && <p>లోడింగ్...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <strong>3. Sentiment Result (సెంటిమెంట్ ఫలితం):</strong> API నుండి ఫలితం వచ్చిన తర్వాత, యూజర్ కు సెంటిమెంట్ (పాజిటివ్, నెగటివ్, న్యూట్రల్) చూపబడుతుంది.
      </p>
      {result && (
        <p style={{ marginTop: '20px' }}>
          <strong>Result:</strong> {result}
        </p>
      )}

      <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <strong>4. Error Handling (లోపాలు నిర్వహణ):</strong> 
        ఎటువంటి లోపం వస్తే, అది UI లో ఎర్రర్ మెసేజ్ గా చూపబడుతుంది.
      </p>
      <p>
        **Real-time Example (రియల్-టైమ్ ఉదాహరణ)**: 
        ఒక ఫీడ్‌బ్యాక్ యాప్‌లో, మీరు ఈ **Sentiment Analysis** ఫీచర్‌ని ఉపయోగించి యూజర్ ఇచ్చిన ఫీడ్‌బ్యాక్‌ను పాజిటివ్, నెగటివ్ లేదా న్యూట్రల్‌గా కేటగిరీ చేయవచ్చు.
      </p>

      <p style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        <strong>5. API Call (API కాల్):</strong> 
        టెక్స్ట్ పంపడానికి, టెక్స్ట్‌ను **POST** ద్వారా APIకి పంపుతాము. 
      </p>
      <pre style={{ display: 'block', backgroundColor: '#e1f7d5', padding: '10px', borderRadius: '5px' }}>
       {`const response = await axios.post('
          'https://language.googleapis.com/v1/documents:analyzeSentiment?key=YOUR_API_KEY',
          {{
          document: {
            type: 'PLAIN_TEXT',
            content: textInput,
        }};`} 
      </pre>
    </div>
  );
}

export default SentimentAnalysis;
