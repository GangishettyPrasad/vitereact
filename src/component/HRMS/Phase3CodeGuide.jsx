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
  FaPlusCircle, 
  FaFolderOpen, 
  FaSlidersH, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaUserLock, 
  FaDatabase, 
  FaRoute, 
  FaColumns 
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
    'window', 'JSON', 'axios', 'CryptoJS', 'getCookie', 'reloadRoles', 'createSlice', 'configureStore'
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

// 9 Phase 3 Boilerplate Implementation Modules Data
const PHASE3_DATABASE = [
  {
    id: 0,
    title: "1. Project Init & Cleanup",
    icon: <FaPlusCircle />,
    category: "Boilerplate Setup",
    theory: "Project Initialization sets up a fresh React project using Vite. Vite uses native ES modules to compile code instantly on demand, making hot reloads extremely fast compared to legacy configurations.",
    code: `# 1. Create a fresh Vite React project
npx create-vite@latest enterprise-payroll-app --template react

# 2. Enter your project directory
cd enterprise-payroll-app

# 3. Install baseline dependencies
npm install

# 4. Install production enterprise libraries (Axios, Redux, Crypto-JS, React Icons, Hook Form, Material-UI)
npm install axios @reduxjs/toolkit react-redux react-router-dom crypto-js react-icons react-hook-form @mui/material @emotion/react @emotion/styled

# 5. Clean up placeholder assets (Optional but recommended)
# Remove default css files you do not need:
rm src/App.css
rm src/index.css`,
    explanation: [
      "npx create-vite: Scaffolds the React application template without a global installation.",
      "npm install: Installs the basic packages required by React and Vite.",
      "rm src/App.css: Removes default styling configurations to provide a clean baseline for custom styles."
    ],
    integration: "Run these commands in your terminal. Ensure Node.js (version 18+) is installed on your local machine.",
    telugu: "Vite template use chesi fresh React application ni initialize cheyadam. CLI terminal cmd blocks code dependencies correct install options support coordinate set up.",
    bestPractices: "Use standard LTS versions of Node.js, and lock package versions to prevent breaking changes."
  },
  {
    id: 1,
    title: "2. Folder Structure",
    icon: <FaFolderOpen />,
    category: "Boilerplate Setup",
    theory: "Boilerplate Folder Structure organizes your project files into logical folders (like components, pages, context, services, and utils), establishing a clean separation of concerns.",
    code: `// File Structure Representation:
// Create these folders inside your project's /src folder:

new-payroll-app/
├── src/
│   ├── assets/              # Static files (images, custom CSS)
│   │   ├── images/
│   │   └── index.css
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Tables, loaders, buttons, alerts
│   │   └── layout/          # Sidebar, Header, Footer
│   ├── context/             # React Context providers (AuthContext)
│   ├── hooks/               # Custom React hooks (useLocalStorage)
│   ├── pages/               # Page components matched to routes
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   └── Employee/
│   ├── routes/              # Routing configurations
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── services/            # API modules (apiClient, authService)
│   ├── store/               # Redux state (slices, store)
│   ├── utils/               # Pure utility helper functions (storageUtils)
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point script`,
    explanation: [
      "src/components/common: Houses presentational components (like custom buttons or input fields) configured via props.",
      "src/services: Centralizes API endpoints and configurations separate from page rendering logic.",
      "src/utils: Contains pure, state-free helper functions that are easy to unit test."
    ],
    integration: "Create these folders under the src/ directory of your fresh Vite project immediately after initialization.",
    telugu: "Scale-ready project directory folders set up cheyadam. Components, layouts, network settings distinct ga divide chestharu to prevent merge conflicts.",
    bestPractices: "Follow a consistent file naming convention (like PascalCase for components and camelCase for utilities) and keep related folders close together."
  },
  {
    id: 2,
    title: "3. Environment Config",
    icon: <FaSlidersH />,
    category: "Configuration",
    theory: "Environment Configurations manage environment-specific variables (like server URLs) dynamically, keeping sensitive credentials secure and out of the codebase.",
    code: `# ----------------------------------------------------
# FILE 1: .env.development (Put this in project root)
# ----------------------------------------------------
VITE_API_URL=http://localhost:8000/api
VITE_ENV_NAME=Local Dev Testing
VITE_CRYPTO_KEY=A13007575abcdefg
VITE_CRYPTO_IV=Aabcdefg13007575

# ----------------------------------------------------
# FILE 2: .env.production (Put this in project root)
# ----------------------------------------------------
VITE_API_URL=https://api.bharatpayroll.com/v1
VITE_ENV_NAME=Live Production
VITE_CRYPTO_KEY=P99887766XYZABCD
VITE_CRYPTO_IV=Pabcdefg99887766

# ----------------------------------------------------
# FILE 3: .env.example (Commit this to Git repository)
# ----------------------------------------------------
VITE_API_URL=
VITE_ENV_NAME=
VITE_CRYPTO_KEY=
VITE_CRYPTO_IV=`,
    explanation: [
      "VITE_ prefix: Vite requires custom variables to start with the VITE_ prefix to expose them to client components.",
      "import.meta.env: The syntax used to access environment variables in Vite instead of Node's process.env."
    ],
    integration: "Save these files as .env.development and .env.production in the root directory of your project (the same folder that contains package.json).",
    telugu: "Base URL paths hardcode cheyakunda, development staging environments switches details. VITE_ prefix use chesi secure config profiles set up cheyadam.",
    bestPractices: "Always add your .env files to .gitignore to prevent leaking keys, and commit an .env.example file containing empty definitions instead."
  },
  {
    id: 3,
    title: "4. Storage Encryption",
    icon: <FaShieldAlt />,
    category: "Security",
    theory: "Storage Encryption monkey patches browser storage APIs, automatically encrypting and decrypting data using CryptoJS AES-256 before writing to disk.",
    code: `// File: src/utils/storageUtils.js
import CryptoJS from "crypto-js";

// Secure keys loaded from environment variables with fallback definitions
const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY || "A13007575abcdefg";
const SECRET_IV = import.meta.env.VITE_CRYPTO_IV || "Aabcdefg13007575";

const KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY);
const IV = CryptoJS.enc.Utf8.parse(SECRET_IV);

// 1. Encrypt Data Helper
export const encryptData = (data) => {
    if (!data) return "";
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return ciphertext.toString();
};

// 2. Decrypt Data Helper
export const decryptData = (encryptedData) => {
    try {
        if (!encryptedData) return null;
        const bytes = CryptoJS.AES.decrypt(encryptedData, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) return null;
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Storage Decryption failed:", error);
        return null;
    }
};

// 3. Override sessionStorage prototype item methods
const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function (key, value) {
    const encryptedValue = encryptData(value);
    originalSetItem.call(sessionStorage, key, encryptedValue);
};

const originalGetItem = sessionStorage.getItem;
sessionStorage.getItem = function (key) {
    const encryptedData = originalGetItem.call(sessionStorage, key);
    return encryptedData ? decryptData(encryptedData) : null;
};

// 4. Override localStorage prototype item methods
const originalLocalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
    const encryptedValue = encryptData(value);
    originalLocalSetItem.call(localStorage, key, encryptedValue);
};

const originalLocalGetItem = localStorage.getItem;
localStorage.getItem = function (key) {
    const encryptedData = originalLocalGetItem.call(localStorage, key);
    return encryptedData ? decryptData(encryptedData) : null;
};

// 5. Intercept document.cookie dynamically using property descriptors
(function () {
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

    Object.defineProperty(document, 'cookie', {
        configurable: true,
        enumerable: true,
        get: function () {
            const rawCookie = originalCookieDescriptor.get.call(document);
            if (!rawCookie) return "";
            const cookiePairs = rawCookie.split(';').map(pair => pair.trim());

            return cookiePairs
                .map(pair => {
                    const [name, val] = pair.split('=');
                    if (name === 'userinfoCookie') {
                        try {
                            const bytes = CryptoJS.AES.decrypt(decodeURIComponent(val), KEY, { iv: IV });
                            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                            return \`\${name}=\${encodeURIComponent(decrypted)}\`;
                        } catch (e) {
                            return \`\${name}=\`;
                        }
                    }
                    return pair;
                })
                .join('; ');
        },
        set: function (val) {
            if (val.startsWith('userinfoCookie=')) {
                const [name, rawValue] = val.split('=');
                try {
                    const encrypted = CryptoJS.AES.encrypt(rawValue, KEY, { iv: IV }).toString();
                    originalCookieDescriptor.set.call(document, \`\${name}=\${encodeURIComponent(encrypted)};path=/;\`);
                } catch (e) {
                    originalCookieDescriptor.set.call(document, val);
                }
            } else {
                originalCookieDescriptor.set.call(document, val);
            }
        },
    });
})();`,
    explanation: [
        "originalSetItem: Keeps a copy of the browser's native storage setItem method.",
        "sessionStorage.setItem = function(...): Overwrites the native setItem method to encrypt values automatically.",
        "Object.defineProperty(document, 'cookie', ...): Overrides the cookie getter and setter to encrypt and decrypt the userinfoCookie automatically."
    ],
    integration: "Save as src/utils/storageUtils.js. Import this file at the top of your src/main.jsx entry point to activate overrides globally on launch.",
    telugu: "Browser sessionStorage, localStorage tokens database inputs automatically AES-256 encrypt cheyadanki monkey patching. hackers storage details raw text visual look check block parameters.",
    bestPractices: "Wrap all decryption steps in try/catch blocks to handle data corruption gracefully without crashing the application."
  },
  {
    id: 4,
    title: "5. Axios Client Setup",
    icon: <FaNetworkWired />,
    category: "API Integration",
    theory: "A global Axios Client centralizes network request configurations, managing base URLs, request timeouts, and global request/response interceptors.",
    code: `// File: src/services/apiClient.js
import axios from 'axios';

// Get base URL from environments config
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 1. Request Interceptor (Inject token before request leaves)
apiClient.interceptors.request.use(
  (config) => {
    // Read session token (automatically decrypted if storage monkeypatched)
    const userInfoRaw = sessionStorage.getItem("user-info");
    if (userInfoRaw) {
      try {
        const userInfo = JSON.parse(userInfoRaw);
        const token = userInfo?.token?.access;
        if (token) {
          config.headers['Authorization'] = \`Bearer \${token}\`;
        }
      } catch (e) {
        console.error("Failed to parse token in request interceptor", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor (Catch global error states)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if server returns 401 Unauthorized (Expired Session)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or token invalid. Redirecting to login...");
      
      // Clear session data
      sessionStorage.removeItem("user-info");
      sessionStorage.removeItem("RolesFromDb");
      document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
      
      // Force redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;`,
    explanation: [
      "apiClient.interceptors.request: Automatically injects the JWT authorization token into the headers of all outgoing requests.",
      "apiClient.interceptors.response: Catches 401 errors globally to clear expired sessions and redirect the user automatically."
    ],
    integration: "Save as src/services/apiClient.js. Import this pre-configured instance in all your API service folders to manage API requests globally.",
    telugu: "Centralized axios config instance setups. Request interceptor automatically bearer headers update chesthundhi, response interceptor 401 catches automatic forced logout setups logs.",
    bestPractices: "Set reasonable request timeouts (e.g. 10000ms) to prevent infinite loading states when the server is down or the user's connection drops."
  },
  {
    id: 5,
    title: "6. Auth Context Setup",
    icon: <FaUserLock />,
    category: "State Management",
    theory: "Authentication Context uses the React Context API to share authentication states (such as active user details and login status) globally across components.",
    code: `// File: src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session state on application load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user-info");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user session", e);
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};`,
    explanation: [
      "createContext: Initializes the context object to share authentication state.",
      "!loading && children: Prevents child components from rendering before the session check finishes, avoiding UI flickers."
    ],
    integration: "Save as src/context/AuthContext.jsx. Wrap your routing tree in main.jsx inside <AuthProvider> to make auth state accessible globally.",
    telugu: "Authentication global context hooks. Session restore loading gate setup component mount. Konsi context values share variables settings coordinate providers.",
    bestPractices: "Keep context files focused on single domains to avoid bloated configurations, and use custom consumer hooks to make context consumption clean and easy."
  },
  {
    id: 6,
    title: "7. Redux Store Setup",
    icon: <FaDatabase />,
    category: "State Management",
    theory: "The global Redux Store manages and synchronizes global application state predictability using Redux Toolkit slices and store persistence.",
    code: `// File: src/store/slices/companySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCompany: null,
  companiesList: []
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
    },
    setCompaniesList: (state, action) => {
      state.companiesList = action.payload;
    },
    resetCompanyState: (state) => {
      state.activeCompany = null;
      state.companiesList = [];
    }
  }
});

export const { setActiveCompany, setCompaniesList, resetCompanyState } = companySlice.actions;
export default companySlice.reducer;

// ----------------------------------------------------
// File: src/store/index.js (Store Setup & Caching)
// ----------------------------------------------------
import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';

// Load state from localStorage on init
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('companyState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage on update
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('companyState', serializedState);
  } catch (err) {
    console.error("Save store state failed:", err);
  }
};

const store = configureStore({
  reducer: {
    company: companyReducer
  },
  preloadedState: loadState()
});

// Subscribe to store updates to persist changes automatically
store.subscribe(() => {
  saveState(store.getState());
});

export default store;`,
    explanation: [
      "createSlice: Generates actions and reducers in a single step, reducing boilerplate code.",
      "configureStore: Initializes the Redux store with the specified slice reducers and default middleware."
    ],
    integration: "Save the slice as src/store/slices/companySlice.js and the store configuration as src/store/index.js. Wrap your application in <Provider store={store}> in main.jsx.",
    telugu: "Redux Toolkit global state store configuration slices, actions dispatches details. Component details props bypass values caches setups.",
    bestPractices: "Only store global data in Redux (keep component-specific data in local state), and normalize complex state structures to simplify state updates."
  },
  {
    id: 7,
    title: "8. Private Route Gate",
    icon: <FaRoute />,
    category: "Routing",
    theory: "Private Routes gate client route transitions, checking the user's session status and permissions before rendering protected pages.",
    code: `// File: src/routes/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Utility helper to read cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function PrivateRoute({ children, requiredPermission = null }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Verify session cookie presence
  const sessionCookie = getCookie("userinfoCookie");
  const rolesInfoRaw = sessionStorage.getItem("RolesFromDb");
  
  let isAuthenticated = false;
  let hasPermission = true;

  if (sessionCookie) {
    isAuthenticated = true;
    
    // Inject access token into headers of all outgoing Axios requests
    try {
      const parsedSession = JSON.parse(sessionCookie);
      const token = parsedSession?.token?.access;
      if (token) {
        axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
      }
    } catch (e) {
      console.error("Failed to parse session cookie", e);
    }
  }

  // 2. Verify permission status (RBAC Gating)
  if (requiredPermission && rolesInfoRaw) {
    try {
      const rolesInfo = JSON.parse(rolesInfoRaw);
      const module = requiredPermission.module;
      const submodule = requiredPermission.submodule;
      
      const modulePermission = rolesInfo?.modules?.[module];
      const viewPermission = submodule 
        ? modulePermission?.submodules?.[submodule]?.view 
        : modulePermission?.view;

      if (viewPermission === false) {
        hasPermission = false;
      }
    } catch (e) {
      console.error("Failed to parse permissions object", e);
    }
  }

  // 3. Redirect user on check failures
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!hasPermission) {
      navigate('/notfound', { replace: true });
    }
  }, [isAuthenticated, hasPermission, navigate]);

  return isAuthenticated && hasPermission ? children : null;
}`,
    explanation: [
      "Navigate to: Redirects unauthenticated users to the login screen, replacing the current history entry.",
      "rolesInfo.modules[module].view: Checks the permission object to restrict access to sensitive pages."
    ],
    integration: "Save as src/routes/PrivateRoute.jsx. Wrap protected routes inside App.jsx: <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />.",
    telugu: "Access validations check check guard gate component. Cookie missing logins path automatic redirect replaces options checks.",
    bestPractices: "Use route guards to centralize authentication logic, and remember that client-side route guards must be paired with backend validation for security."
  },
  {
    id: 8,
    title: "9. Layout & Sidebar UI",
    icon: <FaColumns />,
    category: "Boilerplate Setup",
    theory: "The Layout and Sidebar component organizes your dashboard views, rendering links dynamically based on user permissions.",
    code: `// ----------------------------------------------------
// File: src/components/layout/Sidebar.jsx
// ----------------------------------------------------
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const permissions = JSON.parse(sessionStorage.getItem('RolesFromDb') || 'null');
  const showPayroll = permissions?.modules?.Payroll?.view !== false;
  const showEmployee = permissions?.modules?.EmployeeManagement?.view !== false;

  return (
    <aside style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '20px' }}>
      <div className="brand" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>
        BharatPayroll
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        {showEmployee && <NavLink to="/employee-management" className="nav-link">Employees</NavLink>}
        {showPayroll && <NavLink to="/payroll" className="nav-link">Payroll</NavLink>}
      </nav>
    </aside>
  );
}

// ----------------------------------------------------
// File: src/components/layout/Layout.jsx (Wrapper)
// ----------------------------------------------------
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: '#fff', borderBottom: '1px solid #e2e8f0' }} />
        <main style={{ padding: '30px', background: '#f8fafc', flexGrow: 1 }}>
          <Outlet /> {/* Renders matched nested pages */}
        </main>
      </div>
    </div>
  );
}`,
    explanation: [
      "NavLink: Automatically adds active styles to the link when its route matches the current URL.",
      "showPayroll: Evaluates permissions to hide restricted links dynamically."
    ],
    integration: "Save as src/components/layout/Sidebar.jsx. Render it inside your dashboard wrapper alongside the page children viewport.",
    telugu: "Sidebar navigation component check check dynamic menu items show options values permissions. False paths lists auto-hide styles check.",
    bestPractices: "Group links logically, hide rather than disable restricted options to keep the UI clean, and use NavLink to manage active link styles automatically."
  }
];

const Phase3CodeGuide = () => {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeModule = PHASE3_DATABASE[activeModuleIdx];

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(17, 94, 89, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#ccfbf1', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Phase 3: Coding Boilerplate
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          New React Project Boilerplate Code (9 Modules)
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Write your new project code step-by-step. Get copy-to-clipboard boilerplates for project creation, configurations, interceptors, encryption helpers, Redux Toolkit slices, and route guards.
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
              Select Implementation Module:
            </Typography>
            
            {PHASE3_DATABASE.map((module, idx) => (
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
                  bgcolor: activeModuleIdx === idx ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                  color: activeModuleIdx === idx ? '#0d9488' : '#475569',
                  border: '1px solid',
                  borderColor: activeModuleIdx === idx ? 'rgba(13, 148, 136, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(13, 148, 136, 0.04)',
                    borderColor: 'rgba(13, 148, 136, 0.1)'
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
              <Chip label={activeModule.category} color="teal" variant="outlined" size="small" sx={{ fontWeight: 'bold', color: '#0d9488', borderColor: '#0d9488' }} />
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
              <Tab value="theory" label="1. Theory & Core Concept" />
              <Tab value="code" label="2. Boilerplate Code" />
              <Tab value="explain" label="3. Line-by-Line" />
              <Tab value="integration" label="4. How to Integrate" />
              <Tab value="telugu" label="5. Telugu Explanation" />
              <Tab value="best" label="6. Best Practices" />
            </Tabs>

            {/* Sub-tab viewport panels */}
            
            {/* Panel 1: Theory */}
            {activeSubTab === 'theory' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>What is this and why do we build it?</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.theory}</Typography>
              </Box>
            )}

            {/* Panel 2: Code */}
            {activeSubTab === 'code' && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FaTerminal /> boilerplate_file — Copy & Paste Template
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => handleCopyCode(activeModule.code)}
                    startIcon={copied ? <FaCheck /> : <FaCopy />}
                    sx={{ 
                      color: copied ? '#10b981' : '#0d9488', 
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
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Line-by-Line Code Breakdown:</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {activeModule.explanation.map((item, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderLeft: '4px solid #0d9488', borderRadius: '8px' }}>
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                        <strong>Point {idx + 1}:</strong> {item}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Panel 4: How to Integrate */}
            {activeSubTab === 'integration' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>Step-by-Step Project Integration Instructions:</Typography>
                <Paper sx={{ p: 3, bgcolor: '#f0fdf4', borderRadius: '12px', border: '1px dashed #86efac' }}>
                  <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.7 }}>
                    {activeModule.integration}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Panel 5: Telugu translation */}
            {activeSubTab === 'telugu' && (
              <Paper sx={{ p: 3, bgcolor: '#f0fdf4', borderLeft: '5px solid #0d9488', borderRadius: '12px' }}>
                <Typography variant="subtitle2" sx={{ color: '#115e59', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBookOpen /> Telugu Masterclass Explanation:
                </Typography>
                <Typography variant="body2" sx={{ color: '#115e59', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {activeModule.telugu}
                </Typography>
              </Paper>
            )}

            {/* Panel 6: Best Practices */}
            {activeSubTab === 'best' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 1.5 }}>Boilerplate Coding Best Practices:</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.bestPractices}</Typography>
              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Phase3CodeGuide;
