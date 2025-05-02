import React from 'react';

const DestructuringGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f9f9f9' }}>
      <h2 style={{ color: '#4a148c' }}>🔍 Destructuring in JavaScript & React – Full Guide in Telugu</h2>

      <p>
        <strong>Destructuring</strong> అనేది Arrays లేదా Objects లోని values ని individual variables గా easyగా extract చేయడానికి ఉపయోగిస్తారు.
      </p>
      <p>👉 ఇది code readability & maintainability పెంచుతుంది.</p>

      <h3 style={{ color: '#00695c' }}>✅ Basic Syntax:</h3>
      <pre><code>{`const [a, b] = array;
const { name, age } = object;`}</code></pre>

      <h3 style={{ color: '#00695c' }}>1️⃣ Array Destructuring – Basic</h3>
      <pre><code>{`const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first); // "red"
console.log(second); // "green"`}</code></pre>
      <p>👉 Array నుండి positional గా variables assign చేసుకోవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>2️⃣ Skipping Values</h3>
      <pre><code>{`const arr = [1, 2, 3];
const [ , , third] = arr;
console.log(third); // 3`}</code></pre>

      <h3 style={{ color: '#00695c' }}>3️⃣ Object Destructuring – Basic</h3>
      <pre><code>{`const person = { name: "Ravi", age: 25 };
const { name, age } = person;
console.log(name); // "Ravi"`}</code></pre>
      <p>👉 Object keys తో variables extract చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>4️⃣ Renaming While Destructuring</h3>
      <pre><code>{`const user = { id: 101, username: "prasad" };
const { username: name } = user;
console.log(name); // "prasad"`}</code></pre>
      <p>👉 Object property ని new variable name తో తీసుకోవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>5️⃣ Nested Destructuring</h3>
      <pre><code>{`const employee = {
  name: "mounika",
  address: {
    city: "Hyderabad",
    pin: 500001
  }
};

const { address: { city } } = employee;
console.log(city); // "Hyderabad"`}</code></pre>

      <h3 style={{ color: '#00695c' }}>6️⃣ Destructuring in Function Parameters</h3>
      <pre><code>{`function greet({ name }) {
  console.log("Hello", name);
}

const user = { name: "Ram", age: 30 };
greet(user); // Hello Ram`}</code></pre>
      <p>👉 Function లోనే destructuring చేయవచ్చు.</p>

      <h3 style={{ color: '#00695c' }}>7️⃣ Destructuring in React Props</h3>
      <pre><code>{`// Traditional way
function User(props) {
  return <h3>{props.name}</h3>;
}

// Destructuring way
function User({ name }) {
  return <h3>{name}</h3>;
}`}</code></pre>
      <p>👉 React లో frequently props destructuring చేస్తాం readability కోసం.</p>

      <h3 style={{ color: '#00695c' }}>8️⃣ Default Values in Destructuring</h3>
      <pre><code>{`const { name = "Guest", age = 18 } = {};
console.log(name); // "Guest"`}</code></pre>

      <h3 style={{ color: '#00695c' }}>9️⃣ Use in Loops</h3>
      <pre><code>{`const users = [
  { name: "A", age: 22 },
  { name: "B", age: 28 }
];

users.forEach(({ name }) => {
  console.log(name);
});`}</code></pre>

      <h3 style={{ color: '#00695c' }}>🔚 Summary:</h3>
      <ul>
        <li>Destructuring readability & code clarity పెంచుతుంది</li>
        <li>React లో props, useState returns, loops లో extensively వాడతాం</li>
        <li>Array & Object structure మీద ఆధారపడి correct destructuring చేయాలి</li>
        <li>Nested objects లో error avoid చేయడానికి careful గా destructure చేయాలి</li>
      </ul>

      <>
      <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '10px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#4A90E2' }}>📘 React Hook Form – Object Destructuring & JSX Spread</h2>

      <h3>✅ 1. What is Object Destructuring?</h3>
      <p>
        Object destructuring is used to extract values from an object and assign them to variables.
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
        {`const person = { name: "Prasad", age: 26 };
const { name, age } = person;`}
      </pre>

      <h3>✅ 2. Destructuring in JSX Props</h3>
      <p>
        Instead of accessing props like <code>props.name</code>, you can destructure them directly:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
        {`const Welcome = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};`}
      </pre>

      <h3>✅ 3. Spread Syntax in JSX</h3>
      <p>
        You can use the spread operator <code>{`{...}`}</code> to inject all props from an object:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
        {`const inputProps = {
  name: "firstName",
  onChange: () => {},
  onBlur: () => {},
  ref: someRef
};

<input {...inputProps} />`}
      </pre>

      <h3>✅ 4. React Hook Form Example</h3>
      <p>
        In React Hook Form, <code>register()</code> returns an object. When you spread that into your input:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
        {`<input {...register("firstName", { required: true })} />`}
      </pre>
      <p>
        It is same as manually writing:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
        {`<input
  name="firstName"
  onChange={...}
  onBlur={...}
  ref={...}
/>`}
      </pre>

      <h3>💡 Summary </h3>
      <ul>
        <li><strong>register()</strong> method object return చేస్తుంది</li>
        <li><strong>{`<input {...object} />`}</strong> అనేది object లోని properties అన్నిటిని JSX లో spread చేస్తుంది</li>
        <li>ఈ విధంగా React Hook Form field full integration అవుతుంది</li>
      </ul>
    </div>


    <div style={{ padding: '20px', background: '#fdfdfd', borderRadius: '10px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#4A90E2' }}>📘 React Hook Form – Full Explanation</h2>

      <h3>✅ 1. What is Object Destructuring?</h3>
      <p>
        Object destructuring allows you to pull multiple properties from an object easily:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const person = { name: "Prasad", age: 26 };
const { name, age } = person;`}
      </pre>

      <h3>✅ 2. Destructuring in JSX Props</h3>
      <p>
        Instead of using <code>props.name</code>, you can directly destructure in function parameters:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const Welcome = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};`}
      </pre>

      <h3>✅ 3. Spread Syntax in JSX</h3>
      <p>
        Spread operator <code>{`{...}`}</code> is used to apply all properties of an object to an element.
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const inputProps = {
  name: "firstName",
  onChange: () => {},
  onBlur: () => {},
  ref: someRef
};

<input {...inputProps} />`}
      </pre>

      <h3>✅ 4. React Hook Form – Key Example</h3>
      <p>
        <strong>useForm()</strong> returns several useful methods like <code>register</code>, <code>handleSubmit</code>, <code>watch</code>, and <code>formState.errors</code>
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const {
  register,       // 👉 input fields ని React Hook Form కి connect చేయడం
  handleSubmit,   // 👉 form submit handle చేయడానికి
  watch,          // 👉 field values live గా చూడటానికి
  formState: { errors }  // 👉 form లో errors handle చేయడానికి
} = useForm();`}
      </pre>

      <h3>✅ 5. Spread with register() → Input Integration</h3>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`<input {...register("firstName", { required: true })} />`}
      </pre>
      <p>This is equal to writing manually:</p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`<input
  name="firstName"
  onChange={...}
  onBlur={...}
  ref={...}
/>`}
      </pre>

      <h3>✅ 6. Special Case: Only Getting `register` from useForm()</h3>
      <p>
        If you're only using <code>register</code> method from <code>useForm</code>, you can destructure like this:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const { register } = useForm();`}
      </pre>
      <p>
        Or even like this:
      </p>
      <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
{`const register = useForm().register;`}
      </pre>

      <h3>🧠  Summary:</h3>
      <ul>
        <li><strong>useForm()</strong> అనే hook ని form logic కోసం use చేస్తాం</li>
        <li><strong>register()</strong> → input ని React Hook Form కి connect చేస్తుంది</li>
        <li><strong>...spread</strong> → input మీద object లోని properties ని apply చేస్తుంది</li>
        <li><strong>const  register </strong> → useForm return object నుండి కొన్ని మాత్రమే తీసుకోవడం</li>
      </ul>
    </div>
      
      </>
    </div>
  );
};

export default DestructuringGuide;
