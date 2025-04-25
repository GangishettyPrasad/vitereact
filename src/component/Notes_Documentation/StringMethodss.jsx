import React from 'react';

const StringMethodss = () => {

  // Example 1: split()
  const sentence = "హలో, మీరు ఎలా ఉన్నారు?";
  const words = sentence.split(" "); // " " వాడి పదాలుగా విభజించడం

  // Example 2: trim()
  const userInput = "  హలో ప్రపంచం!  ";
  const trimmedInput = userInput.trim(); // ఖాళీ స్థలాలు తొలగించడం

  // Example 3: toLowerCase()
  const greeting = "హలో ప్రపంచం!";
  const lowercasedGreeting = greeting.toLowerCase(); // చిన్న అక్షరాలలో మార్చడం

  // Example 4: toUpperCase()
  const uppercaseGreeting = greeting.toUpperCase(); // పెద్ద అక్షరాలలో మార్చడం

  // Example 5: includes()
  const checkSentence = "Welcome to the world of React!";
  const hasReact = checkSentence.includes("React"); // "React" పదం ఉందో లేదో చూసి

  // Example 6: indexOf()
  const sentencePosition = "The quick brown fox jumps over the lazy dog";
  const positionOfFox = sentencePosition.indexOf("fox"); // "fox" పదం యొక్క స్థానాన్ని కనుగొనడం

  // Example 7: replace()
  const text = "I love programming in JavaScript.";
  const updatedText = text.replace("JavaScript", "React"); // "JavaScript" ను "React" తో మార్చడం

  return (
    <div>
      <h1>string methods </h1>

      {/* split() Example */}
      <section>
        <h2>1. split()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "split()" ఒక string method, ఇది ఒక string ని ఒక array of substrings గా విభజిస్తుంది, మీరు ఇచ్చిన delimiter (విభజక) ఆధారంగా.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> ఇది ఒక string ను చిన్న భాగాలుగా విడగొట్టడానికి ఉపయోగిస్తారు. ఉదాహరణకి, ఒక వాక్యాన్ని పదాలుగా విడగొట్టడం.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> మీరు ఒక string ని వివిధ భాగాలుగా విభజించాలనుకున్నప్పుడు, ఉదాహరణకి వాక్యాలను పదాలుగా విడగొట్టడం.</p>
        <p><strong>Example:</strong> {sentence}</p>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li> // ప్రతి పదాన్ని చూపించడం
          ))}
        </ul>
      </section>

      {/* trim() Example */}
      <section>
        <h2>2. trim()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "trim()" ఒక string method, ఇది string యొక్క ప్రారంభం మరియు ముగింపు నుండి ఎలాంటి spaces (ఖాళీ స్థలాలు) తొలగిస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> ఇది యూజర్ ఇన్‌పుట్ లేదా ఇతర strings నుండి అవాంఛనీయ ఖాళీలను తొలగించడానికి ఉపయోగిస్తారు.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> మీరు ఒక string ను శుభ్రపరచడం కోసం (ఉదాహరణకి, form లో యూజర్ ఇన్‌పుట్) ఖాళీ స్థలాలను తీసివేయడానికి.</p>
        <p><strong>Example:</strong> {userInput}</p>
        <div>Trimmed: {trimmedInput}</div>
      </section>

      {/* toLowerCase() Example */}
      <section>
        <h2>3. toLowerCase()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "toLowerCase()" ఒక string method, ఇది string లోని అన్ని అక్షరాలను చిన్న అక్షరాలుగా మార్చుతుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> string ను case-insensitive గా compare చేయడానికి లేదా యూజర్ యొక్క ఇన్‌పుట్ ను చిన్న అక్షరాలతో మార్చడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> మీరు string లోని అన్ని అక్షరాలను చిన్న అక్షరాలు కావాలనుకున్నప్పుడు.</p>
        <p><strong>Example:</strong> {greeting}</p>
        <div>Lowercased: {lowercasedGreeting}</div>
      </section>

      {/* toUpperCase() Example */}
      <section>
        <h2>4. toUpperCase()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "toUpperCase()" ఒక string method, ఇది string లోని అన్ని అక్షరాలను పెద్ద అక్షరాలుగా మార్చుతుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> string ను uppercase లో మార్చడం అవసరం ఉన్నప్పుడు.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> string ను uppercase లో మార్చాలి అంటే.</p>
        <p><strong>Example:</strong> {greeting}</p>
        <div>Uppercased: {uppercaseGreeting}</div>
      </section>

      {/* includes() Example */}
      <section>
        <h2>5. includes()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "includes()" ఒక string method, ఇది ఒక substring ఒక string లో ఉందో లేదో తనిఖీ చేస్తుంది. ఇది "true" లేదా "false" ని రిటర్న్ చేస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> ఒక string లో substring ఉన్నదో లేదో తెలుసుకోవడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> ఒక string లో కొన్ని పదాలు లేదా పదబంధాలు ఉన్నాయా అని చెక్ చేయడానికి.</p>
        <p><strong>Example:</strong> {checkSentence}</p>
        <div>{hasReact ? "React is found!" : "React is not found."}</div>
      </section>

      {/* indexOf() Example */}
      <section>
        <h2>6. indexOf()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "indexOf()" ఒక string method, ఇది ఒక substring యొక్క మొదటి occurrence యొక్క position ని return చేస్తుంది. substring లేని ఎప్పుడు -1 ను return చేస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> ఒక string లో substring యొక్క స్థానాన్ని కనుగొనడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> ఒక word యొక్క position తెలుసుకోవడానికి.</p>
        <p><strong>Example:</strong> {sentencePosition}</p>
        <div>Position of "fox": {positionOfFox}</div>
      </section>

      {/* replace() Example */}
      <section>
        <h2>7. replace()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "replace()" ఒక string method, ఇది ఒక part of the string ని మరొక string తో replace చేస్తుంది. మీరు string లేదా regular expression ఇవ్వవచ్చు.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> string లోని ఒక part ను మరొక part తో మార్చడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> ఒక word లేదా phrase ను replace చేయడం.</p>
        <p><strong>Example:</strong> {text}</p>
        <div>Updated Text: {updatedText}</div>
      </section>

    </div>
  );
};

export default StringMethodss;
