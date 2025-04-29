import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  // Step 1: Initializing State Variables
  const [weatherData, setWeatherData] = useState(null); // API నుండి వాతావరణ సమాచారం నిల్వ చేయడం
  const [loading, setLoading] = useState(true); // డేటా తీసుకునే సమయంలో "loading" మెసేజ్ చూపించడానికి
  const [error, setError] = useState(null); // ఎటువంటి పొరపాటు జరిగితే దాన్ని సూచించడానికి

  // Step 2: API Call using useEffect
  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY') // మీ API Key ను ఇక్కడ పెట్టండి
      .then((response) => {
        setWeatherData(response.data); // వాతావరణ డేటా సెట్ చేయడం
        setLoading(false); // డేటా తీసుకున్న తరువాత loading state ను false చేయడం
      })
      .catch((err) => {
        setError('Error fetching weather data'); // పొరపాటు సందేశం
        setLoading(false); // పొరపాటు అయినా లొడింగ్ false చేయడం
      });
  }, []); // ఈ effect సరిగ్గా ఒకసారి మాత్రమే component mount అయినప్పుడు అమలవుతుంది

  return (
    <div>
      <h2>ప్రస్తుతం వాతావరణం</h2>

      {/* Step 3: Rendering UI Based on States */}
      {loading && <p>Loading...</p>} {/* డేటా తీసుకుంటున్నప్పుడు "Loading..." చూపించబడుతుంది */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* పొరపాటు ఉంటే ఎర్రుగా మెసేజ్ చూపించబడుతుంది */}
      {weatherData && !loading && !error && (
        <div>
          <h3>{weatherData.name}</h3> {/* నగర పేరు చూపించబడుతుంది */}
          <p>ఉష్ణోగ్రత: {Math.round(weatherData.main.temp - 273.15)}°C</p> {/* కెల్విన్ నుండి సెంటిగ్రేడ్ కి ఉష్ణోగ్రత మార్పిడి */}
          <p>వాతావరణం: {weatherData.weather[0].description}</p> {/* వాతావరణ వివరణ */}
        </div>
      )}

      {/* Step 4: Error Handling */}
      <pre>
        {/* Step 1: Initializing State Variables */}
        {'// Step 1: State Variables ను Initialize చేయడం'}
        {'// useState hook ను ఉపయోగించి మూడు state variables ను initialize చేస్తున్నాము.'}
        {'// weatherData: API నుండి వచ్చిన వాతావరణ సమాచారం'}
        {'// loading: API డేటా తీసుకుంటున్నప్పుడు "loading" message చూపించడానికి'}
        {'// error: ఎటువంటి పొరపాటు జరిగితే దాన్ని సూచించడానికి'}
        </pre>
        <pre>
        {/* Step 2: API Call using useEffect */}
        {'// Step 2: useEffect ద్వారా API Call'}
        {'// useEffect hook ద్వారా component mount అయినప్పుడు API కాల్ జరుగుతుంది.'}
        {'// API నుండి వాతావరణ డేటా తీసుకోవడానికి axios.get() ఉపయోగించబడుతుంది.'}
          </pre>
        {/* Step 3: Rendering UI Based on States */}
        {'// Step 3: Rendering UI Based on States'}
        {'// - loading ఉంటే "Loading..." చూపించబడుతుంది.'}
        {'// - error ఉంటే error message చూపించబడుతుంది.'}
        {'// - వాతావరణ డేటా సఫలంగా వచ్చినప్పుడు వివరాలు చూపించబడతాయి.'}
          <pre>
        {/* Step 4: Error Handling */}
        {'// Step 4: Error Handling'}
        {'// Error handling భాగం, ఎటువంటి పొరపాటు జరిగితే setError() ద్వారా error message చూపించబడుతుంది.'}
      </pre>
    </div>
  );
};

export default Weather;
