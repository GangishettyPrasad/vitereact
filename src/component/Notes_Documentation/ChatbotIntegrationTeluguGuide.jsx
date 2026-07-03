import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  TextField,
  InputAdornment,
  Tooltip,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { 
  FaTerminal, 
  FaCopy, 
  FaCheck, 
  FaMagnifyingGlass, 
  FaBookOpen,
  FaLightbulb
} from 'react-icons/fa6';
import { MdCleaningServices } from 'react-icons/md';

// Custom VS-Code style Syntax Highlighter
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightCode(code) {
  if (!code) return '';
  const placeholders = [];
  let tokenized = code;

  // 1. Extract Comments (Green: #6a9955)
  tokenized = tokenized.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 2. Extract Strings (Orange/Red: #ce9178)
  tokenized = tokenized.replace(/(["'`])(.*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 3. Escape HTML
  tokenized = escapeHtml(tokenized);

  // 4. Highlight Keywords (Blue/Purple: #569cd6 / #c586c0)
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 
    'from', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'switch', 
    'case', 'break', 'new', 'throw', 'Error', 'class', 'extends', 'super', 
    'true', 'false', 'null', 'undefined', 'as'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: bold;">${kw}</span>`);
  });

  // 5. Highlight Variables/Functions (Teal/Cyan: #4ec9b0 / #9cdcfe)
  const builtins = [
    'useState', 'useEffect', 'useContext', 'useRef', 'createContext', 'Navigate', 
    'Outlet', 'Route', 'Routes', 'BrowserRouter', 'Link', 'sessionStorage', 
    'localStorage', 'fetch', 'axios', 'apiClient', 'JSON', 'FormData', 
    'navigator', 'alert', 'console', 'Promise', 'document', 'window', 'process', 'env'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 6. Highlight Function invocations (Yellow: #dcdcaa)
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // 7. Highlight Numbers (Light Green: #b5cea8)
  tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');

  // 8. Restore Comments and Strings
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

// 28 Roadmap Modules Database
const CONCEPTS_DATABASE = [
  // --- TRACK 1: INITIALIZATION & FOLDERS ---
  {
    id: 1,
    track: "Track 1: Initialization & Folders",
    category: "Project Setup",
    dependency: "None. Start the masterclass here.",
    title: "React Project Creation (Vite)",
    desc: "Initializing a new React project using Vite instead of legacy Webpack. Vite leverages Native ES Modules (ESM) to load files on demand and compiles modules instantly using esbuild.",
    telugu: "Vite template use chesi fresh React application ni set up cheyadam. Webpack tho పోలిస్తే Vite Native ES Modules (ESM) use chesthundi, anduke dynamic modules instant loading avthundi like dynamic delivery trucks. Webpack entire building check chesthe, Vite direct component dynamically server nundi pull chesthundi, local hot reload updates sub-second runtime complete chesthundi. Idi use cheyakapothe large code base code changes reflects and hot reload loop cycles chala latency templates generate chesthayi.",
    whyItMatters: "Speeds up local hot reload loops from 10 seconds in Webpack to sub-second in Vite for large enterprise portals.",
    example1: `// EXAMPLE 1: Vite config setting up local Chatbot dev server
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Auto launch chatbot widget in browser on start
    host: true
  }
});`,
    example2: `// EXAMPLE 2: Vite config redirecting HRMS api endpoints
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.hrms-core.production.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/api/, '')
      }
    }
  }
});`
  },
  {
    id: 2,
    track: "Track 1: Initialization & Folders",
    category: "Project Setup",
    dependency: "Vite Project Creation",
    title: "Scalable Folder Structure",
    desc: "Structuring directories modularly separating dumb UI components (Common), route views (pages), API triggers (services), global states (store), and helpers (utils).",
    telugu: "Scale-ready structure parameters registers setup targets. Sibling file dependencies conflicts and merge overlaps clean layouts update checks. components, pages, context, and utils folder levels clean structure dividers set chestharu like sorting office mail drawers. Core logic components standalone pages modules layers configurations keep. Idi miss aiethe file naming conflicts, code replication issues develop and components tracing standard routing maintenance impossible transitions templates.",
    whyItMatters: "Prevents source conflicts. Ensures developers find code in seconds when fixing bugs in large teams.",
    example1: `// EXAMPLE 1: Chatbot modules structure blueprints
// src/
// ├── components/           # UI elements (bubbles, input)
// ├── hooks/                 # Custom scroll/audio hooks
// ├── pages/                 # Full screens (ChatWindow, Analytics)
// ├── services/             # Axios bot server clients
// └── utils/                # Sanitization helpers`,
    example2: `// EXAMPLE 2: HRMS Corporate portal structure blueprints
// src/
// ├── components/           # LeaveCard, SalaryStubsTable
// ├── context/               # Global employee login states
// ├── pages/                 # HRDashboard, PayrollOverview
// ├── services/             # Axios payroll managers
// └── utils/                # Date and currency formatters`
  },
  {
    id: 3,
    track: "Track 1: Initialization & Folders",
    category: "Architecture",
    dependency: "Scalable Folder Structure",
    title: "Environment Variables (.env)",
    desc: "Separating configuration setups from coding logic. Allows development staging builds to automatically change target API endpoints without editing files.",
    telugu: "Staging, development, production environment values dynamic checking models configs. VITE_ API endpoints, secrets configurations files load parameters, environment configuration switches automatic run handles. Secrets files values raw code variables secure dynamic logs checks bypass key security guard. If omit, security parameters leak in open repository, and target environment switches database details manual code modifications checks dynamic build errors compile systems.",
    whyItMatters: "Prevents leaking credentials and access keys into public Github source repositories.",
    example1: `# EXAMPLE 1: .env.production (Chatbot widget credentials)
REACT_APP_BOT_API_URL=https://chat-core.production.com/v1
REACT_APP_AVATAR_CDN=https://cdn.production.com/avatars`,
    example2: `# EXAMPLE 2: .env.development (HRMS local databases API)
REACT_APP_HRMS_BASE_URL=http://localhost:8000/api
REACT_APP_ENABLE_TESTING_USERS=true`
  },
  // --- TRACK 2: API & INTERCEPTORS ---
  {
    id: 4,
    track: "Track 2: API & Interceptors",
    category: "API Integration",
    dependency: "Environment Variables",
    title: "Global Axios Instance Setup",
    desc: "Creating a common Axios instance with defined baseURL, timeouts, and standard headers to centralize network calls.",
    telugu: "Axios client configurations setups central locations options. Outgoing API request configurations setups standard headers timeout limits (ex: 8000ms) parameters rules triggers check. Network latency requests automatically drops warnings logs checks coordinates rules controls. If omitted, duplicate headers inside every axios calling file happen, request timeouts checks cannot run globally and system freeze conditions browser tab hangs occur.",
    whyItMatters: "Eliminates duplicate header configurations across hundreds of API request files.",
    example1: `// EXAMPLE 1: Chat API client configuration
import axios from 'axios';

export const chatApiClient = axios.create({
  baseURL: process.env.REACT_APP_BOT_API_URL || 'http://localhost:3000',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});`,
    example2: `// EXAMPLE 2: HRMS Core Portal client configuration
import axios from 'axios';

export const hrmsClient = axios.create({
  baseURL: process.env.REACT_APP_HRMS_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});`
  },
  {
    id: 5,
    track: "Track 2: API & Interceptors",
    category: "API Integration",
    dependency: "Global Axios Instance Setup",
    title: "Modular API Services Layer",
    desc: "Abstracting API requests into dedicated service files. Keeps components clean of direct Axios import statements.",
    telugu: "API network routes direct components Axios calls dynamic bypass rules layout. API services layers separation parameters keep files clean. Mock response objects configuration methods dynamic test coordinates systems targets mappings. Standard endpoints parameters methods call settings wrappers. If omit, direct Axios instances load templates in page components, test mocks complex and UI components become tightly coupled to server data structures.",
    whyItMatters: "Improves testability. You can mock api responses easily without triggering real server hits.",
    example1: `// EXAMPLE 1: Chatbot Queries API Service
import { chatApiClient } from './apiClient';

export const chatbotService = {
  async postQuery(sessionId, userText) {
    const res = await chatApiClient.post('/chat/query', { sessionId, message: userText });
    return res.data;
  },
  async getSessions(userId) {
    const res = await chatApiClient.get(\`/chat/history/\${userId}\`);
    return res.data;
  }
};`,
    example2: `// EXAMPLE 2: HRMS Employee Leave Service
import { hrmsClient } from './apiClient';

export const leaveService = {
  async fetchLeaveBalance(empId) {
    const res = await hrmsClient.get(\`/employees/\${empId}/leaves\`);
    return res.data;
  },
  async applyLeave(payload) {
    const res = await hrmsClient.post('/leaves/apply', payload);
    return res.data;
  }
};`
  },
  // --- TRACK 3: ROUTING & GUARDS ---
  {
    id: 6,
    track: "Track 3: Routing & Guards",
    category: "Router & Guard",
    dependency: "Modular API Services Layer",
    title: "React Router Configuration",
    desc: "Setting up browser router tree structures to resolve paths dynamically to specific page views.",
    telugu: "React routing configuration setups browser dynamic page coordinates mapping rules. Routing path templates loading screens dynamic outlet coordinates tree structures. Deep link bookmark dynamic screens navigation path trace controls setups. If omitted, standard browser navigation history updates fail, bookmarks direct load routes not found error messages render options page breaks happen.",
    whyItMatters: "Maintains page navigation history and allows direct deep-linking bookmarks to dashboard features.",
    example1: `// EXAMPLE 1: Routing configuration for Chatbot console
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatConsole from './pages/ChatConsole';

export function ChatAppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/console" element={<ChatConsole />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    example2: `// EXAMPLE 2: Routing configuration for HRMS core portal pages
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoreDashboard from './pages/CoreDashboard';
import PayrollModule from './pages/PayrollModule';

export function HRMSAppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<CoreDashboard />} />
        <Route path="/payroll" element={<PayrollModule />} />
      </Routes>
    </BrowserRouter>
  );
}`
  },
  {
    id: 7,
    track: "Track 3: Routing & Guards",
    category: "Router & Guard",
    dependency: "React Router Configuration",
    title: "Private Route Guard Walls",
    desc: "Protecting dashboard pages by checking authentication tokens. Redirects unauthenticated users to Login page.",
    telugu: "Auth route guards verification guards check checkpoints layouts indicators. User session check, JSON parsing tokens default header credentials setup checks. Redirect unauthenticated users path login settings controllers replace structures. If omitted, authorization completely drops client side screens parameters, dynamic dashboard URL endpoints guess updates parameters users easily bypass validation pages.",
    whyItMatters: "Blocks unauthorized users from bypassing client menus by typing dashboard paths directly in the URL bar.",
    example1: `// EXAMPLE 1: Guard for AI Assistant admin setting
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AssistantAdminGuard() {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('userRole');

  if (!token || userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <Outlet />; // Loads inner route targets
}`,
    example2: `// EXAMPLE 2: Guard for Premium HRMS payroll panel
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PayrollGuard() {
  const hasToken = document.cookie.includes('userinfoCookie');
  const activePlan = sessionStorage.getItem('planLevel'); // e.g. 'premium'

  if (!hasToken || activePlan !== 'premium') {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }
  return <Outlet />;
}`
  },
  {
    id: 8,
    track: "Track 3: Routing & Guards",
    category: "Router & Guard",
    dependency: "Private Route Guard Walls",
    title: "Shared Layout Structures",
    desc: "Designing shared layouts with static Headers/Sidebars. Outlet dynamically renders nested path components.",
    telugu: "Static frame components sidebar top header static layouts templates nested viewport updates checks. Outlet dynamic render loops mapping coordinate dynamic components loaders rules. Sidebar static transitions render limits prevent layouts. If omitted, route switches destroy sidebar components completely, resulting in frame flicker, memory reload latency, page transition scroll state loses.",
    whyItMatters: "Prevents sidebar flicker and re-mount latency during route transitions.",
    example1: `// EXAMPLE 1: Chat console layout shell
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function ConsoleLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 200, background: '#111827', color: '#fff', padding: 15 }}>
        <Link to="/console" style={{ display: 'block', color: '#fff' }}>Chat View</Link>
      </aside>
      <main style={{ flexGrow: 1, padding: 20 }}>
        <Outlet /> {/* Dynamic pages render here */}
      </main>
    </div>
  );
}`,
    example2: `// EXAMPLE 2: HRMS Shared Portal frame
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from './TopHeader';

export default function PortalFrame() {
  return (
    <div>
      <TopHeader />
      <div style={{ padding: '30px' }}>
        <Outlet />
      </div>
    </div>
  );
}`
  },
  // --- TRACK 4: SECURITY & SESSIONS ---
  {
    id: 9,
    track: "Track 4: Security & Sessions",
    category: "Authentication",
    dependency: "Shared Layout Structures",
    title: "JWT Session Authentication",
    desc: "Handling JWT access tokens. Reading, parsing, and storing session states in cookies and session storage.",
    telugu: "User session validation JWT tokens extraction decryption details cookie parsed keys checks. session storage registers parameters active values user-info storage configs  controllers parameters. Authorization headers security verification credentials parameters mapping setup indicators. If omit, active user details and authentication logs are not checked, API requests fail and users gets logged out unexpectedly on page refresh.",
    whyItMatters: "Validates request authenticity on both client router rendering and server API persistence levels.",
    example1: `// EXAMPLE 1: Session parsing for AI bot widget
export function loadBotToken() {
  const userInfo = sessionStorage.getItem('user-info');
  if (!userInfo) return null;
  try {
    const parsed = JSON.parse(userInfo);
    return parsed?.token?.access || null;
  } catch (e) {
    return null;
  }
}`,
    example2: `// EXAMPLE 2: Cookie parser for HRMS profile session
export function getHRMSAccessToken() {
  const match = document.cookie.match(/(^|;\\s*)userinfoCookie\\s*=\\s*([^;]+)/);
  if (!match) return null;
  try {
    const decoded = decodeURIComponent(match[2]);
    const parsed = JSON.parse(decoded);
    return parsed.token.access;
  } catch (e) {
    return null;
  }
}`
  },
  {
    id: 10,
    track: "Track 4: Security & Sessions",
    category: "Authentication",
    dependency: "JWT Session Authentication",
    title: "Role-Based Authorization",
    desc: "Gating views and actions based on user privilege levels (e.g. CEO, Admin, Employee).",
    telugu: "Roles authentication gating authorization security levels verification controllers checks. User roles (Admin, HR, Employee) match routing permissions screens restrict controllers config coordinates. Unauthorized role routes redirects blocks warning indicators. If omit, general system users view executive settings dashboards, changing configurations or reading salary structures parameters directly.",
    whyItMatters: "Prevents employees from viewing administrative configurations or executive payroll databases.",
    example1: `// EXAMPLE 1: Admin logs page gating check
import React from 'react';

export default function BotAdminLogsPage({ userProfile }) {
  const isAdmin = userProfile?.roles?.includes('ADMIN');

  if (!isAdmin) {
    return <p style={{ color: 'red' }}>Access Denied: Admin authorization required.</p>;
  }

  return <div>Rendering sensitive Chatbot engine diagnostics logs...</div>;
}`,
    example2: `// EXAMPLE 2: HRMS Salary details editor access gate
import React from 'react';

export function SalaryEditor({ activeUser }) {
  const isHR = activeUser.role === 'hr_manager' || activeUser.role === 'CEO';

  if (!isHR) {
    return <div>⚠️ Access Denied: You are not authorized to edit salaries.</div>;
  }

  return <button>Modify Employee salary structure</button>;
}`
  },
  {
    id: 11,
    track: "Track 4: Security & Sessions",
    category: "Authentication",
    dependency: "Role-Based Authorization",
    title: "Granular Permissions Tree (RBAC)",
    desc: "Mapping dynamic modules permission trees returned from database to control read/write/edit levels on components.",
    telugu: "RBAC systems dynamic permission maps checking parameters coordinates logic validation templates. View, Add, Edit, Delete permission flags verify indicators mapping rules. UI buttons show/hide rendering checks conditional controls. If omitted, user can see write/delete buttons on screen, click triggers API errors on server side, presenting poor UI experience templates.",
    whyItMatters: "Enables dynamic feature flagging. Allows users with custom roles to use specific dashboard tools without full admin rights.",
    example1: `// EXAMPLE 1: Gating chatbot settings by permission object
export function canManageBots(rolesData) {
  // Check modules configuration tree
  return rolesData?.modules?.BotManagement?.submodules?.Settings?.change === true;
}`,
    example2: `// EXAMPLE 2: Gating HRMS attendance approvals buttons
export function canApproveAttendance(rolesFromDb) {
  return rolesFromDb?.modules?.AttendenceModule?.submodules?.AttendanceApprovals?.add === true;
}`
  },
  {
    id: 12,
    track: "Track 4: Security & Sessions",
    category: "UI Design",
    dependency: "Granular Permissions Tree (RBAC)",
    title: "Permission-Based Sidebar Layout",
    desc: "Dynamically rendering sidebar links based on loaded permission maps. Hides unauthorized paths from menus.",
    telugu: "Sidebar routes navigation paths permissions configs filters dynamic links visibility rules checks. Unauthorized menus automatically hidden, UI presentation layout profiles cleanup monitors indicators configs. Navigation links coordinates structures templates. If omitted, sidebar displays invalid access options buttons, user clicks them, route guard redirects to notfound, causing user interface confusion.",
    whyItMatters: "Keeps navigation clean by hiding links that would otherwise redirect to unauthorized pages.",
    example1: `// EXAMPLE 1: Dynamic sidebar links for Chat Console
import React from 'react';

export function BotSidebar({ permissions }) {
  const showAnalytics = permissions?.modules?.Analytics?.view !== false;
  
  return (
    <div>
      <a href="/console">Console Home</a>
      {showAnalytics && <a href="/console/analytics">Bot Performance Logs</a>}
    </div>
  );
}`,
    example2: `// EXAMPLE 2: Dynamic sidebar links for Corporate HRMS navigation
import React from 'react';

export function HRMSSidebar({ rolesFromDb }) {
  const showPayroll = rolesFromDb?.modules?.LeaveModule?.submodules?.LeaveApprovals?.view !== false;

  return (
    <nav>
      <a href="/dashboard">Dashboard</a>
      {showPayroll && <a href="/payroll">Run Payroll Settings</a>}
    </nav>
  );
}`
  },
  // --- TRACK 5: GLOBAL STATE MANAGEMENT ---
  {
    id: 13,
    track: "Track 5: Global State Management",
    category: "State Management",
    dependency: "Permission-Based Sidebar Layout",
    title: "Redux Toolkit Slices & Store",
    desc: "Setting up standard global state stores with slices, reducers, selectors, and state selectors dispatchers.",
    telugu: "Redux Toolkit state manager global slices definitions dispatches mappings. Components sync rules state indicators hooks selectors props drilling bypass structures indicators mapping rules. Central source of truth update monitors. If omit: sibling UI views hold mismatched state caches, requiring manual reloads to sync sidebar settings across modules.",
    whyItMatters: "Centralizes application state, preventing data synchronization issues between sibling components.",
    example1: `// EXAMPLE 1: Redux Slice tracking bot active sessions
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: { activeSession: null, messages: [] },
  reducers: {
    setSession: (state, action) => { state.activeSession = action.payload; },
    addMessage: (state, action) => { state.messages.push(action.payload); }
  }
});
export const { setSession, addMessage } = chatSlice.actions;
export default chatSlice.reducer;`,
    example2: `// EXAMPLE 2: Redux Slice managing HRMS company profiles
import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: { activeTenant: null, branches: [] },
  reducers: {
    selectBranch: (state, action) => { state.activeTenant = action.payload; }
  }
});
export const { selectBranch } = companySlice.actions;
export default companySlice.reducer;`
  },
  {
    id: 14,
    track: "Track 5: Global State Management",
    category: "State Management",
    dependency: "Redux Toolkit Slices & Store",
    title: "React Context API (useContext)",
    desc: "Providing lightweight state trees (like Themes or Auth) without prop-drilling or large Redux store payloads.",
    telugu: "Lightweight context providers values hook setups. Authentication status active configs themes dark mode variables shared selectors rules checks. Sub-components prop drilling bypass mechanisms settings controls checks. Context wrappers variables controls. If omitted, theme settings or simple user session profiles require prop drilling down 10 levels, making intermediate code files extremely messy.",
    whyItMatters: "Reduces code complexity when sharing theme, configuration, or authentication state across deep component levels.",
    example1: `// EXAMPLE 1: Custom configuration context for Bot UI
import React, { createContext, useContext, useState } from 'react';

const BotConfigContext = createContext(null);

export function BotConfigProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <BotConfigContext.Provider value={{ theme, setTheme }}>
      {children}
    </BotConfigContext.Provider>
  );
}
export const useBotConfig = () => useContext(BotConfigContext);`,
    example2: `// EXAMPLE 2: QuickAccess contextual helper for HRMS
import React, { createContext, useContext, useState } from 'react';

const QuickAccessContext = createContext(null);

export function QuickAccessProvider({ children }) {
  const [shortcuts, setShortcuts] = useState([]);
  return (
    <QuickAccessContext.Provider value={{ shortcuts, setShortcuts }}>
      {children}
    </QuickAccessContext.Provider>
  );
}
export const useQuickAccess = () => useContext(QuickAccessContext);`
  },
  {
    id: 15,
    track: "Track 5: Global State Management",
    category: "React Core",
    dependency: "React Context API (useContext)",
    title: "React Core Hooks (State & Effects)",
    desc: "Utilizing React lifecycle hooks (useState, useEffect, useMemo, useCallback) to manage reactivity and render optimization.",
    telugu: "Component reactive states parameters triggers hooks layouts monitors checks. useState variables local updates, useEffect side effects tracking listeners cleanup setups templates. useMemo memoization functions selectors performance optimization triggers caching. If omitted, component memory leaks build up, triggers infinite API loops browser console freezes locks operations.",
    whyItMatters: "Prevents redundant re-computations and memory leaks on high-frequency UI updates.",
    example1: `// EXAMPLE 1: Scroll lock tracker using useEffect on chat
import React, { useState, useEffect, useRef } from 'react';

export function ChatContainer({ msgCount }) {
  const containerRef = useRef(null);
  useEffect(() => {
    // Auto scroll bottom when count changes
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgCount]);

  return <div ref={containerRef} />;
}`,
    example2: `// EXAMPLE 2: Filter caching metrics via useMemo in HRMS
import React, { useMemo } from 'react';

export function PayrollSummaries({ employees }) {
  // Memoize heavy calculations to run only when list changes
  const grandTotal = useMemo(() => {
    return employees.reduce((acc, emp) => acc + emp.salary, 0);
  }, [employees]);

  return <div>Grand Total CTC: {grandTotal}</div>;
}`
  },
  // --- TRACK 6: FORMS & UI DATA ---
  {
    id: 16,
    track: "Track 6: Forms & UI Data",
    category: "UI Design",
    dependency: "React Core Hooks (State & Effects)",
    title: "React Hook Form Validation",
    desc: "Orchestrating forms inputs, error notifications, validation regex patterns without triggering page reload.",
    telugu: "Form inputs registers validations validation rules regex patterns checks triggers validations. Real-time inputs validation indicators message inline text indicators controls. Keyboard re-renders loops bypass mechanisms setups configurations indicators. If omitted, page wide components re-render on every single keystroke, lag performance, and server receives dirty inputs.",
    whyItMatters: "Reduces re-renders. Component inputs values are stored internally rather than firing state updates on every keystroke.",
    example1: `// EXAMPLE 1: Chatbot parameters customization form
import React from 'react';
import { useForm } from 'react-hook-form';

export function BotConfigForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("botName", { required: "Name is required" })} />
      {errors.botName && <span>{errors.botName.message}</span>}
      <button type="submit">Save Bot</button>
    </form>
  );
}`,
    example2: `// EXAMPLE 2: HRMS Employee profile registration form
import React from 'react';
import { useForm } from 'react-hook-form';

export function NewEmployeeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email", { 
        pattern: { value: /\\S+@\\S+\\.\\S+/, message: "Invalid email" } 
      })} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Create Employee</button>
    </form>
  );
}`
  },
  {
    id: 17,
    track: "Track 6: Forms & UI Data",
    category: "API Integration",
    dependency: "React Hook Form Validation",
    title: "Form Submission & API Binding",
    desc: "Interpreting forms events and posting payloads to API endpoints. Handling loaders states during server latency.",
    telugu: "Form data payloads Axios post submissions services api binds triggers logic checks. Submitting loaders controls disable button double submission prevention parameters monitors checks. Try catch validation error alerts setups systems triggers coordinates. If omit, users double click submit buttons, posting duplicate API payloads creating database entity conflicts.",
    whyItMatters: "Disabling buttons during pending requests prevents duplicate server entries.",
    example1: `// EXAMPLE 1: Sending chat form data
import React, { useState } from 'react';

export function ChatSubmitButton({ rawPrompt, chatService }) {
  const [sending, setSending] = useState(false);

  const handlePost = async () => {
    setSending(true);
    try {
      await chatService.postMessage(rawPrompt);
    } catch (e) {
      alert('Fail to send');
    } finally {
      setSending(false);
    }
  };

  return <button onClick={handlePost} disabled={sending}>Submit</button>;
}`,
    example2: `// EXAMPLE 2: Submitting employee leave claim data
import React, { useState } from 'react';

export function LeaveApplyAction({ leaveForm, leaveService }) {
  const [submitting, setSubmitting] = useState(false);

  const applyAction = async () => {
    setSubmitting(true);
    try {
      await leaveService.applyLeave(leaveForm);
    } finally {
      setSubmitting(false);
    }
  };

  return <button onClick={applyAction} disabled={submitting}>Apply Leave</button>;
}`
  },
  {
    id: 18,
    track: "Track 6: Forms & UI Data",
    category: "React Core",
    dependency: "Form Submission & API Binding",
    title: "Creating Reusable Custom UI Components",
    desc: "Building highly reusable presentational components (tables, loaders, badges) configured entirely via props.",
    telugu: "Common reusable presentational components tables alerts badges loader indicators layout structures parameters templates. Design guidelines consistency mappings props values settings configurations setup coordinates. Single source of design changes filters guidelines. If omit, modifying button borders or color themes requires editing hundreds of files, leading to inconsistent app interface layouts.",
    whyItMatters: "Centralizes theme design changes. Changing the color theme in one component updates it app-wide.",
    example1: `// EXAMPLE 1: Chat status badge widget
import React from 'react';

export default function StatusIndicator({ statusText }) {
  const active = statusText === 'online';
  return (
    <span style={{ 
      color: active ? '#10b981' : '#9ca3af',
      fontSize: '12px' 
    }}>
      ● {statusText}
    </span>
  );
}`,
    example2: `// EXAMPLE 2: HRMS tabular employee log view
import React from 'react';

export default function RecordRow({ employee }) {
  return (
    <tr>
      <td>{employee.empCode}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
    </tr>
  );
}`
  },
  {
    id: 19,
    track: "Track 6: Forms & UI Data",
    category: "React Core",
    dependency: "Creating Reusable Custom UI Components",
    title: "Writing Reusable Custom Hooks",
    desc: "Extracting repetitive state lifecycle logic into standalone custom hooks (e.g. useSpeechToText, useLocalStorage).",
    telugu: "Reusable custom hooks layout state log extraction configs hooks folders. Scroll locks tracking hooks, localstorage syncing variables hooks helper functions indicators logic rules setups. Logic separations presentational views cleanups coordinate mapping. If omitted, repetitive states loops (e.g. scroll listeners) are duplicated inside every file, bloating source directories.",
    whyItMatters: "Separates UI layout code from state logic, making both parts easier to read and test.",
    example1: `// EXAMPLE 1: useChatScroll hook
import { useEffect, useRef } from 'react';

export function useChatScroll(dependencyArray) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependencyArray]);
  return ref;
}`,
    example2: `// EXAMPLE 2: useSessionTimer hook
import { useEffect } from 'react';

export function useSessionTimer(logoutAction, limitMs = 60000) {
  useEffect(() => {
    const timer = setTimeout(logoutAction, limitMs);
    return () => clearTimeout(timer);
  }, [logoutAction, limitMs]);
}`
  },
  {
    id: 20,
    track: "Track 6: Forms & UI Data",
    category: "Architecture",
    dependency: "Writing Reusable Custom Hooks",
    title: "Pure Utility Functions",
    desc: "Writing pure JS functions (date parsers, currency converters) isolated from React render lifecycle for unit testing.",
    telugu: "Stateless helper functions date parsing currency converters values mappings indicators helpers pure scripts. React logic components separation deterministic functions inputs outputs validations setups. Easy unit testing hooks checks. If omit, formatters are hardcoded inside UI components, preventing code reuse and making unit testing helpers impossible in isolation.",
    whyItMatters: "Ensures calculations are 100% deterministic and easy to unit test using Jest or Vitest.",
    example1: `// EXAMPLE 1: Chat raw text sanitize utility
export function cleanRawPrompt(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .substring(0, 500);      // Max char limit
}`,
    example2: `// EXAMPLE 2: HRMS date duration calculation utility
export function getDurationDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}`
  },
  // --- TRACK 7: PERFORMANCE & SECURITY ---
  {
    id: 21,
    track: "Track 7: Performance & Security",
    category: "Architecture",
    dependency: "Pure Utility Functions",
    title: "React Performance Tuning",
    desc: "Optimizing render speeds using code splitting, memoization (React.memo, useMemo, useCallback) and windowing virtual lists.",
    telugu: "React optimization frames rendering speed check memoization techniques virtual scrolling systems configurations checks. Caching calculations useMemo, callbacks useCallback controls. Large data tables dynamic loads virtual rows setups. If omit, page lags scrolling through thousands of lines payroll log records, frames drop browser responsiveness freeze.",
    whyItMatters: "Prevents lagging user interface frames on pages displaying large payroll sheets or high-frequency chat streams.",
    example1: `// EXAMPLE 1: Memoized chat bubbles list container
import React, { memo } from 'react';

const ChatBubbleNode = memo(({ message }) => {
  return <div className="chat-bubble">{message.text}</div>;
});
ChatBubbleNode.displayName = 'ChatBubbleNode';
export default ChatBubbleNode;`,
    example2: `// EXAMPLE 2: Virtual scroll list for HRMS employee directories
import React from 'react';

export function VirtualizedRow({ item, index, style }) {
  // Only renders rows currently visible in viewport scroll
  return (
    <div style={style}>
      Row {index}: {item.name}
    </div>
  );
}`
  },
  {
    id: 22,
    track: "Track 7: Performance & Security",
    category: "Architecture",
    dependency: "React Performance Tuning",
    title: "Application Client Security",
    desc: "Hardening client security against XSS/CSRF. Using AES encryption libraries to protect cached tokens from inspection.",
    telugu: "Client data security shields cached tokens configurations controls logic verification targets settings. CryptoJS AES encryption algorithms storage wrapper overrides parameters setups indicators keys configs. Inspect tools local storage values hide safeguards rules. If omitted, rogue browser extensions read plaintext JWT session variables in localStorage, hijacking user accounts.",
    whyItMatters: "Shields user tokens and employee records from access via malicious scripts injected into the browser.",
    example1: `// EXAMPLE 1: Bot session token AES encrypt cache
import CryptoJS from 'crypto-js';

const KEY = 'bot_sec_key_token';
export function encryptTokenCache(token) {
  return CryptoJS.AES.encrypt(token, KEY).toString();
}
export function decryptTokenCache(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}`,
    example2: `// EXAMPLE 2: storageUtils AES sessionStorage override implementation
import CryptoJS from 'crypto-js';
const KEY = "hrms_secret";

// Override storage prototype to encrypt data automatically
const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function(key, value) {
  const ciphertext = CryptoJS.AES.encrypt(value, KEY).toString();
  originalSetItem.call(sessionStorage, key, ciphertext);
};`
  },
  {
    id: 23,
    track: "Track 7: Performance & Security",
    category: "Architecture",
    dependency: "Application Client Security",
    title: "Global Error Boundaries & UI Alerts",
    desc: "Catching runtime Javascript exceptions using Error Boundaries and formatting API crashes into user-friendly error banners.",
    telugu: "Component exceptions runtime catches Error Boundaries alerts fallback layout rendering setups. Render failure fallback views triggers resets logic structures checks monitors variables. Safe user error banners configurations alerts. If omit: single unhandled JS error in a subcomponent crashes the entire page workspace, displaying a completely blank white screen.",
    whyItMatters: "Ensures the entire app dashboard doesn't go blank when a sub-component triggers an unexpected runtime error.",
    example1: `// EXAMPLE 1: Chat server downtime fallback screen
import React from 'react';

export default function ChatFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: '20px', background: '#fef2f2', color: '#991b1b' }}>
      <h4>⚠️ Assistant Connection Failed</h4>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Reconnecting</button>
    </div>
  );
}`,
    example2: `// EXAMPLE 2: HRMS system recovery boundaries wrapper
import React, { Component } from 'react';

export class HRMSBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) {
      return <h2>Portal experienced a runtime issue. Auto-refreshing...</h2>;
    }
    return this.props.children;
  }
}`
  },
  {
    id: 24,
    track: "Track 7: Performance & Security",
    category: "Architecture",
    dependency: "Global Error Boundaries & UI Alerts",
    title: "Frontend Client Logging Services",
    desc: "Capturing client errors, browser environments details, and shipping log payloads to centralized monitoring endpoints.",
    telugu: "Client crashes errors environments parameters telemetry logging service configs coordinates. Central server logging endpoints reports payloads formats. Developers diagnostic monitors bug alerts indicators telemetry. If omit, production runtime errors go unrecorded, forcing developer to rely on vague user support tickets rather than trace logs metadata.",
    whyItMatters: "Provides developers with real-time insight into production bugs without relying on user bug reports.",
    example1: `// EXAMPLE 1: Chat engine query timeout logger
export async function logBotErrorTelemetry(errDetails) {
  const logPayload = {
    app: 'chatbot_widget',
    error: errDetails.message,
    browser: navigator.userAgent,
    timestamp: new Date().toISOString()
  };
  
  await fetch('https://telemetry.enterprise.com/logs', {
    method: 'POST',
    body: JSON.stringify(logPayload)
  });
}`,
    example2: `// EXAMPLE 2: HRMS user actions log payload compiler
export function captureHRMSLog(actionCode, targetId, employeeId) {
  const metadata = {
    action: actionCode,
    target: targetId,
    user: employeeId,
    timestamp: Date.now()
  };
  console.log('Telemetry Log compiled:', metadata);
  // Send to backend analytics systems
}`
  },
  // --- TRACK 8: LAUNCH & DEVOPS ---
  {
    id: 25,
    track: "Track 8: Launch & DevOps",
    category: "Architecture",
    dependency: "Frontend Client Logging Services",
    title: "Production Deployment Configs",
    desc: "Optimizing production builds, setting asset caches, configure Nginx routes for Single Page Application index redirects.",
    telugu: "Vite production builds build bundle setups static assets caching. Nginx routing configs single page app redirects rewrite rules configs index.html fallbacks templates maps. Docker configurations. If omit: browser refreshes on sub-route URL folders like /dashboard/payroll result in server HTTP 404 error pages, breaking navigation paths.",
    whyItMatters: "Prevents 404 errors when users refresh deep route paths (e.g. /dashboard/payroll) on live servers.",
    example1: `// EXAMPLE 1: Nginx router redirects config file
# File: nginx.conf (SPA Fallback Redirect Configuration)
server {
  listen 80;
  server_name localhost;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html; # SPA routing fallback
  }
}`,
    example2: `// EXAMPLE 2: Dockerfile production containerization file
# File: Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf`
  },
  {
    id: 26,
    track: "Track 8: Launch & DevOps",
    category: "Architecture",
    dependency: "Production Deployment Configs",
    title: "Git Workflow & Release Pipeline",
    desc: "Structuring branch models (feature, hotfix, release, main) and configuring pre-commit hooks to enforce coding standards.",
    telugu: "Git version branch models rules feature branch release pipeline structures guidelines. Precommit lint rules Husky configuration automatic checkups merges blocks validations. Branch styling parameters indicators guidelines. If omit: developers commit unformatted code files with syntax errors directly to production repository branches, corrupting deployment pipelines.",
    whyItMatters: "Blocks formatting issues and compilation errors from merging into production branches.",
    example1: `// EXAMPLE 1: git features branch creation sequence
# 1. Pull latest changes from main branch
git checkout main
git pull origin main

# 2. Spawn a feature branch
git checkout -b feature/integrate-chatbot-widget

# 3. Code changes made -> commit and push to remote branch
git add .
git commit -m "feat: add conversational layout view"
git push origin feature/integrate-chatbot-widget`,
    example2: `// EXAMPLE 2: package.json husky pre-commit configurations hook
{
  "name": "enterprise-portal",
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
  }
}`
  },
  {
    id: 27,
    track: "Track 8: Launch & DevOps",
    category: "Architecture",
    dependency: "Git Workflow & Release Pipeline",
    title: "Continuous Integration Pipelines",
    desc: "Configuring GitHub Actions/GitLab CI scripts to run tests, lint scripts, and build bundles automatically on code pull requests.",
    telugu: "CI workflow automation pipelines scripts pull request build verifications tests code analysis checkups templates maps. GitHub Actions runner environment settings packages test checks setups trackers logs. If omit: manual checks are required on code, allowing broken dependencies or compilation errors to slip directly into production servers.",
    whyItMatters: "Automates pull-request audits, ensuring no broken code gets merged into staging environments.",
    example1: `// EXAMPLE 1: GitHub Actions main deploy workflow configuration
# File: .github/workflows/deploy.yml
name: Staging Deployment
on:
  push:
    branches: [ staging ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3
    - name: Setup Node
      uses: actions/setup-node@v3
    - name: Build Assets
      run: |
        npm install
        npm run build`,
    example2: `// EXAMPLE 2: GitHub Actions code quality test run script
# File: .github/workflows/ci.yml
name: Code Integrity CI
on: [pull_request]
jobs:
  run-linter:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - run: npm install
    - run: npm run lint`
  },
  {
    id: 28,
    track: "Track 8: Launch & DevOps",
    category: "Architecture",
    dependency: "Continuous Integration Pipelines",
    title: "End-to-End Enterprise Architecture",
    desc: "Reviewing the overall execution architecture: User actions -> Event handlers -> Services API -> Security checks -> Server persistence.",
    telugu: "Client action state flow network API services interceptors gates DB logs persistence architectures. Telemetry diagnostics mapping updates checkups variables rules coordinates frameworks templates monitors logs. If omit, developer debugs individual UI inputs or DB schemas separately without understanding end-to-end data pipelines flows, causing bugs.",
    whyItMatters: "Provides a full system understanding, empowering you to trace features from the UI to database records.",
    example1: `// EXAMPLE 1: AI chatbot flow architecture description
# 1. User types prompt -> ChatInput trigger event
# 2. Local state transitions loading -> triggers axios service post
# 3. Interceptors verify session -> attach correlation telemetry IDs
# 4. Gateway verifies tenant sandbox permission parameters
# 5. Service resolves payload -> normalizer cleans response fields
# 6. Redux updates store -> selectors dispatch re-render loops
# 7. Media players parse paths -> output audio/video elements`,
    example2: `// EXAMPLE 2: HRMS employee attendance request flow architecture
# 1. User clicks 'Apply sick leave' option
# 2. Local state sets submitting=true, disabling form buttons
# 3. Component runs leaveService.submitRequest(employeeId, formFields)
# 4. Axios interceptor validates session -> auto-attaches active JWT keys
# 5. Backend validates leave balance -> returns success envelope object
# 6. normalizer converts success messages payload to client format
# 7. useState changes feedback alerts -> updates leaves balance metrics
# 8. Form state resets -> closes leave application modal popup
# 9. submitting state resets to false -> re-enabling action controls`
  }
];

const ChatbotIntegrationTeluguGuide = () => {
  const [selectedConcept, setSelectedConcept] = useState(CONCEPTS_DATABASE[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTrackFilter, setActiveTrackFilter] = useState('All');
  const [activeCodeExample, setActiveCodeExample] = useState(1); // 1: Chatbot/AI, 2: HRMS/Portal
  const [copied, setCopied] = useState(false);

  const tracks = [
    'All', 
    'Track 1: Initialization & Folders', 
    'Track 2: API & Interceptors', 
    'Track 3: Routing & Guards', 
    'Track 4: Security & Sessions', 
    'Track 5: Global State Management', 
    'Track 6: Forms & UI Data', 
    'Track 7: Performance & Security', 
    'Track 8: Launch & DevOps'
  ];

  // Handle Search and Track Filter
  const filteredConcepts = CONCEPTS_DATABASE.filter(concept => {
    const matchesSearch = 
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.telugu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.track.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTrack = activeTrackFilter === 'All' || concept.track === activeTrackFilter;

    return matchesSearch && matchesTrack;
  });

  // Auto select first concept from filtered list if active is filtered out
  useEffect(() => {
    if (filteredConcepts.length > 0 && !filteredConcepts.some(c => c.id === selectedConcept.id)) {
      setSelectedConcept(filteredConcepts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrackFilter, searchTerm]);

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getCodeToRender = () => {
    return activeCodeExample === 1 ? selectedConcept.example1 : selectedConcept.example2;
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 42%, #ffffff 100%)',
      minHeight: '100vh',
      fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      
      {/* 🚀 Header Hero */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '20px', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        color: '#fff',
        boxShadow: '0 14px 40px rgba(15, 23, 42, 0.18)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.12)', color: '#dbeafe', fontSize: '12px', fontWeight: 700, mb: 1.5, letterSpacing: '0.02em' }}>
          React Enterprise Masterclass
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          React Enterprise Architecture Guide (28 Modules)
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#cbd5e1', maxWidth: '900px', lineHeight: 1.6 }}>
          Learn standard project creation, environments, API layers, route guards, state engines, security, performance, logging, and deployment. Each module features **dual real-time scenarios (AI Chatbot vs HRMS Portal), dependencies checkpoints, and colorized VS Code style editor code blocks.**
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        
        {/* 📋 Left Sidebar Navigation */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '18px', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
            background: '#ffffff',
            height: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            
            {/* Search Input */}
            <TextField 
              fullWidth
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 28 modules..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMagnifyingGlass style={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Button onClick={() => setSearchTerm('')} size="small" sx={{ minWidth: 'auto', p: 0.5, color: '#94a3b8' }}>
                      <MdCleaningServices size={16} />
                    </Button>
                  </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  bgcolor: '#f9fafb'
                }
              }}
            />

            {/* Track Selector Filter Drops */}
            <Box>
              <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 'bold', display: 'block', mb: 1 }}>
                SELECT TIMELINE TRACK:
              </Typography>
              <select 
                value={activeTrackFilter}
                onChange={(e) => setActiveTrackFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#f9fafb',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#4f46e5',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {tracks.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? 'Show All 8 Tracks' : t}</option>
                ))}
              </select>
            </Box>

            <Divider />

            {/* Scrollable list of 28 Concepts */}
            <List sx={{ 
              overflowY: 'auto', 
              flexGrow: 1,
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '3px' }
            }}>
              {filteredConcepts.length > 0 ? (
                filteredConcepts.map((concept) => (
                  <ListItem key={concept.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton 
                      selected={selectedConcept.id === concept.id}
                      onClick={() => { setSelectedConcept(concept); setActiveCodeExample(1); }}
                      sx={{ 
                        borderRadius: '10px',
                        py: 1,
                        px: 1.5,
                        '&.Mui-selected': {
                          bgcolor: 'rgba(79, 70, 229, 0.08)',
                          color: '#4f46e5',
                          '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.12)' }
                        }
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: selectedConcept.id === concept.id ? 700 : 500 }}>
                            {concept.id}. {concept.title}
                          </Typography>
                        }
                        secondary={
                          <Box display="flex" gap={0.5} flexWrap="wrap" mt={0.5}>
                            <Chip 
                              label={concept.category} 
                              size="small" 
                              sx={{ 
                                height: '18px', 
                                fontSize: '8px', 
                                fontWeight: 'bold', 
                                bgcolor: selectedConcept.id === concept.id ? 'rgba(79, 70, 229, 0.15)' : '#f3f4f6',
                                color: selectedConcept.id === concept.id ? '#4f46e5' : '#6b7280'
                              }} 
                            />
                            <Chip 
                              label={concept.track ? concept.track.split(':')[0] : ''} 
                              size="small" 
                              sx={{ 
                                height: '18px', 
                                fontSize: '8px', 
                                fontWeight: 'bold', 
                                bgcolor: 'rgba(15, 23, 42, 0.05)',
                                color: '#1e293b'
                              }} 
                            />
                          </Box>
                        }
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography variant="body2" color="text.secondary">No concepts found matching filters.</Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        {/* 📖 Right Panel Concept Detail Viewer */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '18px', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
            background: '#ffffff',
            minHeight: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            
            {/* Top Area */}
            <Box>
              {/* Concept Metadata Row */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Chip 
                  label={selectedConcept.track} 
                  sx={{ bgcolor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontWeight: 'bold' }} 
                />
                <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 'bold' }}>
                  MODULE {selectedConcept.id} OF 28
                </Typography>
              </Box>

              {/* Concept Title */}
              <Typography variant="h5" component="h2" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                {selectedConcept.title}
              </Typography>

              {/* Dependency Warning */}
              {selectedConcept.dependency && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, p: 1, bgcolor: '#f0fdf4', borderRadius: '6px', borderLeft: '3px solid #22c55e' }}>
                  <Typography variant="caption" sx={{ color: '#166534', fontWeight: 600 }}>
                    💡 Dependency: {selectedConcept.dependency}
                  </Typography>
                </Box>
              )}

              {/* English Explanation */}
              <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 3 }}>
                {selectedConcept.desc}
              </Typography>

              {/* Telugu (Tanglish) Explanation */}
              <Paper sx={{ 
                p: 2.5, 
                bgcolor: '#eff6ff', 
                borderLeft: '4px solid #3b82f6', 
                borderRadius: '12px',
                mb: 4 
              }}>
                <Typography variant="subtitle2" sx={{ color: '#1d4ed8', fontWeight: 'bold', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBookOpen /> TELUGU (ENGLISH LETTERS):
                </Typography>
                <Typography variant="body2" sx={{ color: '#1e40af', lineHeight: 1.7, fontStyle: 'italic' }}>
                  {selectedConcept.telugu}
                </Typography>
              </Paper>

              {/* DUAL REAL-TIME EXAMPLES SWITCHER */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#475569', fontWeight: 'bold', mb: 1.5 }}>
                  💡 SELECT DUAL REAL-TIME PROJECT SCENARIO:
                </Typography>
                <Box display="flex" gap={2}>
                  <Button 
                    variant={activeCodeExample === 1 ? 'contained' : 'outlined'}
                    onClick={() => setActiveCodeExample(1)}
                    sx={{ 
                      textTransform: 'none', 
                      borderRadius: '8px',
                      bgcolor: activeCodeExample === 1 ? '#0f172a' : 'transparent',
                      color: activeCodeExample === 1 ? '#fff' : '#0f172a',
                      borderColor: '#0f172a',
                      '&:hover': { bgcolor: activeCodeExample === 1 ? '#1e293b' : 'rgba(15,23,42,0.04)' }
                    }}
                  >
                    Scenario 1: AI Chatbot / Assistant
                  </Button>
                  <Button 
                    variant={activeCodeExample === 2 ? 'contained' : 'outlined'}
                    onClick={() => setActiveCodeExample(2)}
                    sx={{ 
                      textTransform: 'none', 
                      borderRadius: '8px',
                      bgcolor: activeCodeExample === 2 ? '#0f172a' : 'transparent',
                      color: activeCodeExample === 2 ? '#fff' : '#0f172a',
                      borderColor: '#0f172a',
                      '&:hover': { bgcolor: activeCodeExample === 2 ? '#1e293b' : 'rgba(15,23,42,0.04)' }
                    }}
                  >
                    Scenario 2: HRMS / Corporate Portal
                  </Button>
                </Box>
              </Box>

              {/* VS-Code styled colorized code block */}
              <Box sx={{ mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" sx={{ color: '#475569', fontWeight: 'bold', fontSize: '11px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FaTerminal /> {activeCodeExample === 1 ? 'chatbotInstance.jsx' : 'hrmsPortalController.js'} — VS Code Editor Style
                  </Typography>
                  <Tooltip title="Copy code" arrow>
                    <Button 
                      size="small" 
                      onClick={() => handleCopyCode(getCodeToRender())}
                      startIcon={copied ? <FaCheck /> : <FaCopy />}
                      sx={{ 
                        color: copied ? '#10b981' : '#4f46e5', 
                        textTransform: 'none',
                        fontSize: '12px',
                        '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.05)' }
                      }}
                    >
                      {copied ? 'Copied' : 'Copy Code'}
                    </Button>
                  </Tooltip>
                </Box>
                
                {/* Visual Editor Shell */}
                <Box sx={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)', 
                  border: '1px solid #1e293b'
                }}>
                  {/* Editor top tab */}
                  <Box display="flex" sx={{ bgcolor: '#181818', px: 2, py: 1, borderBottom: '1px solid #282828' }}>
                    <Box sx={{ bgcolor: '#1e1e1e', px: 2, py: 0.5, borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ec9b0' }} />
                      <Typography sx={{ color: '#cccccc', fontFamily: 'monospace', fontSize: '11px' }}>
                        {activeCodeExample === 1 ? 'ChatWidget.jsx' : 'ExpenseClaims.js'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Rendered Syntax Highlighted Code */}
                  <pre 
                    style={{ 
                      margin: 0,
                      background: '#1e1e1e', 
                      color: '#d4d4d4', 
                      padding: '20px', 
                      overflowX: 'auto', 
                      fontSize: '13px', 
                      lineHeight: 1.6,
                      fontFamily: '"Fira Code", "Courier New", monospace',
                      whiteSpace: 'pre-wrap'
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightCode(getCodeToRender()) }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Bottom Future-Proof / Reusable Tip Panel */}
            <Paper sx={{ 
              p: 2.5, 
              bgcolor: '#f8fafc', 
              borderLeft: '4px solid #94a3b8', 
              borderRadius: '12px',
              mt: 2
            }}>
              <Typography variant="subtitle2" sx={{ color: '#334155', fontWeight: 'bold', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaLightbulb style={{ color: '#eab308' }} /> TECH LEAD ARCHITECTURE ADVICE:
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                {selectedConcept.whyItMatters}
              </Typography>
            </Paper>

          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ChatbotIntegrationTeluguGuide;
