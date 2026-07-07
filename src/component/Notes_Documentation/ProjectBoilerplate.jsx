import React, { useState } from 'react';
import './ProjectBoilerplate.css';
import { 
  MdFolder, 
  MdHttp, 
  MdSecurity, 
  MdVpnKey, 
  MdGridOn, 
  MdContentCopy, 
  MdCheck, 
  MdBuild, 
  MdInfoOutline 
} from 'react-icons/md';

/* ─── Syntax Highlighter Helper ─── */

function highlightCode(code) {
  if (!code) return '';
  
  // Escape HTML characters first
  let tokenized = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];

  // 1. Extract Comments (Double slash and block comments) -> Store in placeholder
  tokenized = tokenized.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${match}</span>` });
    return id;
  });

  // 2. Extract Strings (Template literals, single, double quotes) -> Store in placeholder
  tokenized = tokenized.replace(/(["'`])([\s\S]*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${match}</span>` });
    return id;
  });

  // 3. Highlight Keywords (Blue #569cd6)
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 
    'from', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'switch', 
    'case', 'break', 'new', 'throw', 'class', 'extends', 'super', 'true', 'false', 
    'null', 'undefined', 'delete', 'in', 'of'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: 600;">${kw}</span>`);
  });

  // 4. Highlight Hooks, Stores & Objects (Teal #4ec9b0)
  const builtins = [
    'useState', 'useEffect', 'useContext', 'useRef', 'useNavigate', 'useLocation', 
    'useSelector', 'useDispatch', 'sessionStorage', 'localStorage', 'document', 
    'window', 'JSON', 'axios', 'Cookies', 'apiClient', 'store', 'authReducer', 'loginUser', 'createSlice'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 5. Highlight Function Invocations (Yellow #dcdcaa)
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // 6. Highlight Numbers (Light Green #b5cea8)
  tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');

  // Restore strings and comments in reverse order
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

/* ─── Code Snippets ─── */

const snippets = {
  folderStructure: `src/
├── api/                  # Axios Client Instance and API Interceptors
│   ├── apiClient.js      # Global Axios configuration
│   ├── authApi.js        # Auth-specific endpoints (Login, Logout)
│   └── employeeApi.js    # Employees management endpoints
├── app/                  # Application initialization
│   ├── App.jsx           # Root layout & theme configurations
│   ├── providers.jsx     # Global Context, Redux, & Theme Providers wrapper
│   └── store.js          # Redux Toolkit global store configuration
├── features/             # Feature-driven modules (Self-contained)
│   ├── auth/             # Authentication & Sign-in Feature
│   │   ├── components/   # Feature-specific elements (LoginForm)
│   │   ├── pages/        # LoginPage container
│   │   └── slice.js      # RTK Auth slice (State & Actions)
│   ├── dashboard/        # Dashboard stats and charts
│   └── employee/         # HRMS Employees list and profiles
├── routes/               # Declarative central routing config
│   ├── AppRoutes.jsx     # Route switch mapping (Public, Private)
│   ├── PrivateRoute.jsx  # Route guard for active session check
│   └── PermissionGate.jsx# Elements and screen-level auth check
├── shared/               # Reusable app-wide shared directories
│   ├── components/       # Custom buttons, cards, inputs, tables
│   ├── hooks/            # Custom hooks (useAuth, useFetch)
│   └── utils/            # Helper functions (session, encryption)`,

  axiosClient: `// src/api/apiClient.js
import axios from 'axios';
import { getSessionToken, clearSession } from '../shared/utils/session';

// 1. Create configured Axios Instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// 2. Request Interceptor: Automatic Auth Token Injection
apiClient.interceptors.request.use(
  (config) => {
    const token = getSessionToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // Inject Multi-Tenancy headers if applicable
    const selectedCompany = sessionStorage.getItem('X-SELECTED-COMPANY');
    if (selectedCompany) {
      config.headers['X-SELECTED-COMPANY'] = selectedCompany;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Global Error and 401 Auto-Logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    
    if (status === 401) {
      // Token expired -> Clear credentials and logout
      clearSession();
      window.location.assign('/login');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;`,

  reduxStore: `// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';

// Global Redux Toolkit Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add additional feature slices here
  },
  devTools: import.meta.env.MODE !== 'production',
});

// src/features/auth/slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, logoutRequest } from '../../api/authApi';
import { saveSession, clearSession } from '../../shared/utils/session';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginRequest(credentials);
      saveSession(response.data); // save token to cookies/session
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      clearSession();
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;`,

  authContext: `// src/shared/utils/session.js
import Cookies from 'js-cookie';

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user_session';

export const getSessionToken = () => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const saveSession = (data) => {
  // Storing token securely in Cookie
  Cookies.set(TOKEN_KEY, data.token, { expires: 1, secure: true, sameSite: 'strict' });
  // Storing user metadata in sessionStorage
  sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

export const clearSession = () => {
  Cookies.remove(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem('X-SELECTED-COMPANY');
};

export const getUserDetails = () => {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};`,

  routing: `// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSessionToken } from '../shared/utils/session';

// Route Gate checking token availability
const PrivateRoute = () => {
  const isAuthenticated = !!getSessionToken();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;


// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Code-splitting with Lazy Imports
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const Employees = lazy(() => import('../features/employee/Employees'));

const AppRoutes = () => (
  <Suspense fallback={<div className="loader">Loading screen...</div>}>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Route>
      
      {/* Fallbacks */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;`,

  permissions: `// src/routes/PermissionGate.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserDetails } from '../shared/utils/session';

// Dynamic role-checking function
export const hasPermission = (userRoles, requiredRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (!userRoles) return false;
  return requiredRoles.some(role => userRoles.includes(role));
};

// Component Gate: wraps modules/buttons conditionally
export const PermissionGate = ({ children, requiredRoles, fallback = null }) => {
  const user = getUserDetails();
  const userRoles = user?.roles || []; // e.g., ['HR_ADMIN', 'EMPLOYEE']
  
  const isAllowed = hasPermission(userRoles, requiredRoles);
  
  return isAllowed ? <>{children}</> : fallback;
};

// Route-level Permission Gate
export const ProtectedRoleRoute = ({ children, requiredRoles }) => {
  const user = getUserDetails();
  const userRoles = user?.roles || [];
  
  const isAllowed = hasPermission(userRoles, requiredRoles);
  
  return isAllowed ? children : <Navigate to="/unauthorized" replace />;
};`
};

/* ─── Topics Content Data ─── */

const topics = [
  {
    id: 'folders',
    title: 'Folder Architecture',
    icon: <MdFolder />,
    files: ['src/api', 'src/app', 'src/features', 'src/routes', 'src/shared'],
    why: 'Feature-Driven architecture groups components, states, & services together by business module, preventing nested search bottlenecks as code scale expands.',
    points: [
      'Core separation into app-level, feature-level, and shared global utilities.',
      'Prevents circular dependency bugs by having feature modules self-contained.',
      'Enhances scalability: adding a new page simply requires a new folder inside features/.',
      'Clean import paths using import-alias paths (e.g. @/features/auth/slice).'
    ],
    te: 'Enterprise folder layout scale-up ki set avthundhi. Modules veru-veruga features/ folder lo functions, pages, CSS styles and stores complete self-contained ga store chestham. App routing updates standardizing setups clean output layout direct interfaces rules follow chesi create cheyavachhu.',
    codeKey: 'folderStructure',
    isTree: true
  },
  {
    id: 'axios',
    title: 'Axios Interceptors',
    icon: <MdHttp />,
    files: ['src/api/apiClient.js'],
    why: 'Setting a custom client with request/response interceptors guarantees every outgoing network request is authenticated and any session failure redirects to login instantly.',
    points: [
      'Single instance apiClient configures base URL, timeout parameters, and JSON payloads.',
      'Request interceptor reads cookie keys on flight to inject the Authorization Bearer token.',
      'Auto-injects multi-tenancy tags like X-SELECTED-COMPANY if tenant contexts are set.',
      'Response interceptor catches 401 Unauthorized globally to auto-logout users with zero UI delay.'
    ],
    te: 'Request/Response interceptors customize base endpoints configuration structure parameters. User request API hit chesetappudu headers lo automatic ga token keys append chestaru. Response error 401 validation details code structure redirect standard authentication procedures follow chesthundhi.',
    codeKey: 'axiosClient'
  },
  {
    id: 'redux',
    title: 'Redux Toolkit Store',
    icon: <MdGridOn />,
    files: ['src/app/store.js', 'src/features/auth/slice.js'],
    why: 'RTK configureStore is the industry standard for state management, providing clean slice-based actions, selectors, and out-of-the-box support for async thunks.',
    points: [
      'Store uses configureStore configuration combining multiple slices dynamically.',
      'Features expose their local states via feature-slices using createSlice API.',
      'createAsyncThunk manages API payload dispatch cycles: pending, fulfilled, and rejected statuses.',
      'Components bind dynamically using dispatch hooks and read with select selectors.'
    ],
    te: 'Store layout setup configureStore create slice functions follow chesthundhi. API requests calls status tracking variables createAsyncThunk callbacks logic standard ga actions update triggers, reducer states configuration structure follow chesthadhi.',
    codeKey: 'reduxStore'
  },
  {
    id: 'session',
    title: 'Session Management',
    icon: <MdSecurity />,
    files: ['src/shared/utils/session.js'],
    why: 'Splitting token storage (in httpOnly or secure cookies) from metadata storage (in sessionStorage) optimizes route guards while securing credentials against XSS exploits.',
    points: [
      'Saves the raw JSON Web Token (JWT) key inside secure cookies.',
      'Keeps user metadata like emails, names, profiles in sessionStorage.',
      'Clears sessionStorage and cookies completely inside a single clearSession() cleanup function.',
      'Separating cookies keeps sensitive credential payload protected during API calls.'
    ],
    te: 'Secure session control structure cookies read-writes mechanisms details key attributes manage chesthundi. User authentication verification state data clear function variables setup token logic clean ga maintain avthundi.',
    codeKey: 'authContext'
  },
  {
    id: 'routing',
    title: 'Protected Routes',
    icon: <MdVpnKey />,
    files: ['src/routes/PrivateRoute.jsx', 'src/routes/AppRoutes.jsx'],
    why: 'Declarative routing with component-level code splitting ensures optimal load performance while restricting views from guests using dynamic Router gates.',
    points: [
      'PrivateRoute checks active session cookies; returns sub-routes outlet or redirects to login page.',
      'React.lazy code splits page imports, decreasing bundles initialization speed.',
      'Suspense fallback shows high-performance spinner screens while route chunks download.',
      'Saves navigation history with replace attributes so redirecting does not break back button.'
    ],
    te: 'PrivateRoutes router configurations control checks active session cookies validity indicators. React.lazy load functions, chunk dynamic routing setups, components routes render control details clear framework standard models check parameters implementation structures.',
    codeKey: 'routing'
  },
  {
    id: 'permissions',
    title: 'Role Permissions Gate',
    icon: <MdBuild />,
    files: ['src/routes/PermissionGate.jsx'],
    why: 'Dynamic element gates let developers wrap visual modules (like buttons or tabs) based on arrays of permitted roles, avoiding messy inline conditional ternary operators.',
    points: [
      'PermissionGate component hides or displays nested HTML tags according to user role permissions.',
      'hasPermission matches user role list array elements with required roles parameter elements.',
      'Provides fallback components (e.g. static locks, upgrade buttons) if permission fails.',
      'Route-level wrapper redirects unauthorized attempts to a custom error page.'
    ],
    te: 'Component-level elements gates role checks control access restrictions. buttons, inputs, menu options hide or locks state user parameters required roles check hasPermission configurations dynamic validation indicators details implementations.',
    codeKey: 'permissions'
  }
];

export default function ProjectBoilerplate() {
  const [activeTab, setActiveTab] = useState('folders');
  const [lang, setLang] = useState('en');
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const topic = topics.find(t => t.id === activeTab) || topics[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="BoilerplatePage">
      {/* Header */}
      <div className="BoilerplateHeader">
        <div className="BoilerplateHeaderTitle">
          <div className="BoilerplateBadge">Enterprise Boilerplate</div>
          <h1>Large-Scale Coding Standards</h1>
          <p>Learn how to structure, secure, authorize, and manage global state in enterprise React projects.</p>
        </div>
        <div className="BoilerplateHeaderActions">
          <div className="LanguageSelector">
            <button 
              className={lang === 'en' ? 'active' : ''} 
              onClick={() => setLang('en')}
            >
              English
            </button>
            <button 
              className={lang === 'te' ? 'active' : ''} 
              onClick={() => setLang('te')}
            >
              Telugu
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="BoilerplateLayout">
        
        {/* Sidebar Navigation */}
        <div className="BoilerplateSidebar">
          <div className="SidebarTitle">Standard Modules</div>
          <div className="SidebarButtons">
            {topics.map((t, idx) => (
              <button
                key={t.id}
                className={`SidebarBtn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(t.id);
                  setCopied(false);
                }}
              >
                <div className="SidebarBtnNumber">{idx + 1}</div>
                {t.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="BoilerplateContent">
          
          <div className="ContentCard">
            <div className="CardHeader">
              <div className="CardHeaderTitle">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f766e', marginBottom: '6px' }}>
                  {topic.icon}
                  <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{topic.title}</span>
                </div>
                <h2>Standard Architecture Guide</h2>
                <p>{topic.why}</p>
              </div>
              <div className="CardFiles">
                {topic.files.map(f => (
                  <span key={f} className="FileBadge">{f}</span>
                ))}
              </div>
            </div>

            <div className="GridTwo">
              {/* Documentation */}
              <div className="PointsSection">
                <h3>Latest Implementation Principles</h3>
                <ul className="PointsList">
                  {topic.points.map((pt, index) => (
                    <li key={index}>{pt}</li>
                  ))}
                </ul>

                {/* Tanglish / Telugu Explanation Box */}
                {lang === 'te' && (
                  <div className="TeluguExplanation">
                    <h4>
                      <span role="img" aria-label="lightbulb">💡</span> 
                      Telugu Explanation (Tanglish)
                    </h4>
                    <p>{topic.te}</p>
                  </div>
                )}

                {/* If folder tab: render folder tree instead of architecture image */}
                {topic.isTree ? (
                  <div style={{ marginTop: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px' }}><MdInfoOutline /> Standard Directory Tree</h3>
                    <pre className="TreeStructure">{snippets.folderStructure}</pre>
                  </div>
                ) : (
                  <div className="ArchImageContainer">
                    <div 
                      className="ArchImageWrapper"
                      onClick={() => setLightboxOpen(true)}
                      title="Click to zoom image"
                    >
                      <img 
                        src="/react_enterprise_architecture.png" 
                        alt="Enterprise React Architecture" 
                        className="ArchImage" 
                      />
                      <span className="ArchZoomBadge">🔍 Click to zoom</span>
                    </div>
                    <div className="ArchCaption">
                      Figure: Clean Data & Auth Flow lifecycle within enterprise react app.
                    </div>
                  </div>
                )}
              </div>

              {/* Code Panel */}
              <div className="CodeSection">
                <div className="CodeContainer">
                  <div className="CodeHeader">
                    <span className="CodeFilename">
                      {topic.files[0]}
                    </span>
                    <button 
                      className="CopyBtn"
                      onClick={() => handleCopy(snippets[topic.codeKey])}
                    >
                      {copied ? (
                        <>
                          <MdCheck style={{ color: '#4ade80' }} />
                          <span style={{ color: '#4ade80' }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <MdContentCopy />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="CodeBox">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(snippets[topic.codeKey]) }} />
                  </pre>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Image Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="LightboxModal" 
          onClick={() => setLightboxOpen(false)}
        >
          <div className="LightboxContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="LightboxCloseBtn"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <img 
              src="/react_enterprise_architecture.png" 
              alt="Enterprise React Architecture Expanded" 
              className="LightboxImage" 
            />
          </div>
        </div>
      )}

    </div>
  );
}
