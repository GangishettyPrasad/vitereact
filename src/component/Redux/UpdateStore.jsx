import React from "react";

// Styling for code boxes and sections
const codeBox = {
  backgroundColor: "#1e1e1e",
  color: "#dcdcdc",
  padding: "16px",
  borderRadius: "10px",
  fontFamily: "monospace",
  marginBottom: "20px",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
};

const section = {
  marginBottom: "30px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const heading = {
  color: "#0077cc",
  marginBottom: "10px",
};

const UpdateStore = () => {
  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI" }}>
      <h1 style={{ fontSize: "32px", color: "#222" }}>🔄 Redux Data Modify Reference</h1>

      {/* Step 1: data.reducer.js */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 1: data.reducer.js</h2>
        <div style={codeBox}>
{`const initialState = [
  { name: "Prasad", num: 8686808286, village: "Rudraram" },
  { name: "Jai", num: 8143808286, village: "Sadashivpet" }
];

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "change":
      return state.map((item, index) =>
        index === action.payload.id ? { ...item, name: action.payload.newName } : item
      );
    default:
      return state;
  }
};`}
        </div>
        <p><strong>📘 Telugu:</strong> ఇది reducer logic. మీరు dispatch చేసిన ID ఆధారంగా name update అవుతుంది.</p>
      </div>

      {/* Step 2: store.js */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 2: store.js</h2>
        <div style={codeBox}>
{`import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./data.reducer";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});`}
        </div>
        <p><strong>📘 Telugu:</strong> ఇది main Redux store. reducer add చేయాలి.</p>
      </div>

      {/* Step 3: index.js */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 3: index.js</h2>
        <div style={codeBox}>
{`import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);`}
        </div>
        <p><strong>📘 Telugu:</strong> App ను Provider తో wrap చేస్తే store మొత్తం access అవుతుంది అన్ని components కి.</p>
      </div>

      {/* Step 4: Component_react.jsx */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 4: Component_react.jsx</h2>
        <div style={codeBox}>
{`import React from "react";
import { useSelector } from "react-redux";

const Component_react = () => {
  const data = useSelector((state) => state.data);

  return (
    <div>
      <h2>People List</h2>
      {data.map((person, index) => (
        <div key={index}>
          Name: {person.name} | Number: {person.num} | Village: {person.village}
        </div>
      ))}
    </div>
  );
};

export default Component_react;`}
        </div>
        <p><strong>📘 Telugu:</strong> useSelector తో data తీసుకుంటాం, Redux store లో data ని display చేస్తాం.</p>
      </div>

      {/* Step 5: ChildChanger.jsx (Modify Data) */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 5: ChildChanger.jsx (Modify Data)</h2>
        <div style={codeBox}>
{`import React from 'react';
import { useDispatch } from 'react-redux';

const ChildChanger = () => {
  const dispatch = useDispatch();

  const handleChange = () => {
    const id = Number(prompt("Which index to change? (0, 1, etc)"));
    const newName = prompt("Enter new name:");

    if (newName && !isNaN(id)) {
      dispatch({
        type: "change",
        payload: { id, newName: newName }
      });
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>✏️ Modify From Child Component</h3>
      <button onClick={handleChange}>Change Person Name</button>
    </div>
  );
};

export default ChildChanger;`}
        </div>
        <p><strong>📘 Telugu:</strong> ఇది modify component. ఇది button click చేసినప్పుడు name change చేయడానికి dispatch చేస్తుంది.</p>
      </div>

      {/* Step 6: Combine in App.jsx */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 6: Combine in App.jsx</h2>
        <div style={codeBox}>
{`import React from "react";
import Component_react from "./Component_react";
import ChildChanger from "./ChildChanger";

const App = () => {
  return (
    <div>
      <Component_react />
      <ChildChanger />
    </div>
  );
};

export default App;`}
        </div>
        <p><strong>📘 Telugu:</strong> ఇప్పుడు రెండు components combine చేసి, data display చెయ్యచ్చు, name change చెయ్యచ్చు.</p>
      </div>

      {/* Summary */}
      <div style={{ ...section, backgroundColor: "#eef6ff" }}>
        <h2 style={{ ...heading, color: "#333" }}>📋 Summary (in Telugu)</h2>
        <ul>
          <li><strong>Step 1:</strong> Reducer లో action.type check చేసి state మార్చాలి</li>
          <li><strong>Step 2:</strong> Store లో reducer add చేయాలి</li>
          <li><strong>Step 3:</strong> Provider తో App wrap చేయాలి</li>
          <li><strong>Step 4:</strong> useSelector, useDispatch ఉపయోగించాలి</li>
          <li><strong>Step 5:</strong> Data modify చేయడానికి dispatch function ఉపయోగించాలి</li>
        </ul>
      </div>
    </div>
  );
};

export default UpdateStore;
