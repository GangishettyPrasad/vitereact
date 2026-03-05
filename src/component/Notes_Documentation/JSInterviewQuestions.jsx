import React, { useState } from 'react';
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    category: "Basics",
    answer_en: `var is function-scoped, can be re-declared and updated. It is hoisted with undefined.
let is block-scoped, can be updated but not re-declared in the same scope. It is hoisted but not initialized (Temporal Dead Zone).
const is block-scoped, cannot be updated or re-declared. It must be initialized at declaration. But for objects/arrays, the content can be modified.`,
    answer_te: `var function-scoped, re-declare మరియు update చేయవచ్చు. ఇది undefined తో hoist అవుతుంది.
let block-scoped, update చేయవచ్చు కానీ same scope లో re-declare చేయలేము. ఇది hoist అవుతుంది కానీ initialize అవ్వదు (Temporal Dead Zone).
const block-scoped, update లేదా re-declare చేయలేము. Declaration సమయంలో initialize చేయాలి. కానీ objects/arrays లో content ని modify చేయవచ్చు.`,
    example: `// var - function scoped
function test() {
  var x = 10;
  if (true) {
    var x = 20; // same variable
    console.log(x); // 20
  }
  console.log(x); // 20
}

// let - block scoped
function test2() {
  let y = 10;
  if (true) {
    let y = 20; // different variable
    console.log(y); // 20
  }
  console.log(y); // 10
}

// const - cannot reassign
const name = "Prasad";
// name = "Other"; // Error!

const arr = [1, 2, 3];
arr.push(4); // This works! Content can change
console.log(arr); // [1, 2, 3, 4]`
  },
  {
    id: 2,
    question: "What is Hoisting in JavaScript?",
    category: "Basics",
    answer_en: `Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. Only declarations are hoisted, not initializations.
- var declarations are hoisted and initialized with undefined
- let and const are hoisted but NOT initialized (Temporal Dead Zone)
- Function declarations are fully hoisted (both name and body)
- Function expressions are NOT hoisted`,
    answer_te: `Hoisting అంటే JavaScript declarations ని code execute అయ్యే ముందు scope top కి move చేసే default behavior. Declarations మాత్రమే hoist అవుతాయి, initializations కాదు.
- var declarations hoist అవుతాయి మరియు undefined తో initialize అవుతాయి
- let మరియు const hoist అవుతాయి కానీ initialize అవ్వవు (Temporal Dead Zone)
- Function declarations పూర్తిగా hoist అవుతాయి (name మరియు body రెండూ)
- Function expressions hoist అవ్వవు`,
    example: `console.log(a); // undefined (var is hoisted)
var a = 5;

// console.log(b); // ReferenceError (TDZ)
let b = 10;

// Function declaration - fully hoisted
sayHello(); // "Hello!" - works!
function sayHello() {
  console.log("Hello!");
}

// Function expression - NOT hoisted
// greet(); // TypeError: greet is not a function
var greet = function() {
  console.log("Hi!");
};`
  },
  {
    id: 3,
    question: "What are Closures in JavaScript?",
    category: "Advanced",
    answer_en: `A closure is a function that has access to its outer function's variables even after the outer function has returned. It remembers the environment in which it was created. Closures are used for data privacy, creating factory functions, and maintaining state.`,
    answer_te: `Closure అంటే ఒక function దాని outer function variables ని outer function return అయిన తర్వాత కూడా access చేయగలదు. ఇది create అయిన environment ని remember చేస్తుంది. Closures data privacy, factory functions create చేయడం, మరియు state maintain చేయడం కోసం use చేస్తారు.`,
    example: `function counter() {
  let count = 0; // private variable
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const myCounter = counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1
console.log(myCounter.getCount());  // 1
// count variable is private - cannot access directly`
  },
  {
    id: 4,
    question: "What is the difference between == and ===?",
    category: "Basics",
    answer_en: `== (loose equality) compares values after type conversion (type coercion). It converts both values to the same type before comparing.
=== (strict equality) compares both value AND type without any conversion. It returns true only if both type and value are the same. Always prefer === to avoid unexpected bugs.`,
    answer_te: `== (loose equality) type conversion (type coercion) తర్వాత values ని compare చేస్తుంది. Compare చేయడానికి ముందు రెండు values ని same type కి convert చేస్తుంది.
=== (strict equality) ఎటువంటి conversion లేకుండా value మరియు type రెండింటిని compare చేస్తుంది. Type మరియు value రెండూ same అయితే మాత్రమే true return చేస్తుంది. Unexpected bugs avoid చేయడానికి ఎప్పుడూ === prefer చేయండి.`,
    example: `// == (loose equality) - type coercion happens
console.log(5 == "5");     // true (string converted to number)
console.log(0 == false);   // true (false converted to 0)
console.log(null == undefined); // true
console.log("" == false);  // true

// === (strict equality) - no type coercion
console.log(5 === "5");    // false (different types)
console.log(0 === false);  // false (number vs boolean)
console.log(null === undefined); // false
console.log("" === false); // false`
  },
  {
    id: 5,
    question: "What is the Event Loop in JavaScript?",
    category: "Advanced",
    answer_en: `JavaScript is single-threaded. The Event Loop is the mechanism that allows JS to perform non-blocking operations. It continuously checks the Call Stack and the Task Queue.
1. Code runs in the Call Stack
2. Async operations (setTimeout, fetch, etc.) go to Web APIs
3. When complete, callbacks go to Task Queue (macrotasks) or Microtask Queue (Promises)
4. Event Loop moves tasks from Queue to Call Stack when Stack is empty
5. Microtasks (Promises) have higher priority than Macrotasks (setTimeout)`,
    answer_te: `JavaScript single-threaded. Event Loop JS non-blocking operations perform చేయడానికి allow చేసే mechanism. ఇది Call Stack మరియు Task Queue ని continuously check చేస్తుంది.
1. Code Call Stack లో run అవుతుంది
2. Async operations (setTimeout, fetch, etc.) Web APIs కి వెళ్తాయి
3. Complete అయిన తర్వాత, callbacks Task Queue (macrotasks) లేదా Microtask Queue (Promises) కి వెళ్తాయి
4. Stack empty అయినప్పుడు Event Loop Queue నుండి Call Stack కి tasks move చేస్తుంది
5. Microtasks (Promises) కి Macrotasks (setTimeout) కంటే higher priority ఉంటుంది`,
    example: `console.log("1 - Start");

setTimeout(() => {
  console.log("2 - setTimeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise (microtask)");
});

console.log("4 - End");

// Output:
// 1 - Start
// 4 - End
// 3 - Promise (microtask)    <- microtask runs first
// 2 - setTimeout (macrotask) <- macrotask runs after`
  },
  {
    id: 6,
    question: "What is the difference between null and undefined?",
    category: "Basics",
    answer_en: `undefined means a variable has been declared but not assigned a value. It is the default value of uninitialized variables, missing function parameters, and missing object properties.
null is an intentional assignment that represents "no value" or "empty". It must be explicitly assigned. typeof null returns "object" (this is a known JS bug).`,
    answer_te: `undefined అంటే variable declare అయింది కానీ value assign అవ్వలేదు. ఇది uninitialized variables, missing function parameters, మరియు missing object properties యొక్క default value.
null అంటే "no value" లేదా "empty" ని represent చేసే intentional assignment. ఇది explicitly assign చేయాలి. typeof null "object" return చేస్తుంది (ఇది known JS bug).`,
    example: `let x;
console.log(x);        // undefined
console.log(typeof x); // "undefined"

let y = null;
console.log(y);        // null
console.log(typeof y); // "object" (JS bug!)

// Comparison
console.log(null == undefined);  // true
console.log(null === undefined); // false

// Function with missing parameter
function greet(name) {
  console.log(name); // undefined if not passed
}
greet();`
  },
  {
    id: 7,
    question: "What are Promises in JavaScript?",
    category: "Async",
    answer_en: `A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It has three states:
- Pending: initial state, neither fulfilled nor rejected
- Fulfilled: operation completed successfully (.then)
- Rejected: operation failed (.catch)
Promises solve the "callback hell" problem and make async code more readable.`,
    answer_te: `Promise అంటే asynchronous operation యొక్క eventual completion లేదా failure ని represent చేసే object. దీనికి three states ఉంటాయి:
- Pending: initial state, fulfilled లేదా rejected కాదు
- Fulfilled: operation successfully complete అయింది (.then)
- Rejected: operation fail అయింది (.catch)
Promises "callback hell" problem ని solve చేస్తాయి మరియు async code ని more readable చేస్తాయి.`,
    example: `// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Data fetched successfully!");
  } else {
    reject("Error fetching data!");
  }
});

// Using the Promise
myPromise
  .then(result => console.log(result))   // "Data fetched successfully!"
  .catch(error => console.log(error))
  .finally(() => console.log("Done!"));

// Promise.all - wait for all
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
]).then(([users, posts]) => {
  console.log("Both loaded!");
});`
  },
  {
    id: 8,
    question: "What is async/await?",
    category: "Async",
    answer_en: `async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.
- async keyword before a function makes it return a Promise
- await keyword pauses execution until the Promise resolves
- Use try/catch for error handling
- await can only be used inside an async function`,
    answer_te: `async/await అనేది Promises పై syntactic sugar, ఇది asynchronous code ని synchronous code లాగా కనిపించేలా మరియు behave అయ్యేలా చేస్తుంది.
- function ముందు async keyword దానిని Promise return చేసేలా చేస్తుంది
- await keyword Promise resolve అయ్యే వరకు execution pause చేస్తుంది
- Error handling కోసం try/catch use చేయండి
- await ని async function లోపల మాత్రమే use చేయవచ్చు`,
    example: `// Without async/await
function getData() {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

// With async/await - much cleaner!
async function getDataAsync() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error:", err);
  }
}

// Parallel execution with async/await
async function getAll() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  console.log(users, posts);
}`
  },
  {
    id: 9,
    question: "What is Destructuring in JavaScript?",
    category: "ES6+",
    answer_en: `Destructuring is a syntax that allows you to unpack values from arrays or properties from objects into separate variables. It makes code cleaner and more readable.
- Array destructuring uses square brackets []
- Object destructuring uses curly braces {}
- You can set default values
- You can rename variables (for objects)
- Works great with function parameters`,
    answer_te: `Destructuring అనేది arrays నుండి values లేదా objects నుండి properties ని separate variables లోకి unpack చేయడానికి allow చేసే syntax. ఇది code ని cleaner మరియు more readable చేస్తుంది.
- Array destructuring square brackets [] use చేస్తుంది
- Object destructuring curly braces {} use చేస్తుంది
- Default values set చేయవచ్చు
- Variables rename చేయవచ్చు (objects కోసం)
- Function parameters తో great గా work చేస్తుంది`,
    example: `// Array Destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
const [first, , third] = [10, 20, 30];
console.log(first, third); // 10 30

// Object Destructuring
const user = { name: "Prasad", age: 25, city: "Hyderabad" };
const { name, age, city } = user;
console.log(name); // "Prasad"

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName); // "Prasad"

// Default values
const { name: n, country = "India" } = user;
console.log(country); // "India"

// Function parameters
function greet({ name, city }) {
  console.log(name + " from " + city);
}
greet(user); // "Prasad from Hyderabad"`
  },
  {
    id: 10,
    question: "What is the Spread Operator (...)?",
    category: "ES6+",
    answer_en: `The spread operator (...) expands an iterable (array, object, string) into individual elements. It is used for:
- Copying arrays and objects (shallow copy)
- Merging arrays and objects
- Passing array elements as function arguments
- Converting strings to character arrays
Note: It creates a shallow copy, not a deep copy.`,
    answer_te: `Spread operator (...) iterable (array, object, string) ని individual elements లోకి expand చేస్తుంది. ఇది దీని కోసం use చేస్తారు:
- Arrays మరియు objects copy చేయడం (shallow copy)
- Arrays మరియు objects merge చేయడం
- Array elements ని function arguments గా pass చేయడం
- Strings ని character arrays లోకి convert చేయడం
Note: ఇది shallow copy create చేస్తుంది, deep copy కాదు.`,
    example: `// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Merge arrays
const merged = [...arr1, ...arr2];

// Merge objects (later values override)
const defaults = { theme: "light", lang: "en" };
const userPref = { theme: "dark" };
const settings = { ...defaults, ...userPref };
// { theme: "dark", lang: "en" }

// Function arguments
const numbers = [5, 2, 8, 1];
console.log(Math.max(...numbers)); // 8

// Copy array (shallow)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] - unchanged!`
  },
  {
    id: 11,
    question: "What are Arrow Functions?",
    category: "ES6+",
    answer_en: `Arrow functions are a shorter syntax for writing functions introduced in ES6. Key differences from regular functions:
- Shorter syntax
- No own 'this' binding - they inherit 'this' from the enclosing scope (lexical this)
- Cannot be used as constructors (no 'new' keyword)
- No 'arguments' object
- Cannot be used as methods in objects if you need 'this'`,
    answer_te: `Arrow functions ES6 లో introduce అయిన functions write చేయడానికి shorter syntax. Regular functions నుండి key differences:
- Shorter syntax
- Own 'this' binding ఉండదు - enclosing scope నుండి 'this' inherit చేస్తాయి (lexical this)
- Constructors గా use చేయలేము ('new' keyword లేదు)
- 'arguments' object ఉండదు
- 'this' అవసరమైతే objects లో methods గా use చేయకూడదు`,
    example: `// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// Single parameter - no parentheses needed
const double = x => x * 2;

// No parameters
const greet = () => "Hello!";

// Multi-line - need curly braces and return
const getUser = (name) => {
  const greeting = "Welcome " + name;
  return greeting;
};

// 'this' difference
const obj = {
  name: "Prasad",
  // Regular function - 'this' refers to obj
  sayHi: function() {
    console.log("Hi " + this.name); // "Hi Prasad"
  },
  // Arrow function - 'this' refers to outer scope (window)
  sayBye: () => {
    console.log("Bye " + this.name); // "Bye undefined"
  }
};`
  },
  {
    id: 12,
    question: "What is 'this' keyword in JavaScript?",
    category: "Advanced",
    answer_en: `'this' refers to the object that is currently executing the code. Its value depends on HOW a function is called:
- In global scope: 'this' = window (browser) / global (Node)
- In an object method: 'this' = the object
- In a regular function: 'this' = window (non-strict) / undefined (strict)
- In an arrow function: 'this' = inherited from outer scope
- With call/apply/bind: 'this' = the specified object
- In an event handler: 'this' = the element that received the event`,
    answer_te: `'this' currently code execute చేస్తున్న object ని refer చేస్తుంది. దీని value function ఎలా call అవుతుందో దాని మీద depend అవుతుంది:
- Global scope లో: 'this' = window (browser) / global (Node)
- Object method లో: 'this' = ఆ object
- Regular function లో: 'this' = window (non-strict) / undefined (strict)
- Arrow function లో: 'this' = outer scope నుండి inherited
- call/apply/bind తో: 'this' = specified object
- Event handler లో: 'this' = event receive చేసిన element`,
    example: `// Global
console.log(this); // window (in browser)

// Object method
const user = {
  name: "Prasad",
  greet() {
    console.log(this.name); // "Prasad"
  }
};

// call, apply, bind
function sayHi() {
  console.log("Hi " + this.name);
}
const person = { name: "Prasad" };

sayHi.call(person);    // "Hi Prasad"
sayHi.apply(person);   // "Hi Prasad"

const bound = sayHi.bind(person);
bound(); // "Hi Prasad"

// Arrow function - lexical this
const obj = {
  name: "Prasad",
  getData: function() {
    const inner = () => {
      console.log(this.name); // "Prasad" (from getData's this)
    };
    inner();
  }
};`
  },
  {
    id: 13,
    question: "What are Higher-Order Functions?",
    category: "Functions",
    answer_en: `A higher-order function is a function that either:
1. Takes one or more functions as arguments, OR
2. Returns a function as its result
Common examples: map(), filter(), reduce(), forEach(), sort(), setTimeout(). They enable functional programming patterns and make code more reusable and composable.`,
    answer_te: `Higher-order function అంటే:
1. ఒకటి లేదా ఎక్కువ functions ని arguments గా తీసుకునే function, లేదా
2. Result గా function return చేసే function
Common examples: map(), filter(), reduce(), forEach(), sort(), setTimeout(). ఇవి functional programming patterns ని enable చేస్తాయి మరియు code ని more reusable మరియు composable చేస్తాయి.`,
    example: `// Function as argument
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - combine all elements
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Function returning a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const triple = multiplier(3);
console.log(triple(5));  // 15
console.log(triple(10)); // 30`
  },
  {
    id: 14,
    question: "What is the difference between map(), filter(), and reduce()?",
    category: "Arrays",
    answer_en: `map() - Transforms each element and returns a new array of same length. Does not change the original array.
filter() - Returns a new array with only elements that pass a condition. Array length may be different.
reduce() - Reduces array to a single value by applying a function to each element with an accumulator.
All three are immutable (don't modify original array) and return new values.`,
    answer_te: `map() - ప్రతి element ని transform చేసి same length యొక్క new array return చేస్తుంది. Original array ని change చేయదు.
filter() - Condition pass అయిన elements మాత్రమే ఉన్న new array return చేస్తుంది. Array length different అవ్వవచ్చు.
reduce() - Accumulator తో ప్రతి element కి function apply చేసి array ని single value కి reduce చేస్తుంది.
మూడూ immutable (original array modify చేయవు) మరియు new values return చేస్తాయి.`,
    example: `const products = [
  { name: "Phone", price: 500 },
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];

// map - get all product names
const names = products.map(p => p.name);
// ["Phone", "Laptop", "Mouse", "Keyboard"]

// filter - expensive products (> 100)
const expensive = products.filter(p => p.price > 100);
// [{ name: "Phone", price: 500 }, { name: "Laptop", price: 1000 }]

// reduce - total price
const total = products.reduce((sum, p) => sum + p.price, 0);
// 1600

// Chaining all three
const result = products
  .filter(p => p.price > 50)       // filter expensive
  .map(p => ({ ...p, tax: p.price * 0.1 })) // add tax
  .reduce((sum, p) => sum + p.tax, 0);      // total tax
console.log(result); // 157.5`
  },
  {
    id: 15,
    question: "What is the difference between shallow copy and deep copy?",
    category: "Advanced",
    answer_en: `Shallow Copy: Copies only the first level. Nested objects/arrays are still references to the original. Spread operator and Object.assign create shallow copies.
Deep Copy: Copies everything including nested objects/arrays. Creates completely independent copy. JSON.parse(JSON.stringify()) or structuredClone() create deep copies.`,
    answer_te: `Shallow Copy: First level మాత్రమే copy చేస్తుంది. Nested objects/arrays ఇంకా original కి references గానే ఉంటాయి. Spread operator మరియు Object.assign shallow copies create చేస్తాయి.
Deep Copy: Nested objects/arrays తో సహా everything copy చేస్తుంది. Completely independent copy create చేస్తుంది. JSON.parse(JSON.stringify()) లేదా structuredClone() deep copies create చేస్తాయి.`,
    example: `// Shallow Copy
const original = { name: "Prasad", address: { city: "Hyderabad" } };

const shallow = { ...original };
shallow.name = "Kumar";         // does NOT affect original
shallow.address.city = "Delhi"; // AFFECTS original!

console.log(original.name);          // "Prasad" (safe)
console.log(original.address.city);  // "Delhi" (changed!)

// Deep Copy - Method 1: JSON
const deep1 = JSON.parse(JSON.stringify(original));
deep1.address.city = "Mumbai";
console.log(original.address.city); // "Delhi" (unchanged!)

// Deep Copy - Method 2: structuredClone (modern)
const deep2 = structuredClone(original);
deep2.address.city = "Chennai";
console.log(original.address.city); // "Delhi" (unchanged!)`
  },
  {
    id: 16,
    question: "What is Optional Chaining (?.) ?",
    category: "ES6+",
    answer_en: `Optional chaining (?.) allows you to safely access deeply nested properties without checking if each reference is null or undefined. If any part of the chain is null/undefined, it returns undefined instead of throwing an error. Works with properties, methods, and array indexing.`,
    answer_te: `Optional chaining (?.) ప్రతి reference null లేదా undefined అని check చేయకుండా deeply nested properties ని safely access చేయడానికి allow చేస్తుంది. Chain లో ఏదైనా part null/undefined అయితే, error throw చేయకుండా undefined return చేస్తుంది. Properties, methods, మరియు array indexing తో work చేస్తుంది.`,
    example: `const user = {
  name: "Prasad",
  address: {
    city: "Hyderabad",
    pin: { code: 500001 }
  },
  getEmail: () => "prasad@email.com"
};

// Without optional chaining (old way)
const city = user && user.address && user.address.city;

// With optional chaining (modern way)
const city2 = user?.address?.city; // "Hyderabad"
const zip = user?.address?.zip?.code; // undefined (no error!)

// With methods
const email = user?.getEmail?.(); // "prasad@email.com"
const phone = user?.getPhone?.(); // undefined (no error!)

// With arrays
const users = [{ name: "Prasad" }];
const first = users?.[0]?.name; // "Prasad"
const second = users?.[5]?.name; // undefined`
  },
  {
    id: 17,
    question: "What is Nullish Coalescing Operator (??)?",
    category: "ES6+",
    answer_en: `The nullish coalescing operator (??) returns the right-hand operand when the left-hand is null or undefined. Unlike || (OR operator), it does NOT treat 0, "", false, or NaN as fallback triggers. This is important when 0 or empty string are valid values.`,
    answer_te: `Nullish coalescing operator (??) left-hand null లేదా undefined అయినప్పుడు right-hand operand ని return చేస్తుంది. || (OR operator) కాకుండా, ఇది 0, "", false, లేదా NaN ని fallback triggers గా treat చేయదు. 0 లేదా empty string valid values అయినప్పుడు ఇది important.`,
    example: `// || vs ?? difference
const count = 0;
console.log(count || 10);  // 10 (0 is falsy!)
console.log(count ?? 10);  // 0  (0 is NOT null/undefined)

const text = "";
console.log(text || "default");  // "default" ("" is falsy!)
console.log(text ?? "default");  // ""  ("" is NOT null/undefined)

// Real use case
const userSettings = {
  theme: "dark",
  fontSize: 0,      // valid! means smallest
  nickname: "",      // valid! means no nickname
  language: null     // not set
};

const theme = userSettings.theme ?? "light";       // "dark"
const size = userSettings.fontSize ?? 14;           // 0 (correct!)
const nick = userSettings.nickname ?? "Anonymous";  // "" (correct!)
const lang = userSettings.language ?? "en";         // "en"`
  },
  {
    id: 18,
    question: "What is the difference between call(), apply(), and bind()?",
    category: "Functions",
    answer_en: `All three are used to set the 'this' value of a function:
- call() - Invokes function immediately with given 'this' and arguments passed individually
- apply() - Invokes function immediately with given 'this' and arguments passed as an array
- bind() - Returns a NEW function with 'this' permanently set. Does not invoke immediately.
Remember: call = comma (individual args), apply = array, bind = later`,
    answer_te: `మూడూ function యొక్క 'this' value set చేయడానికి use చేస్తారు:
- call() - Given 'this' తో function ని immediately invoke చేస్తుంది, arguments individually pass చేస్తారు
- apply() - Given 'this' తో function ని immediately invoke చేస్తుంది, arguments array గా pass చేస్తారు
- bind() - 'this' permanently set చేసిన NEW function return చేస్తుంది. Immediately invoke చేయదు.
Remember: call = comma (individual args), apply = array, bind = later`,
    example: `const person = { name: "Prasad" };

function introduce(greeting, punctuation) {
  console.log(greeting + ", I am " + this.name + punctuation);
}

// call - arguments individually
introduce.call(person, "Hello", "!");
// "Hello, I am Prasad!"

// apply - arguments as array
introduce.apply(person, ["Hi", "."]);
// "Hi, I am Prasad."

// bind - returns new function
const boundFn = introduce.bind(person, "Hey");
boundFn("!!"); // "Hey, I am Prasad!!"

// bind is useful for event handlers
const button = {
  text: "Click me",
  handleClick: function() {
    console.log(this.text);
  }
};
// setTimeout(button.handleClick, 1000); // undefined
setTimeout(button.handleClick.bind(button), 1000); // "Click me"`
  },
  {
    id: 19,
    question: "What are Template Literals?",
    category: "ES6+",
    answer_en: `Template literals (backticks \`\`) allow embedded expressions, multi-line strings, and string interpolation using \${expression}. They make string concatenation much cleaner. Tagged templates allow you to parse template literals with a function.`,
    answer_te: `Template literals (backticks \`\`) embedded expressions, multi-line strings, మరియు \${expression} use చేసి string interpolation allow చేస్తాయి. ఇవి string concatenation ని చాలా cleaner చేస్తాయి. Tagged templates function తో template literals parse చేయడానికి allow చేస్తాయి.`,
    example: `const name = "Prasad";
const age = 25;

// Old way - string concatenation
const old = "Hello, " + name + "! Age: " + age;

// Template literal - much cleaner
const modern = \`Hello, \${name}! Age: \${age}\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;

// Expressions inside
const price = 100;
const tax = 0.18;
console.log(\`Total: \${price + (price * tax)}\`); // "Total: 118"

// Conditional inside template
const status = \`User is \${age >= 18 ? "adult" : "minor"}\`;
console.log(status); // "User is adult"`
  },
  {
    id: 20,
    question: "What is Prototypal Inheritance?",
    category: "Advanced",
    answer_en: `In JavaScript, every object has a hidden [[Prototype]] property that links to another object. When you access a property that doesn't exist on an object, JavaScript looks up the prototype chain until it finds it or reaches null. This is how inheritance works in JS - objects inherit from other objects, not classes. ES6 classes are just syntactic sugar over prototypal inheritance.`,
    answer_te: `JavaScript లో, ప్రతి object కి hidden [[Prototype]] property ఉంటుంది, ఇది another object కి link అవుతుంది. Object మీద exist అవ్వని property ని access చేసినప్పుడు, JavaScript prototype chain లో find అయ్యే వరకు లేదా null reach అయ్యే వరకు look up చేస్తుంది. JS లో inheritance ఇలా work చేస్తుంది - objects other objects నుండి inherit చేస్తాయి, classes నుండి కాదు. ES6 classes prototypal inheritance పై syntactic sugar మాత్రమే.`,
    example: `// Prototype chain
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats);  // true (inherited from animal)
console.log(dog.barks); // true (own property)
dog.walk(); // "Animal walks" (inherited)

// ES6 Class (syntactic sugar)
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}

const s = new Student("Prasad", "A");
console.log(s.greet()); // "Hi, I'm Prasad" (inherited)`
  },
  {
    id: 21,
    question: "What is Debouncing and Throttling?",
    category: "Performance",
    answer_en: `Debouncing: Delays function execution until after a specified wait time has passed since the last call. If called again before the delay, the timer resets. Used for: search input, window resize.
Throttling: Ensures a function is called at most once in a specified time interval, regardless of how many times it's triggered. Used for: scroll events, button clicks.`,
    answer_te: `Debouncing: Last call తర్వాత specified wait time pass అయ్యే వరకు function execution delay చేస్తుంది. Delay ముందు మళ్ళీ call అయితే, timer reset అవుతుంది. Use: search input, window resize.
Throttling: ఎన్ని సార్లు trigger అయినా, specified time interval లో function ఒక్కసారి మాత్రమే call అయ్యేలా ensure చేస్తుంది. Use: scroll events, button clicks.`,
    example: `// Debounce - wait until user stops typing
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
  // API call here
}, 500);

// User types: "prasad"
search("p");       // timer starts
search("pr");      // timer resets
search("pra");     // timer resets
search("prasad");  // only THIS triggers after 500ms

// Throttle - max once per interval
function throttle(func, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 1000); // max once per second`
  },
  {
    id: 22,
    question: "What is Local Storage, Session Storage, and Cookies?",
    category: "Browser",
    answer_en: `localStorage: Stores data with no expiration. Data persists after browser is closed. ~5MB storage. Same-origin only.
sessionStorage: Stores data for one session. Data is deleted when tab is closed. ~5MB storage. Same-origin only.
Cookies: Stores small data (~4KB). Has expiration date. Sent with every HTTP request to server. Can be accessed by server-side code.`,
    answer_te: `localStorage: Expiration లేకుండా data store చేస్తుంది. Browser close అయిన తర్వాత కూడా data persist అవుతుంది. ~5MB storage. Same-origin only.
sessionStorage: ఒక session కోసం data store చేస్తుంది. Tab close అయినప్పుడు data delete అవుతుంది. ~5MB storage. Same-origin only.
Cookies: Small data (~4KB) store చేస్తుంది. Expiration date ఉంటుంది. ప్రతి HTTP request తో server కి send అవుతుంది. Server-side code access చేయవచ్చు.`,
    example: `// localStorage
localStorage.setItem("name", "Prasad");
localStorage.setItem("user", JSON.stringify({ id: 1, name: "Prasad" }));

const name = localStorage.getItem("name"); // "Prasad"
const user = JSON.parse(localStorage.getItem("user")); // { id: 1, name: "Prasad" }
localStorage.removeItem("name");
localStorage.clear(); // remove all

// sessionStorage (same API)
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
// Data gone when tab closes!

// Cookies
document.cookie = "username=Prasad; expires=Fri, 31 Dec 2026 23:59:59 GMT; path=/";
document.cookie = "theme=dark; max-age=86400"; // 1 day

// Read all cookies
console.log(document.cookie); // "username=Prasad; theme=dark"`
  },
  {
    id: 23,
    question: "What are JavaScript Modules (import/export)?",
    category: "ES6+",
    answer_en: `Modules allow you to split code into separate files. Each module has its own scope.
- Named export: Can have multiple per file. Must import with same name (or alias).
- Default export: Only one per file. Can import with any name.
- import is hoisted and read-only.
Modules use strict mode automatically.`,
    answer_te: `Modules code ని separate files లోకి split చేయడానికి allow చేస్తాయి. ప్రతి module కి own scope ఉంటుంది.
- Named export: File కి multiple ఉండవచ్చు. Same name (లేదా alias) తో import చేయాలి.
- Default export: File కి ఒక్కటే. ఏ name తోనైనా import చేయవచ్చు.
- import hoist అవుతుంది మరియు read-only.
Modules automatically strict mode use చేస్తాయి.`,
    example: `// ---- utils.js ----
// Named exports
export const PI = 3.14;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Default export
export default class Calculator {
  multiply(a, b) { return a * b; }
}

// ---- app.js ----
// Import default (any name)
import Calculator from './utils.js';
import MyCalc from './utils.js'; // also works!

// Import named (exact name or alias)
import { PI, add, subtract as sub } from './utils.js';

// Import all
import * as Utils from './utils.js';
console.log(Utils.PI);   // 3.14
console.log(Utils.add(2, 3)); // 5

const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20`
  },
  {
    id: 24,
    question: "What is Event Bubbling and Capturing?",
    category: "DOM",
    answer_en: `When an event occurs on an element, it goes through three phases:
1. Capturing Phase: Event travels from window DOWN to the target element
2. Target Phase: Event reaches the target element
3. Bubbling Phase: Event travels from target UP to the window
By default, event listeners use bubbling. Use addEventListener's third parameter (true) for capturing. event.stopPropagation() stops the event from continuing.`,
    answer_te: `Element మీద event occur అయినప్పుడు, ఇది three phases గుండా వెళ్తుంది:
1. Capturing Phase: Event window నుండి DOWN target element కి travel చేస్తుంది
2. Target Phase: Event target element ని reach చేస్తుంది
3. Bubbling Phase: Event target నుండి UP window కి travel చేస్తుంది
Default గా, event listeners bubbling use చేస్తాయి. Capturing కోసం addEventListener third parameter (true) use చేయండి. event.stopPropagation() event ని continue అవ్వకుండా stop చేస్తుంది.`,
    example: `// HTML: <div id="parent"><button id="child">Click</button></div>

// Bubbling (default) - child fires first, then parent
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked"); // fires second
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked"); // fires first
});
// Click button: "Child clicked" -> "Parent clicked"

// Capturing - parent fires first
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent captured");
}, true); // true = capturing phase

// Stop propagation
document.getElementById("child").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Only child"); // parent won't fire
});

// Event delegation (uses bubbling)
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked!");
  }
});`
  },
  {
    id: 25,
    question: "What is the difference between forEach(), map(), and for...of?",
    category: "Arrays",
    answer_en: `forEach(): Executes a function for each element. Returns undefined. Cannot break out of it.
map(): Executes a function for each element and returns a NEW array with results. Used when you need to transform data.
for...of: Iterates over iterable objects. Can use break, continue, return. Works with arrays, strings, maps, sets.
Use map when you need a new array, forEach for side effects, for...of when you need break/continue.`,
    answer_te: `forEach(): ప్రతి element కి function execute చేస్తుంది. undefined return చేస్తుంది. Break చేయలేము.
map(): ప్రతి element కి function execute చేసి results తో NEW array return చేస్తుంది. Data transform చేయాల్సినప్పుడు use చేస్తారు.
for...of: Iterable objects మీద iterate చేస్తుంది. break, continue, return use చేయవచ్చు. Arrays, strings, maps, sets తో work చేస్తుంది.
New array కావాలంటే map, side effects కోసం forEach, break/continue కావాలంటే for...of use చేయండి.`,
    example: `const numbers = [1, 2, 3, 4, 5];

// forEach - no return value
const result1 = numbers.forEach(n => console.log(n));
console.log(result1); // undefined

// map - returns new array
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// for...of - can break
for (const n of numbers) {
  if (n === 3) break; // can break!
  console.log(n); // 1, 2
}

// forEach CANNOT break
numbers.forEach(n => {
  // if (n === 3) break; // SyntaxError!
  console.log(n); // prints all: 1,2,3,4,5
});

// for...of with strings
for (const char of "Hello") {
  console.log(char); // H, e, l, l, o
}`
  },
  {
    id: 26,
    question: "What is try...catch...finally?",
    category: "Error Handling",
    answer_en: `try...catch...finally is used for error handling:
- try: Block of code to test for errors
- catch: Block to handle the error (receives error object)
- finally: Block that always executes regardless of result
You can throw custom errors using 'throw'. Works with both synchronous code and async/await.`,
    answer_te: `try...catch...finally error handling కోసం use చేస్తారు:
- try: Errors కోసం test చేసే code block
- catch: Error handle చేసే block (error object receive చేస్తుంది)
- finally: Result తో సంబంధం లేకుండా ఎప్పుడూ execute అయ్యే block
'throw' use చేసి custom errors throw చేయవచ్చు. Synchronous code మరియు async/await రెండింటితో work చేస్తుంది.`,
    example: `// Basic try-catch
try {
  const data = JSON.parse("invalid json");
} catch (error) {
  console.log("Error:", error.message);
  // "Error: Unexpected token i in JSON"
} finally {
  console.log("Always runs!");
}

// Throw custom error
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (e) {
  console.log(e.message); // "Cannot divide by zero!"
}

// With async/await
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error("HTTP Error: " + res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
}`
  },
  {
    id: 27,
    question: "What are Generators in JavaScript?",
    category: "Advanced",
    answer_en: `Generators are special functions that can be paused and resumed. They use function* syntax and yield keyword to pause execution. Calling a generator returns an iterator object with a next() method. Each next() call returns { value, done }. Useful for lazy evaluation, infinite sequences, and async flow control.`,
    answer_te: `Generators pause మరియు resume చేయగల special functions. ఇవి function* syntax మరియు yield keyword use చేసి execution pause చేస్తాయి. Generator call చేస్తే next() method ఉన్న iterator object return అవుతుంది. ప్రతి next() call { value, done } return చేస్తుంది. Lazy evaluation, infinite sequences, మరియు async flow control కోసం useful.`,
    example: `// Basic generator
function* numberGen() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGen();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite sequence
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3

// Iterate with for...of
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}`
  },
  {
    id: 28,
    question: "What is the difference between Set and Map?",
    category: "Data Structures",
    answer_en: `Set: Collection of UNIQUE values. No key-value pairs. Values can be of any type. Useful for removing duplicates. Methods: add(), delete(), has(), size.
Map: Collection of KEY-VALUE pairs where keys can be ANY type (objects, functions, etc.). Unlike regular objects where keys must be strings. Methods: set(), get(), delete(), has(), size. Maps maintain insertion order.`,
    answer_te: `Set: UNIQUE values collection. Key-value pairs ఉండవు. Values ఏ type అయినా ఉండవచ్చు. Duplicates remove చేయడానికి useful. Methods: add(), delete(), has(), size.
Map: KEY-VALUE pairs collection, keys ఏ type అయినా ఉండవచ్చు (objects, functions, etc.). Regular objects లో keys strings అయి ఉండాలి, Map లో కాదు. Methods: set(), get(), delete(), has(), size. Maps insertion order maintain చేస్తాయి.`,
    example: `// Set - unique values only
const mySet = new Set([1, 2, 3, 3, 4, 4]);
console.log(mySet); // Set {1, 2, 3, 4}
console.log(mySet.size); // 4

mySet.add(5);
mySet.delete(1);
console.log(mySet.has(3)); // true

// Remove duplicates from array
const arr = [1, 1, 2, 2, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Map - any type as key
const myMap = new Map();
const objKey = { id: 1 };

myMap.set("name", "Prasad");
myMap.set(42, "a number key");
myMap.set(objKey, "object as key!");

console.log(myMap.get("name"));   // "Prasad"
console.log(myMap.get(objKey));    // "object as key!"
console.log(myMap.size);           // 3

// Iterate Map
for (const [key, value] of myMap) {
  console.log(key, "=>", value);
}`
  },
  {
    id: 29,
    question: "What is the difference between synchronous and asynchronous JavaScript?",
    category: "Async",
    answer_en: `Synchronous: Code executes line by line, one after another. Each line waits for the previous one to complete. Blocks further execution.
Asynchronous: Code does NOT wait for long-running operations. It continues executing next lines while the async operation runs in the background. When complete, a callback/promise handles the result. Examples: setTimeout, fetch, file operations, database queries.`,
    answer_te: `Synchronous: Code line by line execute అవుతుంది, ఒక దాని తర్వాత ఒకటి. ప్రతి line previous one complete అయ్యే వరకు wait చేస్తుంది. Further execution block అవుతుంది.
Asynchronous: Long-running operations కోసం code wait చేయదు. Async operation background లో run అవుతుండగా next lines execute అవుతాయి. Complete అయినప్పుడు, callback/promise result handle చేస్తుంది. Examples: setTimeout, fetch, file operations, database queries.`,
    example: `// Synchronous - blocks execution
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3 (in order)

// Asynchronous - non-blocking
console.log("1");

setTimeout(() => {
  console.log("2 - after 2 seconds");
}, 2000);

console.log("3");
// Output: 1, 3, then after 2 sec: 2

// Real world example - API call
console.log("Fetching data...");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => res.json())
  .then(data => console.log("Data:", data))
  .catch(err => console.log("Error:", err));

console.log("This runs before data arrives!");
// Output:
// "Fetching data..."
// "This runs before data arrives!"
// "Data: { ... }"  <- arrives later`
  },
  {
    id: 30,
    question: "What are WeakMap and WeakSet?",
    category: "Data Structures",
    answer_en: `WeakMap: Like Map but keys MUST be objects. Keys are held weakly - if no other reference to the key exists, it can be garbage collected. Not iterable (no forEach, no size).
WeakSet: Like Set but values MUST be objects. Values are held weakly. Not iterable.
Use cases: Storing private data associated with objects, caching, tracking DOM elements without memory leaks.`,
    answer_te: `WeakMap: Map లాంటిదే కానీ keys objects అయి ఉండాలి. Keys weakly hold అవుతాయి - key కి other reference లేకపోతే garbage collect అవ్వవచ్చు. Iterable కాదు (forEach, size లేదు).
WeakSet: Set లాంటిదే కానీ values objects అయి ఉండాలి. Values weakly hold అవుతాయి. Iterable కాదు.
Use cases: Objects తో associated private data store చేయడం, caching, memory leaks లేకుండా DOM elements track చేయడం.`,
    example: `// WeakMap
const weakMap = new WeakMap();
let user = { name: "Prasad" };

weakMap.set(user, "some private data");
console.log(weakMap.get(user)); // "some private data"

user = null; // object can now be garbage collected!
// weakMap entry is automatically removed

// WeakSet
const weakSet = new WeakSet();
let obj1 = { id: 1 };
let obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);
console.log(weakSet.has(obj1)); // true

obj1 = null; // can be garbage collected
// weakSet entry is automatically removed

// Practical: Track visited objects
const visited = new WeakSet();
function processUser(user) {
  if (visited.has(user)) {
    console.log("Already processed!");
    return;
  }
  visited.add(user);
  console.log("Processing:", user.name);
}`
  },
  {
    id: 31,
    question: "What is Currying in JavaScript?",
    category: "Advanced",
    answer_en: `Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. f(a, b, c) becomes f(a)(b)(c). It enables partial application, creating specialized functions from general ones. Very useful in functional programming.`,
    answer_te: `Currying multiple arguments ఉన్న function ని sequence of functions గా transform చేస్తుంది, ప్రతి ఒక్కటి single argument తీసుకుంటుంది. f(a, b, c) f(a)(b)(c) అవుతుంది. ఇది partial application enable చేస్తుంది, general functions నుండి specialized functions create చేస్తుంది. Functional programming లో చాలా useful.`,
    example: `// Normal function
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function currying
const multiply = a => b => a * b;

const double = multiply(2);   // partial application
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Real-world: logger with levels
const log = level => message => console.log(\`[\${level}] \${message}\`);

const info = log("INFO");
const error = log("ERROR");

info("Server started");    // [INFO] Server started
error("Connection failed"); // [ERROR] Connection failed`
  },
  {
    id: 32,
    question: "What is the Rest Parameter (...args)?",
    category: "ES6+",
    answer_en: `The rest parameter (...) collects all remaining arguments into an array. It must be the last parameter. Unlike the arguments object, rest parameters are a real Array (you can use map, filter, etc.). It's the opposite of the spread operator.`,
    answer_te: `Rest parameter (...) remaining arguments అన్నింటిని array లోకి collect చేస్తుంది. ఇది last parameter అయి ఉండాలి. Arguments object కాకుండా, rest parameters real Array (map, filter, etc. use చేయవచ్చు). ఇది spread operator కి opposite.`,
    example: `// Rest parameter - collects arguments
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// First arg separate, rest collected
function greet(greeting, ...names) {
  return names.map(name => greeting + " " + name);
}
console.log(greet("Hello", "Prasad", "Kumar", "Ravi"));
// ["Hello Prasad", "Hello Kumar", "Hello Ravi"]

// Rest vs arguments
function oldWay() {
  // arguments is array-like, NOT a real array
  // arguments.map(...) // Error!
  console.log(arguments); // { 0: 'a', 1: 'b', length: 2 }
}

function newWay(...args) {
  // args IS a real array
  console.log(args.map(a => a.toUpperCase())); // ["A", "B"]
}
newWay("a", "b");

// Destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]`
  },
  {
    id: 33,
    question: "What is the difference between Object.freeze(), Object.seal(), and Object.preventExtensions()?",
    category: "Objects",
    answer_en: `Object.freeze(): Cannot add, delete, or modify properties. Completely immutable (shallow).
Object.seal(): Cannot add or delete properties, but CAN modify existing property values.
Object.preventExtensions(): Cannot add new properties, but CAN modify and delete existing ones.
All three are shallow - nested objects are NOT affected.`,
    answer_te: `Object.freeze(): Properties add, delete, లేదా modify చేయలేము. Completely immutable (shallow).
Object.seal(): Properties add లేదా delete చేయలేము, కానీ existing property values modify చేయవచ్చు.
Object.preventExtensions(): New properties add చేయలేము, కానీ existing ones modify మరియు delete చేయవచ్చు.
మూడూ shallow - nested objects affect అవ్వవు.`,
    example: `// Object.freeze() - fully immutable
const frozen = Object.freeze({ name: "Prasad", age: 25 });
frozen.name = "Kumar";   // silently fails (strict: error)
frozen.city = "Hyd";     // silently fails
delete frozen.age;       // silently fails
console.log(frozen);     // { name: "Prasad", age: 25 }

// Object.seal() - can modify, can't add/delete
const sealed = Object.seal({ name: "Prasad", age: 25 });
sealed.name = "Kumar";   // works!
sealed.city = "Hyd";     // fails
delete sealed.age;       // fails
console.log(sealed);     // { name: "Kumar", age: 25 }

// Object.preventExtensions() - can't add
const noExt = Object.preventExtensions({ name: "Prasad", age: 25 });
noExt.name = "Kumar";    // works!
noExt.city = "Hyd";      // fails
delete noExt.age;        // works!
console.log(noExt);      // { name: "Kumar" }

// All are SHALLOW
const obj = Object.freeze({ data: { x: 1 } });
obj.data.x = 99; // works! Nested object is not frozen
console.log(obj.data.x); // 99`
  },
  {
    id: 34,
    question: "What is Memoization?",
    category: "Performance",
    answer_en: `Memoization is an optimization technique that caches the results of expensive function calls. When the same inputs occur again, it returns the cached result instead of recalculating. This improves performance for functions called repeatedly with the same arguments. Common in React with useMemo and useCallback hooks.`,
    answer_te: `Memoization expensive function calls results cache చేసే optimization technique. Same inputs మళ్ళీ వచ్చినప్పుడు, recalculate చేయకుండా cached result return చేస్తుంది. Same arguments తో repeatedly call అయ్యే functions performance improve చేస్తుంది. React లో useMemo మరియు useCallback hooks తో common.`,
    example: `// Without memoization
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// fibonacci(40) is VERY slow - calculates same values many times

// With memoization
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("From cache!");
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const fastFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
});

console.log(fastFib(40)); // Fast! Uses cache
console.log(fastFib(40)); // "From cache!" - instant!

// Simple memoized function
const expensiveCalc = memoize((x, y) => {
  console.log("Calculating...");
  return x * y + x + y;
});
expensiveCalc(5, 10); // "Calculating..." -> 65
expensiveCalc(5, 10); // "From cache!" -> 65`
  },
  {
    id: 35,
    question: "What is the difference between Promise.all(), Promise.race(), Promise.allSettled(), and Promise.any()?",
    category: "Async",
    answer_en: `Promise.all(): Waits for ALL promises to resolve. Rejects if ANY one fails.
Promise.race(): Returns result of the FIRST promise to settle (resolve or reject).
Promise.allSettled(): Waits for ALL promises to settle. Returns all results (both fulfilled and rejected). Never rejects.
Promise.any(): Returns the FIRST promise to RESOLVE. Rejects only if ALL fail.`,
    answer_te: `Promise.all(): ALL promises resolve అయ్యే వరకు wait చేస్తుంది. ఏదైనా ఒకటి fail అయితే reject అవుతుంది.
Promise.race(): FIRST settle (resolve లేదా reject) అయ్యే promise result return చేస్తుంది.
Promise.allSettled(): ALL promises settle అయ్యే వరకు wait చేస్తుంది. All results (fulfilled మరియు rejected రెండూ) return చేస్తుంది. Never rejects.
Promise.any(): FIRST RESOLVE అయ్యే promise return చేస్తుంది. ALL fail అయితే మాత్రమే reject.`,
    example: `const p1 = Promise.resolve("One");
const p2 = new Promise(res => setTimeout(() => res("Two"), 1000));
const p3 = Promise.reject("Error!");

// Promise.all - all must succeed
Promise.all([p1, p2])
  .then(results => console.log(results)); // ["One", "Two"]

Promise.all([p1, p3])
  .catch(err => console.log(err)); // "Error!" (p3 rejected)

// Promise.race - first to finish wins
Promise.race([p1, p2])
  .then(result => console.log(result)); // "One" (faster)

// Promise.allSettled - get all results
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
// [
//   { status: "fulfilled", value: "One" },
//   { status: "fulfilled", value: "Two" },
//   { status: "rejected", reason: "Error!" }
// ]

// Promise.any - first success
Promise.any([p3, p1, p2])
  .then(result => console.log(result)); // "One" (first success)`
  },
  {
    id: 36,
    question: "What is Object Destructuring with Nested Objects?",
    category: "ES6+",
    answer_en: `You can destructure deeply nested objects by matching the structure. This extracts values from nested levels directly into variables. You can also rename nested properties and set default values at any level.`,
    answer_te: `Structure match చేసి deeply nested objects destructure చేయవచ్చు. ఇది nested levels నుండి values ని directly variables లోకి extract చేస్తుంది. Nested properties rename చేయవచ్చు మరియు ఏ level లోనైనా default values set చేయవచ్చు.`,
    example: `const employee = {
  name: "Prasad",
  age: 25,
  address: {
    city: "Hyderabad",
    state: "Telangana",
    pin: { code: 500001, area: "Ameerpet" }
  },
  skills: ["JavaScript", "React", "Node"]
};

// Nested destructuring
const {
  name,
  address: { city, state },
  address: { pin: { code, area } }
} = employee;

console.log(name);  // "Prasad"
console.log(city);  // "Hyderabad"
console.log(code);  // 500001
console.log(area);  // "Ameerpet"

// Rename nested
const { address: { city: myCity } } = employee;
console.log(myCity); // "Hyderabad"

// Default values for nested
const { address: { country = "India" } } = employee;
console.log(country); // "India"

// Array + Object destructuring
const { skills: [firstSkill, ...otherSkills] } = employee;
console.log(firstSkill);   // "JavaScript"
console.log(otherSkills);  // ["React", "Node"]

// In function parameters
function printEmployee({ name, address: { city } }) {
  console.log(name + " from " + city);
}
printEmployee(employee); // "Prasad from Hyderabad"`
  },
  {
    id: 37,
    question: "What is Event Delegation?",
    category: "DOM",
    answer_en: `Event delegation is a pattern where you add a single event listener to a parent element instead of adding listeners to each child. It leverages event bubbling - clicks on children bubble up to the parent. Benefits: Better performance (fewer listeners), works with dynamically added elements, less memory usage.`,
    answer_te: `Event delegation ప్రతి child కి listeners add చేయకుండా parent element కి single event listener add చేసే pattern. ఇది event bubbling leverage చేస్తుంది - children మీద clicks parent కి bubble up అవుతాయి. Benefits: Better performance (fewer listeners), dynamically added elements తో work చేస్తుంది, less memory usage.`,
    example: `// Without delegation - BAD for many items
// document.querySelectorAll("li").forEach(li => {
//   li.addEventListener("click", handleClick);
// });

// With delegation - GOOD
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
    e.target.classList.toggle("selected");
  }
});

// Works with dynamically added elements!
const newItem = document.createElement("li");
newItem.textContent = "New Item";
document.getElementById("list").appendChild(newItem);
// Click on "New Item" works without adding new listener!

// React example (similar concept)
function TodoList() {
  const [items, setItems] = React.useState(["Buy milk", "Read book"]);

  const handleClick = (e) => {
    // Event delegation in React
    if (e.target.dataset.index) {
      console.log("Clicked item:", items[e.target.dataset.index]);
    }
  };

  return (
    <ul onClick={handleClick}>
      {items.map((item, i) => (
        <li key={i} data-index={i}>{item}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 38,
    question: "What is the Temporal Dead Zone (TDZ)?",
    category: "Basics",
    answer_en: `The Temporal Dead Zone is the time between entering a scope where a let/const variable is declared and the actual declaration line. During TDZ, accessing the variable throws a ReferenceError. This happens because let/const are hoisted but NOT initialized. var doesn't have TDZ because it's initialized with undefined during hoisting.`,
    answer_te: `Temporal Dead Zone అంటే let/const variable declare అయిన scope enter అయిన time మరియు actual declaration line మధ్య time. TDZ లో variable access చేస్తే ReferenceError throw అవుతుంది. let/const hoist అవుతాయి కానీ initialize అవ్వవు కాబట్టి ఇది జరుగుతుంది. var కి TDZ ఉండదు ఎందుకంటే hoisting లో undefined తో initialize అవుతుంది.`,
    example: `// TDZ for let
{
  // TDZ starts here for 'name'
  // console.log(name); // ReferenceError!
  // console.log(name); // ReferenceError!
  let name = "Prasad"; // TDZ ends here
  console.log(name);   // "Prasad" - works!
}

// TDZ for const
{
  // console.log(PI); // ReferenceError!
  const PI = 3.14;
  console.log(PI); // 3.14
}

// var has NO TDZ
{
  console.log(x); // undefined (hoisted with undefined)
  var x = 10;
  console.log(x); // 10
}

// TDZ in function parameters
// function test(a = b, b = 1) { } // ReferenceError! b in TDZ when a uses it
function test(a = 1, b = a) { return [a, b]; } // OK!
console.log(test()); // [1, 1]`
  },
  {
    id: 39,
    question: "What is the difference between Object.keys(), Object.values(), and Object.entries()?",
    category: "Objects",
    answer_en: `Object.keys(): Returns an array of the object's own enumerable property NAMES (strings).
Object.values(): Returns an array of the object's own enumerable property VALUES.
Object.entries(): Returns an array of [key, value] pairs. Useful for iterating and converting to Map.
All three ignore prototype properties and non-enumerable properties.`,
    answer_te: `Object.keys(): Object own enumerable property NAMES (strings) array return చేస్తుంది.
Object.values(): Object own enumerable property VALUES array return చేస్తుంది.
Object.entries(): [key, value] pairs array return చేస్తుంది. Iterating మరియు Map కి converting కోసం useful.
మూడూ prototype properties మరియు non-enumerable properties ignore చేస్తాయి.`,
    example: `const user = {
  name: "Prasad",
  age: 25,
  city: "Hyderabad"
};

// Object.keys()
console.log(Object.keys(user));
// ["name", "age", "city"]

// Object.values()
console.log(Object.values(user));
// ["Prasad", 25, "Hyderabad"]

// Object.entries()
console.log(Object.entries(user));
// [["name", "Prasad"], ["age", 25], ["city", "Hyderabad"]]

// Practical: Loop over object
Object.entries(user).forEach(([key, value]) => {
  console.log(key + ": " + value);
});
// name: Prasad
// age: 25
// city: Hyderabad

// Convert to Map
const userMap = new Map(Object.entries(user));
console.log(userMap.get("name")); // "Prasad"

// Object from entries
const arr = [["a", 1], ["b", 2]];
const obj = Object.fromEntries(arr);
console.log(obj); // { a: 1, b: 2 }`
  },
  {
    id: 40,
    question: "What is Proxy in JavaScript?",
    category: "Advanced",
    answer_en: `A Proxy wraps an object and intercepts operations like property access, assignment, function calls, etc. It uses a handler object with trap methods (get, set, has, deleteProperty, etc.). Useful for validation, logging, default values, data binding, and creating reactive systems. Used internally by Vue.js for reactivity.`,
    answer_te: `Proxy ఒక object ని wrap చేసి property access, assignment, function calls వంటి operations intercept చేస్తుంది. ఇది trap methods (get, set, has, deleteProperty, etc.) ఉన్న handler object use చేస్తుంది. Validation, logging, default values, data binding, మరియు reactive systems create చేయడానికి useful. Vue.js reactivity కోసం internally use చేస్తుంది.`,
    example: `// Basic Proxy with validation
const handler = {
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number!");
    }
    if (property === "age" && (value < 0 || value > 150)) {
      throw new RangeError("Age must be 0-150!");
    }
    target[property] = value;
    return true;
  },
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return "Property not found!";
  }
};

const user = new Proxy({}, handler);
user.name = "Prasad";  // works
user.age = 25;         // works
// user.age = "twenty"; // TypeError!
// user.age = 200;      // RangeError!

console.log(user.name);    // "Prasad"
console.log(user.unknown); // "Property not found!"

// Logging proxy
const logged = new Proxy(user, {
  get(target, prop) {
    console.log("Reading " + prop);
    return target[prop];
  }
});
logged.name; // logs "Reading name", returns "Prasad"`
  }
];

const categories = [...new Set(questions.map(q => q.category))];

const categoryColors = {
  "Basics": "#4caf50",
  "Advanced": "#f44336",
  "ES6+": "#2196f3",
  "Async": "#ff9800",
  "Functions": "#9c27b0",
  "Arrays": "#00bcd4",
  "DOM": "#795548",
  "Performance": "#e91e63",
  "Browser": "#607d8b",
  "Error Handling": "#ff5722",
  "Data Structures": "#3f51b5",
  "Objects": "#009688",
};

const JSInterviewQuestions = () => {
  const [lang, setLang] = useState("en");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = selectedCategory === "All"
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <Box sx={{ p: 2, maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        JavaScript Interview Questions & Answers
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: '#666' }}>
        {questions.length} Most Important Questions ({lang === 'en' ? 'English' : 'Telugu'})
      </Typography>

      {/* Language Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={(e, val) => val && setLang(val)}
          size="small"
        >
          <ToggleButton value="en" sx={{ px: 3 }}>English</ToggleButton>
          <ToggleButton value="te" sx={{ px: 3 }}>Telugu</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Category Filter */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
        <Chip
          label="All"
          onClick={() => setSelectedCategory("All")}
          color={selectedCategory === "All" ? "primary" : "default"}
          variant={selectedCategory === "All" ? "filled" : "outlined"}
        />
        {categories.map(cat => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              backgroundColor: selectedCategory === cat ? categoryColors[cat] : 'transparent',
              color: selectedCategory === cat ? '#fff' : categoryColors[cat],
              borderColor: categoryColors[cat],
            }}
            variant={selectedCategory === cat ? "filled" : "outlined"}
          />
        ))}
      </Box>

      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#999' }}>
        Showing {filtered.length} of {questions.length} questions
      </Typography>

      {/* Questions */}
      {filtered.map((q) => (
        <Accordion
          key={q.id}
          expanded={expandedId === q.id}
          onChange={() => setExpandedId(expandedId === q.id ? null : q.id)}
          sx={{ mb: 1, borderLeft: `4px solid ${categoryColors[q.category] || '#1976d2'}` }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Chip
                label={q.id}
                size="small"
                sx={{ minWidth: 35, fontWeight: 'bold', backgroundColor: categoryColors[q.category], color: '#fff' }}
              />
              <Typography sx={{ fontWeight: 600, flex: 1 }}>{q.question}</Typography>
              <Chip label={q.category} size="small" variant="outlined"
                sx={{ borderColor: categoryColors[q.category], color: categoryColors[q.category] }} />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {/* Answer */}
            <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f0f7ff' }}>
              <Typography variant="subtitle2" sx={{ color: '#1976d2', mb: 1, fontWeight: 'bold' }}>
                {lang === 'en' ? 'Answer (English):' : 'Answer (Telugu):'}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {lang === 'en' ? q.answer_en : q.answer_te}
              </Typography>
            </Paper>

            {/* Example */}
            <Paper sx={{ p: 2, backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#4ec9b0', mb: 1, fontWeight: 'bold' }}>
                Example:
              </Typography>
              <pre style={{ margin: 0, overflow: 'auto', fontSize: '13px', lineHeight: '1.6', fontFamily: 'Consolas, monospace' }}>
                <code>{q.example}</code>
              </pre>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default JSInterviewQuestions;
