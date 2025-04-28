import React, { useState, useEffect } from 'react';

const AsynchronousMethods = () => {
  const [timeoutMessage, setTimeoutMessage] = useState('Waiting for timeout...');
  const [intervalCount, setIntervalCount] = useState(0);
  const [promiseMessage, setPromiseMessage] = useState('Waiting for promise...');
  const [asyncAwaitMessage, setAsyncAwaitMessage] = useState('Waiting for async/await...');

  useEffect(() => {
    // 1. setTimeout Example
    const timeout = setTimeout(() => {
      setTimeoutMessage('✅ setTimeout Worked after 3 seconds!');
    }, 3000);

    // 2. setInterval Example
    const interval = setInterval(() => {
      setIntervalCount(prev => prev + 1);
    }, 1000); // Every 1 second

    // 3. Promise Example
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('✅ Promise Resolved after 2 seconds!');
      }, 2000);
    });

    myPromise.then((res) => {
      setPromiseMessage(res);
    });

    // 4. async/await Example
    async function fetchData() {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve('✅ Async/Await Worked after 2.5 seconds!');
        }, 2500);
      });
      setAsyncAwaitMessage(data);
    }
    fetchData();

    // Cleanup (Best Practice)
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>🕑 Asynchronous Methods in JavaScript (తెలుగులో)</h1>

      {/* 1. setTimeout */}
      <section>
        <h2>1. setTimeout()</h2>
        <p><strong>ఇది ఏమిటి:</strong> ఒక function ని కొన్ని milliseconds తర్వాత ఒక్కసారిగా execture చేయడానికి ఉపయోగిస్తాం.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> Delay చేసిన Actions, Notifications చూపించడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> API response తరువాత ఏదైనా UI మార్చాలి అంటే.</p>
        <p><strong>Example:</strong></p>
        <p>{timeoutMessage}</p>
      </section>

      {/* 2. setInterval */}
      <section>
        <h2>2. setInterval()</h2>
        <p><strong>ఇది ఏమిటి:</strong> ఒక function ని ప్రతి కొన్ని milliseconds కి సారి సారి execute చేయడం.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> Timers, Live Clocks, Continuous updates కోసం.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> ప్రతి 1 sec కి data fetch చేయాలి, timer update చేయాలి అంటే.</p>
        <p><strong>Example:</strong></p>
        <p>Interval Count: {intervalCount}</p>
      </section>

      {/* 3. Promise */}
      <section>
        <h2>3. Promise</h2>
        <p><strong>ఇది ఏమిటి:</strong> JavaScript లో Future లో ఏదో ఒక async operation పూర్తవుతుందని హామీ ఇచ్చే ఒక Object.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> Async operations (లాంటిది API Calls) ని Handle చేయడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> Data వస్తుందా లేదా వచ్చింది తీరా తెలియజేయాలి అంటే.</p>
        <p><strong>Example:</strong></p>
        <p>{promiseMessage}</p>
      </section>

      {/* 4. async/await */}
      <section>
        <h2>4. async/await</h2>
        <p><strong>ఇది ఏమిటి:</strong> Promises ని Easy గా చదివేలా, సింపుల్ syntax తో Handle చేయడం.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> Clean మరియు Error-free asynchronous code రాయడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> Data fetching, API calls, Long-running operations లో.</p>
        <p><strong>Example:</strong></p>
        <p>{asyncAwaitMessage}</p>
      </section>

    </div>
  );
};

export default AsynchronousMethods;
