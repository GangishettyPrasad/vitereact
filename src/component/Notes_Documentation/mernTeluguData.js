// src/component/Notes_Documentation/mernTeluguData.js

export const MERN_TELUGU_DATA = [
  {
    id: "javascript-functions",
    title: "1. JS Functions & Rules (ఫంక్షన్స్ బేసిక్స్ & రూల్స్)",
    description: "JavaScript function declaration, expected parameters vs arguments, return statements, and remote control analogy in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `Functions allow you to group together some code, give this code a name, and reuse it later, addressing it by name. A function is a block of code that can be reused to avoid repetition of code.

💡 **TV Remote Control Analogy:**
TV Remote control buttons variables and functions objects matching logic implement chesthundi. Remote lo 'MUTE' button click chesinappudu mute function TV software execute chesthundi. In the same way volume function and changing channel functions are executed inside the TV logic processor.

**What are the parts that make up a function?**
1. The function statement (keyword: \`function\`).
2. The name of the function, in this case \`sum\` or \`printHi\`.
3. Expected parameters inside parentheses \`(a, b)\`.
4. A code block, also called the body of the function \`{ ... }\`.
5. The return statement. A function always returns a value. If it doesn't return value explicitly, it implicitly returns the value \`undefined\`.`,
    what: "A function is a reusable, named container block of JavaScript code designed to execute specific programming operations.",
    why: "Avoids code duplication (DRY principle: Don't Repeat Yourself) by packaging instructions that can be triggered repeatedly from different locations.",
    internal: "The JS compilation engine hoists function declarations. When a function is called, a new execution stack frame is created containing its local parameters and variables, which is popped off the call stack upon returning.",
    realtime: "Exposing a standard date-formatter or logging module that prints info messages from anywhere in the codebase.",
    hrms: "Computing basic tax brackets from gross salary packages on payslips.",
    company: "Swiggy calculating cart checkout discounts based on user coupon codes.",
    folder: `my-mern-app/
├── utils/
│   └── mathUtils.js (Contains functions: add, subtract, calculateTax)
└── server.js`,
    flowDiagram: `Function Definition ---> Register to Scope ---> Function Call(args) ---> Body execution ---> return value`,
    bestPractices: [
      "Use descriptive, camelCase verbs for function names (e.g. calculateTotal, getEmployeeDetails).",
      "Keep functions focused on a single task (Single Responsibility Principle)."
    ],
    commonMistakes: [
      "Forgetting to write the 'return' statement, resulting in 'undefined' variables.",
      "Writing lines of code below the return keyword, which are unreachable and ignored."
    ],
    solving: {
      problem: "Function returns NaN when called with missing parameters.",
      solution: "Provide default fallback parameter values inside the function signature to ensure operations complete safely.",
      code: `// Problem: sum(5) -> 5 + undefined -> NaN
// Solution: Default parameters!
function safeSum(a = 0, b = 0) {
    return a + b;
}
console.log(safeSum(5)); // returns 5`
    },
    assignments: [
      "Write a function which can add two numbers.",
      "Write a function which can display the greatest of the three numbers passed in arguments.",
      "Write a function which can display the given arguments in ascending order.",
      "Write a function which can display the factorial of a number.",
      "Write a function which can to display the reverse of a given number.",
      "Write a function which can check a given number is palindrome or not.",
      "Write a function which can check a given number is prime number or not.",
      "Write a function which can check a given number is Armstrong number or not.",
      "Write a function which can return the factorial of a number to another variable.",
      "Write a function to display the number of digits in the given number.",
      "Write a function that returns an array of all even numbers between 1 and 20."
    ],
    interviews: [
      {
        q: "What is the difference between parameters and arguments?",
        a: "Parameters are the variables defined in the function's declaration (like names placeholders). Arguments are the actual values passed to the function when it is executed (like '8' or 'Prasad')."
      }
    ],
    summary: "Functions package reusable code blocks. They accept parameters, execute logic, and always return a value (default: undefined) while terminating immediately upon hitting a return keyword.",
    examples: {
      low: {
        prereq: "Declaring variables, basic console statements.",
        code: `// Create a function to subtract two numbers and return the value
function subtract(a, b) {
  var c = a - b;
  return c;
}

// Create a function to return the square of a number
function square(a) {
  return a * a;
}

// Create a function to return the remainder of division of a number by another number
function remainder(a, b) {
  var c = a % b;
  return c;
}

console.log(subtract(10, 5)); // 5
console.log(square(4));       // 16
console.log(remainder(10, 3)); // 1`,
        filename: "basic_math_functions.js",
        explanation: [
          "subtract(a, b) - parameters declaration.",
          "return c - sends the subtraction result back to the caller.",
          "a % b - modulo calculation returning the division remainder."
        ]
      },
      medium: {
        prereq: "Conditional statements, string checking.",
        code: `// Create a function to check whether a number is even or odd
function evenodd(x) {
  if (x % 2 === 0) {
    console.log('It is even');
  } else {
    console.log('It is odd');
  }
}

// Create a function to print "Hello World" in the console
function printHelloWorld() {
  console.log('Hello World');
}

evenodd(8);          // It is even
printHelloWorld();   // Hello World`,
        filename: "conditionals_functions.js",
        explanation: [
          "x % 2 === 0 - checks if divisibility by 2 leaves zero remainder.",
          "printHelloWorld - has zero parameters, simply prints output to browser."
        ]
      },
      high: {
        prereq: "Nested loops, algorithms basics.",
        code: `// Create a function to print all the prime numbers between 1 and 10 in descending order
function printPrimesDescending() {
  // Array to collect primes
  var primes = [];
  for (var i = 1; i <= 10; i++) {
    var count = 0;
    for (var j = 1; j <= i; j++) {
      if (i % j === 0) {
        count++;
      }
    }
    if (count === 2) {
      primes.push(i);
    }
  }
  // Reverse to get descending order
  primes.reverse();
  for (var k = 0; k < primes.length; k++) {
    console.log(primes[k]);
  }
}

printPrimesDescending(); // Outputs: 7, 5, 3, 2`,
        filename: "prime_descending.js",
        explanation: [
          "count === 2 - checks if prime (only divisible by 1 and itself).",
          "primes.reverse() - reverses array items sorting for descending display."
        ]
      }
    }
  },
  {
    id: "javascript-objects",
    title: "2. JS Objects & Methods (ఆబ్జెక్ట్స్ & మెథడ్స్)",
    description: "JavaScript objects creation, property access dot vs brackets, object methods, and altering parameters in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `Objects anedhi key-value pairs (properties) ni store cheskune data structure. Real-world objects dynamically code configurations map cheyyడానికి bindings context details apply chestham.

💡 **Car Analogy:**
Real-world lo oka car teesukunte, car color, weight, model anevi key values (properties). Car start details, brake, honk anevi functions (methods) are mapped dynamically.`,
    what: "An object is an unordered collection of related data (primitive or reference types) stored as key-value pairs.",
    why: "Used to model real-world concepts (like users, profiles) under a single compound memory pointer.",
    internal: "Allocated in the system Heap memory space. Variables on the stack hold reference pointers pointing to the Heap object.",
    realtime: "Exposing structured profiles configs, API headers maps, or user sessions details.",
    hrms: "Exposing employee parameters: id, name, design, salary.",
    company: "Zomato modeling restaurants: name, ratings, review comments list.",
    folder: `my-mern-app/
├── models/
│   └── userModel.js (Maps DB data structures)
└── server.js`,
    flowDiagram: `Object declared -> Stack address pointer -> Points to Heap values map`,
    bestPractices: [
      "Use camelCase conventions for key identifiers.",
      "Prefer dot notation for simple keys, use bracket notation for dynamic keys expressions."
    ],
    commonMistakes: [
      "Forgetting that keys are case-sensitive (user.name vs user.Name).",
      "Calling 'this' inside ES6 arrow function methods, which returns parent window context instead of the object."
    ],
    solving: {
      problem: "Accessing nested object properties throws 'Cannot read properties of undefined'.",
      solution: "Use ES6 Optional Chaining (?.) to fetch properties without throwing crash exceptions.",
      code: `const employee = { name: "Prasad" };
console.log(employee.address?.city); // returns undefined safely`
    },
    assignments: [
      "Create an object 'book' with keys: title, author, and year. Print them.",
      "Write a function that returns an array of keys present inside a passed object."
    ],
    interviews: [
      {
        q: "What is the difference between dot notation and bracket notation?",
        a: "Dot notation is cleaner but requires literal key names. Bracket notation allows dynamic evaluation using variables or strings with spaces (e.g. obj[keyVar])."
      }
    ],
    summary: "Objects group related keys and methods in the Heap memory, accessible using dot or bracket notations.",
    examples: {
      low: {
        prereq: "Basic variable bindings.",
        code: `// Create object and read keys
const car = {
  make: "Tata",
  model: "Nexon",
  color: "White"
};

console.log(car.make);      // Tata
console.log(car['model']); // Nexon`,
        filename: "basic_object.js",
        explanation: [
          "car.make - reads property using dot notation.",
          "car['model'] - reads property using bracket notation."
        ]
      },
      medium: {
        prereq: "Object methods and altering values.",
        code: `// Adding, updating and calling methods
const user = {
  name: "Prasad",
  role: "Developer",
  sayHi() {
    return "Hi, I am " + this.name;
  }
};

user.age = 25; // Add new key
user.role = "Lead"; // Update key
console.log(user.sayHi()); // "Hi, I am Prasad"`,
        filename: "object_methods.js",
        explanation: [
          "this.name - references name key within the executing object scope.",
          "user.age = 25 - appends new property dynamically."
        ]
      },
      high: {
        prereq: "Complex looping and deletions.",
        code: `// Deleting and iteration keys
const systemConfig = {
  port: 5000,
  db: "mongodb",
  debug: true
};

delete systemConfig.debug;

for (let key in systemConfig) {
  console.log(key + ": " + systemConfig[key]);
}
// Outputs: port: 5000, db: mongodb`,
        filename: "object_loops.js",
        explanation: [
          "delete - removes key and its value from the object mapping.",
          "for...in - loops over all enumerable properties of an object."
        ]
      }
    }
  },
  {
    id: "javascript-arrays",
    title: "3. JS Arrays & Iterators (అర్రేస్ & ఇటరేటర్స్)",
    description: "Array stack/queue methods, reordering sort, concat/slice/splice, and ES6 map/filter/reduce in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `Arrays anedhi list format values sequence ni index form mappings values store cheskune parameters structure. Iterative methods (map, filter) bulk data modification dynamically performance speed metrics apply chesthayi.

💡 **Train Analogy:**
Oka train compartments dynamic link list mapping blocks calculations variables lists display mapping structures. Compartments load and pop operations respect index stack queue logic.`,
    what: "An array is a high-level, list-like object mapped sequentially in memory using numeric index keys.",
    why: "Used to store collections of identical/mixed variables under a single variable header.",
    internal: "Javascript arrays are dynamic in size. The JS engine optimizes storage allocations, using dense/sparse memory formats based on values spacing.",
    realtime: "Handling a queue of background file rendering requests.",
    hrms: "Displaying employees listings rows grids.",
    company: "Zomato sorting restaurant lists by distance or pricing.",
    folder: `my-mern-app/
├── utils/
│   └── arrayHelpers.js
└── server.js`,
    flowDiagram: `Array declared [1, 2] -> push(3) -> Array is now [1, 2, 3] -> map(x*2) -> [2, 4, 6]`,
    bestPractices: [
      "Use map for transformations, filter for subset selections, and forEach for simple loops.",
      "Prefer ES6 spread operator [...] for copying arrays over mutating original references."
    ],
    commonMistakes: [
      "Using splice() when slice() was intended, resulting in accidental mutation of the original array.",
      "Not returning values inside the map() callback, leaving an array of undefined elements."
    ],
    solving: {
      problem: "Array sorting on numeric values returns alphabetically incorrect order (e.g. 10 before 2).",
      solution: "Pass a custom comparator function to the sort() method to compare numeric values correctly.",
      code: `const numbers = [10, 2, 85, 9];
numbers.sort((a, b) => a - b; // Sorts numerically: [2, 9, 10, 85]`
    },
    assignments: [
      "Write a function that returns all odd numbers present inside an array.",
      "Use reduce to calculate the total sum of employee basic salaries."
    ],
    interviews: [
      {
        q: "What is the difference between slice and splice?",
        a: "slice() returns a shallow copy of a portion of an array without modifying the original. splice() changes the contents of the original array by removing or replacing elements."
      }
    ],
    summary: "Arrays hold lists of elements. Native ES6 iterators (map, filter, reduce) enable high-performance data transformations.",
    examples: {
      low: {
        prereq: "Array initialization.",
        code: `// Stack and Queue operations
const list = [];
list.push("Item 1"); // stack insert
list.push("Item 2");
console.log(list.pop()); // removes "Item 2"

list.unshift("Start"); // queue insert
console.log(list.shift()); // removes "Start"`,
        filename: "stack_queue.js",
        explanation: [
          "push/pop - stack operations working on the end of the array.",
          "unshift/shift - queue operations working on the start of the array."
        ]
      },
      medium: {
        prereq: "Slice/splice and concatenation.",
        code: `// Slicing and Splicing array values
const items = ["Apple", "Banana", "Cherry", "Date"];

// slice returns a copy of indices [1, 3)
const sliceCopy = items.slice(1, 3); // ["Banana", "Cherry"]

// splice removes 1 element starting at index 2
items.splice(2, 1); // removes "Cherry"
console.log(items); // ["Apple", "Banana", "Date"]`,
        filename: "slice_splice.js",
        explanation: [
          "slice(start, end) - extracts elements; original array remains untouched.",
          "splice(start, count) - mutates original array by removing/inserting elements."
        ]
      },
      high: {
        prereq: "ES6 map, filter, reduce pipeline.",
        code: `// ES6 Iterators pipeline
const salaries = [20000, 35000, 50000, 15000];

// 1. Filter out low salaries
const highPaid = salaries.filter(sal => sal >= 30000); // [35000, 50000]

// 2. Increment salary values
const incremented = highPaid.map(sal => sal + 5000); // [40000, 55000]

// 3. Compute total payroll sum
const totalPayroll = incremented.reduce((sum, sal) => sum + sal, 0); // 95000
console.log(totalPayroll);`,
        filename: "array_pipeline.js",
        explanation: [
          "filter - yields a fresh array containing elements matching criteria.",
          "reduce(accumulator, val) - reduces elements down to a single value."
        ]
      }
    }
  },
  {
    id: "javascript-dom",
    title: "4. JS DOM Manipulation (డి.ఒ.ఎమ్ మానిప్యులేషన్)",
    description: "Document object model, query selectors, style updates, and click event listeners in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `DOM (Document Object Model) HTML document pages structure code connections map tree logic check details. dynamic clicks handle, tags selection and formatting updates perform parameters controls.

💡 **House Wiring Analogy:**
Main switch board indicators details browser DOM bindings controls coordinates. Individual bulbs selections tags queries operations target wiring sets updates.`,
    what: "The DOM is a programming interface representing web documents as nodes trees, allowing scripts to update structural styles dynamically.",
    why: "Required to build interactive webpages that update contents, show/hide popups, and respond to user clicks.",
    internal: "Browser parses HTML, constructs the DOM tree, layout trees, and renders pixels. Changing node properties triggers reflows or repaints.",
    realtime: "Dynamic product search filtration display updates.",
    hrms: "Displaying edit forms inputs fields when employee click edit button triggers.",
    company: "Google Search auto-completing search suggestions based on key inputs.",
    folder: `my-mern-app/
├── public/
│   └── index.html
└── src/
    └── domActions.js`,
    flowDiagram: `HTML code parsed -> DOM Tree -> Select Nodes -> update class/styles -> Browser re-renders`,
    bestPractices: [
      "Always cache selected elements in variables instead of querying the DOM repeatedly.",
      "Use classList (add/remove) to toggle styles instead of modifying inline styles directly."
    ],
    commonMistakes: [
      "Querying elements before the HTML document finishes loading (null selectors).",
      "Using innerHTML directly with untrusted user input, exposing cross-site scripting (XSS) risks."
    ],
    solving: {
      problem: "Selecting element returns null.",
      solution: "Ensure the script script is loaded using the 'defer' keyword or executed inside a DOMContentLoaded event handler.",
      code: `<script src="app.js" defer></script>`
    },
    assignments: [
      "Create a button that toggles page background color between red and blue on click.",
      "Build a dynamic list builder where user can add items using input text."
    ],
    interviews: [
      {
        q: "What is event delegation?",
        a: "Event delegation is a technique where you attach a single event listener to a parent element to handle events triggered on its children, using event bubbling."
      }
    ],
    summary: "The DOM interface maps HTML elements to scriptable nodes, enabling dynamic style overrides and interactive event listeners.",
    examples: {
      low: {
        prereq: "Simple tags structure.",
        code: `// Selecting element and changing text
const mainHeading = document.getElementById("title");
if (mainHeading) {
  mainHeading.textContent = "Welcome to MERN Tutorials!";
  mainHeading.style.color = "blue";
}`,
        filename: "basic_dom.js",
        explanation: [
          "getElementById - searches DOM tree for matching ID string.",
          "textContent - modifies text content of targeted element securely."
        ]
      },
      medium: {
        prereq: "Classes and query selectors.",
        code: `// Toggling css classes dynamically
const actionBtn = document.querySelector(".btn-action");

if (actionBtn) {
  actionBtn.addEventListener("click", () => {
    actionBtn.classList.toggle("active-state");
  });
}`,
        filename: "dom_classes.js",
        explanation: [
          "querySelector - fetches element matching class names.",
          "classList.toggle - adds class if absent, removes it if present."
        ]
      },
      high: {
        prereq: "Element creation loops.",
        code: `// Creating elements dynamically from arrays
const employees = ["Prasad", "Kalyan", "Siva"];
const listContainer = document.querySelector("#emp-list");

if (listContainer) {
  employees.forEach(emp => {
    const li = document.createElement("li");
    li.textContent = emp;
    li.classList.add("list-item");
    listContainer.appendChild(li);
  });
}`,
        filename: "dom_dynamic_creation.js",
        explanation: [
          "createElement - allocates fresh node inside browser memory.",
          "appendChild - appends the newly created node as a child of parent container."
        ]
      }
    }
  },
  {
    id: "reactjs-components",
    title: "5. ReactJS Core & Components (రియాక్ట్ జెఎస్ బేసిక్స్)",
    description: "React JSX syntax, functional components, props vs state, and rendering dynamic data in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `ReactJS UI components reusable pieces divide chesi manage cheyyడానికి context logic structures parameters create chesthundi. props input parameter parameters target components communication handle.

💡 **Lego Bricks Analogy:**
Individual Lego blocks dynamic models creations structures maps component models templates logic. Multi-blocks components chain assembly bindings.`,
    what: "React is a declarative component-driven UI library focusing on Virtual DOM efficiency.",
    why: "Simplifies UI development, syncs state changes automatically to screen using modular component templates.",
    internal: "JSX compiles to standard React.createElement function calls. Updates are diffed in Virtual DOM, applying minimal patch nodes to real DOM.",
    realtime: "Single Page Application dashboard setups.",
    hrms: "Exposing Employee Profile Card components across multiple views.",
    company: "Airbnb rendering listing details cards components.",
    folder: `my-mern-app/
├── src/
│   ├── components/
│   │   └── ProfileCard.jsx
│   └── App.jsx`,
    flowDiagram: `State Change ---> Virtual DOM diffing ---> minimal updates sync ---> browser displays`,
    bestPractices: [
      "Keep components clean, separating view templates from complex business calculations.",
      "Treat props as immutable read-only parameters."
    ],
    commonMistakes: [
      "Directly modifying state values (e.g. this.state.val = x) instead of using setState/set hooks.",
      "Forgetting to supply unique 'key' props to mapped loop elements list."
    ],
    solving: {
      problem: "React elements fail to re-render when arrays are updated.",
      solution: "Always return a brand new copy of the array using spread syntax to trigger state changes detector.",
      code: `const addItems = () => setItems([...items, newItem]);`
    },
    assignments: [
      "Create a React component 'WelcomeCard' accepting name and role as props.",
      "Build a list renderer component mapping through mock array objects."
    ],
    interviews: [
      {
        q: "What is the key difference between Props and State?",
        a: "Props are read-only inputs passed down from parent components. State represents the component's internal mutable memory that triggers re-renders on change."
      }
    ],
    summary: "ReactJS divides UI layouts into reusable functional components that re-render automatically when state coordinates change.",
    examples: {
      low: {
        prereq: "Vite setups basics.",
        code: `// Simple Functional Component with props
import React from 'react';

export default function Welcome(props) {
  return (
    <div className="welcome-card">
      <h1>Hello, {props.username}!</h1>
    </div>
  );
}`,
        filename: "Welcome.jsx",
        explanation: [
          "props.username - accesses variables parameters passed from outer parent layouts."
        ]
      },
      medium: {
        prereq: "Props destructuring and list renders.",
        code: `// Destructuring props and looping lists
import React from 'react';

export default function EmployeeList({ departments }) {
  return (
    <ul>
      {departments.map((dept, i) => (
        <li key={i}>{dept}</li>
      ))}
    </ul>
  );
}`,
        filename: "EmployeeList.jsx",
        explanation: [
          "key={i} - supplies unique identifiers to React reconciliation algorithms.",
          "destructuring props - unpacks departments key from input object."
        ]
      },
      high: {
        prereq: "State management inside components.",
        code: `// Interactive State Handler component
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
        filename: "Counter.jsx",
        explanation: [
          "useState(0) - allocates component state, initialized at 0.",
          "setCount(count + 1) - updates state value, triggering screen re-renders."
        ]
      }
    }
  },
  {
    id: "reactjs-hooks",
    title: "6. ReactJS Hooks (రియాక్ట్ హుక్స్)",
    description: "React hooks: useState, useEffect lifecycle control, and useContext values sharing in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: `Hooks functional components lo state lifecycle tracking methods use cheyyడానికి paths expose chesthayi. useEffect data fetching connections standard re-runs controls handle chesthundi.

💡 **Light Switch Analogy:**
useState switches indicators. ON sets state true, OFF sets false. useEffect acts as observer triggers updating displays.`,
    what: "Hooks are functions allowing functional components to tap into React state and lifecycle events.",
    why: "Eliminates class-based components complexities like binder constructor states methods.",
    internal: "React tracks execution order of hooks sequentially in fiber nodes arrays. Hooks must not be called inside loops/conditionals.",
    realtime: "Fetching profile information from API once component page loads.",
    hrms: "Updating active logs list anytime filters selection state variables change.",
    company: "Twitter listening to fresh incoming tweets in background timers.",
    folder: `my-mern-app/
├── src/
│   ├── hooks/
│   │   └── useCustomHook.js
│   └── App.jsx`,
    flowDiagram: `State changes -> React scheduler triggers -> Updates matching nodes -> triggers useEffect cleanups`,
    bestPractices: [
      "Always specify complete dependencies array variables inside useEffect hooks.",
      "Keep custom hooks encapsulated to share business logic."
    ],
    commonMistakes: [
      "Calling hooks conditionally (inside if blocks), which breaks React hooks execution arrays ordering.",
      "Leaving open subscription sockets or timers inside useEffect without writing cleanup handlers."
    ],
    solving: {
      problem: "Infinite render loop inside useEffect.",
      solution: "Provide appropriate dependency arrays (empty bracket [] if it should only run on page load).",
      code: `useEffect(() => {
  fetchData();
}, []); // Empty dependencies list runs only once`
    },
    assignments: [
      "Build a timer component that increments seconds count every 1 second using useEffect.",
      "Create a custom window resize hook tracking browser widths."
    ],
    interviews: [
      {
        q: "What is the purpose of useEffect cleanup function?",
        a: "The cleanup function inside useEffect is executed before the component unmounts or before re-running the effect, used to cancel subscriptions, clear timers, and release memory resources."
      }
    ],
    summary: "React hooks manage state and side-effects, keeping code tidy and modular without complex class syntax.",
    examples: {
      low: {
        prereq: "React basics.",
        code: `// useState toggle state
import React, { useState } from 'react';

export default function ToggleText() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <p>I toggle on and off!</p>}
    </div>
  );
}`,
        filename: "ToggleText.jsx",
        explanation: [
          "setVisible(!visible) - flips the boolean state true/false."
        ]
      },
      medium: {
        prereq: "API integrations using useEffect.",
        code: `// useEffect data fetching
import React, { useState, useEffect } from 'react';

export default function UserLoader() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []); // Runs once on mount

  return (
    <ul>
      {users.slice(0, 3).map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
        filename: "UserLoader.jsx",
        explanation: [
          "dependencies [] - forces fetch to run only when component initially loads."
        ]
      },
      high: {
        prereq: "Timers cleanup logic.",
        code: `// useEffect timer with proper cleanup
import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Return cleanup function to clear timer!
    return () => clearInterval(interval);
  }, []);

  return <p>Active session time: {seconds}s</p>;
}`,
        filename: "Timer.jsx",
        explanation: [
          "clearInterval(interval) - runs on unmount, preventing memory leak issues."
        ]
      }
    }
  },
  {
    id: "nodejs-basics",
    title: "7. Node.js & HTTP Server (నోడ్.జెఎస్ & హెచ్.టి.టి.పి సర్వర్)",
    description: "Node.js dynamic event loop, V8 engine running, and creating HTTP web servers from scratch in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: "Node.js anedhi Google Chrome V8 engine meedha built ayina JavaScript runtime. Server-side JavaScript write cheyyadaniki, database connections handle cheyyadaniki deenni use chestham.",
    what: "Node.js anedhi browsers lekunda standalone computer terminal commands inside javascript write & compile cheyyadaniki build chesina Chrome engine wrappers runtime.",
    why: "Common backend systems and APIs high concurrency levels event-loop processing non-blocking inputs perform cheyyadaniki backend servers create chestham.",
    internal: "Single Threaded Event Loop logic implement chesthundhi. Heavy system requests (I/O, database writes) threadpool buffers assign chesthu operations perform output details updates runs.",
    realtime: "Online ticket bookings processing queues inside dynamic web APIs.",
    hrms: "Employee list metadata fetches dynamically running on port 5000 server loops endpoints.",
    company: "BigBasket inventory tracking and processing checkout requests.",
    folder: `my-mern-app/
├── server.js (Main App Entry)
└── package.json (Dependency Configuration)`,
    flowDiagram: `Client Request ---> HTTP server check ---> Event Loop receives ---> Handled via threadpool`,
    bestPractices: [
      "Always use async/await to avoid blocking the single-threaded event loop.",
      "Use environment variables to handle port numbers and secrets configuration."
    ],
    commonMistakes: [
      "Writing synchronous code (like fs.readFileSync) inside HTTP handlers which freezes the server.",
      "Forgetting to end HTTP response wrapper: res.end() or res.send()."
    ],
    solving: {
      problem: "Server gets crashed when reading a non-existing file dynamically.",
      solution: "Wrap file reading operations inside try-catch block or handle the error parameter inside callback functions properly.",
      code: `const fs = require('fs');
fs.readFile('missing_file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("File loading failed safely:", err.message);
        return;
    }
    console.log(data);
});`
    },
    assignments: [
      "Create an HTTP server on port 6000 that returns a JSON response containing current system time.",
      "Write a Node script that reads an array of employee objects from employee.json and prints their names to console."
    ],
    interviews: [
      {
        q: "What is Node.js Event Loop?",
        a: "It is a mechanism that allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel whenever possible, keeping JavaScript execution single-threaded."
      }
    ],
    summary: "Node.js is a powerful Chrome V8 JavaScript runtime enabling highly concurrent backend servers using non-blocking event-driven loop mechanisms.",
    examples: {
      low: {
        prereq: "Javascript ES6 arrow functions syntax.",
        code: `// LOW DIFFICULTY: Simple Node.js HTTP server returning Welcome text
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Welcome to MERN Telugu Tutorial!");
});

server.listen(5000, () => {
    console.log("Server running on port 5000...");
});`,
        filename: "basic_server.js",
        explanation: [
          "require('http') - imports Node's built-in networking library module.",
          "createServer(...) - handler processing incoming client requests.",
          "res.end(...) - flushes responses buffer back to frontend browser."
        ]
      },
      medium: {
        prereq: "Node path and fs filesystem modules usages.",
        code: `// MEDIUM DIFFICULTY: Basic File server reading static files dynamically
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === "/api/data") {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server File Error.");
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    }
}).listen(5000);`,
        filename: "file_server.js",
        explanation: [
          "fs.readFile - asynchronous non-blocking filesystem read pipeline.",
          "res.writeHead(200, ...) - specifies JSON payload headers formats."
        ]
      },
      high: {
        prereq: "Event emitters and raw stream data buffers processing.",
        code: `// HIGH DIFFICULTY: Processing large file streaming payload
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    // Pipe reads chunks dynamically without loading entire 2GB file into RAM!
    const fileStream = fs.createReadStream('large_onboarding_video.mp4');
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    fileStream.pipe(res);
}).listen(5000);`,
        filename: "stream_server.js",
        explanation: [
          "createReadStream - reads files as small stream buffers blocks.",
          "pipe(res) - binds reading streams directly to client HTTP output channel, optimizing RAM."
        ]
      }
    }
  },
  {
    id: "expressjs-routing",
    title: "8. ExpressJS Routing & Middleware (ఎక్స్‌ప్రెస్ రౌటింగ్ & మిడిల్‌వేర్)",
    description: "Creating Express application, routing HTTP commands, and custom request intercepting middlewares in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: "ExpressJS anedhi Node.js kosam build chesina minimalist web framework. Routers and dynamic middleware interceptors write cheyyadaniki, REST endpoints publish cheyyadaniki deenni use chestham.",
    what: "ExpressJS Node's raw HTTP functions wrappers framework, minimizing boilerplate code when exposing API endpoints.",
    why: "Used to handle dynamic path routers, JSON payload parses, CORS headers, and auth checks cleanly.",
    internal: "Exposes a routing engine chain that passes request (req) and response (res) objects through sequentially registered middleware functions.",
    realtime: "API Gateway routing checkout parameters dynamically.",
    hrms: "Authentication middleware checking if headers contain admin permissions before deleting employee logs.",
    company: "Swiggy routing delivery tracking coordinates APIs.",
    folder: `my-mern-app/
├── middleware/
│   └── auth.js (Access Validation)
├── routes/
│   └── employee.js (Employee API Endpoints)
└── app.js (Main Express Configuration)`,
    flowDiagram: `Request ---> Cors Middleware ---> Auth Middleware ---> View Controller ---> Response`,
    bestPractices: [
      "Place error handling middleware at the very end of your app registry.",
      "Use express.json() to parse incoming JSON request payloads."
    ],
    commonMistakes: [
      "Forgetting to call next() inside custom middleware, which leaves requests hanging forever.",
      "Not catching asynchronous errors in route handlers, causing server crashes."
    ],
    solving: {
      problem: "CORS error blocks React frontend from calling Express API.",
      solution: "Install 'cors' package from npm and load it as a global middleware at the top of your Express app.",
      code: `const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));`
    },
    assignments: [
      "Build a POST request route /api/login that validates if email and password are provided in req.body.",
      "Create a custom logger middleware that prints request method, url, and timestamp to console."
    ],
    interviews: [
      {
        q: "What is middleware in Express?",
        a: "It is a function that has access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle."
      }
    ],
    summary: "Express.js simplifies Node web servers using modular routers and middlewares that intercept and process network requests sequentially.",
    examples: {
      low: {
        prereq: "NPM installations package controls.",
        code: `// LOW DIFFICULTY: Express setup and basic endpoint
const express = require('express');
const app = express();

app.get('/api/status', (req, res) => {
    res.json({ status: "Active", framework: "ExpressJS" });
});

app.listen(5000);`,
        filename: "express_basic.js",
        explanation: [
          "express() - initializes express application context.",
          "res.json(...) - automatically formats JS objects to JSON response streams."
        ]
      },
      medium: {
        prereq: "Express routing mechanisms and dynamic parameters.",
        code: `// MEDIUM DIFFICULTY: Custom logging middleware and dynamic params
const express = require('express');
const app = express();

// Custom Middleware
app.use((req, res, next) => {
    console.log(\`[\${new Date().toISOString()}] Request to \${req.url}\`);
    next(); // forward to next handler
});

app.get('/api/employee/:id', (req, res) => {
    res.json({ emp_id: req.params.id, name: "Prasad" });
});

app.listen(5000);`,
        filename: "express_middleware.js",
        explanation: [
          "app.use(middleware) - registers global interceptor middleware.",
          "req.params.id - parses dynamic route parameter values."
        ]
      },
      high: {
        prereq: "Advanced error handling middlewares layouts.",
        code: `// HIGH DIFFICULTY: Global Express Error Handling Middleware
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/checkout', (req, res, next) => {
    try {
        const cart = req.body.cart;
        if (!cart) {
            throw new Error("Cart cannot be empty!");
        }
        res.json({ status: "Success" });
    } catch (err) {
        next(err); // passes error to global handler
    }
});

// Global Error Handler (must have 4 arguments!)
app.use((err, req, res, next) => {
    console.error("FATAL:", err.message);
    res.status(400).json({ error: true, message: err.message });
});

app.listen(5000);`,
        filename: "express_errors.js",
        explanation: [
          "next(err) - forwards runtime exceptions to error handling middleware chains.",
          "app.use((err, req, res, next) => ...) - catches and formats global errors."
        ]
      }
    }
  },
  {
    id: "mongodb-mongoose",
    title: "9. MongoDB & Mongoose Schemas (మోంగోడిబి & మంగూస్ స్కీమాస్)",
    description: "NoSQL database architectures, Mongoose connections, validation rules, and schema modeling in Telugu.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: "MongoDB anedhi JSON-like documents format lo data store chese NoSQL database. Express application code thoti database mappings perform cheyyడానికి Mongoose ORM package use chestham.",
    what: "MongoDB is a document-oriented database using BSON rows formats. Mongoose is the ODM (Object Document Mapper) providing schema validations controls.",
    why: "Used to store unstructured/semi-structured database tables records without complex SQL table migration scripts.",
    internal: "Use mongoose.connect(), declare new Schema classes, define validations checks.",
    realtime: "Employee profiles data layouts, leave requests models registrations.",
    hrms: "Database tables storing employees names, emails, basic salaries.",
    company: "Zomato storing restaurant menu cards, reviews and user profile documents.",
    folder: `my-mern-app/
├── models/
│   └── Employee.js (Mongoose Model Schemas)
└── db.js (Database connection config)`,
    flowDiagram: `Mongoose Client ---> Schema validation ---> Save document ---> MongoDB Heap`,
    bestPractices: [
      "Always set custom validation messages on schema parameters.",
      "Use indexes (unique: true) on frequently queried keys like email."
    ],
    commonMistakes: [
      "Forgetting to export models at the end of the schema definition file.",
      "Not handling schema validation errors, which causes POST requests to crash the server."
    ],
    solving: {
      problem: "Validation fails when email value is duplicate or empty.",
      solution: "Enable unique constraints in model schema and validate email strings via regex parameters.",
      code: `const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is mandatory!'],
        unique: true
    }
});`
    },
    assignments: [
      "Create a mongoose schema for 'Department' with fields deptName and budget.",
      "Write a script that connects to mongoose, creates a new employee document, and saves it."
    ],
    interviews: [
      {
        q: "What is the difference between MongoDB and SQL?",
        a: "SQL is relational, using structured tables and joins. MongoDB is NoSQL, storing data in JSON-like documents which allows for dynamic schemas and horizontal scalability."
      }
    ],
    summary: "Mongoose maps JavaScript objects to MongoDB documents, handling validation and database connectivity automatically.",
    examples: {
      low: {
        prereq: "Object classes basics.",
        code: `// LOW DIFFICULTY: Mongoose connection setup
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/company_db')
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error("Connection failed:", err));`,
        filename: "db_connect.js",
        explanation: [
          "mongoose.connect - establishes secure database pipeline connection socket.",
          "company_db - database workspace target folder configurations."
        ]
      },
      medium: {
        prereq: "Mongoose schema mappings parameters configurations.",
        code: `// MEDIUM DIFFICULTY: Defining basic Schema and validating inputs
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    salary: { type: Number, min: 10000 }
});

const Employee = mongoose.model('Employee', employeeSchema);`,
        filename: "employee_schema.js",
        explanation: [
          "new mongoose.Schema(...) - declares structure columns constraints validations.",
          "mongoose.model(...) - compiles schema into active query interface class."
        ]
      },
      high: {
        prereq: "Cascades configurations, mongoose virtuals fields.",
        code: `// HIGH DIFFICULTY: Mongoose Virtuals and Pre-save encryption hook
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    role: String
}, { toJSON: { virtuals: true } });

// Virtual property not saved to DB but calculated on-the-fly!
userSchema.virtual('isAdmin').get(function() {
    return this.role === 'ADMIN';
});

// Pre-save trigger hook
userSchema.pre('save', function(next) {
    console.log("Saving user profile:", this.username);
    next();
});

const User = mongoose.model('User', userSchema);`,
        filename: "schema_hooks.js",
        explanation: [
          "userSchema.virtual(...) - computes fields dynamically during queries conversions.",
          "pre('save') - auto-run trigger hooks before database write commits."
        ]
      }
    }
  },
  {
    id: "mern-auth-jwt",
    title: "10. MERN Authentication & JWT (సెక్యూరిటీ & టోకెన్ ఆథరైజేషన్)",
    description: "JWT token validation, cookie parser middlewares, password encryption using bcrypt in MERN Stack.",
    imageUrl: "/mern_auth_jwt_flow.png",
    telugu: "MERN Stack security JWT authentication process handle chesthundhi. User login check complete chesi, server user state payload tokens client browsers ki cookie configurations settings pass chestham.",
    what: "JSON Web Tokens verify users requests authenticity safely utilizing encryption signatures keys validation parameters.",
    why: "Used to protect dashboard routers, authenticating API queries securely on every network call.",
    internal: "Use bcrypt to hash passwords, generate tokens using jwt.sign(), verify inside middleware using jwt.verify().",
    realtime: "User sign-in sessions handling across mobile and web interfaces.",
    hrms: "Authentication middleware verifying user JWT before allowing salary downloads.",
    company: "Amazon using authorization cookies to track cart items and login status.",
    folder: `my-mern-app/
├── middleware/
│   └── verifyToken.js (JWT Validation Middleware)
└── controllers/
    └── authController.js (Login/Register controls)`,
    flowDiagram: `Client submits credentials -> Bcrypt validates -> Server signs JWT -> Client receives cookie`,
    bestPractices: [
      "Always store JWT tokens in HttpOnly cookies instead of localStorage to prevent XSS attacks.",
      "Set appropriate token expiry intervals (e.g. 15 minutes) and implement refresh tokens."
    ],
    commonMistakes: [
      "Exposing sensitive details like passwords or keys inside the JWT payload.",
      "Using weak secret keys for JWT signature generation, making them easy to decrypt."
    ],
    solving: {
      problem: "JWT token gets intercepted by scripts in browser console.",
      solution: "Set token cookie payload properties to HttpOnly=true and Secure=true configurations so browser scripts cannot read them.",
      code: `res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000 // 1 hour
});`
    },
    assignments: [
      "Implement a login authentication endpoint that takes username and password, validates them via database records, and signs a JWT.",
      "Create a custom middleware checkRole(role) that only allows requests containing specific JWT role values (e.g., ADMIN)."
    ],
    interviews: [
      {
        q: "What is JWT structure?",
        a: "JWT has three parts separated by dots: Header (specifies algorithm), Payload (contains claims/user info), and Signature (verifies integrity)."
      }
    ],
    summary: "JSON Web Tokens provide secure user sessions using encrypted signatures that authenticate requests without storing user states on the server.",
    examples: {
      low: {
        prereq: "Bcrypt installations.",
        code: `// LOW DIFFICULTY: Password hashing with bcrypt
const bcrypt = require('bcrypt');

async function securePassword(plainText) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainText, salt);
    console.log("Hashed password:", hashed);
    return hashed;
}
securePassword("password123");`,
        filename: "hash_pwd.js",
        explanation: [
          "genSalt(10) - generates secure random bytes (salt) factor.",
          "hash(...) - cryptographically hashes plain text password to prevent reverse decoding."
        ]
      },
      medium: {
        prereq: "JSON Web Token library imports.",
        code: `// MEDIUM DIFFICULTY: Generating JWT token payload
const jwt = require('jsonwebtoken');

const userProfile = { id: 101, username: "Prasad", role: "ADMIN" };
const token = jwt.sign(userProfile, 'SECRET_JWT_KEY_123', { expiresIn: '1h' });
console.log("Generated Token:", token);`,
        filename: "generate_jwt.js",
        explanation: [
          "jwt.sign(...) - signs user payload with secret keys, returning secure token.",
          "expiresIn - sets session timeout configurations."
        ]
      },
      high: {
        prereq: "HTTP Authorization header checks, cookies parsers.",
        code: `// HIGH DIFFICULTY: Token verification middleware interceptor
const jwt = require('jsonwebtoken');

function requireMernAuth(req, res, next) {
    // Capture token from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access Denied: Missing auth token." });
    }

    try {
        const verified = jwt.verify(token, 'SECRET_JWT_KEY_123');
        req.user = verified; // inject verified payload into request
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid authorization token." });
    }
}`,
        filename: "auth_middleware.js",
        explanation: [
          "jwt.verify(...) - checks cryptographic signature; throws error if modified.",
          "req.user = verified - stores token payload for subsequent routing stages."
        ]
      }
    }
  },
  {
    id: "mern-deployment-PM2",
    title: "11. Production Deployment & PM2 (సర్వర్ డిప్లాయ్మెంట్ & పిఎమ్2)",
    description: "Hosting MERN stack server, managing node processes via PM2, and Nginx reverse proxy configurations.",
    imageUrl: "/mern_architecture_flow.png",
    telugu: "MERN Stack deployment Node processes background controls, PM2 process management system scripts, Nginx configurations client ports map settings configurations.",
    what: "PM2 is a production process manager for Node.js applications with a built-in load balancer.",
    why: "Ensures the backend application restarts automatically on server crashes or machine reboots.",
    internal: "Install PM2 globally, run pm2 start server.js, configure Nginx proxy passes blocks.",
    realtime: "Deploying API layers to Amazon Web Services (AWS) or DigitalOcean VPS.",
    hrms: "Deploying HRMS project assets to a live cloud host accessible by all employees.",
    company: "Netflix hosting API microservices managed by process controllers and Nginx routing.",
    folder: `my-mern-app/
├── dist/ (Compiled React Frontend)
├── server.js (Production Express entry)
└── ecosystem.config.js (PM2 Config File)`,
    flowDiagram: `Web Request -> Port 80 Nginx -> Port 5000 PM2 Node Server`,
    bestPractices: [
      "Always configure PM2 ecosystem files for managing multiple instances.",
      "Configure SSL certificates using Let's Encrypt directly on Nginx server."
    ],
    commonMistakes: [
      "Running Node server in root mode directly using 'node server.js' on production server.",
      "Forgetting to configure PM2 startup script to recover server processes after a server reboot."
    ],
    solving: {
      problem: "Server goes offline if node crashes due to unhandled exceptions.",
      solution: "Register the script under PM2 process monitor. It restarts the crashed process within milliseconds.",
      code: `pm2 startup
pm2 save`
    },
    assignments: [
      "Write a basic ecosystem config file ecosystem.config.js for PM2 process running configurations.",
      "Configure Nginx host proxy to bind server port 3000 requests to loop-back ports."
    ],
    interviews: [
      {
        q: "What does Gunicorn or PM2 do?",
        a: "They are production process managers that run script processes in background daemons, monitor memory footprint, load-balance requests, and auto-restart crashed applications."
      }
    ],
    summary: "PM2 runs Node servers in background daemons, load-balancing requests and auto-restarting crashed threads for production stability.",
    examples: {
      low: {
        prereq: "Terminal NPM scripts basic awareness.",
        code: `# LOW DIFFICULTY: Starting and monitoring server using PM2 commands
npm install -g pm2
pm2 start server.js --name "mern-backend-api"
pm2 list
pm2 status`,
        filename: "pm2_setup.sh",
        explanation: [
          "pm2 start - daemonizes node execution as background server process.",
          "pm2 status - monitors memory consumption and active status indicators."
        ]
      },
      medium: {
        prereq: "Docker and container commands setups.",
        code: `# MEDIUM DIFFICULTY: Containerizing Node.js server using Dockerfile
# Dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]`,
        filename: "Dockerfile",
        explanation: [
          "FROM node:18 - downloads baseline official Docker images.",
          "CMD - runs server execution command inside container box."
        ]
      },
      high: {
        prereq: "Nginx reverse proxy settings scripts.",
        code: `# HIGH DIFFICULTY: Nginx reverse proxy routing port 80 to PM2 port 5000
# /etc/nginx/sites-enabled/mern_api_config

server {
    listen 80;
    server_name api.my-mern-app.com;

    location / {
        proxy_pass http://127.0.0.1:5000; # Forward requests to Node.js backend port
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        filename: "nginx_mern.conf",
        explanation: [
          "proxy_pass http://127.0.0.1:5000 - acts as a reverse proxy, shielding Node application from direct web exposure."
        ]
      }
    }
  }
];
