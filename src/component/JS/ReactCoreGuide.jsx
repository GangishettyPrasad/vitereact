const ReactCoreGuide = () => {
  return (
    <div className="p-6 space-y-10">

      {/* 4️⃣ React State (useState) */}
      <section className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-2">4️⃣ React State (useState)</h2>

        <h3 className="text-xl font-semibold mt-4">🧠 What is useState?</h3>
        <p>
          <strong>useState</strong> అనేది React లో state నిర్వహించడానికి ఉపయోగించే ఒక Hook. React Component లోని డేటా (like counters, form inputs, toggles) dynamic గా మారుతున్నప్పుడు, ఆ డేటా ని Track చేయడానికి useState ఉపయోగిస్తాం.
        </p>

        <h3 className="text-xl font-semibold mt-4">🎯 Why use useState?</h3>
        <ul className="list-disc pl-6">
          <li>UI లో డేటా మారినప్పుడు auto re-render చేయడానికి</li>
          <li>User interaction handle చేయడానికి (button clicks, input typing)</li>
          <li>Local state (component-specific) నిర్వహించడానికి</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">🔧 Syntax:</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`const [stateVariable, setStateVariable] = useState(initialValue);`}</pre>

        <p><strong>stateVariable:</strong> ప్రస్తుత విలువ. <br/>
        <strong>setStateVariable:</strong> ఈ ఫంక్షన్ ద్వారా state ని update చేస్తాం. React automatically re-renders the UI.</p>

        <h3 className="text-xl font-semibold mt-4">📦 Types of State Scenarios:</h3>
        <ul className="list-disc pl-6">
          <li>Primitive (Numbers, Strings, Booleans)</li>
          <li>Objects (Form Data, Settings)</li>
          <li>Arrays (Lists, Cart Items)</li>
          <li>Nested Data (Complex forms, Table structures)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 1: Counter (Number State)</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}`}</pre>
        <p><strong>📌 Used when:</strong> You need to update numbers dynamically (example: votes, likes, score).</p>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 2: Text Input (String State)</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`function NameInput() {
  const [name, setName] = useState('');

  return (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
}`}</pre>
        <p><strong>📌 Used when:</strong> You need to track real-time user input (login forms, feedback forms).</p>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 3: Boolean Toggle</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`function Toggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      {isVisible && <p>This is visible now!</p>}
    </div>
  );
}`}</pre>
        <p><strong>📌 Used when:</strong> You need to show/hide something dynamically (modals, accordions).</p>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 4: Object State</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`function ProfileForm() {
  const [profile, setProfile] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input name="name" onChange={handleChange} value={profile.name} />
      <input name="email" onChange={handleChange} value={profile.email} />
    </div>
  );
}`}</pre>
        <p><strong>📌 Used when:</strong> Managing multiple input fields in a form (contact forms, profile forms).</p>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 5: Array State</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`function TodoList() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), title: 'New Task' }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
}`}</pre>
        <p><strong>📌 Used when:</strong> Dynamic lists – adding/removing items (todo, cart, list of users).</p>

        <h3 className="text-xl font-semibold mt-4">🧪 Example 6: Nested Object State</h3>
        <pre className="bg-gray-100 p-2 rounded">
{`const [form, setForm] = useState({
  user: {
    name: '',
    address: {
      city: '',
      pincode: ''
    }
  }
});`}</pre>
        <p><strong>📌 Used when:</strong> Deeply structured data – like profile with address, preferences, etc.</p>

        <h3 className="text-xl font-semibold mt-4">✅ Best Practices</h3>
        <ul className="list-disc pl-6">
          <li>Never mutate state directly: Use setState with spread operators</li>
          <li>Group related state in objects</li>
          <li>Separate unrelated pieces of state</li>
          <li>Use callback version of setState when state update depends on previous state</li>
        </ul>

        <p className="text-sm text-gray-600 mt-2">🔤 <strong>Telugu:</strong> React లో state అనేది user interaction వల్ల మారే డేటాను represent చేస్తుంది. ఈ state ని update చేస్తే React UI ను మళ్లీ render చేస్తుంది. <code>useState</code> అనేది ఇది చేయడానికి React లోని base-level tool.</p>
      </section>

    </div>
  );
};

export default ReactCoreGuide;
