import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const pages = [
    {
        id: 1,
        title: "index.js - Application Entry Point",
        filePath: "src/index.js",
        category: "Core Files",
        description: "ఇది React application యొక్క starting point. Browser లో application open చేసినప్పుడు ఈ file first execute అవుతుంది.",
        lineByLine: [
            {
                code: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";`,
                explanation: `React మరియు ReactDOM import చేస్తున్నారు. ReactDOM HTML page లో React components ని render చేయడానికి use చేస్తారు. App.js అనేది main component - ఇందులో entire application ఉంటుంది.`
            },
            {
                code: `import axios from "axios";
import { Provider } from 'react-redux';
import store from './Redux/store';
import "./storageUtils";`,
                explanation: `axios - HTTP requests (API calls) చేయడానికి library.
Provider - Redux store ని entire application కి available చేయడానికి wrapper component. ఇది React-Redux library నుండి వచ్చింది.
store - Redux store object, ఇందులో application state store అవుతుంది.
"./storageUtils" - ఈ import ద్వారా sessionStorage, localStorage, cookies encryption automatically activate అవుతుంది. ఇది just import చేస్తే చాలు, functions call చేయనవసరం లేదు - ఎందుకంటే ఆ file లో storage methods override అవుతాయి.`
            },
            {
                code: `if (process.env.REACT_APP_DISABLE_LOGS === "true") {
    console.log = () => { };
    console.warn = () => { };
    console.error = () => { };
}`,
                explanation: `Production లో console messages disable చేయడం. .env file లో REACT_APP_DISABLE_LOGS=true అయితే, console.log, console.warn, console.error అన్నీ empty functions గా replace అవుతాయి. ఇది production లో security కోసం - developer tools లో sensitive data కనిపించకుండా ఉంటుంది.`
            },
            {
                code: `let host = window.location.host;
axios.defaults.baseURL = 'https://pssqa.bharatpayroll.com/qxbox/';
if (host.includes("bharatpayroll.com") || host.includes("indianhr.in") || ...) {
    axios.defaults.baseURL = \`\${window.location.origin}/qxbox/\`;
}`,
                explanation: `Dynamic Base URL Setup:
- window.location.host - current website address return చేస్తుంది (example: "app.bharatpayroll.com")
- Default గా QA server URL set చేస్తుంది (development కోసం)
- Production domains detect అయితే, current domain based URL set అవుతుంది
- ఇది చాలా important - ఒకే codebase multiple domains లో run అవుతుంది
- axios.defaults.baseURL set చేస్తే, తర్వాత "/api/login/" call చేస్తే, ఇది "https://domain.com/qxbox/api/login/" గా మారుతుంది`
            },
            {
                code: `axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";`,
                explanation: `ప్రతి POST request కి default headers set చేయడం:
- Content-Type: "application/json" - మనం server కి JSON format లో data పంపుతున్నాం అని చెప్తుంది
- Accept: "application/json" - server నుండి JSON format లో response కావాలి అని చెప్తుంది
- ఈ headers ప్రతి axios.post() call కి automatically attach అవుతాయి`
            },
            {
                code: `const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);`,
                explanation: `Application Rendering:
1. document.getElementById("root") - public/index.html లో <div id="root"></div> element ని select చేస్తుంది
2. ReactDOM.createRoot - React 18 యొక్క new rendering method (concurrent mode support)
3. Provider store={store} - Redux store ని application లో ఎక్కడైనా access చేయగలిగేలా wrap చేస్తుంది
4. <App /> - Main application component render అవుతుంది
5. ఇది entire application start అయ్యే point - ఈ line execute అయ్యాక App.js component load అవుతుంది`
            }
        ]
    },
    {
        id: 2,
        title: "LoginForm.js - Login Page",
        filePath: "src/Components/Login/LoginForm.js",
        category: "Authentication Pages",
        description: "User login చేసే page. Email/Phone మరియు Password enter చేసి application లోకి access పొందవచ్చు. OTP login option కూడా ఉంటుంది.",
        lineByLine: [
            {
                code: `import { useForm } from "react-hook-form";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import useMultitenantStore from "../Common/useMultitenantStore";
import { useAuth } from "../Common/AuthContext";`,
                explanation: `Libraries Import:
- useForm: React Hook Form library - form handling కోసం. ఇది traditional onChange handlers కంటే better performance ఇస్తుంది
- axios: API calls చేయడానికి
- CryptoJS: Password & email encrypt చేయడానికి (AES encryption)
- useNavigate: Login success తర్వాత user ని dashboard కి redirect చేయడానికి
- useMultitenantStore: Zustand store - user info globally store చేయడానికి
- useAuth: Auth context - password temporarily store చేయడానికి`
            },
            {
                code: `const [withOTP, setWithOTP] = useState(false);
const [errorMes, setErrorMes] = useState();
const [loader, setLoader] = useState(true);
const [passwordEye, setpasswordEye] = useState(false);
const navigate = useNavigate();`,
                explanation: `State Variables:
- withOTP: false - Password login, true - OTP login. Toggle button click చేస్తే change అవుతుంది
- errorMes: API error message store చేయడానికి ("Invalid credentials" etc.)
- loader: true - button clickable, false - loading state (API call running). Double submit prevent చేయడానికి
- passwordEye: false - password hidden (***), true - password visible. Eye icon click చేస్తే toggle
- navigate: useNavigate() hook - programmatic గా page navigate చేయడానికి function return చేస్తుంది`
            },
            {
                code: `const {
    register, handleSubmit, formState: { errors },
    trigger, setValue, getValues
} = useForm({});`,
                explanation: `React Hook Form Destructuring:
- register: Input field ని form తో connect చేస్తుంది. {...register("email")} అని spread చేస్తే onChange, value, ref automatically handle అవుతాయి
- handleSubmit: Form submit event handle చేస్తుంది. Validation pass అయితే callback function (onSubmit) call చేస్తుంది
- errors: Validation fail అయిన fields errors object లో ఉంటాయి. errors.email?.message తో access చేస్తారు
- trigger: Manual validation trigger చేయడానికి. trigger("email") - email field validate చేయడం
- setValue: Code ద్వారా value set చేయడం. Remember me feature లో saved email set చేయడానికి
- getValues: Current field values get చేయడానికి. getValues("email") - email value return చేస్తుంది`
            },
            {
                code: `const KEY = CryptoJS.enc.Utf8.parse("A13007575abcdefg");
const IV = CryptoJS.enc.Utf8.parse("Aabcdefg13007575");

const encryptData = (plainText) => {
    if (!plainText) return "";
    let encrypted = CryptoJS.AES.encrypt(plainText, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};`,
                explanation: `AES Encryption Setup:
- KEY: 16 characters = 128-bit encryption key. Backend లో same key ఉంటుంది, so decrypt చేయగలదు
- IV (Initialization Vector): Encryption ని more secure చేయడానికి additional random-like value
- CryptoJS.mode.CBC: Cipher Block Chaining mode - ప్రతి block previous block result ని use చేస్తుంది
- CryptoJS.pad.Pkcs7: Data ని block size కి pad చేయడం (16 bytes multiples)
- ఈ function password, email ని encrypted string గా convert చేస్తుంది
- Example: "test@email.com" -> "U2FsdGVkX1+abc123..." (unreadable format)
- Network tab లో చూస్తే encrypted data మాత్రమే కనిపిస్తుంది, actual password కనిపించదు`
            },
            {
                code: `const onSubmit = async (data) => {
    setLoader(false);  // Loading state
    const email = data.email.trim();
    const password = data.password.trim();

    let mailRegexx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\\.+[A-Z]{2,}$/i;

    if (email.match(mailRegexx)) {
        const encryptedEmail = encryptData(email);
        const encryptedPassword = encryptData(password);
        req = { email: encryptedEmail, password: encryptedPassword };
    }`,
                explanation: `Login Submit Function:
- async keyword - ఈ function లో await use చేయవచ్చు (API calls కోసం)
- data parameter - React Hook Form ద్వారా form values object receive అవుతుంది
- setLoader(false) - Submit button disable చేసి loading spinner show చేస్తుంది
- .trim() - Leading/trailing spaces remove చేస్తుంది
- mailRegexx - Email format validate చేసే Regular Expression pattern
  - ^[A-Z0-9._%+-]+ - Email start part (user)
  - @[A-Z0-9.-]{2,} - @ తర్వాత domain name
  - \\.[A-Z]{2,}$ - .com, .in etc.
  - /i flag - case insensitive
- email.match(mailRegexx) - Email pattern match అయితే true, else false
- Encrypt చేసి request object create చేస్తుంది`
            },
            {
                code: `await axios.post("/api/user/login/", req, { withCredentials: true })
  .then((result) => {
    var UserInfoToSesson = {
        data: result.data.data,
        roles: result.data.roles,
        roleID: result.data.rolesId[0],
        token: result.data.token,
        subdomain: result.data.subDomain,
        employeeImage: result.data.employeeImage,
        firstName: result.data.firstName,
        plan: result.data.plan,
    };

    sessionStorage.setItem("user-info", JSON.stringify(UserInfoToSesson));
    document.cookie = \`userinfoCookie=\${JSON.stringify(UserInfoToSesson)}\`;
    sessionStorage.setItem("RolesFromDb", JSON.stringify(result.data.existedRolesData));

    if (result.data.roles[0] === "ADMIN") {
        navigate("/my-profile");
    }
  })
  .catch((err) => {
    if (err.response.status === 401) { SessionLogIn(navigate); }
    setErrorMes(err.response.data.errors.message);
  });`,
                explanation: `API Call & Response Handling:
1. axios.post() - POST request "/api/user/login/" endpoint కి
2. req - Encrypted email & password
3. withCredentials: true - Cookies cross-origin requests లో send చేయడం allow

Success (.then):
4. UserInfoToSesson - API response నుండి important data extract చేసి object create చేయడం
   - data: Company & employee info
   - roles: ["ADMIN"] or ["EMPLOYEE"] - User role
   - roleID: Permission check కోసం role ID
   - token: { access: "...", refresh: "..." } - JWT tokens
   - subdomain: Multi-tenant company identifier
5. sessionStorage.setItem - Tab close అయ్యే వరకు data store
6. document.cookie - Browser close చేసినా persist (session cookie)
7. Role based navigation - ADMIN అయితే admin page, EMPLOYEE అయితే user page

Error (.catch):
8. 401 status - Invalid token, auto logout (SessionLogIn)
9. Error message UI లో display చేయడం`
            },
            {
                code: `<form onSubmit={handleSubmit(onSubmit)}>
    <input type="text"
        {...register("email", {
            required: "This field is required",
            pattern: {
                value: /^(?:(\\+?\\d{10})|([\\w.-]+@[\\w.-]+\\.\\w{2,5}))$/,
                message: "Please enter a valid Email ID or Phone no",
            },
            onChange: (event) => event.target.value = event.target.value.toLowerCase()
        })}
        onKeyUp={() => { trigger("email"); }}
    />
    {errors.email && <small className='text-danger'>{errors.email.message}</small>}

    <input type={!passwordEye ? 'password' : "text"}
        {...register("password", {
            required: "This field is required",
        })}
    />
    <i className={passwordEye ? "fa fa-eye" : "fa fa-eye-slash"}
       onClick={() => setpasswordEye(!passwordEye)} />
</form>`,
                explanation: `JSX - Login Form UI:
1. handleSubmit(onSubmit) - Form submit అయినప్పుడు first validation run, pass అయితే onSubmit call
2. {...register("email", {...})} - Spread operator తో React Hook Form register:
   - required: Empty submit చేస్తే error show
   - pattern: Regex match కాకపోతే error message show
   - onChange: Typing చేస్తుంటే lowercase convert (Email case-insensitive)
3. onKeyUp - ప్రతి key press తర్వాత trigger("email") call - real-time validation
4. {errors.email && ...} - Conditional rendering. Error ఉంటే red text show, లేకపోతే nothing
5. Password Eye Toggle:
   - passwordEye false -> type="password" (hidden *****)
   - passwordEye true -> type="text" (visible)
   - onClick: toggle state
   - className: fa-eye (open) or fa-eye-slash (closed) icon`
            }
        ]
    },
    {
        id: 3,
        title: "TopHeader.js - Navigation Bar & Logout",
        filePath: "src/Components/Dashboard/TopHeader.js",
        category: "Layout Components",
        description: "Application top navigation bar. ఇది login తర్వాత ప్రతి page లో కనిపిస్తుంది. Company logo, navigation menu, notifications, profile, logout button ఉంటాయి.",
        lineByLine: [
            {
                code: `import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_COMPANY } from './../../Redux/actions';
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiHeaders from "../Common/ApiHeaders";
import { VideoModalContext } from "../../Context/VideoModalContext";`,
                explanation: `TopHeader Imports:
- useDispatch: Redux action dispatch చేయడానికి (company switch చేసినప్పుడు)
- useSelector: Redux store నుండి data read చేయడానికి (selected company)
- SELECTED_COMPANY: Action creator - company select చేసినప్పుడు dispatch చేస్తారు
- useNavigate: Page navigate చేయడానికి (Logout తర్వాత login page)
- useLocation: Current page URL get చేయడానికి (video tutorial mapping)
- Link: HTML <a> tag alternative - page reload లేకుండా navigate
- ApiHeaders: Multi-tenant headers generate చేయడానికి
- VideoModalContext: Tutorial video popup manage చేయడానికి`
            },
            {
                code: `const TopHeader = ({ changesidebar }) => {
    const multitenant = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));
    const userInfos = JSON.parse(sessionStorage.getItem('user-info'));
    const [listofcompany, setlistofcompany] = useState([]);`,
                explanation: `Component Setup:
- { changesidebar } - Props destructuring. Parent (PrivateRoute) నుండి sidebar toggle function receive
- useSelector((state) => state.data) - Redux store నుండి multitenant company data read
- useDispatch() - Redux action dispatch function
- useNavigate() - Navigate function
- useLocation() - Current URL info { pathname, search, hash }
- RolesFromDb - SessionStorage నుండి user permissions parse చేసి read
- userInfos - SessionStorage నుండి user details (role, token, company info)
- listofcompany - Multi-tenant companies list state (dropdown కోసం)`
            },
            {
                code: `const Logout = () => {
    sessionStorage.removeItem("user-info");
    sessionStorage.removeItem("RolesFromDb");
    localStorage.removeItem("RolesFromDb");
    sessionStorage.removeItem("personalImage");
    sessionStorage.removeItem("persnonalName");
    document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "userinfoRoleInfo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "personalImage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "persnonalName=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
    navigate("/");
};`,
                explanation: `Logout Function - Session Complete Clear:
Step 1: sessionStorage items remove చేయడం
  - "user-info": User details (role, token, company)
  - "RolesFromDb": Permissions data
  - "personalImage": Profile image URL
  - "persnonalName": User name

Step 2: localStorage items remove
  - localStorage tab close చేసినా persist అవుతుంది, so manually clear చేయాలి

Step 3: Cookies clear చేయడం
  - Cookie ని delete చేయడానికి direct method లేదు
  - Trick: expires ని past date (Jan 1, 1970) కి set చేస్తే browser automatically delete చేస్తుంది
  - Thu, 01 Jan 1970 - Unix epoch (time calculation start point)

Step 4: Page reload & redirect
  - window.location.reload() - Page completely fresh load (all state clear)
  - navigate("/") - Login page కి redirect`
            },
            {
                code: `const getListOfCompanies = async () => {
    const headers = ApiHeaders(multitenant);
    var userinfo = JSON.parse(sessionStorage.getItem('user-info'));
    if (userinfo.data.multitenantKey && userinfo.data.companyId) {
        await axios.get(
            \`/api/user/list-multi-tenant-companies/?mul_key=\${userinfo.data.multitenantKey}&cmp_id=\${userinfo.data.companyId}\`,
            { headers: headers }
        ).then((result) => {
            setlistofcompany(result.data);
        });
    }
};`,
                explanation: `Multi-Tenant Company List Fetch:
- ApiHeaders(multitenant) - Custom headers generate (X-CURRENT-COMPANY, X-SELECTED-COMPANY)
- multitenantKey check - User multi-tenant enabled అయితే మాత్రమే API call
- Template literal (\`...\`) - URL లో dynamic values insert చేయడం
  - mul_key: Multi-tenant key (companies group identifier)
  - cmp_id: Current company ID
- Response లో companies list వస్తుంది - dropdown లో show చేస్తారు
- User different company select చేస్తే dispatch(SELECTED_COMPANY(company)) call అవుతుంది`
            }
        ]
    },
    {
        id: 4,
        title: "Privaterote.js - Route Protection",
        filePath: "src/Privaterote.js",
        category: "Core Files",
        description: "PrivateRoute component - ఇది ప్రతి protected page ని wrap చేస్తుంది. Login చేయకుండా pages access చేయకుండా protect చేస్తుంది మరియు role-based permission check చేస్తుంది.",
        lineByLine: [
            {
                code: `import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import TopHeader from "./Components/Dashboard/TopHeader";
import axios from "axios";
import { reloadRoles } from "./sessionLogout";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {`,
                explanation: `PrivateRoute Setup:
- Navigate: JSX లో redirect చేయడానికి component (<Navigate to="/" />)
- useNavigate: Function call ద్వారా redirect (navigate("/login"))
- useLocation: Current URL path get చేయడానికి
- TopHeader: Navigation bar component - authenticated pages లో show అవుతుంది
- reloadRoles: API call చేసి latest permissions fetch చేసే function
- useSelector: Redux store నుండి multitenant data read
- { children } - Props destructuring. <PrivateRoute><Dashboard /></PrivateRoute> లో Dashboard component children గా వస్తుంది`
            },
            {
                code: `function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) {
            sessionStorage.setItem("user-info", c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}`,
                explanation: `Cookie Parse Function:
- document.cookie - Browser లో store చేసిన cookies string return చేస్తుంది
  Example: "userinfoCookie=abc123; theme=dark; lang=en"
- decodeURIComponent - URL encoded characters decode చేయడం (%20 -> space)
- split(';') - String ని ';' తో split చేసి array గా convert
- for loop - ప్రతి cookie check చేస్తుంది
- charAt(0) === ' ' - Leading spaces remove చేయడం (cookies semicolon + space తో separate అవుతాయి)
- indexOf(name) === 0 - Cookie name match అయిందా check
- substring(name.length) - Cookie value extract (name= తర్వాత part)
- sessionStorage.setItem - Cookie value ని sessionStorage లో కూడా copy
- Return: Cookie value string, లేకపోతే empty string ""`
            },
            {
                code: `// Token Setup
let token;
if (getCookie("userinfoCookie")) {
    var tempobject = JSON.parse(getCookie("userinfoCookie"));
    token = tempobject.token.access;
    axios.defaults.headers.common = { 'Authorization': \`Bearer \${token}\` };
}`,
                explanation: `JWT Token Setup:
1. getCookie("userinfoCookie") - Login cookie ఉందా check
2. JSON.parse - Cookie string ని JavaScript object గా convert
3. tempobject.token.access - JWT access token extract
   - Token object: { access: "eyJ...", refresh: "eyJ..." }
   - access: Short-lived token for API authentication
4. axios.defaults.headers.common - ప్రతి API request కి automatically ఈ header attach అవుతుంది
5. 'Bearer' prefix - OAuth 2.0 standard authentication scheme
   - Server ఈ header check చేసి token validate చేస్తుంది
   - Invalid token -> 401 Unauthorized -> auto logout`
            },
            {
                code: `useEffect(() => {
    if (getCookie("userinfoCookie")) {
        reloadRoles(navigates, multitenant);
    } else {
        sessionStorage.removeItem("user-info");
        sessionStorage.removeItem("RolesFromDb");
        localStorage.removeItem("RolesFromDb");
    }
}, [children]);`,
                explanation: `Roles Reload on Route Change:
- [children] dependency - Route change అయినప్పుడు children (page component) change అవుతుంది
- ఇది trigger అయి reloadRoles call అవుతుంది
- reloadRoles:
  1. API call: /api/roles/permissions/?role_id=X&company_id=Y
  2. Latest permissions backend నుండి fetch
  3. sessionStorage & localStorage update
- Cookie లేకపోతే (session expired):
  - All stored data clear
  - User next render లో login page కి redirect అవుతాడు`
            },
            {
                code: `useEffect(() => {
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
        // ... 50+ more path checks
    }
}, []);`,
                explanation: `Route Permission Checking:
- Component mount అయినప్పుడు ఒకసారి execute (empty dependency [])
- location.pathname - Current URL check (example: "/employee-management")
- RolesFromDb?.modules?.ModuleName?.view - Optional chaining (?.) use చేసి safe access
  - ?. operator: Object null/undefined అయితే error throw చేయకుండా undefined return చేస్తుంది
  - Without ?.: RolesFromDb.modules.X.view - if modules is null -> ERROR
  - With ?.: RolesFromDb?.modules?.X?.view - if modules is null -> undefined (no error)
- view === false - Permission deny అయితే /notfound page కి redirect
- ప్రతి URL path కి separate if condition ఉంటుంది
- ఇది URL manually type చేసి unauthorized pages access చేయడం prevent చేస్తుంది`
            },
            {
                code: `return (
    <div id="wrapper" className={sideBar ? "toggled" : ""}>
        {!getCookie("userinfoCookie") ? (
            <Navigate to="/" />
        ) : (
            <>
                <TopHeader changesidebar={(data) => changesidebar(data)} />
                {children}
            </>
        )}
    </div>
);`,
                explanation: `Conditional Rendering:
1. Ternary operator (? :) use చేసి conditional render
2. !getCookie("userinfoCookie") - Cookie లేకపోతే (not logged in):
   - <Navigate to="/" /> - Login page కి redirect (React Router component)
3. Cookie ఉంటే (logged in):
   - <TopHeader /> - Navigation bar render
   - {children} - Actual page component render (Dashboard, Employee page, etc.)
4. Fragment (<> </>) - Extra div create చేయకుండా multiple elements return
5. changesidebar prop - Sidebar toggle function TopHeader కి pass
6. className "toggled" - Sidebar open/close CSS class toggle`
            }
        ]
    },
    {
        id: 5,
        title: "sessionLogout.js - Auto Logout & Role Reload",
        filePath: "src/sessionLogout.js",
        category: "Authentication Pages",
        description: "ఈ file లో 2 important functions ఉన్నాయి: SessionLogIn (auto logout) మరియు reloadRoles (permissions refresh). ఇవి entire application లో reuse అవుతాయి.",
        lineByLine: [
            {
                code: `import axios from "axios";
import ApiHeaders from "./Components/Common/ApiHeaders";

export function SessionLogIn(navigate) {
    sessionStorage.removeItem("user-info");
    sessionStorage.removeItem("RolesFromDb");
    localStorage.removeItem("RolesFromDb");
    sessionStorage.removeItem("personalImage");
    sessionStorage.removeItem("persnonalName");
    document.cookie = "userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "userinfoRoleInfo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "personalImage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "persnonalName=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
}`,
                explanation: `SessionLogIn - Forced Logout Function:
- export function - ఈ function ని other files లో import చేసి use చేయవచ్చు
- navigate parameter - useNavigate() hook value receive చేస్తుంది
- ఈ function API call 401 Unauthorized return చేసినప్పుడు call అవుతుంది

Usage Pattern (other files లో):
  try { await axios.get("/api/data/"); }
  catch (err) {
      if (err.response.status === 401) { SessionLogIn(navigate); }
  }

- delete axios.defaults.headers.common["Authorization"]
  - Authorization header remove చేస్తుంది
  - తర్వాత API calls token లేకుండా go అవుతాయి
- navigate("/") - Login page కి redirect`
            },
            {
                code: `export async function reloadRoles(navigate, multitenant) {
    var userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    let headers = {
        "X-CURRENT-COMPANY": userinfo.subdomain,
        "X-SELECTED-COMPANY": userinfo.subdomain,
        "x-system-ip-address": sessionStorage.getItem("SystemIpAddress") || ""
    };

    try {
        const response = await axios.get(
            \`/api/roles/permissions/?role_id=\${userinfo.roleID}&company_id=\${userinfo.data.id}\`,
            { headers: headers }
        );
        if (response.data) {
            sessionStorage.setItem("RolesFromDb", JSON.stringify(response.data));
            localStorage.setItem("RolesFromDb", JSON.stringify(response.data));
        }
    } catch (error) {
        console.log('not found');
    }
}`,
                explanation: `reloadRoles - Permissions Refresh Function:
- async function - API call await చేయడానికి
- PrivateRoute లో ప్రతి route change తర్వాత call అవుతుంది

Step 1: Current user info sessionStorage నుండి read
Step 2: Custom headers prepare:
  - X-CURRENT-COMPANY: User original company
  - X-SELECTED-COMPANY: Currently working company (multi-tenant)
  - x-system-ip-address: Audit trail కోసం IP address

Step 3: API Call
  - /api/roles/permissions/ endpoint
  - role_id: User role ID (ADMIN role ID, EMPLOYEE role ID, etc.)
  - company_id: Company ID
  - Backend ఈ role + company combination కి permissions return చేస్తుంది

Step 4: Response store
  - sessionStorage: Current tab session
  - localStorage: Persist (cookie recovery కోసం)

Step 5: Error handling
  - try/catch - Error అయితే catch block execute
  - PrivateRoute cookie check ద్వారా handle అవుతుంది`
            }
        ]
    },
    {
        id: 6,
        title: "storageUtils.js - Encryption System",
        filePath: "src/storageUtils.js",
        category: "Core Files",
        description: "ఈ file sessionStorage, localStorage, cookies ని automatically encrypt/decrypt చేస్తుంది. index.js లో import చేస్తే చాలు - అన్ని storage operations encrypted అవుతాయి.",
        lineByLine: [
            {
                code: `import CryptoJS from "crypto-js";
const SECRET_KEY = "3afb675c57a210ee0e06f84ba716d81c244ac8d7554846aa07f0686ec46b0ce0";`,
                explanation: `AES Encryption Secret Key:
- CryptoJS: JavaScript encryption library - AES, SHA, MD5 etc. algorithms support చేస్తుంది
- SECRET_KEY: 64 hex characters = 256-bit key
  - ఈ key తో encrypt చేసిన data same key తో మాత్రమే decrypt అవుతుంది
  - Production లో ఈ key secret గా ఉంచాలి
  - Environment variable లో store చేయడం better practice
- AES-256: Military grade encryption - currently unbreakable`
            },
            {
                code: `export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    try {
        if (!encryptedData) return null;
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) return null;
        return JSON.parse(decryptedText);
    } catch (error) {
        return null;
    }
};`,
                explanation: `Encrypt & Decrypt Functions:
encryptData:
  1. JSON.stringify(data) - Object/String ని JSON string గా convert
  2. CryptoJS.AES.encrypt() - AES algorithm తో encrypt
  3. .toString() - Encrypted data ని Base64 string గా convert
  Example: "Hello" -> "U2FsdGVkX19abc123xyz..."

decryptData:
  1. CryptoJS.AES.decrypt() - AES decrypt, returns WordArray
  2. .toString(CryptoJS.enc.Utf8) - WordArray ని UTF-8 string convert
  3. JSON.parse() - JSON string ని Object గా convert
  4. try/catch - Corrupted data or wrong key error handle
  Example: "U2FsdGVkX19abc..." -> "Hello"`
            },
            {
                code: `// Override sessionStorage.setItem
const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function (key, value) {
    const encryptedValue = encryptData(value);
    originalSetItem.call(sessionStorage, key, encryptedValue);
};

// Override sessionStorage.getItem
const originalGetItem = sessionStorage.getItem;
sessionStorage.getItem = function (key) {
    const encryptedData = originalGetItem.call(sessionStorage, key);
    return encryptedData ? decryptData(encryptedData) : null;
};`,
                explanation: `Method Override Pattern (Monkey Patching):
ఇది JavaScript యొక్క powerful feature - built-in methods ని replace చేయవచ్చు.

setItem Override:
  1. originalSetItem - Original function reference save చేయడం (backup)
  2. sessionStorage.setItem ని new function తో replace
  3. New function:
     - value ని encrypt చేసి
     - original function call చేసి encrypted value store
  4. .call(sessionStorage, ...) - 'this' context preserve చేయడం

getItem Override:
  1. Original function reference save
  2. New function:
     - Original function తో encrypted data read
     - Decrypt చేసి return
  3. Developer tools లో encrypted data కనిపిస్తుంది, but code లో normal data return అవుతుంది

Result:
  sessionStorage.setItem("name", "Prasad")
  // Actually stored: "U2FsdGVkX19..."
  sessionStorage.getItem("name")
  // Returns: "Prasad" (auto decrypted)`
            },
            {
                code: `(function () {
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(
        Document.prototype, 'cookie'
    );
    Object.defineProperty(document, 'cookie', {
        get: function () {
            // Decrypt userinfoCookie when reading
            const rawCookie = originalCookieDescriptor.get.call(document);
            return cookiePairs.map(pair => {
                if (name === 'userinfoCookie') {
                    const bytes = CryptoJS.AES.decrypt(val, SECRET_KEY);
                    return \`\${name}=\${bytes.toString(CryptoJS.enc.Utf8)}\`;
                }
                return pair;
            }).join('; ');
        },
        set: function (val) {
            // Encrypt userinfoCookie when setting
            if (val.startsWith('userinfoCookie=')) {
                const encrypted = CryptoJS.AES.encrypt(rawValue, SECRET_KEY).toString();
                originalCookieDescriptor.set.call(document,
                    \`userinfoCookie=\${encodeURIComponent(encrypted)}\`);
            } else {
                originalCookieDescriptor.set.call(document, val);
            }
        }
    });
})();`,
                explanation: `Cookie Encryption - Property Override:
- IIFE (Immediately Invoked Function Expression) - (function(){...})() - Define చేసిన వెంటనే execute
- Object.getOwnPropertyDescriptor - document.cookie యొక్క original getter/setter reference
- Object.defineProperty - document.cookie property ని custom getter/setter తో override

Cookie Set (setter):
  - document.cookie = "userinfoCookie=data" చేస్తే
  - data encrypt అయి "userinfoCookie=U2FsdGVkX19..." గా actual cookie లో store

Cookie Get (getter):
  - document.cookie read చేస్తే
  - userinfoCookie value decrypt అయి plain text return
  - Other cookies (theme, lang etc.) unchanged గా return

encodeURIComponent:
  - Encrypted string లో special characters (+, /, =) URL safe format కి convert
  - decodeURIComponent: Read చేసేటప్పుడు back convert`
            }
        ]
    },
    {
        id: 7,
        title: "ApiHeaders.js - Custom Headers",
        filePath: "src/Components/Common/ApiHeaders.js",
        category: "Core Files",
        description: "ప్రతి API call కి custom headers generate చేసే utility function. Multi-tenant support మరియు audit tracking కోసం use చేస్తారు.",
        lineByLine: [
            {
                code: `import { multitenantStore } from "../Common/useMultitenantStore";

const ApiHeaders = (multitenant) => {
    const userinfo = JSON.parse(sessionStorage.getItem("user-info"));
    const systemIp = sessionStorage.getItem("SystemIpAddress");

    let headers = {
        "x-system-ip-address": systemIp || "",
    };

    const isMyProfilePath = window.location.pathname === '/my-profile';

    if (userinfo && multitenant?.data) {
        headers = {
            ...headers,
            "X-CURRENT-COMPANY": userinfo.subdomain,
            "X-SELECTED-COMPANY": isMyProfilePath
                ? userinfo.subdomain
                : multitenant.data.subdomain,
        };
    } else {
        headers = {
            ...headers,
            "X-CURRENT-COMPANY": userinfo?.subdomain,
            "X-SELECTED-COMPANY": userinfo?.subdomain,
        };
    }
    return headers;
};

export default ApiHeaders;`,
                explanation: `ApiHeaders Function - Detailed:

Parameters:
  - multitenant: Redux state object (selected company info)

Headers Generated:
  1. x-system-ip-address: User machine IP - backend audit logs కోసం
     - || "" - IP available లేకపోతే empty string (fallback)

  2. X-CURRENT-COMPANY: User login చేసిన original company subdomain
     - ఇది always same ఉంటుంది (user belongs to this company)

  3. X-SELECTED-COMPANY: Currently viewing company subdomain
     - Multi-tenant: User వేరే company switch చేస్తే ఆ company subdomain
     - My Profile page: Always own company (isMyProfilePath check)
     - Single tenant: Same as X-CURRENT-COMPANY

Special Logic:
  - isMyProfilePath check: /my-profile page లో ఉన్నప్పుడు always own company data show
    - ఎందుకంటే profile personal data - switch చేసిన company data కాదు
  - Spread operator (...headers): Previous headers preserve చేసి new headers add
  - Ternary (? :): isMyProfilePath true అయితే userinfo.subdomain, else multitenant subdomain

Usage:
  const headers = ApiHeaders(multitenant);
  axios.get("/api/data/", { headers });`
            }
        ]
    },
    {
        id: 8,
        title: "Redux Store, Actions & Reducers",
        filePath: "src/Redux/store.js, actions.js, reducers.js",
        category: "State Management",
        description: "Redux state management files. Company selection multi-tenant feature కోసం use చేస్తారు. localStorage persist pattern implement చేయబడింది.",
        lineByLine: [
            {
                code: `// actions.js
export const SELECTED_COMPANYS = 'SELECTED_COMPANYS';
export const LOGOUT = 'LOGOUT';

export const SELECTED_COMPANY = (data) => ({
    type: SELECTED_COMPANYS,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT,
});`,
                explanation: `Redux Actions:
- Action = { type: string, payload: data } - State change intention describe చేసే plain object
- Action Type Constants:
  - SELECTED_COMPANYS: Company select action type string
  - LOGOUT: Logout action type string
  - Constants use చేయడం ద్వారా typo errors prevent అవుతాయి

- Action Creators (Functions that return action objects):
  - SELECTED_COMPANY(data): Company data payload తో action object return
    - data = { subdomain: "company1", name: "Company One", ... }
  - logout(): Payload లేకుండా logout action return

Usage:
  dispatch(SELECTED_COMPANY(companyData));  // Company switch
  dispatch(logout());                        // Clear state`
            },
            {
                code: `// reducers.js
import { SELECTED_COMPANYS, LOGOUT } from './actions';

const initialState = { data: [] };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_COMPANYS:
            return { ...state, data: action.payload };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default rootReducer;`,
                explanation: `Redux Reducer:
- Reducer = Pure function - current state + action input, new state output
- Pure function: Same input -> always same output, no side effects
- state = initialState - First time call అయినప్పుడు default state
- switch(action.type) - Action type based different state changes

Cases:
  1. SELECTED_COMPANYS:
     - ...state - Spread operator - existing state copy (immutability)
     - data: action.payload - data field new value తో update
     - Return: New state object (React detects change -> re-render)

  2. LOGOUT:
     - return initialState - State ని initial empty state కి reset
     - Company selection clear అవుతుంది

  3. default:
     - Unknown action type -> state change చేయకుండా same state return`
            },
            {
                code: `// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        localStorage.setItem('reduxState', JSON.stringify(state));
    } catch (error) { }
};

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;`,
                explanation: `Redux Store with Persistence:

loadState():
  - localStorage నుండి saved state read
  - JSON.parse - String ని object convert
  - undefined return అయితే reducer initialState use చేస్తుంది
  - try/catch - Corrupted data error handle

saveState(state):
  - State ని JSON string convert చేసి localStorage లో save
  - Page refresh అయినా data persist అవుతుంది

createStore(rootReducer, persistedState):
  - Redux store create
  - rootReducer: State changes handle చేసే function
  - persistedState: Initial state (localStorage నుండి)

store.subscribe():
  - State change అయినప్పుడు callback function execute
  - ప్రతి dispatch తర్వాత saveState call అవుతుంది
  - Real-time localStorage sync

Flow:
  1. Page load -> loadState() -> localStorage read
  2. Store create with saved state
  3. User company switch -> dispatch -> reducer -> new state
  4. subscribe callback -> saveState() -> localStorage update
  5. Page refresh -> Step 1 (state preserved)`
            }
        ]
    },
    {
        id: 9,
        title: "MoreSection.js - Services Grid Page",
        filePath: "src/Components/Dashboard/MoreSection.js",
        category: "Layout Components",
        description: "More menu page - application లో available services ని cards గా display చేస్తుంది. Role-based filtering తో user కి access ఉన్న services మాత్రమే show అవుతాయి.",
        lineByLine: [
            {
                code: `const services = [
    { name: "Mobile Tracking", icon: "fa fa-street-view",
      path: "/mobiletrack-rules", moduleKey: "MobileTracking" },
    { name: "Calendar", icon: "fa fa-calendar-o",
      path: "/calendar", moduleKey: "Calendar" },
    { name: "Task Management", icon: "fa fa-pie-chart",
      path: "/task-management-dashboard", moduleKey: "TaskManagement" },
    // ... more services
];`,
                explanation: `Services Array - Static Configuration:
- ప్రతి service ఒక object: { name, icon, path, moduleKey }
  - name: Display name (UI లో show అవుతుంది)
  - icon: Font Awesome icon class (fa fa-calendar-o)
  - path: Navigate చేయాల్సిన route ("/calendar")
  - moduleKey: RolesFromDb లో permission check చేయడానికి key ("Calendar")
- ఈ array application available services define చేస్తుంది
- New service add చేయాలంటే ఈ array లో object add చేస్తే చాలు`
            },
            {
                code: `let allowedServices = services.filter(service => {
    const key = service.moduleKey;

    if (service.name === "CCTV Registration") {
        return userInfos?.roles?.[0] === "ADMIN";
    }

    if (key === "Offboarding") {
        const offModule = RolesFromDb?.modules?.Offboarding;
        if (!offModule?.view) return false;
        const offSub = offModule.submodules;
        return Boolean(
            offSub?.ExitSettings?.view ||
            offSub?.OffboardingListing?.view ||
            offSub?.NOCApproval?.view
        );
    }

    return RolesFromDb?.modules?.[key]?.view === true;
});`,
                explanation: `Permission-Based Filtering:
- .filter() - Array method. Condition true return చేసిన items మాత్రమే new array లో ఉంటాయి
- callback function ప్రతి service కి execute అవుతుంది

Special Cases:
  1. CCTV Registration: Role check - ADMIN role మాత్రమే access
     - userInfos?.roles?.[0] - First role check ("ADMIN", "EMPLOYEE", etc.)

  2. Offboarding: Complex permission - module view + any submodule view
     - offModule?.view check first
     - Then any one of ExitSettings, OffboardingListing, NOCApproval view true
     - Boolean() - truthy/falsy value ని true/false convert

  3. General: RolesFromDb?.modules?.[key]?.view === true
     - [key] - Dynamic property access. key = "Calendar" అయితే modules.Calendar
     - ?.view - Safe access with optional chaining
     - === true - Strict equality check (not just truthy)`
            },
            {
                code: `allowedServices = allowedServices.map(service => {
    if (service.name === "Performance Management") {
        if (HRObjectivesshow) service.path = "/pm-object";
        else if (ManagerObjectivesshow) service.path = "/objectives-list";
        else service.path = null;
    }
    if (service.name === "Time Sheet") {
        if (SendTimeSheetViewShow && userInfos.roles[0] !== "EMPLOYEE")
            service.path = '/sendAdminTimesheetToEmp';
        else if (EmployeeTimeSheet)
            service.path = '/employeeTimesheetView';
        else service.path = null;
    }
    return service;
}).filter(service => service.path);`,
                explanation: `Dynamic Path Assignment + Cleanup:
.map() - ప్రతి service transform చేయడం (path modify)

Performance Management:
  - HR permission ఉంటే: HR objectives page (/pm-object)
  - Manager permission ఉంటే: Manager objectives (/objectives-list)
  - ఏమీ లేకపోతే: path = null (access deny)

Time Sheet:
  - Admin + SendTimeSheet permission: Admin timesheet page
  - Employee permission: Employee timesheet view
  - Role check: userInfos.roles[0] !== "EMPLOYEE" - Employee కాకపోతే admin pages

.filter(service => service.path):
  - path = null ఉన్న services remove
  - Chaining: .map().filter() - First transform, then filter
  - Result: Only accessible services with correct paths`
            },
            {
                code: `<Row xs={1} sm={2} md={3} lg={3} xl={4} xxl={5} className="g-4">
    {allowedServices.map(service => (
        <Col key={service.name}>
            <Card className="h-100 text-center shadow-sm"
                style={{ borderRadius: "1.25rem", cursor: "pointer" }}
                onClick={() => {
                    service.path && navigate(service.path);
                    setQuickAccess(service);
                }}>
                <Card.Body>
                    <i className={service.icon}
                        style={{ fontSize: "2.4rem", color: "#f58220" }} />
                    <Card.Text className="fw-semibold mt-2">
                        {service.name}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>`,
                explanation: `Responsive Grid UI:
Row props - Responsive breakpoints:
  - xs={1}: Mobile (0-576px) - 1 card per row
  - sm={2}: Small (576-768px) - 2 cards per row
  - md={3}: Medium (768-992px) - 3 cards per row
  - xl={4}: Large (1200-1400px) - 4 cards per row
  - xxl={5}: Extra large (1400px+) - 5 cards per row
  - g-4: Gap/gutter between cards (Bootstrap spacing)

.map() rendering:
  - key={service.name}: React reconciliation unique key
  - Card onClick: service.path && navigate - path ఉంటే navigate, null అయితే nothing
  - setQuickAccess(service): Context API ద్వారా quick access track
  - Card.Body: Card content area
  - <i className={service.icon}> - Font Awesome icon render
  - Card.Text: Service name display`
            }
        ]
    },
    {
        id: 10,
        title: "Zustand Store & Context API Files",
        filePath: "src/Components/Common/useMultitenantStore.js, AuthContext.js, ThemeContext.js, QuickAccessContext.js",
        category: "State Management",
        description: "Zustand store మరియు React Context files. ఇవి components మధ్య data share చేయడానికి use చేస్తారు. Redux కంటే simple alternatives.",
        lineByLine: [
            {
                code: `// useMultitenantStore.js - Zustand Store
import create from 'zustand';

const useMultitenantStore = create((set) => ({
    companyDetails: null,
    userInfo: null,
    setCompanyDetails: (details) => set({ companyDetails: details }),
    setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useMultitenantStore;
export const multitenantStore = useMultitenantStore;`,
                explanation: `Zustand Store:
- create() - Zustand store create చేసే function
- set parameter - State update చేసే function (reducer alternative)
- Object return:
  - companyDetails: null - Initial state
  - userInfo: null - Initial state
  - setCompanyDetails: State update function. set({ companyDetails: details }) call చేస్తే state update
  - setUserInfo: Shorthand - { userInfo } = { userInfo: userInfo }

Zustand vs Redux:
  - Redux: createStore + actions + reducers + Provider + useSelector + useDispatch
  - Zustand: create() + useStore hook - Done!
  - Zustand: Provider wrap చేయనవసరం లేదు
  - Zustand: Boilerplate code చాలా తక్కువ

Usage:
  // Component లో
  const { userInfo, setUserInfo } = useMultitenantStore();
  setUserInfo(data);  // State update - auto re-render

  // Outside React (ApiHeaders.js లో)
  const userInfo = multitenantStore.getState().userInfo;`
            },
            {
                code: `// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [password, setPassword] = useState("");
    return (
        <AuthContext.Provider value={{ password, setPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);`,
                explanation: `Auth Context:
- createContext() - Context object create
- AuthProvider: Provider component - children ని wrap చేస్తుంది
- value={{ password, setPassword }}: ఈ values wrapped components access చేయగలవు
- useAuth: Custom hook - useContext(AuthContext) short form

Usage:
  // App.js లో wrap
  <AuthProvider>
    <LoginForm />
  </AuthProvider>

  // LoginForm.js లో use
  const { setPassword } = useAuth();
  setPassword("user_password");  // Login time store

  // Other component లో read
  const { password } = useAuth();

Purpose: Login password temporary గా store - password change feature కోసం`
            },
            {
                code: `// ThemeContext.js
import { createContext, useState } from 'react';

const initialState = {
    companyName: "",
    isFinalApprovalEnabled: false,
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(initialState);
    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalContext.Provider>
    );
};`,
                explanation: `Global Context (Theme Context):
- initialState object: Application-wide settings
  - companyName: Current company name display కోసం
  - isFinalApprovalEnabled: Leave/Attendance final approval feature toggle
- GlobalProvider: App.js లో entire application wrap చేస్తుంది
- globalState: Object state - multiple values single state లో

Usage:
  const { globalState, setGlobalState } = useContext(GlobalContext);

  // Read
  console.log(globalState.companyName);

  // Update (spread to preserve other values)
  setGlobalState(prev => ({ ...prev, companyName: "New Company" }));`
            },
            {
                code: `// QuickAccessContext.js
import { createContext, useState, useEffect } from "react";

export const QuickAccessContext = createContext();

export const QuickAccessProvider = ({ children }) => {
    const [quickAccess, setQuickAccess] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("quickAccess");
        if (stored) setQuickAccess(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (quickAccess) {
            localStorage.setItem("quickAccess", JSON.stringify(quickAccess));
        } else {
            localStorage.removeItem("quickAccess");
        }
    }, [quickAccess]);

    return (
        <QuickAccessContext.Provider value={{ quickAccess, setQuickAccess }}>
            {children}
        </QuickAccessContext.Provider>
    );
};`,
                explanation: `Quick Access Context - localStorage Persist:
- quickAccess: Last accessed service info store

useEffect 1 (mount):
  - Component load అయినప్పుడు localStorage నుండి saved data read
  - JSON.parse: String ని object convert
  - MoreSection లో last clicked service restore

useEffect 2 (quickAccess change):
  - quickAccess update అయినప్పుడు localStorage sync
  - null అయితే localStorage నుండి remove
  - Page refresh అయినా last access info persist

MoreSection.js లో usage:
  const { setQuickAccess } = useContext(QuickAccessContext);
  // Card click చేసినప్పుడు
  onClick={() => setQuickAccess(service)};`
            }
        ]
    }
];

const categoryColors = {
    "Core Files": "#e74c3c",
    "Authentication Pages": "#3498db",
    "Layout Components": "#2ecc71",
    "State Management": "#9b59b6",
};

const PageWiseCodeGuide = () => {
    const [expandedPage, setExpandedPage] = useState(null);
    const [expandedSection, setExpandedSection] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    const categories = ["All", ...new Set(pages.map(p => p.category))];

    const filteredPages = pages.filter(page => {
        const matchesCategory = selectedCategory === "All" || page.category === selectedCategory;
        const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.filePath.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleSection = (pageId, sectionIndex) => {
        const key = `${pageId}-${sectionIndex}`;
        setExpandedSection(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const expandAll = (pageId, sections) => {
        const newState = {};
        sections.forEach((_, idx) => {
            newState[`${pageId}-${idx}`] = true;
        });
        setExpandedSection(prev => ({ ...prev, ...newState }));
    };

    const collapseAll = (pageId, sections) => {
        const newState = {};
        sections.forEach((_, idx) => {
            newState[`${pageId}-${idx}`] = false;
        });
        setExpandedSection(prev => ({ ...prev, ...newState }));
    };

    return (
        <section id="content-wrapper">
            <div className='MyMarginCls'></div>
            <Container fluid className='rounded' style={{ background: "#edf0f5", minHeight: "81vh", overflowY: "auto", padding: "2rem" }}>

                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h2 style={{ color: "#2c3e50", fontWeight: "bold" }}>
                        Bharat Payroll - Page-Wise Code Guide
                    </h2>
                    <p style={{ color: "#7f8c8d", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                        Project Pages - Line by Line Code Explanation (Telugu)
                    </p>
                    <p style={{ color: "#95a5a6", fontSize: "0.95rem" }}>
                        Freshers & Interns - ila project code chadivi ardham cheskondi
                    </p>
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
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <input
                        type="search"
                        placeholder="Search pages or file paths..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%", padding: "10px 16px", borderRadius: "8px",
                            border: "1px solid #ddd", marginBottom: "1.5rem", fontSize: "1rem"
                        }}
                    />

                    <p style={{ color: "#95a5a6", textAlign: "center", marginBottom: "1rem" }}>
                        Showing {filteredPages.length} of {pages.length} pages
                    </p>

                    {filteredPages.map((page, pageIndex) => (
                        <div key={page.id} style={{
                            marginBottom: "16px", borderRadius: "10px",
                            border: expandedPage === page.id ? "2px solid #2980b9" : "1px solid #e0e0e0",
                            overflow: "hidden", background: "#fff",
                            boxShadow: expandedPage === page.id ? "0 4px 15px rgba(41,128,185,0.2)" : "0 1px 3px rgba(0,0,0,0.08)",
                        }}>
                            <div
                                onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
                                style={{
                                    padding: "18px 20px", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    background: expandedPage === page.id ? "#f0f7ff" : "#fff",
                                    borderBottom: expandedPage === page.id ? "1px solid #e0e0e0" : "none"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                                    <span style={{
                                        background: categoryColors[page.category] || "#3498db",
                                        color: "#fff", borderRadius: "50%",
                                        width: "36px", height: "36px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.9rem", fontWeight: "bold", flexShrink: 0
                                    }}>
                                        {pageIndex + 1}
                                    </span>
                                    <div>
                                        <div style={{ fontWeight: "600", fontSize: "1.05rem", color: "#2c3e50" }}>
                                            {page.title}
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "#7f8c8d", fontFamily: "monospace" }}>
                                            {page.filePath}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{
                                        padding: "3px 12px", borderRadius: "12px", fontSize: "0.75rem",
                                        border: `1px solid ${categoryColors[page.category] || "#3498db"}`,
                                        color: categoryColors[page.category] || "#3498db", fontWeight: "500"
                                    }}>
                                        {page.category}
                                    </span>
                                    <span style={{ fontSize: "1.2rem", color: "#95a5a6" }}>
                                        {expandedPage === page.id ? "\u2303" : "\u2304"}
                                    </span>
                                </div>
                            </div>

                            {expandedPage === page.id && (
                                <div style={{ padding: "20px" }}>
                                    <div style={{
                                        background: "#eaf6ff", borderRadius: "8px",
                                        padding: "16px", marginBottom: "16px"
                                    }}>
                                        <p style={{ color: "#2980b9", fontWeight: "bold", marginBottom: "8px", fontSize: "1rem" }}>
                                            Page Overview:
                                        </p>
                                        <p style={{ color: "#333", lineHeight: "1.7", margin: 0 }}>
                                            {page.description}
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                        <p style={{ color: "#2c3e50", fontWeight: "bold", margin: 0 }}>
                                            Code Sections ({page.lineByLine.length})
                                        </p>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button
                                                onClick={() => expandAll(page.id, page.lineByLine)}
                                                style={{
                                                    padding: "4px 12px", borderRadius: "4px",
                                                    border: "1px solid #3498db", background: "#fff",
                                                    color: "#3498db", cursor: "pointer", fontSize: "0.8rem"
                                                }}>
                                                Expand All
                                            </button>
                                            <button
                                                onClick={() => collapseAll(page.id, page.lineByLine)}
                                                style={{
                                                    padding: "4px 12px", borderRadius: "4px",
                                                    border: "1px solid #95a5a6", background: "#fff",
                                                    color: "#95a5a6", cursor: "pointer", fontSize: "0.8rem"
                                                }}>
                                                Collapse All
                                            </button>
                                        </div>
                                    </div>

                                    {page.lineByLine.map((section, sectionIdx) => {
                                        const isExpanded = expandedSection[`${page.id}-${sectionIdx}`];
                                        return (
                                            <div key={sectionIdx} style={{
                                                marginBottom: "10px", borderRadius: "8px",
                                                border: "1px solid #e8e8e8", overflow: "hidden"
                                            }}>
                                                <div
                                                    onClick={() => toggleSection(page.id, sectionIdx)}
                                                    style={{
                                                        padding: "10px 16px", cursor: "pointer",
                                                        background: isExpanded ? "#f8f9fa" : "#fff",
                                                        display: "flex", alignItems: "center", gap: "10px",
                                                        borderBottom: isExpanded ? "1px solid #e8e8e8" : "none"
                                                    }}
                                                >
                                                    <span style={{
                                                        background: "#27ae60", color: "#fff",
                                                        borderRadius: "50%", width: "24px", height: "24px",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: "0.7rem", fontWeight: "bold", flexShrink: 0
                                                    }}>
                                                        {sectionIdx + 1}
                                                    </span>
                                                    <pre style={{
                                                        margin: 0, fontSize: "0.82rem", color: "#555",
                                                        fontFamily: "'Fira Code', 'Consolas', monospace",
                                                        whiteSpace: "nowrap", overflow: "hidden",
                                                        textOverflow: "ellipsis", flex: 1
                                                    }}>
                                                        {section.code.split('\n')[0].trim()}
                                                    </pre>
                                                    <span style={{ fontSize: "1rem", color: "#95a5a6", flexShrink: 0 }}>
                                                        {isExpanded ? "\u2303" : "\u2304"}
                                                    </span>
                                                </div>

                                                {isExpanded && (
                                                    <div>
                                                        <div style={{
                                                            background: "#1e1e1e", padding: "16px",
                                                            overflow: "auto"
                                                        }}>
                                                            <pre style={{
                                                                color: "#d4d4d4", margin: 0, fontSize: "0.82rem",
                                                                lineHeight: "1.6",
                                                                fontFamily: "'Fira Code', 'Consolas', monospace",
                                                                whiteSpace: "pre-wrap", wordBreak: "break-word"
                                                            }}>
                                                                {section.code}
                                                            </pre>
                                                        </div>
                                                        <div style={{
                                                            background: "#fffbea", padding: "16px",
                                                            borderTop: "2px solid #f39c12"
                                                        }}>
                                                            <p style={{ color: "#e67e22", fontWeight: "bold", marginBottom: "8px", fontSize: "0.9rem" }}>
                                                                Telugu Explanation:
                                                            </p>
                                                            <div style={{
                                                                color: "#333", lineHeight: "1.9",
                                                                whiteSpace: "pre-line", fontSize: "0.9rem"
                                                            }}>
                                                                {section.explanation}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button
                        onClick={() => navigate("/project-tutorial")}
                        style={{
                            padding: "10px 24px", borderRadius: "8px",
                            border: "2px solid #3498db", background: "#fff",
                            color: "#3498db", cursor: "pointer", fontSize: "1rem",
                            fontWeight: "500"
                        }}
                    >
                        View Concept-Wise Topics
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default PageWiseCodeGuide;
