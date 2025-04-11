const ReactCoreGuide = () => {
    return (
      <div className="p-6 space-y-10">
  
        {/* 1️⃣ React Components (Function vs Class) */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">1️⃣ React Components (Function vs Class)</h2>
          <p className="mb-2">A <strong>Component</strong> is a reusable block of UI in React. You can create them as <strong>Function Components</strong> or <strong>Class Components</strong>.</p>
  
          <h3 className="text-xl font-semibold mt-4">👉 Function Component Syntax:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`function Welcome(props) {
    return <h1>Hi {props.name}!</h1>;
  }`}</pre>
  
          <h3 className="text-xl font-semibold mt-4">👉 Class Component Syntax:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`class Welcome extends React.Component {
    render() {
      return <h1>Hi {this.props.name}!</h1>;
    }
  }`}</pre>
  
          <p className="mt-4 text-sm text-gray-600">🔤 <strong>Telugu Explanation:</strong> React లో UI ని చిన్న చిన్న reusable parts గా విభజించి, వాటిని Components అంటారు. Function components సింపుల్ గ ఉంటాయి. Class components లో state & lifecycle methods ఉండవచ్చు.</p>
        </section>
  
        {/* 2️⃣ JSX & Rendering Data */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">2️⃣ JSX & Rendering Data</h2>
          <p>JSX అనేది JavaScript లో HTML లాంటి syntax. Under the hood, ఇది <code>React.createElement</code> method కి convert అవుతుంది.</p>
  
          <h3 className="text-xl font-semibold mt-4">👉 JSX Example:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`const name = "Prasad";
  const element = <h1>Hello, {name}!</h1>;`}</pre>
  
          <p className="mt-4 text-sm text-gray-600">🔤 <strong>Telugu:</strong> JSX లో curly brackets {`{}`} వాడి variables display చేయవచ్చు. JSX మనకి డైనమిక్ UI ని సింపుల్ గా build చేయడంలో help చేస్తుంది.</p>
        </section>
  
        {/* 3️⃣ React Props */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">3️⃣ React Props</h2>
          <p><strong>Props</strong> (short for properties) are used to pass data from parent to child components.</p>
  
          <h3 className="text-xl font-semibold mt-4">👉 Passing Props:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
  }
  
  <Greeting name="Sita" />`}</pre>
  
          <h3 className="text-xl font-semibold mt-4">👉 Destructuring Props:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
  }`}</pre>
  
          <p className="mt-4 text-sm text-gray-600">🔤 <strong>Telugu:</strong> Props ద్వారా parent నుండి child కి data పంపవచ్చు. Function parameter లో destructuring చేయడం వలన code clean గ ఉంటుంది.</p>
        </section>
  
        {/* 4️⃣ React State (useState) */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">4️⃣ React State (useState)</h2>
          <p><strong>State</strong> అనేది component లో dynamic data ని store చేసేందుకు ఉపయోగపడుతుంది. React లో local state ని manage చేయడానికి <code>useState</code> hook ని వాడతాం.</p>
  
          <h3 className="text-xl font-semibold mt-4">👉 Basic Counter Example:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`import { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <h2>Count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }`}</pre>
  
          <h3 className="text-xl font-semibold mt-4">👉 Input Form Example:</h3>
          <pre className="bg-gray-100 p-2 rounded">
  {`function NameForm() {
    const [name, setName] = useState('');
  
    return (
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <p>Hello, {name}</p>
      </div>
    );
  }`}</pre>
  
          <h3 className="text-xl font-semibold mt-4">👉 Real-time Large Project Use Case:</h3>
          <p>Imagine a product page with quantity counter, input fields, and toggle buttons – each of these can be managed with <code>useState</code>.</p>
          <pre className="bg-gray-100 p-2 rounded">
  {`const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [isGift, setIsGift] = useState(false);`}</pre>
  
          <p className="mt-4 text-sm text-gray-600">🔤 <strong>Telugu:</strong> State అనేది UI లో మారే data ని handle చేయడానికే. మనం local state ని వాడి inputs, counters, toggles వంటి interactive features build చేయవచ్చు.</p>
        </section>
  
      </div>
    );
  };
  
  export default ReactCoreGuide;
  