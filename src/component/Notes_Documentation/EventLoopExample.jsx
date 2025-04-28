import React, { useEffect } from 'react';

const EventLoopExample = () => {
  // 1. **Event Loop మరియు Call Stack అంటే ఏమిటి?**
  // Event Loop అనేది JavaScript లో ఎస్సిన్క్రనస్ కోడ్ (Asynchronous code) ని హ్యాండిల్ చేయడానికి ఉపయోగించే మెకానిజం.
  // Call Stack అనేది ఒక డేటా స్ట్రక్చర్, ఇది ప్రస్తుతం అమలవుతున్న ఫంక్షన్‌లను ట్రాక్ చేస్తుంది.

  // 2. **Event Loop మరియు Call Stack ని ఎలా ఉపయోగించాలి?**
  // JavaScript లో ఎస్సిన్క్రనస్ ఫంక్షన్స్ (setTimeout, Promises) ని కాల్ చేసినప్పుడు, అవి call stack లో మొదట పెడతాయి. 
  // ఒకసారి call stack ఖాళీ అయిన తర్వాత, event loop message queue నుండి టాస్క్‌లను తీసుకుని call stack లో అమలు చేస్తుంది.

  useEffect(() => {
    // 3. **Event Loop మరియు Call Stack ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**
    // - `setTimeout`, `Promise`, `async/await` లాంటి అసిన్క్రనస్ ఫంక్షన్స్ ని ఉపయోగించినప్పుడు, ఈ event loop మరియు call stack అవుటపుట్ ని ఎప్పటికప్పుడు ట్రాక్ చేయవచ్చు.
    console.log('Start'); // Step 1: Push to call stack

    setTimeout(() => {
      console.log('Inside setTimeout'); // Step 4: Asynchronous task moved to message queue
    }, 0); // Step 3: Set timeout is placed in the message queue

    console.log('End'); // Step 2: Log end immediately

    // Explanation in Telugu:
    // - "Start" immediately print అవుతుంది, ఎందుకంటే అది call stack లో మొదట అమలు అవుతుంది.
    // - "End" print అవుతుంది, ఎందుకంటే `setTimeout` అసిన్క్రనస్ టాస్క్ కాబట్టి అది message queue కి వెళ్ళి, call stack ఖాళీ అయిన తర్వాత అమలు అవుతుంది.
  }, []);

  return (
    <div>
      <h2>Event Loop & Call Stack Example in JavaScript</h2>
      <p>
        1. **Event Loop మరియు Call Stack అంటే ఏమిటి?**<br/>
        Event Loop అనేది JavaScript లో ఎస్సిన్క్రనస్ కోడ్ (Asynchronous code) ని హ్యాండిల్ చేయడానికి ఉపయోగించే మెకానిజం.<br/>
        Call Stack అనేది ఒక డేటా స్ట్రక్చర్, ఇది ప్రస్తుతం అమలవుతున్న ఫంక్షన్‌లను ట్రాక్ చేస్తుంది.<br/><br/>

        2. **Event Loop మరియు Call Stack ని ఎలా ఉపయోగించాలి?**<br/>
        - JavaScript లో ఎస్సిన్క్రనస్ ఫంక్షన్స్ (setTimeout, Promises) ని కాల్ చేసినప్పుడు, అవి call stack లో మొదట పెడతాయి.<br/>
        - ఒకసారి call stack ఖాళీ అయిన తర్వాత, event loop message queue నుండి టాస్క్‌లను తీసుకుని call stack లో అమలు చేస్తుంది.<br/><br/>

        3. **Event Loop మరియు Call Stack ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**<br/>
        - `setTimeout`, `Promise`, `async/await` లాంటి అసిన్క్రనస్ ఫంక్షన్స్ ని ఉపయోగించినప్పుడు, ఈ event loop మరియు call stack అవుటపుట్ ని ఎప్పటికప్పుడు ట్రాక్ చేయవచ్చు.<br/><br/>

        4. **Real-Time Example (Telugu లో వివరణ):**<br/>
        <code>
          console.log('Start'); // Step 1: Push to call stack<br/>
          setTimeout(() = arrow {'{'}<br/>
            console.log('Inside setTimeout'); // Step 4: Asynchronous task moved to message queue<br/>
          {'}'}, 0); // Step 3: Set timeout is placed in the message queue<br/>
          console.log('End'); // Step 2: Log end immediately<br/>
        </code><br/>
        **Telugu Explanation:**<br/>
        - "Start" immediately print అవుతుంది, ఎందుకంటే అది call stack లో మొదట అమలు అవుతుంది.<br/>
        - "End" print అవుతుంది, ఎందుకంటే `setTimeout` అసిన్క్రనస్ టాస్క్ కాబట్టి అది message queue కి వెళ్ళి, call stack ఖాళీ అయిన తర్వాత అమలు అవుతుంది.<br/>
        - "Inside setTimeout" చివరగా print అవుతుంది, ఎందుకంటే అది asynchronous task.

      </p>
    </div>
  );
};

export default EventLoopExample;
