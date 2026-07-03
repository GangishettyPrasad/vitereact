import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid, 
  Button, 
  Divider, 
  Chip 
} from '@mui/material';
import { 
  FaBookOpen, 
  FaTerminal, 
  FaCopy, 
  FaCheck, 
  FaLock, 
  FaSignOutAlt, 
  FaUserShield, 
  FaSlidersH, 
  FaRoute, 
  FaListUl, 
  FaNetworkWired, 
  FaDatabase, 
  FaPuzzlePiece 
} from 'react-icons/fa';

// Helper to escape HTML tags for syntax highlighting
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Custom VS-Code style Syntax Highlighter
function highlightCode(code) {
  if (!code) return '';
  const placeholders = [];
  let tokenized = code;

  // 1. Comments (Green)
  tokenized = tokenized.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 2. Strings (Orange)
  tokenized = tokenized.replace(/(["'`])(.*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 3. Escape HTML tags
  tokenized = escapeHtml(tokenized);

  // 4. JS/React Keywords (Blue)
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 
    'from', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'switch', 
    'case', 'break', 'new', 'throw', 'class', 'extends', 'super', 'true', 'false', 
    'null', 'undefined', 'delete', 'in', 'of'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: bold;">${kw}</span>`);
  });

  // 5. React Hooks & Built-in functions (Teal)
  const builtins = [
    'useState', 'useEffect', 'useContext', 'useRef', 'useNavigate', 'useLocation', 
    'useSelector', 'useDispatch', 'sessionStorage', 'localStorage', 'document', 
    'window', 'JSON', 'axios', 'CryptoJS', 'getCookie', 'reloadRoles'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 6. Function Invocations (Yellow)
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // 7. Numbers (Light Green)
  tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

// 9 Masterclass Learning Modules Data
const PHASE2_DATABASE = [
  {
    id: 0,
    title: "1. Login Module",
    icon: <FaLock />,
    category: "Authentication Gateways",
    theory: {
      what: "The Login Module is the primary authentication gateway of our enterprise dashboard portal. It validates credentials (Email or Mobile, and Password) against database records and obtains a JWT session token.",
      why: "To verify client identity, initialize session states, and load the user's role and permission configuration matrix before allowing access to internal dashboard views.",
      where: "Used on the root route ('/') and is the first page loaded when launching the application."
    },
    code: `// Core logic inside LoginForm.js of temp_bharatpayroll
const KEY = CryptoJS.enc.Utf8.parse("A13007575abcdefg");
const IV = CryptoJS.enc.Utf8.parse("Aabcdefg13007575");

const encryptData = (plainText) => {
  if (!plainText) return "";
  let encrypted = CryptoJS.AES.encrypt(plainText, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

const onSubmit = async (data) => {
  setLoader(false); // Disables button during API delay
  const email = data.email.trim();
  const password = data.password.trim();
  let req = {};

  if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i)) {
    req = { email: encryptData(email), password: encryptData(password) };
  } else {
    req = { phone: encryptData(email), password: encryptData(password) };
  }

  await axios.post("/api/user/login/", req, { withCredentials: true })
    .then((result) => {
      const UserInfoToSession = {
        data: result.data.data,
        roles: result.data.roles,
        token: result.data.token,
        subdomain: result.data.subDomain,
        firstName: result.data.firstName
      };

      // Set cookie and sessionStorage
      sessionStorage.setItem("user-info", JSON.stringify(UserInfoToSession));
      document.cookie = \`userinfoCookie=\${JSON.stringify(UserInfoToSession)}\`;
      sessionStorage.setItem("RolesFromDb", JSON.stringify(result.data.existedRolesData));

      if (result.data.roles[0] === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    })
    .catch((err) => {
      setLoader(true);
      alert(err.response.data.message || "Login Failed");
    });
};`,
    explanation: [
      "CryptoJS.AES.encrypt: Encrypts the user's password and email/mobile number on the client side using 128-bit key and IV values matching the backend security settings.",
      "setLoader(false): Sets loader state to false to disable the submit button immediately upon form submission, preventing duplicate API requests.",
      "document.cookie: Saves user details to a cookie. This cookie is parsed by the route guards (PrivateRoute.js) to check the user's session status.",
      "sessionStorage.setItem('RolesFromDb', ...): Stores the user's roles and permission matrix locally in sessionStorage to show or hide dashboard elements dynamically."
    ],
    flow: "User Inputs Details → Clicks Login → client-side validation runs → CryptoJS encrypts credentials → Axios posts payload to backend → Server returns JWT tokens & permissions → SessionStorage/Cookie updates → Page redirects to Dashboard.",
    internal: {
      react: "React Hook Form manages input states without triggering page-wide re-renders. Component re-renders only when validation status changes.",
      js: "Javascript executes the AES encryption block synchronously, updates the loading state, and parses the response envelope.",
      browser: "The browser's cookie manager writes the secure session cookie to disk and redirects the URL path using the History API."
    },
    telugu: "Login Page code lo main settings inputs checks details. Browser logs look raw password payload capture cheyakunda standard AES keys modes matches encryption parameters configure chestham. Axios backend response token verify details session storage update route redirects coordinate configurations checks.",
    realtime: "Enterprise applications use client-side credential encryption to protect passwords in transit and prevent middleman sniffing attacks.",
    interview: [
      "Q: What is the benefit of client-side encryption before posting login requests? - A: Protects passwords in transit and secures payloads against network-sniffing tools.",
      "Q: Why use cookies and sessionStorage together for session tracking? - A: Cookies are parsed by the route guards on load, while sessionStorage maintains session data in memory across tab reloads."
    ],
    bestPractices: "Always trim input values before validating, disable submit buttons during pending requests to prevent duplicate submissions, and load encryption keys dynamically from environment variables instead of hardcoding them."
  },
  {
    id: 1,
    title: "2. Logout Module",
    icon: <FaSignOutAlt />,
    category: "Session Management",
    theory: {
      what: "The Logout Module clears the user's active session, flushes access tokens, deletes permission profiles, and redirects the user to the login screen.",
      why: "To prevent unauthorized access to personal employee data and clear memory cache configurations.",
      where: "Triggered manually when the user clicks 'Logout' or automatically when the session expires."
    },
    code: `// Manual Logout in TopHeader.js & sessionLogout.js
const Logout = () => {
  // 1. Clear session and local storage caches
  sessionStorage.removeItem("user-info");
  sessionStorage.removeItem("RolesFromDb");
  localStorage.removeItem("RolesFromDb");

  // 2. Clear cookies by setting their expiration date to the past
  document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
  document.cookie = "userinfoRoleInfo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";

  // 3. Clear authorization headers
  delete axios.defaults.headers.common["Authorization"];

  // 4. Force reload and navigate
  window.location.reload();
  navigate("/");
};`,
    explanation: [
      "sessionStorage.removeItem: Clears the cached session info, permission profiles, and user details in memory.",
      "expires=Thu, 01 Jan 1970: Instructs the browser that the cookie is expired, prompting it to delete the cookie file immediately.",
      "delete axios.defaults.headers: Removes the authorization token from the default headers to prevent subsequent requests from sending stale tokens.",
      "window.location.reload(): Reloads the page to clear all React states and Redux stores in memory."
    ],
    flow: "User clicks Logout → clear sessionStorage → expire cookies → delete Axios authorization headers → reload page context → redirect to Login page.",
    internal: {
      react: "Destroys all active component instances, runs their cleanup functions, and resets global store values.",
      js: "Deletes default object references and prompts garbage collection of session data in memory.",
      browser: "The browser's cookie manager deletes expired cookie files from the client's hard drive."
    },
    telugu: "Logout clear options controls checks. Browser cookies direct script remove command ledhu, anduke past date (1970 epoch) set chestham. automatic ga browser values delete chesthundhi. Axios defaults variables authorization key drop chestham.",
    realtime: "SaaS platforms implement strict local storage clearouts on logout to prevent subsequent users on shared machines from accessing previous session data.",
    interview: [
      "Q: How do you clear a cookie in Javascript? - A: Set the cookie to an empty value and set its expiration date to a past date like Thu, 01 Jan 1970.",
      "Q: Why is window.location.reload() important during logout? - A: Wipes the Redux store and resets memory cache states, preventing unauthorized users from accessing cached data."
    ],
    bestPractices: "Always include the path parameter when deleting cookies to ensure they are cleared across all paths, and trigger token revocation on the backend to invalidate the token globally."
  },
  {
    id: 2,
    title: "3. Authentication",
    icon: <FaUserShield />,
    category: "Session Management",
    theory: {
      what: "Authentication is the process of verifying a user's identity. It verifies who the user is before granting access to dashboard features.",
      why: "To secure application data and ensure that users can only access their authorized resources.",
      where: "Implemented using JWT (JSON Web Tokens) and checked on every route transition and API call."
    },
    code: `// JWT access validation inside Privaterote.js
let token;
const cookieVal = getCookie("userinfoCookie");

if (cookieVal) {
  // Parse session token
  const parsedObj = JSON.parse(cookieVal);
  token = parsedObj.token.access;
  
  // Inject access token into headers of all outgoing Axios requests
  axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
}`,
    explanation: [
      "getCookie: Checks for the active session cookie on mount.",
      "parsedObj.token.access: Extracts the JWT access token from the parsed cookie object.",
      "axios.defaults.headers.common['Authorization']: Automatically attaches the token to all subsequent API calls."
    ],
    flow: "User transitions route → Privateroute checks cookie status → injects Bearer token into Axios headers → renders page component.",
    internal: {
      react: "Resolves route checks before mounting page components to prevent unauthorized views from loading.",
      js: "Parses the cookie string into a Javascript object.",
      browser: "Attaches the cookie value to outgoing HTTP request headers."
    },
    telugu: "Authentication check client target token validations verify cheyadaniki use avthundhi. cookie access tokens details check check. Axios common headers structure automatically attaches values setups parameters checks.",
    realtime: "JWT is standard for API authorization, using signed payloads (header, payload, signature) to verify request authenticity securely.",
    interview: [
      "Q: What is a JWT and what are its three parts? - A: A JSON Web Token contains Header (metadata), Payload (data claims), and Signature (security validation).",
      "Q: What is the benefit of short access token lifespans? - A: Restricts the window of opportunity if a token is intercepted."
    ],
    bestPractices: "Store JWT access tokens in short-lived caches, configure HttpOnly flags to protect tokens from XSS attacks, and always validate tokens on both the client and server."
  },
  {
    id: 3,
    title: "4. Authorization",
    icon: <FaSlidersH />,
    category: "Security Models",
    theory: {
      what: "Authorization is the process of verifying a user's permissions, checking if an authenticated user has permission to access specific resources or actions.",
      why: "To restrict access to sensitive features (e.g. employee details or payroll configurations) based on user roles.",
      where: "Used in route guards (`PrivateRoute`), sidebars, page views, and API controllers."
    },
    code: `// Dynamic module permission gating checks
const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));

// checks if the user has permission to view the employee list
if (RolesFromDb) {
  if (location.pathname === "/employee-management") {
    if (RolesFromDb?.modules?.EmployeeManagement?.view === false) {
      navigate("/notfound");
    }
  }
}`,
    explanation: [
      "RolesFromDb: Stores the user's role permissions matrix fetched from the database.",
      "location.pathname: Identifies the page the user is attempting to access.",
      "view === false: Redirects the user to a page not found screen if they do not have view permissions."
    ],
    flow: "User requests page → checks permission matrix (RolesFromDb) → checks view permission status → renders component or redirects user.",
    internal: {
      react: "Evaluates permissions during the component lifecycle, updating the route tree dynamically.",
      js: "Uses optional chaining to safely check nested properties without throwing errors.",
      browser: "Updates the browser's location and routing paths."
    },
    telugu: "Authorization ante user role level checks permissions database tree validation run cheyadam. Employee, Admin modules options views verify matching true and false loops render block checks options controls.",
    realtime: "RBAC (Role-Based Access Control) dynamically restricts API actions on both the client UI and backend endpoints.",
    interview: [
      "Q: Explain how to hide a UI button based on permissions. - A: Check the permission matrix in state (e.g., if (permissions.edit === false)) and conditionally render or disable the button.",
      "Q: Why is backend authorization check mandatory even if frontend hides the button? - A: Users can manipulate client code in the browser; the backend must validate permissions on every request to prevent unauthorized access."
    ],
    bestPractices: "Always implement authorization checks on both the client and server, avoid hardcoding roles (check permissions instead), and use optional chaining to handle undefined states safely."
  },
  {
    id: 4,
    title: "5. Private Routes",
    icon: <FaRoute />,
    category: "Routing",
    theory: {
      what: "A Private Route is an authorization wrapper component that gates client route transitions in React Single Page Applications.",
      why: "To prevent unauthenticated users from bypassing menus by typing URL paths directly in the address bar.",
      where: "Wraps all dashboard route templates inside App.js."
    },
    code: `// Route protection wrapper in Privaterote.js
const PrivateRoute = ({ children }) => {
  const cookieVal = getCookie("userinfoCookie");

  return cookieVal ? (
    <div id="wrapper">
      <TopHeader />
      {children}
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};`,
    explanation: [
      "children: Renders the nested page component if access checks pass.",
      "getCookie: Checks for the active session cookie on mount.",
      "Navigate to: Redirects unauthenticated users to the login screen, replacing the current history entry."
    ],
    flow: "User navigates path → PrivateRoute checks cookie status → If present, renders TopHeader & page children → If missing, redirects to Login page.",
    internal: {
      react: "Verifies authentication before mounting components to prevent unauthorized views from loading.",
      js: "Evaluates the cookie check expression on mount.",
      browser: "Updates the browser's navigation history."
    },
    telugu: "PrivateRoute dashboard screens wrap layers settings component checks. Login verify validation details parameters match parameters. True options details render screen, else redirects login path.",
    realtime: "Enterprise dashboards wrap routes in authorization guards to centralize authentication checks and simplify route configuration.",
    interview: [
      "Q: What is the purpose of the children prop in a PrivateRoute wrapper? - A: It allows the guard to wrap any component and render it dynamically if access checks pass.",
      "Q: Why use replace in Navigate? - A: Replaces the current history entry so the user cannot navigate back to the protected page after logging out."
    ],
    bestPractices: "Use route guards to centralize authentication logic, keep guards lightweight to prevent navigation lag, and implement corresponding authorization checks on the backend."
  },
  {
    id: 5,
    title: "6. Sidebar Navigation",
    icon: <FaListUl />,
    category: "Navigation",
    theory: {
      what: "The Sidebar component is the primary navigation panel, rendering links dynamically based on user permissions.",
      why: "To provide a clean navigation menu, showing only the options the user is authorized to access.",
      where: "Rendered in the dashboard layout template."
    },
    code: `// Dynamic sidebar link rendering
const SideNavigation = () => {
  const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));
  const [EmployeeManagementshow, setEmployeeManagementshow] = useState(false);

  useEffect(() => {
    if (RolesFromDb?.modules?.EmployeeManagement?.view) {
      setEmployeeManagementshow(true);
    }
  }, [RolesFromDb]);

  return (
    <ul className="sidebar-nav">
      {EmployeeManagementshow && (
        <li>
          <NavLink to="/employee-management">
            <i className="fa fa-users"></i> Employee Management
          </NavLink>
        </li>
      )}
    </ul>
  );
};`,
    explanation: [
      "RolesFromDb: Checks the user's role permissions matrix.",
      "setEmployeeManagementshow: Updates local state to control the visibility of the link.",
      "NavLink: Automatically adds an active class when the route matches the current URL."
    ],
    flow: "Sidebar mounts → checks permission matrix → updates visibility states → renders authorized links → NavLink highlights the active menu item.",
    internal: {
      react: "Updates local state to trigger a re-render and update the navigation menu.",
      js: "Evaluates conditional rendering expressions.",
      browser: "Highlights the active menu link when the route changes."
    },
    telugu: "Sidebar navigation component check chesthe modules lists permissions validation matching. False targets dynamic list hide options rules NavLink active class triggers configuration values.",
    realtime: "Dynamic sidebars are standard in SaaS applications to customize the UI based on user permissions and subscriptions.",
    interview: [
      "Q: What is the difference between Link and NavLink? - A: NavLink automatically adds active styles to the link when its route matches the current URL, making it ideal for navigation menus.",
      "Q: How do you handle company switching in multi-tenant environments? - A: Fetch authorized companies, render them in a dropdown, and update the global state when a new company is selected."
    ],
    bestPractices: "Keep navigation configs modular, hide links that users cannot access to prevent confusion, and use NavLink to manage active link styles automatically."
  },
  {
    id: 6,
    title: "7. Axios & API Layer",
    icon: <FaNetworkWired />,
    category: "API Integration",
    theory: {
      what: "The Axios Setup centralizes network request configuration, creating a global client instance for all API calls.",
      why: "To avoid duplicate configurations (like baseURL and timeouts) and manage request/response interceptors in a single file.",
      where: "Implemented in services/apiClient.js and imported by all API calling functions."
    },
    code: `// Centralized Axios config in apiClient.js
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor to handle expired sessions globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear session data and redirect to login page
      sessionStorage.removeItem("user-info");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);`,
    explanation: [
      "axios.create: Generates a new Axios instance with custom default configurations.",
      "timeout: 10000: Cancels the request if the server takes longer than 10 seconds to respond, preventing infinite loading states.",
      "interceptors.response: Intercepts server responses globally to catch authentication errors (like 401 status) and trigger automatic cleanups."
    ],
    flow: "Component triggers API service call → Axios request interceptor attaches headers → Server returns response → Response interceptor validates status → returns data or redirects on error.",
    internal: {
      react: "Resolves network requests in the background, updating component states when promises resolve.",
      js: "Uses native promises to handle asynchronous operations.",
      browser: "Executes XMLHttpRequest (XHR) operations in the background."
    },
    telugu: "Axios central config files logic endpoint baseURL configurations, timeouts handles checks. interceptors options catches response status errors (ex: 401 expired session) redirect forced logouts settings controls.",
    realtime: "Enterprise applications centralize API configurations to manage headers, tokens, and error handling in a single place.",
    interview: [
      "Q: What is the benefit of using Axios interceptors? - A: They allow you to run custom code globally for requests and responses, making them ideal for attaching authorization tokens or handling errors.",
      "Q: How does Axios handle timeouts? - A: You configure a timeout limit in milliseconds; if a request takes longer, Axios aborts it and throws an error."
    ],
    bestPractices: "Set reasonable request timeout limits, use interceptors to manage authorization headers, and always catch API errors in components to handle failures gracefully."
  },
  {
    id: 7,
    title: "8. Redux Store",
    icon: <FaDatabase />,
    category: "State Management",
    theory: {
      what: "Redux is a global state management library, providing a centralized store to share state across components.",
      why: "To maintain a single source of truth for global state (like active company or user details) and prevent prop-drilling.",
      where: "Configured in store.js, actions.js, and reducers.js and wrapped around the root App component."
    },
    code: `// Redux Store configuration with LocalStorage persistence
import { createStore } from 'redux';
import rootReducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem('reduxState', JSON.stringify(state));
  } catch (err) {
    console.error("Save state failed:", err);
  }
};

const store = createStore(rootReducer, loadState());

// Subscribe to store updates to save state automatically
store.subscribe(() => {
  saveState(store.getState());
});

export default store;`,
    explanation: [
      "createStore: Initializes the Redux store with the root reducer and persisted state.",
      "loadState: Retrieves persisted state from localStorage on application start.",
      "store.subscribe: Runs a listener function on every state change to persist updates to localStorage."
    ],
    flow: "Component dispatches action → Reducer matches action type and updates state → Store notifies subscribers → Components re-render with updated state.",
    internal: {
      react: "The Provider wrapper updates context, prompting components using useSelector to re-render when their selected state changes.",
      js: "Executes pure reducer functions to update the immutable state tree.",
      browser: "Persists the updated state string in localStorage."
    },
    telugu: "Redux state management central data storage coordinates updates properties. Action dispatchers reducers updates runs local storage sync rules checks.",
    realtime: "Redux is widely used to manage complex global state, keeping data synchronized across separate layout sections (like sidebar configurations and dashboard views).",
    interview: [
      "Q: Why must Redux reducers be pure functions? - A: Pure functions have no side effects and return the exact same output for the same input, ensuring predictable state updates and enabling features like time-travel debugging.",
      "Q: How do you persist Redux state across page reloads? - A: Subscribe to store changes and save the state to localStorage, then load the saved state on initialization."
    ],
    bestPractices: "Keep reducers pure, use Redux Toolkit to simplify store setup and reduce boilerplate code, and only store global data in Redux (keep component-specific data in local state)."
  },
  {
    id: 8,
    title: "9. Common Enterprise Concepts",
    icon: <FaPuzzlePiece />,
    category: "Architecture",
    theory: {
      what: "Common Enterprise Concepts are reusable code structures and components (like loaders, tables, modals, and date pickers) that are used across most dashboard views.",
      why: "To enforce design consistency, reduce duplicate code, and speed up feature development.",
      where: "Implemented as reusable components in the src/components/common directory."
    },
    code: `// Dynamic Data Table Component with pagination
import React, { useState } from 'react';

export default function DataTable({ columns, data, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculation logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <table className="table bordered">
        <thead>
          <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {currentData.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => <td key={col.key}>{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}`,
    explanation: [
      "columns.map: Dynamically renders headers and cell values based on columns metadata.",
      "data.slice: Slices the data array to display only the rows for the active page.",
      "setCurrentPage: Updates state to handle pagination transitions."
    ],
    flow: "Component renders DataTable with data array → DataTable calculates pagination indices → displays slice of data → User updates page → state changes and triggers re-render.",
    internal: {
      react: "Tracks active page state to trigger visual re-renders on pagination change.",
      js: "Uses array methods (like slice and map) to transform raw data into JSX elements.",
      browser: "Updates layout elements dynamically in the DOM."
    },
    telugu: "Common Reusable components Table views, loaders, date pickers helpers check check. props configuration attributes modify single layout modular code components setup rules parameters checks.",
    realtime: "Enterprise applications create a shared UI library (containing buttons, inputs, tables, and loaders) to speed up development and ensure design consistency.",
    interview: [
      "Q: How does client-side pagination differ from server-side pagination? - A: Client-side pagination fetches all records at once and slices them in browser memory. Server-side pagination requests only the active page's records from the server, making it much more efficient for large datasets.",
      "Q: What is the benefit of abstracting utilities into custom hooks? - A: Separates business logic from UI rendering, making both parts easier to read, reuse, and test."
    ],
    bestPractices: "Build flexible components using configurable props, implement server-side pagination for large datasets to improve performance, and keep utility functions stateless."
  }
];

const PageWiseCodeGuide = () => {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeModule = PHASE2_DATABASE[activeModuleIdx];

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#93c5fd', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Phase 2: Code Walkthrough
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          temp_bharatpayroll Code Walkthrough (9 Tabs)
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Deep-dive into the actual source code of the portal page by page. Learn standard patterns for Login wrappers, session flushes, access control checks, routing gates, and Redux persistence.
        </Typography>
      </Paper>

      {/* Grid Layout containing sidebar tab buttons and detail panel */}
      <Grid container spacing={3}>
        
        {/* Module Sidebar Tabs list */}
        <Grid item xs={12} md={3.5}>
          <Paper sx={{ 
            p: 2, 
            borderRadius: '20px', 
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Learning Module:
            </Typography>
            
            {PHASE2_DATABASE.map((module, idx) => (
              <Button
                key={module.id}
                fullWidth
                onClick={() => { setActiveModuleIdx(idx); setActiveSubTab('theory'); }}
                startIcon={module.icon}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  borderRadius: '12px',
                  fontWeight: activeModuleIdx === idx ? 700 : 500,
                  bgcolor: activeModuleIdx === idx ? 'rgba(30, 58, 138, 0.08)' : 'transparent',
                  color: activeModuleIdx === idx ? '#1e3a8a' : '#475569',
                  border: '1px solid',
                  borderColor: activeModuleIdx === idx ? 'rgba(30, 58, 138, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(30, 58, 138, 0.04)',
                    borderColor: 'rgba(30, 58, 138, 0.1)'
                  }
                }}
              >
                {module.title}
              </Button>
            ))}
          </Paper>
        </Grid>

        {/* Content detail panel */}
        <Grid item xs={12} md={8.5}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '20px', 
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            background: '#ffffff',
            minHeight: '450px'
          }}>
            
            {/* Title block */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                {activeModule.title}
              </Typography>
              <Chip label={activeModule.category} color="primary" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />
            </Box>

            {/* Inner sub-tabs selector */}
            <Tabs 
              value={activeSubTab} 
              onChange={(e, val) => setActiveSubTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: '1px solid #e2e8f0',
                mb: 3,
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 'auto', px: 2 }
              }}
            >
              <Tab value="theory" label="1. Theory" />
              <Tab value="code" label="2. Complete Code" />
              <Tab value="explain" label="3. Line-by-Line" />
              <Tab value="flow" label="4. Execution Flow" />
              <Tab value="internal" label="5. Internal Working" />
              <Tab value="telugu" label="6. Telugu Translation" />
              <Tab value="realtime" label="7. Real-Time Usage" />
              <Tab value="interview" label="8. Interview Q&A" />
              <Tab value="bestPractices" label="9. Best Practices" />
            </Tabs>

            {/* Sub-tab viewport panels */}
            
            {/* Panel 1: Theory */}
            {activeSubTab === 'theory' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>What is it?</Typography>
                <Typography variant="body2" sx={{ color: '#334155', mb: 3, lineHeight: 1.6 }}>{activeModule.theory.what}</Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>Why do we need it?</Typography>
                <Typography variant="body2" sx={{ color: '#334155', mb: 3, lineHeight: 1.6 }}>{activeModule.theory.why}</Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>Where is it used?</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.theory.where}</Typography>
              </Box>
            )}

            {/* Panel 2: Code */}
            {activeSubTab === 'code' && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FaTerminal /> source_code_reference — VS Code Editor Style
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => handleCopyCode(activeModule.code)}
                    startIcon={copied ? <FaCheck /> : <FaCopy />}
                    sx={{ 
                      color: copied ? '#10b981' : '#1e3a8a', 
                      textTransform: 'none',
                      fontSize: '12px'
                    }}
                  >
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>
                </Box>
                
                <Box sx={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '1px solid #1e293b'
                }}>
                  <pre 
                    style={{ 
                      margin: 0,
                      background: '#1e1e1e', 
                      color: '#d4d4d4', 
                      padding: '20px', 
                      overflowX: 'auto', 
                      fontSize: '13px', 
                      lineHeight: 1.6,
                      fontFamily: '"Fira Code", monospace',
                      whiteSpace: 'pre-wrap'
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightCode(activeModule.code) }}
                  />
                </Box>
              </Box>
            )}

            {/* Panel 3: Line-by-Line Explanation */}
            {activeSubTab === 'explain' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Line-by-Line Technical Analysis:</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {activeModule.explanation.map((item, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '8px' }}>
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                        <strong>Point {idx + 1}:</strong> {item}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Panel 4: Execution Flow */}
            {activeSubTab === 'flow' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>User Action & Render Execution Flow:</Typography>
                <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  <Typography variant="body2" sx={{ color: '#1e293b', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {activeModule.flow.split(' → ').map((step, sIdx) => (
                      <span key={sIdx}>
                        {sIdx > 0 && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{'\n  ↓\n'}</span>}
                        {step}
                      </span>
                    ))}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Panel 5: Internal Working */}
            {activeSubTab === 'internal' && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Paper sx={{ p: 2.5, bgcolor: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#b45309', fontWeight: 800, mb: 0.5 }}>React Virtual DOM Lifecycle:</Typography>
                  <Typography variant="body2" sx={{ color: '#78350f', lineHeight: 1.6 }}>{activeModule.internal.react}</Typography>
                </Paper>
                <Paper sx={{ p: 2.5, bgcolor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#15803d', fontWeight: 800, mb: 0.5 }}>JS Engine Thread Execution:</Typography>
                  <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>{activeModule.internal.js}</Typography>
                </Paper>
                <Paper sx={{ p: 2.5, bgcolor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#1d4ed8', fontWeight: 800, mb: 0.5 }}>Browser Memory & DOM Storage API:</Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', lineHeight: 1.6 }}>{activeModule.internal.browser}</Typography>
                </Paper>
              </Box>
            )}

            {/* Panel 6: Telugu translation */}
            {activeSubTab === 'telugu' && (
              <Paper sx={{ p: 3, bgcolor: '#eff6ff', borderLeft: '5px solid #2563eb', borderRadius: '12px' }}>
                <Typography variant="subtitle2" sx={{ color: '#1e40af', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBookOpen /> Telugu Masterclass Explanation (Bilingual script):
                </Typography>
                <Typography variant="body2" sx={{ color: '#1e3a8a', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {activeModule.telugu}
                </Typography>
              </Paper>
            )}

            {/* Panel 7: Real-Time Usage */}
            {activeSubTab === 'realtime' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>Corporate Code Architecture Standards:</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.realtime}</Typography>
              </Box>
            )}

            {/* Panel 8: Interview Questions */}
            {activeSubTab === 'interview' && (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Interview Q&A Checkpoints:</Typography>
                {activeModule.interview.map((item, idx) => (
                  <Paper key={idx} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                      {item.split(' - ').map((part, pIdx) => (
                        <span key={pIdx}>
                          {pIdx === 0 ? <strong>{part}</strong> : <><br />{part}</>}
                        </span>
                      ))}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Panel 9: Best Practices */}
            {activeSubTab === 'bestPractices' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1 }}>Architectural Best Practices & Avoidances:</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.bestPractices}</Typography>
              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageWiseCodeGuide;
