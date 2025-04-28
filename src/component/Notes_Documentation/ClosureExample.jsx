import React from 'react';

const ClosureExample = () => {
  // 1. **Closure అంటే ఏమిటి?**
  // Closure అనేది ఒక ఫంక్షన్, ఇది తన బయట ఉన్న ఫంక్షన్ నుండి వేరియబుల్స్‌ను గుర్తుపెట్టుకొని, ఆ ఫంక్షన్ బయట ఎక్కడైనా అమలు అయినా వాటిని యాక్సెస్ చేయగలదు.
  // Closure అప్పుడే సృష్టించబడుతుంది, ఒక ఫంక్షన్ లో మరో ఫంక్షన్‌ను డిఫైన్ చేయడం వల్ల, ఇన్నర్ ఫంక్షన్ ఎప్పుడూ అవుటర్ ఫంక్షన్ యొక్క వేరియబుల్స్‌ను యాక్సెస్ చేయగలదు.

  // 2. **Closure ని ఎలా ఉపయోగించాలి?**
  // Closure ని సృష్టించడానికి, ఒక ఫంక్షన్‌ను మరో ఫంక్షన్‌లో డిఫైన్ చేసి, ఆ ఇన్నర్ ఫంక్షన్ అప్పుడు అవుటర్ ఫంక్షన్ యొక్క వేరియబుల్స్‌ను యాక్సెస్ చేయగలదు.
  function counter() {
    let count = 0; // Outer function's private variable
    return function() { // Inner function (Closure)
      count++;
      console.log("Count:", count); // Accessing outer function's variable
    };
  }

  // 3. **Closure ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**
  // - మీరు ప్రైవేట్ వేరియబుల్స్ లేదా స్టేట్‌లను ఉంచడానికి Closure ఉపయోగించవచ్చు. అవి బయటి నుండి యాక్సెస్ చేయడానికి అందుబాటులో ఉండవు.
  // - ఇవి సాధారణంగా ఈవెంట్ లిసనర్లు, అసిన్క్రనస్ కోడ్ (ప్రామిసెస్) లేదా ఫంక్షన్స్ తమ స్థితిని జ్ఞాపకం ఉంచుకోవడం అవసరం ఉన్నప్పుడు ఉపయోగిస్తారు.

  const increment = counter(); // Creating the closure instance

  return (
    <div>
      <h2>Closure Example in JavaScript</h2>
      <p>
        1. **Closure అంటే ఏమిటి?**<br/>
        Closure అనేది ఒక ఫంక్షన్, ఇది తన బయట ఉన్న ఫంక్షన్ నుండి వేరియబుల్స్‌ను గుర్తుపెట్టుకొని, ఆ ఫంక్షన్ పూర్తి అయిన తర్వాత కూడా వాటిని యాక్సెస్ చేయగలదు. ఈ విధంగా, ఇన్నర్ ఫంక్షన్ "ఊహించుకునే" పరిసరాలను గుర్తుపెట్టుకోగలదు.<br/><br/>

        2. **Closure ని ఎలా ఉపయోగించాలి?**<br/>
        Closure ని సృష్టించడానికి ఒక ఫంక్షన్ ని మరొక ఫంక్షన్ లో డిఫైన్ చేయాలి. ఆ ఇన్నర్ ఫంక్షన్ అవుటర్ ఫంక్షన్ యొక్క వేరియబుల్స్‌ను యాక్సెస్ చేస్తుంది, అవుటర్ ఫంక్షన్ ఎప్పుడూ పూర్తయిన తర్వాత కూడా.<br/><br/>

        3. **Closure ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**<br/>
        - మీరు ప్రైవేట్ వేరియబుల్స్ లేదా స్టేట్ ఉంచడం కోసం Closure ఉపయోగిస్తారు.<br/>
        - ఇది ఈవెంట్ లిసనర్లు, అసిన్క్రనస్ కోడ్, లేదా స్థితి జ్ఞాపకం ఉంచే ఫంక్షన్స్ లో విస్తృతంగా ఉపయోగించబడుతుంది.<br/><br/>

        4. **Real-Time Example (Telugu లో వివరణ):**<br/>
        <code>
          function counter() {'{'}</code><br/>
          <code>            let count = 0; // Outer function's private variable</code><br/>
          <code>            return function() {'{'}</code><br/>
          <code>              count++;</code><br/>
          <code>              console.log("Count:", count);</code><br/>
          <code>            {'}'};</code><br/>
          <code>          {'}'};</code><br/>
          <code>          const myCounter = counter();</code><br/>
          <code>          myCounter(); // Count: 1</code><br/>
          <code>          myCounter(); // Count: 2</code><br/>
     <br/><br/>

        **Telugu Explanation:**<br/>
        - `counter()` ఫంక్షన్ లో `count` అనే ప్రైవేట్ వేరియబుల్ ఉంది. `myCounter` ఫంక్షన్ ని హోస్టు చేసే ఫంక్షన్ ఈ `count` వేరియబుల్‌ను మేము ప్రత్యక్షంగా యాక్సెస్ చేయలేకపోయినా, అవి స్థాయిని గుర్తు పెట్టుకోగలుగుతుంది.<br/>
        - మీరు `myCounter()` ని ప్రతి సారి కాల్ చేసినప్పుడు, క్లోజర్ వేరియబుల్ `count` ను ఇంటర్నల్ గా అప్‌డేట్ చేస్తుంది.
      </p>
      <button onClick={increment}>Increment Count</button>
    </div>
  );
};

export default ClosureExample;
