import React, { useState } from 'react';
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const topics = [
  {
    id: 1,
    title: "Variables (var, let, const)",
    category: "Basics",
    explain_en: `Variables are containers for storing data values. JavaScript has 3 ways to declare variables:

var: Old way (ES5). Function-scoped. Can be re-declared and updated. Hoisted with undefined.
let: Modern way (ES6). Block-scoped. Can be updated but NOT re-declared in same scope. Has Temporal Dead Zone.
const: Modern way (ES6). Block-scoped. Cannot be updated or re-declared. Must be initialized at declaration. Objects/arrays declared with const CAN have their contents modified.

Best Practice: Use const by default. Use let only when you need to reassign. Avoid var completely in modern code.`,
    explain_te: `Variables data values store చేయడానికి containers. JavaScript లో variables declare చేయడానికి 3 ways ఉన్నాయి:

var: Old way (ES5). Function-scoped. Re-declare మరియు update చేయవచ్చు. undefined తో hoist అవుతుంది.
let: Modern way (ES6). Block-scoped. Update చేయవచ్చు కానీ same scope లో re-declare చేయలేము. Temporal Dead Zone ఉంటుంది.
const: Modern way (ES6). Block-scoped. Update లేదా re-declare చేయలేము. Declaration సమయంలో initialize చేయాలి. const తో declare చేసిన Objects/arrays contents modify చేయవచ్చు.

Best Practice: Default గా const use చేయండి. Reassign అవసరమైనప్పుడు మాత్రమే let use చేయండి. Modern code లో var completely avoid చేయండి.`,
    example: `// ===== var (function-scoped) =====
function varExample() {
  var x = 10;
  if (true) {
    var x = 20;  // Same variable! Overwrites above
    console.log(x); // 20
  }
  console.log(x); // 20 (affected by if block)
}
varExample();

// ===== let (block-scoped) =====
function letExample() {
  let y = 10;
  if (true) {
    let y = 20;  // Different variable (new block scope)
    console.log(y); // 20
  }
  console.log(y); // 10 (not affected)
}
letExample();

// ===== const (cannot reassign) =====
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable

// But object CONTENTS can change
const user = { name: "Prasad", age: 25 };
user.age = 26;        // This works!
user.city = "Hyderabad"; // This works too!
console.log(user);    // { name: "Prasad", age: 26, city: "Hyderabad" }
// user = {};          // TypeError! Cannot reassign the variable itself

// const with arrays
const colors = ["red", "green"];
colors.push("blue");  // Works! Modifying contents
console.log(colors);  // ["red", "green", "blue"]
// colors = [];        // TypeError! Cannot reassign`
  },
  {
    id: 2,
    title: "Data Types",
    category: "Basics",
    explain_en: `JavaScript has 8 data types divided into Primitive and Non-Primitive:

Primitive Types (7) - immutable, stored by value:
1. String - text ("hello", 'world', \`template\`)
2. Number - integers and decimals (42, 3.14, NaN, Infinity)
3. BigInt - very large integers (123n)
4. Boolean - true or false
5. undefined - variable declared but no value assigned
6. null - intentional empty value
7. Symbol - unique identifier (Symbol("id"))

Non-Primitive Type (1) - mutable, stored by reference:
8. Object - collections of key-value pairs (includes arrays, functions, dates, etc.)

Use typeof to check the type of a value.`,
    explain_te: `JavaScript లో 8 data types ఉన్నాయి, Primitive మరియు Non-Primitive గా divide అవుతాయి:

Primitive Types (7) - immutable, value ద్వారా store:
1. String - text ("hello", 'world', \`template\`)
2. Number - integers మరియు decimals (42, 3.14, NaN, Infinity)
3. BigInt - చాలా పెద్ద integers (123n)
4. Boolean - true లేదా false
5. undefined - variable declare అయింది కానీ value assign అవ్వలేదు
6. null - intentional empty value
7. Symbol - unique identifier (Symbol("id"))

Non-Primitive Type (1) - mutable, reference ద్వారా store:
8. Object - key-value pairs collections (arrays, functions, dates, etc. include)

Value type check చేయడానికి typeof use చేయండి.`,
    example: `// ===== String =====
const name = "Prasad";
const greeting = 'Hello';
const message = \`Hi \${name}\`; // template literal
console.log(typeof name); // "string"

// ===== Number =====
const age = 25;
const price = 99.99;
const result = 0 / 0;      // NaN (Not a Number)
const big = 1 / 0;         // Infinity
console.log(typeof age);   // "number"
console.log(typeof NaN);   // "number" (surprising!)

// ===== BigInt =====
const huge = 9007199254740991n;
console.log(typeof huge);  // "bigint"

// ===== Boolean =====
const isActive = true;
console.log(typeof isActive); // "boolean"

// ===== undefined =====
let x;
console.log(x);            // undefined
console.log(typeof x);     // "undefined"

// ===== null =====
const empty = null;
console.log(typeof empty);  // "object" (known JS bug!)

// ===== Symbol =====
const id = Symbol("userId");
console.log(typeof id);     // "symbol"

// ===== Object =====
const user = { name: "Prasad", age: 25 };
const arr = [1, 2, 3];
const fn = function() {};
console.log(typeof user);  // "object"
console.log(typeof arr);   // "object"
console.log(typeof fn);    // "function"

// Check if array
console.log(Array.isArray(arr)); // true`
  },
  {
    id: 3,
    title: "Type Conversion & Coercion",
    category: "Basics",
    explain_en: `Type Conversion (Explicit): When you manually convert one type to another using built-in functions like String(), Number(), Boolean(), parseInt(), parseFloat().

Type Coercion (Implicit): When JavaScript automatically converts types during operations. This happens with ==, +, -, *, and in if conditions.

Truthy values: Everything except falsy values
Falsy values (8): false, 0, -0, 0n, "", null, undefined, NaN

Understanding coercion is crucial for avoiding bugs and writing clean code.`,
    explain_te: `Type Conversion (Explicit): String(), Number(), Boolean(), parseInt(), parseFloat() వంటి built-in functions use చేసి manually ఒక type ని another type కి convert చేయడం.

Type Coercion (Implicit): Operations సమయంలో JavaScript automatically types convert చేయడం. ఇది ==, +, -, *, మరియు if conditions లో జరుగుతుంది.

Truthy values: Falsy values తప్ప everything
Falsy values (8): false, 0, -0, 0n, "", null, undefined, NaN

Bugs avoid చేయడానికి మరియు clean code write చేయడానికి coercion అర్థం చేసుకోవడం crucial.`,
    example: `// ===== Explicit Conversion =====
// To String
console.log(String(123));      // "123"
console.log(String(true));     // "true"
console.log((100).toString()); // "100"

// To Number
console.log(Number("42"));     // 42
console.log(Number("hello"));  // NaN
console.log(Number(true));     // 1
console.log(Number(false));    // 0
console.log(Number(null));     // 0
console.log(Number(undefined));// NaN
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14abc")); // 3.14

// To Boolean
console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean("hello")); // true
console.log(Boolean(""));      // false
console.log(Boolean(null));    // false

// ===== Implicit Coercion =====
// + with string = concatenation
console.log("5" + 3);    // "53" (number to string)
console.log("5" + true); // "5true"

// -, *, / with string = math
console.log("5" - 3);    // 2 (string to number)
console.log("5" * 2);    // 10
console.log("10" / "2"); // 5

// == (loose) does coercion, === (strict) does not
console.log(5 == "5");   // true (coercion!)
console.log(5 === "5");  // false (no coercion)

// Falsy values in conditions
if ("") console.log("won't print");       // falsy
if ("hello") console.log("will print");   // truthy
if (0) console.log("won't print");        // falsy
if ([]) console.log("empty array is truthy!"); // truthy!`
  },
  {
    id: 4,
    title: "Operators",
    category: "Basics",
    explain_en: `JavaScript operators perform operations on values:

Arithmetic: + - * / % (modulus) ** (power)
Assignment: = += -= *= /= %= **=
Comparison: == === != !== > < >= <=
Logical: && (AND) || (OR) ! (NOT)
Ternary: condition ? valueIfTrue : valueIfFalse
Nullish Coalescing: ?? (returns right side if left is null/undefined)
Optional Chaining: ?. (safe property access)
Spread/Rest: ... (expand or collect)
typeof: check data type
instanceof: check if object is instance of class`,
    explain_te: `JavaScript operators values మీద operations perform చేస్తాయి:

Arithmetic: + - * / % (modulus) ** (power)
Assignment: = += -= *= /= %= **=
Comparison: == === != !== > < >= <=
Logical: && (AND) || (OR) ! (NOT)
Ternary: condition ? trueValue : falseValue
Nullish Coalescing: ?? (left null/undefined అయితే right side return)
Optional Chaining: ?. (safe property access)
Spread/Rest: ... (expand లేదా collect)
typeof: data type check
instanceof: object class instance అని check`,
    example: `// ===== Arithmetic =====
console.log(10 % 3);   // 1 (remainder)
console.log(2 ** 3);   // 8 (2 to the power 3)

// ===== Assignment =====
let x = 10;
x += 5;  // x = x + 5 = 15
x -= 3;  // x = x - 3 = 12
x *= 2;  // x = x * 2 = 24
x /= 4;  // x = x / 4 = 6

// ===== Comparison =====
console.log(5 == "5");   // true (loose - type coercion)
console.log(5 === "5");  // false (strict - no coercion)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true

// ===== Logical =====
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

// Short-circuit evaluation
const name = "" || "Default";     // "Default" (|| returns first truthy)
const age = 0 ?? 18;              // 0 (?? only checks null/undefined)
const user = null;
const city = user?.address?.city; // undefined (no error!)

// ===== Ternary =====
const score = 85;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
console.log(grade); // "B"

// ===== typeof & instanceof =====
console.log(typeof "hello");       // "string"
console.log(typeof 42);            // "number"
console.log([] instanceof Array);  // true`
  },
  {
    id: 5,
    title: "Strings & String Methods",
    category: "Basics",
    explain_en: `Strings are sequences of characters. They are immutable (cannot be changed in place - methods return new strings). You can create strings with single quotes, double quotes, or template literals (backticks).

Important String Methods:
length, charAt(), indexOf(), lastIndexOf(), includes(), startsWith(), endsWith(), slice(), substring(), toUpperCase(), toLowerCase(), trim(), split(), replace(), replaceAll(), repeat(), padStart(), padEnd(), at(), match(), search()`,
    explain_te: `Strings characters sequences. ఇవి immutable (place లో change చేయలేము - methods new strings return చేస్తాయి). Single quotes, double quotes, లేదా template literals (backticks) తో strings create చేయవచ్చు.

Important String Methods:
length, charAt(), indexOf(), lastIndexOf(), includes(), startsWith(), endsWith(), slice(), substring(), toUpperCase(), toLowerCase(), trim(), split(), replace(), replaceAll(), repeat(), padStart(), padEnd(), at(), match(), search()`,
    example: `const str = "Hello, Prasad! Welcome to JavaScript";

// ===== Basic Properties =====
console.log(str.length);        // 36
console.log(str.charAt(0));     // "H"
console.log(str[0]);            // "H"
console.log(str.at(-1));        // "t" (last char, ES2022)

// ===== Searching =====
console.log(str.indexOf("Prasad"));     // 7
console.log(str.lastIndexOf("a"));      // 33
console.log(str.includes("Welcome"));   // true
console.log(str.startsWith("Hello"));   // true
console.log(str.endsWith("Script"));    // true
console.log(str.search(/prasad/i));     // 7 (regex search)

// ===== Extracting =====
console.log(str.slice(7, 13));      // "Prasad"
console.log(str.slice(-10));        // "JavaScript"
console.log(str.substring(7, 13));  // "Prasad"

// ===== Transforming =====
console.log(str.toUpperCase());  // "HELLO, PRASAD!..."
console.log(str.toLowerCase());  // "hello, prasad!..."

// ===== Trimming =====
const padded = "  Hello  ";
console.log(padded.trim());      // "Hello"
console.log(padded.trimStart()); // "Hello  "
console.log(padded.trimEnd());   // "  Hello"

// ===== Replace =====
console.log(str.replace("Prasad", "Kumar")); // replaces first
console.log("aaa".replaceAll("a", "b"));     // "bbb"

// ===== Split & Join =====
const csv = "apple,banana,cherry";
const arr = csv.split(",");      // ["apple", "banana", "cherry"]
console.log(arr.join(" - "));   // "apple - banana - cherry"

// ===== Padding =====
console.log("5".padStart(3, "0"));  // "005"
console.log("Hi".padEnd(10, ".")); // "Hi........"

// ===== Template Literals =====
const name = "Prasad";
const age = 25;
console.log(\`\${name} is \${age} years old. Next year: \${age + 1}\`);`
  },
  {
    id: 6,
    title: "Numbers & Math",
    category: "Basics",
    explain_en: `JavaScript has only one number type (64-bit floating point). Special values: NaN, Infinity, -Infinity.

Number Methods: toFixed(), toPrecision(), toString(), parseInt(), parseFloat(), isNaN(), isFinite(), isInteger(), isSafeInteger()

Math Object: Math.round(), Math.ceil(), Math.floor(), Math.trunc(), Math.abs(), Math.max(), Math.min(), Math.random(), Math.pow(), Math.sqrt(), Math.PI`,
    explain_te: `JavaScript లో ఒక్క number type (64-bit floating point) ఉంటుంది. Special values: NaN, Infinity, -Infinity.

Number Methods: toFixed(), toPrecision(), toString(), parseInt(), parseFloat(), isNaN(), isFinite(), isInteger(), isSafeInteger()

Math Object: Math.round(), Math.ceil(), Math.floor(), Math.trunc(), Math.abs(), Math.max(), Math.min(), Math.random(), Math.pow(), Math.sqrt(), Math.PI`,
    example: `// ===== Number Basics =====
const num = 3.14159;
console.log(num.toFixed(2));     // "3.14" (string!)
console.log(num.toPrecision(4)); // "3.142"
console.log(Number.isInteger(5));     // true
console.log(Number.isInteger(5.5));   // false
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("hello"));   // false (use this, not global isNaN)
console.log(Number.isFinite(42));     // true
console.log(Number.isFinite(Infinity)); // false

// ===== Math Object =====
console.log(Math.round(4.5));   // 5
console.log(Math.round(4.4));   // 4
console.log(Math.ceil(4.1));    // 5 (always rounds up)
console.log(Math.floor(4.9));   // 4 (always rounds down)
console.log(Math.trunc(4.9));   // 4 (removes decimal)
console.log(Math.trunc(-4.9));  // -4

console.log(Math.abs(-10));     // 10
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.min(1, 5, 3)); // 1
console.log(Math.pow(2, 3));    // 8
console.log(Math.sqrt(16));     // 4
console.log(Math.PI);           // 3.141592653589793

// Random number between 1 and 100
const random = Math.floor(Math.random() * 100) + 1;
console.log(random);

// Random number between min and max
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomBetween(10, 50));

// Floating point issue
console.log(0.1 + 0.2);              // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);      // false!
console.log((0.1 + 0.2).toFixed(1));  // "0.3"`
  },
  {
    id: 7,
    title: "Arrays & Array Methods",
    category: "Arrays",
    explain_en: `Arrays are ordered collections that can hold any type of data. They are zero-indexed.

Mutating Methods (change original): push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill()
Non-Mutating Methods (return new): map(), filter(), reduce(), find(), findIndex(), some(), every(), includes(), indexOf(), slice(), concat(), flat(), flatMap(), join(), toString(), Array.from(), Array.of(), at(), toSorted(), toReversed(), toSpliced(), with()

ES2023+ added immutable versions: toSorted(), toReversed(), toSpliced(), with()`,
    explain_te: `Arrays ఏ type data అయినా hold చేయగల ordered collections. ఇవి zero-indexed.

Mutating Methods (original change): push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill()
Non-Mutating Methods (new return): map(), filter(), reduce(), find(), findIndex(), some(), every(), includes(), indexOf(), slice(), concat(), flat(), flatMap(), join(), toString(), Array.from(), Array.of(), at(), toSorted(), toReversed(), toSpliced(), with()

ES2023+ immutable versions add చేసింది: toSorted(), toReversed(), toSpliced(), with()`,
    example: `const fruits = ["apple", "banana", "cherry"];

// ===== Add/Remove =====
fruits.push("date");      // add to end -> ["apple","banana","cherry","date"]
fruits.pop();              // remove from end -> ["apple","banana","cherry"]
fruits.unshift("avocado"); // add to start -> ["avocado","apple","banana","cherry"]
fruits.shift();            // remove from start -> ["apple","banana","cherry"]

// ===== splice (add/remove at any position) =====
const nums = [1, 2, 3, 4, 5];
nums.splice(2, 1);         // remove 1 item at index 2 -> [1, 2, 4, 5]
nums.splice(1, 0, 10, 20); // add 10,20 at index 1 -> [1, 10, 20, 2, 4, 5]

// ===== slice (extract without modifying) =====
const arr = [10, 20, 30, 40, 50];
console.log(arr.slice(1, 3));  // [20, 30]
console.log(arr.slice(-2));    // [40, 50]

// ===== map, filter, reduce =====
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// ===== find, findIndex =====
const users = [
  { id: 1, name: "Prasad" },
  { id: 2, name: "Kumar" }
];
const found = users.find(u => u.id === 2);      // { id: 2, name: "Kumar" }
const index = users.findIndex(u => u.id === 2); // 1

// ===== some, every =====
console.log(numbers.some(n => n > 4));  // true (at least one)
console.log(numbers.every(n => n > 0)); // true (all pass)

// ===== flat, flatMap =====
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// ===== sort =====
const names = ["Charlie", "Alice", "Bob"];
names.sort(); // ["Alice", "Bob", "Charlie"]
[3, 1, 2].sort((a, b) => a - b); // [1, 2, 3] ascending
[3, 1, 2].sort((a, b) => b - a); // [3, 2, 1] descending`
  },
  {
    id: 8,
    title: "Objects",
    category: "Objects",
    explain_en: `Objects are collections of key-value pairs. Keys are strings (or Symbols), values can be any type. Objects are reference types - assigning an object to another variable creates a reference, not a copy.

Creating objects: Object literal {}, new Object(), Object.create()
Accessing: dot notation (obj.key), bracket notation (obj["key"])
Methods: Object.keys(), Object.values(), Object.entries(), Object.assign(), Object.freeze(), Object.seal(), Object.fromEntries(), hasOwnProperty(), in operator`,
    explain_te: `Objects key-value pairs collections. Keys strings (లేదా Symbols), values ఏ type అయినా ఉండవచ్చు. Objects reference types - object ని another variable కి assign చేస్తే reference create అవుతుంది, copy కాదు.

Creating objects: Object literal {}, new Object(), Object.create()
Accessing: dot notation (obj.key), bracket notation (obj["key"])
Methods: Object.keys(), Object.values(), Object.entries(), Object.assign(), Object.freeze(), Object.seal(), Object.fromEntries(), hasOwnProperty(), in operator`,
    example: `// ===== Creating Objects =====
const user = {
  name: "Prasad",
  age: 25,
  "full name": "Gangishetty Prasad", // key with space
  greet() {                           // method shorthand
    return "Hi, I'm " + this.name;
  }
};

// ===== Accessing =====
console.log(user.name);           // "Prasad" (dot notation)
console.log(user["full name"]);   // "Gangishetty Prasad" (bracket)
const key = "age";
console.log(user[key]);           // 25 (dynamic key)

// ===== Add, Modify, Delete =====
user.city = "Hyderabad";   // add
user.age = 26;              // modify
delete user["full name"];   // delete

// ===== Check property exists =====
console.log("name" in user);              // true
console.log(user.hasOwnProperty("name")); // true

// ===== Object Methods =====
console.log(Object.keys(user));    // ["name", "age", "greet", "city"]
console.log(Object.values(user));  // ["Prasad", 26, fn, "Hyderabad"]
console.log(Object.entries(user)); // [["name","Prasad"], ...]

// ===== Spread & Copy =====
const copy = { ...user };           // shallow copy
const merged = { ...user, role: "dev" }; // merge

// ===== Object.assign =====
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
console.log(target); // { a: 1, b: 2, c: 3 }

// ===== Computed Property Names =====
const field = "email";
const obj = {
  [field]: "prasad@email.com", // email: "prasad@email.com"
  ["get" + field]: function() { return this[field]; }
};
console.log(obj.email); // "prasad@email.com"

// ===== Shorthand =====
const name = "Prasad", age = 25;
const person = { name, age }; // same as { name: name, age: age }
console.log(person); // { name: "Prasad", age: 25 }`
  },
  {
    id: 9,
    title: "Functions",
    category: "Functions",
    explain_en: `Functions are reusable blocks of code. JavaScript has several ways to define functions:

1. Function Declaration - hoisted, can be called before definition
2. Function Expression - NOT hoisted, stored in a variable
3. Arrow Function (ES6) - shorter syntax, lexical 'this'
4. IIFE (Immediately Invoked Function Expression) - runs immediately
5. Generator Function - can pause/resume with yield

Key concepts: parameters vs arguments, default parameters, rest parameters, return value, first-class functions (functions can be passed as values).`,
    explain_te: `Functions reusable code blocks. JavaScript లో functions define చేయడానికి several ways ఉన్నాయి:

1. Function Declaration - hoisted, definition ముందు call చేయవచ్చు
2. Function Expression - NOT hoisted, variable లో store
3. Arrow Function (ES6) - shorter syntax, lexical 'this'
4. IIFE (Immediately Invoked Function Expression) - immediately run అవుతుంది
5. Generator Function - yield తో pause/resume చేయవచ్చు

Key concepts: parameters vs arguments, default parameters, rest parameters, return value, first-class functions (functions ని values గా pass చేయవచ్చు).`,
    example: `// ===== 1. Function Declaration (hoisted) =====
sayHello(); // Works! (hoisted)
function sayHello() {
  console.log("Hello!");
}

// ===== 2. Function Expression (NOT hoisted) =====
// greet(); // Error! Not hoisted
const greet = function(name) {
  return "Hi " + name;
};
console.log(greet("Prasad")); // "Hi Prasad"

// ===== 3. Arrow Function =====
const add = (a, b) => a + b;           // implicit return
const square = x => x * x;              // single param, no ()
const getUser = () => ({ name: "Prasad" }); // return object (wrap in ())
const process = (x) => {                // multi-line needs {}
  const result = x * 2;
  return result + 1;
};

// ===== Default Parameters =====
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}
console.log(createUser("Prasad"));           // { name: "Prasad", role: "user", active: true }
console.log(createUser("Admin", "admin"));   // { name: "Admin", role: "admin", active: true }

// ===== Rest Parameters =====
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// ===== IIFE =====
(function() {
  const secret = "hidden";
  console.log("IIFE runs immediately!");
})();
// secret is NOT accessible outside

// ===== First-Class Functions =====
function operate(a, b, operation) {
  return operation(a, b);
}
console.log(operate(5, 3, (a, b) => a + b)); // 8
console.log(operate(5, 3, (a, b) => a * b)); // 15`
  },
  {
    id: 10,
    title: "Scope & Scope Chain",
    category: "Core Concepts",
    explain_en: `Scope determines where variables are accessible. JavaScript has 3 types:

1. Global Scope - variables declared outside any function/block. Accessible everywhere.
2. Function Scope - variables declared inside a function (var, let, const). Only accessible inside that function.
3. Block Scope - variables declared inside {} with let/const. Only accessible inside that block. var ignores block scope.

Scope Chain: When a variable is used, JS looks for it in the current scope first, then moves up to outer scopes until it finds it or reaches global scope.

Lexical Scope: A function can access variables from the scope where it was DEFINED, not where it was CALLED.`,
    explain_te: `Scope variables ఎక్కడ accessible అనేది determine చేస్తుంది. JavaScript లో 3 types:

1. Global Scope - function/block బయట declare అయిన variables. Everywhere accessible.
2. Function Scope - function లోపల declare అయిన variables (var, let, const). ఆ function లోపల మాత్రమే accessible.
3. Block Scope - {} లోపల let/const తో declare అయిన variables. ఆ block లోపల మాత్రమే accessible. var block scope ignore చేస్తుంది.

Scope Chain: Variable use చేసినప్పుడు, JS current scope లో first look చేస్తుంది, తర్వాత find అయ్యే వరకు లేదా global scope reach అయ్యే వరకు outer scopes కి move అవుతుంది.

Lexical Scope: Function DEFINED అయిన scope నుండి variables access చేయగలదు, CALLED అయిన scope నుండి కాదు.`,
    example: `// ===== Global Scope =====
const globalVar = "I'm global";

function test() {
  console.log(globalVar); // "I'm global" (accessible)
}
test();

// ===== Function Scope =====
function myFunc() {
  var funcVar = "I'm function-scoped";
  let funcLet = "I'm also function-scoped";
  console.log(funcVar);  // accessible
  console.log(funcLet);  // accessible
}
// console.log(funcVar); // ReferenceError!
// console.log(funcLet); // ReferenceError!

// ===== Block Scope =====
if (true) {
  var varInBlock = "var ignores block";
  let letInBlock = "let respects block";
  const constInBlock = "const respects block";
}
console.log(varInBlock);    // "var ignores block" (accessible!)
// console.log(letInBlock);  // ReferenceError!
// console.log(constInBlock); // ReferenceError!

// ===== Scope Chain =====
const a = "global a";
function outer() {
  const b = "outer b";
  function inner() {
    const c = "inner c";
    console.log(a); // "global a" (found in global scope)
    console.log(b); // "outer b" (found in outer scope)
    console.log(c); // "inner c" (found in current scope)
  }
  inner();
  // console.log(c); // ReferenceError! (c not in this scope)
}
outer();

// ===== Lexical Scope =====
function makeGreeter(greeting) {
  return function(name) {
    console.log(greeting + ", " + name); // accesses greeting from outer scope
  };
}
const hello = makeGreeter("Hello");
hello("Prasad"); // "Hello, Prasad"`
  },
  {
    id: 11,
    title: "Closures",
    category: "Core Concepts",
    explain_en: `A closure is a function that remembers and accesses variables from its outer scope even after the outer function has finished executing. Every function in JavaScript creates a closure.

Use cases:
1. Data privacy (encapsulation)
2. Function factories
3. Maintaining state
4. Callbacks and event handlers
5. Partial application and currying

Closures keep references to outer variables (not copies), so the values can change.`,
    explain_te: `Closure అంటే outer function execute అయిన తర్వాత కూడా outer scope నుండి variables remember చేసి access చేయగల function. JavaScript లో ప్రతి function closure create చేస్తుంది.

Use cases:
1. Data privacy (encapsulation)
2. Function factories
3. State maintain చేయడం
4. Callbacks మరియు event handlers
5. Partial application మరియు currying

Closures outer variables కి references keep చేస్తాయి (copies కాదు), కాబట్టి values change అవ్వవచ్చు.`,
    example: `// ===== Basic Closure =====
function outer() {
  let count = 0;  // private variable
  function inner() {
    count++;
    console.log("Count:", count);
  }
  return inner;
}

const counter = outer();
counter(); // Count: 1
counter(); // Count: 2
counter(); // Count: 3
// count is not accessible directly!

// ===== Data Privacy =====
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private!

  return {
    deposit(amount) {
      balance += amount;
      return "Deposited: " + amount + ". Balance: " + balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds!";
      balance -= amount;
      return "Withdrawn: " + amount + ". Balance: " + balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500));    // Balance: 1500
console.log(account.withdraw(200));   // Balance: 1300
console.log(account.getBalance());    // 1300
// console.log(account.balance);      // undefined! Private!

// ===== Function Factory =====
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// ===== Common Pitfall: Loop with var =====
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100); // 3, 3, 3 (all same!)
}
// Fix with let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200); // 0, 1, 2 (correct!)
}`
  },
  {
    id: 12,
    title: "Hoisting",
    category: "Core Concepts",
    explain_en: `Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase, before code executes.

Rules:
- var: Declaration hoisted, initialized with undefined
- let/const: Declaration hoisted, but NOT initialized (Temporal Dead Zone until declaration line)
- Function Declaration: Fully hoisted (name + body)
- Function Expression: Only the variable is hoisted (as var/let/const rules)
- Class: Hoisted but NOT initialized (like let/const)

Understanding hoisting helps debug confusing behaviors in code.`,
    explain_te: `Hoisting అంటే JavaScript code execute అయ్యే ముందు compilation phase లో declarations ని scope top కి move చేసే behavior.

Rules:
- var: Declaration hoisted, undefined తో initialized
- let/const: Declaration hoisted, కానీ initialized కాదు (declaration line వరకు Temporal Dead Zone)
- Function Declaration: Fully hoisted (name + body)
- Function Expression: Variable మాత్రమే hoisted (var/let/const rules ప్రకారం)
- Class: Hoisted కానీ initialized కాదు (let/const లాగా)

Code లో confusing behaviors debug చేయడానికి hoisting అర్థం చేసుకోవడం help చేస్తుంది.`,
    example: `// ===== var Hoisting =====
console.log(x); // undefined (hoisted but not initialized)
var x = 5;
console.log(x); // 5

// What JS actually sees:
// var x;           // hoisted to top
// console.log(x);  // undefined
// x = 5;
// console.log(x);  // 5

// ===== let/const Hoisting (TDZ) =====
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
// console.log(z); // ReferenceError
const z = 20;

// ===== Function Declaration (fully hoisted) =====
greet(); // "Hello!" - Works before declaration!
function greet() {
  console.log("Hello!");
}

// ===== Function Expression (NOT fully hoisted) =====
// sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};
sayHi(); // "Hi!" - Works after declaration

// ===== Tricky Example =====
var a = 1;
function test() {
  console.log(a); // undefined! (local 'a' is hoisted inside function)
  var a = 2;
  console.log(a); // 2
}
test();
console.log(a);   // 1 (global 'a' unchanged)

// ===== Class Hoisting =====
// const obj = new MyClass(); // ReferenceError!
class MyClass {
  constructor() {
    this.name = "test";
  }
}
const obj = new MyClass(); // Works after declaration`
  },
  {
    id: 13,
    title: "this Keyword",
    category: "Core Concepts",
    explain_en: `'this' refers to the object that is currently executing the function. Its value depends on HOW the function is called (runtime binding), not where it's defined.

Rules (in order of priority):
1. new keyword: this = new empty object
2. call/apply/bind: this = specified object
3. Object method: this = the object before the dot
4. Regular function: this = window (non-strict) / undefined (strict mode)
5. Arrow function: this = inherited from enclosing scope (lexical this)
6. Event handler: this = the element that received the event`,
    explain_te: `'this' currently function execute చేస్తున్న object ని refer చేస్తుంది. దాని value function ఎలా CALL అవుతుందో (runtime binding) దానిపై depend అవుతుంది, ఎక్కడ define అయిందో కాదు.

Rules (priority order లో):
1. new keyword: this = new empty object
2. call/apply/bind: this = specified object
3. Object method: this = dot ముందు ఉన్న object
4. Regular function: this = window (non-strict) / undefined (strict mode)
5. Arrow function: this = enclosing scope నుండి inherited (lexical this)
6. Event handler: this = event receive చేసిన element`,
    example: `// ===== Global Context =====
console.log(this); // window (in browser)

// ===== Object Method =====
const user = {
  name: "Prasad",
  greet() {
    console.log("Hi, " + this.name); // this = user
  }
};
user.greet(); // "Hi, Prasad"

// ===== Lost 'this' =====
const fn = user.greet;
fn(); // "Hi, undefined" - this = window, not user!

// ===== Arrow Function (lexical this) =====
const team = {
  name: "Dev Team",
  members: ["Prasad", "Kumar"],
  showMembers() {
    // Arrow function inherits 'this' from showMembers
    this.members.forEach(member => {
      console.log(member + " is in " + this.name);
    });
  }
};
team.showMembers();
// "Prasad is in Dev Team"
// "Kumar is in Dev Team"

// ===== call, apply, bind =====
function introduce(city, country) {
  console.log(this.name + " from " + city + ", " + country);
}
const person = { name: "Prasad" };

introduce.call(person, "Hyderabad", "India");   // individual args
introduce.apply(person, ["Hyderabad", "India"]); // array args

const boundFn = introduce.bind(person, "Hyderabad");
boundFn("India"); // "Prasad from Hyderabad, India"

// ===== new Keyword =====
function Person(name) {
  // this = {} (new empty object)
  this.name = name;
  // return this (implicit)
}
const p = new Person("Prasad");
console.log(p.name); // "Prasad"`
  },
  {
    id: 14,
    title: "Destructuring",
    category: "ES6+",
    explain_en: `Destructuring is a syntax that unpacks values from arrays or properties from objects into separate variables. It makes code shorter and cleaner.

Array Destructuring: Uses [ ] brackets. Order matters.
Object Destructuring: Uses { } braces. Name matters (must match property name or use alias).
Features: default values, renaming (alias), nested destructuring, rest pattern, skip elements, swap variables.
Works great in function parameters, with APIs, and with React hooks.`,
    explain_te: `Destructuring arrays నుండి values లేదా objects నుండి properties ని separate variables లోకి unpack చేసే syntax. Code shorter మరియు cleaner చేస్తుంది.

Array Destructuring: [ ] brackets use చేస్తుంది. Order matters.
Object Destructuring: { } braces use చేస్తుంది. Name matters (property name match అవ్వాలి లేదా alias use చేయాలి).
Features: default values, renaming (alias), nested destructuring, rest pattern, skip elements, swap variables.
Function parameters, APIs, మరియు React hooks తో great గా work చేస్తుంది.`,
    example: `// ===== Array Destructuring =====
const [a, b, c] = [10, 20, 30];
console.log(a, b, c); // 10 20 30

// Skip elements
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3

// Default values
const [x = 5, y = 10] = [100];
console.log(x, y); // 100 10

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Swap variables
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2 1

// ===== Object Destructuring =====
const user = { name: "Prasad", age: 25, city: "Hyderabad" };
const { name, age, city } = user;
console.log(name, age, city); // "Prasad" 25 "Hyderabad"

// Rename (alias)
const { name: userName, age: userAge } = user;
console.log(userName); // "Prasad"

// Default values
const { name: n2, country = "India" } = user;
console.log(country); // "India"

// ===== Nested Destructuring =====
const employee = {
  info: { fullName: "Prasad", address: { city: "Hyd", pin: 500001 } },
  skills: ["JS", "React", "Node"]
};
const { info: { fullName, address: { city: myCity } }, skills: [primary] } = employee;
console.log(fullName); // "Prasad"
console.log(myCity);   // "Hyd"
console.log(primary);  // "JS"

// ===== In Function Parameters =====
function printUser({ name, age, city = "Unknown" }) {
  console.log(name + ", " + age + ", " + city);
}
printUser(user); // "Prasad, 25, Hyderabad"

// React example: const [count, setCount] = useState(0);`
  },
  {
    id: 15,
    title: "Spread & Rest Operators (...)",
    category: "ES6+",
    explain_en: `The ... syntax serves two purposes:

Spread Operator (expands): Expands an iterable into individual elements
- Copy arrays/objects (shallow)
- Merge arrays/objects
- Pass array elements as function arguments
- Convert string to array

Rest Parameter (collects): Collects remaining elements into an array
- Must be the last parameter in a function
- Collects remaining function arguments
- Used in destructuring to collect remaining values

They look the same (...) but work opposite ways.`,
    explain_te: `... syntax two purposes serve చేస్తుంది:

Spread Operator (expands): Iterable ని individual elements లోకి expand చేస్తుంది
- Arrays/objects copy (shallow)
- Arrays/objects merge
- Array elements ని function arguments గా pass
- String ని array కి convert

Rest Parameter (collects): Remaining elements ని array లోకి collect చేస్తుంది
- Function లో last parameter అయి ఉండాలి
- Remaining function arguments collect చేస్తుంది
- Remaining values collect చేయడానికి destructuring లో use

ఇవి same (...) గా look అవుతాయి కానీ opposite ways లో work చేస్తాయి.`,
    example: `// ===== SPREAD (Expanding) =====

// Copy array
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (safe!)

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2, 5]; // [1, 2, 3, 4, 5]

// Copy object
const user = { name: "Prasad", age: 25 };
const userCopy = { ...user, city: "Hyd" };
// { name: "Prasad", age: 25, city: "Hyd" }

// Merge objects (later overrides)
const defaults = { theme: "light", lang: "en", size: 14 };
const prefs = { theme: "dark", size: 16 };
const config = { ...defaults, ...prefs };
// { theme: "dark", lang: "en", size: 16 }

// Function arguments
const nums = [5, 1, 8, 3];
console.log(Math.max(...nums)); // 8

// String to array
console.log([..."Hello"]); // ["H", "e", "l", "l", "o"]

// ===== REST (Collecting) =====

// Function parameters
function sum(first, ...rest) {
  console.log("First:", first); // 1
  console.log("Rest:", rest);   // [2, 3, 4, 5]
  return rest.reduce((acc, n) => acc + n, first);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Array destructuring
const [head, ...tail] = [10, 20, 30, 40];
console.log(head); // 10
console.log(tail); // [20, 30, 40]

// Object destructuring
const { name, ...others } = { name: "Prasad", age: 25, city: "Hyd" };
console.log(name);   // "Prasad"
console.log(others); // { age: 25, city: "Hyd" }`
  },
  {
    id: 16,
    title: "Promises",
    category: "Async",
    explain_en: `A Promise represents a future value - the eventual result of an asynchronous operation.

Three states:
- Pending: initial state, neither fulfilled nor rejected
- Fulfilled: operation completed successfully (resolve called)
- Rejected: operation failed (reject called)

Methods:
.then(onFulfilled) - handle success
.catch(onRejected) - handle error
.finally(onSettled) - runs regardless

Static methods: Promise.all(), Promise.race(), Promise.allSettled(), Promise.any(), Promise.resolve(), Promise.reject()

Promises solve callback hell and make async code chainable and readable.`,
    explain_te: `Promise future value ని represent చేస్తుంది - asynchronous operation యొక్క eventual result.

Three states:
- Pending: initial state, fulfilled లేదా rejected కాదు
- Fulfilled: operation successfully complete (resolve call)
- Rejected: operation fail (reject call)

Methods:
.then(onFulfilled) - success handle
.catch(onRejected) - error handle
.finally(onSettled) - regardless run అవుతుంది

Static methods: Promise.all(), Promise.race(), Promise.allSettled(), Promise.any(), Promise.resolve(), Promise.reject()

Promises callback hell solve చేస్తాయి మరియు async code ని chainable మరియు readable చేస్తాయి.`,
    example: `// ===== Creating a Promise =====
const fetchUser = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve({ id: 1, name: "Prasad" });
    } else {
      reject(new Error("Failed to fetch user"));
    }
  }, 1000);
});

// ===== Using Promise =====
fetchUser
  .then(user => {
    console.log("User:", user.name);
    return user.id; // pass to next .then
  })
  .then(id => {
    console.log("User ID:", id);
  })
  .catch(error => {
    console.log("Error:", error.message);
  })
  .finally(() => {
    console.log("Done! (always runs)");
  });

// ===== Promise.all (all must succeed) =====
const p1 = Promise.resolve("One");
const p2 = new Promise(res => setTimeout(() => res("Two"), 1000));
const p3 = Promise.resolve("Three");

Promise.all([p1, p2, p3]).then(results => {
  console.log(results); // ["One", "Two", "Three"]
});

// ===== Promise.race (first to finish) =====
Promise.race([p1, p2]).then(result => {
  console.log(result); // "One" (fastest)
});

// ===== Promise.allSettled (get all results) =====
const p4 = Promise.reject("Error!");
Promise.allSettled([p1, p4]).then(results => {
  console.log(results);
  // [{ status: "fulfilled", value: "One" },
  //  { status: "rejected", reason: "Error!" }]
});

// ===== Promise.any (first success) =====
Promise.any([p4, p1, p2]).then(result => {
  console.log(result); // "One" (first to resolve)
});

// ===== Chaining (avoid callback hell) =====
function getUser(id) { return Promise.resolve({ id, name: "Prasad" }); }
function getPosts(userId) { return Promise.resolve([{ title: "Post 1" }]); }

getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => console.log("Posts:", posts))
  .catch(err => console.log("Error:", err));`
  },
  {
    id: 17,
    title: "Async/Await",
    category: "Async",
    explain_en: `async/await is syntactic sugar over Promises that makes asynchronous code look synchronous and easier to read.

async function: Always returns a Promise. If you return a value, it's wrapped in Promise.resolve().
await: Pauses execution until the Promise resolves. Can only be used inside an async function (or top-level in modules).
Error handling: Use try/catch blocks.
Parallel execution: Use Promise.all() with await for parallel async operations.

async/await doesn't replace Promises - it's built on top of them.`,
    explain_te: `async/await Promises పై syntactic sugar, asynchronous code ని synchronous లాగా కనిపించేలా మరియు read చేయడానికి easy గా చేస్తుంది.

async function: ఎప్పుడూ Promise return చేస్తుంది. Value return చేస్తే, Promise.resolve() లో wrap అవుతుంది.
await: Promise resolve అయ్యే వరకు execution pause చేస్తుంది. async function లోపల మాత్రమే use చేయవచ్చు (లేదా modules లో top-level).
Error handling: try/catch blocks use చేయండి.
Parallel execution: Parallel async operations కోసం await తో Promise.all() use చేయండి.

async/await Promises replace చేయదు - వాటి top మీద built.`,
    example: `// ===== Basic async/await =====
async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  return user;
}

// Call it
getUser().then(user => console.log(user.name));

// ===== Error Handling =====
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    console.log("Fetch attempt complete");
  }
}

// ===== Sequential vs Parallel =====

// Sequential (slow - one after another)
async function sequential() {
  const user = await fetch("/api/user").then(r => r.json());
  const posts = await fetch("/api/posts").then(r => r.json());
  // total time = user time + posts time
  return { user, posts };
}

// Parallel (fast - both at same time)
async function parallel() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json())
  ]);
  // total time = max(user time, posts time)
  return { user, posts };
}

// ===== Async Arrow Function =====
const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

// ===== Loop with await =====
async function processItems(items) {
  for (const item of items) {
    const result = await processItem(item);
    console.log(result);
  }
  // Note: forEach does NOT work with await!
}`
  },
  {
    id: 18,
    title: "Event Loop & Execution Context",
    category: "Core Concepts",
    explain_en: `JavaScript is single-threaded but handles async operations through the Event Loop mechanism.

Execution Context: Environment where JS code runs. Has 3 types:
1. Global Execution Context (created once)
2. Function Execution Context (created per function call)
3. Eval Execution Context (rare)

Call Stack: Tracks execution contexts. LIFO (Last In, First Out).

Event Loop Process:
1. Synchronous code runs in Call Stack
2. Async callbacks go to Web APIs (browser) or C++ APIs (Node)
3. When ready, callbacks enter Task Queue (macrotasks) or Microtask Queue
4. Event Loop checks: if Call Stack is empty, move task from queue to stack
5. Microtasks (Promises, queueMicrotask) run BEFORE Macrotasks (setTimeout, setInterval)`,
    explain_te: `JavaScript single-threaded కానీ Event Loop mechanism ద్వారా async operations handle చేస్తుంది.

Execution Context: JS code run అయ్యే environment. 3 types:
1. Global Execution Context (once create)
2. Function Execution Context (ప్రతి function call కి create)
3. Eval Execution Context (rare)

Call Stack: Execution contexts track చేస్తుంది. LIFO (Last In, First Out).

Event Loop Process:
1. Synchronous code Call Stack లో run
2. Async callbacks Web APIs (browser) లేదా C++ APIs (Node) కి వెళ్తాయి
3. Ready అయినప్పుడు, callbacks Task Queue (macrotasks) లేదా Microtask Queue లో enter
4. Event Loop check: Call Stack empty అయితే, queue నుండి stack కి task move
5. Microtasks (Promises, queueMicrotask) Macrotasks (setTimeout, setInterval) కంటే BEFORE run అవుతాయి`,
    example: `// ===== Event Loop Demo =====
console.log("1. Script start");              // 1st

setTimeout(() => {
  console.log("2. setTimeout (macrotask)");  // 5th
}, 0);

Promise.resolve()
  .then(() => console.log("3. Promise 1 (microtask)"))  // 3rd
  .then(() => console.log("4. Promise 2 (microtask)"));  // 4th

console.log("5. Script end");               // 2nd

// Output order:
// 1. Script start        (sync - call stack)
// 5. Script end          (sync - call stack)
// 3. Promise 1           (microtask - higher priority)
// 4. Promise 2           (microtask - chained)
// 2. setTimeout          (macrotask - lower priority)

// ===== Call Stack Demo =====
function first() {
  console.log("first start");
  second();
  console.log("first end");
}
function second() {
  console.log("second start");
  third();
  console.log("second end");
}
function third() {
  console.log("third");
}
first();
// Call Stack: first -> second -> third -> (pop third) -> (pop second) -> (pop first)

// ===== Complex Example =====
console.log("A");

setTimeout(() => console.log("B"), 0);

new Promise(resolve => {
  console.log("C"); // This runs synchronously!
  resolve();
}).then(() => console.log("D"));

queueMicrotask(() => console.log("E"));

console.log("F");

// Output: A, C, F, D, E, B
// A, C, F = synchronous
// D, E = microtasks
// B = macrotask`
  },
  {
    id: 19,
    title: "Prototypes & Inheritance",
    category: "OOP",
    explain_en: `Every JavaScript object has a hidden [[Prototype]] property linking it to another object. This forms the "prototype chain".

When accessing a property, JS searches:
1. The object itself
2. Its prototype
3. The prototype's prototype
4. ...until null (end of chain)

This is how inheritance works in JS. ES6 classes are syntactic sugar over prototypal inheritance.

__proto__: Object's actual prototype link (getter/setter)
.prototype: Property on constructor functions that becomes __proto__ of instances
Object.create(): Creates object with specified prototype
Object.getPrototypeOf(): Get an object's prototype`,
    explain_te: `ప్రతి JavaScript object కి another object కి link చేసే hidden [[Prototype]] property ఉంటుంది. ఇది "prototype chain" form చేస్తుంది.

Property access చేసినప్పుడు, JS search:
1. Object itself
2. దాని prototype
3. Prototype యొక్క prototype
4. ...null (chain end) వరకు

JS లో inheritance ఇలా work చేస్తుంది. ES6 classes prototypal inheritance పై syntactic sugar.

__proto__: Object యొక్క actual prototype link (getter/setter)
.prototype: Constructor functions మీద property, instances యొక్క __proto__ అవుతుంది
Object.create(): Specified prototype తో object create
Object.getPrototypeOf(): Object prototype get చేయడం`,
    example: `// ===== Prototype Chain =====
const animal = {
  eats: true,
  walk() { console.log("Walking..."); }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.barks = true;

console.log(dog.barks); // true (own property)
console.log(dog.eats);  // true (inherited from animal)
dog.walk();              // "Walking..." (inherited)

// ===== Constructor Function =====
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

const p1 = new Person("Prasad", 25);
const p2 = new Person("Kumar", 30);
console.log(p1.greet()); // "Hi, I'm Prasad"
console.log(p2.greet()); // "Hi, I'm Kumar"
// Both share the same greet method via prototype!

// ===== ES6 Classes (syntactic sugar) =====
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // call parent constructor
    this.breed = breed;
  }
  speak() {
    return this.name + " barks!"; // override parent method
  }
  info() {
    return super.speak() + " but specifically, " + this.speak();
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak()); // "Rex barks!"
console.log(rex.info());  // "Rex makes a sound but specifically, Rex barks!"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true

// Prototype chain: rex -> Dog.prototype -> Animal.prototype -> Object.prototype -> null`
  },
  {
    id: 20,
    title: "Classes",
    category: "OOP",
    explain_en: `ES6 classes provide cleaner syntax for creating objects and handling inheritance. They are syntactic sugar over prototypal inheritance.

Features:
- constructor() method for initialization
- Instance methods and properties
- Static methods and properties (on class itself, not instances)
- Getters and setters
- extends for inheritance
- super() to call parent constructor/methods
- Private fields (#) - ES2022
- Public class fields`,
    explain_te: `ES6 classes objects create చేయడానికి మరియు inheritance handle చేయడానికి cleaner syntax provide చేస్తాయి. ఇవి prototypal inheritance పై syntactic sugar.

Features:
- constructor() method initialization కోసం
- Instance methods మరియు properties
- Static methods మరియు properties (class itself మీద, instances కాదు)
- Getters మరియు setters
- Inheritance కోసం extends
- Parent constructor/methods call చేయడానికి super()
- Private fields (#) - ES2022
- Public class fields`,
    example: `// ===== Basic Class =====
class User {
  // Public field
  role = "user";

  // Private field (ES2022)
  #password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = password;
  }

  // Instance method
  greet() {
    return "Hello, " + this.name;
  }

  // Getter
  get info() {
    return this.name + " (" + this.email + ")";
  }

  // Setter
  set newEmail(email) {
    if (!email.includes("@")) throw new Error("Invalid email!");
    this.email = email;
  }

  // Private method
  #hashPassword() {
    return "hashed_" + this.#password;
  }

  // Static method (called on class, not instance)
  static create(name, email, pwd) {
    return new User(name, email, pwd);
  }
}

const user = new User("Prasad", "prasad@email.com", "secret123");
console.log(user.greet());     // "Hello, Prasad"
console.log(user.info);        // "Prasad (prasad@email.com)" (getter)
user.newEmail = "new@email.com"; // setter
// console.log(user.#password);  // SyntaxError! Private!

const user2 = User.create("Kumar", "kumar@email.com", "pass");
console.log(user2.role);       // "user" (public field)

// ===== Inheritance =====
class Admin extends User {
  #level;

  constructor(name, email, password, level) {
    super(name, email, password); // MUST call super first
    this.#level = level;
    this.role = "admin";
  }

  greet() {
    return super.greet() + " [Admin Level " + this.#level + "]";
  }

  deleteUser(userId) {
    console.log("Admin " + this.name + " deleted user " + userId);
  }
}

const admin = new Admin("Boss", "boss@email.com", "admin123", 5);
console.log(admin.greet()); // "Hello, Boss [Admin Level 5]"
console.log(admin.role);    // "admin"
admin.deleteUser(42);       // "Admin Boss deleted user 42"
console.log(admin instanceof Admin); // true
console.log(admin instanceof User);  // true`
  },
  {
    id: 21,
    title: "Error Handling (try/catch/finally)",
    category: "Error Handling",
    explain_en: `Error handling prevents your program from crashing when errors occur.

try: Code that might throw an error
catch: Handles the error (receives error object with message, name, stack)
finally: Always executes regardless of error or not
throw: Create custom errors

Error types: Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError

Best practices: Only catch errors you can handle. Don't silently swallow errors. Use specific error types. Always handle Promise rejections.`,
    explain_te: `Error handling errors occur అయినప్పుడు program crash అవ్వకుండా prevent చేస్తుంది.

try: Error throw అయ్యే అవకాశం ఉన్న code
catch: Error handle చేస్తుంది (message, name, stack ఉన్న error object receive)
finally: Error ఉన్నా లేకున్నా regardless always execute
throw: Custom errors create

Error types: Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError

Best practices: Handle చేయగల errors మాత్రమే catch చేయండి. Silently errors swallow చేయకండి. Specific error types use చేయండి. Promise rejections ఎప్పుడూ handle చేయండి.`,
    example: `// ===== Basic try/catch =====
try {
  const data = JSON.parse("{ invalid json }");
} catch (error) {
  console.log(error.name);    // "SyntaxError"
  console.log(error.message); // "Unexpected token i..."
}

// ===== try/catch/finally =====
function readFile(filename) {
  let file = null;
  try {
    file = openFile(filename); // might fail
    return file.read();
  } catch (error) {
    console.log("Error reading file:", error.message);
    return null;
  } finally {
    // Always cleanup - even if return was called above!
    if (file) file.close();
    console.log("Cleanup done!");
  }
}

// ===== Custom Errors =====
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 0 || age > 150) {
    throw new ValidationError("age", "Age must be between 0 and 150");
  }
  return true;
}

try {
  validateAge("hello");
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Type error:", error.message);
  } else if (error instanceof ValidationError) {
    console.log("Validation error on", error.field + ":", error.message);
  } else {
    throw error; // re-throw unknown errors
  }
}

// ===== With async/await =====
async function fetchUser(id) {
  try {
    const res = await fetch("/api/users/" + id);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (error) {
    console.log("Fetch failed:", error.message);
    return null;
  }
}`
  },
  {
    id: 22,
    title: "DOM Manipulation",
    category: "DOM",
    explain_en: `The DOM (Document Object Model) is a tree representation of HTML. JavaScript can read and modify it.

Selecting elements: getElementById(), querySelector(), querySelectorAll(), getElementsByClassName(), getElementsByTagName()
Modifying: textContent, innerHTML, style, classList, setAttribute(), getAttribute()
Creating: createElement(), appendChild(), append(), prepend(), insertBefore(), remove()
Events: addEventListener(), removeEventListener()
Traversing: parentElement, children, nextElementSibling, previousElementSibling`,
    explain_te: `DOM (Document Object Model) HTML యొక్క tree representation. JavaScript ఇది read మరియు modify చేయగలదు.

Elements select: getElementById(), querySelector(), querySelectorAll(), getElementsByClassName(), getElementsByTagName()
Modify: textContent, innerHTML, style, classList, setAttribute(), getAttribute()
Create: createElement(), appendChild(), append(), prepend(), insertBefore(), remove()
Events: addEventListener(), removeEventListener()
Traverse: parentElement, children, nextElementSibling, previousElementSibling`,
    example: `// ===== Selecting Elements =====
const heading = document.getElementById("title");
const btn = document.querySelector(".btn-primary"); // first match
const items = document.querySelectorAll(".item");   // all matches

// ===== Modifying Content =====
heading.textContent = "New Title";     // text only (safe)
heading.innerHTML = "<b>Bold Title</b>"; // parses HTML (careful!)

// ===== Modifying Styles =====
heading.style.color = "blue";
heading.style.fontSize = "24px";

// ===== Classes =====
heading.classList.add("active");
heading.classList.remove("hidden");
heading.classList.toggle("dark-mode");
heading.classList.contains("active"); // true

// ===== Attributes =====
btn.setAttribute("disabled", "true");
btn.getAttribute("id");
btn.removeAttribute("disabled");

// ===== Creating Elements =====
const newDiv = document.createElement("div");
newDiv.textContent = "Hello!";
newDiv.classList.add("card");
newDiv.setAttribute("id", "card-1");

// Add to page
document.body.appendChild(newDiv);       // add at end
document.body.prepend(newDiv);           // add at start
heading.insertAdjacentHTML("afterend", "<p>Subtitle</p>");

// Remove element
newDiv.remove();

// ===== Events =====
btn.addEventListener("click", function(event) {
  console.log("Clicked!", event.target);
  event.preventDefault();    // prevent default behavior
  event.stopPropagation();   // stop bubbling
});

// Event delegation (handle child events on parent)
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li.item")) {
    console.log("Item clicked:", e.target.textContent);
  }
});

// ===== Traversing =====
const parent = heading.parentElement;
const next = heading.nextElementSibling;
const children = parent.children; // HTMLCollection`
  },
  {
    id: 23,
    title: "ES6+ Modules (import/export)",
    category: "ES6+",
    explain_en: `Modules split code into separate files, each with its own scope.

Named Exports: Multiple per file. Import with exact name or alias.
Default Export: One per file. Import with any name.

Benefits: Code organization, reusability, encapsulation, dependency management, tree-shaking (unused code removal).

Modules are: strict mode by default, deferred (loaded after HTML), executed once (cached), have their own scope.`,
    explain_te: `Modules code ని separate files లోకి split చేస్తాయి, ప్రతి దానికి own scope.

Named Exports: File కి multiple. Exact name లేదా alias తో import.
Default Export: File కి ఒకటి. ఏ name తోనైనా import.

Benefits: Code organization, reusability, encapsulation, dependency management, tree-shaking (unused code removal).

Modules: default గా strict mode, deferred (HTML తర్వాత load), once execute (cached), own scope ఉంటుంది.`,
    example: `// ===== Named Exports (math.js) =====
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Import named exports
import { PI, add, subtract } from './math.js';
import { add as sum } from './math.js';      // rename
import * as Math from './math.js';            // import all
console.log(Math.add(2, 3));                  // 5

// ===== Default Export (User.js) =====
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Import default (any name works)
import User from './User.js';
import MyUser from './User.js'; // same thing, different name

// ===== Mixed (api.js) =====
export const BASE_URL = "https://api.example.com";
export function get(url) { return fetch(url); }
export default function createClient(token) {
  return { token, get, BASE_URL };
}

// Import mixed
import createClient, { BASE_URL, get } from './api.js';

// ===== Re-export (index.js - barrel file) =====
export { default as User } from './User.js';
export { add, subtract } from './math.js';
export { default as createClient, BASE_URL } from './api.js';

// Now import everything from one place
import { User, add, createClient, BASE_URL } from './index.js';

// ===== Dynamic Import (lazy loading) =====
async function loadChart() {
  const { Chart } = await import('./Chart.js');
  const chart = new Chart();
  chart.render();
}
// Only loads Chart.js when function is called!`
  },
  {
    id: 24,
    title: "Closures (In-Depth)",
    category: "Advanced",
    explain_en: `A closure is created when a function retains access to its lexical scope even after the outer function has returned. It "closes over" the variables it references.

Key points:
- Every function creates a closure
- Closures store references, not copies
- Used for: data privacy, factories, memoization, event handlers, partial application
- Common pitfall: closures in loops with var
- Memory consideration: closures keep referenced variables in memory`,
    explain_te: `Outer function return అయిన తర్వాత కూడా function తన lexical scope access retain చేసినప్పుడు closure create అవుతుంది. ఇది reference చేసే variables ని "close over" చేస్తుంది.

Key points:
- ప్రతి function closure create చేస్తుంది
- Closures references store చేస్తాయి, copies కాదు
- Use: data privacy, factories, memoization, event handlers, partial application
- Common pitfall: var తో loops లో closures
- Memory: closures referenced variables ని memory లో keep చేస్తాయి`,
    example: `// ===== Practical: Counter Module =====
function createCounter(initial = 0) {
  let count = initial;
  const history = [];

  return {
    increment() { history.push(++count); return count; },
    decrement() { history.push(--count); return count; },
    reset() { count = initial; history.length = 0; },
    getCount() { return count; },
    getHistory() { return [...history]; }
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
console.log(counter.getHistory()); // [11, 12, 11]
// count and history are completely private!

// ===== Practical: Rate Limiter =====
function createRateLimiter(maxCalls, timeWindow) {
  const calls = [];

  return function(...args) {
    const now = Date.now();
    // Remove old calls outside time window
    while (calls.length && calls[0] < now - timeWindow) {
      calls.shift();
    }
    if (calls.length >= maxCalls) {
      console.log("Rate limit exceeded! Try again later.");
      return null;
    }
    calls.push(now);
    console.log("API call made. Remaining:", maxCalls - calls.length);
    return true;
  };
}

const apiCall = createRateLimiter(3, 10000); // 3 calls per 10 sec
apiCall(); // "API call made. Remaining: 2"
apiCall(); // "API call made. Remaining: 1"
apiCall(); // "API call made. Remaining: 0"
apiCall(); // "Rate limit exceeded!"

// ===== Practical: Memoization =====
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Computing...");
  return n * n;
});
expensiveCalc(5); // "Computing..." -> 25
expensiveCalc(5); // 25 (from cache, no computing log!)`
  },
  {
    id: 25,
    title: "Debouncing & Throttling",
    category: "Performance",
    explain_en: `Both optimize performance by controlling how often a function executes.

Debouncing: Delays execution until user STOPS triggering for a specified time. Timer resets on each trigger. Use for: search input, form validation, window resize.

Throttling: Ensures function runs at most ONCE per specified interval, no matter how many triggers. Use for: scroll events, mouse move, API rate limiting.

Key difference: Debounce waits for silence. Throttle ensures regular intervals.`,
    explain_te: `రెండూ function ఎంత తరచుగా execute అవుతుందో control చేసి performance optimize చేస్తాయి.

Debouncing: User specified time STOP trigger అయ్యే వరకు execution delay చేస్తుంది. ప్రతి trigger మీద timer reset. Use: search input, form validation, window resize.

Throttling: ఎన్ని triggers ఉన్నా specified interval లో function ONCE మాత్రమే run అయ్యేలా ensure. Use: scroll events, mouse move, API rate limiting.

Key difference: Debounce silence కోసం wait. Throttle regular intervals ensure చేస్తుంది.`,
    example: `// ===== Debounce =====
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search input
const searchAPI = debounce((query) => {
  console.log("Searching for:", query);
  // fetch("/api/search?q=" + query)
}, 500);

// User types "react" quickly:
searchAPI("r");       // timer starts (500ms)
searchAPI("re");      // timer resets
searchAPI("rea");     // timer resets
searchAPI("reac");    // timer resets
searchAPI("react");   // timer resets -> ONLY this one fires after 500ms!

// ===== Throttle =====
function throttle(func, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      func.apply(this, args);
    }
  };
}

// Usage: Scroll handler
const handleScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
  // Update UI based on scroll
}, 200); // Max once per 200ms

window.addEventListener("scroll", handleScroll);

// ===== Debounce with immediate option =====
function debounceImmediate(func, delay, immediate = false) {
  let timeoutId;
  return function(...args) {
    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    }, delay);
    if (callNow) func.apply(this, args);
  };
}

// Fires immediately on first click, then waits
const saveForm = debounceImmediate(() => {
  console.log("Form saved!");
}, 1000, true);`
  },
  {
    id: 26,
    title: "Local Storage, Session Storage & Cookies",
    category: "Browser APIs",
    explain_en: `Three ways to store data in the browser:

localStorage: Persists after browser close. ~5MB. Same-origin. Sync API.
sessionStorage: Cleared when tab closes. ~5MB. Same-origin. Per-tab. Sync API.
Cookies: ~4KB. Has expiration. Sent with HTTP requests. Accessible server-side.

All store strings only - use JSON.stringify/parse for objects.
localStorage/sessionStorage have same API: setItem, getItem, removeItem, clear.

Security: Never store sensitive data (passwords, tokens) in localStorage. Use httpOnly cookies for auth tokens.`,
    explain_te: `Browser లో data store చేయడానికి three ways:

localStorage: Browser close తర్వాత persist. ~5MB. Same-origin. Sync API.
sessionStorage: Tab close అయినప్పుడు clear. ~5MB. Same-origin. Per-tab. Sync API.
Cookies: ~4KB. Expiration ఉంటుంది. HTTP requests తో send. Server-side accessible.

అన్నీ strings మాత్రమే store - objects కోసం JSON.stringify/parse use.
localStorage/sessionStorage same API: setItem, getItem, removeItem, clear.

Security: Sensitive data (passwords, tokens) localStorage లో store చేయకండి. Auth tokens కోసం httpOnly cookies use చేయండి.`,
    example: `// ===== localStorage =====
// Store
localStorage.setItem("name", "Prasad");
localStorage.setItem("user", JSON.stringify({ id: 1, name: "Prasad", role: "admin" }));

// Retrieve
const name = localStorage.getItem("name"); // "Prasad"
const user = JSON.parse(localStorage.getItem("user")); // { id: 1, ... }

// Remove
localStorage.removeItem("name");
localStorage.clear(); // remove ALL

// Check length
console.log(localStorage.length);

// ===== sessionStorage (same API) =====
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
// Gone when tab closes!

// ===== Practical: Theme Preference =====
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

function loadTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.body.className = saved;
}
loadTheme(); // Apply saved theme on page load

// ===== Cookies =====
// Set cookie
document.cookie = "username=Prasad; expires=Fri, 31 Dec 2026 23:59:59 GMT; path=/";
document.cookie = "theme=dark; max-age=86400; path=/"; // 1 day

// Read all cookies (returns one string)
console.log(document.cookie); // "username=Prasad; theme=dark"

// Parse cookies helper
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const found = cookies.find(c => c.startsWith(name + "="));
  return found ? found.split("=")[1] : null;
}
console.log(getCookie("username")); // "Prasad"

// Delete cookie (set expired date)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";`
  },
  {
    id: 27,
    title: "Fetch API & HTTP Requests",
    category: "Browser APIs",
    explain_en: `The Fetch API is the modern way to make HTTP requests in JavaScript. It returns Promises.

fetch(url, options) - makes a request
- GET: fetch data
- POST: send data
- PUT/PATCH: update data
- DELETE: remove data

Key points: fetch only rejects on network errors (not 404/500). Always check response.ok. Use try/catch with async/await. Set Content-Type header for JSON body.`,
    explain_te: `Fetch API JavaScript లో HTTP requests చేయడానికి modern way. ఇది Promises return చేస్తుంది.

fetch(url, options) - request చేస్తుంది
- GET: data fetch
- POST: data send
- PUT/PATCH: data update
- DELETE: data remove

Key points: fetch network errors మీద మాత్రమే reject (404/500 కాదు). ఎప్పుడూ response.ok check చేయండి. async/await తో try/catch use చేయండి. JSON body కోసం Content-Type header set చేయండి.`,
    example: `// ===== GET Request =====
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const users = await response.json();
    console.log(users);
    return users;
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// ===== POST Request =====
async function createUser(userData) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const newUser = await response.json();
  console.log("Created:", newUser);
  return newUser;
}

createUser({ name: "Prasad", email: "prasad@email.com" });

// ===== PUT Request (update) =====
async function updateUser(id, data) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// ===== DELETE Request =====
async function deleteUser(id) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id, {
    method: "DELETE",
  });
  console.log("Deleted:", response.ok);
}

// ===== With Auth Token =====
async function getProtectedData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/protected", {
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

// ===== Parallel Requests =====
async function getDashboard() {
  const [users, posts, comments] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/comments").then(r => r.json()),
  ]);
  return { users, posts, comments };
}`
  },
  {
    id: 28,
    title: "Set & Map Data Structures",
    category: "Data Structures",
    explain_en: `ES6 introduced Set and Map as alternatives to arrays and objects.

Set: Collection of UNIQUE values. No duplicates. Any type. Methods: add(), delete(), has(), clear(), size, forEach(), values().

Map: Collection of key-value pairs where keys can be ANY type (not just strings like objects). Methods: set(), get(), delete(), has(), clear(), size, forEach(), keys(), values(), entries().

WeakSet/WeakMap: Keys/values are weakly held (garbage collectible). Not iterable. Used for metadata on objects.`,
    explain_te: `ES6 arrays మరియు objects కి alternatives గా Set మరియు Map introduce చేసింది.

Set: UNIQUE values collection. Duplicates లేవు. Any type. Methods: add(), delete(), has(), clear(), size, forEach(), values().

Map: Key-value pairs collection, keys ANY type ఉండవచ్చు (objects లాగా strings మాత్రమే కాదు). Methods: set(), get(), delete(), has(), clear(), size, forEach(), keys(), values(), entries().

WeakSet/WeakMap: Keys/values weakly held (garbage collectible). Iterable కాదు. Objects మీద metadata కోసం use.`,
    example: `// ===== Set =====
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2); // ignored! Already exists
mySet.add("hello");
mySet.add({ name: "Prasad" });

console.log(mySet.size);    // 4
console.log(mySet.has(1));   // true
mySet.delete(2);

// Remove duplicates from array
const nums = [1, 1, 2, 2, 3, 3, 4];
const unique = [...new Set(nums)]; // [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...setA, ...setB]); // {1,2,3,4,5,6}

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3,4}

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1,2}

// ===== Map =====
const userMap = new Map();
const objKey = { id: 1 };

userMap.set("name", "Prasad");
userMap.set(42, "number key");
userMap.set(objKey, "object key!");
userMap.set(true, "boolean key");

console.log(userMap.get("name"));  // "Prasad"
console.log(userMap.get(objKey));   // "object key!"
console.log(userMap.size);          // 4

// Iterate
for (const [key, value] of userMap) {
  console.log(key, "=>", value);
}

// Convert object to Map
const obj = { a: 1, b: 2, c: 3 };
const mapFromObj = new Map(Object.entries(obj));

// Convert Map to object
const objFromMap = Object.fromEntries(userMap);

// ===== Practical: Word Counter =====
function countWords(text) {
  const words = text.toLowerCase().split(/\\s+/);
  const counter = new Map();
  for (const word of words) {
    counter.set(word, (counter.get(word) || 0) + 1);
  }
  return counter;
}
console.log(countWords("hello world hello js hello"));
// Map { "hello" => 3, "world" => 1, "js" => 1 }`
  },
  {
    id: 29,
    title: "JSON (JavaScript Object Notation)",
    category: "Data",
    explain_en: `JSON is a lightweight text format for storing and exchanging data. It's language-independent but uses JavaScript-like syntax.

Rules: Keys must be double-quoted strings. Values can be: string, number, boolean, null, object, array. No functions, no undefined, no comments, no trailing commas.

Methods:
JSON.stringify(value, replacer, space) - Object to JSON string
JSON.parse(text, reviver) - JSON string to Object

Used everywhere: APIs, config files, localStorage, data exchange.`,
    explain_te: `JSON data store మరియు exchange చేయడానికి lightweight text format. Language-independent కానీ JavaScript-like syntax use చేస్తుంది.

Rules: Keys double-quoted strings అయి ఉండాలి. Values: string, number, boolean, null, object, array. Functions, undefined, comments, trailing commas లేవు.

Methods:
JSON.stringify(value, replacer, space) - Object ని JSON string కి
JSON.parse(text, reviver) - JSON string ని Object కి

Everywhere use: APIs, config files, localStorage, data exchange.`,
    example: `// ===== JSON.stringify =====
const user = { name: "Prasad", age: 25, skills: ["JS", "React"] };
const jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Prasad","age":25,"skills":["JS","React"]}'

// Pretty print
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "Prasad",
//   "age": 25,
//   "skills": ["JS", "React"]
// }

// Filter properties with replacer
const filtered = JSON.stringify(user, ["name", "age"]);
// '{"name":"Prasad","age":25}'

// Custom replacer function
const safe = JSON.stringify(user, (key, value) => {
  if (key === "age") return undefined; // exclude age
  return value;
});

// ===== JSON.parse =====
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // "Prasad"

// With reviver (transform during parse)
const dateJson = '{"created": "2025-01-15T10:30:00.000Z"}';
const withDate = JSON.parse(dateJson, (key, value) => {
  if (key === "created") return new Date(value);
  return value;
});
console.log(withDate.created instanceof Date); // true

// ===== Deep Clone with JSON =====
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.b.c = 99;
console.log(original.b.c); // 2 (unchanged!)
// Warning: loses functions, undefined, Date objects, RegExp, etc.

// ===== localStorage with JSON =====
const settings = { theme: "dark", fontSize: 16, lang: "te" };
localStorage.setItem("settings", JSON.stringify(settings));
const loaded = JSON.parse(localStorage.getItem("settings"));
console.log(loaded.theme); // "dark"

// ===== Error handling =====
try {
  const data = JSON.parse("{ invalid }");
} catch (e) {
  console.log("Invalid JSON:", e.message);
}`
  },
  {
    id: 30,
    title: "Regular Expressions (RegEx)",
    category: "Advanced",
    explain_en: `Regular Expressions are patterns used to match character combinations in strings.

Syntax: /pattern/flags
Flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode)

Methods: test(), match(), matchAll(), search(), replace(), replaceAll(), split()

Common patterns: \\d (digit), \\w (word char), \\s (whitespace), . (any char), ^ (start), $ (end), * (0+), + (1+), ? (0 or 1), {n} (exactly n), [] (char class), () (group), | (or)`,
    explain_te: `Regular Expressions strings లో character combinations match చేయడానికి use చేసే patterns.

Syntax: /pattern/flags
Flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode)

Methods: test(), match(), matchAll(), search(), replace(), replaceAll(), split()

Common patterns: \\d (digit), \\w (word char), \\s (whitespace), . (any char), ^ (start), $ (end), * (0+), + (1+), ? (0 or 1), {n} (exactly n), [] (char class), () (group), | (or)`,
    example: `// ===== Basic Testing =====
const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test("prasad@email.com")); // true
console.log(emailRegex.test("invalid-email"));     // false

// ===== Common Validations =====
// Phone number (Indian)
const phoneRegex = /^[6-9]\\d{9}$/;
console.log(phoneRegex.test("9876543210")); // true

// Password (min 8, uppercase, lowercase, number, special)
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
console.log(pwdRegex.test("Prasad@123")); // true

// ===== String Methods with Regex =====
const text = "Hello World, hello JavaScript, HELLO React";

// match
console.log(text.match(/hello/gi)); // ["Hello", "hello", "HELLO"]

// replace
console.log(text.replace(/hello/gi, "Hi"));
// "Hi World, Hi JavaScript, Hi React"

// split
console.log("a1b2c3".split(/\\d/)); // ["a", "b", "c", ""]

// search
console.log(text.search(/JavaScript/)); // 20 (index)

// ===== Groups =====
const dateStr = "2025-01-15";
const dateRegex = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = dateStr.match(dateRegex);
console.log(match[1]); // "2025" (year)
console.log(match[2]); // "01" (month)
console.log(match[3]); // "15" (day)

// Named groups
const namedMatch = dateStr.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);
console.log(namedMatch.groups.year); // "2025"

// ===== Practical: Extract all URLs =====
const content = "Visit https://google.com or http://example.org";
const urls = content.match(/https?:\\/\\/[\\w.-]+\\.[a-z]{2,}/gi);
console.log(urls); // ["https://google.com", "http://example.org"]`
  }
];

const categories = [...new Set(topics.map(t => t.category))];

const categoryColors = {
  "Basics": "#4caf50",
  "Arrays": "#00bcd4",
  "Objects": "#009688",
  "Functions": "#9c27b0",
  "Core Concepts": "#f44336",
  "ES6+": "#2196f3",
  "Async": "#ff9800",
  "OOP": "#e91e63",
  "Error Handling": "#ff5722",
  "DOM": "#795548",
  "Advanced": "#673ab7",
  "Performance": "#e91e63",
  "Browser APIs": "#607d8b",
  "Data Structures": "#3f51b5",
  "Data": "#8bc34a",
};

const JSTutorial = () => {
  const [lang, setLang] = useState("en");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = selectedCategory === "All"
    ? topics
    : topics.filter(t => t.category === selectedCategory);

  return (
    <Box sx={{ p: 2, maxWidth: 1100, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        JavaScript Complete Tutorial
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: '#666' }}>
        {topics.length} Concepts - Learn Everything ({lang === 'en' ? 'English' : 'Telugu'})
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup value={lang} exclusive onChange={(e, val) => val && setLang(val)} size="small">
          <ToggleButton value="en" sx={{ px: 3 }}>English</ToggleButton>
          <ToggleButton value="te" sx={{ px: 3 }}>Telugu</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
        <Chip label="All" onClick={() => setSelectedCategory("All")}
          color={selectedCategory === "All" ? "primary" : "default"}
          variant={selectedCategory === "All" ? "filled" : "outlined"} />
        {categories.map(cat => (
          <Chip key={cat} label={cat} onClick={() => setSelectedCategory(cat)}
            sx={{
              backgroundColor: selectedCategory === cat ? categoryColors[cat] : 'transparent',
              color: selectedCategory === cat ? '#fff' : categoryColors[cat],
              borderColor: categoryColors[cat],
            }}
            variant={selectedCategory === cat ? "filled" : "outlined"} />
        ))}
      </Box>

      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#999' }}>
        Showing {filtered.length} of {topics.length} topics
      </Typography>

      {filtered.map((t) => (
        <Accordion key={t.id} expanded={expandedId === t.id}
          onChange={() => setExpandedId(expandedId === t.id ? null : t.id)}
          sx={{ mb: 1, borderLeft: `4px solid ${categoryColors[t.category] || '#1976d2'}` }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Chip label={t.id} size="small"
                sx={{ minWidth: 35, fontWeight: 'bold', backgroundColor: categoryColors[t.category], color: '#fff' }} />
              <Typography sx={{ fontWeight: 600, flex: 1 }}>{t.title}</Typography>
              <Chip label={t.category} size="small" variant="outlined"
                sx={{ borderColor: categoryColors[t.category], color: categoryColors[t.category] }} />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f0f7ff' }}>
              <Typography variant="subtitle2" sx={{ color: '#1976d2', mb: 1, fontWeight: 'bold' }}>
                {lang === 'en' ? 'Explanation (English):' : 'Explanation (Telugu):'}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {lang === 'en' ? t.explain_en : t.explain_te}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#4ec9b0', mb: 1, fontWeight: 'bold' }}>
                Practical Example:
              </Typography>
              <pre style={{ margin: 0, overflow: 'auto', fontSize: '13px', lineHeight: '1.6', fontFamily: 'Consolas, monospace' }}>
                <code>{t.example}</code>
              </pre>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default JSTutorial;
