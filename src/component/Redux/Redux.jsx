import React from "react";
import ReduxModifyReference from "./ReduxModifyReference";
import UpdateStore from "./updateStore";

const ReduxR = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
     
      {/* Step 1 */}
      <h2>🔹 Step 1: data.reducer.js</h2>
      <pre>
{`const initialState = [
  { name: "prasad", num: 8686808286, village: "rudraram" },
  { name: "jai", num: 8143808286, village: "sdpt" }
];

export const dataReducer = (state = initialState, action) => {
  return state; // Only accessing, no change
};`}
      </pre>

      {/* Step 2 */}
      <h2>🔹 Step 2: store.js</h2>
      <pre>
{`import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./data.reducer";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});`}
      </pre>

      {/* Step 3 */}
      <h2>🔹 Step 3: index.js</h2>
      <pre>
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
      </pre>

      {/* Step 4 */}
      <h2>🔹 Step 4: Component_react.jsx</h2>
      <pre>
{`import React from "react";
import { useSelector } from "react-redux";

const Component_react = () => {
  const people = useSelector((state) => state.data);

  return (
    <div>
      <h1>People List</h1>
      {people.map((person, index) => (
        <div key={index}>
          Name: {person.name}, Number: {person.num}, Village: {person.village}
        </div>
      ))}
    </div>
  );
};

export default Component_react;`}
      </pre>

      <div style={{ marginTop: "20px", background: "#f9f9f9", padding: "10px", borderRadius: "10px" }}>
        <h3>📒 Telugu Summary:</h3>
        <ul>
          <li>Step 1 – Reducer లో మన data ఉంటుంది</li>
          <li>Step 2 – Store create చేసి reducer attach చేయాలి</li>
          <li>Step 3 – App ని Provider తో wrap చేయాలి</li>
          <li>Step 4 – useSelector తో data access చేసి UI లో చూపించాలి</li>
        </ul>
      </div>

      <>
      
      <ReduxModifyReference/>
      <UpdateStore/>
      </>
    </div>
  );
};

export default ReduxR;
