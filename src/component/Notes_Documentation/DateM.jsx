import React from 'react';

const DateM = () => {
  // ప్రస్తుత తేదీ మరియు సమయం పొందడం
  const now = new Date();

  // ప్రత్యేకంగా విడదీయడం
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0-11 కాబట్టి +1
  const date = now.getDate();
  const day = now.getDay(); // 0 (Sunday) - 6 (Saturday)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // వారపు రోజుల పేర్లు (టెలుగులో)
  const daysInTelugu = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>ప్రస్తుత తేదీ మరియు సమయం</h2>
      <p><strong>వేళ:</strong> {hours}:{minutes}:{seconds}</p>
      <p><strong>తేదీ:</strong> {date}-{month}-{year}</p>
      <p><strong>రోజు:</strong> {daysInTelugu[day]}</p>
    </div>
  );
};

export default DateM;
