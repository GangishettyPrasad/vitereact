import React from 'react';


const DateM = () => {
  const now = new Date(); // ప్రస్తుత తేదీ మరియు సమయం

  // 1. 📖 Date Read Methods (పఠించే మెతడ్స్)
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const timestamp = now.getTime();

  // 2. ✍️ Date Set Methods (సెటింగ్ మెతడ్స్)
  const futureDate = new Date();
  futureDate.setFullYear(2030); // Example 1: 2030 కి మారుస్తున్నాం
  futureDate.setMonth(11); // Example 2: డిసెంబర్ నెల (11 = December)

  // 3. 🔄 Date Conversion Methods (మార్చడం)
  const toStringFormat = now.toString(); // Example 1: Full string
  const toDateStringFormat = now.toDateString(); // Example 2: Date మాత్రమే

  // 4. ⚡ Static Methods (Direct Date Object పై పని చేసేవి)
  const currentTimestamp = Date.now(); // Example 1: ప్రస్తుత millisec
  const parsedDate = Date.parse("2024-05-10"); // Example 2: String ను millisec లో మార్చడం

  // వారపు రోజుల పేర్లు (తెలుగులో)
  const daysInTelugu = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📅 All Date Methods - Full JSX Reference</h1>

      {/* 1. Date Read Methods */}
      <h2>📖 1. Date Read Methods (పఠించే మెతడ్స్)</h2>
      <p>సంవత్సరం: {year}</p>
      <p>నెల: {month}</p>
      <p>తేదీ: {date}</p>
      <p>వారపు రోజు: {daysInTelugu[day]}</p>
      <p>గంటలు: {hours}</p>
      <p>నిమిషాలు: {minutes}</p>
      <p>సెకన్లు: {seconds}</p>
      <p>మిల్లీసెకన్లు: {milliseconds}</p>
      <p>Timestamp: {timestamp}</p>

      {/* 2. Date Set Methods */}
      <h2>✍️ 2. Date Set Methods (సెటింగ్ మెతడ్స్)</h2>
      <p>Example 1 - సంవత్సరం మార్చిన తేదీ: {futureDate.toDateString()}</p>
      <p>Example 2 - నెల మార్చిన తేదీ: {futureDate.toLocaleDateString()}</p>

      {/* 3. Date Conversion Methods */}
      <h2>🔄 3. Date Conversion Methods (మార్చడం)</h2>
      <p>Example 1 - To String Format: {toStringFormat}</p>
      <p>Example 2 - To DateString Format: {toDateStringFormat}</p>

      {/* 4. Static Methods */}
      <h2>⚡ 4. Static Methods (Direct Date Object పై పని చేసేవి)</h2>
      <p>Example 1 - ప్రస్తుతం Timestamp (Date.now() ద్వారా): {currentTimestamp}</p>
      <p>Example 2 - String నుండి millisec Timestamp (Date.parse() ద్వారా): {parsedDate}</p>
    </div>
  );
};




export default DateM;
