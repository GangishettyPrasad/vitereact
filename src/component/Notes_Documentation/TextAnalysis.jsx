import React, { useState } from 'react';
import axios from 'axios';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-3.5-turbo',
        prompt: text,
        temperature: 0.7,
        max_tokens: 100,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        },
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis API (Sentiment Analysis - NLP)</h2>
      <p><strong>Text-based APIs (NLP) వివరణ:</strong> OpenAI GPT-3 API ఉపయోగించి మీరు యూజర్ నుండి టెక్స్ట్ తీసుకుని, దానిని సెంటిమెంట్ అనాలిసిస్ చేయవచ్చు.</p>
      <p><strong>UI వివరణ:</strong> యూజర్ టెక్స్ట్ ఇన్పుట్ చేసిన తర్వాత, దాన్ని OpenAI APIకి పంపి, సెంటిమెంట్ ఫలితాన్ని ప్రదర్శిస్తాము.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to analyze"
      />
      <button onClick={handleAnalyze}>Analyze Sentiment</button>
      <div>
        <h3>Analysis Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default TextAnalysis;
