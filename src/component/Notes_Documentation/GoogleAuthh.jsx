import React, { useState } from 'react';

const GoogleAuthh = () => {
  

  return (
    <div style={{ fontFamily: 'Arial', lineHeight: 1.8 }}>
    <h2>🔐 Google OAuth లాగిన్ UI</h2>

    <h3>📌 Step 1: State Variables Initialize</h3>
    <ul>
      <li><strong>userInfo</strong> - లాగిన్ అయిన యూజర్ సమాచారం నిల్వ చేయడానికి</li>
      <li><strong>error</strong> - ఏదైనా పొరపాటు జరిగినప్పుడు దాన్ని చూపించడానికి</li>
    </ul>

    <h3>📌 Step 2: responseGoogle Callback ఫంక్షన్</h3>
    <ul>
      <li>Google login జరిగిన తరువాత <code>response</code> వస్తుంది.</li>
      <li>వాటిలోని <code>tokenId</code> ను తీసుకొని, మన server కి పంపుతాం.</li>
      <li><code>axios.post()</code> ద్వారా <code>http://localhost:3001/verify-google-token</code> URL కు POST API కాల్ పంపబడుతుంది.</li>
      <li>వెరిఫికేషన్ అయిన తరువాత, యూజర్ వివరాలు <code>setUserInfo()</code> ద్వారా స్టోర్ చేస్తాం.</li>
      <li>ఏదైనా error వస్తే <code>setError()</code> ద్వారా చూపించబడుతుంది.</li>
    </ul>

    <h3>📌 Step 3: Google Login బటన్</h3>
    <ul>
      <li><code>clientId</code>: Google Console నుండి పొందిన Client ID ఇవ్వాలి.</li>
      <li><code>onSuccess</code>: లాగిన్ విజయవంతమైతే responseGoogle function కాల్ అవుతుంది.</li>
      <li><code>onFailure</code>: లాగిన్ విఫలమైతే కూడా అదే function ద్వారా error చూపించబడుతుంది.</li>
      <li><code>cookiePolicy</code>: "single_host_origin" అవసరం ఉంటుంది.</li>
    </ul>

    <h3>📌 Step 4: User Data మరియు Error UI</h3>
    <ul>
      <li>యూజర్ లాగిన్ అయిన తర్వాత: పేరు, ఇమెయిల్ UI లో చూపించబడతాయి.</li>
      <li>పొరపాటు వచ్చినపుడు: "Google తో Authenticate చేయడంలో విఫలమైంది" అనే సందేశం ఎర్రగా చూపించబడుతుంది.</li>
    </ul>

    <hr />

    <h3>📄 Final Output:</h3>
    <p>
      ఈ UI లో మీరు Google login బటన్ కనిపిస్తుంది. లాగిన్ అయిన తర్వాత మీరు పేరు, ఇమెయిల్ చూడగలరు.
    </p>
    <p>
      Error వచ్చినపుడు స్పష్టమైన error message కూడా కనిపిస్తుంది.
    </p>


    <>

    <h3>Weather API Integration UI JSX with Full Telugu Explanation (React Axios REST API)</h3>
    <div style={{ fontFamily: 'Arial', lineHeight: 1.8 }}>
    <h2>🌦️ Weather API Integration</h2>

    <h3>📌 Step 1: State Variables Initialize</h3>
    <ul>
      <li><strong>weatherData</strong> — వాతావరణ సమాచారం నిల్వ చేయడానికి</li>
      <li><strong>loading</strong> — డేటా వస్తున్నప్పుడు “Loading...” చూపించడానికి</li>
      <li><strong>error</strong> — ఏదైనా తప్పు వచ్చినప్పుడు మెసేజ్ చూపించడానికి</li>
    </ul>

    <h3>📌 Step 2: useEffect ద్వారా API Call</h3>
    <ul>
      <li>Component మొదట render అయినప్పుడు <code>useEffect</code> trigger అవుతుంది.</li>
      <li><code>axios.get()</code> ద్వారా OpenWeatherMap API కు GET request పంపుతాం.</li>
      <li>Data వచ్చాక <code>setWeatherData()</code> ద్వారా weatherData ను update చేస్తాం.</li>
      <li><code>loading</code> ను false గా మార్చుతాం.</li>
      <li>ఏదైనా Error వస్తే catch block లో <code>setError()</code> ద్వారా చూపిస్తాం.</li>
    </ul>

    <h3>📌 Step 3: UI Display Logic</h3>
    <ul>
      <li><strong>Loading:</strong> డేటా తీసుకుంటున్నపుడు "Loading..." చూపిస్తుంది.</li>
      <li><strong>Error:</strong> ఏదైనా తప్పు వచ్చినపుడు "Error fetching weather data" చూపిస్తుంది.</li>
      <li><strong>weatherData:</strong> డేటా వచ్చిన తర్వాత:
        <ul>
          <li><code>weatherData.name</code> — నగర పేరు</li>
          <li><code>weatherData.main.temp</code> — ఉష్ణోగ్రత (Kelvin నుండి Celsius కు మార్చబడుతుంది)</li>
          <li><code>weatherData.weather[0].description</code> — వాతావరణ వివరణ</li>
        </ul>
      </li>
    </ul>

    <hr />

    <h3>📄 Final Output:</h3>
    <p>
      డేటా వస్తున్నప్పుడు "Loading..." కనిపిస్తుంది.
      <br />
      డేటా వచ్చిన తర్వాత నగర పేరు, ఉష్ణోగ్రత, మరియు వాతావరణ పరిస్థితి వివరంగా UI లో కనిపిస్తాయి.
      <br />
      ఏవైనా error వచ్చినా అప్పుడు కూడా కనిపిస్తుంది.
    </p>
  </div>
    </>

    <>
    <h3> FirebaseAuth.jsx — JSX UI + Explanation </h3>
    <div style={{ fontFamily: 'Arial', lineHeight: 1.8 }}>
    <h2>🔐 Firebase Email/Password Authentication</h2>

    <h3>📌 Step 1: State Variables Initialize</h3>
    <ul>
      <li><strong>email</strong> – యూజర్ ఇమెయిల్ తీసుకోడానికి</li>
      <li><strong>password</strong> – యూజర్ పాస్‌వర్డ్ స్టోర్ చేయడానికి</li>
      <li><strong>user</strong> – Firebase నుండి వచ్చిన యూజర్ డేటా నిల్వ చేయడానికి</li>
      <li><strong>error</strong> – ఎర్రర్ మెసేజ్ చూపించడానికి</li>
    </ul>

    <h3>📌 Step 2: Firebase Auth Function</h3>
    <ul>
      <li><code>signInWithEmailAndPassword()</code> Firebase SDK method ను వాడి యూజర్ లాగిన్ చేస్తాం.</li>
      <li>లాగిన్ సక్సెస్ అయితే <code>user</code> స్టేట్ లో Firebase నుండి వచ్చిన user object స్టోర్ చేస్తాం.</li>
      <li>లాగిన్ విఫలమైతే <code>setError()</code> ద్వారా ఎర్రర్ చూపిస్తాం.</li>
    </ul>

    <h3>📌 Step 3: Form UI</h3>
    <ul>
      <li>ఇమెయిల్ మరియు పాస్‌వర్డ్ input fields</li>
      <li>“Login” బటన్ click చేస్తే <code>handleLogin</code> function execute అవుతుంది</li>
    </ul>

    <h3>📌 Step 4: User UI / Error UI</h3>
    <ul>
      <li><code>user</code> state లో డేటా ఉంటే → “Welcome, [email]” message చూపిస్తాం</li>
      <li><code>error</code> state లో మెసేజ్ ఉంటే → ఎర్రర్ రెడ్ కలర్ లో చూపిస్తాం</li>
    </ul>

    <hr />

    <h3>📄 Output:</h3>
    <p>
      లాగిన్ సక్సెస్ అయితే Firebase నుండి వచ్చిన ఇమెయిల్ UI లో కనిపిస్తుంది.
      <br />
      లాగిన్ లో ఎర్రర్ వస్తే → ప్రామాణిక Firebase error message కనిపిస్తుంది.
    </p>
  </div>
    </>

    <>
    <h3>Stripe Integration — Payment API (Third-Party SDK ఆధారంగా) </h3>

    <div style={{ fontFamily: 'Arial', lineHeight: 1.8 }}>
    <h2>💳 Stripe Payment Integration (React)</h2>

    <h3>📌 Step 1: Stripe Setup</h3>
    <ul>
      <li><strong>Stripe Dashboard నుండి Publishable Key</strong> తీసుకుని ప్రాజెక్ట్‌లో పెట్టాలి</li>
      <li><code>npm install @stripe/stripe-js @stripe/react-stripe-js</code> తో Stripe SDK install చేయాలి</li>
      <li><code>Elements</code> wrapper ద్వారా Stripe provider ను initialize చేయాలి</li>
    </ul>

    <h3>📌 Step 2: State Variables Initialize</h3>
    <ul>
      <li><code>amount</code>: యూజర్ ఎన్ని డబ్బులు చెల్లించాలి</li>
      <li><code>success</code>: పేమెంట్ విజయవంతంగా జరిగిందా అన్న info</li>
      <li><code>error</code>: ఏదైనా లోపం జరిగితే మెసేజ్ చూపించడానికి</li>
    </ul>

    <h3>📌 Step 3: Stripe Checkout Form</h3>
    <ul>
      <li><code>CardElement</code>: Stripe UI లోని బిల్ట్-ఇన్ కార్డ్ ఫీల్డ్</li>
      <li><code>handleSubmit()</code>: form submit చేసినప్పుడు, <code>stripe.confirmCardPayment()</code> ద్వారా పేమెంట్ confirm చేస్తుంది</li>
      <li>Backend ద్వారా ఒక <strong>PaymentIntent</strong> create చేయాలి, ఆ <code>clientSecret</code> ను UI లో వాడతాం</li>
    </ul>

    <h3>📌 Step 4: Showing UI</h3>
    <ul>
      <li><strong>Loading</strong> లేదా <strong>Error</strong> ఉన్నా కూడా అర్థవంతంగా చూపించాలి</li>
      <li>పేమెంట్ విజయవంతం అయితే — “✅ Payment Successful”</li>
      <li>పేమెంట్ విఫలమైతే — “❌ Payment Failed”</li>
    </ul>

    <h3>📄 Output:</h3>
    <p>
      ఇది <strong>Checkout Page</strong> UI లాగా ఉంటుంది. యూజర్ కార్డ్ నంబర్ మరియు ఇతర వివరాలు ఇచ్చిన తర్వాత “Pay” బటన్ క్లిక్ చేస్తే, Stripe API ద్వారా పేమెంట్ జరుగుతుంది.
    </p>

    <p>
      బలమైన గమనిక: Backend అవసరం Stripe Integration కి తప్పనిసరిగా ఉంటుంది. Client-side నుండి card సమాచారం Server కి పంపించకుండా, Token ద్వారా చేసుకుంటారు.
    </p>
  </div>
  
    </>
  </div>
  );
};

export default GoogleAuthh;
