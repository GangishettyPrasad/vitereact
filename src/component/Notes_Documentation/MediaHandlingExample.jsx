import React, { useState, useEffect } from 'react';

const MediaHandlingExample = () => {
  // State hooks for different data types
  const [textData, setTextData] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  // 1. Fetching Text Data
  useEffect(() => {
    fetch('https://api.example.com/text')  // API URL to get text data
      .then(response => response.text())  // Handling text response
      .then(data => {
        setTextData(data);  // Storing the text data in state
      })
      .catch(error => console.error('Error fetching text data:', error));
  }, []);

  // 2. Fetching Audio Data
  useEffect(() => {
    fetch('https://api.example.com/audio')  // API URL to get audio data
      .then(response => response.blob())  // Handling binary audio data
      .then(blob => {
        const audioUrl = URL.createObjectURL(blob);  // Creating a URL for the audio blob
        setAudioSrc(audioUrl);  // Storing the audio URL in state
      })
      .catch(error => console.error('Error fetching audio data:', error));
  }, []);

  // 3. Fetching Video Data
  useEffect(() => {
    fetch('https://api.example.com/video')  // API URL to get video data
      .then(response => response.blob())  // Handling binary video data
      .then(blob => {
        const videoUrl = URL.createObjectURL(blob);  // Creating a URL for the video blob
        setVideoSrc(videoUrl);  // Storing the video URL in state
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, []);

  // 4. Fetching Image Data
  useEffect(() => {
    fetch('https://api.example.com/image')  // API URL to get image data
      .then(response => response.blob())  // Handling binary image data
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);  // Creating a URL for the image blob
        setImageSrc(imageUrl);  // Storing the image URL in state
      })
      .catch(error => console.error('Error fetching image data:', error));
  }, []);

  return (
    <div>
      <h1>React Media Handling Example</h1>

      <h2>1. Text Data</h2>
      {/* Text Data */}
      {/* 
        - ఇది సాధారణ టెక్స్ట్ ఫైల్ (ప్రపంచం లేదా సందేశాలు) API నుండి తీసుకోవడం. 
        - `response.text()` ద్వారా API నుండి టెక్స్ట్ డేటాను పొందవచ్చు.
        - సాధారణంగా API నుండి ప్రాధమిక సమాచారం లేదా సందేశాలను పొందడానికి వాడతారు.
      */}
      <p>{textData}</p>  {/* Displaying the fetched text data */}

      <h2>2. Audio Data</h2>
      {/* Audio Data */}
      {/* 
        - ఈ భాగంలో, API నుండి ఆడియో ఫైల్ (MP3 లేదా WAV) పొందడానికి `response.blob()` వాడతాము.
        - `URL.createObjectURL(blob)` ద్వారా ఆ బ్లోబ్‌ను URLగా మార్చి ఆడియో ప్లేయర్‌లో ప్రదర్శిస్తాము.
        - సాధారణంగా ఆడియో కంటెంట్ (ఉదాహరణకు, సాంగ్స్, అలర్ట్ టోన్‌లు) ప్రదర్శించడానికి ఉపయోగిస్తారు.
      */}
      <audio controls>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>  {/* Displaying audio player */}

      <h2>3. Video Data</h2>
      {/* Video Data */}
      {/* 
        - API నుండి వీడియో ఫైల్ (MP4 లేదా WebM) పొందడానికి `response.blob()` వాడతాము.
        - `URL.createObjectURL(blob)` ద్వారా ఆ బ్లోబ్‌ను URLగా మార్చి వీడియో ప్లేయర్‌లో ప్రదర్శిస్తాము.
        - వీడియో కంటెంట్ (ఉదాహరణకు, యూట్యూబ్ వీడియోలు, శిక్షణ వీడియోలు) ప్రదర్శించడానికి వాడతారు.
      */}
      <video controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video element.
      </video>  {/* Displaying video player */}

      <h2>4. Image Data</h2>
      {/* Image Data */}
      {/* 
        - API నుండి ఇమేజ్ ఫైల్ (JPEG, PNG) పొందడానికి `response.blob()` వాడతాము.
        - `URL.createObjectURL(blob)` ద్వారా ఆ బ్లోబ్‌ను URLగా మార్చి ఇమేజ్‌ను ప్రదర్శిస్తాము.
        - ఇమేజ్ డేటాను (ఉదాహరణకు, ప్రొఫైల్ పిక్చర్స్, ఉత్పత్తి చిత్రాలు) చూపడానికి వాడతారు.
      */}
      <img src={imageSrc} alt="Fetched Image" />  {/* Displaying the fetched image */}
    </div>
  );
};

export default MediaHandlingExample;
