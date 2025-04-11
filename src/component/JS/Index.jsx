import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { FcAssistant } from "react-icons/fc";
import { SlPencil } from "react-icons/sl";
const Index = () => {

  const es6Checklist = [
    { id: 1, title: "Variable Declarations", items: ["let", "const", "Temporal Dead Zone"] },
    { id: 2, title: "Arrow Functions", items: ["Syntax variations", "Lexical this", "No arguments object"] },
    { id: 3, title: "Template Literals", items: ["${} interpolation", "Multi-line strings", "Tagged templates (optional)"] },
    { id: 4, title: "Destructuring", items: ["Object destructuring", "Array destructuring", "Default values", "Nested destructuring", "Renaming during destructuring"] },
    { id: 5, title: "Spread Operator (...)", items: ["Clone arrays/objects", "Merge arrays/objects", "Function parameters"] },
    { id: 6, title: "Rest Parameters", items: ["Collect multiple arguments", "Spread vs Rest clarity"] },
    { id: 7, title: "Default Parameters", items: ["Fallback values in functions"] },
    { id: 8, title: "Object Property Shorthand", items: ["Shorthand key-value syntax"] },
    { id: 9, title: "Enhanced Object Literals", items: ["Method shorthand", "Dynamic keys"] },
    { id: 10, title: "Array Methods", items: ["map", "filter", "reduce", "find", "some", "every", "includes"] },
    { id: 11, title: "Promises", items: ["Creating promises", "then & catch", "Chaining", "Error handling"] },
    { id: 12, title: "Async/Await", items: ["Basic usage", "Error handling", "Sequential vs Parallel"] },
    { id: 13, title: "Classes", items: ["Constructor & methods", "Inheritance", "super keyword"] },
    { id: 14, title: "Modules", items: ["export default & named", "import usage", "Dynamic imports"] },
    { id: 15, title: "for...of Loop", items: ["Iterate over arrays", "Iterate over strings", "Iterate over sets"] },
    { id: 16, title: "Set & Map", items: ["Set (unique values)", "Map (key-value with any type)"] },
    { id: 17, title: "Symbol", items: ["Unique object keys", "Hidden or meta properties"] },
    { id: 18, title: "Array.from() and Array.of()", items: ["Convert iterable to array", "Create array from values"] },
    { id: 19, title: "Object Utility Methods", items: ["Object.keys()", "Object.values()", "Object.entries()", "Object.assign()"] },
    { id: 20, title: "Optional Chaining & Nullish Coalescing", items: ["obj?.prop", "a ?? b"] },
    { id: 21, title: "Optional Chaining & Nullish Coalescing", items: ["obj?.prop", "a ?? b"] },
  ];

var a = {
  width : '30px',
  height : '30px',
  color : 'yellow',
}

  return (
    <div>
      <h2><FcAssistant style={a}/>JavaScript  </h2>
      <ol>
        <h3>topics <SlPencil style={{color : "blue"}}/> </h3>
      </ol>
      <ul>
        <li><Link   to = '/componentreact'>intro</Link></li>

        <li><Link   to = '/componentreact'>data types</Link></li>
        <li><Link   to = '/componentreact'>operators</Link></li>
        <li><Link   to = '/componentreact'>expresssions</Link></li>
        <li><Link   to = '/componentreact'>statements</Link></li>
        <li><Link   to = '/componentreact'>expresssions vs statements </Link></li>
        <li><Link   to = '/componentreact'>varaiables</Link></li>
        <li><Link   to = '/componentreact'>conditional statement</Link></li>
        <li><Link   to = '/componentreact'>iterational statements</Link></li>
        <li><Link   to = '/componentreact'>arrays</Link></li>
        <li><Link   to = '/componentreact'>objects</Link></li>
        <li><Link   to = '/componentreact'>events</Link></li>
        <li><Link   to = '/componentreact'>es6</Link></li>
        <li><Link   to = '/componentreact'>componentreact</Link></li>
      </ul>


      <h2>JavaScript - ES6 </h2>

    <div>{es6Checklist.map(section => (
  <div key={section.id}>
    <h3>{section.title}</h3>
    <ul>
      {section.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
))}
</div>

      

    

   



    </div>
  );
};

export default Index;
