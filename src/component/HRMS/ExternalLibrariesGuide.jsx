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
  FaNetworkWired, 
  FaLock, 
  FaCalendarAlt, 
  FaTable, 
  FaWpforms, 
  FaDatabase, 
  FaProjectDiagram, 
  FaChartLine, 
  FaFileExport, 
  FaCloudDownloadAlt,
  FaShieldAlt,
  FaRunning,
  FaClock
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
    'window', 'JSON', 'axios', 'CryptoJS', 'getCookie', 'reloadRoles', 'createSlice', 'configureStore', 'Blob', 'FileReader', 'create', 'useQuery', 'useMutation', 'useQueryClient', 'zodResolver', 'motion', 'dayjs'
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

// 15 External Libraries Data
const LIBRARIES_DATABASE = [
  {
    id: 0,
    title: "1. Axios",
    icon: <FaNetworkWired />,
    category: "HTTP Transport",
    theory: "Axios is a promise-based HTTP client for the browser and Node.js. It acts as a client-side wrapper around network requests, offering automatic JSON data parsing, request/response interception, request cancellation, and unified error configuration templates.",
    projectUsage: `// Actual usage in temp_bharatpayroll - UserApplyLeave.js
const onSubmit = async (data) => {
  const StartDate = moment(data.startDate).format("DD/MM/YYYY");
  const EndDate = moment(data.endDate).format("DD/MM/YYYY");
  
  const formData = new FormData();
  formData.append("employee", employeeNumber);
  formData.append("leaveRule", data.leaveType);
  formData.append("startDate", StartDate);
  formData.append("endDate", EndDate);
  formData.append("reason", data.eventDescription);

  const headers = ApiHeaders(multitenant);
  const config = {
    headers: { 'content-type': 'multipart/form-data', ...headers }
  };

  try {
    var response = await axios.post(\`/api/leave/apply/\`, formData, config);
    if (response.data) {
      setSmShowsuccess(true);
      setDisplayErrors("Leave(s) Applied Successfully");
    }
  } catch (error) {
    if (error.response.status === 401) {
      SessionLogIn(navigate);
    }
  }
};`,
    basicExample: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic GET request
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data); // data is automatically parsed to JSON
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
    realtimeExample: `// File: services/apiClient.js
import axios from 'axios';

// 1. Create a secure Axios instance with configuration defaults
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Add Request Interceptors to attach authorization tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Add Response Interceptors for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear session cache and force redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);`,
    prosCons: `Advantages:
• Automatic JSON transformation (no need to run response.json() manually).
• Robust interceptor pipeline for globally modifying requests and handling responses.
• Supports upload progress events and request cancellation natively.
• Wide browser support with built-in CSRF protection mechanisms.

Disadvantages:
• External library adds dependency bundle size (approx 30KB minified).
• Requires installation (npm install axios) unlike native fetch.
• Errors are rejected on any non-2xx status code, which requires wrapping calls in try/catch blocks.`,
    telugu: "Axios anedhi client side network requests handle cheyadaniki use chese oka promise-based library. Dynamic API requests send cheyadaniki, server responses ni parse cheyadaniki idhi helpful ga untundi. Normal JavaScript 'fetch' to compare chesthe, isindhi auto JSON format converter parameter checks handle chesthundi. Axios interceptor middleware configure chesi, dynamic tokens automatic headers attach, expired sessions 401 statuses capture chesi redirect logic control chestharu.",
    bestPractices: "Set request timeout limits to prevent infinite loading states, wrap endpoints in service wrapper objects, and use interceptors to inject authorization headers globally.",
    commonMistakes: "Importing axios in multiple components and configuring base URLs inline, and failing to handle network errors inside try/catch blocks.",
    interview: [
      "Q: What is the difference between Axios and Fetch API? - A: Fetch requires manual response.json() parsing and does not reject HTTP error statuses (like 404 or 500) automatically. Axios parses data automatically, rejects non-2xx statuses, and supports interceptors and request cancellation natively.",
      "Q: How do you cancel an Axios request? - A: Use the native AbortController class, pass its signal object in the request configuration options, and call abortController.abort() to cancel the request."
    ],
    alternatives: "React Query / TanStack Query: TanStack Query is not a replacement for Axios, but a state manager for server data. Axios is used to fetch data, and TanStack Query manages caching, loading states, and background updates, replacing local useState hooks."
  },
  {
    id: 1,
    title: "2. CryptoJS",
    icon: <FaLock />,
    category: "Security",
    theory: "CryptoJS is a library of cryptographic standards. It enables client-side encryption and decryption (such as AES-256) to secure sensitive session tokens cached in browser memory (sessionStorage/localStorage) against XSS scripts.",
    projectUsage: `// Actual usage in temp_bharatpayroll - storageUtils.js
export const encryptData = (data) => {
    if (!data) return "";
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return ciphertext.toString();
};

export const decryptData = (encryptedData) => {
    try {
        if (!encryptedData) return null;
        const bytes = CryptoJS.AES.decrypt(encryptedData, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
    } catch (error) {
        return null;
    }
};`,
    basicExample: `import CryptoJS from 'crypto-js';

const secret = "my-secret-key";

// Encrypt string
const ciphertext = CryptoJS.AES.encrypt("secret payload data", secret).toString();
console.log("Encrypted:", ciphertext);

// Decrypt string
const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
const originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log("Decrypted:", originalText);`,
    realtimeExample: `// File: utils/cryptoHelper.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY || "fallback_key_32_characters_long_";
const KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY.substring(0, 32));
const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY.substring(0, 16));

export const secureStore = {
  set: (key, value) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      localStorage.setItem(key, encrypted);
    } catch (e) {
      console.error("Encryption write failed", e);
    }
  },
  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      const bytes = CryptoJS.AES.decrypt(encrypted, KEY, { iv: IV });
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  }
};`,
    prosCons: `Advantages:
• Secures data stored in local storage from plain-text exposure.
• Supports widely used encryption algorithms (AES, DES, TripleDES, RC4).
• Simple, pure JS API with no external dependencies.

Disadvantages:
• Cryptographic calculations can slow down UI threads on low-powered devices for large payloads.
• Client-side encryption is not fully secure if the secret key is visible in source bundles.`,
    telugu: "CryptoJS anedhi JavaScript cryptographic calculations handle cheyadaniki use chese library. LocalStorage or sessionStorage lo store chese tokens and user information raw texts laaga clear text exposure avvakunda encrypt cheyadaniki idhi use chestharu. XSS attempts nunchi token data ni safe ga protect chesthundi.",
    bestPractices: "Never hardcode secret keys in the code; load them from environment variables. Use try/catch blocks for all decryption tasks.",
    commonMistakes: "Encrypting large objects frequently (slowing down the UI thread) and hardcoding keys in JS files.",
    interview: [
      "Q: Can CryptoJS secure localStorage against XSS? - A: Yes, it encrypts the cached values. A hacker using script injection can steal the encrypted string, but cannot read its contents without the secret key.",
      "Q: What is the purpose of an Initialization Vector (IV) in AES? - A: An IV ensures that encrypting the same text multiple times produces different ciphertexts, preventing patterns from being analyzed."
    ],
    alternatives: "Web Crypto API: Modern browsers feature a built-in native cryptography engine. It is faster than CryptoJS but has a more complex, asynchronous promise-based API."
  },
  {
    id: 2,
    title: "3. Moment.js",
    icon: <FaCalendarAlt />,
    category: "Date & Time",
    theory: "Moment.js is a date manipulation library. It parses, validates, manipulates, and formats dates and times dynamically, simplifying time-based calculations.",
    projectUsage: `// Actual usage in temp_bharatpayroll - AddEmployee.js
var newDate = new Date();
var substact = moment(newDate).subtract(18, 'years').format("YYYY-MM-DD");
setMaxDateOfBith(substact);

// Checking backdated leaves in UserApplyLeave.js
const checkthisdateisBackdated = (date) => {
  setdateisBack(false);
  const parsedDate = moment(date);
  const currentDate = moment();
  if (parsedDate.isBefore(currentDate)) {
    if (parsedDate.isSame(currentDate, 'day')) {
      setdateisBack(false);
    } else {
      setdateisBack(true);
    }
  }
};`,
    basicExample: `import moment from 'moment';

// Format current date
const now = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log("Current:", now);

// Add days
const nextWeek = moment().add(7, 'days').calendar();
console.log("Next Week:", nextWeek);`,
    realtimeExample: `// File: utils/timeSpentCalculator.js
import moment from 'moment';

export const calculateShiftHours = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) return "0 hrs";
  
  // Parse inputs using custom time strings format
  const start = moment(checkInTime, "hh:mm A");
  const end = moment(checkOutTime, "hh:mm A");
  
  const duration = moment.duration(end.diff(start));
  const hours = parseInt(duration.asHours());
  const minutes = parseInt(duration.asMinutes()) % 60;
  
  return \`\${hours} hrs \${minutes} mins\`;
};`,
    prosCons: `Advantages:
• Rich API supporting complex date math, timezone conversions, and formatting.
• Simplifies parsing dates from multiple string formats.

Disadvantages:
• Large bundle size (approx 200KB with locales), which can slow down page load times.
• Mutable Date objects: modifying a moment object changes the original instance, leading to bugs.`,
    telugu: "Moment.js anedhi dynamic date and time operations calculations parse, format coordinate cheyadaniki use chese library. Age limit, date ranges comparisons standard operations checks key. check-in, check-out spent hours calculations configurations check models.",
    bestPractices: "Create copies of moment objects before modifying them to prevent mutations. Import only required locale packs to reduce bundle sizes.",
    commonMistakes: "Failing to clone moment instances before changes, leading to unexpected date changes across components.",
    interview: [
      "Q: Why is Moment.js considered legacy today? - A: It is mutable, causing subtle state bugs, and has a large bundle size that is not tree-shakable.",
      "Q: How do you format dates in Moment? - A: Use the moment().format('pattern') method, passing formatting tokens like YYYY-MM-DD or DD-MM-YYYY."
    ],
    alternatives: "Day.js: A modern date-and-time library that uses the same API as Moment but is immutable and has a tiny footprint (2KB vs 200KB)."
  },
  {
    id: 3,
    title: "4. React Data Table Component",
    icon: <FaTable />,
    category: "UI Component",
    theory: "React Data Table Component is a declarative table component for React. It simplifies rendering data grids with built-in support for sorting, pagination, and expandable rows.",
    projectUsage: `// Actual usage in temp_bharatpayroll - Attendance.js
<DataTable
    columns={columns}
    data={attendanceList}
    pagination
    fixedHeader
    scrollX='true'
    fixedHeaderScrollHeight='450px'
    highlightOnHover
    subHeader
    subHeaderComponent={
        <input
            type='text'
            className='form-control w-25'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
        />
    }
/>`,
    basicExample: `import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  { name: 'Title', selector: row => row.title, sortable: true },
  { name: 'Year', selector: row => row.year, sortable: true }
];

const data = [
  { id: 1, title: 'Conan the Barbarian', year: '1982' },
  { id: 2, title: 'Terminator', year: '1984' }
];

export default function SimpleTable() {
  return <DataTable columns={columns} data={data} pagination />;
}`,
    realtimeExample: `// File: components/PaginatedUserTable.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

export default function PaginatedUserTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page) => {
    setLoading(true);
    const res = await axios.get(\`/api/users?page=\${page}&limit=\${perPage}\`);
    setData(res.data.users);
    setTotalRows(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, [perPage]);

  return (
    <DataTable
      columns={[
        { name: 'User ID', selector: row => row.id, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Role', cell: row => <span className="badge">{row.role}</span> }
      ]}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={fetchUsers}
      onChangeRowsPerPage={(currentRowsPerPage) => setPerPage(currentRowsPerPage)}
    />
  );
}`,
    prosCons: `Advantages:
• Declarative columns configuration.
• Built-in, styleable sorting, pagination, and select rows options.
• Supports customizable cell rendering easily.

Disadvantages:
• Styling defaults can conflict with tailwind or custom CSS libraries.
• Rendering custom headers can be complex.`,
    telugu: "React Data Table Component anedhi structured lists grid display target checks cheyadaniki use chese layout library. Simple declarations write chesi sorting pagination option auto setups. row action cell customization and expandable detail logs coordinate elements rendering system target checks.",
    bestPractices: "Always enable paginationServer for databases containing more than 100 entries, and use custom loading indicators for a better user experience.",
    commonMistakes: "Loading thousands of records onto the client side at once, causing browser memory lag.",
    interview: [
      "Q: What is paginationServer inside React Data Table? - A: It delegates pagination logic to the backend API, loading only one page of records at a time instead of loading the entire dataset into browser memory.",
      "Q: How do you render custom buttons in a column cell? - A: Define a 'cell: (row) => ...' property in the column object to render custom JSX."
    ],
    alternatives: "TanStack Table: A headless table library that does not render any UI elements. It manages state and pagination logic, giving developers complete control over styling."
  },
  {
    id: 4,
    title: "5. React Hook Form",
    icon: <FaWpforms />,
    category: "Form Handling",
    theory: "React Hook Form is a library for managing form state and validation. It reduces form re-renders by using ref-based inputs, improving performance in large applications.",
    projectUsage: `// Actual usage in temp_bharatpayroll - AddEmployee.js
const {
  register,
  getValues,
  handleSubmit,
  setValue,
  trigger,
  formState: { errors, isValid },
} = useForm({ mode: "all" });

<input
  className='form-control'
  type='text'
  maxLength={20}
  {...register("First_Name", {
    required: "Please enter first name",
    pattern: {
      value: /^[a-zA-Z_ ]*$/,
      message: "Please enter valid first name",
    },
  })}
/>`,
    basicExample: `import React from 'react';
import { useForm } from 'react-hook-form';

export default function SimpleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: "Username is required" })} />
      {errors.username && <p>{errors.username.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
    realtimeExample: `// File: components/ValidatedLoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ValidatedLoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({ mode: "onBlur" });

  const onLogin = async (data) => {
    // Simulate API request
    await new Promise(r => setTimeout(r, 2000));
    console.log("Logged in with:", data);
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <div>
        <label>Email Address</label>
        <input 
          type="email" 
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
              message: "Please enter a valid email address"
            }
          })} 
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}
      </div>

      <div>
        <label>Password</label>
        <input 
          type="password" 
          {...register("password", { 
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })} 
        />
        {errors.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}`,
    prosCons: `Advantages:
• Near-zero re-renders on keystroke changes, improving form performance.
• Clean, declarative schema validation.
• Integrates easily with UI component libraries.

Disadvantages:
• Relies on uncontrolled inputs by default, which can make managing complex UI switches difficult.
• Requires using Controller wrappers to integrate with controlled UI components (like Select).`,
    telugu: "React Hook Form anedhi form validations perform cheyadaniki and state update lag run avvakunda handle cheyadaniki use chese optimized library. form changes state check and triggers inputs fast performance chesthundhi. `register` method inputs bind validation rules set chesthundi.",
    bestPractices: "Use onBlur validation mode for a better user experience, and use Controller wrappers when integrating with controlled components.",
    commonMistakes: "Using component state variables alongside react-hook-form, which causes unnecessary re-renders.",
    interview: [
      "Q: Why is React Hook Form faster than Formik or Redux Form? - A: Formik and Redux Form use controlled inputs that trigger a re-render of the entire form on every keystroke. React Hook Form uses uncontrolled inputs (ref-based), targeting updates only to the changed input.",
      "Q: What is a Controller component in React Hook Form? - A: It is a wrapper component used to bind controlled UI components (like Material-UI Select or Datepicker) to react-hook-form's state."
    ],
    alternatives: "Formik: A popular form handling library that relies on component state. While easier to understand, it causes more re-renders and can lag on large forms."
  },
  {
    id: 5,
    title: "6. Redux / Redux Toolkit",
    icon: <FaDatabase />,
    category: "State Management",
    theory: "Redux Toolkit (RTK) is the recommended way to write Redux logic. It centralizes global application state, ensuring updates are predictable and easy to trace.",
    projectUsage: `// Actual usage in temp_bharatpayroll - App.js
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const multitenant = useSelector((state) => state.data);
  // ...
};`,
    basicExample: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }
  }
});

export const { increment } = counterSlice.actions;
export const store = configureStore({ reducer: counterSlice.reducer });`,
    realtimeExample: `// File: store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Create asynchronous thunk for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login/', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. Define auth slice with async state reducers
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;`,
    prosCons: `Advantages:
• Unidirectional data flow makes state changes predictable.
• Immer integration allows you to write simple mutative code safely.
• Built-in dev tools make debugging state changes easy.

Disadvantages:
• High configuration boilerplate code compared to lighter state libraries.
• Requires wrapping the application in context provider tags.`,
    telugu: "Redux Toolkit global state store values single locations centralize coordinate cheyadaniki use chese library. Immer use chesi state mutations write chesthe dynamic ga absolute immutability update chestharu. async thunks API calls status sync chesthundi.",
    bestPractices: "Use async thunks for API calls, keep UI-specific state local, and use selectors to access state properties.",
    commonMistakes: "Storing local UI states in the Redux store, adding unnecessary complexity to the application.",
    interview: [
      "Q: What is createSlice in Redux Toolkit? - A: A helper function that automatically generates action creators and action types based on the defined reducers.",
      "Q: How does Immer simplify Redux reducer code? - A: Immer lets you write simpler, mutative code (like state.value = newValue) and converts it to safe, immutable updates automatically."
    ],
    alternatives: "Zustand: A lightweight state management library with zero boilerplate. It is easier to configure and does not require wrapping your app in context provider tags."
  },
  {
    id: 6,
    title: "7. React Router DOM",
    icon: <FaProjectDiagram />,
    category: "Routing",
    theory: "React Router DOM is the standard routing library for React applications. It enables client-side routing, resolving navigation paths in browser memory without page refreshes.",
    projectUsage: `// Actual usage in temp_bharatpayroll - App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}`,
    basicExample: `import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function SimpleRouting() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home View</h1>} />
        <Route path="/about" element={<h1>About View</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`,
    realtimeExample: `// File: routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/layout/Layout';

// Implement Code Splitting using Lazy Loading
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Employees = lazy(() => import('../pages/Employees'));
const Login = lazy(() => import('../pages/Login'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Nested Routes nested inside Layout */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
        </Route>

        {/* Catch-all Not Found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}`,
    prosCons: `Advantages:
• Enables seamless client-side routing with zero page refreshes.
• Supports nested layouts and dynamic path parameters easily.
• NavLink component provides automatic active styling classes.

Disadvantages:
• Large version updates (e.g. v5 to v6) introduce breaking changes, requiring major refactoring.`,
    telugu: "React Router DOM client side page navigation handle chesthundhi. URL transitions resolution memory look checks updates. navigate, routes settings wrappers dynamic checks coordinate.",
    bestPractices: "Use code splitting with React.lazy and Suspense to improve page load times, and use useNavigate for programmatic redirects.",
    commonMistakes: "Using window.location.href for internal navigation, which causes the browser to reload the page and clear application memory.",
    interview: [
      "Q: What is the purpose of <Outlet /> in React Router? - A: Outlet is a placeholder component that renders matched child route components inside parent layout components.",
      "Q: What is the difference between Link and NavLink? - A: Link is a standard navigation link. NavLink automatically adds an active class to styling properties when its route matches the current URL."
    ],
    alternatives: "TanStack Router: A type-safe routing library that catches routing errors at compile time, providing a more robust alternative for large applications."
  },
  {
    id: 7,
    title: "8. Zustand",
    icon: <FaDatabase />,
    category: "State Management",
    theory: "Zustand is a lightweight state management library. It uses simple hooks to share state across components, reducing boilerplate code and keeping codebases clean.",
    projectUsage: `// package.json dependency:
// "zustand": "^4.5.5"
// Zustand is configured in temp_bharatpayroll to manage lightweight global UI state variables.`,
    basicExample: `import { create } from 'zustand';

// Create store hook
const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));

export default function CounterApp() {
  const { count, increase } = useCounterStore();
  return <button onClick={increase}>Clicked {count} times</button>;
}`,
    realtimeExample: `// File: store/userStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      authToken: null,
      
      setUserSession: (userData, token) => set({ 
        user: userData, 
        authToken: token 
      }),
      
      clearSession: () => set({ 
        user: null, 
        authToken: null 
      }),
      
      isAuthenticated: () => get().authToken !== null
    }),
    {
      name: 'secure-user-storage', // Key name in storage
      storage: createJSONStorage(() => sessionStorage) // Use sessionStorage
    }
  )
);`,
    prosCons: `Advantages:
• Simple setup with zero boilerplate code.
• Lightweight library footprint (approx 2KB minified).
• Does not require wrapping the application in context provider tags.
• Renders updates selectively, avoiding unnecessary component updates.

Disadvantages:
• Lacks built-in dev tools structure compared to Redux, though it can be configured to use Redux DevTools.`,
    telugu: "Zustand anedhi lightweight state management library. context API and Redux Toolkit boilerplate complexity lekunda simple state variables hooks configurations check target. sessions configurations UI details easily manage coordinate chestharu.",
    bestPractices: "Use selector functions to access state properties to prevent unnecessary re-renders, and use persist middleware to save state automatically.",
    commonMistakes: "Accessing the entire store object in components, causing components to re-render on any store change.",
    interview: [
      "Q: Why choose Zustand over Redux? - A: Zustand is lighter, has zero boilerplate code, does not require context provider tags, and uses simple hooks to share state across components.",
      "Q: How do you persist Zustand state in sessionStorage? - A: Wrap the store configuration in the 'persist' middleware helper and configure it to use sessionStorage."
    ],
    alternatives: "Redux Toolkit: Redux is better suited for large, complex applications with many state transitions, while Zustand is ideal for smaller, simpler state management tasks."
  },
  {
    id: 8,
    title: "9. Recharts & Chart.js",
    icon: <FaChartLine />,
    category: "Data Visualization",
    theory: "Recharts and Chart.js are data visualization libraries. Recharts is built specifically for React, rendering SVG charts natively. Chart.js is canvas-based and highly performant.",
    projectUsage: `// Actual usage in temp_bharatpayroll - DepartmentGraph.js
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Renders employee attendance graphs dynamically inside the admin dashboard views.`,
    basicExample: `import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Mon', uv: 400 },
  { name: 'Tue', uv: 300 },
  { name: 'Wed', uv: 200 }
];

export default function SimpleChart() {
  return (
    <LineChart width={400} height={200} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );
}`,
    realtimeExample: `// File: components/AttendanceChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'HR', present: 12, absent: 2 },
  { name: 'Engineering', present: 45, absent: 5 },
  { name: 'Sales', present: 22, absent: 8 },
  { name: 'Finance', present: 8, absent: 1 }
];

export default function AttendanceChart() {
  return (
    <div style={{ width: '100%', height: 350, background: '#fff', padding: '20px', borderRadius: '12px' }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff' }} 
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}`,
    prosCons: `Advantages:
• Recharts is React-focused, rendering charts as SVG elements that are easy to style with CSS.
• ResponsiveContainer automatically adapts chart sizes to fit layouts.
• Chart.js supports highly performant canvas renderings.

Disadvantages:
• Rendering charts with thousands of data points can slow down page performance.
• Customizing tooltips and legends in Recharts can be complex.`,
    telugu: "Recharts and Chart.js anevi dashboard records visualizations graphic charts rendering cheyadaniki use chese libraries. Recharts React friendly, SVG components rendering targets support chesthundhi. attendance counts and details represent parameters setups coordinate chestharu.",
    bestPractices: "Always wrap charts inside ResponsiveContainer elements to support responsive layouts, and use simple data structures to improve chart rendering performance.",
    commonMistakes: "Failing to check for empty datasets, leading to page layout breaks when no data is loaded.",
    interview: [
      "Q: What is the difference between SVG and Canvas charts? - A: SVG charts (like Recharts) render charts as separate DOM elements, making them easy to style and interact with but slower for large datasets. Canvas charts (like Chart.js) render charts on a single canvas, making them much faster but harder to style.",
      "Q: How do you make charts responsive? - A: Wrap your chart component inside Recharts' <ResponsiveContainer width='100%' height={300}> component."
    ],
    alternatives: "Framer Motion: Used to add subtle entry animations to chart bars and lines, improving the user experience."
  },
  {
    id: 9,
    title: "10. File Exporters (PDF/XLSX)",
    icon: <FaFileExport />,
    category: "File Export",
    theory: "File Exporters generate document templates (like payslips or transaction statements) on the client side, using libraries like jspdf to create PDFs and exceljs/xlsx to compile Excel sheets.",
    projectUsage: `// Actual usage in temp_bharatpayroll - Systemtrack.js
const onSubmited = async () => {
  var url = \`/api/attendance/keylogger/logs/v2?download=true\`
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    if (response.data) {
      var datass = new Blob([response.data], { type: 'text/ms-excel' });
      var csvURL = window.URL.createObjectURL(datass);
      const link = document.createElement("a");
      link.download = \`SystemTrack_Logs.xlsx\`;
      link.href = csvURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (e) {
    console.error("Export failed", e);
  }
};`,
    basicExample: `import { jsPDF } from "jspdf";

export default function ExportButton() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4_document.pdf");
  };

  return <button onClick={generatePDF}>Download PDF</button>;
}`,
    realtimeExample: `// File: utils/payslipGenerator.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const downloadPayslip = (empData, payrollPeriod) => {
  const doc = new jsPDF();
  
  // 1. Add Brand Headers
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.text("BharatPayroll Pvt Ltd", 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text(\`Payslip for the period: \${payrollPeriod}\`, 14, 26);
  
  // 2. Add Employee Details Section
  doc.line(14, 30, 196, 30);
  doc.text(\`Emp ID: \${empData.empId}\`, 14, 37);
  doc.text(\`Name: \${empData.name}\`, 14, 43);
  doc.text(\`Department: \${empData.department}\`, 14, 49);
  
  // 3. Render Salary Details Table using jspdf-autotable
  const salaryHeaders = [["Earning Head", "Amount (INR)", "Deduction Head", "Amount (INR)"]];
  const salaryRows = [
    ["Basic Salary", empData.basic, "Provident Fund (PF)", empData.pf],
    ["HRA Allowance", empData.hra, "Professional Tax (PT)", empData.pt],
    ["Special Allowance", empData.special, "TDS Deduction", empData.tds],
    ["Gross Earnings", empData.gross, "Total Deductions", empData.deductions]
  ];
  
  doc.autoTable({
    startY: 55,
    head: salaryHeaders,
    body: salaryRows,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229] } // Indigo theme
  });
  
  const finalY = doc.lastAutoTable.finalY + 15;
  doc.setFont("Helvetica", "bold");
  doc.text(\`Net Salary Paid: INR \${empData.netSalary}\`, 14, finalY);
  
  // Save generated PDF file
  doc.save(\`payslip_\${empData.empId}_\${payrollPeriod}.pdf\`);
};`,
    prosCons: `Advantages:
• Generates and downloads files instantly on the client side without server roundtrips.
• Reduces backend processing load.
• autoTable plugin makes styling tables inside PDFs easy.

Disadvantages:
• Heavy library size (jspdf is approx 250KB minified).
• Complex layouts require pixel-level positioning, which can be time-consuming to code.
• Complex exports can freeze the main thread on low-powered devices.`,
    telugu: "File Exporters anevi dynamic slips client side compile download cheyadaniki use chese libraries. PDF details creation reports configurations and automatic download coordinate setups target checks key parameters systems.",
    bestPractices: "Offload very large reports to the server to prevent page freezing, and always display loading indicators during download processing.",
    commonMistakes: "Failing to configure custom fonts, leading to rendering errors for special characters.",
    interview: [
      "Q: How do you download large reports without freezing the UI? - A: Request the file asynchronously from the server, and convert it to a Blob object using window.URL.createObjectURL() to trigger a download.",
      "Q: What is the purpose of responseType: 'blob' in Axios exports? - A: Instructs Axios to receive raw binary data streams (like Excel sheets or PDF files) rather than parsing them as JSON."
    ],
    alternatives: "Server-side PDF generation: Offloads PDF generation to the backend (using libraries like Puppeteer), which is more suitable for large, complex documents."
  },
  {
    id: 10,
    title: "11. TanStack Query",
    icon: <FaCloudDownloadAlt />,
    category: "Server State Engine",
    theory: "TanStack Query (React Query) is a server-state management library for React. It manages caching, background updates, auto-retries, and loading/error states, replacing local useState/useEffect hooks for API integration.",
    projectUsage: `// Not natively configured in package.json but highly recommended for enterprise setups:
// "dependencies": { "@tanstack/react-query": "^5.0.0" }
// Replacing manual Axios calls inside useEffect with structured query hooks.`,
    basicExample: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function SimpleQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('/api/todos').then(res => res.data)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}`,
    realtimeExample: `// File: hooks/useEmployeeData.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// 1. Fetch query with automatic caching configuration
export const useEmployees = () => {
  return useQuery({
    queryKey: ['employeesList'],
    queryFn: () => axios.get('/api/employees/').then(res => res.data),
    staleTime: 60 * 1000, // Data remains fresh for 60 seconds
    gcTime: 5 * 60 * 1000 // Garbage collect cache after 5 minutes
  });
};

// 2. Mutation hook to add an employee and invalidate query cache
export const useAddEmployeeMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newEmpPayload) => axios.post('/api/employees/', newEmpPayload),
    onSuccess: () => {
      // Invalidate query cache to trigger background updates
      queryClient.invalidateQueries({ queryKey: ['employeesList'] });
    }
  });
};`,
    prosCons: `Advantages:
• Eliminates standard API request boilerplate code (reduces lines of code significantly).
• Out-of-the-box caching, background synchronization, and automatic retries.
• Deduplicates multiple identical API requests.

Disadvantages:
• Introduces a learning curve for concepts like query invalidation and caching.
• Increases application bundle size.`,
    telugu: "TanStack Query (React Query) server state management library. API calls calculations local states (useState/useEffect) use chesi write chese boilerplate clear chesthundhi. network data values automatically cache memory logic, background data re-sync options coordinates targets configurations checks.",
    bestPractices: "Set appropriate staleTime limits to avoid redundant API calls, and use mutation hooks to invalidate query caches after data updates.",
    commonMistakes: "Failing to define unique query keys, leading to cache data collisions across components.",
    interview: [
      "Q: What is the difference between staleTime and gcTime in TanStack Query? - A: staleTime defines the duration before data is considered outdated, while gcTime defines how long unused cache data is kept in memory before garbage collection.",
      "Q: How do you trigger automatic background updates? - A: Invalidate the target query key using queryClient.invalidateQueries({ queryKey: [...] }) after successful data mutations."
    ],
    alternatives: "Axios: React Query is not a replacement for Axios. Axios is used to fetch data, and React Query manages caching, loading states, and background updates."
  },
  {
    id: 11,
    title: "12. Zod",
    icon: <FaShieldAlt />,
    category: "Schema Validation",
    theory: "Zod is a TypeScript-first schema declaration and validation library. It compiles validation rules into a single schema object, validating API responses and form inputs securely.",
    projectUsage: `// Not natively configured in package.json but highly recommended for type-safe forms:
// "dependencies": { "zod": "^3.0.0", "@hookform/resolvers": "^3.0.0" }
// Replacing manual react-hook-form validation patterns.`,
    basicExample: `import { z } from "zod";

// Define schema
const UserSchema = z.object({
  username: z.string().min(3, "Must be 3+ chars"),
  email: z.string().email("Invalid email format")
});

// Validate data
const result = UserSchema.safeParse({ username: "jo", email: "test@domain.com" });
if (!result.success) {
  console.log(result.error.errors);
}`,
    realtimeExample: `// File: schemas/onboardingSchema.js
import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z]*$/, "Only letters are allowed"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  age: z.coerce.number()
    .min(18, "Employee must be at least 18 years old")
    .max(65, "Age cannot exceed 65"),
  role: z.enum(["admin", "manager", "employee"], {
    errorMap: () => ({ message: "Please select a valid role" })
  })
});

// React Hook Form integration example:
// const { register, handleSubmit } = useForm({
//   resolver: zodResolver(onboardingSchema)
// });`,
    prosCons: `Advantages:
• Clean, composable API for writing validation rules.
• Seamless integration with TypeScript and react-hook-form resolvers.
• Detailed, customizable error objects.

Disadvantages:
• Increases bundle size slightly.
• Requires using coercion methods (z.coerce) to parse number inputs from form fields.`,
    telugu: "Zod schema-based validation library parameter. UI input validations and API responses schemas compile coordinate elements checker sets. validations checking codes simplified form models configuration check sets.",
    bestPractices: "Define schemas in separate files to keep components clean, and use z.coerce to parse string inputs to numbers automatically.",
    commonMistakes: "Forgetting to wrap form number inputs in z.coerce definitions, causing validation errors for values entered in text fields.",
    interview: [
      "Q: What is the benefit of Zod coercion? - A: HTML form inputs return values as strings by default. Zod coercion (e.g. z.coerce.number()) converts these strings to numbers before running validation checks.",
      "Q: How do you integrate Zod with React Hook Form? - A: Install '@hookform/resolvers' and pass the Zod schema into the resolver configuration options: 'useForm({ resolver: zodResolver(schema) })'."
    ],
    alternatives: "Yup: An older schema validation library that is widely used with Formik, but lacks Zod's native TypeScript support."
  },
  {
    id: 12,
    title: "13. Framer Motion",
    icon: <FaRunning />,
    category: "Animations",
    theory: "Framer Motion is a production-ready motion library for React. It simplifies adding layout transitions, gestures, and premium entry animations to UI elements.",
    projectUsage: `// Not natively configured in package.json but widely used for premium dashboard designs:
// "dependencies": { "framer-motion": "^11.0.0" }
// Replacing basic CSS transitions on UI elements.`,
    basicExample: `import { motion } from "framer-motion";

export default function SimpleAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ width: 100, height: 100, background: 'blue' }}
    />
  );
}`,
    realtimeExample: `// File: components/AnimatedDashboardGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // Render child cards sequentially
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function AnimatedDashboardGrid({ cardsList }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
    >
      {cardsList.map((card) => (
        <motion.div 
          key={card.id}
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          style={{ padding: '20px', background: '#fff', borderRadius: '12px', cursor: 'pointer' }}
        >
          <h4>{card.title}</h4>
          <p>{card.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}`,
    prosCons: `Advantages:
• Declarative animation configurations.
• Built-in spring physical calculations for natural movement.
• Out-of-the-box support for layout transitions and gestures.

Disadvantages:
• Heavy library size (approx 35KB gzipped), which can impact bundle size.
• Complex orchestrations require a solid understanding of variants and controls.`,
    telugu: "Framer Motion React components look animation effects dynamic micro-interactions apply target library. hover, tap, enter exit coordinates standard components animation sets.",
    bestPractices: "Keep animations subtle and fast to improve usability, and use variants to stagger child element animations.",
    commonMistakes: "Adding animations to every element on the page, creating a distracting user experience.",
    interview: [
      "Q: What is staggerChildren in Framer Motion variants? - A: A transition configuration that delays the animations of child elements sequentially, creating a stagger effect.",
      "Q: How do you animate elements as they enter and leave the DOM? - A: Wrap your components in an <AnimatePresence> component, and define exit animations in the motion component: 'exit={{ opacity: 0 }}'."
    ],
    alternatives: "Vanilla CSS transitions: Faster and lighter, but lack support for complex orchestration and physics-based spring animations."
  },
  {
    id: 13,
    title: "14. Day.js",
    icon: <FaClock />,
    category: "Date & Time",
    theory: "Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times. It uses the same API as Moment.js but has a tiny footprint (2KB).",
    projectUsage: `// Not natively configured in package.json but recommended as a lightweight replacement for Moment.js:
// "dependencies": { "dayjs": "^1.11.0" }
// Replacing Moment imports to reduce bundle sizes.`,
    basicExample: `import dayjs from 'dayjs';

// Format current date
const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
console.log("Current time:", now);

// Add days
const nextWeek = dayjs().add(7, 'day').format('DD/MM/YYYY');
console.log("Next week:", nextWeek);`,
    realtimeExample: `// File: utils/dateFormatter.js
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Extend Day.js with required plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

// Convert UTC dates to localized timezone strings
export const formatToLocalTime = (utcDateString, timeZoneName = "Asia/Kolkata") => {
  if (!utcDateString) return "-";
  return dayjs.utc(utcDateString).tz(timeZoneName).format("DD MMM YYYY hh:mm A");
};

// Check if leave application period contains business days
export const getBusinessDaysCount = (startDate, endDate) => {
  let start = dayjs(startDate);
  const end = dayjs(endDate);
  let count = 0;
  
  while (start.isSameOrBefore(end, 'day')) {
    const dayOfWeek = start.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
      count++;
    }
    start = start.add(1, 'day');
  }
  return count;
};`,
    prosCons: `Advantages:
• Tiny bundle size (2KB vs Moment's 200KB).
• Immutable date objects: operations return new instances, avoiding state bugs.
• Compatible with Moment's API, making migration easy.

Disadvantages:
• Requires loading additional plugins manually for features like timezone support.`,
    telugu: "Day.js anedhi Moment.js replacement ga use chese 2KB date manipulation library. size optimization calculations check target element. timezone validations immutability models setup coordinates.",
    bestPractices: "Import only the required plugins to keep bundle sizes small, and treat date objects as immutable instances.",
    commonMistakes: "Forgetting to import and extend plugins (e.g. timezone plugins) before using their methods, leading to errors.",
    interview: [
      "Q: Why migrate from Moment.js to Day.js? - A: Day.js has a tiny footprint (2KB vs 200KB), uses immutable date objects, and supports tree-shaking, keeping bundle sizes small.",
      "Q: What is date immutability? - A: Operations on immutable date objects return new instances rather than modifying the original instance, preventing unexpected state changes across components."
    ],
    alternatives: "Moment.js: Legacy date-and-time library. While full-featured, its large size and mutable API make it less suitable for modern applications."
  },
  {
    id: 14,
    title: "15. Formik",
    icon: <FaWpforms />,
    category: "Form Handling",
    theory: "Formik is a popular form handling library for React. It manages form state, handles validations using Yup schemas, and provides structured form components.",
    projectUsage: `// package.json dependency:
// "dependencies": { "formik": "^2.4.0", "yup": "^1.0.0" }
// Used in legacy onboarding modules in temp_bharatpayroll.`,
    basicExample: `import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function SimpleFormik() {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => console.log(values)}
    >
      <Form>
        <Field name="email" type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}`,
    realtimeExample: `// File: components/FormikEmployeeForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  department: Yup.string()
    .required("Please select a department")
});

export default function FormikEmployeeForm() {
  const initialValues = { fullName: '', email: '', department: '' };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API submit
      await new Promise(r => setTimeout(r, 1500));
      console.log("Submitted values:", values);
      resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div style={{ marginBottom: '15px' }}>
            <label>Full Name</label>
            <Field name="fullName" type="text" className="form-control" />
            <ErrorMessage name="fullName" component="small" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="small" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Department</label>
            <Field name="department" as="select" className="form-control">
              <option value="">Select Dept</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
            </Field>
            <ErrorMessage name="department" component="small" style={{ color: 'red' }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Employee"}
          </button>
        </Form>
      )}
    </Formik>
  );
}`,
    prosCons: `Advantages:
• Managed state, input bindings, and submission handlers out-of-the-box.
• Built-in, styleable error message components.
• Integrates easily with Yup schemas.

Disadvantages:
• Relies on controlled inputs, which can trigger a re-render of the entire form on every keystroke.
• Form setups can be verbose when using custom UI components.`,
    telugu: "Formik form variables states, errors, validations coordinate cheyadaniki use chese popular library. Yup validation schemas support coordinate setups check. controlled inputs process use chesthundi.",
    bestPractices: "Use validation schemas (like Yup) to write clean rules, and keep component layouts organized when using Field components.",
    commonMistakes: "Using Formik on very large, complex forms with hundreds of fields, which can trigger excessive re-renders and slow down performance.",
    interview: [
      "Q: What is the difference between Formik and React Hook Form? - A: Formik uses controlled inputs, meaning every keystroke updates component state and triggers a re-render of the entire form. React Hook Form uses uncontrolled inputs (ref-based), updating state only on submission or validation checks, which is much faster on large forms.",
      "Q: How do you handle custom inputs in Formik? - A: Use the Field component with an 'as' attribute, or use the custom render pattern: '<Field name=\"...\"> {({ field, form }) => ...} </Field>'."
    ],
    alternatives: "React Hook Form: A lighter, faster, ref-based form library that is the preferred choice for modern React applications."
  }
];

const ExternalLibrariesGuide = () => {
  const [activeLibIdx, setActiveLibIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeLib = LIBRARIES_DATABASE[activeLibIdx];

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(79, 70, 229, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#c7d2fe', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Phase 5: External Libraries Masterclass
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          Enterprise React External Libraries Guide
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Analyze, study, and master the external libraries configured in your enterprise HRMS package. Learn what they do, why they are chosen, and compare them with modern developer alternatives.
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
              Select External Library:
            </Typography>
            
            {LIBRARIES_DATABASE.map((lib, idx) => (
              <Button
                key={lib.id}
                fullWidth
                onClick={() => { setActiveLibIdx(idx); setActiveSubTab('theory'); }}
                startIcon={lib.icon}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1.2,
                  px: 2,
                  borderRadius: '12px',
                  fontWeight: activeLibIdx === idx ? 700 : 500,
                  bgcolor: activeLibIdx === idx ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  color: activeLibIdx === idx ? '#4f46e5' : '#475569',
                  border: '1px solid',
                  borderColor: activeLibIdx === idx ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(79, 70, 229, 0.04)',
                    borderColor: 'rgba(79, 70, 229, 0.1)'
                  }
                }}
              >
                {lib.title}
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
                {activeLib.title}
              </Typography>
              <Chip label={activeLib.category} color="primary" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />
            </Box>

            {activeLib.placeholder ? (
              <Box p={4} textAlign="center">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Library walkthrough is coming soon!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  We are covering libraries one by one. Once we complete the explanation of the current library, we will unlock this section next.
                </Typography>
              </Box>
            ) : (
              <>
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
                  <Tab value="theory" label="1. What & Why" />
                  <Tab value="project" label="2. HRMS Project Code" />
                  <Tab value="basic" label="3. Basic Example" />
                  <Tab value="realtime" label="4. Real-Time Example" />
                  <Tab value="proscons" label="5. Pros & Cons" />
                  <Tab value="telugu" label="6. Telugu Explanation" />
                  <Tab value="best" label="7. Best Practices & Mistakes" />
                  <Tab value="interview" label="8. Interview Q&A" />
                  <Tab value="alternatives" label="9. Modern Alternatives" />
                </Tabs>

                {/* Sub-tab viewport panels */}
                
                {/* Panel 1: Theory */}
                {activeSubTab === 'theory' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1 }}>What it is & Why it is used:</Typography>
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeLib.theory}</Typography>
                  </Box>
                )}

                {/* Panel 2: Project Usage */}
                {activeSubTab === 'project' && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                        Actual source code reference from temp_bharatpayroll
                      </Typography>
                      <Button size="small" onClick={() => handleCopyCode(activeLib.projectUsage || '// Reference only')} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#4f46e5', textTransform: 'none', fontSize: '12px' }}>
                        {copied ? 'Copied' : 'Copy Code'}
                      </Button>
                    </Box>
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                      <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeLib.projectUsage || '// Recommended setup placeholder') }} />
                    </Box>
                  </Box>
                )}

                {/* Panel 3: Basic Example */}
                {activeSubTab === 'basic' && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                        Simple, self-contained functional implementation code
                      </Typography>
                      <Button size="small" onClick={() => handleCopyCode(activeLib.basicExample)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#4f46e5', textTransform: 'none', fontSize: '12px' }}>
                        {copied ? 'Copied' : 'Copy Code'}
                      </Button>
                    </Box>
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                      <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeLib.basicExample) }} />
                    </Box>
                  </Box>
                )}

                {/* Panel 4: Real-Time Example */}
                {activeSubTab === 'realtime' && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                        Production-grade enterprise wrapper config setup
                      </Typography>
                      <Button size="small" onClick={() => handleCopyCode(activeLib.realtimeExample)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#4f46e5', textTransform: 'none', fontSize: '12px' }}>
                        {copied ? 'Copied' : 'Copy Code'}
                      </Button>
                    </Box>
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                      <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeLib.realtimeExample) }} />
                    </Box>
                  </Box>
                )}

                {/* Panel 5: Pros & Cons */}
                {activeSubTab === 'proscons' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Advantages & Disadvantages:</Typography>
                    <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                        {activeLib.prosCons}
                      </Typography>
                    </Paper>
                  </Box>
                )}

                {/* Panel 6: Telugu translation */}
                {activeSubTab === 'telugu' && (
                  <Paper sx={{ p: 3, bgcolor: '#eff6ff', borderLeft: '5px solid #4f46e5', borderRadius: '12px' }}>
                    <Typography variant="subtitle2" sx={{ color: '#1e40af', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FaBookOpen /> Telugu Masterclass Explanation (Bilingual script):
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e3a8a', lineHeight: 1.8, fontStyle: 'italic' }}>
                      {activeLib.telugu}
                    </Typography>
                  </Paper>
                )}

                {/* Panel 7: Best Practices & Mistakes */}
                {activeSubTab === 'best' && (
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Paper sx={{ p: 2.5, bgcolor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '10px' }}>
                      <Typography variant="subtitle2" sx={{ color: '#15803d', fontWeight: 800, mb: 0.5 }}>Enterprise Best Practices:</Typography>
                      <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>{activeLib.bestPractices}</Typography>
                    </Paper>
                    <Paper sx={{ p: 2.5, bgcolor: '#fdf2f8', borderLeft: '4px solid #db2777', borderRadius: '10px' }}>
                      <Typography variant="subtitle2" sx={{ color: '#9d174d', fontWeight: 800, mb: 0.5 }}>Common Mistakes to Avoid:</Typography>
                      <Typography variant="body2" sx={{ color: '#9d174d', lineHeight: 1.6 }}>{activeLib.commonMistakes}</Typography>
                    </Paper>
                  </Box>
                )}

                {/* Panel 8: Interview Questions */}
                {activeSubTab === 'interview' && (
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Interview Q&A Checkpoints:</Typography>
                    {activeLib.interview.map((item, idx) => (
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

                {/* Panel 9: Alternatives */}
                {activeSubTab === 'alternatives' && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1 }}>Modern Senior Developer Recommendation:</Typography>
                    <Paper sx={{ p: 3, bgcolor: '#fffbeb', borderLeft: '4px solid #d97706', borderRadius: '12px' }}>
                      <Typography variant="body2" sx={{ color: '#78350f', lineHeight: 1.7 }}>
                        {activeLib.alternatives}
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExternalLibrariesGuide;
