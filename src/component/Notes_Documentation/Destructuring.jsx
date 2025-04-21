import React from "react";

const Destructuring = () => {
  return (
    <div>
      <h1>Destructuring in JavaScript & React</h1>

      {/* Object Destructuring */}
      <section>
        <h2>1. Object Destructuring</h2>
        <pre>{`const user = { name: 'Prasad', age: 25, country: 'India' };
const { name, age, country } = user;`}</pre>
        <p>
          <strong>ఇది Object Destructuring.</strong> మీరు ఒక ఆబ్జెక్టు నుండి డేటా
          (ప్రాపర్టీలు) ని విడిగా వేరే వేరే వేరియబుల్స్ లో పొందగలుగుతారు. 
          <br />
          ఉదాహరణ:
          <br />
          <code>Name: Prasad, Age: 25, Country: India</code>
        </p>
      </section>

      {/* Nested Object Destructuring */}
      <section>
        <h2>2. Nested Object Destructuring</h2>
        <pre>{`const user = { name: 'Mounika', address: { street: 'MG Road', city: 'Bangalore' }};
const { name, address: { street, city } } = user;`}</pre>
        <p>
          <strong>Nested Object Destructuring</strong> అంటే, ఒక ఆబ్జెక్టులోని మరొక ఆబ్జెక్టు నుండి విలువలను విడిగా తీసుకోవడం.
          <br />
          ఉదాహరణ:
          <br />
          <code>Name: mounika, Address: MG Road, Bangalore</code>
        </p>
      </section>

      {/* Renaming During Destructuring */}
      <section>
        <h2>3. Renaming During Destructuring</h2>
        <pre>{`const user = { name: 'Prasad', age: 25 };
const { name: fullName, age: userAge } = user;`}</pre>
        <p>
          <strong>Renaming</strong> అంటే మీరు ఒక ఆబ్జెక్టు యొక్క ప్రాపర్టీని మరో పేరుతో మారుస్తారు. 
          <br />
          ఉదాహరణ:
          <br />
          <code>Full Name: Prasad, User Age: 25</code>
        </p>
      </section>

      {/* Array Destructuring */}
      <section>
        <h2>4. Array Destructuring</h2>
        <pre>{`const fruits = ['Apple', 'Banana', 'Orange'];
const [first, second, third] = fruits;`}</pre>
        <p>
          <strong>Array Destructuring</strong> అంటే మీరు ఒక Array నుండి విలువలను తీసుకోవడం.
          <br />
          ఉదాహరణ:
          <br />
          <code>First Fruit: Apple, Second Fruit: Banana, Third Fruit: Orange</code>
        </p>
      </section>

      {/* Default Values */}
      <section>
        <h2>5. Default Values</h2>
        <pre>{`const user = { name: 'mounika', age: undefined };
const { name, age = 30 } = user;`}</pre>
        <p>
          <strong>Default Values</strong> మీరు ఒక ప్రాపర్టీ విలువ లేదు అనుకుంటే, మీరు ఒక డిఫాల్ట్ విలువ ఇవ్వవచ్చు.
          <br />
          ఉదాహరణ:
          <br />
          <code>Name: mounika, Age: 30</code> (ఎందుకంటే <code>age</code> ని నిర్వచించలేదు).
        </p>
      </section>

      {/* Skipping Values in Array Destructuring */}
      <section>
        <h2>6. Skipping Values in Array Destructuring</h2>
        <pre>{`const fruits = ['Apple', 'Banana', 'Orange', 'Pineapple'];
const [first, , third] = fruits;`}</pre>
        <p>
          <strong>Arrayలో విలువలను దాటివేయడం</strong> అంటే మీరు ఎలాంటి విలువను తీసుకోకపోతే, ఒక ప్రదేశంలో ఖాళీ పెట్టగలరు.
          <br />
          ఉదాహరణ:
          <br />
          <code>First Fruit: Apple, Third Fruit: Orange</code> (ఇక్కడ <code>Banana</code>ని దాటేశాం).
        </p>
      </section>

      {/* Rest Operator with Destructuring */}
      <section>
        <h2>7. Rest Operator in Destructuring</h2>
        <pre>{`const fruits = ['Apple', 'Banana', 'Orange', 'Pineapple'];
const [first, ...rest] = fruits;`}</pre>
        <p>
          <strong>Rest Operator</strong> <code>...rest</code> అంటే మిగతా విలువలను తీసుకోండి.
          <br />
          ఉదాహరణ:
          <br />
          <code>First Fruit: Apple</code>
          <br />
          <code>Other Fruits: Banana, Orange, Pineapple</code>
        </p>
      </section>

      {/* Nested Array Destructuring */}
      <section>
        <h2>8. Nested Array Destructuring</h2>
        <pre>{`const fruits = [['Apple', 3], ['Banana', 5], ['Orange', 2]];
const [[fruit1, quantity1], [fruit2, quantity2], [fruit3, quantity3]] = fruits;`}</pre>
        <p>
          <strong>Nested Array Destructuring</strong> అంటే ఒక Array లోని ఇతర Array నుండి విలువలను తీసుకోవడం.
          <br />
          ఉదాహరణ:
          <br />
          <code>Apple: 3, Banana: 5, Orange: 2</code>
        </p>
      </section>

      {/* Destructuring in Functions */}
      <section>
        <h2>9. Destructuring in Function Parameters</h2>
        <pre>{`const user = { name: 'Prasad', age: 25 };
const printUserDetails = ({ name, age }) => {
  return <p>Name: {name}, Age: {age}</p>;
};`}</pre>
        <p>
          <strong>Function Parameters లో Destructuring</strong> అంటే ఫంక్షన్ లో డేటా సులభంగా తీసుకోవడానికి ఉపయోగపడుతుంది.
          <br />
          ఉదాహరణ:
          <br />
          <code>user</code> ఆబ్జెక్టును <code>printUserDetails</code> అనే ఫంక్షన్ లో పంపించి, అక్కడనుంచి <code>name</code> మరియు <code>age</code> తీసుకోవడం.
        </p>
      </section>

      {/* Summary Table */}
      <section>
        <h2>Destructuring Summary Table</h2>
        <table>
          <thead>
            <tr>
              <th>Destructuring Type</th>
              <th>Example</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Object Destructuring</td>
              <td>{`const { name, age } = user;`}</td>
              <td>ఆబ్జెక్టు ప్రాపర్టీలను వేరియబుల్స్ లో తీసుకోవడం</td>
            </tr>
            <tr>
              <td>Array Destructuring</td>
              <td>{`const [first, second] = fruits;`}</td>
              <td>ఆరే నుండి విలువలను వేరియబుల్స్ లో తీసుకోవడం</td>
            </tr>
            <tr>
              <td>Default Values</td>
              <td>{`const { age = 30 } = person;`}</td>
              <td>డిఫాల్ట్ విలువ ఇవ్వడం</td>
            </tr>
            <tr>
              <td>Nested Destructuring</td>
              <td>{`const { address: { city, street } } = user;`}</td>
              <td>నెస్టెడ్ ఆబ్జెక్ట్ లేదా ఆరే నుండి విలువలను తీసుకోవడం</td>
            </tr>
            <tr>
              <td>Renaming Variables</td>
              <td>{`const { name: fullName } = user;`}</td>
              <td>ప్రాపర్టీ పేరును మారుస్తారు</td>
            </tr>
            <tr>
              <td>Skipping Array Elements</td>
              <td>{`const [first, , third] = fruits;`}</td>
              <td>ఆరేలో విలువలను దాటవేయడం</td>
            </tr>
            <tr>
              <td>Rest Operator</td>
              <td>{`const [first, ...rest] = fruits;`}</td>
              <td>మిగతా విలువలను సేకరించడం</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Destructuring;
