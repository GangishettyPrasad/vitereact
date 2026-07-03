import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const categories = [
    "All", "Authentication", "Routing", "State Management", "API Integration",
    "Roles & Permissions", "Security", "Components", "Hooks", "Forms"
];

const topics = [
    {
        id: 1,
        title: "Login Page - Authentication Flow",
        category: "Authentication",
        explanation: `Login Page అనేది application లోకి user enter అయ్యే first page. ఇది user credentials (email/phone + password) తీసుకుని backend API కి send చేస్తుంది.

ఈ page లో ఉపయోగించిన concepts:
- React Hook Form: Form validation మరియు form state management కోసం useForm() hook use చేస్తారు.
- useState: Login page లో multiple states maintain చేయడానికి (loader, error messages, OTP toggle, password visibility).
- useNavigate: Login success అయిన తర్వాత user ని respective dashboard కి redirect చేయడానికి.
- Axios POST: Backend API "/api/user/login/" కి encrypted credentials send చేయడానికి.
- CryptoJS AES Encryption: Password మరియు email ని encrypt చేసి server కి పంపడానికి. ఇది security కోసం చాలా important.
- ReCAPTCHA: Bot attacks నుండి protect చేయడానికి Google ReCAPTCHA integration.
- sessionStorage & cookies: Login success అయ్యాక user info, roles, token ని store చేయడానికి.

Login Flow:
1. User email/phone మరియు password enter చేస్తారు
2. React Hook Form validation check చేస్తుంది
3. CryptoJS తో credentials encrypt అవుతాయి
4. Axios POST request "/api/user/login/" కి send అవుతుంది
5. Success అయితే - token, user info, roles sessionStorage లో store అవుతాయి
6. Cookie లో userinfoCookie set అవుతుంది
7. User role based గా respective dashboard కి redirect అవుతారు (ADMIN -> admin-dashboard, EMPLOYEE -> user-dashboard)`,
        code: `// LoginForm.js - Key Code

// 1. React Hook Form setup
const {
    register,       // Input fields ని form తో connect చేస్తుంది
    handleSubmit,   // Form submit handle చేస్తుంది
    formState: { errors },  // Validation errors
} = useForm({});

// 2. States
const [loader, setLoader] = useState(true);
const [errorMes, setErrorMes] = useState();
const navigate = useNavigate();

// 3. AES Encryption - Credentials encrypt చేయడం
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

// 4. Login Submit Function
const onSubmit = async (data) => {
    setLoader(false);
    const email = data.email.trim();
    const password = data.password.trim();

    // Email/Phone validation
    let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\\.+[A-Z]{2,}$/i;

    // Encrypt credentials before sending
    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);
    req = { email: encryptedEmail, password: encryptedPassword };

    // API Call
    await axios.post("/api/user/login/", req, {
        withCredentials: true
    }).then((result) => {
        // User info object create చేయడం
        var UserInfoToSesson = {
            data: result.data.data,
            roles: result.data.roles,
            roleID: result.data.rolesId[0],
            token: result.data.token,
            subdomain: result.data.subDomain,
        };

        // SessionStorage లో store చేయడం
        sessionStorage.setItem("user-info", JSON.stringify(UserInfoToSesson));

        // Cookie లో store చేయడం
        document.cookie = \\\`userinfoCookie=\\\${JSON.stringify(UserInfoToSesson)}\\\`;

        // Roles store చేయడం
        sessionStorage.setItem("RolesFromDb", JSON.stringify(result.data.existedRolesData));
        localStorage.setItem("RolesFromDb", JSON.stringify(result.data.existedRolesData));

        // Role based navigation
        if (result.data.roles[0] === "ADMIN") {
            navigate("/admin-dashboard");
        } else if (result.data.roles[0] === "EMPLOYEE") {
            navigate("/user-dashboard");
        }
    });
};

// 5. JSX - Form rendering
<form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email", { required: true })} />
    <input type="password" {...register("password", { required: true })} />
    <button type="submit">Login</button>
</form>`
    },
    {
        id: 2,
        title: "Logout - Session Clear Flow",
        category: "Authentication",
        explanation: `Logout function user session ని completely clear చేస్తుంది. ఇది TopHeader.js component లో define చేయబడింది.

Logout లో జరిగే steps:
1. sessionStorage నుండి user-info, RolesFromDb, personalImage, persnonalName remove చేస్తుంది
2. localStorage నుండి RolesFromDb remove చేస్తుంది
3. Cookies clear చేస్తుంది - expires date ని past date కి set చేయడం ద్వారా
4. Axios authorization header remove చేస్తుంది
5. Page reload చేసి login page కి redirect చేస్తుంది

sessionLogout.js లో కూడా SessionLogIn function ఉంది - ఇది unauthorized access detect అయినప్పుడు automatic గా logout చేస్తుంది.

Important Concepts:
- Cookie Expiry: Cookie ని delete చేయడానికి expires date ని past date (Thu, 01 Jan 1970) కి set చేస్తారు
- sessionStorage vs localStorage: sessionStorage tab close చేస్తే clear అవుతుంది, localStorage manual గా clear చేయాలి
- window.location.reload(): Page ని completely refresh చేస్తుంది, ఇది state ని reset చేస్తుంది`,
        code: `// TopHeader.js - Logout Function (Line 231)
const Logout = () => {
    // 1. SessionStorage clear చేయడం
    sessionStorage.removeItem("user-info");
    sessionStorage.removeItem("RolesFromDb");
    sessionStorage.removeItem("personalImage");
    sessionStorage.removeItem("persnonalName");

    // 2. LocalStorage clear చేయడం
    localStorage.removeItem("RolesFromDb");

    // 3. Cookies clear చేయడం
    // expires ని past date కి set చేస్తే cookie automatically delete అవుతుంది
    document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "userinfoRoleInfo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "personalImage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "persnonalName=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // 4. Page reload & redirect
    window.location.reload();
    navigate("/");
};

// sessionLogout.js - SessionLogIn Function
// ఇది 401 Unauthorized error వచ్చినప్పుడు auto logout కోసం
export function SessionLogIn(navigate) {
    sessionStorage.removeItem("user-info");
    sessionStorage.removeItem("RolesFromDb");
    localStorage.removeItem("RolesFromDb");
    document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
}`
    },
    {
        id: 3,
        title: "Routing - React Router v6 Setup",
        category: "Routing",
        explanation: `ఈ project React Router DOM v6 use చేస్తుంది. App.js లో అన్ని routes define చేయబడ్డాయి.

Key Routing Concepts:
1. BrowserRouter: Application ని Router తో wrap చేస్తుంది, URL based navigation enable చేస్తుంది
2. Routes & Route: ప్రతి URL path కి ఒక component map చేస్తుంది
3. PrivateRoute: Authenticated users మాత్రమే access చేయగల routes కి wrapper component
4. Lazy Loading: React.lazy() మరియు Suspense use చేసి components ని demand మీద load చేస్తుంది (performance improvement)
5. useNavigate: Programmatic navigation కోసం hook
6. useLocation: Current URL path get చేయడానికి hook

Route Protection Flow:
- User URL enter చేస్తారు -> PrivateRoute check చేస్తుంది
- Cookie లో userinfoCookie ఉందా? -> లేకపోతే Login page కి redirect
- ఉంటే -> RolesFromDb check చేసి permission ఉంటే component render, లేకపోతే /notfound కి redirect

Lazy Loading ఎందుకు?:
- Application లో 100+ routes ఉన్నాయి. అన్ని components ని ముందుగా load చేస్తే initial load time చాలా ఎక్కువ అవుతుంది
- lazy() తో component అవసరమైనప్పుడు మాత్రమే download అవుతుంది
- Suspense component loading time లో fallback UI చూపిస్తుంది`,
        code: `// App.js - Routing Setup

// 1. Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';

// 2. Lazy Loading - Component అవసరమైనప్పుడు మాత్రమే load అవుతుంది
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard.js"));
const EmployeeDirectory = lazy(() => import("./Components/Employee/Directory.js"));
const AddEmployee = lazy(() => import("./Components/Employee/AddEmployee.js"));

// 3. Route Definitions
export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Route - Login */}
                    <Route path='/' element={<LoginForm />} />

                    {/* Protected Routes - PrivateRoute wrapper */}
                    <Route path='/admin-dashboard'
                        element={<PrivateRoute><Dashboard /></PrivateRoute>} />

                    <Route path='/employee-management'
                        element={<PrivateRoute><EmployeeDirectory /></PrivateRoute>} />

                    <Route path='/moreSection'
                        element={<PrivateRoute><MoreSection /></PrivateRoute>} />

                    {/* Payroll Routes - Separate wrapper */}
                    <Route path='/payroll-dashboard'
                        element={<PrivateRoutePayroll><PayrollDashboard /></PrivateRoutePayroll>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

// 4. useNavigate - Programmatic navigation
const navigate = useNavigate();
navigate("/admin-dashboard");  // Code లో redirect చేయడం

// 5. useLocation - Current path get చేయడం
const location = useLocation();
console.log(location.pathname);  // "/admin-dashboard"`
    },
    {
        id: 4,
        title: "PrivateRoute - Route Protection",
        category: "Routing",
        explanation: `PrivateRoute అనేది Higher Order Component (HOC) pattern - ఇది child components ని wrap చేసి authentication మరియు authorization check చేస్తుంది.

PrivateRoute లో జరిగే process:
1. Cookie Check: userinfoCookie ఉందా check చేస్తుంది
2. Token Setup: Cookie ఉంటే JWT token ని extract చేసి Axios default header లో set చేస్తుంది
3. Roles Reload: reloadRoles() function call చేసి latest permissions API నుండి fetch చేస్తుంది
4. Path Permission Check: Current URL path కి user కి permission ఉందా check చేస్తుంది
5. Not Found Redirect: Permission లేకపోతే /notfound page కి redirect చేస్తుంది
6. TopHeader Render: Authenticated అయితే TopHeader (navigation bar) + child component render చేస్తుంది

PrivateRoute లో important patterns:
- getCookie function: document.cookie string ని parse చేసి specific cookie value extract చేస్తుంది
- useEffect with [children] dependency: Route change అయినప్పుడు roles reload అవుతాయి
- Conditional rendering: Cookie ఉంటే content, లేకపోతే Login page కి Navigate`,
        code: `// Privaterote.js - Private Route Component

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const navigates = useNavigate();
    const multitenant = useSelector((state) => state.data);

    // 1. Cookie నుండి user info extract చేయడం
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) {
                // Cookie value ని sessionStorage లో కూడా store చేస్తుంది
                sessionStorage.setItem("user-info", c.substring(name.length, c.length));
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // 2. Token setup - Axios header లో Bearer token set చేయడం
    let token;
    if (getCookie("userinfoCookie")) {
        var tempobject = JSON.parse(getCookie("userinfoCookie"));
        token = tempobject.token.access;
        axios.defaults.headers.common = {
            'Authorization': \\\`Bearer \\\${token}\\\`
        };
    }

    // 3. Route change అయినప్పుడు roles reload చేయడం
    useEffect(() => {
        if (getCookie("userinfoCookie")) {
            reloadRoles(navigates, multitenant);
        } else {
            // Cookie లేకపోతే clear everything
            sessionStorage.removeItem("user-info");
            sessionStorage.removeItem("RolesFromDb");
        }
    }, [children]);

    // 4. Path based permission checking
    useEffect(() => {
        if (RolesFromDb) {
            if (location.pathname === "/employee-management") {
                if (RolesFromDb?.modules?.EmployeeManagement?.view === false) {
                    navigates("/notfound");
                }
            }
            if (location.pathname === "/admin-dashboard") {
                if (RolesFromDb?.modules?.Dashboard?.submodules?.AdminDashboard?.view === false) {
                    navigates("/notfound");
                }
            }
            // ... ఇలా ప్రతి route కి permission check ఉంటుంది
        }
    }, []);

    // 5. Conditional Rendering
    return (
        <div id="wrapper">
            {!getCookie("userinfoCookie") ? (
                <Navigate to="/" />  {/* Login page కి redirect */}
            ) : (
                <>
                    <TopHeader />   {/* Navigation bar */}
                    {children}      {/* Actual page content */}
                </>
            )}
        </div>
    );
};`
    },
    {
        id: 5,
        title: "Roles & Permissions - Access Control",
        category: "Roles & Permissions",
        explanation: `ఈ application లో Role Based Access Control (RBAC) implement చేయబడింది. ప్రతి user కి ఒక role ఉంటుంది (ADMIN, MANAGER, EMPLOYEE, CEO, etc.) మరియు ప్రతి role కి specific permissions ఉంటాయి.

Permissions Structure:
- Modules: Application లో ప్రతి major feature ఒక module (Dashboard, EmployeeManagement, LeaveModule, etc.)
- Submodules: ప్రతి module లో specific features (AdminDashboard, AddEmployee, etc.)
- Actions: ప్రతి module/submodule కి 4 actions (add, view, change, delete) - true/false

Permissions Flow:
1. Login success అయ్యాక API response లో existedRolesData వస్తుంది
2. ఇది sessionStorage లో "RolesFromDb" key తో store అవుతుంది
3. PrivateRoute component లో route access check చేస్తుంది
4. Individual components లో UI elements show/hide చేస్తుంది
5. reloadRoles() function ప్రతి route change లో latest permissions fetch చేస్తుంది

API Endpoint: /api/roles/permissions/?role_id={roleID}&company_id={companyId}

MoreSection లో Role Based Filtering:
- services array లో ప్రతి service కి moduleKey ఉంటుంది
- allowedServices = services.filter() - RolesFromDb check చేసి view:true ఉన్నవి మాత్రమే show చేస్తుంది
- CCTV Registration ADMIN role కి మాత్రమే visible`,
        code: `// RolesFromDb Structure (sessionStorage లో store అవుతుంది)
{
    "modules": {
        "Dashboard": {
            "view": true,
            "submodules": {
                "AdminDashboard": { "view": true },
                "ManagerDashboard": { "view": false },
                "UserDashboard": { "view": true }
            }
        },
        "EmployeeManagement": {
            "add": true,
            "view": true,
            "change": true,
            "delete": false,
            "submodules": {
                "AddEmployee": { "view": true },
                "BulkEdit": { "view": false },
                "Mail": { "view": true }
            }
        }
    }
}

// Permission Check - Component లో
const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));

// Route level permission check (Privaterote.js)
if (location.pathname === "/employee-management") {
    if (RolesFromDb?.modules?.EmployeeManagement?.view === false) {
        navigates("/notfound"); // Permission లేకపోతే redirect
    }
}

// UI level permission check - Button show/hide
{RolesFromDb?.modules?.EmployeeManagement?.submodules?.AddEmployee?.view && (
    <button onClick={() => navigate("/add-employee")}>Add Employee</button>
)}

// MoreSection - Role based service filtering
const services = [
    { name: "Mobile Tracking", moduleKey: "MobileTracking" },
    { name: "Calendar", moduleKey: "Calendar" },
];

let allowedServices = services.filter(service => {
    const key = service.moduleKey;
    // CCTV Registration - ADMIN only
    if (service.name === "CCTV Registration") {
        return userInfos?.roles?.[0] === "ADMIN";
    }
    // Other modules - permission based
    return RolesFromDb?.modules?.[key]?.view === true;
});

// reloadRoles - Latest permissions fetch చేయడం
export async function reloadRoles(navigate, multitenant) {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    let headers = {
        "X-CURRENT-COMPANY": userinfo.subdomain,
        "X-SELECTED-COMPANY": userinfo.subdomain,
    };
    const response = await axios.get(
        \\\`/api/roles/permissions/?role_id=\\\${userinfo.roleID}&company_id=\\\${userinfo.data.id}\\\`,
        { headers }
    );
    sessionStorage.setItem("RolesFromDb", JSON.stringify(response.data));
}`
    },
    {
        id: 6,
        title: "Axios - API Integration",
        category: "API Integration",
        explanation: `Axios అనేది HTTP client library - ఇది backend API calls చేయడానికి use చేస్తారు. ఈ project లో Axios ని globally configure చేసి use చేస్తారు.

Global Configuration (index.js లో):
- baseURL: Application host based గా dynamic గా set అవుతుంది
- Default headers: Content-Type, Accept headers set చేస్తారు
- Authorization: Login అయ్యాక Bearer token header లో set అవుతుంది

Custom Headers (ApiHeaders.js):
- X-CURRENT-COMPANY: Current user subdomain
- X-SELECTED-COMPANY: Multi-tenant company subdomain
- x-system-ip-address: User system IP address

API Call Patterns:
1. GET: Data fetch చేయడం (axios.get)
2. POST: New data create చేయడం (axios.post)
3. PUT: Existing data update చేయడం (axios.put)
4. DELETE: Data delete చేయడం (axios.delete)

Error Handling:
- .then().catch() pattern use చేస్తారు
- 401 status వస్తే SessionLogIn call చేసి auto logout చేస్తుంది
- try/catch blocks async/await తో use చేస్తారు`,
        code: `// index.js - Global Axios Configuration
import axios from "axios";

// Base URL setup - Host based dynamic configuration
const host = window.location.host;
if (host.includes("bharatpayroll.com") || host.includes("indianhr.in")) {
    axios.defaults.baseURL = \\\`\\\${window.location.origin}/qxbox/\\\`;
} else {
    axios.defaults.baseURL = 'https://pssqa.bharatpayroll.com/qxbox/';
}

// Default Headers
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

// Authorization Header (PrivateRoute లో set అవుతుంది)
axios.defaults.headers.common = {
    'Authorization': \\\`Bearer \\\${token}\\\`
};

// ApiHeaders.js - Custom Headers
const ApiHeaders = (multitenant) => {
    const userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    return {
        "X-CURRENT-COMPANY": userinfo.subdomain,
        "X-SELECTED-COMPANY": multitenant?.data?.subdomain || userinfo.subdomain,
        "x-system-ip-address": sessionStorage.getItem("SystemIpAddress") || ""
    };
};

// API Call Examples

// GET Request - Data fetch చేయడం
const getEmployees = async () => {
    const headers = ApiHeaders(multitenant);
    try {
        const result = await axios.get("/api/directory/employees/", { headers });
        setEmployees(result.data);
    } catch (err) {
        if (err.response?.status === 401) {
            SessionLogIn(navigate); // Auto logout
        }
    }
};

// POST Request - Data create చేయడం
const createEmployee = async (data) => {
    const headers = ApiHeaders(multitenant);
    await axios.post("/api/directory/add-employee/", data, { headers })
        .then((result) => {
            alert("Employee added successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

// PUT Request - Data update చేయడం
await axios.put(\\\`/api/directory/update/\\\${empId}/\\\`, updatedData, { headers });

// DELETE Request - Data delete చేయడం
await axios.delete(\\\`/api/directory/delete/\\\${empId}/\\\`, { headers });`
    },
    {
        id: 7,
        title: "State Management - Redux, Zustand & Context",
        category: "State Management",
        explanation: `ఈ project లో 3 state management solutions use చేస్తారు:

1. Redux (Global State):
   - Multi-tenant company selection state manage చేయడానికి use చేస్తారు
   - createStore, useSelector, useDispatch use చేస్తారు
   - localStorage తో persist చేస్తారు (page refresh అయినా state maintain అవుతుంది)

2. Zustand (Lightweight State):
   - useMultitenantStore: Company details మరియు user info store చేయడానికి
   - useCompanyheaderStore: API trigger state manage చేయడానికి
   - Redux కంటే simple గా ఉంటుంది - boilerplate code తక్కువ

3. React Context API:
   - ThemeContext/GlobalProvider: Company name, theme settings
   - AuthContext: Login password temporary storage
   - VideoModalContext: Tutorial video modal state
   - QuickAccessContext: Quick access services tracking

ఎప్పుడు ఏది use చేయాలి?
- Redux: Complex, persistent global state కోసం
- Zustand: Simple shared state, తక్కువ boilerplate కావాలంటే
- Context: Component tree లో data pass చేయడానికి, prop drilling avoid చేయడానికి`,
        code: `// ===== 1. REDUX =====

// Redux/store.js
import { createStore } from 'redux';

// Reducer
const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELECTED_COMPANYS':
            return { ...state, data: action.payload };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

// localStorage తో persist చేయడం
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

const store = createStore(rootReducer, persistedState);

// State change అయినప్పుడు localStorage update చేయడం
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// Component లో use చేయడం
import { useSelector, useDispatch } from 'react-redux';
const multitenant = useSelector((state) => state.data);  // State read
const dispatch = useDispatch();
dispatch(SELECTED_COMPANY(companyData));  // State update

// ===== 2. ZUSTAND =====

// useMultitenantStore.js
import { create } from 'zustand';

const useMultitenantStore = create((set) => ({
    companyDetails: null,
    userInfo: null,
    setCompanyDetails: (details) => set({ companyDetails: details }),
    setUserInfo: (userInfo) => set({ userInfo: userInfo }),
}));

// Component లో use చేయడం
const { companyDetails, setCompanyDetails } = useMultitenantStore();
const setUserInfo = useMultitenantStore((state) => state.setUserInfo);

// ===== 3. CONTEXT API =====

// ThemeContext.js - Context create చేయడం
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [companyName, setCompanyName] = useState("");
    return (
        <GlobalContext.Provider value={{ companyName, setCompanyName }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Component లో use చేయడం
const { companyName } = useContext(GlobalContext);`
    },
    {
        id: 8,
        title: "Storage & Encryption - Data Security",
        category: "Security",
        explanation: `ఈ project లో sessionStorage మరియు localStorage ని override చేసి data automatically encrypt/decrypt అవుతుంది. ఇది storageUtils.js file లో implement చేయబడింది.

CryptoJS AES Encryption:
- AES (Advanced Encryption Standard) - industry standard encryption algorithm
- Secret Key: 256-bit hex string use చేస్తారు
- Encrypt: Data ని unreadable format లోకి convert చేస్తుంది
- Decrypt: Encrypted data ని original format లోకి convert చేస్తుంది

Override Pattern:
- Original sessionStorage.setItem ని save చేసి, new function తో replace చేస్తారు
- setItem call చేసినప్పుడు data automatically encrypt అయి store అవుతుంది
- getItem call చేసినప్పుడు data automatically decrypt అయి return అవుతుంది
- Developer tools లో చూస్తే encrypted data మాత్రమే కనిపిస్తుంది

Cookie Encryption:
- userinfoCookie ని కూడా AES encrypt చేస్తారు
- Object.defineProperty తో document.cookie getter/setter override చేస్తారు
- Cookie set చేసేటప్పుడు encrypt, read చేసేటప్పుడు decrypt అవుతుంది

ఇది ఎందుకు important?
- Browser developer tools లో user data plain text లో కనిపించకుండా protect చేస్తుంది
- XSS attacks ద్వారా data steal చేయడం కష్టం అవుతుంది`,
        code: `// storageUtils.js - Encryption Setup

import CryptoJS from "crypto-js";

// Secret Key - 256 bit
const SECRET_KEY = "3afb675c57a210ee0e06f84ba716d81c244ac8d7554846aa07f0686ec46b0ce0";

// Encrypt Function
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt Function
export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

// SessionStorage Override - setItem
const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function (key, value) {
    const encryptedValue = encryptData(value);  // Auto encrypt
    originalSetItem.call(sessionStorage, key, encryptedValue);
};

// SessionStorage Override - getItem
const originalGetItem = sessionStorage.getItem;
sessionStorage.getItem = function (key) {
    const encryptedData = originalGetItem.call(sessionStorage, key);
    return encryptedData ? decryptData(encryptedData) : null;  // Auto decrypt
};

// Cookie Override - userinfoCookie
Object.defineProperty(document, 'cookie', {
    get: function () {
        // Cookie read చేసేటప్పుడు userinfoCookie decrypt చేయడం
        return cookiePairs.map(pair => {
            const [name, val] = pair.split('=');
            if (name === 'userinfoCookie') {
                const bytes = CryptoJS.AES.decrypt(decodeURIComponent(val), SECRET_KEY);
                return \\\`\\\${name}=\\\${encodeURIComponent(bytes.toString(CryptoJS.enc.Utf8))}\\\`;
            }
            return pair;
        }).join('; ');
    },
    set: function (val) {
        // Cookie set చేసేటప్పుడు userinfoCookie encrypt చేయడం
        if (val.startsWith('userinfoCookie=')) {
            const [name, rawValue] = val.split('=');
            const encrypted = CryptoJS.AES.encrypt(rawValue, SECRET_KEY).toString();
            originalCookieDescriptor.set.call(document,
                \\\`\\\${name}=\\\${encodeURIComponent(encrypted)}\\\`);
        }
    }
});`
    },
    {
        id: 9,
        title: "React Hooks - useState, useEffect, useContext",
        category: "Hooks",
        explanation: `React Hooks అనేవి functional components లో state మరియు lifecycle features use చేయడానికి allow చేస్తాయి.

ఈ project లో use అయిన hooks:

1. useState - Component local state manage చేయడానికి
   - const [value, setValue] = useState(initialValue)
   - setValue(newValue) call చేస్తే component re-render అవుతుంది
   - ఈ project లో loader states, error messages, form data, modal visibility కోసం use చేస్తారు

2. useEffect - Side effects handle చేయడానికి (API calls, subscriptions, DOM updates)
   - useEffect(() => { }, []) - Component mount అయినప్పుడు ఒకసారి run అవుతుంది
   - useEffect(() => { }, [dependency]) - dependency change అయినప్పుడు run అవుతుంది
   - PrivateRoute లో roles reload, dashboard లో data fetch కోసం use చేస్తారు

3. useContext - Context API నుండి values access చేయడానికి
   - Provider component లో values provide చేస్తారు
   - Child components లో useContext(ContextName) తో access చేస్తారు

4. useNavigate - React Router v6 navigation hook
5. useLocation - Current URL info get చేయడానికి
6. useSelector / useDispatch - Redux state access & update
7. useRef - DOM elements ని directly reference చేయడానికి (ReCAPTCHA ref)
8. useForm (React Hook Form) - Form state management custom hook`,
        code: `// ===== 1. useState =====
// Component లో multiple states
const [loader, setLoader] = useState(true);       // Loading state
const [errorMes, setErrorMes] = useState("");      // Error message
const [data, setData] = useState([]);              // API data
const [showModal, setShowModal] = useState(false); // Modal visibility

// State update
setLoader(false);  // Re-render trigger అవుతుంది

// ===== 2. useEffect =====
// Component mount - API call (Empty dependency array [])
useEffect(() => {
    fetchEmployees();  // ఒకసారి మాత్రమే run అవుతుంది
}, []);

// Dependency change - Re-run
useEffect(() => {
    if (RolesFromDb) {
        // Permission check - RolesFromDb change అయినప్పుడు run అవుతుంది
        checkPermissions();
    }
}, [RolesFromDb]);

// Cleanup - Component unmount అయినప్పుడు
useEffect(() => {
    const intervalId = setInterval(() => {
        window.location.reload();
    }, 43200000); // 12 hours

    return () => clearInterval(intervalId); // Cleanup function
}, []);

// ===== 3. useContext =====
// Context create
const VideoModalContext = createContext();

// Provider component
<VideoModalContext.Provider value={{ videoTitle, openVideoModal }}>
    {children}
</VideoModalContext.Provider>

// Consumer component - useContext use చేయడం
const { videoTitle, openVideoModal } = useContext(VideoModalContext);

// ===== 4. useNavigate =====
const navigate = useNavigate();
navigate("/admin-dashboard");     // Navigate to path
navigate(-1);                     // Go back

// ===== 5. useSelector & useDispatch (Redux) =====
const multitenant = useSelector((state) => state.data);  // Read Redux state
const dispatch = useDispatch();
dispatch({ type: 'SELECTED_COMPANYS', payload: data });  // Update Redux state`
    },
    {
        id: 10,
        title: "Lazy Loading & Code Splitting",
        category: "Components",
        explanation: `Lazy Loading అనేది performance optimization technique - components ని అవసరమైనప్పుడు మాత్రమే load చేస్తుంది.

ఈ project లో 100+ pages ఉన్నాయి. అన్నింటిని initial load లో download చేస్తే:
- Bundle size చాలా పెద్దది అవుతుంది (10MB+)
- First page load time ఎక్కువ అవుతుంది
- User experience poor అవుతుంది

Solution - React.lazy() + Suspense:
- React.lazy(() => import("./Component")) - Dynamic import
- Webpack automatically separate bundles create చేస్తుంది (code splitting)
- User ఆ page visit చేసినప్పుడు మాత్రమే respective bundle download అవుతుంది
- Suspense component loading time లో fallback UI show చేస్తుంది

ఈ project లో:
- Dashboard, Employee Management, Leave, Attendance - అన్ని lazy loaded
- Direct imports: TopHeader, LoginForm (frequently used, small size)
- Lazy imports: All other page components

Performance Impact:
- Initial bundle: ~2MB (Login + common libraries)
- Each lazy chunk: ~50-200KB
- First page load: 2-3 seconds (without lazy: 8-10 seconds)`,
        code: `// App.js - Lazy Loading Implementation

import { Suspense, lazy } from 'react';

// Lazy Loading - Component file path specify చేస్తే Webpack separate bundle create చేస్తుంది
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard.js"));
const EmployeeDirectory = lazy(() => import("./Components/Employee/Directory.js"));
const AddEmployee = lazy(() => import("./Components/Employee/AddEmployee.js"));
const LeaveManagement = lazy(() => import("./Components/LMangement/LeaveRulesView.js"));
const AttendanceRules = lazy(() => import("./Components/KredilyAttendance/AttendanceRules.js"));
const TaskManagementView = lazy(() => import("./Components/TaskManagment/TaskManagementView.js"));
const PerformanceManagementView = lazy(() => import("./Components/PerformanceManagement/PerformanceManagementView.js"));

// Suspense - Loading fallback
<Suspense fallback={
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
}>
    <Routes>
        <Route path='/admin-dashboard' element={
            <PrivateRoute>
                <Dashboard />  {/* User visit చేసినప్పుడు మాత్రమే download అవుతుంది */}
            </PrivateRoute>
        } />
    </Routes>
</Suspense>

// Direct Import vs Lazy Import
// Direct (always loaded):
import LoginForm from "./Components/Login/LoginForm.js";
import TopHeader from "./Components/Dashboard/TopHeader.js";

// Lazy (loaded on demand):
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard.js"));`
    },
    {
        id: 11,
        title: "Multi-Tenant Architecture",
        category: "API Integration",
        explanation: `Multi-tenant architecture అంటే ఒకే application ని multiple companies use చేయగలరు. ఒక user ఒకటి కంటే ఎక్కువ companies కి belong అవ్వవచ్చు.

ఈ project లో multi-tenant ఎలా work చేస్తుంది:
1. Login అయ్యాక user కి multitenantKey మరియు companyId వస్తాయి
2. TopHeader లో company dropdown ఉంటుంది - user company switch చేయవచ్చు
3. Company switch చేసినప్పుడు Redux store update అవుతుంది
4. API calls లో X-CURRENT-COMPANY మరియు X-SELECTED-COMPANY headers send అవుతాయి

API Headers:
- X-CURRENT-COMPANY: User original company subdomain
- X-SELECTED-COMPANY: Currently selected company subdomain (switch చేసిన తర్వాత)
- Backend ఈ headers based గా data filter చేస్తుంది

Company List API: /api/user/list-multi-tenant-companies/?mul_key={key}&cmp_id={id}

Redux Store లో company selection:
- SELECTED_COMPANY action dispatch చేస్తారు
- State లో selected company details store అవుతుంది
- localStorage లో persist అవుతుంది`,
        code: `// Multi-Tenant Flow

// 1. User Info లో multi-tenant data (Login response)
const UserInfoToSesson = {
    data: {
        multitenantKey: "abc123",  // Multi-tenant identifier
        companyId: 1,              // Primary company ID
        subdomain: "company1",     // Company subdomain
    },
    subdomain: "company1",
};

// 2. Company List Fetch (TopHeader.js)
const getListOfCompanies = async () => {
    const userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    const result = await axios.get(
        \\\`/api/user/list-multi-tenant-companies/?mul_key=\\\${userinfo.data.multitenantKey}&cmp_id=\\\${userinfo.data.companyId}\\\`
    );
    setlistofcompany(result.data);
};

// 3. Company Switch - Redux update
import { useDispatch } from 'react-redux';
const dispatch = useDispatch();

const handleCompanySwitch = (company) => {
    dispatch(SELECTED_COMPANY(company));  // Redux store update
};

// 4. API Headers - Multi-tenant headers
const ApiHeaders = (multitenant) => {
    const userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    return {
        "X-CURRENT-COMPANY": userinfo.subdomain,
        // Selected company different అయితే ఆ subdomain use చేయడం
        "X-SELECTED-COMPANY": multitenant?.data?.subdomain || userinfo.subdomain,
        "x-system-ip-address": sessionStorage.getItem("SystemIpAddress") || ""
    };
};

// 5. Component లో use చేయడం
const multitenant = useSelector((state) => state.data);  // Redux state read
const headers = ApiHeaders(multitenant);
await axios.get("/api/employees/", { headers });  // Headers తో API call`
    },
    {
        id: 12,
        title: "React Hook Form - Form Handling",
        category: "Forms",
        explanation: `React Hook Form అనేది form state management library. ఇది traditional controlled components కంటే better performance ఇస్తుంది.

ఎందుకు React Hook Form?
- Controlled components లో ప్రతి keystroke కి component re-render అవుతుంది
- React Hook Form uncontrolled components use చేస్తుంది - re-renders తక్కువ
- Built-in validation support
- Easy error handling

ఈ project లో usage:
- Login form: Email/Password validation
- Employee forms: Multiple fields validation
- Settings forms: Configuration forms

Key Functions:
- register: Input field ని form తో connect చేస్తుంది
- handleSubmit: Form submit wrapper - validation pass అయితే callback call చేస్తుంది
- formState.errors: Validation errors object
- trigger: Manual validation trigger చేయడం
- setValue: Programmatically value set చేయడం
- getValues: Current form values get చేయడం
- setError: Manual error set చేయడం
- watch: Field value changes observe చేయడం
- reset: Form values reset చేయడం`,
        code: `// React Hook Form - Usage Examples

import { useForm } from "react-hook-form";

function LoginForm() {
    // 1. useForm hook initialize
    const {
        register,       // Input register చేయడం
        handleSubmit,   // Submit handler
        formState: { errors },  // Validation errors
        trigger,        // Manual validation
        setValue,        // Set value programmatically
        getValues,      // Get current values
        setError,       // Set custom error
        reset,          // Reset form
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // 2. Submit Handler
    const onSubmit = async (data) => {
        console.log(data.email, data.password);
        // API call with form data
    };

    // 3. JSX with validation
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email field with validation */}
            <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                })}
                placeholder="Enter email"
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}

            {/* Password field */}
            <input
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Minimum 6 characters"
                    }
                })}
            />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}

            <button type="submit">Login</button>
        </form>
    );
}

// 4. Advanced - Dynamic validation
const { trigger } = useForm();
// Specific field validate చేయడం
await trigger("email");  // Email field మాత్రమే validate
await trigger();         // All fields validate

// 5. setValue - Programmatically value set
setValue("email", "user@example.com");`
    },
    {
        id: 13,
        title: "Component Architecture - Project Structure",
        category: "Components",
        explanation: `ఈ project Component-Based Architecture follow చేస్తుంది. ప్రతి feature ఒక separate folder లో organize చేయబడింది.

Project Structure:
src/
├── Components/           - Main UI components
│   ├── Dashboard/       - Dashboard, TopHeader, MoreSection, SideNavigation
│   ├── Login/           - LoginForm, ResetPassword, FacialAttendance
│   ├── Employee/        - Directory, AddEmployee, ViewEmployee
│   ├── LMangement/      - Leave rules, approvals
│   ├── KredilyAttendance/ - Attendance rules, history, timesheet
│   ├── Settings/        - Roles, permissions, SMTP, policies
│   ├── Common/          - Shared utilities (ApiHeaders, AuthContext, stores)
│   ├── PerformanceManagement/ - Appraisals, objectives
│   ├── TaskManagment/   - Task management
│   ├── OffBoarding/     - Exit management
│   ├── OnBoarding/      - Onboarding process
│   ├── MyProfile/       - User profile
│   └── ...
├── PayrollComponents/   - Payroll specific features
│   ├── Dashboard/
│   ├── PayrollStructure/
│   ├── RunPayroll/
│   └── PayrollReports/
├── Redux/               - Redux store, actions, reducers
├── Context/             - React Context providers
└── storageUtils.js      - Encryption utilities

Component Types:
1. Page Components: Full page views (Dashboard, Directory, AddEmployee)
2. Layout Components: TopHeader, SideNavigation (always visible)
3. Wrapper Components: PrivateRoute, PrivateRoutePayroll
4. Shared Components: ErrorPopUp, MultiSelectComp
5. Context Providers: GlobalProvider, AuthProvider, VideoModalProvider`,
        code: `// Component Architecture Examples

// 1. Page Component - EmployeeDirectory
const EmployeeDirectory = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <section id="content-wrapper">
            <Container fluid>
                <h5>Employee Directory</h5>
                <DataTable
                    columns={columns}
                    data={employees}
                    pagination
                />
            </Container>
        </section>
    );
};

// 2. Layout Component - TopHeader (always visible in private routes)
const TopHeader = ({ changesidebar }) => {
    return (
        <nav className="navbar">
            <SideNavigation />    {/* Side menu */}
            <CompanyHeader />     {/* Company dropdown */}
            <TopNavbar />         {/* Main navigation */}
            {/* Logout button, profile, notifications */}
        </nav>
    );
};

// 3. Wrapper Component - App.js structure
<BrowserRouter>
    <GlobalProvider>           {/* Theme Context */}
        <AuthProvider>         {/* Auth Context */}
            <VideoModalProvider>  {/* Video Context */}
                <QuickAccessProvider>  {/* Quick Access Context */}
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<LoginForm />} />
                            <Route path="/admin-dashboard" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </Suspense>
                </QuickAccessProvider>
            </VideoModalProvider>
        </AuthProvider>
    </GlobalProvider>
</BrowserRouter>

// 4. UI Libraries Used
// Bootstrap: Layout, Grid, Cards, Modals
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

// Material-UI: Form controls
import { Checkbox, Select, TextField } from '@mui/material';

// Ant Design: Additional components
import { DatePicker, Table } from 'antd';

// React Data Table: Sortable, filterable tables
import DataTable from 'react-data-table-component';`
    },
    {
        id: 14,
        title: "MoreSection - Dynamic Service Cards",
        category: "Components",
        explanation: `MoreSection component "More..." menu click చేసినప్పుడు కనిపించే page. ఇది available services ని cards గా display చేస్తుంది.

Key Features:
1. Role-Based Filtering: User role మరియు permissions based గా services filter అవుతాయి
2. Dynamic Path Assignment: Service path user permissions based గా change అవుతుంది
3. Card Grid Layout: Responsive Bootstrap grid - different screen sizes కి adapt అవుతుంది
4. QuickAccess Tracking: User click చేసిన service ని track చేస్తుంది

Services Array:
- ప్రతి service కి name, icon, path, moduleKey ఉంటుంది
- moduleKey RolesFromDb లో permission check చేయడానికి use చేస్తారు

Filter Logic:
1. services.filter() - RolesFromDb.modules[key].view === true ఉన్నవి మాత్రమే
2. allowedServices.map() - Permission based గా path update చేయడం
   - Performance Management: HR/Manager/Employee based గా different paths
   - Time Sheet: Admin/Employee based గా different paths
   - Onboarding: Template/Employee list based గా different paths
3. .filter(service => service.path) - Path null ఉన్నవి remove చేయడం`,
        code: `// MoreSection.js - Key Code

// 1. Services Definition
const services = [
    { name: "Mobile Tracking", icon: "fa fa-street-view",
      path: "/mobiletrack-rules", moduleKey: "MobileTracking" },
    { name: "Calendar", icon: "fa fa-calendar-o",
      path: "/calendar", moduleKey: "Calendar" },
    { name: "Task Management", icon: "fa fa-pie-chart",
      path: "/task-management-dashboard", moduleKey: "TaskManagement" },
    { name: "Time Sheet", icon: "fa fa-calendar",
      path: "/employeeTimesheetView", moduleKey: "TimeSheet" },
    // ... more services
];

// 2. Role-Based Filtering
const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));

let allowedServices = services.filter(service => {
    const key = service.moduleKey;

    // Special case: CCTV - ADMIN only
    if (service.name === "CCTV Registration") {
        return userInfos?.roles?.[0] === "ADMIN";
    }

    // General: Permission based
    return RolesFromDb?.modules?.[key]?.view === true;
});

// 3. Dynamic Path Assignment
allowedServices = allowedServices.map(service => {
    if (service.name === "Time Sheet") {
        if (SendTimeSheetViewShow && userInfos.roles[0] !== "EMPLOYEE")
            service.path = '/sendAdminTimesheetToEmp';
        else if (EmployeeTimeSheet)
            service.path = '/employeeTimesheetView';
        else
            service.path = null;
    }
    return service;
}).filter(service => service.path);  // null paths remove

// 4. Card Grid Rendering
<Row xs={1} sm={2} md={3} lg={3} xl={4} xxl={5} className="g-4">
    {allowedServices.map(service => (
        <Col key={service.name}>
            <Card onClick={() => {
                service.path && navigate(service.path);
                setQuickAccess(service);  // Track access
            }}>
                <Card.Body>
                    <i className={service.icon}
                       style={{ fontSize: "2.4rem", color: "#f58220" }} />
                    <Card.Text>{service.name}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>`
    },
    {
        id: 15,
        title: "JWT Token Authentication",
        category: "Security",
        explanation: `JWT (JSON Web Token) అనేది stateless authentication mechanism. Server login success అయినప్పుడు token generate చేసి client కి send చేస్తుంది.

JWT Token Structure:
1. Header: Algorithm & token type ({"alg": "HS256", "typ": "JWT"})
2. Payload: User data (user id, email, expiry time)
3. Signature: Header + Payload + Secret Key తో create చేసిన signature

ఈ project లో JWT Flow:
1. Login API response లో token object వస్తుంది: { access: "...", refresh: "..." }
2. Access Token: API calls authenticate చేయడానికి - short lived (minutes/hours)
3. Refresh Token: Access token expire అయినప్పుడు new token get చేయడానికి - long lived

Token Storage:
- Cookie లో userinfoCookie లో part గా store అవుతుంది (encrypted)
- sessionStorage లో user-info object లో part గా store అవుతుంది

Token Usage:
- PrivateRoute లో cookie నుండి token extract చేసి Axios default header లో set చేస్తుంది
- ప్రతి API call తో Authorization: Bearer {token} header send అవుతుంది
- Backend ఈ token validate చేసి request process చేస్తుంది
- Token invalid/expired అయితే 401 status వస్తుంది -> auto logout`,
        code: `// JWT Token Flow

// 1. Login Response - Token receive చేయడం
const result = await axios.post("/api/user/login/", req);
const token = result.data.token;
// token = { access: "eyJ0eXAi...", refresh: "eyJ0eXAi..." }

// 2. Token Storage
var UserInfoToSesson = {
    data: result.data.data,
    roles: result.data.roles,
    token: result.data.token,  // Token object store
    // ...
};
sessionStorage.setItem("user-info", JSON.stringify(UserInfoToSesson));
document.cookie = \\\`userinfoCookie=\\\${JSON.stringify(UserInfoToSesson)}\\\`;

// 3. Token Extract & Set (Privaterote.js)
if (getCookie("userinfoCookie")) {
    var tempobject = JSON.parse(getCookie("userinfoCookie"));
    token = tempobject.token.access;  // Access token extract

    // Axios default header లో set చేయడం
    axios.defaults.headers.common = {
        'Authorization': \\\`Bearer \\\${token}\\\`
    };
}

// 4. ప్రతి API call తో token automatically send అవుతుంది
// Request Header: Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
await axios.get("/api/employees/");  // Token auto-attached

// 5. Token Invalid - Auto Logout
try {
    await axios.get("/api/some-endpoint/");
} catch (error) {
    if (error.response?.status === 401) {
        // Token expired or invalid
        SessionLogIn(navigate);  // Clear session & redirect to login
    }
}

// 6. Page Auto-Reload (Token refresh alternative)
// App.js - 12 hours interval
useEffect(() => {
    const intervalId = setInterval(() => {
        window.location.reload();  // Force re-login after 12 hours
    }, 43200000);
    return () => clearInterval(intervalId);
}, []);`
    },
    {
        id: 16,
        title: "Send Documents - Email Feature",
        category: "API Integration",
        explanation: `Send Documents feature employees కి documents/letters email ద్వారా send చేయడానికి use చేస్తారు. ఇది Directory.js component లో implement చేయబడింది.

Features:
1. Multiple employees select చేసి bulk send చేయవచ్చు
2. Template selection - predefined document templates
3. Send To - Primary recipients (employee emails)
4. CC To - Carbon Copy recipients (additional emails)
5. Email validation - comma separated emails validate చేస్తుంది

Current Branch (prasad_sendDocumentsMailsSend_prod_FE):
- CC field new గా add చేయబడింది
- Multiple CC emails comma separated గా enter చేయవచ్చు
- Email validation regex తో check చేస్తుంది

API: POST /api/directory/send-dynamic-letters/

State Management:
- sendDocumentPOpup: Modal show/hide
- sendDocSendTo: Primary recipients
- sendDocCcTo: CC recipients
- selectedDocId: Selected template IDs
- Error states for validation`,
        code: `// Directory.js - Send Documents Feature

// 1. States
const [sendDocumentPOpup, setSendDocumentPOpup] = useState(false);
const [sendDocSendTo, setSendDocSendTo] = useState('');
const [sendDocCcTo, setSendDocCcTo] = useState('');        // CC field - NEW
const [sendDocSendToError, setSendDocSendToError] = useState('');
const [sendDocCcToError, setSendDocCcToError] = useState('');
const [selectedDocId, setselectedDocId] = useState("");
const [templateError, setTemplateError] = useState('');

// 2. Email Validation Function
const validateEmails = (value) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const emails = value.split(',').map(e => e.trim());
    return emails.every(email => emailRegex.test(email));
};

// 3. Send Function
const sendDocumentsToEmp = async () => {
    // Template validation
    if (!selectedDocId || selectedDocId.length === 0) {
        setTemplateError('Please select template');
        return;
    }

    // CC email validation
    if (sendDocCcTo && sendDocCcTo.trim() && !validateEmails(sendDocCcTo)) {
        setSendDocCcToError('Please enter valid email(s) separated by comma');
        return;
    }

    // API Request
    const req = {
        employee_number: selectedIDEmp,    // Selected employee IDs
        template_ids: selectedDocId,       // Template IDs
        send_to: sendDocSendTo,            // Primary recipients
        cc_to: sendDocCcTo,               // CC recipients (NEW)
    };

    const headers = ApiHeaders(multitenant);
    await axios.post("/api/directory/send-dynamic-letters/", req, { headers })
        .then((result) => {
            alert("Documents sent successfully!");
            setSendDocumentPOpup(false);
        })
        .catch((err) => {
            console.log(err);
        });
};

// 4. Modal UI
<Modal show={sendDocumentPOpup} onHide={() => setSendDocumentPOpup(false)}>
    <Modal.Header>Send Documents</Modal.Header>
    <Modal.Body>
        <label>Template</label>
        <select onChange={(e) => setselectedDocId(e.target.value)}>
            {templates.map(t => <option value={t.id}>{t.name}</option>)}
        </select>

        <label>Send To</label>
        <input value={sendDocSendTo} onChange={(e) => setSendDocSendTo(e.target.value)} />

        <label>CC To</label>
        <input value={sendDocCcTo}
               onChange={(e) => setSendDocCcTo(e.target.value)}
               placeholder="email1@example.com, email2@example.com" />
        {sendDocCcToError && <span className="text-danger">{sendDocCcToError}</span>}

        <button onClick={sendDocumentsToEmp}>Send</button>
    </Modal.Body>
</Modal>`
    },
    {
        id: 17,
        title: "Context API - Provider Pattern",
        category: "State Management",
        explanation: `Context API React లో built-in state management solution. ఇది component tree లో data pass చేయడానికి prop drilling avoid చేస్తుంది.

Prop Drilling Problem:
- Parent component నుండి deeply nested child component కి data pass చేయాలంటే, middle components ద్వారా props pass చేయాలి
- Middle components ని ఆ data అవసరం లేకపోయినా props గా receive చేసి pass చేయాలి
- ఇది messy మరియు maintain చేయడం కష్టం

Context Solution:
- Provider component లో data provide చేస్తారు
- ఏ depth లో ఉన్న component అయినా useContext తో directly access చేయవచ్చు

ఈ project లో Contexts:
1. GlobalProvider (ThemeContext.js) - Company name, final approval settings
2. AuthProvider (AuthContext.js) - Login password temporary storage
3. VideoModalProvider - Tutorial videos modal state management
4. QuickAccessProvider - Quick access services tracking (MoreSection లో)
5. QuickAccessContext - MoreSection నుండి services track చేయడం`,
        code: `// Context API - Complete Pattern

// ===== 1. Context Create చేయడం =====
// QuickAccessContext.js
import { createContext, useState } from 'react';

export const QuickAccessContext = createContext();

export const QuickAccessProvider = ({ children }) => {
    const [quickAccess, setQuickAccess] = useState(null);

    return (
        <QuickAccessContext.Provider value={{ quickAccess, setQuickAccess }}>
            {children}
        </QuickAccessContext.Provider>
    );
};

// ===== 2. Provider Wrap చేయడం (App.js) =====
import { QuickAccessProvider } from "./Components/Common/QuickAccessContext.js";

<QuickAccessProvider>
    <Routes>
        {/* All routes have access to QuickAccessContext */}
    </Routes>
</QuickAccessProvider>

// ===== 3. Context Use చేయడం (MoreSection.js) =====
import { useContext } from 'react';
import { QuickAccessContext } from '../Common/QuickAccessContext';

const MoreSection = () => {
    const { setQuickAccess } = useContext(QuickAccessContext);

    return (
        <Card onClick={() => setQuickAccess(service)}>
            {service.name}
        </Card>
    );
};

// ===== 4. AuthContext - Password Storage =====
// AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [password, setPassword] = useState("");

    return (
        <AuthContext.Provider value={{ password, setPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// LoginForm.js లో use చేయడం
const { setPassword } = useAuth();
setPassword(data.password);  // Login time password store

// ===== 5. Multiple Providers Nesting =====
<GlobalProvider>
    <AuthProvider>
        <VideoModalProvider>
            <QuickAccessProvider>
                {children}
            </QuickAccessProvider>
        </VideoModalProvider>
    </AuthProvider>
</GlobalProvider>`
    },
    {
        id: 18,
        title: "MoreSection - Service Navigation Pattern",
        category: "Routing",
        explanation: `MoreSection page లో services ని cards గా display చేసి, click చేసినప్పుడు respective page కి navigate చేస్తుంది.

Navigation Pattern:
1. services array లో ప్రతి service కి path define చేయబడింది
2. User permissions based గా paths dynamically modify అవుతాయి
3. Card click చేసినప్పుడు navigate(service.path) call అవుతుంది
4. QuickAccess context లో service track అవుతుంది

Dynamic Path Logic Examples:
- Performance Management: HR అయితే /pm-object, Manager అయితే /objectives-list
- Final Leave-LOP: Employer view అయితే /cr-admin-view, Employee view అయితే /cr-employee-view
- Time Sheet: Admin అయితే /sendAdminTimesheetToEmp, Employee అయితే /employeeTimesheetView
- Onboarding: Template permission ఉంటే /onboardingcreate, Employee list ఉంటే /onboarding-onboard-list
- OffBoarding: Listing permission ఉంటే /offboarding-list-view, Exit settings ఉంటే /create-exit-tasks

Responsive Grid:
- xs={1}: Mobile - 1 card per row
- sm={2}: Small tablet - 2 cards per row
- md={3}: Tablet - 3 cards per row
- xl={4}: Desktop - 4 cards per row
- xxl={5}: Large desktop - 5 cards per row`,
        code: `// MoreSection Navigation - Detailed Flow

// 1. Service Definition with moduleKey
const services = [
    { name: "Mobile Tracking", icon: "fa fa-street-view",
      path: "/mobiletrack-rules", moduleKey: "MobileTracking" },
    { name: "Performance Management", icon: "fa fa-tachometer",
      path: "/pm-object", moduleKey: "PerformanceManagement" },
    { name: "OffBoarding", icon: "fa fa-user-times",
      path: "/create-exit-tasks", moduleKey: "Offboarding" },
];

// 2. Permission-based path modification
allowedServices = allowedServices.map(service => {
    // Performance Management - Role based path
    if (service.name === "Performance Management") {
        if (HRObjectivesshow) service.path = "/pm-object";
        else if (ManagerObjectivesshow) service.path = "/objectives-list";
        else if (allappraisalFormshow) service.path = "/all-appraisal-from-list";
        else service.path = null;  // No permission = no access
    }

    // OffBoarding - Submodule based path
    if (service.name === "OffBoarding") {
        const off = RolesFromDb?.modules?.Offboarding?.submodules;
        if (off?.OffboardingListing?.view) service.path = "/offboarding-list-view";
        else if (off?.ExitSettings?.view) service.path = "/create-exit-tasks";
        else if (off?.NOCApproval?.view) service.path = "/noc-approvals-list";
        else service.path = null;
    }

    return service;
}).filter(service => service.path);  // Remove null paths

// 3. Card Click Handler
<Card onClick={() => {
    service.path && navigate(service.path);  // Navigate
    setQuickAccess(service);                 // Track in context
}}>
    <i className={service.icon} style={{ color: "#f58220" }} />
    <Card.Text>{service.name}</Card.Text>
</Card>`
    },
    {
        id: 19,
        title: "Redux Store - Persist Pattern",
        category: "State Management",
        explanation: `ఈ project లో Redux store ని localStorage తో persist చేస్తారు. Page refresh అయినా state maintain అవుతుంది.

Redux Basics:
1. Store: Application యొక్క single source of truth - complete state object
2. Actions: State change trigger చేయడానికి dispatch చేసే objects
3. Reducers: Actions based గా new state return చేసే pure functions
4. Dispatch: Action ని store కి send చేయడం
5. Selector: Store నుండి specific state extract చేయడం

Persist Pattern:
1. Page load అయినప్పుడు localStorage నుండి previous state read చేసి store initialize చేస్తారు
2. State change అయినప్పుడు store.subscribe() callback లో localStorage update చేస్తారు
3. ఇది manual persist - redux-persist library use చేయకుండా

ఈ project లో Redux use case:
- Multi-tenant company selection - company switch చేసినప్పుడు
- SELECTED_COMPANYS action: Company data store చేయడం
- LOGOUT action: State clear చేయడం`,
        code: `// Redux/store.js - Complete Implementation

import { createStore } from 'redux';
import { SELECTED_COMPANYS, LOGOUT } from './actions';

// 1. Reducer - State changes handle చేయడం
const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECTED_COMPANYS:
            return { ...state, data: action.payload };
        case LOGOUT:
            return {};  // Complete state clear
        default:
            return state;
    }
};

// 2. Persist Pattern - localStorage నుండి initial state
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

// 3. Store Create with persisted state
const store = createStore(rootReducer, persistedState);

// 4. Subscribe - State change అయినప్పుడు localStorage update
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;

// Redux/actions.js - Action Creators
export const SELECTED_COMPANYS = 'SELECTED_COMPANYS';
export const LOGOUT = 'LOGOUT';

export const SELECTED_COMPANY = (data) => ({
    type: SELECTED_COMPANYS,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT,
});

// Component లో Usage
import { useSelector, useDispatch } from 'react-redux';
import { SELECTED_COMPANY, logout } from '../../Redux/actions';

const TopHeader = () => {
    // Read state
    const multitenant = useSelector((state) => state.data);

    // Dispatch actions
    const dispatch = useDispatch();

    // Company select చేసినప్పుడు
    const handleCompanySelect = (company) => {
        dispatch(SELECTED_COMPANY(company));
    };

    // Logout చేసినప్పుడు
    const handleLogout = () => {
        dispatch(logout());
    };
};

// index.js - Provider setup
import { Provider } from 'react-redux';
import store from './Redux/store';

<Provider store={store}>
    <App />
</Provider>`
    },
    {
        id: 20,
        title: "Environment Variables & Configuration",
        category: "Components",
        explanation: `React application లో environment variables .env file లో define చేస్తారు. ఇవి build time లో inject అవుతాయి.

.env file rules:
- Variables REACT_APP_ prefix తో start అవ్వాలి
- process.env.REACT_APP_VARIABLE_NAME తో access చేస్తారు
- Build time లో values replace అవుతాయి - runtime లో change చేయలేరు
- .env file git లో commit చేయకూడదు (sensitive data)

ఈ project లో .env variables:
1. REACT_APP_DEV_IP_ADDRESS: Development server URL
2. REACT_APP_TEST_MEDIA_LOAD: Media files URL
3. REACT_APP_GOOGLE_API_KEY: Google Maps API key
4. REACT_APP_TRACK_IP_ADDRESS: Tracking server URL
5. REACT_APP_TUTORIAL_IP_ADDRESS: Tutorial videos URL
6. REACT_APP_CHAT_MAIN_URL: Chat server URL
7. REACT_APP_DISABLE_LOGS: Console logs enable/disable

Dynamic Base URL:
- index.js లో window.location.host check చేసి baseURL set చేస్తారు
- Production domains: bharatpayroll.com, indianhr.in, whytelglobal.com
- Development: Fixed IP address`,
        code: `// .env file
REACT_APP_DEV_IP_ADDRESS=http://38.143.106.249:84/
REACT_APP_TEST_MEDIA_LOAD=http://38.143.106.249:84/media/
REACT_APP_GOOGLE_API_KEY=AIzaSyBVmtcjTIuVTFMu...
REACT_APP_TRACK_IP_ADDRESS=http://192.168.94.202:7321/
REACT_APP_TUTORIAL_IP_ADDRESS=https://pssvideos.pranathiss.com
REACT_APP_CHAT_MAIN_URL=https://bpchat.bharatpayroll.com/
REACT_APP_DISABLE_LOGS=true

// Component లో use చేయడం
const apiUrl = process.env.REACT_APP_DEV_IP_ADDRESS;
const mediaUrl = process.env.REACT_APP_TEST_MEDIA_LOAD;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// index.js - Dynamic Base URL Configuration
const host = window.location.host;

if (host.includes("whytelglobal.com") ||
    host.includes("indianpayroll.co.in") ||
    host.includes("indianhr.in") ||
    host.includes("indianpayrollservice.com") ||
    host.includes("bharatpayroll.com")) {
    // Production - Origin based URL
    axios.defaults.baseURL = \\\`\\\${window.location.origin}/qxbox/\\\`;
} else {
    // Development - Fixed URL
    axios.defaults.baseURL = 'https://pssqa.bharatpayroll.com/qxbox/';
}

// Build Scripts (package.json)
"scripts": {
    "start": "set NODE_OPTIONS=--max-old-space-size=8192 && set PORT=80 && react-scripts start",
    "build": "set \\"GENERATE_SOURCEMAP=false\\" && react-scripts build"
}
// NODE_OPTIONS: Memory limit increase (large project)
// GENERATE_SOURCEMAP=false: Production build లో source maps disable`
    }
];

const ProjectTutorial = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [language, setLanguage] = useState("TELUGU");
    const navigate = useNavigate();

    const filteredTopics = topics.filter(topic => {
        const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
        const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.explanation.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categoryColors = {
        "Authentication": "#e74c3c",
        "Routing": "#3498db",
        "State Management": "#2ecc71",
        "API Integration": "#e67e22",
        "Roles & Permissions": "#9b59b6",
        "Security": "#1abc9c",
        "Components": "#f39c12",
        "Hooks": "#e91e63",
        "Forms": "#00bcd4"
    };

    return (
        <section id="content-wrapper">
            <div className='MyMarginCls'></div>
            <Container fluid className='rounded' style={{ background: "#edf0f5", minHeight: "81vh", overflowY: "auto", padding: "2rem" }}>

                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h2 style={{ color: "#2c3e50", fontWeight: "bold", fontSize: "2rem" }}>
                        Bharat Payroll - Project Tutorial
                    </h2>
                    <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
                        {filteredTopics.length} Concepts - Learn Everything (Telugu)
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "1.5rem" }}>
                        {["ENGLISH", "TELUGU"].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    padding: "8px 24px",
                                    border: "1px solid #ddd",
                                    background: language === lang ? "#fff" : "#f8f9fa",
                                    fontWeight: language === lang ? "bold" : "normal",
                                    cursor: "pointer",
                                    borderRadius: lang === "ENGLISH" ? "4px 0 0 4px" : "0 4px 4px 0"
                                }}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "1.5rem" }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: "6px 16px",
                                borderRadius: "20px",
                                border: selectedCategory === cat ? "2px solid" : "1px solid #ddd",
                                borderColor: selectedCategory === cat ? (categoryColors[cat] || "#3498db") : "#ddd",
                                background: selectedCategory === cat ? (categoryColors[cat] || "#3498db") : "#fff",
                                color: selectedCategory === cat ? "#fff" : (categoryColors[cat] || "#333"),
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "500",
                                transition: "all 0.3s"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <input
                        type="search"
                        placeholder="Search topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            marginBottom: "1.5rem",
                            fontSize: "1rem"
                        }}
                    />

                    <p style={{ color: "#95a5a6", textAlign: "center", marginBottom: "1rem" }}>
                        Showing {filteredTopics.length} of {topics.length} topics
                    </p>

                    {filteredTopics.map((topic, index) => (
                        <div key={topic.id} style={{
                            marginBottom: "12px",
                            borderRadius: "8px",
                            border: expandedTopic === topic.id ? "2px solid #3498db" : "1px solid #e0e0e0",
                            overflow: "hidden",
                            background: "#fff",
                            boxShadow: expandedTopic === topic.id ? "0 4px 12px rgba(52,152,219,0.2)" : "none",
                            borderLeft: `4px solid ${categoryColors[topic.category] || "#3498db"}`
                        }}>
                            <div
                                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                                style={{
                                    padding: "16px 20px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    background: "#fff"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <span style={{
                                        background: "#27ae60",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        width: "32px",
                                        height: "32px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.85rem",
                                        fontWeight: "bold",
                                        flexShrink: 0
                                    }}>
                                        {index + 1}
                                    </span>
                                    <span style={{ fontWeight: "600", fontSize: "1.05rem", color: "#2c3e50" }}>
                                        {topic.title}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{
                                        padding: "3px 12px",
                                        borderRadius: "12px",
                                        fontSize: "0.75rem",
                                        border: `1px solid ${categoryColors[topic.category] || "#3498db"}`,
                                        color: categoryColors[topic.category] || "#3498db",
                                        fontWeight: "500"
                                    }}>
                                        {topic.category}
                                    </span>
                                    <span style={{ fontSize: "1.2rem", color: "#95a5a6" }}>
                                        {expandedTopic === topic.id ? "\u2303" : "\u2304"}
                                    </span>
                                </div>
                            </div>

                            {expandedTopic === topic.id && (
                                <div style={{ padding: "0 20px 20px" }}>
                                    <div style={{
                                        background: "#eaf6ff",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        marginBottom: "16px"
                                    }}>
                                        <h6 style={{ color: "#2980b9", fontWeight: "bold", marginBottom: "12px" }}>
                                            {language === "TELUGU" ? "Explanation (Telugu):" : "Explanation:"}
                                        </h6>
                                        <div style={{
                                            color: "#333",
                                            lineHeight: "1.8",
                                            whiteSpace: "pre-line",
                                            fontSize: "0.95rem"
                                        }}>
                                            {topic.explanation}
                                        </div>
                                    </div>

                                    <div style={{
                                        background: "#1e1e1e",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        overflow: "auto"
                                    }}>
                                        <h6 style={{ color: "#e74c3c", fontWeight: "bold", marginBottom: "12px" }}>
                                            Practical Example:
                                        </h6>
                                        <pre style={{
                                            color: "#d4d4d4",
                                            margin: 0,
                                            fontSize: "0.85rem",
                                            lineHeight: "1.6",
                                            fontFamily: "'Fira Code', 'Consolas', monospace",
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word"
                                        }}>
                                            {topic.code}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button
                        onClick={() => navigate("/page-code-guide")}
                        style={{
                            padding: "10px 24px", borderRadius: "8px",
                            border: "2px solid #e74c3c", background: "#fff",
                            color: "#e74c3c", cursor: "pointer", fontSize: "1rem",
                            fontWeight: "500"
                        }}
                    >
                        View Page-Wise Code Guide
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default ProjectTutorial;
