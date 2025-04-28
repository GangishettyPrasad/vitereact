import React, { useState, useEffect } from "react";

const ImageFetchingExample = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Image Fetching (ఇమేజ్ ఫెచ్ చేయడం)
    fetch("https://api.example.com/image")
      .then((response) => response.blob()) // Fetching image in blob format
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Step 2: Blob to URL Conversion (బ్లాబ్‌ను URL గా మార్చడం)
        setImageSrc(imageUrl); // Step 3: State Update (స్టేట్ నవీకరణ)
        setLoading(false); // Set loading to false once the image is fetched
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#3E4E55" }}>Image Fetching Example</h2>
      
      {/* Step 1: Image Fetching (ఇమేజ్ ఫెచ్ చేయడం) */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 1: Image Fetching (ఇమేజ్ ఫెచ్ చేయడం)</strong><br />
          API నుండి ఇమేజ్‌ను ఫెచ్ చేయడానికి <code>fetch()</code> మేతడ్ ఉపయోగిస్తాము. 
          దీనితో, ఫెచ్ అయిన ఇమేజ్‌ను బ్లాబ్ (binary data) ఫార్మాట్‌లో తీసుకుంటాము.
        </p>
        <code>fetch('https://api.example.com/image').then(response =.. response.blob())</code>
      </div>

      {/* Step 2: Blob to URL Conversion (బ్లాబ్‌ను URL గా మార్చడం) */}
      <div style={{ backgroundColor: "#e1f7d5", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 2: Blob to URL Conversion (బ్లాబ్‌ను URL గా మార్చడం)</strong><br />
          ఇమేజ్ డేటాను బ్లాబ్ ఫార్మాట్‌లో తీసుకున్న తర్వాత, 
          <code>URL.createObjectURL()</code> ఉపయోగించి దాన్ని URL గా మార్చి, పేజీలో చూపించడానికి సిద్ధం చేస్తాము.
        </p>
        <code>const imageUrl = URL.createObjectURL(blob);</code>
      </div>

      {/* Step 3: State Update (స్టేట్ నవీకరణ) */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 3: State Update (స్టేట్ నవీకరణ)</strong><br />
          <code>setImageSrc(imageUrl)</code> ద్వారా బ్లాబ్ నుండి పొందిన URL ను స్టేట్‌లో పెట్టి, React UIలో ఇమేజ్‌ను ప్రదర్శిస్తాము.
        </p>
        <code>setImageSrc(imageUrl);</code>
      </div>

      {/* Step 4: Conditional Rendering (కండిషనల్ రెండరింగ్) */}
      <div style={{ backgroundColor: "#e1f7d5", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 4: Conditional Rendering (కండిషనల్ రెండరింగ్)</strong><br />
          ఇమేజ్ URL ఫెచ్ అయిన తర్వాత, <code>&lt;img&gt;</code> ట్యాగ్‌తో ఇమేజ్‌ను ప్రదర్శిస్తాము. 
          ఇంకా ఇమేజ్ డేటా ఫెచ్ అవకపోతే, "ఇమేజ్ లోడ్ అవుతుంది..." అని ఒక సందేశం చూపిస్తాము.
        </p>
        <code>
          {imageSrc ? (
            <img src={imageSrc} alt="Fetched Image" style={{ width: "100%" }} />
          ) : (
            <p>ఇమేజ్ లోడ్ అవుతుంది...</p>
          )}
        </code>
      </div>

      {/* Display the fetched image or loading message */}
      {loading ? (
        <p>ఇమేజ్ లోడ్ అవుతుంది...</p> // Message during loading
      ) : (
        <img src={imageSrc} alt="Fetched Image" style={{ width: "100%" }} /> // Display image after loading
      )}
    </div>
  );
};

export default ImageFetchingExample;
