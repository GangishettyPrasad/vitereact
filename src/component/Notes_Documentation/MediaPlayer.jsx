import React, { useState, useEffect } from "react";

const MediaPlayer = () => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("https://api.example.com/media");
        
        if (!response.ok) {
          throw new Error("మీడియా ఫెచ్ చేయడంలో పొరపాటు.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#3E4E55" }}>ఆడియో/వీడియో ప్లేయర్ (Audio/Video Player)</h2>

      {/* Step 1: Display loading message */}
      {loading && <p>మీడియా లోడ్ అవుతుంది...</p>}

      {/* Step 2: Display error message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Step 3: Display Media Player */}
      {mediaUrl && (
        <div style={{ backgroundColor: "#e1f7d5", padding: "15px", borderRadius: "5px" }}>
          <strong>ఆడియో/వీడియో ప్రదర్శన (Audio/Video Display)</strong><br />
          <audio controls>
            <source src={mediaUrl} type="audio/mp3" />
            {/* For video: <video controls> */}
            Your browser does not support the audio element.
          </audio>
          {/* For video: <video controls><source src={mediaUrl} type="video/mp4" /></video> */}
        </div>
      )}

      {/* Explanation of Steps */}
      <div style={{ marginTop: '30px' }}>
        <h3>UI లో వివరణ (Explanation in UI):</h3>

        <h4>1. Media Fetching (మీడియా ఫెచ్ చేయడం):</h4>
        <p>
          <strong>Explanation:</strong> API నుండి ఆడియో లేదా వీడియోను fetch చేసేటప్పుడు response.blob() ఉపయోగించి, బ్లాబ్ రూపంలో డేటాను తీసుకుంటాము. ఈ బ్లాబ్‌ను URL.createObjectURL() ద్వారా URL గా మార్చి, మళ్ళీ UIలో ప్రదర్శిస్తాము.
        </p>
        <p>
          <strong>UI Explanation:</strong> "మీడియా లోడ్ అవుతుంది..." అనే సందేశం యూజర్‌కు చూపించబడుతుంది, తద్వారా వారు యాప్‌లోని మీడియా లేమి లేదా అప్లోడ్ వేచి ఉన్నారని అర్థం చేసుకుంటారు.
        </p>

        <h4>2. Audio/Video Rendering (ఆడియో/వీడియో ప్రదర్శన):</h4>
        <p>
          <strong>Explanation:</strong> Once the media is fetched and the URL.createObjectURL() method creates a URL, the media file is rendered inside an <code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code> tag.
        </p>
        <p>
          <strong>UI Explanation:</strong> "ఆడియో/వీడియో ప్రదర్శన" అనే హెడింగ్ తో, <code>&lt;audio&gt;</code> లేదా <code>&lt;video&gt;</code> ట్యాగ్ ద్వారా మీడియా ప్రదర్శన చేస్తాము. <code>&lt;audio&gt;</code> ట్యాగ్ ఆడియో ఫైల్‌ను ప్లే చేయడానికి ఉపయోగించబడుతుంది, మరియు <code>&lt;video&gt;</code> ట్యాగ్ వీడియో ఫైల్‌ను ప్లే చేయడానికి ఉపయోగించబడుతుంది.
        </p>

        <h4>3. Error Handling (ఎర్రర్ హాండ్లింగ్):</h4>
        <p>
          <strong>Explanation:</strong> If there is an error fetching the media, we handle it and display the error message in the UI.
        </p>
        <p>
          <strong>UI Explanation:</strong> "మీడియా ఫెచ్ చేయడంలో పొరపాటు" అనే సందేశం ఎర్రర్ వచ్చినప్పుడు యూజర్‌కు చూపిస్తాము.
        </p>
      </div>
    </div>
  );
};

export default MediaPlayer;
