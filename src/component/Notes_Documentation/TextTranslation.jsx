import React, { useState } from 'react';
import axios from 'axios';

const TextTranslation = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {
        q: text,
        target: 'es',
      }, {
        params: {
          key: 'YOUR_GOOGLE_TRANSLATION_API_KEY',
        },
      });
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Translation API (Google Cloud Translation)</h2>
      <p><strong>Translation APIs వివరణ:</strong> Google Translation API ద్వారా మీరు పాఠ్యాన్ని ఒక భాష నుండి మరొక భాషకు అనువదించవచ్చు.</p>
      <p><strong>UI వివరణ:</strong> యూజర్ ఇన్పుట్ చేసిన పాఠ్యాన్ని Google Translation APIకి పంపి, అనువదించిన ఫలితాన్ని UIలో చూపిస్తాము.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
};

export default TextTranslation;
