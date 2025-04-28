import React from 'react';

const HoistingExample = () => {
  // 1. **Hoisting అంటే ఏమిటి?**
  // Hoisting అనేది ఒక జావాస్క్రిప్ట్ మెకానిజం, ఇందులో వేరియబుల్స్ మరియు ఫంక్షన్ డిక్లరేషన్లు కోడ్ అమలుకన్నా ముందు వారి స్కోప్‌కు టాప్ కు బదిలీ చేయబడతాయి.

  // 2. **Hoisting ని ఎలా ఉపయోగించాలి?**
  // Hoisting ఉపయోగం:
  //  - `var` డిక్లరేషన్లు స్కోప్ టాప్ కు లిఫ్ట్ అవుతాయి, కానీ వాటి విలువలు హోస్ట్ అవు.
  //  - ఫంక్షన్ డిక్లరేషన్లు (function declarations) పూర్తి అవుతాయి.
  //  - `let` మరియు `const` స్కోప్ టాప్ కు లిఫ్ట్ అవుతాయి, కానీ అవి తప్పుగా ప్రాథమిక విలువతో రూపొందవు.

  // 3. **Hoisting ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**
  // - Hoisting ని అప్లికేషన్లలో ఉపయోగించవచ్చు, కానీ మంచి ప్రాక్టీస్ కోసం ఫంక్షన్స్ మరియు వేరియబుల్స్ పై ఆధారపడడం మానండి.
  // - కేవలం ఫంక్షన్ డిక్లరేషన్లు మరియు `var` వేరియబుల్స్ కి హోస్టింగ్ సంబంధించిన ప్రవర్తన గుర్తించాలి.

  // Hoisting Example with `var`
  console.log("Value of x before declaration: ", x); // undefined (due to hoisting)
  var x = 10;

  // Hoisting Example with function declaration
  myFunction(); // "Hello from the function!" (works even before the function is declared)
  function myFunction() {
    console.log("Hello from the function!");
  }

  // Hoisting does not work with `let` and `const`
  // console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization
  // let y = 20;

  return (
    <div>
      <h2>Hoisting Example in JavaScript</h2>
      <p>
        1. **Hoisting అంటే ఏమిటి?**<br/>
        Hoisting అనేది ఒక జావాస్క్రిప్ట్ మెకానిజం, ఇందులో వేరియబుల్స్ మరియు ఫంక్షన్ డిక్లరేషన్లు కోడ్ అమలుకన్నా ముందు వారి స్కోప్‌కు టాప్ కు బదిలీ చేయబడతాయి.<br/><br/>

        2. **Hoisting ని ఎలా ఉపయోగించాలి?**<br/>
        - `var` డిక్లరేషన్లు స్కోప్ టాప్ కు లిఫ్ట్ అవుతాయి, కానీ వాటి విలువలు హోస్ట్ అవు.<br/>
        - ఫంక్షన్ డిక్లరేషన్లు (function declarations) పూర్తి అవుతాయి.<br/>
        - `let` మరియు `const` స్కోప్ టాప్ కు లిఫ్ట్ అవుతాయి, కానీ అవి తప్పుగా ప్రాథమిక విలువతో రూపొందవు.<br/><br/>

        3. **Hoisting ఎప్పుడు మరియు ఎక్కడ ఉపయోగించాలి?**<br/>
        - Hoisting ని అప్లికేషన్లలో ఉపయోగించవచ్చు, కానీ మంచి ప్రాక్టీస్ కోసం ఫంక్షన్స్ మరియు వేరియబుల్స్ పై ఆధారపడడం మానండి.<br/>
        - కేవలం ఫంక్షన్ డిక్లరేషన్లు మరియు `var` వేరియబుల్స్ కి హోస్టింగ్ సంబంధిత ప్రవర్తన గుర్తించాలి.<br/><br/>

        4. **Real-Time Example (Telugu లో వివరణ):**<br/>
        <code>
          console.log("Value of x before declaration: ", x); // undefined (due to hoisting)<br/>
          var x = 10;<br/><br/>
          myFunction(); // "Hello from the function!"<br/>
          function myFunction() {'{'}<br/>
            console.log("Hello from the function!");<br/>
          {'}'}<br/><br/>
          // Hoisting does not work with `let` and `const`<br/>
          // console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization<br/>
          // let y = 20;<br/>
        </code>
      </p>
    </div>
  );
};

export default HoistingExample;
