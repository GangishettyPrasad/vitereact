import React from "react";

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

const ReduxModifyReference = () => {
  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI" }}>
      <h1 style={{ fontSize: "32px", color: "#222" }}>🔄 Redux Modify Store Notes</h1>

      {/* Step 1 */}
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

      {/* Step 2 */}
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

      {/* Step 3 */}
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

      {/* Step 4 */}
      <div style={section}>
        <h2 style={heading}>🔹 Step 4: Component_react.jsx</h2>
        <div style={codeBox}>
{`import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Component_react = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleChange = (index) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      dispatch({
        type: "change",
        payload: { id: index, newName: newName }
      });
    }
  };

  return (
    <div>
      <h2>People List</h2>
      {data.map((person, index) => (
        <div key={index}>
          Name: {person.name} | Number: {person.num} | Village: {person.village}
          <button onClick={() => handleChange(index)}>Change Name</button>
        </div>
      ))}
    </div>
  );
};

export default Component_react;`}
        </div>
        <p><strong>📘 Telugu:</strong> useSelector తో data తీసుకుంటాం, dispatch తో name మార్చడం చేస్తాం.</p>
      </div>

      {/* Summary */}
      <div style={{ ...section, backgroundColor: "#eef6ff" }}>
        <h2 style={{ ...heading, color: "#333" }}>📋 Summary (in Telugu)</h2>
        <ul>
          <li><strong>Step 1:</strong> Reducer లో action.type check చేసి state మార్చాలి</li>
          <li><strong>Step 2:</strong> Store లో reducer add చేయాలి</li>
          <li><strong>Step 3:</strong> Provider తో App wrap చేయాలి</li>
          <li><strong>Step 4:</strong> useSelector, useDispatch ఉపయోగించాలి</li>
        </ul>
      </div>
    </div>
  );
};

export default ReduxModifyReference;
