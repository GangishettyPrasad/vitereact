import React, { useState } from "react";

const FileUploadExample = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Step 2: Handle File Upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("దయచేసి ఒక ఫైల్ ఎంచుకోండి!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send file to server
      const response = await fetch("https://api.example.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("ఫైల్ అప్లోడ్ చేయడంలో పొరపాటు.");
      }

      // Step 3: Handle API Response
      const data = await response.json();
      setMessage(`ఫైల్ అప్లోడ్ విజయవంతంగా అయింది: ${data.message}`);
    } catch (error) {
      setMessage(`దురదృష్టవశాత్తు, అప్లోడ్ చేసే సమయంలో పొరపాటు జరిగింది: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#3E4E55" }}>ఫైల్ అప్లోడ్ ఉదాహరణ (File Upload Example)</h2>

      {/* Step 1: File Selection */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 1: ఫైల్ ఎంచుకోవడం (File Selection)</strong><br />
          <input type="file" onChange={handleFileChange} />
          <p style={{ color: "#ff0000" }}>{file ? `ఎంచుకున్న ఫైల్: ${file.name}` : "ఎంచుకోబడిన ఫైల్ లేదు."}</p>
        </p>
      </div>

      {/* Step 2: Upload Button */}
      <div style={{ backgroundColor: "#e1f7d5", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 2: ఫైల్ అప్లోడ్ (File Upload)</strong><br />
          <button onClick={handleFileUpload} disabled={loading}>
            {loading ? "అప్లోడ్ అవుతుంది..." : "ఫైల్ అప్లోడ్ చేయి"}
          </button>
        </p>
      </div>

      {/* Step 3: Display Message */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "15px", borderRadius: "5px" }}>
        <p>
          <strong>Step 3: ఫైల్ అప్లోడ్ తర్వాత (After File Upload)</strong><br />
          {message && <p>{message}</p>}
        </p>
      </div>
    </div>
  );
};

export default FileUploadExample;
