import React from 'react';

const ObjtMethods = () => {

  // Example 1: keys()
  const person = { name: "John", age: 30, job: "Engineer" };
  const keys = Object.keys(person); // object యొక్క keys పొందడం

  // Example 2: assign()
  const person1 = { name: "John", age: 30 };
  const person2 = { job: "Engineer" };
  const mergedPerson = Object.assign({}, person1, person2); // objects ను combine చేయడం

  // Example 3: values()
  const values = Object.values(person); // object లోని values పొందడం

  // Example 4: entries()
  const entries = Object.entries(person); // object లోని key-value pairs పొందడం

  return (
    <div>
      <h1>Object Methods in JavaScript (తెలుగులో)</h1>

      {/* keys() Example */}
      <section>
        <h2>1. keys()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "Object.keys()" ఒక object యొక్క అన్ని keys ని return చేస్తుంది. ఇది ఒక array గా keys ను రిటర్న్ చేస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> object లోని అన్ని keys ను పొందడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> object యొక్క keys ను loop చేసి వాటిపై operations చేయడానికి.</p>
        <p><strong>Example:</strong> {JSON.stringify(person)}</p>
        <ul>
          {keys.map((key, index) => (
            <li key={index}>{key}</li> // ప్రతి key ను చూపించడం
          ))}
        </ul>
      </section>

      {/* assign() Example */}
      <section>
        <h2>2. assign()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "Object.assign()" ఒక method, ఇది ఒక లేదా ఎక్కువ objects ను ఒక object లో merge చేస్తుంది. మీరు target object ని మొదట ఇచ్చి, తర్వాత source objects ని ఇవ్వాలి.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> objects ను merge చేసేందుకు.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> మీరు కొన్ని objects ను ఒకటిగా మిళితం చేయాలనుకున్నప్పుడు.</p>
        <p><strong>Example:</strong> {JSON.stringify(person1)} + {JSON.stringify(person2)}</p>
        <div>Merged Object: {JSON.stringify(mergedPerson)}</div>
      </section>

      {/* values() Example */}
      <section>
        <h2>3. values()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "Object.values()" ఒక object లోని అన్ని values ను return చేస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> object లోని values ను పొందడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> object యొక్క values ను loop చేసి operations చేయడానికి.</p>
        <p><strong>Example:</strong> {JSON.stringify(person)}</p>
        <ul>
          {values.map((value, index) => (
            <li key={index}>{value}</li> // ప్రతి value ను చూపించడం
          ))}
        </ul>
      </section>

      {/* entries() Example */}
      <section>
        <h2>4. entries()</h2>
        <p><strong>ఇది ఏమిటి:</strong> "Object.entries()" ఒక object లోని key-value pairs ను array of arrays గా return చేస్తుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> object లోని key-value pairs ను loop చేసి operations చేయడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> object యొక్క keys మరియు values ను ఒకే సారి loop చేయాలి అంటే.</p>
        <p><strong>Example:</strong> {JSON.stringify(person)}</p>
        <ul>
          {entries.map(([key, value], index) => (
            <li key={index}>{key}: {value}</li> // key-value pairs ను చూపించడం
          ))}
        </ul>
      </section>

    </div>
  );
};

export default ObjtMethods;
