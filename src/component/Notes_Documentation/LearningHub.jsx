import React, { useMemo, useState } from "react";
import "./LearningHub.css";

const lines = (items) => items.join("\n");

const folderRows = [
  { name: "Components", files: 580, purpose: "Main HRMS product area: dashboards, employees, attendance, leave, settings, task management, onboarding, and other HR workflows.", stores: "React pages, shared components, feature folders, CSS imports, charts, forms, and local helper modules." },
  { name: "PayrollComponents", files: 219, purpose: "Payroll-specific product area separated from the HRMS screens.", stores: "Payroll dashboards, employee payroll pages, reports, payroll setup, payslip customization, run payroll screens, and payroll sign-up/login." },
  { name: "routes", files: 10, purpose: "Central route grouping for React Router v6.", stores: "Route group files, lazy route component exports, and route aggregation." },
  { name: "Redux", files: 3, purpose: "Global Redux store for selected company, employee details, setup progress, and shared header triggers.", stores: "store.js, reducers.js, actions.js." },
  { name: "Context", files: 3, purpose: "Small app-wide contexts outside the Common folder.", stores: "Theme/global context, tutorial video modal context, and an older reducer file." },
  { name: "images", files: 235, purpose: "Static visual assets used by dashboard cards, login pages, profile fallbacks, and module icons.", stores: "PNG, JPG, GIF, SVG, WebP, and MP4 assets." },
  { name: "vendor", files: 3536, purpose: "Bundled third-party legacy assets used by the template.", stores: "jQuery plugins, CKEditor assets, chart libraries, datepicker files, CSS, JS, fonts." },
  { name: "fonts", files: 4, purpose: "Font files used by bundled UI assets.", stores: "Slick carousel font files." },
];

const componentModuleRows = [
  ["AnimationsForText", 1], ["Announcement", 4], ["Attendance", 3], ["Breport", 1], ["BulkUpload", 1],
  ["Common", 19], ["CompanyProfile", 1], ["CostCenter", 1], ["Dashboard", 59], ["DataMapping", 1],
  ["DynamivReport", 1], ["EimAdmin", 48], ["Employee", 23], ["KredilyAttendance", 64],
  ["LeaveManagement", 25], ["LMangement", 26], ["Login", 22], ["ManualAttandence", 2],
  ["MobileTracker", 7], ["MonthlyCheckin", 1], ["MonthlyKRA", 19], ["MyProfile", 54],
  ["NewFeaturesList", 3], ["OffBoarding", 19], ["OnBoarding", 1], ["Organization", 1],
  ["PerformanceManagement", 35], ["ReactIcons", 1], ["Referral", 14], ["ReleaseNotes", 1],
  ["RoleadminNav", 1], ["savingDeclaration", 8], ["Settings", 36], ["SetupWizard", 2],
  ["SignUp", 5], ["StyleComponet", 1], ["Subscriptions", 10], ["SystemTrack", 4],
  ["TaskManagment", 30], ["TrackSystem", 4], ["UseContext", 1], ["UserLogin", 1], ["WorkFromHome", 6],
];

const payrollModuleRows = [
  ["Dashboard", 8], ["Employee", 23], ["EsiComplianceDate", 1], ["MyProfile", 23], ["OrganizationSetup", 17],
  ["PayrollComponents", 9], ["Payrollmaster", 1], ["payrollNav", 1], ["PayrollReimbursement", 1],
  ["PayrollReports", 47], ["PayrollReportsNew", 47], ["PayrollSavingDeclaration", 7], ["PayrollSettings", 2],
  ["PayrollStructure", 2], ["PayslipCustom", 12], ["RunPayroll", 2], ["SignUp", 6],
  ["Subscriptionspayroll", 7], ["Watermark", 1],
];

const snippets = {
  indexAxios: lines([
    "import axios from \"axios\";",
    "import { Provider } from 'react-redux';",
    "import store from './Redux/store';",
    "import \"./storageUtils\";",
    "",
    "let host = window.location.host",
    "// axios.defaults.baseURL = process.env.REACT_APP_DEV_IP_ADDRESS;",
    "// axios.defaults.baseURL = 'https://pss.indianpayrollservice.com/qxbox/';",
    "// axios.defaults.baseURL = 'https://pssqa.bharatpayroll.com/qxbox/';",
    "axios.defaults.baseURL = 'https://pai.bharatpayroll.com/qxbox/';",
    "if (host.includes(\"whytelglobal.com\") || host.includes(\"indianpayroll.co.in\") || host.includes(\"indianhr.in\") || host.includes(\"indianpayrollservice.com\") || host.includes(\"bharatpayroll.com\")) {",
    "    axios.defaults.baseURL = `${window.location.origin}/qxbox/`",
    "}",
    "axios.defaults.headers.post[\"Content-Type\"] = \"application/json\";",
    "axios.defaults.headers.post[\"Accept\"] = \"application/json\";",
    "const root = ReactDOM.createRoot(document.getElementById(\"root\"));",
    "root.render(",
    "    <Provider store={store}>",
    "        <App />",
    "    </Provider>",
    ");",
  ]),
  appProviders: lines([
    "return (",
    "  <GlobalProvider>",
    "    <VideoModalProvider>",
    "      <QuickAccessProvider>",
    "        <AuthProvider>",
    "          <BrowserRouter>",
    "            <Suspense fallback={<div>   <div id=\"initial-loader\">",
    "              <img src=\"/favicon-phr_1.png\" id=\"MyLoader\" alt=\"MyLoader\" style={{ width: \"150px\", height: \"150px\" }} />",
    "              </div></div>}> ",
    "              <Routes>",
    "                {getDashboardRoutes({ routes: routeComponentsData })}",
    "                {getAuthRoutes({ routes: routeComponentsData })}",
    "                {getHRMSRoutes({ routes: routeComponentsData })}",
    "                {getAttendanceRoutes({ routes: routeComponentsData })}",
    "                {getLeaveRoutes({ routes: routeComponentsData })}",
    "                {getSettingsRoutes({ routes: routeComponentsData })}",
    "                {getReportsRoutes({ routes: routeComponentsData })}",
    "                {getPayrollRoutes({ routes: routeComponentsData })}",
    "              </Routes> ",
    "            </Suspense>",
    "          </BrowserRouter>",
    "        </AuthProvider>",
    "      </QuickAccessProvider>",
    "    </VideoModalProvider>",
    "  </GlobalProvider>",
    ");",
  ]),
  routeGroups: lines([
    "export { getDashboardRoutes } from \"./DashboardRoutes.jsx\";",
    "export { getAuthRoutes } from \"./AuthRoutes.jsx\";",
    "export { getHRMSRoutes } from \"./HRMSRoutes.jsx\";",
    "export { getAttendanceRoutes } from \"./AttendanceRoutes.jsx\";",
    "export { getLeaveRoutes } from \"./LeaveRoutes.jsx\";",
    "export { getSettingsRoutes } from \"./SettingsRoutes.jsx\";",
    "export { getReportsRoutes } from \"./ReportsRoutes.jsx\";",
    "export { getPayrollRoutes } from \"./PayrollRoutes.jsx\";",
  ]),
  routeComponents: lines([
    "import { lazy } from \"react\";",
    "",
    "// Wrap all component imports with lazy",
    "export const ResetPassword = lazy(() => import(\"../Components/Login/ResetPassword.js\"));",
    "export const Dashboard = lazy(() => import(\"../Components/Dashboard/Dashboard.js\"));",
    "export const Department = lazy(() => import(\"../Components/EimAdmin/Department/Department.js\"));",
    "export const PrivateRoute = lazy(() => import('../Privaterote.js'));",
    "export const PrivateRoutePayroll = lazy(() => import(\"../PrivateRoutepayroll.js\"));",
    "export const ShowManagersAllHierarchyView = lazy(() => import(\"../Components/Dashboard/ShowManagersAllHierarchyView.js\"));",
  ]),
  dashboardRoutes: lines([
    "export const getDashboardRoutes = ({ routes }) => (",
    "  <>",
    "    <Route path='/' element={<routes.LoginForm />} />",
    "    <Route path='/moreSection' element={<routes.PrivateRoute><routes.MoreSection /></routes.PrivateRoute>} />",
    "    <Route path='/task-management-dashboard' element={<routes.PrivateRoute><routes.TaskManagementDashboardView /></routes.PrivateRoute>}></Route>",
    "    <Route path='/task-management' element={<routes.PrivateRoute><routes.TaskManagementView /></routes.PrivateRoute>}></Route>",
    "    <Route path={`/project-detail-view`} element={<routes.PrivateRoute><routes.ProjectDetailsView /></routes.PrivateRoute>}></Route>",
    "    <Route path='/mobiletrack-rules' element={<routes.PrivateRoute><routes.TrackmobileRulesTabs /></routes.PrivateRoute>} />",
    "  </>",
    ");",
  ]),
  reportsHierarchyRoutes: lines([
    "<Route path='/organization-hierarchy' element={<routes.PrivateRoute><routes.OrganizationHierarchy /></routes.PrivateRoute>}></Route>",
    "<Route path='/showmanagerallhierarchy/:manager_id' element={<routes.PrivateRoute><routes.ShowManagersAllHierarchyView /></routes.PrivateRoute>}></Route>",
    "<Route path='/showmanagerallhierarchy' element={<routes.PrivateRoute><routes.ShowManagersAllHierarchyView /></routes.PrivateRoute>}></Route>",
  ]),
  privateRouteAuth: lines([
    "let token;",
    "if (getCookie(\"userinfoCookie\")) {",
    "    var tempobject = getCookie(\"userinfoCookie\");",
    "    tempobject = JSON.parse(tempobject)",
    "    ",
    "    token = tempobject.token.access",
    "    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }",
    "}",
    "",
    "return (",
    "    <div id=\"wrapper\" className={sideBar ? \"toggled\" :\"\"}>",
    "        {!getCookie(\"userinfoCookie\") ? <><Navigate to=\"/\" /></> : ",
    "        <> ",
    "            <TopHeader changesidebar={(data)=>changesidebar(data)} />",
    "            {children}",
    "        </>",
    "        }",
    "</div>)",
  ]),
  apiHeaders: lines([
    "const ApiHeaders = (multitenant) => {",
    "  const userinfo = JSON.parse(sessionStorage.getItem(\"user-info\"));",
    "  const systemIp = sessionStorage.getItem(\"SystemIpAddress\");",
    "  let headers = {",
    "    \"x-system-ip-address\": systemIp || \"\",",
    "  };",
    "  const isMyProfilePath = window.location.pathname === '/my-profile';",
    "",
    "  if (userinfo && multitenant?.data) {",
    "    headers = {",
    "      ...headers,",
    "      \"X-CURRENT-COMPANY\": userinfo.subdomain,",
    "      \"X-SELECTED-COMPANY\": isMyProfilePath ? userinfo.subdomain : multitenant.data.subdomain,",
    "    };",
    "  } else {",
    "    headers = {",
    "      ...headers,",
    "      \"X-CURRENT-COMPANY\": userinfo?.subdomain,",
    "      \"X-SELECTED-COMPANY\": isMyProfilePath ? userinfo.subdomain : userinfo?.subdomain,",
    "    };",
    "  }",
    "  return headers;",
    "};",
  ]),
  reduxStore: lines([
    "import { createStore } from 'redux';",
    "import rootReducer from './reducers';",
    "",
    "const loadState = () => {",
    "    try {",
    "        const serializedState = localStorage.getItem('reduxState');",
    "        return serializedState ? JSON.parse(serializedState) : undefined;",
    "    } catch (error) {",
    "        console.error('Error loading state from localStorage', error);",
    "        return undefined;",
    "    }",
    "};",
    "",
    "const persistedState = loadState();",
    "const store = createStore(rootReducer, persistedState);",
    "",
    "store.subscribe(() => {",
    "    saveState(store.getState());",
    "});",
  ]),
  reduxReducer: lines([
    "const initialState = {",
    "    data: [],",
    "    employeeDetails: loadSessionEmployeeDetails(),",
    "    setupProgress: {",
    "        progressData: null,",
    "        loading: false,",
    "        error: '',",
    "    },",
    "    multitenantStore: {",
    "        companyDetails: null,",
    "        userInfo: null,",
    "    },",
    "    companyHeader: {",
    "        triggerApi: false,",
    "    },",
    "};",
    "",
    "const rootReducer = (state = initialState, action) => {",
    "    switch (action.type) {",
    "        case SELECTED_COMPANYS:",
    "            return { ...state, data: action.payload };",
    "        case SET_EMPLOYEE_DETAILS:",
    "            return { ...state, employeeDetails: action.payload ? { workInfo: action.payload.workInfo } : null };",
    "        case SET_COMPANY_HEADER_TRIGGER_API:",
    "            return { ...state, companyHeader: { triggerApi: action.payload } };",
    "        case LOGOUT:",
    "            return initialState;",
    "        default:",
    "            return state;",
    "    }",
    "};",
  ]),
  quickAccess: lines([
    "export const QuickAccessProvider = ({ children }) => {",
    "    const [quickAccess, setQuickAccess] = useState(null);",
    "",
    "    useEffect(() => {",
    "        const stored = localStorage.getItem(\"quickAccess\");",
    "        if (stored) setQuickAccess(JSON.parse(stored));",
    "    }, []);",
    "",
    "    useEffect(() => {",
    "        if (quickAccess) {",
    "            localStorage.setItem(\"quickAccess\", JSON.stringify(quickAccess));",
    "        } else {",
    "            localStorage.removeItem(\"quickAccess\"); ",
    "        }",
    "    }, [quickAccess]);",
    "",
    "    return (",
    "        <QuickAccessContext.Provider value={{ quickAccess, setQuickAccess }}>",
    "            {children}",
    "        </QuickAccessContext.Provider>",
    "    );",
    "};",
  ]),
  moreServices: lines([
    "const services = [",
    "    { name: \"Mobile Tracking\", icon: `${MobileTracking}`, path: \"/mobiletrack-rules\", moduleKey: \"MobileTracking\" },",
    "    { name: \"Calendar\", icon: `${Calendar}`, path: \"/calendar\", moduleKey: \"Calendar\" },",
    "    { name: \"Task Management\", icon: `${TaskManagement}`, path: \"/task-management-dashboard\", moduleKey: \"TaskManagement\" },",
    "    { name: \"Organization Hierarchy\", icon: `${AdminOrganizationHierarchy}`, path: \"/organization-hierarchy\", moduleKey: \"Dashboard\" },",
    "    { name: \"Admin Organization Hierarchy\", icon: `${AdminOrganizationHierarchy}`, path: \"/showmanagerallhierarchy\", moduleKey: \"Dashboard\" },",
    "];",
    "",
    "let allowedServices = services.filter(service => {",
    "    const key = service.moduleKey;",
    "    if (service.name === \"Admin Organization Hierarchy\") {",
    "        const canViewHierarchy = RolesFromDb?.modules?.Dashboard?.submodules?.OrganizationHierarchy?.view;",
    "        const isAdminOrHr = userInfos?.roles?.includes(\"ADMIN\") || userInfos?.roles?.includes(\"HR\");",
    "        return isAdminOrHr && canViewHierarchy !== false;",
    "    }",
    "    return RolesFromDb?.modules?.[key]?.view === true;",
    "});",
  ]),
  roleMenuStorageRead: lines([
    "const userInfos = JSON.parse(sessionStorage.getItem('user-info'));",
    "const RolesFromDb = JSON.parse(sessionStorage.getItem('RolesFromDb'));",
    "",
    "const hierarchyManagerId =",
    "    userInfos?.data?.employee?.workDetails_EmployeeNumber ||",
    "    userInfos?.data?.employee?.employeeNumber;",
  ]),
  roleMenuExpectedUserInfo: lines([
    "// This is the minimum shape MoreSection.js expects from sessionStorage user-info.",
    "// Login.js creates this object after /api/user/login/ succeeds.",
    "{",
    "  data: {",
    "    employee: {",
    "      workDetails_EmployeeNumber: \"employee number used for manager hierarchy\",",
    "      employeeNumber: \"fallback employee number\"",
    "    }",
    "  },",
    "  roles: [\"ADMIN\", \"HR\", \"EMPLOYEE\"],",
    "  token: \"login token used by protected routes and axios\"",
    "}",
  ]),
  roleMenuExpectedRoles: lines([
    "// This is the minimum RolesFromDb shape used by the menu permission checks.",
    "// Login.js stores result.data.existedRolesData as RolesFromDb.",
    "{",
    "  modules: {",
    "    Dashboard: {",
    "      view: true,",
    "      submodules: {",
    "        OrganizationHierarchy: { view: true }",
    "      }",
    "    },",
    "    TaskManagement: { view: true },",
    "    MobileTracking: { view: false },",
    "    Calendar: { view: true }",
    "  }",
    "}",
  ]),
  roleMenuFullFilter: lines([
    "let allowedServices = services.filter(service => {",
    "    const key = service.moduleKey;",
    "",
    "    if (service.name === \"Admin Organization Hierarchy\") {",
    "        const canViewHierarchy = RolesFromDb?.modules?.Dashboard?.submodules?.OrganizationHierarchy?.view;",
    "        const isAdminOrHr = userInfos?.roles?.includes(\"ADMIN\") || userInfos?.roles?.includes(\"HR\");",
    "",
    "        return isAdminOrHr && canViewHierarchy !== false;",
    "    }",
    "",
    "    if (service.name === \"Learning Hub\") {",
    "        return true;",
    "    }",
    "",
    "    return RolesFromDb?.modules?.[key]?.view === true;",
    "});",
  ]),
  roleMenuDynamicPath: lines([
    "allowedServices = allowedServices?.map(service => {",
    "    if (service.name === \"Admin Organization Hierarchy\") {",
    "        service.path = hierarchyManagerId",
    "            ? `/showmanagerallhierarchy?manager_id=${encodeURIComponent(hierarchyManagerId)}`",
    "            : null;",
    "    }",
    "",
    "    return service;",
    "}).filter(service => service.path);",
  ]),
  roleMenuUiRender: lines([
    "<Row xs={1} sm={2} md={3} lg={3} xl={4} xxl={5} className=\"g-4\">",
    "    {allowedServices.map(service => (",
    "        <Col key={service.name}>",
    "            <Card",
    "                className=\"h-100 text-center shadow-sm\"",
    "                onClick={() => {",
    "                    service.path && navigate(service.path);",
    "                    setQuickAccess(service);",
    "                }}",
    "            >",
    "                <Card.Body>",
    "                    <img src={service.icon} alt={service.name} width=\"32\" height=\"32\" />",
    "                    <Card.Text className=\"fw-semibold mt-2\">",
    "                        {service.name}",
    "                    </Card.Text>",
    "                </Card.Body>",
    "            </Card>",
    "        </Col>",
    "    ))}",
    "</Row>",
  ]),
  roleMenuLoginStorage: lines([
    "await axios.post(\"/api/user/login/\", req).then((result) => {",
    "    var UserInfoToSesson = {",
    "      data: result.data.data,",
    "      roles: result.data.roles,",
    "      roleID: result.data.rolesId[0],",
    "      token: result.data.token,",
    "      employeeImage: result.data.employeeImage,",
    "      plan: \"basic\"",
    "    }",
    "",
    "    sessionStorage.setItem(\"user-info\", JSON.stringify(UserInfoToSesson));",
    "    sessionStorage.setItem(\"RolesFromDb\", JSON.stringify(result.data.existedRolesData));",
    "    localStorage.setItem(\"RolesFromDb\", JSON.stringify(result.data.existedRolesData));",
    "});",
  ]),
  orgHierarchyFetch: lines([
    "const OrganizationHierarchy = ({ companyId }) => {",
    "  const [tree, setTree] = useState(null);",
    "  const [loading, setLoading] = useState(false);",
    "  const [error, setError] = useState(null);",
    "  const multitenant = useSelector((state) => state.data);",
    "",
    "  useEffect(() => {",
    "    const fetchTree = async () => {",
    "      setLoading(true);",
    "      const headers = ApiHeaders(multitenant);",
    "      try {",
    "        let targetCompanyId = companyId;",
    "        if (!targetCompanyId) {",
    "          const userInfo = JSON.parse(sessionStorage.getItem('user-info') || '{}');",
    "          targetCompanyId = userInfo?.data?.id || userInfo?.data?.company_id || '';",
    "        }",
    "        let url = '/api/directory/organization/hierarchy/';",
    "        if (targetCompanyId) {",
    "          url += `?company_id=${targetCompanyId}`;",
    "        } else {",
    "          url += `?company_id=`;",
    "        }",
    "        const res = await axios.get(url, { headers: headers });",
    "        if (res.data && res.data.statusCode === 200) {",
    "          setTree(res.data.result);",
    "        } else {",
    "          setError('Failed to fetch hierarchy');",
    "        }",
    "      } catch (e) {",
    "        console.error(e);",
    "        setError('Failed to fetch hierarchy');",
    "      } finally {",
    "        setLoading(false);",
    "      }",
    "    };",
    "    fetchTree();",
    "  }, [companyId, multitenant]);",
  ]),
  managerHierarchy: lines([
    "let url = new URL(window.location.href);",
    "let params = new URLSearchParams(url.search.slice(1));",
    "let obj = {};",
    "let Manger_Id;",
    "for (let pair of params.entries()) {",
    "    obj[pair[0]] = pair[1];",
    "    console.log(\"ID --> \" + obj[pair[0]])",
    "    Manger_Id = obj[pair[0]];",
    "}",
    "",
    "const [Hierarchy, setHierarchy] = useState([])",
    "const multitenant = useSelector((state) => state.data);",
    "",
    "const getHierarchy = async () => {",
    "    var userinfo = JSON.parse(sessionStorage.getItem(\"user-info\"));",
    "    const headers = ApiHeaders(multitenant);",
    "    try {",
    "        var response = await axios.get(`/api/directory/manager/hierarchy/?manager_id=${Manger_Id}`, { headers: headers });",
    "        if (response.data.statusCode == 200) {",
    "            let results = response.data.result;",
    "            setHierarchy(results);",
    "        } else {",
    "            setHierarchy([]);",
    "        }",
    "    } catch (error) {",
    "        console.log(\"not found\");",
    "        if (error.response.status === 403) { alert(error.response.data.detail) }",
    "    }",
    "};",
  ]),
  loginFlow: lines([
    "const onSubmit = async (data) => {",
    "  setLoader(false);",
    "  setErrorMes(\"\");",
    "  seterrorinvalidemail(\"\")",
    "  const email = data.email.trim();",
    "  const password = data.password.trim();",
    "",
    "  var req = {};",
    "  if (email.match(mailRegexx)) {",
    "    req = { email: email, password: password };",
    "  } else if (email.match(phoneRegexx)) {",
    "    req = { phone: email, password: password };",
    "  }",
    "",
    "  await axios.post(\"/api/user/login/\", req).then((result) => {",
    "    var UserInfoToSesson = {",
    "      data:result.data.data,",
    "      roles: result.data.roles,",
    "      roleID: result.data.rolesId[0],",
    "      token: result.data.token,",
    "      employeeImage:result.data.employeeImage,",
    "      plan:\"basic\"",
    "    }",
    "    sessionStorage.setItem(\"user-info\", JSON.stringify(UserInfoToSesson));",
    "    document.cookie = `userinfoCookie=${JSON.stringify(UserInfoToSesson)}`;",
    "    document.cookie = `userinfoRoleInfo=${JSON.stringify(result.data.existedRolesData)}`;",
    "    sessionStorage.setItem(\"RolesFromDb\", JSON.stringify(result.data.existedRolesData))",
    "    localStorage.setItem(\"RolesFromDb\", JSON.stringify(result.data.existedRolesData))",
    "    navigate(\"/payroll-dashboard\");",
    "  })",
    "};",
  ]),
  logoutFlow: lines([
    "export function SessionLogIn(navigate) {",
    "    sessionStorage.removeItem(\"user-info\");",
    "    sessionStorage.removeItem(\"RolesFromDb\");",
    "    localStorage.removeItem(\"RolesFromDb\");",
    "    sessionStorage.removeItem(\"personalImage\")",
    "    sessionStorage.removeItem(\"persnonalName\")",
    "    document.cookie = \"userinfoCookie=;expires=Thu, 01 Jan 1970 00:00:01 GMT;\";",
    "    document.cookie = \"userinfoRoleInfo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;\";",
    "    document.cookie = \"personalImage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;\";",
    "    document.cookie = \"persnonalName=;expires=Thu, 01 Jan 1970 00:00:01 GMT;\";",
    "    delete axios.defaults.headers.common[\"Authorization\"];",
    "    navigate(\"/\");",
    "}",
  ]),
  taskDashboard: lines([
    "const TaskManagementDashboardView = () => {",
    "    document.title = \"HRMS | Task Management Dashboard\";",
    "",
    "    const multitenant = useSelector((state) => state.data);",
    "    const navigate = useNavigate();",
    "    const [TotalProjectList, setTotalProjectList] = useState([]);",
    "    const [employee, setemployee] = useState([]);",
    "    const [CountOfTotalTasks, setCountOfTotalTasks] = useState(0);",
    "    const [CountOfCompletedTasks, setCountOfCompletedTasks] = useState(0);",
    "    const [CountOfInCompletedTasks, setCountOfInCompletedTasks] = useState(0);",
    "    const [CountOfOverdueTasks, setCountOfOverdueTasks] = useState(0);",
    "    const [selectedProject, setSelectedProject] = useState('');",
    "",
    "    const getAlprojects = async () => {",
    "        const headers = ApiHeaders(multitenant)",
    "        try {",
    "            const response = await axios.get(`/api/project/manage`, { headers: headers });",
    "            let results = response.data;",
    "            setManagerTotalHandlingProjectsCount(results.length);",
    "            setTotalProjectList(response.data);",
    "            setSelectedProject(results[0]?.id);",
    "            toGetProjectDetails(results[0]?.id)",
    "        } catch (error) {",
    "            setSelectedProject(\"\");",
    "        }",
    "    };",
    "}",
  ]),
  bestAxiosSetup: lines([
    "// src/api/apiClient.js",
    "import axios from \"axios\";",
    "",
    "const apiClient = axios.create({",
    "  baseURL: process.env.REACT_APP_API_BASE_URL || \"/qxbox/\",",
    "  headers: {",
    "    Accept: \"application/json\",",
    "    \"Content-Type\": \"application/json\",",
    "  },",
    "});",
    "",
    "apiClient.interceptors.request.use((config) => {",
    "  const userInfo = JSON.parse(sessionStorage.getItem(\"user-info\") || \"null\");",
    "  const token = userInfo?.token?.access;",
    "  if (token) {",
    "    config.headers.Authorization = `Bearer ${token}`;",
    "  }",
    "  return config;",
    "});",
    "",
    "apiClient.interceptors.response.use(",
    "  (response) => response,",
    "  (error) => {",
    "    if (error.response?.status === 401) {",
    "      sessionStorage.removeItem(\"user-info\");",
    "      window.location.assign(\"/\");",
    "    }",
    "    return Promise.reject(error);",
    "  }",
    ");",
    "",
    "export default apiClient;",
  ]),
  bestRouteSetup: lines([
    "// src/routes/AppRoutes.jsx",
    "const privateRoutes = [",
    "  { path: \"/moreSection\", Component: MoreSection },",
    "  { path: \"/learning-hub\", Component: LearningHub },",
    "  { path: \"/task-management-dashboard\", Component: TaskManagementDashboardView },",
    "];",
    "",
    "export const AppRoutes = () => (",
    "  <Routes>",
    "    <Route path=\"/\" element={<LoginForm />} />",
    "    {privateRoutes.map(({ path, Component }) => (",
    "      <Route",
    "        key={path}",
    "        path={path}",
    "        element={<PrivateRoute><Component /></PrivateRoute>}",
    "      />",
    "    ))}",
    "  </Routes>",
    ");",
  ]),
  bestMemorySetup: lines([
    "useEffect(() => {",
    "  const controller = new AbortController();",
    "",
    "  const loadProjects = async () => {",
    "    setLoading(true);",
    "    try {",
    "      const response = await apiClient.get(\"/api/project/manage\", {",
    "        signal: controller.signal,",
    "      });",
    "      setProjects(response.data);",
    "    } catch (error) {",
    "      if (error.name !== \"CanceledError\") {",
    "        setError(\"Unable to load projects\");",
    "      }",
    "    } finally {",
    "      setLoading(false);",
    "    }",
    "  };",
    "",
    "  loadProjects();",
    "  return () => controller.abort();",
    "}, []);",
  ]),
  bestStructure: lines([
    "src/",
    "  api/",
    "    apiClient.js",
    "    authApi.js",
    "    projectApi.js",
    "  app/",
    "    App.jsx",
    "    providers.jsx",
    "    store.js",
    "  routes/",
    "    AppRoutes.jsx",
    "    routeConfig.js",
    "  features/",
    "    auth/",
    "      pages/LoginPage.jsx",
    "      services/authService.js",
    "    dashboard/",
    "      pages/MoreSection.jsx",
    "    task-management/",
    "      pages/TaskManagementDashboard.jsx",
    "      components/TaskStatusChart.jsx",
    "  shared/",
    "    components/",
    "    hooks/",
    "    utils/",
    "    styles/",
  ]),
  wfhImports: lines([
    "import axios from \"axios\";",
    "import { formatDate } from \"../formatDate\";",
    "import moment from \"moment\";",
    "import Multiselect from \"multiselect-react-dropdown\";",
    "import { useCallback, useEffect, useState } from \"react\";",
    "import Modal from \"react-bootstrap/Modal\";",
    "import DataTable from \"react-data-table-component\";",
    "import { Controller, set, useForm } from \"react-hook-form\";",
    "import { useSelector } from 'react-redux';",
    "import { useNavigate } from \"react-router-dom\";",
    "import Select from 'react-select';",
    "import { SessionLogIn } from \"../../sessionLogout\";",
    "import ApiHeaders from \"../Common/ApiHeaders\";",
    "import ErrorPopUp from \"../Common/ErrorPopUp\";",
    "import AttendanceInnerNav from \"../KredilyAttendance/AttendanceInnerNav\";",
    "import NoDataMessage from \"../NoDataMessage\";",
    "import WfhEmpData from './EmpWfhDataInfo';",
    "import { FaEye } from \"react-icons/fa\";",
    "import ShimmerTable from \"../Common/ShimmerTable\";",
  ]),
  wfhRoleHelper: lines([
    "const getWfhDefaultReportees = () => {",
    "  try {",
    "    const userinfo = JSON.parse(sessionStorage.getItem(\"user-info\"));",
    "    const roles = Array.isArray(userinfo?.roles) ? userinfo.roles : [];",
    "    const normalizedRoles = roles.map((role) => String(role).trim().toUpperCase());",
    "",
    "    return normalizedRoles.includes(\"ADMIN\") || normalizedRoles.includes(\"HR\") ? \"All\" : \"Direct\";",
    "  } catch (error) {",
    "    return \"Direct\";",
    "  }",
    "};",
  ]),
  wfhStateAndForms: lines([
    "const WFHApproval = () => {",
    "  const multitenant = useSelector((state) => state.data);",
    "  const defaultReportees = getWfhDefaultReportees();",
    "  document.title = \"HRMS | Admin Attendance Approvals\";",
    "  const { register, handleSubmit, setValue, getValues, watch, formState: { errors }, control } = useForm({ mode: \"all\" });",
    "  const { register: registerApprove, handleSubmit: handleSubmitApprove, reset: resetApprove, formState: { errors: errorsApprove } } = useForm({ mode: \"all\" });",
    "  const { register: registerReject, handleSubmit: handleSubmitReject, reset: resetReject, formState: { errors: errorsReject } } = useForm({ mode: \"all\" });",
    "  const watchedFromDate = watch(\"from_Date\");",
    "  const watchedToDate = watch(\"to_Date\");",
    "  const [EmployeeWfhInfo, setEmployeeWfhInfo] = useState([]);",
    "  const [loader, setLoader] = useState(false);",
    "  const [dataloading, setDataLoading] = useState(false);",
    "  const navigate = useNavigate();",
    "  const [selectedDepartments, setSelectedDepartments] = useState([]);",
    "  const [internalEmpSelectedValues, setInternalEmpSelectedValues] = useState([]);",
    "  const [approveModalOpen, setApproveModalOpen] = useState(false);",
    "  const [rejectModalOpen, setRejectModalOpen] = useState(false);",
    "};",
  ]),
  wfhDateValidation: lines([
    "const isValidStrictDate = (value) => Boolean(value) && moment(value, \"YYYY-MM-DD\", true).isValid();",
    "const hasInvalidDateRange = (from = watchedFromDate || paycycleStartDate, to = watchedToDate || paycycleEndDate) => (",
    "  isValidStrictDate(from) && isValidStrictDate(to) && moment(to).isBefore(from)",
    ");",
    "const validateDateRange = (from = watchedFromDate || paycycleStartDate, to = watchedToDate || paycycleEndDate) => {",
    "  const hasFrom = isValidStrictDate(from);",
    "  const hasTo = isValidStrictDate(to);",
    "",
    "  if (!hasFrom || !hasTo) {",
    "    return false;",
    "  }",
    "",
    "  if (hasInvalidDateRange(from, to)) {",
    "    setToDateRangeError(\"To Date cannot be before From Date.\");",
    "    return false;",
    "  }",
    "",
    "  setToDateRangeError(\"\");",
    "  return true;",
    "};",
  ]),
  wfhFetchList: lines([
    "const fetchApproverList = useCallback(",
    "  async (page = currentPage, page_size = perPage) => {",
    "    const formFrom = watchedFromDate || paycycleStartDate;",
    "    const formTo = watchedToDate || paycycleEndDate;",
    "",
    "    if (!isValidStrictDate(formFrom) || !isValidStrictDate(formTo)) {",
    "      setLoader(true);",
    "      setDataLoading(false);",
    "      setDisableStatus(false);",
    "      return false;",
    "    }",
    "",
    "    if (!validateDateRange(formFrom, formTo)) {",
    "      setLoader(true);",
    "      setDataLoading(false);",
    "      setDisableStatus(false);",
    "      return false;",
    "    }",
    "",
    "    setDataLoading(true);",
    "    setLoader(false);",
    "",
    "    try {",
    "      const headers = ApiHeaders(multitenant);",
    "      const params = { from_date: formFrom, to_date: formTo, page, page_size };",
    "      const searchFilter = (getValues(\"searchValue\") || \"\").trim();",
    "      if (searchFilter) params.search_filter = searchFilter;",
    "      const deptParam = getDepartmentIdsParam(selectedDepartments);",
    "      if (deptParam) params.department_id = deptParam;",
    "      const empParam = getEmpNumbersParam(internalEmpSelectedValues);",
    "      if (empParam) params.emp_number = empParam;",
    "",
    "      const resp = await axios.get(`/api/attendance/wfh/request/approver/`, { headers, params });",
    "      const data = resp?.data?.result ?? resp?.data ?? {};",
    "      const rows = data.data || data.results || [];",
    "      setEmployeeWfhInfo(rows);",
    "      setTotalRows(data.total || data.count || rows.length);",
    "      setLoader(true);",
    "    } catch (err) {",
    "      if (err?.response?.status === 401) {",
    "        SessionLogIn(navigate);",
    "      }",
    "      setErrorMessage(err?.response?.data?.message || \"Error fetching WFH approver list\");",
    "      setErrorAlert(true);",
    "    } finally {",
    "      setDataLoading(false);",
    "    }",
    "  },",
    "  [watchedFromDate, watchedToDate, paycycleStartDate, paycycleEndDate, selectedDepartments, internalEmpSelectedValues, multitenant, currentPage, perPage, navigate]",
    ");",
  ]),
  wfhEffects: lines([
    "useEffect(() => {",
    "  getUsersdatefilter();",
    "  getDepartments();",
    "  fetchApproverList(1, perPage);",
    "}, []);",
    "",
    "useEffect(() => {",
    "  fetchApproverList(1, perPage);",
    "}, [internalEmpSelectedValues, selectedDepartments, watchedFromDate, watchedToDate, PayrollStatus, empfiltersValues, reportees, empfilters]);",
    "",
    "useEffect(() => {",
    "  getUsersListFromDepart(selectedDepartments);",
    "}, [selectedDepartments]);",
  ]),
  wfhApproveReject: lines([
    "const submitApprove = async (data) => {",
    "  setApprovingSubmitting(true);",
    "  try {",
    "    const url = `/api/attendance/wfh/request/approver/`;",
    "    const payload = {",
    "      wfh_request_id: ApproveRequestId,",
    "      reason: data.approval_reason,",
    "      action_by: \"manager\",",
    "      action: \"approve\"",
    "    };",
    "    const resp = await axios.post(url, payload, { headers: ApiHeaders(multitenant) });",
    "    if (resp?.status === 200 || resp?.status === 201) {",
    "      setApproveModalOpen(false);",
    "      setIsSuccess(true);",
    "      setErrorAlert(true);",
    "      setErrorMessage(\"WFH request approved successfully\");",
    "      fetchApproverList(currentPage, perPage);",
    "    }",
    "  } catch (err) {",
    "    if (err?.response?.status === 401) SessionLogIn(navigate);",
    "    setErrorMessage(err?.response?.data?.message || \"Something went wrong while approving\");",
    "    setErrorAlert(true);",
    "  } finally {",
    "    setApprovingSubmitting(false);",
    "  }",
    "};",
  ]),
  wfhDataTable: lines([
    "{loader ? (",
    "  <DataTable",
    "    columns={columns}",
    "    data={EmployeeWfhInfo}",
    "    pagination={totalRows > 9}",
    "    fixedHeader",
    "    fixedHeaderScrollHeight=\"500px\"",
    "    highlightOnHover",
    "    paginationServer",
    "    paginationTotalRows={totalRows}",
    "    paginationDefaultPage={currentPage}",
    "    onChangeRowsPerPage={handlePerRowsChange}",
    "    onChangePage={handlePageChange}",
    "    progressPending={dataloading}",
    "    progressComponent={<div className=\"text-center\"><div className=\"spinner-border\" role=\"status\"><span className=\"sr-only\">Loading...</span></div></div>}",
    "    noDataComponent={<NoDataMessage />}",
    "  />",
    ") : (",
    "  <ShimmerTable/>",
    ")}",
  ]),
  wfhModalForm: lines([
    "<Modal size=\"md\" show={approveModalOpen} onHide={() => { setApproveModalOpen(false); resetApprove(); setSelectedRowForAction(null); }} backdrop=\"static\" keyboard={false}>",
    "  <Modal.Header closeButton>",
    "    <h1 className=\"modal-title fs-5\">Approval Reason</h1>",
    "  </Modal.Header>",
    "  <Modal.Body>",
    "    <form onSubmit={handleSubmitApprove(submitApprove)}>",
    "      <textarea",
    "        className={`form-control ${errorsApprove?.approval_reason ? \"is-invalid\" : \"\"}`}",
    "        {...registerApprove(\"approval_reason\", { required: \"Please enter approval reason\" })}",
    "        rows={2}",
    "      ></textarea>",
    "      {errorsApprove?.approval_reason && <small className=\"text-danger\">{errorsApprove.approval_reason.message}</small>}",
    "      <button type=\"submit\" disabled={approvingSubmitting}>Approve</button>",
    "    </form>",
    "  </Modal.Body>",
    "</Modal>",
  ]),
};

const steps = [
  {
    id: "overview",
    title: "Project Overview",
    files: ["src/index.js", "src/App.js", "package.json"],
    code: snippets.appProviders,
    points: [
      "This is a Create React App based HRMS and payroll single page application. The UI combines HR workflows, payroll workflows, attendance, leave, task management, onboarding, settings, and reports.",
      "Startup begins in src/index.js. That file imports the Redux store, imports storageUtils, configures axios defaults, and renders App inside the Redux Provider.",
      "App.js composes the global providers: GlobalProvider, VideoModalProvider, QuickAccessProvider, and AuthProvider. It then registers grouped routes inside BrowserRouter and Suspense.",
      "Major modules are split mainly by feature under src/Components and payroll feature under src/PayrollComponents. Routing is centralized in src/routes.",
    ],
    why: "The project uses route grouping and lazy imports because the app has many screens. Loading screens lazily keeps the initial bundle path organized and lets each feature live in its own folder.",
    concepts: "React SPA, provider composition, lazy routing, feature-folder architecture, global axios defaults, Redux Provider.",
  },
  {
    id: "folders",
    title: "Folder Structure",
    files: ["src/Components", "src/PayrollComponents", "src/routes", "src/Redux", "src/Context"],
    code: lines([
      "src/",
      "  Components/          580 files",
      "  PayrollComponents/   219 files",
      "  routes/               10 files",
      "  Redux/                 3 files",
      "  Context/               3 files",
      "  images/              235 files",
      "  vendor/             3536 files",
      "  fonts/                 4 files",
      "  index.js",
      "  App.js",
      "  Privaterote.js",
      "  PrivateRoutepayroll.js",
      "  sessionLogout.js",
      "  storageUtils.js",
    ]),
    points: [
      "src/Components is the main HRMS feature tree. It contains both full pages and smaller components.",
      "src/PayrollComponents is a parallel feature tree for payroll screens and payroll reports.",
      "src/routes exists because App.js delegates route lists to smaller route group files.",
      "src/Redux stores the global Redux store, reducer, and action creators.",
      "src/Context stores app-wide context providers. There are also Common contexts under src/Components/Common.",
    ],
    why: "The split between Components and PayrollComponents mirrors the product split: HRMS features and payroll features are related but maintained in separate areas.",
    concepts: "Feature folders, source tree scanning, module boundaries, static assets, shared state folders.",
  },
  {
    id: "routing",
    title: "Routing",
    files: ["src/App.js", "src/routes/routeGroups.jsx", "src/routes/routeComponents.js", "src/routes/DashboardRoutes.jsx", "src/routes/ReportsRoutes.jsx", "src/Privaterote.js"],
    code: snippets.routeGroups,
    points: [
      "App.js imports getDashboardRoutes, getAuthRoutes, getHRMSRoutes, getAttendanceRoutes, getLeaveRoutes, getSettingsRoutes, getReportsRoutes, and getPayrollRoutes.",
      "routeComponents.js exports many lazy-loaded components. App.js builds routeComponentsData and passes it into each route group.",
      "Most authenticated HRMS routes wrap their page with PrivateRoute. Payroll routes wrap with PrivateRoutePayroll.",
      "PrivateRoute reads the userinfoCookie, places user-info and RolesFromDb into sessionStorage, sets axios.defaults.headers.common.Authorization, renders TopHeader, then renders the requested page.",
      "Some route files also conditionally render routes based on permission-derived booleans from App.js.",
    ],
    why: "The route code is written this way to keep App.js from containing every Route directly, while still giving route files access to permission booleans and lazy component references.",
    concepts: "React Router v6, protected routes, lazy imports, Suspense fallback, route grouping, permission-gated route registration.",
  },
  {
    id: "api",
    title: "Axios/API Setup",
    files: ["src/index.js", "src/Privaterote.js", "src/PrivateRoutepayroll.js", "src/Components/Common/ApiHeaders.js", "src/sessionLogout.js"],
    code: snippets.indexAxios,
    points: [
      "src/index.js sets a default production base URL, then changes it to window.location.origin + /qxbox/ for known production domains.",
      "POST Content-Type and Accept headers default to application/json.",
      "There is no axios.create wrapper and no axios.interceptors usage in the scanned source. Request and response handling is mostly local to each page.",
      "PrivateRoute and PrivateRoutePayroll attach the bearer token to axios.defaults.headers.common.Authorization.",
      "ApiHeaders adds multi-tenant headers like X-CURRENT-COMPANY, X-SELECTED-COMPANY, and x-system-ip-address for pages that need tenant-aware requests.",
    ],
    why: "The app uses global axios defaults because most pages call axios directly. Tenant headers are separated into ApiHeaders so feature pages can add company context without duplicating that logic everywhere.",
    concepts: "REST API calls, global axios defaults, bearer tokens, tenant headers, request headers, local error handling.",
  },
  {
    id: "state",
    title: "State Management",
    files: ["src/Redux/store.js", "src/Redux/reducers.js", "src/Redux/actions.js", "src/Components/Common/QuickAccessContext.js", "src/Context/ThemeContext.js"],
    code: snippets.reduxStore,
    points: [
      "Redux is present and uses createStore from redux, not Redux Toolkit. The store persists itself to localStorage under reduxState.",
      "The reducer stores selected company data in state.data, employee details, setup progress, multitenantStore, and a companyHeader trigger flag.",
      "React Context is used for smaller app concerns: quick access persistence, auth password sharing, global company/final-approval state, and tutorial video modal state.",
      "Most pages also use local useState and useEffect for form state, filters, loaders, API results, and UI toggles.",
      "Pages consume Redux with useSelector, for example OrganizationHierarchy and TaskManagementDashboardView read the selected multitenant data.",
    ],
    why: "The code uses Redux for cross-screen data and local hooks for page-only data. That avoids pushing every table filter or modal flag into Redux.",
    concepts: "Redux store, reducers, actions, Context API, useState, useEffect, useSelector, persisted state.",
  },
  {
    id: "modules",
    title: "Module Analysis",
    files: ["src/Components/*", "src/PayrollComponents/*"],
    code: snippets.moreServices,
    points: [
      "Business modules are represented by top-level feature folders. Components/Dashboard alone contains 59 JavaScript files, and Components/KredilyAttendance contains 64.",
      "The More page exposes a curated module launcher. It maps module names to icon assets, route paths, and permission keys.",
      "Some modules choose their final route at runtime. Performance Management chooses between HR objectives, manager objectives, all-appraisal list, or employee-appraisal list based on permissions.",
      "Payroll is a large separate module tree with dashboard, employee payroll, reports, setup, payslip customization, run payroll, and saving declaration screens.",
    ],
    why: "The launcher separates navigation decisions from the pages themselves. That lets the app show or hide feature entry points based on RolesFromDb without changing every page.",
    concepts: "Business modules, permission-driven navigation, feature discovery, module dashboards, folder-to-feature mapping.",
  },
  {
    id: "pages",
    title: "Page Analysis",
    files: ["src/Components/Organization/OrganizationHierarchy.js", "src/Components/Dashboard/ShowManagersAllHierarchyView.js", "src/Components/TaskManagment/TaskManagementDashboardView.js"],
    code: snippets.orgHierarchyFetch,
    points: [
      "A page usually imports React hooks, axios, routing helpers, Redux selectors, ApiHeaders, assets, and child components.",
      "State variables store fetched data, loaders, errors, selected IDs, filters, and UI visibility flags.",
      "useEffect blocks trigger initial API calls and re-run when dependencies like selected company or selected project change.",
      "Event handlers update local state, write sessionStorage when needed, or navigate to another route.",
      "JSX renders different branches for loading, error, empty, and populated states.",
    ],
    why: "Most pages are written as self-contained workflow screens. They own their own fetch functions and UI state, while shared concerns like auth and tenant headers come from wrappers/helpers.",
    concepts: "Imports, hook state, effects, event handlers, conditional rendering, data flow, route navigation.",
  },
  {
    id: "components",
    title: "Component Analysis",
    files: ["src/Components/Organization/OrganizationHierarchy.js", "src/Components/Dashboard/MoreSection.js", "src/Components/Common/QuickAccessContext.js"],
    code: snippets.managerHierarchy,
    points: [
      "OrganizationHierarchy accepts an optional companyId prop. If it is not provided, it reads company id from sessionStorage user-info.",
      "ShowManagersAllHierarchyView does not receive props. It reads manager_id from the current URL query string and then fetches manager hierarchy data.",
      "MoreSection consumes QuickAccessContext so clicking a service can save the last quick access item.",
      "Child components communicate through props, context, route state, URL params/query strings, Redux state, and browser storage.",
    ],
    why: "The project mixes several communication styles because screens were built for different workflows. Route params are used for shareable IDs, Redux for selected company data, and context for UI-level app state.",
    concepts: "Props, local state, context, URLSearchParams, child components, component composition.",
  },
  {
    id: "api-analysis",
    title: "API Analysis",
    files: ["src/Components/Common/ApiHeaders.js", "src/Components/Organization/OrganizationHierarchy.js", "src/Components/TaskManagment/TaskManagementDashboardView.js", "src/PayrollComponents/SignUp/LoginForm.js"],
    code: snippets.apiHeaders,
    points: [
      "Authentication uses POST /api/user/login/ and, when OTP is used, POST /api/user/totp/token/{otp}/.",
      "Roles refresh uses GET /api/roles/permissions/?role_id=...&company_id=.... The result is stored in sessionStorage and localStorage as RolesFromDb.",
      "Organization hierarchy uses GET /api/directory/organization/hierarchy/?company_id=.... Manager hierarchy uses GET /api/directory/manager/hierarchy/?manager_id=....",
      "Task Management uses endpoints under /api/project, such as /api/project/manage and /api/project/manage/{id}.",
      "Payroll screens use many endpoints under /api/payroll, for salary components, reports, pay cycles, employee salary data, and payroll compliance.",
      "Error handling is local. Many pages catch 401 and call SessionLogIn(navigate), catch 403 and alert detail, or set local error/empty state.",
    ],
    why: "The code keeps API request payloads close to the UI that owns the workflow. That makes each page easier to follow, but it also means API contracts are spread across many page files.",
    concepts: "Endpoint families, request payloads, response statusCode checks, local catch blocks, auth timeout handling, tenant headers.",
  },
  {
    id: "auth",
    title: "Authentication Flow",
    files: ["src/PayrollComponents/SignUp/LoginForm.js", "src/Privaterote.js", "src/PrivateRoutepayroll.js", "src/sessionLogout.js", "src/storageUtils.js"],
    code: snippets.loginFlow,
    points: [
      "LoginForm validates email or phone, builds req as either { email, password } or { phone, password }, then posts to /api/user/login/.",
      "On success it creates UserInfoToSesson, stores it as user-info, stores RolesFromDb, writes cookies, stores profile name/image, and navigates to /payroll-dashboard.",
      "PrivateRoute reads userinfoCookie back from document.cookie. storageUtils overrides storage and the userinfoCookie accessor, so stored values are encrypted/decrypted at the browser API boundary.",
      "Protected HRMS pages render inside TopHeader. Protected payroll pages render inside the payroll TopHeader.",
      "SessionLogIn clears user-info, RolesFromDb, profile storage, auth cookies, axios Authorization, and navigates back to /.",
    ],
    why: "Cookies allow protected route wrappers to recreate the session when a route loads. sessionStorage/localStorage keep user data and permission data available to components.",
    concepts: "Login form submission, token storage, cookies, protected routes, logout, session refresh, storage wrappers.",
  },
  {
    id: "flow",
    title: "Complete Project Flow",
    files: ["src/index.js", "src/App.js", "src/routes/*.jsx", "src/Privaterote.js", "feature page files"],
    code: snippets.privateRouteAuth,
    points: [
      "Application startup: index.js imports storageUtils, configures axios, creates the React root, and renders App inside Redux Provider.",
      "Provider flow: App wraps routes with GlobalProvider, VideoModalProvider, QuickAccessProvider, and AuthProvider.",
      "Routing flow: BrowserRouter renders grouped route lists. A protected route wraps the target page with PrivateRoute or PrivateRoutePayroll.",
      "Auth flow: protected route reads cookies, restores sessionStorage, sets axios Authorization, reloads roles, and renders TopHeader plus the page.",
      "API flow: page builds headers with ApiHeaders when tenant context is needed, calls axios, updates local state, and renders data.",
      "State flow: Redux provides selected multitenant company data; Context provides quick access/auth/video/global UI state; local hooks drive page forms and tables.",
      "UI flow: JSX conditionally renders loading, errors, empty states, table/list/chart data, modals, and buttons based on state.",
    ],
    why: "The app is organized around route-level pages. Wrappers handle login/header concerns, helpers handle tenant headers, and each page handles its own workflow.",
    concepts: "End-to-end SPA execution, protected shell rendering, request lifecycle, state propagation, UI rendering lifecycle.",
  },
  {
    id: "best-practices",
    title: "Best Practices",
    files: ["recommended/apiClient.js", "recommended/AppRoutes.jsx", "recommended/useEffect cleanup", "recommended/folder-structure"],
    code: snippets.bestAxiosSetup,
    points: [
      "This project works, but some patterns can be improved for future projects: global axios defaults, API calls inside every page, very large route maps, and large page components.",
      "For new projects, create one apiClient with base URL, headers, request interceptors, response interceptors, and shared error handling.",
      "For routing, keep routes in a config array and map them into protected Route elements instead of repeating the same JSX many times.",
      "For memory management, clean up API requests, timers, subscriptions, and event listeners in useEffect cleanup functions.",
      "For structure, keep feature pages, feature services, shared hooks, shared UI, and API clients in clear folders.",
    ],
    why: "Best practices make the next project easier to test, easier to change, and safer when the number of pages grows.",
    concepts: "Axios instance, interceptors, route config, feature folders, AbortController, cleanup functions, service layer, reusable hooks.",
  },
  {
    id: "page-concepts",
    title: "Page Concept Study",
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
    code: snippets.wfhFetchList,
    points: [
      "This step studies one real page, WFHApprovals.js, and explains the concepts used inside it.",
      "The page uses imports, helper functions, React Hook Form, useState, useEffect, useCallback, Redux useSelector, axios API calls, DataTable, modals, filters, pagination, and export handling.",
      "Instead of copying the exact structure into every project, learn the concept: split UI state, form state, API fetch logic, validation logic, action handlers, table rendering, and modal forms clearly.",
      "For any project, the same concepts apply: keep API params clean, validate before calling API, handle loading/error/success states, and refresh the list after approve/reject actions.",
    ],
    why: "A developer learns faster when they see a real project page and then understand the reusable concept behind each block.",
    concepts: "Real page reading, imports, helper functions, form handling, API params, useCallback, effects, DataTable, modals, server pagination.",
  },
  {
    id: "live-role-flow",
    title: "Live Coding Flow",
    files: ["src/Components/Dashboard/MoreSection.js", "src/PayrollComponents/SignUp/LoginForm.js"],
    code: snippets.roleMenuFullFilter,
    points: [
      "This step explains one complete real coding flow from this project: login response, browser storage, role permissions, menu filtering, UI card rendering, and navigation.",
      "It shows what data shape the code expects for user-info and RolesFromDb, because without that shape the filter conditions are hard to understand.",
      "It explains why Admin Organization Hierarchy is special: it checks both user role ADMIN/HR and submodule permission OrganizationHierarchy.view.",
      "It explains how a value from storage becomes a URL query payload: manager_id is added to /showmanagerallhierarchy and consumed by the hierarchy page.",
    ],
    why: "This is the practical coding understanding developers need: where data comes from, how it is checked, how UI is created, and what happens on click.",
    concepts: "API response shape, sessionStorage, permission map, array filter, dynamic URL payload, map rendering, navigate, context update.",
  },
  {
    id: "coding-concepts",
    title: "Coding Concepts",
    files: ["src/Components/WorkFromHome/WFHApprovals.js", "src/Components/Dashboard/MoreSection.js", "src/Redux/*", "src/routes/*.jsx"],
    code: snippets.wfhImports,
    points: [
      "This step teaches the main coding concepts used across this project, from beginner React basics to large-project patterns.",
      "It explains imports, component functions, useState, useEffect, useCallback, API payloads, API responses, headers, conditional rendering, filter, map, routing, storage, Context, Redux, forms, tables, modals, images, and cleanup.",
      "Every concept points to an actual project file and shows actual project-style code, so developers can connect theory to this codebase.",
      "Use this section when you do not understand what a code block is doing or how data moves from API to UI.",
    ],
    why: "A developer becomes confident when they understand the small building blocks first, then see how those blocks combine into full pages.",
    concepts: "React basics, JavaScript array methods, API flow, storage, state, forms, tables, routes, permissions, UI rendering, cleanup.",
  },
  {
    id: "core-concepts",
    title: "Core Project Concepts",
    files: ["src/index.js", "src/routes/*.jsx", "src/Privaterote.js", "src/Components/WorkFromHome/WFHApprovals.js", "src/Redux/*"],
    code: snippets.indexAxios,
    points: [
      "This step explains the main concepts that matter when building large React projects, using this project as the learning base.",
      "Important concepts include axios setup, API services, routes, protected routes, roles, forms, tables, images, state, effects, validation, modals, exports, error handling, and folder structure.",
      "The goal is not to copy this project exactly. The goal is to understand what the project is doing, then learn the cleaner reusable pattern for future projects.",
      "Each concept below shows where this project uses it, what it means, why it matters, and how to use it in any new project.",
    ],
    why: "Large React projects become maintainable only when core concepts are separated clearly: API logic, route logic, role logic, UI state, server data, reusable components, and shared utilities.",
    concepts: "Large-project architecture, React fundamentals, API layer, routing layer, role-based UI, forms, tables, state, side effects, reusable project structure.",
  },
];

const stepTelugu = {
  overview: {
    title: "ప్రాజెక్ట్ అవలోకనం",
    points: [
      "ఇది React ఆధారిత HRMS మరియు payroll single page application. ఇందులో attendance, leave, task management, onboarding, settings, reports, payroll flows ఉన్నాయి.",
      "Application src/index.js నుంచి start అవుతుంది. అక్కడ Redux Provider, storageUtils, axios defaults setup చేసి App render చేస్తుంది.",
      "App.js లో GlobalProvider, VideoModalProvider, QuickAccessProvider, AuthProvider wrapper లు ఉన్నాయి.",
      "Major modules src/Components మరియు src/PayrollComponents లో feature-wise గా ఉన్నాయి. Routing src/routes లో ఉంది.",
    ],
    why: "Screens చాలా ఎక్కువగా ఉండటం వల్ల routes ని group చేసి lazy loading వాడారు. దాంతో files organize అవుతాయి.",
    concepts: "React SPA, Provider composition, lazy routing, feature folders, axios defaults, Redux Provider.",
  },
  folders: {
    title: "ఫోల్డర్ నిర్మాణం",
    points: [
      "src/Components లో main HRMS screens మరియు shared components ఉన్నాయి.",
      "src/PayrollComponents లో payroll related screens, reports, setup pages ఉన్నాయి.",
      "src/routes లో route groups మరియు lazy component exports ఉన్నాయి.",
      "src/Redux లో global store, reducer, actions ఉన్నాయి.",
      "src/Context లో app-wide context providers ఉన్నాయి.",
    ],
    why: "HRMS మరియు payroll flows ని వేర్వేరు folders లో పెట్టడం వల్ల ownership మరియు maintenance సులభం అవుతుంది.",
    concepts: "Feature folders, module boundaries, shared state folders, static assets.",
  },
  routing: {
    title: "రూటింగ్",
    points: [
      "App.js route group functions ని import చేసి Routes లో render చేస్తుంది.",
      "routeComponents.js lazy imports export చేస్తుంది.",
      "HRMS private pages PrivateRoute తో wrap అవుతాయి. Payroll pages PrivateRoutePayroll తో wrap అవుతాయి.",
      "PrivateRoute cookie నుంచి token చదివి axios Authorization header set చేస్తుంది.",
      "కొన్ని routes permission booleans ఆధారంగా conditionally render అవుతాయి.",
    ],
    why: "Routes ని group చేయడం వల్ల App.js చాలా పెద్దదిగా మారకుండా ఉంటుంది.",
    concepts: "React Router v6, protected routes, lazy imports, permission routes.",
  },
  api: {
    title: "Axios/API సెటప్",
    points: [
      "src/index.js axios baseURL మరియు JSON headers set చేస్తుంది.",
      "ఈ project లో axios.create wrapper లేదా interceptors కనిపించలేదు.",
      "PrivateRoute token ని global Authorization header గా set చేస్తుంది.",
      "ApiHeaders tenant headers add చేస్తుంది.",
      "API response/error handling ఎక్కువగా page files లోనే ఉంది.",
    ],
    why: "Global axios defaults వల్ల pages direct గా axios call చేయగలుగుతున్నాయి. కానీ కొత్త projects లో apiClient pattern మంచిది.",
    concepts: "Base URL, headers, bearer token, tenant headers, local error handling.",
  },
  state: {
    title: "State Management",
    points: [
      "Redux createStore తో ఉంది; Redux Toolkit కాదు.",
      "Redux state localStorage లో reduxState పేరుతో persist అవుతుంది.",
      "QuickAccess, Auth, Theme, Video modal కోసం Context API వాడుతున్నారు.",
      "Most pages local useState/useEffect తో filters, loaders, API data handle చేస్తున్నాయి.",
      "useSelector తో selected company/multitenant data consume చేస్తున్నారు.",
    ],
    why: "Global data Redux లో, page-only data local state లో ఉంచడం practical approach.",
    concepts: "Redux, Context API, useState, useEffect, useSelector, persisted state.",
  },
  modules: {
    title: "Module Analysis",
    points: [
      "Top-level folders business modules లాగా ఉన్నాయి.",
      "MoreSection services array module launcher లాగా పని చేస్తుంది.",
      "Permissions ఆధారంగా menu items show/hide అవుతున్నాయి.",
      "Payroll separate module tree గా maintain అవుతోంది.",
    ],
    why: "Menu navigation ని permissions తో centralize చేయడం వల్ల user కి allowed modules మాత్రమే కనిపిస్తాయి.",
    concepts: "Business modules, permission navigation, module dashboards.",
  },
  pages: {
    title: "Page Analysis",
    points: [
      "Page files usually hooks, axios, routing, Redux, ApiHeaders, child components import చేస్తాయి.",
      "State variables API data, loading, errors, selected IDs, filters store చేస్తాయి.",
      "useEffect initial API calls మరియు dependency changes handle చేస్తుంది.",
      "Event handlers state update, navigation, sessionStorage writes చేస్తాయి.",
      "JSX loading, error, empty, data states conditional render చేస్తుంది.",
    ],
    why: "ప్రతి page తన workflow కి కావలసిన fetch/state/render logic own చేస్తోంది.",
    concepts: "Imports, state, effects, handlers, conditional rendering, data flow.",
  },
  components: {
    title: "Component Analysis",
    points: [
      "OrganizationHierarchy optional companyId prop తీసుకుంటుంది.",
      "ShowManagersAllHierarchyView URL query నుంచి manager_id తీసుకుంటుంది.",
      "MoreSection QuickAccessContext consume చేస్తుంది.",
      "Components props, context, route state, URL params, Redux, browser storage ద్వారా communicate చేస్తాయి.",
    ],
    why: "Different workflows కోసం different communication styles వాడారు.",
    concepts: "Props, context, local state, URLSearchParams, Redux.",
  },
  "api-analysis": {
    title: "API Analysis",
    points: [
      "Login API /api/user/login/.",
      "Roles refresh API /api/roles/permissions/.",
      "Organization hierarchy APIs /api/directory/organization/hierarchy/ మరియు /api/directory/manager/hierarchy/.",
      "Task Management APIs /api/project/manage family లో ఉన్నాయి.",
      "Payroll APIs /api/payroll family లో ఉన్నాయి.",
      "Errors local catch blocks లో handle అవుతున్నాయి.",
    ],
    why: "API contracts page files లో ఉండటం follow చేయడానికి easy, కానీ reusable service layer ఉంటే maintenance ఇంకా better.",
    concepts: "Endpoints, payloads, response checks, catch blocks, tenant headers.",
  },
  auth: {
    title: "Authentication Flow",
    points: [
      "LoginForm email/phone validate చేసి /api/user/login/ call చేస్తుంది.",
      "Success తర్వాత user-info, RolesFromDb, cookies, profile details store అవుతాయి.",
      "PrivateRoute cookie నుంచి session restore చేసి Authorization header set చేస్తుంది.",
      "Protected HRMS pages TopHeader తో render అవుతాయి.",
      "SessionLogIn storage, cookies, Authorization clear చేసి login page కి పంపుతుంది.",
    ],
    why: "Cookies మరియు browser storage వల్ల refresh తర్వాత కూడా session restore చేయగలుగుతున్నారు.",
    concepts: "Login, token storage, cookies, protected routes, logout.",
  },
  flow: {
    title: "Complete Project Flow",
    points: [
      "index.js axios setup చేసి App render చేస్తుంది.",
      "App providers wrap చేసి route groups render చేస్తుంది.",
      "Protected route token restore చేసి TopHeader + page render చేస్తుంది.",
      "Page ApiHeaders తో API call చేసి local state update చేస్తుంది.",
      "Redux selected company data ఇస్తుంది; Context UI-level data ఇస్తుంది.",
      "JSX state ఆధారంగా UI render చేస్తుంది.",
    ],
    why: "Route-level pages, shared wrappers, tenant headers, local workflow state కలిపి app flow తయారవుతోంది.",
    concepts: "SPA startup, protected shell, request lifecycle, state propagation.",
  },
  "best-practices": {
    title: "Best Practices",
    points: [
      "ఈ project పని చేస్తుంది, కానీ future projects లో axios, routing, services, memory cleanup ఇంకా structured గా పెట్టాలి.",
      "ఒక common apiClient create చేసి baseURL, token, interceptors, error handling centralize చేయాలి.",
      "Routes ని config array లో పెట్టి map చేస్తే repeated JSX తగ్గుతుంది.",
      "useEffect లో API cancel, timer clear, subscription cleanup తప్పనిసరి.",
      "Feature folder structure వాడితే project scale అయినా maintain చేయడం easy.",
    ],
    why: "Best practices వల్ల code test చేయడం, debug చేయడం, change చేయడం, new developer కి explain చేయడం easy అవుతుంది.",
    concepts: "Axios instance, interceptors, route config, service layer, AbortController, cleanup, feature folders.",
  },
  "page-concepts": {
    title: "Page Concept Study",
    points: [
      "ఈ step లో WFHApprovals.js అనే actual project page తీసుకుని అందులో ఉన్న concepts explain చేస్తున్నాం.",
      "ఈ page imports, helper functions, React Hook Form, useState, useEffect, useCallback, Redux useSelector, axios API calls, DataTable, modals, filters, pagination వాడుతుంది.",
      "ప్రతి project లో ఇదే exact structure copy చేయాల్సిన అవసరం లేదు. Concept నేర్చుకోవాలి: UI state, form state, API fetch logic, validation, action handlers, table rendering, modal forms విడిగా organize చేయాలి.",
      "ఏ project అయినా API call ముందు validation చేయాలి, params clean గా build చేయాలి, loading/error/success states handle చేయాలి, approve/reject తర్వాత list refresh చేయాలి.",
    ],
    why: "Actual page code చూసి concept అర్థం చేసుకుంటే developer కి real project maintain చేయడం easy అవుతుంది.",
    concepts: "Real page reading, imports, helper functions, form handling, API params, useCallback, effects, DataTable, modals, server pagination.",
  },
  "live-role-flow": {
    title: "Live Coding Flow",
    points: [
      "ఈ step లో project లోని complete real coding flow explain చేస్తుంది: login response, browser storage, role permissions, menu filtering, UI card rendering, navigation.",
      "user-info మరియు RolesFromDb data shape ఎలా ఉండాలో చూపిస్తుంది. ఆ shape అర్థం కాకపోతే filter conditions అర్థం కావు.",
      "Admin Organization Hierarchy special ఎందుకంటే ADMIN/HR role కూడా check చేస్తుంది మరియు OrganizationHierarchy.view permission కూడా check చేస్తుంది.",
      "Storage లోని employee number URL query payload గా ఎలా మారుతుందో చూపిస్తుంది: manager_id /showmanagerallhierarchy URL లో add అవుతుంది.",
    ],
    why: "Developer కి real coding అర్థం కావాలంటే data ఎక్కడి నుంచి వస్తుంది, ఎలా check అవుతుంది, UI ఎలా render అవుతుంది, click తర్వాత ఏమవుతుంది అన్న flow clear కావాలి.",
    concepts: "API response shape, sessionStorage, permission map, array filter, dynamic URL payload, map rendering, navigate, context update.",
  },
  "coding-concepts": {
    title: "Coding Concepts",
    points: [
      "ఈ step project అంతటా వాడిన main coding concepts explain చేస్తుంది: beginner React basics నుంచి large-project patterns వరకు.",
      "Imports, component functions, useState, useEffect, useCallback, API payloads, API responses, headers, conditional rendering, filter, map, routing, storage, Context, Redux, forms, tables, modals, images, cleanup అన్నీ explain చేస్తుంది.",
      "ప్రతి concept actual project file కి link అవుతుంది మరియు actual project-style code చూపిస్తుంది.",
      "ఒక code block ఏం చేస్తుందో లేదా API నుంచి UI కి data ఎలా వస్తుందో అర్థం కాకపోతే ఈ section చూడాలి.",
    ],
    why: "Developer confidence రావాలంటే ముందు చిన్న building blocks అర్థం కావాలి, తర్వాత అవి కలిసి full page ఎలా అవుతాయో చూడాలి.",
    concepts: "React basics, JavaScript array methods, API flow, storage, state, forms, tables, routes, permissions, UI rendering, cleanup.",
  },
  "core-concepts": {
    title: "Core Project Concepts",
    points: [
      "ఈ step లో పెద్ద React projects build చేయడానికి important concepts explain చేస్తున్నాం.",
      "Axios setup, API services, routes, protected routes, roles, forms, tables, images, state, effects, validation, modals, exports, error handling, folder structure అన్నీ important.",
      "ఈ project exact structure copy చేయడం goal కాదు. ఈ project ఏం చేస్తుందో అర్థం చేసుకుని future projects లో cleaner pattern ఎలా వాడాలో నేర్చుకోవాలి.",
      "ప్రతి concept లో ఈ project లో ఎక్కడ వాడారో, concept meaning, importance, new project లో ఎలా వాడాలో explain చేస్తుంది.",
    ],
    why: "Large React projects maintainable అవ్వాలంటే API logic, route logic, role logic, UI state, server data, reusable components, shared utilities clear గా separate చేయాలి.",
    concepts: "Large-project architecture, React fundamentals, API layer, routing layer, role-based UI, forms, tables, state, side effects, reusable project structure.",
  },
};

const learningModules = [
  {
    id: "auth",
    name: "Authentication",
    purpose: "Logs users in, stores token/session data, refreshes roles, protects pages, and logs users out.",
    pages: [
      {
        name: "Payroll Login",
        path: "/",
        files: [
          {
            path: "src/PayrollComponents/SignUp/LoginForm.js",
            code: snippets.loginFlow,
            explanation: [
              "Imports React hooks, react-hook-form, axios, routing, QR/recaptcha helpers, images, and SessionLogIn.",
              "State tracks OTP mode, form errors, loader visibility, QR value, and password visibility.",
              "onSubmit validates whether the login identifier is an email or phone number, builds the API payload, then calls /api/user/login/.",
              "On success it writes user-info, RolesFromDb, cookies, profile name/image, and navigates to /payroll-dashboard.",
              "Errors update local error state or call SessionLogIn for a 401 response.",
            ],
          },
          {
            path: "src/sessionLogout.js",
            code: snippets.logoutFlow,
            explanation: [
              "SessionLogIn is the shared cleanup path.",
              "It removes session and role data from browser storage, clears auth cookies, removes the axios Authorization header, and redirects to login.",
            ],
          },
        ],
      },
      {
        name: "Protected HRMS Route",
        path: "Any PrivateRoute page",
        files: [
          {
            path: "src/Privaterote.js",
            code: snippets.privateRouteAuth,
            explanation: [
              "PrivateRoute reads userinfoCookie, parses the access token, and sets axios.defaults.headers.common.Authorization.",
              "It renders TopHeader before the protected page, so all HRMS private screens share the same shell.",
              "It checks known paths against RolesFromDb and navigates to /notfound when access is false.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard and More",
    purpose: "Hosts dashboard experiences, quick access, hierarchy widgets, and the More launcher.",
    pages: [
      {
        name: "More Section",
        path: "/moreSection",
        files: [
          {
            path: "src/Components/Dashboard/MoreSection.js",
            code: snippets.moreServices,
            explanation: [
              "The services array is the source of menu tiles shown on the More screen.",
              "allowedServices filters those entries using RolesFromDb and special role rules.",
              "Clicking a tile calls navigate(service.path) and stores the chosen service in QuickAccessContext.",
            ],
          },
        ],
      },
      {
        name: "Admin Organization Hierarchy",
        path: "/showmanagerallhierarchy",
        files: [
          {
            path: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
            code: snippets.managerHierarchy,
            explanation: [
              "The page reads manager_id from the URL query string.",
              "It stores hierarchy data in local state and fetches /api/directory/manager/hierarchy/.",
              "Toggle handlers show or hide left/right team lists, while HandleManagerId refetches hierarchy for a clicked manager.",
              "Rendering is heavily conditional because the API may return different combinations of manager and team arrays.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "organization",
    name: "Organization",
    purpose: "Shows organization structure and organization setup concepts.",
    pages: [
      {
        name: "Organization Hierarchy",
        path: "/organization-hierarchy",
        files: [
          {
            path: "src/Components/Organization/OrganizationHierarchy.js",
            code: snippets.orgHierarchyFetch,
            explanation: [
              "Imports axios, Redux useSelector, ApiHeaders, and React hooks.",
              "State stores tree, loading, and error.",
              "useEffect fetches the hierarchy whenever companyId or selected multitenant data changes.",
              "The fetch builds company_id from props first, then from sessionStorage user-info.",
              "renderTree transforms the returned tree into CEO, admin, department, and employee visual sections.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "task",
    name: "Task Management",
    purpose: "Manages project dashboards, tasks, teams, statuses, comments, and task approval/history flows.",
    pages: [
      {
        name: "Task Management Dashboard",
        path: "/task-management-dashboard",
        files: [
          {
            path: "src/Components/TaskManagment/TaskManagementDashboardView.js",
            code: snippets.taskDashboard,
            explanation: [
              "Imports chart components, react-select, axios, routing, Redux, ApiHeaders, and SessionLogIn.",
              "State stores filters, projects, employees, selected project, counts, loaders, and table data.",
              "getAlprojects fetches /api/project/manage, stores the project list, selects the first project, then loads details.",
              "toGetProjectDetails fetches /api/project/manage/{id} and updates task count cards.",
              "The page passes fetched data to chart components and uses navigation for task drill-down.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "payroll",
    name: "Payroll",
    purpose: "Contains payroll dashboard, employees, salary components, run payroll, reports, payslips, and saving declaration workflows.",
    pages: [
      {
        name: "Payroll Feature Area",
        path: "/payroll-dashboard and payroll routes",
        files: [
          {
            path: "src/routes/ReportsRoutes.jsx and src/routes/PayrollRoutes.jsx",
            code: lines([
              "{routes.mainsalarycompayroll ? <Route path='/manage-salary-components' element={<routes.PrivateRoutePayroll><routes.SalaryComponents /></routes.PrivateRoutePayroll>} /> : \"\"}",
              "{routes.mainempactivepayroll ? <Route path='/payroll-active-employees' element={<routes.PrivateRoutePayroll><routes.PayrollActiveEmployees /></routes.PrivateRoutePayroll>} /> : \"\"}",
              "<Route path='/runpayroll' element={<routes.PrivateRoutePayroll><routes.RunPayrollSelection /></routes.PrivateRoutePayroll>} />",
              "<Route path='/pr-new-reports-view' element={<routes.PrivateRoutePayroll><routes.SalaryReportsView /></routes.PrivateRoutePayroll>} />",
            ]),
            explanation: [
              "Payroll routes use PrivateRoutePayroll, which renders the payroll TopHeader and applies payroll-specific permission checks.",
              "ReportsRoutes contains many payroll setup and employee payroll paths.",
              "PayrollRoutes contains the newer payroll report views and payroll processing record routes.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "state",
    name: "State Infrastructure",
    purpose: "Explains Redux, Context API, and local state patterns used across modules.",
    pages: [
      {
        name: "Redux Store",
        path: "Global app store",
        files: [
          {
            path: "src/Redux/store.js",
            code: snippets.reduxStore,
            explanation: [
              "The store loads previous state from localStorage.",
              "createStore(rootReducer, persistedState) creates the Redux store.",
              "store.subscribe writes every state change back to localStorage.",
            ],
          },
          {
            path: "src/Redux/reducers.js",
            code: snippets.reduxReducer,
            explanation: [
              "The reducer keeps selected company data, employee work info, setup progress, multitenant details, and a header trigger flag.",
              "Actions replace or update small slices of the state.",
              "LOGOUT returns the reducer to initialState.",
            ],
          },
          {
            path: "src/Components/Common/QuickAccessContext.js",
            code: snippets.quickAccess,
            explanation: [
              "QuickAccessContext is a lightweight Context API store for the More/quick access selection.",
              "It reads localStorage on mount and writes localStorage when quickAccess changes.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wfh",
    name: "Work From Home Approvals",
    purpose: "Real page study for WFH approval list, filters, date validation, server pagination, approve/reject modals, and API flows.",
    pages: [
      {
        name: "WFH Approvals",
        path: "/wfh-approvals",
        files: [
          {
            path: "src/Components/WorkFromHome/WFHApprovals.js",
            code: snippets.wfhFetchList,
            explanation: [
              "This page imports third-party UI libraries, shared helpers, Redux, routing, API helpers, and local child components.",
              "It uses React Hook Form for filter and modal forms.",
              "It keeps page data, loading flags, selected filters, selected rows, pagination, and modal open/close flags in local state.",
              "fetchApproverList builds API params from current filters and calls /api/attendance/wfh/request/approver/.",
              "DataTable renders the server-paginated list, while approve/reject modal forms submit manager actions and refresh the table.",
            ],
          },
          {
            path: "src/Components/WorkFromHome/EmpWfhDataInfo.js",
            code: lines([
              "import WfhEmpData from './EmpWfhDataInfo';",
              "",
              "const openViewDetails = (row) => {",
              "  setSelectedWFHRow(row);",
              "  setViewDetailsPopup(true);",
              "};",
            ]),
            explanation: [
              "WFHApprovals imports this child component to show selected WFH employee/request details.",
              "The parent stores the selected row and opens a details popup.",
              "This is a common parent-child pattern: parent owns selected data, child renders details.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "best",
    name: "Best Practices",
    purpose: "Recommended structure for future React projects: API client, routing config, services, cleanup, and feature folders.",
    pages: [
      {
        name: "Axios Setup",
        path: "recommended/apiClient.js",
        files: [
          {
            path: "recommended/apiClient.js",
            code: snippets.bestAxiosSetup,
            explanation: [
              "Create one axios instance instead of setting axios.defaults in many files.",
              "Request interceptors attach the bearer token before every API call.",
              "Response interceptors handle common errors like 401 in one place.",
              "Feature services can import apiClient and expose clean functions such as getProjects or loginUser.",
            ],
          },
        ],
      },
      {
        name: "Routing Setup",
        path: "recommended/AppRoutes.jsx",
        files: [
          {
            path: "recommended/AppRoutes.jsx",
            code: snippets.bestRouteSetup,
            explanation: [
              "Keep route metadata in arrays when many routes use the same wrapper.",
              "Map route configs to Route components to reduce repeated JSX.",
              "Keep public, private, and payroll route groups separate.",
              "Use lazy imports for heavy page modules.",
            ],
          },
        ],
      },
      {
        name: "Memory Management",
        path: "recommended/useEffect cleanup",
        files: [
          {
            path: "recommended/useEffect-cleanup.js",
            code: snippets.bestMemorySetup,
            explanation: [
              "AbortController cancels the request when the component unmounts.",
              "Cleanup prevents setState from running after a screen is closed.",
              "The same cleanup idea applies to intervals, event listeners, sockets, and subscriptions.",
              "Keep large derived values in useMemo when recalculation is expensive.",
            ],
          },
        ],
      },
      {
        name: "Folder Structure",
        path: "recommended/folder-structure",
        files: [
          {
            path: "recommended/folder-structure.txt",
            code: snippets.bestStructure,
            explanation: [
              "api contains shared HTTP clients and endpoint functions.",
              "features contains domain modules with pages, components, hooks, and services.",
              "shared contains reusable UI, hooks, utilities, and styles.",
              "app contains providers, store setup, and top-level application wiring.",
            ],
          },
        ],
      },
    ],
  },
];

const apiFamilies = [
  { area: "Authentication", endpoints: "/api/user/login/, /api/user/totp/token/{otp}/", consumed: "src/PayrollComponents/SignUp/LoginForm.js" },
  { area: "Roles and session", endpoints: "/api/roles/permissions/", consumed: "src/sessionLogout.js, protected route wrappers" },
  { area: "Organization hierarchy", endpoints: "/api/directory/organization/hierarchy/, /api/directory/manager/hierarchy/", consumed: "OrganizationHierarchy.js, ShowManagersAllHierarchyView.js" },
  { area: "Task management", endpoints: "/api/project/manage, /api/project/team-members-task-assigned", consumed: "src/Components/TaskManagment/*" },
  { area: "Attendance and timesheet", endpoints: "/api/attendance/timesheet/, /api/attendance/timesheet/group/, /api/attendance/timesheet/approvals/", consumed: "src/Components/KredilyAttendance/Timesheet/*" },
  { area: "Payroll", endpoints: "/api/payroll/*", consumed: "src/PayrollComponents/* and SalaryStatement.js" },
  { area: "Company and directory", endpoints: "/api/company/*, /api/directory/*", consumed: "EimAdmin, Employee, MyProfile, PayrollComponents/MyProfile" },
  { area: "Performance", endpoints: "/api/kra/*, /api/performance_management/*", consumed: "src/Components/PerformanceManagement/* and MonthlyKRA" },
];

const labels = {
  en: {
    portal: "Developer training portal",
    intro: "Step-by-step guide to this React HRMS and payroll project, built from the actual source files in this repository.",
    language: "Explanation language",
    path: "Module > Page > File > Code > Explanation",
    whatCodeDoes: "What The Code Does",
    whyWritten: "Why It Is Written This Way",
    concepts: "Developer Concepts",
    scannedFolder: "Scanned src Folder",
    businessScan: "Business Module Scan",
    apiFamilies: "API Families Found In Source",
    drillDown: "Drill-down navigator",
    module: "Module",
    page: "Page",
    file: "File",
    selectedFile: "Selected file:",
    explanation: "Explanation",
    bestTitle: "Recommended Future-Project Structure",
    currentPattern: "Current project pattern",
    recommendedPattern: "Recommended pattern",
    teluguNote: "Telugu explanation",
  },
  te: {
    portal: "డెవలపర్ ట్రైనింగ్ పోర్టల్",
    intro: "ఈ React HRMS మరియు payroll project ని actual source files ఆధారంగా step-by-step గా అర్థం చేసుకునే గైడ్.",
    language: "వివరణ భాష",
    path: "Module > Page > File > Code > Explanation",
    whatCodeDoes: "ఈ code ఏమి చేస్తుంది",
    whyWritten: "ఇలా ఎందుకు రాసారు",
    concepts: "డెవలపర్ కాన్సెప్ట్‌లు",
    scannedFolder: "Scan చేసిన src ఫోల్డర్",
    businessScan: "Business Module Scan",
    apiFamilies: "Source లో కనిపించిన API Families",
    drillDown: "Drill-down navigator",
    module: "మాడ్యూల్",
    page: "పేజీ",
    file: "ఫైల్",
    selectedFile: "ఎంచుకున్న ఫైల్:",
    explanation: "వివరణ",
    bestTitle: "Future Projects కోసం Recommended Structure",
    currentPattern: "ప్రస్తుత project pattern",
    recommendedPattern: "Recommended pattern",
    teluguNote: "తెలుగు వివరణ",
  },
};

const moduleTelugu = {
  auth: "Login, token/session storage, roles refresh, protected pages, logout flow ని handle చేసే module.",
  dashboard: "Dashboard screens, quick access, hierarchy widgets, More launcher ఉన్న module.",
  organization: "Organization structure మరియు setup concepts చూపించే module.",
  task: "Projects, tasks, teams, statuses, comments, approvals, history flows manage చేసే module.",
  payroll: "Payroll dashboard, employees, salary components, run payroll, reports, payslips, saving declarations ఉన్న module.",
  state: "Redux, Context API, local state patterns explain చేసే infrastructure area.",
  wfh: "WFH approvals page ని real code example గా తీసుకుని filters, forms, API calls, table, modals concepts explain చేసే section.",
  best: "కొత్త React projects కోసం API client, routing config, services, cleanup, feature folders best practices.",
};

const fileTelugu = {
  "src/PayrollComponents/SignUp/LoginForm.js": [
    "React hooks, react-hook-form, axios, routing, images, SessionLogIn import చేస్తుంది.",
    "OTP mode, form errors, loader, QR value, password visibility కోసం local state ఉంది.",
    "onSubmit email/phone validate చేసి API payload build చేసి /api/user/login/ call చేస్తుంది.",
    "Success తర్వాత user-info, RolesFromDb, cookies, profile details store చేసి /payroll-dashboard కి navigate చేస్తుంది.",
    "Error అయితే local error state update చేస్తుంది లేదా 401 కోసం SessionLogIn call చేస్తుంది.",
  ],
  "src/sessionLogout.js": [
    "SessionLogIn shared logout/session cleanup function.",
    "Browser storage, cookies, axios Authorization clear చేసి login route కి redirect చేస్తుంది.",
  ],
  "src/Privaterote.js": [
    "PrivateRoute userinfoCookie చదివి access token parse చేస్తుంది.",
    "Token ని axios Authorization header లో set చేస్తుంది.",
    "TopHeader render చేసి protected page children render చేస్తుంది.",
    "RolesFromDb ఆధారంగా కొన్ని paths కి access false అయితే /notfound కి navigate చేస్తుంది.",
  ],
  "src/Components/Dashboard/MoreSection.js": [
    "services array More screen లో cards చూపించే source.",
    "allowedServices RolesFromDb మరియు role rules ఆధారంగా menu items filter చేస్తుంది.",
    "Card click navigate(service.path) call చేసి quick access లో service save చేస్తుంది.",
  ],
  "src/Components/Dashboard/ShowManagersAllHierarchyView.js": [
    "URL query నుంచి manager_id తీసుకుంటుంది.",
    "Hierarchy state లో API response data store చేస్తుంది.",
    "Left/right team lists show/hide చేయడానికి toggle handlers ఉన్నాయి.",
    "Clicked manager కోసం HandleManagerId hierarchy refetch చేస్తుంది.",
  ],
  "src/Components/Organization/OrganizationHierarchy.js": [
    "axios, Redux useSelector, ApiHeaders, React hooks import చేస్తుంది.",
    "tree, loading, error state maintain చేస్తుంది.",
    "companyId లేదా sessionStorage user-info నుంచి company id తీసుకుని hierarchy API call చేస్తుంది.",
    "renderTree CEO, admin, department, employees UI గా tree data convert చేస్తుంది.",
  ],
  "src/Components/TaskManagment/TaskManagementDashboardView.js": [
    "Chart components, react-select, axios, routing, Redux, ApiHeaders import చేస్తుంది.",
    "Filters, projects, employees, selectedProject, counts, loaders state లో ఉన్నాయి.",
    "getAlprojects /api/project/manage call చేసి project list set చేస్తుంది.",
    "toGetProjectDetails selected project details తీసుకుని count cards update చేస్తుంది.",
  ],
  "src/routes/ReportsRoutes.jsx and src/routes/PayrollRoutes.jsx": [
    "Payroll routes PrivateRoutePayroll తో wrap అవుతాయి.",
    "ReportsRoutes payroll setup, employee payroll paths కలిగి ఉంది.",
    "PayrollRoutes newer payroll report views మరియు processing records routes కలిగి ఉంది.",
  ],
  "src/Redux/store.js": [
    "Store localStorage నుంచి previous reduxState load చేస్తుంది.",
    "createStore rootReducer తో Redux store create చేస్తుంది.",
    "State మారిన ప్రతిసారి localStorage లో persist చేస్తుంది.",
  ],
  "src/Redux/reducers.js": [
    "Reducer selected company, employee work info, setup progress, multitenant details, header trigger store చేస్తుంది.",
    "Actions state slices replace/update చేస్తాయి.",
    "LOGOUT initialState return చేస్తుంది.",
  ],
  "src/Components/Common/QuickAccessContext.js": [
    "QuickAccessContext More/quick access selection కోసం lightweight context.",
    "Mount అయినప్పుడు localStorage నుంచి value read చేస్తుంది.",
    "quickAccess మారినప్పుడు localStorage update చేస్తుంది.",
  ],
  "src/Components/WorkFromHome/WFHApprovals.js": [
    "ఈ page third-party UI libraries, shared helpers, Redux, routing, API helpers import చేస్తుంది.",
    "Filter form మరియు approve/reject modal forms కోసం React Hook Form వాడుతుంది.",
    "Page data, loading flags, selected filters, selected row, pagination, modal flags local state లో ఉన్నాయి.",
    "fetchApproverList current filters నుంచి API params build చేసి WFH approver API call చేస్తుంది.",
    "DataTable server-side paginated list render చేస్తుంది. Approve/reject modals action submit చేసి table refresh చేస్తాయి.",
  ],
  "src/Components/WorkFromHome/EmpWfhDataInfo.js": [
    "WFHApprovals selected WFH request details చూపించడానికి child component import చేస్తుంది.",
    "Parent selected row state maintain చేసి popup open చేస్తుంది.",
    "ఇది common parent-child pattern: parent data own చేస్తుంది, child details render చేస్తుంది.",
  ],
  "recommended/apiClient.js": [
    "ప్రతి project లో ఒక common axios instance create చేయాలి.",
    "Request interceptor token automatically add చేస్తుంది.",
    "Response interceptor 401 వంటి common errors central place లో handle చేస్తుంది.",
    "Feature services apiClient import చేసి clean API functions export చేయాలి.",
  ],
  "recommended/AppRoutes.jsx": [
    "చాలా routes ఒకే wrapper వాడితే config array లో పెట్టడం మంచిది.",
    "map ద్వారా repeated Route JSX తగ్గుతుంది.",
    "Public/private/payroll route groups separate గా ఉంచాలి.",
    "Heavy pages lazy import చేయాలి.",
  ],
  "recommended/useEffect-cleanup.js": [
    "Component unmount అయినప్పుడు AbortController request cancel చేస్తుంది.",
    "Screen close అయిన తర్వాత setState run కాకుండా cleanup protect చేస్తుంది.",
    "Intervals, event listeners, sockets, subscriptions అన్నింటికి cleanup అవసరం.",
    "Expensive derived data useMemo లో పెట్టాలి.",
  ],
  "recommended/folder-structure.txt": [
    "api folder HTTP clients మరియు endpoint functions కోసం.",
    "features folder domain modules కోసం.",
    "shared folder reusable UI, hooks, utilities, styles కోసం.",
    "app folder providers, store setup, top-level wiring కోసం.",
  ],
};

const bestPracticeTopics = [
  {
    title: "Axios setup",
    current: "This project sets axios.defaults.baseURL in src/index.js and sets Authorization inside PrivateRoute/PrivateRoutePayroll. Pages call axios directly.",
    recommended: "For new projects, use one apiClient with interceptors and import it from feature services.",
    currentTe: "ఈ project లో axios.defaults.baseURL src/index.js లో ఉంది. Authorization PrivateRoute లో set అవుతుంది. Pages direct గా axios call చేస్తున్నాయి.",
    recommendedTe: "కొత్త projects లో ఒక apiClient create చేసి interceptors centralize చేయాలి. Feature services ఆ client ని import చేయాలి.",
    code: snippets.bestAxiosSetup,
  },
  {
    title: "Routing setup",
    current: "This project has route group files, which is good. Still, many Route declarations repeat the same protected wrapper pattern.",
    recommended: "Use route config arrays for repeated private routes and map them into Route components.",
    currentTe: "ఈ project లో route group files ఉన్నాయి, ఇది మంచి approach. కానీ చాలా Routes ఒకే protected wrapper pattern repeat చేస్తున్నాయి.",
    recommendedTe: "Repeated private routes కోసం route config array వాడి map చేస్తే code చిన్నగా, maintainable గా ఉంటుంది.",
    code: snippets.bestRouteSetup,
  },
  {
    title: "Memory management",
    current: "Many pages call APIs in useEffect. Some calls do not cancel when the component unmounts.",
    recommended: "Use AbortController for API calls, clear intervals/timeouts, and remove event listeners in cleanup.",
    currentTe: "చాలా pages useEffect లో API calls చేస్తున్నాయి. కొన్ని calls component unmount అయినప్పుడు cancel కావు.",
    recommendedTe: "API calls కి AbortController, intervals/timeouts కి clear, event listeners కి remove cleanup వాడాలి.",
    code: snippets.bestMemorySetup,
  },
  {
    title: "Folder structure",
    current: "The current project separates Components and PayrollComponents, but services and page API logic are often mixed inside page files.",
    recommended: "Use api, app, routes, features, and shared folders so pages, services, hooks, and reusable UI have clear places.",
    currentTe: "ప్రస్తుత project Components మరియు PayrollComponents గా split అయింది. కానీ API service logic ఎక్కువగా page files లోనే ఉంది.",
    recommendedTe: "api, app, routes, features, shared folders వాడితే pages, services, hooks, reusable UI కి clear places ఉంటాయి.",
    code: snippets.bestStructure,
  },
];

const pageConceptStudies = [
  {
    title: "Imports and dependency purpose",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhImports,
    explanation: "The imports tell you what the page needs: axios for API calls, moment for dates, DataTable for table rendering, react-hook-form for forms, Redux for selected company context, router navigation for session handling, and shared components for common UI.",
    explanationTe: "Imports చూస్తే page కి ఏవి అవసరమో తెలుస్తుంది: API calls కోసం axios, dates కోసం moment, table కోసం DataTable, forms కోసం react-hook-form, selected company కోసం Redux, session navigation కోసం router, common UI కోసం shared components.",
    generalUse: "In any project, group imports mentally as framework, third-party UI, shared helpers, page children, and assets. If imports become too many, the page may need smaller child components or hooks.",
    generalUseTe: "ఏ project అయినా imports ని framework, third-party UI, shared helpers, child components, assets గా అర్థం చేసుకోండి. Imports చాలా పెరిగితే page ని smaller components/hooks గా split చేయాలి.",
  },
  {
    title: "Role-based default helper",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhRoleHelper,
    explanation: "getWfhDefaultReportees reads user-info from sessionStorage, normalizes roles, and returns All for ADMIN/HR or Direct for other users. The try/catch prevents the page from breaking if storage data is missing or invalid.",
    explanationTe: "getWfhDefaultReportees sessionStorage నుంచి user-info తీసుకుని roles normalize చేసి ADMIN/HR అయితే All, లేకపోతే Direct return చేస్తుంది. storage data invalid అయినా page break కాకుండా try/catch ఉంది.",
    generalUse: "Use small pure helper functions for business defaults. Keep them outside the component when they do not need component state.",
    generalUseTe: "Business default logic కోసం చిన్న helper functions వాడండి. Component state అవసరం లేకపోతే component బయట పెట్టడం మంచిది.",
  },
  {
    title: "Forms, watched fields, and local state",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhStateAndForms,
    explanation: "The page uses three form instances: one for filters, one for approve modal, and one for reject modal. It watches from_Date and to_Date so API fetches use the latest form values. Local state stores table data, loading, selected filters, and modal state.",
    explanationTe: "ఈ page మూడు forms వాడుతుంది: filters, approve modal, reject modal. from_Date/to_Date watch చేస్తుంది కాబట్టి latest form values తో API call అవుతుంది. Table data, loading, filters, modal state local state లో ఉన్నాయి.",
    generalUse: "Use separate form instances when forms have different submit actions and validation rules. Keep server data, UI flags, selected rows, and pagination as clear separate state variables.",
    generalUseTe: "Different submit actions/validation ఉంటే separate form instances వాడండి. Server data, UI flags, selected rows, pagination ని clear separate state variables గా ఉంచండి.",
  },
  {
    title: "Date validation before API call",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhDateValidation,
    explanation: "The page validates dates strictly using moment before fetching data. If To Date is before From Date, it sets an error and blocks the API call.",
    explanationTe: "API call ముందు dates ని moment తో strict గా validate చేస్తుంది. To Date, From Date కంటే ముందు ఉంటే error set చేసి API call block చేస్తుంది.",
    generalUse: "Validate user input before network calls. It reduces invalid API traffic and gives immediate feedback to the user.",
    generalUseTe: "Network call ముందు user input validate చేయాలి. దాంతో invalid API traffic తగ్గుతుంది మరియు user కి immediate feedback వస్తుంది.",
  },
  {
    title: "API params and list fetch",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhFetchList,
    explanation: "fetchApproverList builds a params object from filters instead of manually concatenating a long query string. It sets loading state, calls the WFH approver endpoint, handles different response shapes, updates table rows/total rows, and handles 401/session errors.",
    explanationTe: "fetchApproverList filters నుంచి params object build చేస్తుంది. Long query string manually concatenate చేయదు. Loading set చేసి WFH API call చేస్తుంది, response shape handle చేస్తుంది, rows/total update చేస్తుంది, 401 session error handle చేస్తుంది.",
    generalUse: "For all projects, prefer params objects for GET filters. Keep fetch functions responsible for validate, build params, call API, update state, handle error, and cleanup loading.",
    generalUseTe: "ఏ project అయినా GET filters కోసం params object వాడండి. Fetch function లో validate, params build, API call, state update, error handle, loading cleanup clear గా ఉండాలి.",
  },
  {
    title: "Effects and dependency thinking",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhEffects,
    explanation: "One effect loads initial data. Another refetches the list when filters change. A third reloads employees when departments change. This is dependency-driven data flow.",
    explanationTe: "ఒక effect initial data load చేస్తుంది. ఇంకొక effect filters change అయితే list refetch చేస్తుంది. మూడో effect departments change అయితే employees reload చేస్తుంది. ఇది dependency-driven data flow.",
    generalUse: "Use one effect per reason. Avoid mixing unrelated work in one large effect. Always check dependency arrays carefully to prevent stale data or infinite API calls.",
    generalUseTe: "ఒక్కో reason కి ఒక effect వాడండి. Unrelated work ఒక పెద్ద effect లో mix చేయకండి. Stale data/infinite API calls రాకుండా dependency array జాగ్రత్తగా పెట్టాలి.",
  },
  {
    title: "Approve action handler",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhApproveReject,
    explanation: "submitApprove sends a POST payload with request id, reason, action_by, and action. On success it closes the modal, shows a success message, and refreshes the list.",
    explanationTe: "submitApprove request id, reason, action_by, action తో POST payload పంపుతుంది. Success అయితే modal close చేసి success message చూపించి list refresh చేస్తుంది.",
    generalUse: "For approve/reject style workflows, keep action handlers small: set submitting, build payload, post, show feedback, refresh data, clear submitting in finally.",
    generalUseTe: "Approve/reject workflows లో handler simple గా ఉంచాలి: submitting set చేయాలి, payload build చేయాలి, post చేయాలి, feedback చూపాలి, data refresh చేయాలి, finally లో submitting clear చేయాలి.",
  },
  {
    title: "Server-side DataTable",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhDataTable,
    explanation: "DataTable receives columns, data, totalRows, currentPage, and server pagination callbacks. While the first load is pending, the page shows ShimmerTable.",
    explanationTe: "DataTable కి columns, data, totalRows, currentPage, server pagination callbacks ఇస్తుంది. Initial load pending ఉన్నప్పుడు ShimmerTable చూపిస్తుంది.",
    generalUse: "For large data, use server pagination. The UI should not load every row at once. Keep page and page_size in state and pass them to the API.",
    generalUseTe: "Large data కోసం server pagination వాడాలి. UI ఒకేసారి అన్ని rows load చేయకూడదు. page/page_size state లో ఉంచి API కి పంపాలి.",
  },
  {
    title: "Modal form pattern",
    actualFile: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhModalForm,
    explanation: "The approve modal is controlled by approveModalOpen. React Hook Form validates approval_reason. Closing the modal resets form state and clears selected row data.",
    explanationTe: "Approve modal approveModalOpen state తో control అవుతుంది. React Hook Form approval_reason validate చేస్తుంది. Modal close చేస్తే form reset అవుతుంది మరియు selected row clear అవుతుంది.",
    generalUse: "For modal forms, keep open state, selected record, form validation, submit loading, and reset behavior explicit.",
    generalUseTe: "Modal forms లో open state, selected record, validation, submit loading, reset behavior clear గా maintain చేయాలి.",
  },
];

const roleMenuLiveFlow = [
  {
    title: "1. Data source: login API stores user and role data",
    code: snippets.roleMenuLoginStorage,
    explanation: "The menu does not call the roles API directly. Login receives the response, creates user-info, and stores result.data.existedRolesData as RolesFromDb. Later MoreSection.js reads that stored data.",
    explanationTe: "Menu direct గా roles API call చేయదు. Login response వచ్చిన తర్వాత user-info create చేసి result.data.existedRolesData ని RolesFromDb గా store చేస్తుంది. తర్వాత MoreSection.js అదే stored data చదువుతుంది.",
    flow: "API response -> sessionStorage/localStorage -> MoreSection reads storage -> menu cards are filtered.",
    flowTe: "API response -> sessionStorage/localStorage -> MoreSection storage చదువుతుంది -> menu cards filter అవుతాయి.",
  },
  {
    title: "2. user-info shape this menu expects",
    code: snippets.roleMenuExpectedUserInfo,
    explanation: "This is not a new API. It is the minimum object shape required by the actual MoreSection.js code. The roles array decides ADMIN/HR checks. The employee number is used to build the manager hierarchy URL.",
    explanationTe: "ఇది కొత్త API కాదు. Actual MoreSection.js code కి అవసరమైన minimum object shape. roles array ADMIN/HR checks కోసం వాడుతుంది. employee number manager hierarchy URL build చేయడానికి వాడుతుంది.",
    flow: "userInfos.roles answers: is this user ADMIN or HR? userInfos.data.employee answers: which manager id should go in the URL?",
    flowTe: "userInfos.roles: ఈ user ADMIN/HR ఆ? userInfos.data.employee: URL లో manager id ఏది పెట్టాలి?",
  },
  {
    title: "3. RolesFromDb shape this menu expects",
    code: snippets.roleMenuExpectedRoles,
    explanation: "RolesFromDb is the permission map. Each module can have view true/false. Some modules also have submodules. The menu checks this map before showing cards.",
    explanationTe: "RolesFromDb permission map. ప్రతి module కి view true/false ఉంటుంది. కొన్ని modules కి submodules కూడా ఉంటాయి. Menu card చూపించే ముందు ఈ map check చేస్తుంది.",
    flow: "If RolesFromDb.modules.TaskManagement.view is true, Task Management card can show. If false or missing, it hides.",
    flowTe: "RolesFromDb.modules.TaskManagement.view true అయితే Task Management card show అవుతుంది. false/missing అయితే hide అవుతుంది.",
  },
  {
    title: "4. Service list is the UI menu configuration",
    code: snippets.moreServices,
    explanation: "services is not API data. It is local UI configuration: card name, icon, route path, and permission moduleKey. The moduleKey connects a card to RolesFromDb.modules[moduleKey].",
    explanationTe: "services API data కాదు. ఇది local UI configuration: card name, icon, route path, permission moduleKey. moduleKey card ని RolesFromDb.modules[moduleKey] తో connect చేస్తుంది.",
    flow: "Card config + RolesFromDb permission = final visible menu card.",
    flowTe: "Card config + RolesFromDb permission = final visible menu card.",
  },
  {
    title: "5. Permission filter decides visible cards",
    code: snippets.roleMenuFullFilter,
    explanation: "filter loops through each service. Normal cards require RolesFromDb.modules[key].view === true. Admin Organization Hierarchy has special logic: user must be ADMIN/HR and hierarchy permission must not be false. Learning Hub is always visible.",
    explanationTe: "filter ప్రతి service మీద loop అవుతుంది. Normal cards కి RolesFromDb.modules[key].view === true కావాలి. Admin Organization Hierarchy కి special logic ఉంది: user ADMIN/HR కావాలి మరియు hierarchy permission false కాకూడదు. Learning Hub ఎప్పుడూ visible.",
    flow: "services array -> filter permission checks -> allowedServices array.",
    flowTe: "services array -> filter permission checks -> allowedServices array.",
  },
  {
    title: "6. Dynamic path adds payload into URL query params",
    code: snippets.roleMenuDynamicPath,
    explanation: "After filtering, the code changes the Admin Organization Hierarchy path. It takes hierarchyManagerId from user-info and adds it as manager_id in the URL. That query param becomes the payload for the next page request.",
    explanationTe: "Filtering తర్వాత Admin Organization Hierarchy path మార్చుతుంది. user-info నుంచి hierarchyManagerId తీసుకుని URL లో manager_id గా పెడుతుంది. ఆ query param next page request payload లా పనిచేస్తుంది.",
    flow: "employee number -> /showmanagerallhierarchy?manager_id=EMP001 -> hierarchy page reads manager_id -> API request uses it.",
    flowTe: "employee number -> /showmanagerallhierarchy?manager_id=EMP001 -> hierarchy page manager_id చదువుతుంది -> API request లో వాడుతుంది.",
  },
  {
    title: "7. UI render maps allowedServices into cards",
    code: snippets.roleMenuUiRender,
    explanation: "React renders one Bootstrap Card for each allowed service. If a service was removed by the filter, no card is created. Clicking the card navigates to service.path and stores that card as quick access.",
    explanationTe: "React allowedServices లోని ప్రతి service కి ఒక Bootstrap Card render చేస్తుంది. filter remove చేసిన service కి card create కాదు. Card click చేస్తే service.path కి navigate అవుతుంది మరియు quick access లో store అవుతుంది.",
    flow: "allowedServices.map -> Card UI -> onClick -> navigate(path) + setQuickAccess(service).",
    flowTe: "allowedServices.map -> Card UI -> onClick -> navigate(path) + setQuickAccess(service).",
  },
];

const codingConceptDeepDives = [
  {
    title: "1. Imports: how a page receives tools",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhImports,
    explanation: "Imports tell you what the file depends on. In WFHApprovals.js, axios is for API calls, useState/useEffect/useCallback are React hooks, useForm is for forms, DataTable is for table UI, useSelector reads Redux, useNavigate changes routes, and ApiHeaders adds tenant headers.",
    explanationTe: "Imports చూస్తే ఈ file ఏ tools మీద depend అవుతుందో తెలుస్తుంది. WFHApprovals.js లో axios API calls కోసం, useState/useEffect/useCallback React hooks కోసం, useForm forms కోసం, DataTable table UI కోసం, useSelector Redux కోసం, useNavigate routing కోసం, ApiHeaders tenant headers కోసం వాడుతున్నారు.",
    beginner: "When you open any page, first read imports. They reveal the main concepts used in that page.",
    beginnerTe: "ఏ page open చేసినా ముందుగా imports చదవండి. ఆ page లో ఏ concepts ఉన్నాయో అక్కడే clue దొరుకుతుంది.",
  },
  {
    title: "2. Component function: page starts here",
    file: "src/Components/TaskManagment/TaskManagementDashboardView.js",
    code: snippets.taskDashboard,
    explanation: "A React page is usually a function component. Inside it, this project sets document title, reads Redux data, creates navigation, creates state variables, defines API functions, and returns JSX.",
    explanationTe: "React page సాధారణంగా function component. దాని లోపల document title set చేస్తారు, Redux data చదువుతారు, navigation create చేస్తారు, state variables create చేస్తారు, API functions define చేస్తారు, చివరికి JSX return చేస్తారు.",
    beginner: "Think of a page component as one workflow: state + functions + UI.",
    beginnerTe: "Page component ని ఒక workflow లా చూడండి: state + functions + UI.",
  },
  {
    title: "3. useState: page memory",
    file: "src/Components/TaskManagment/TaskManagementDashboardView.js",
    code: lines([
      "const [TotalProjectList, setTotalProjectList] = useState([]);",
      "const [employee, setemployee] = useState([]);",
      "const [CountOfTotalTasks, setCountOfTotalTasks] = useState(0);",
      "const [selectedProject, setSelectedProject] = useState('');",
    ]),
    explanation: "useState stores data that can change on the screen. Arrays store lists, numbers store counts, strings store selected values. When a setter runs, React renders the UI again with new data.",
    explanationTe: "useState screen మీద మారే data ని store చేస్తుంది. Arrays lists కోసం, numbers counts కోసం, strings selected values కోసం. Setter call అయితే React UI ని new data తో మళ్లీ render చేస్తుంది.",
    beginner: "If UI must change after click/API/form input, that value usually belongs in state.",
    beginnerTe: "Click/API/form input తర్వాత UI మారాలి అంటే ఆ value సాధారణంగా state లో ఉండాలి.",
  },
  {
    title: "4. useEffect: run code after render",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhEffects,
    explanation: "useEffect is used for side effects like initial API loading or refetching when filters change. Dependency array decides when the effect runs again.",
    explanationTe: "useEffect initial API loading లేదా filters change అయితే refetch చేయడానికి వాడుతారు. Dependency array effect మళ్లీ ఎప్పుడు run అవ్వాలో decide చేస్తుంది.",
    beginner: "Use useEffect when the page must do something because state/props changed.",
    beginnerTe: "State/props change అయినందుకు page ఏదైనా పని చేయాలి అంటే useEffect వాడండి.",
  },
  {
    title: "5. useCallback: stable function for effects",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhFetchList,
    explanation: "WFHApprovals wraps fetch logic with useCallback because effects depend on that function. This reduces accidental repeated function recreation and makes dependencies explicit.",
    explanationTe: "WFHApprovals fetch logic ని useCallback తో wrap చేస్తుంది, ఎందుకంటే effects ఆ function మీద depend అవుతాయి. దీని వల్ల repeated function recreation తగ్గుతుంది మరియు dependencies clear అవుతాయి.",
    beginner: "Use useCallback when a function is passed to children or used inside useEffect dependencies.",
    beginnerTe: "Function child components కి pass చేసినప్పుడు లేదా useEffect dependencies లో వాడినప్పుడు useCallback ఉపయోగపడుతుంది.",
  },
  {
    title: "6. API request payload",
    file: "src/PayrollComponents/SignUp/LoginForm.js",
    code: lines([
      "var req = {};",
      "if (email.match(mailRegexx)) {",
      "  req = { email: email, password: password };",
      "} else if (email.match(phoneRegexx)) {",
      "  req = { phone: email, password: password };",
      "}",
      "",
      "await axios.post(\"/api/user/login/\", req)",
    ]),
    explanation: "Payload means the data sent to API. LoginForm builds req differently for email login and phone login. That req object becomes the POST body.",
    explanationTe: "Payload అంటే API కి పంపే data. LoginForm email login అయితే ఒక req, phone login అయితే మరో req build చేస్తుంది. ఆ req object POST body అవుతుంది.",
    beginner: "Before every API call ask: what endpoint, what method, what payload, what headers?",
    beginnerTe: "ప్రతి API call ముందు అడగాలి: endpoint ఏది, method ఏది, payload ఏది, headers ఏవి?",
  },
  {
    title: "7. API response handling",
    file: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
    code: snippets.managerHierarchy,
    explanation: "The hierarchy page calls axios.get, checks response.data.statusCode, reads response.data.result, then updates state. If the API fails, catch handles errors.",
    explanationTe: "Hierarchy page axios.get call చేస్తుంది, response.data.statusCode check చేస్తుంది, response.data.result చదివి state update చేస్తుంది. API fail అయితే catch errors handle చేస్తుంది.",
    beginner: "Response flow is usually: call API -> validate status -> extract result -> set state -> render UI.",
    beginnerTe: "Response flow సాధారణంగా: API call -> status validate -> result extract -> state set -> UI render.",
  },
  {
    title: "8. Headers and tenant data",
    file: "src/Components/Common/ApiHeaders.js",
    code: snippets.apiHeaders,
    explanation: "ApiHeaders creates headers like selected company and current company. Pages call this helper before API requests so backend knows which company context is active.",
    explanationTe: "ApiHeaders selected company/current company లాంటి headers create చేస్తుంది. Pages API request ముందు ఈ helper call చేస్తాయి, దాంతో backend కి active company context తెలుస్తుంది.",
    beginner: "Headers are extra request information. Auth token and selected company often go there.",
    beginnerTe: "Headers request కి extra information. Auth token మరియు selected company ఎక్కువగా అక్కడికి వెళ్తాయి.",
  },
  {
    title: "9. Conditional rendering",
    file: "src/Privaterote.js",
    code: snippets.privateRouteAuth,
    explanation: "PrivateRoute conditionally renders Navigate or the protected page. If cookie is missing, user goes to login. If cookie exists, header and children render.",
    explanationTe: "PrivateRoute condition ఆధారంగా Navigate లేదా protected page render చేస్తుంది. Cookie లేకపోతే login కి పంపుతుంది. Cookie ఉంటే header మరియు children render అవుతాయి.",
    beginner: "Conditional rendering means UI changes based on data: logged in or not, loading or loaded, allowed or not allowed.",
    beginnerTe: "Conditional rendering అంటే data ఆధారంగా UI మారుతుంది: login అయిందా లేదా, loading ఆ loaded ఆ, allowed ఆ not allowed ఆ.",
  },
  {
    title: "10. Array filter: permission logic",
    file: "src/Components/Dashboard/MoreSection.js",
    code: snippets.roleMenuFullFilter,
    explanation: "filter creates a new array containing only allowed menu cards. This is why a user sees only permitted modules.",
    explanationTe: "filter allowed menu cards మాత్రమే ఉన్న new array create చేస్తుంది. అందుకే user కి permitted modules మాత్రమే కనిపిస్తాయి.",
    beginner: "Use filter when you want to remove items from a list based on a condition.",
    beginnerTe: "Condition ఆధారంగా list నుంచి items remove చేయాలంటే filter వాడండి.",
  },
  {
    title: "11. Array map: render list UI",
    file: "src/Components/Dashboard/MoreSection.js",
    code: snippets.roleMenuUiRender,
    explanation: "map converts each allowed service into a Card UI. The key helps React track each item. onClick connects UI action to navigation.",
    explanationTe: "map ప్రతి allowed service ని Card UI గా మార్చుతుంది. key React కి ప్రతి item track చేయడానికి help చేస్తుంది. onClick UI action ని navigation తో connect చేస్తుంది.",
    beginner: "Use map when one array must become many UI elements.",
    beginnerTe: "ఒక array నుంచి చాలా UI elements render చేయాలంటే map వాడండి.",
  },
  {
    title: "12. Routing and navigation",
    file: "src/routes/DashboardRoutes.jsx",
    code: snippets.dashboardRoutes,
    explanation: "Routes connect URL paths to components. Private routes wrap business pages with PrivateRoute. useNavigate moves users after button clicks or successful API work.",
    explanationTe: "Routes URL paths ని components తో connect చేస్తాయి. Business pages PrivateRoute తో wrap అవుతాయి. Button click/API success తర్వాత user ని move చేయడానికి useNavigate వాడుతారు.",
    beginner: "Routing answers: which component should open for this URL?",
    beginnerTe: "Routing answer చేస్తుంది: ఈ URL కి ఏ component open అవ్వాలి?",
  },
  {
    title: "13. Browser storage",
    file: "src/PayrollComponents/SignUp/LoginForm.js",
    code: snippets.roleMenuLoginStorage,
    explanation: "The project stores login user data and permissions in sessionStorage/localStorage. Later files read those values instead of calling login again.",
    explanationTe: "Project login user data మరియు permissions ని sessionStorage/localStorage లో store చేస్తుంది. తర్వాత files login మళ్లీ call చేయకుండా ఆ values చదువుతాయి.",
    beginner: "Storage is useful after refresh, but clear it correctly on logout.",
    beginnerTe: "Refresh తర్వాత data కావాలి అంటే storage useful, కానీ logout లో clear చేయాలి.",
  },
  {
    title: "14. Context API",
    file: "src/Components/Common/QuickAccessContext.js",
    code: snippets.quickAccess,
    explanation: "QuickAccessContext shares quickAccess and setQuickAccess across components without passing props through many levels.",
    explanationTe: "QuickAccessContext quickAccess మరియు setQuickAccess ని many levels props pass చేయకుండా components మధ్య share చేస్తుంది.",
    beginner: "Use Context for app-level UI state that many components need.",
    beginnerTe: "చాలా components కి అవసరమైన app-level UI state కోసం Context వాడండి.",
  },
  {
    title: "15. Redux global state",
    file: "src/Redux/store.js and src/Redux/reducers.js",
    code: snippets.reduxStore,
    explanation: "Redux stores cross-screen data like selected company. The store is persisted to localStorage so selected data can survive refresh.",
    explanationTe: "Redux selected company లాంటి cross-screen data store చేస్తుంది. Store localStorage లో persist అవుతుంది కాబట్టి refresh తర్వాత కూడా data ఉండొచ్చు.",
    beginner: "Use Redux for data needed by many unrelated pages, not every small modal flag.",
    beginnerTe: "చాలా unrelated pages కి అవసరమైన data కోసం Redux వాడండి; ప్రతి చిన్న modal flag కోసం కాదు.",
  },
  {
    title: "16. Forms and validation",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhStateAndForms,
    explanation: "WFHApprovals uses react-hook-form to register fields, watch dates, validate modal reason fields, and reset forms.",
    explanationTe: "WFHApprovals react-hook-form తో fields register చేస్తుంది, dates watch చేస్తుంది, modal reason fields validate చేస్తుంది, forms reset చేస్తుంది.",
    beginner: "Forms need input values, validation errors, submit handler, and reset behavior.",
    beginnerTe: "Forms కి input values, validation errors, submit handler, reset behavior అవసరం.",
  },
  {
    title: "17. Tables and pagination",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhDataTable,
    explanation: "DataTable renders rows from state. Server pagination means page number and page size go to API, and API total count controls pagination UI.",
    explanationTe: "DataTable state లోని rows render చేస్తుంది. Server pagination అంటే page number మరియు page size API కి వెళ్తాయి, API total count pagination UI ని control చేస్తుంది.",
    beginner: "For large data, do not load everything. Ask backend for one page at a time.",
    beginnerTe: "Large data కోసం మొత్తం load చేయవద్దు. Backend నుంచి ఒక్క page చొప్పున తీసుకోండి.",
  },
  {
    title: "18. Modals and action handlers",
    file: "src/Components/WorkFromHome/WFHApprovals.js",
    code: snippets.wfhApproveReject,
    explanation: "Approve/reject flow stores selected row, opens a modal, validates reason, posts action to API, closes modal, and refreshes list.",
    explanationTe: "Approve/reject flow selected row store చేస్తుంది, modal open చేస్తుంది, reason validate చేస్తుంది, API కి action post చేస్తుంది, modal close చేసి list refresh చేస్తుంది.",
    beginner: "Action workflows need selected record, open state, submit loading, API call, and refresh.",
    beginnerTe: "Action workflows కి selected record, open state, submit loading, API call, refresh అవసరం.",
  },
  {
    title: "19. Images and assets",
    file: "src/Components/Dashboard/MoreSection.js",
    code: lines([
      "import TaskManagement from './../../images/m_TaskManagement.png'",
      "import AdminOrganizationHierarchy from './../../images/m_AdminOrganizationHierarchy.png'",
      "import LearningHubIcon from './../../images/Instructions_Icon.png'",
      "",
      "{ name: \"Task Management\", icon: `${TaskManagement}`, path: \"/task-management-dashboard\", moduleKey: \"TaskManagement\" }",
      "",
      "<img src={service.icon} alt={service.name} width=\"32\" height=\"32\" />",
    ]),
    explanation: "Images are imported as modules, stored in service config, and rendered in img tags. alt text uses service.name.",
    explanationTe: "Images modules లా import అవుతాయి, service config లో store అవుతాయి, img tags లో render అవుతాయి. alt text service.name నుంచి వస్తుంది.",
    beginner: "Import local images, pass them as src, and always provide useful alt text.",
    beginnerTe: "Local images import చేసి src గా pass చేయండి, useful alt text తప్పనిసరిగా ఇవ్వండి.",
  },
  {
    title: "20. Cleanup and memory management",
    file: "recommended pattern for this project",
    code: snippets.bestMemorySetup,
    explanation: "Many project pages call APIs in useEffect. For future changes, AbortController cleanup prevents state updates after unmount and avoids wasted requests.",
    explanationTe: "Project లో చాలా pages useEffect లో APIs call చేస్తాయి. Future changes లో AbortController cleanup unmount తర్వాత state update కాకుండా, wasted requests తగ్గించడానికి ఉపయోగపడుతుంది.",
    beginner: "If effect starts something long-running, return a cleanup function.",
    beginnerTe: "Effect ఏదైనా long-running పని start చేస్తే cleanup function return చేయండి.",
  },
];

const stepCodeWalkthroughs = {
  routing: [
    {
      title: "1. App.js creates the routing shell",
      file: "src/App.js",
      code: snippets.appProviders,
      explanation: "App.js wraps the whole app with providers, then places BrowserRouter around Routes. Suspense shows a loader while lazy route components are downloading. Inside Routes, App.js calls grouped route functions like getDashboardRoutes and getReportsRoutes.",
      explanationTe: "App.js మొత్తం app ని providers తో wrap చేసి, BrowserRouter లో Routes పెడుతుంది. Lazy route components download అవుతున్నప్పుడు Suspense loader చూపిస్తుంది. Routes లో getDashboardRoutes, getReportsRoutes లాంటి grouped route functions call చేస్తుంది.",
      flow: "App starts -> providers wrap app state/context -> BrowserRouter enables URL routing -> Suspense handles lazy loading -> grouped route functions return Route elements.",
      flowTe: "App start -> providers app state/context wrap చేస్తాయి -> BrowserRouter URL routing enable చేస్తుంది -> Suspense lazy loading handle చేస్తుంది -> grouped route functions Route elements return చేస్తాయి.",
    },
    {
      title: "2. routeGroups.jsx exports route group functions",
      file: "src/routes/routeGroups.jsx",
      code: snippets.routeGroups,
      explanation: "This file is a central index for route groups. Instead of importing every route file manually in many places, App.js can import grouped route functions from one file.",
      explanationTe: "ఈ file route groups కి central index. చాలా places లో ప్రతి route file manual import చేయకుండా App.js ఒక file నుంచి grouped route functions import చేస్తుంది.",
      flow: "DashboardRoutes/AuthRoutes/etc. -> routeGroups.jsx re-exports them -> App.js imports grouped functions.",
      flowTe: "DashboardRoutes/AuthRoutes/etc. -> routeGroups.jsx వాటిని re-export చేస్తుంది -> App.js grouped functions import చేస్తుంది.",
    },
    {
      title: "3. routeComponents.js lazy-loads pages",
      file: "src/routes/routeComponents.js",
      code: snippets.routeComponents,
      explanation: "routeComponents.js exports page components with React lazy. Lazy loading means the browser does not download every page at startup. A page file is loaded when that route is needed.",
      explanationTe: "routeComponents.js page components ని React lazy తో export చేస్తుంది. Lazy loading అంటే startup లో browser అన్ని pages download చేయదు. ఆ route అవసరం అయినప్పుడు page file load అవుతుంది.",
      flow: "User opens route -> React needs component -> lazy import downloads component file -> Suspense shows loader until ready.",
      flowTe: "User route open చేస్తాడు -> React component కావాలి -> lazy import component file download చేస్తుంది -> ready అయ్యే వరకు Suspense loader చూపిస్తుంది.",
    },
    {
      title: "4. DashboardRoutes maps URLs to pages",
      file: "src/routes/DashboardRoutes.jsx",
      code: snippets.dashboardRoutes,
      explanation: "A Route connects one URL path to one component. Public routes render directly, but business routes wrap the page with PrivateRoute. That means login/auth/header logic runs before showing the page.",
      explanationTe: "Route ఒక URL path ని ఒక component తో connect చేస్తుంది. Public routes direct render అవుతాయి, కానీ business routes page ని PrivateRoute తో wrap చేస్తాయి. అంటే page చూపించే ముందు login/auth/header logic run అవుతుంది.",
      flow: "URL /moreSection -> Route matches -> PrivateRoute runs -> MoreSection renders if authenticated.",
      flowTe: "URL /moreSection -> Route match అవుతుంది -> PrivateRoute run అవుతుంది -> authenticated అయితే MoreSection render అవుతుంది.",
    },
    {
      title: "5. ReportsRoutes handles hierarchy routes",
      file: "src/routes/ReportsRoutes.jsx",
      code: snippets.reportsHierarchyRoutes,
      explanation: "This project registers both /showmanagerallhierarchy/:manager_id and /showmanagerallhierarchy. The current MoreSection uses query string manager_id, so the non-param route also exists. The page then reads manager_id from URL query params.",
      explanationTe: "ఈ project /showmanagerallhierarchy/:manager_id మరియు /showmanagerallhierarchy రెండూ register చేస్తుంది. Current MoreSection query string manager_id వాడుతుంది కాబట్టి non-param route కూడా ఉంది. తర్వాత page URL query params నుంచి manager_id చదువుతుంది.",
      flow: "Card click -> navigate('/showmanagerallhierarchy?manager_id=...') -> ReportsRoutes matches /showmanagerallhierarchy -> page reads query manager_id.",
      flowTe: "Card click -> navigate('/showmanagerallhierarchy?manager_id=...') -> ReportsRoutes /showmanagerallhierarchy match చేస్తుంది -> page query manager_id చదువుతుంది.",
    },
    {
      title: "6. PrivateRoute protects pages",
      file: "src/Privaterote.js",
      code: snippets.privateRouteAuth,
      explanation: "PrivateRoute checks the login cookie. If missing, it redirects to /. If present, it reads token, sets axios Authorization, renders TopHeader, and then renders children. children is the actual page component inside the route.",
      explanationTe: "PrivateRoute login cookie check చేస్తుంది. Cookie లేకపోతే / కి redirect చేస్తుంది. Cookie ఉంటే token read చేసి axios Authorization set చేస్తుంది, TopHeader render చేస్తుంది, తర్వాత children render చేస్తుంది. children అంటే route లో ఉన్న actual page component.",
      flow: "Route element <PrivateRoute><Page /></PrivateRoute> -> cookie check -> token setup -> layout/header -> Page renders.",
      flowTe: "Route element <PrivateRoute><Page /></PrivateRoute> -> cookie check -> token setup -> layout/header -> Page render.",
    },
    {
      title: "7. Button/card navigation uses useNavigate",
      file: "src/Components/Dashboard/MoreSection.js",
      code: snippets.roleMenuUiRender,
      explanation: "Routes are opened by links or navigation functions. MoreSection card click calls navigate(service.path). service.path comes from the services array and can be changed dynamically before render.",
      explanationTe: "Routes links లేదా navigation functions ద్వారా open అవుతాయి. MoreSection card click navigate(service.path) call చేస్తుంది. service.path services array నుంచి వస్తుంది మరియు render ముందు dynamic గా change అవుతుంది.",
      flow: "User clicks card -> onClick runs -> navigate(path) changes URL -> matching Route renders page.",
      flowTe: "User card click చేస్తాడు -> onClick run అవుతుంది -> navigate(path) URL change చేస్తుంది -> matching Route page render చేస్తుంది.",
    },
    {
      title: "8. Full routing flow",
      file: "Routing execution order",
      code: lines([
        "1. index.js renders <App />",
        "2. App.js creates <BrowserRouter><Routes>...</Routes></BrowserRouter>",
        "3. routeGroups.jsx provides grouped route functions",
        "4. routeComponents.js provides lazy page components",
        "5. DashboardRoutes/ReportsRoutes define path -> element",
        "6. PrivateRoute checks auth for protected pages",
        "7. useNavigate or browser URL changes path",
        "8. Matching Route renders the selected page",
      ]),
      explanation: "This is the complete routing mental model for this project. When debugging routes, check these files in this order: App.js, routeGroups.jsx, routeComponents.js, route file, PrivateRoute, then the page component.",
      explanationTe: "ఈ project routing కి complete mental model ఇదే. Route debug చేస్తున్నప్పుడు ఈ order లో files check చేయండి: App.js, routeGroups.jsx, routeComponents.js, route file, PrivateRoute, తర్వాత page component.",
      flow: "URL change -> React Router finds Route -> protected wrapper runs -> lazy component loads -> page UI renders.",
      flowTe: "URL change -> React Router Route find చేస్తుంది -> protected wrapper run అవుతుంది -> lazy component load అవుతుంది -> page UI render అవుతుంది.",
    },
  ],
  api: [
    {
      title: "1. Axios is configured before App renders",
      file: "src/index.js",
      code: snippets.indexAxios,
      explanation: "index.js imports axios and sets axios.defaults.baseURL. Because this runs before App renders, every axios.get/post in the app can use relative URLs like /api/user/login/. It also sets default JSON headers for POST requests.",
      explanationTe: "index.js axios import చేసి axios.defaults.baseURL set చేస్తుంది. ఇది App render కాకముందే run అవుతుంది కాబట్టి app లోని ప్రతి axios.get/post /api/user/login/ లాంటి relative URLs వాడగలదు. POST requests కోసం default JSON headers కూడా set చేస్తుంది.",
      flow: "Browser loads index.js -> axios baseURL is set -> App renders -> page calls axios('/api/...') -> request goes to baseURL + endpoint.",
      flowTe: "Browser index.js load చేస్తుంది -> axios baseURL set అవుతుంది -> App render అవుతుంది -> page axios('/api/...') call చేస్తుంది -> request baseURL + endpoint కి వెళ్తుంది.",
    },
    {
      title: "2. Protected route attaches auth token",
      file: "src/Privaterote.js",
      code: snippets.privateRouteAuth,
      explanation: "PrivateRoute reads userinfoCookie, extracts token.access, and sets axios.defaults.headers.common.Authorization. After that, API calls include the bearer token by default.",
      explanationTe: "PrivateRoute userinfoCookie చదివి token.access తీసుకుని axios.defaults.headers.common.Authorization set చేస్తుంది. దాని తర్వాత API calls లో bearer token default గా వెళ్తుంది.",
      flow: "Cookie token -> PrivateRoute -> axios Authorization header -> backend knows logged-in user.",
      flowTe: "Cookie token -> PrivateRoute -> axios Authorization header -> backend logged-in user ని గుర్తిస్తుంది.",
    },
    {
      title: "3. ApiHeaders adds company/tenant context",
      file: "src/Components/Common/ApiHeaders.js",
      code: snippets.apiHeaders,
      explanation: "Some APIs need selected company information. ApiHeaders reads user-info and Redux multitenant data, then returns headers like X-CURRENT-COMPANY and X-SELECTED-COMPANY.",
      explanationTe: "కొన్ని APIs కి selected company information అవసరం. ApiHeaders user-info మరియు Redux multitenant data చదివి X-CURRENT-COMPANY, X-SELECTED-COMPANY లాంటి headers return చేస్తుంది.",
      flow: "Redux selected company + session user-info -> ApiHeaders(multitenant) -> headers object -> axios request.",
      flowTe: "Redux selected company + session user-info -> ApiHeaders(multitenant) -> headers object -> axios request.",
    },
    {
      title: "4. Page builds request and reads response",
      file: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
      code: snippets.managerHierarchy,
      explanation: "This page builds an API URL using manager_id, passes headers, checks response.data.statusCode, reads response.data.result, and stores it in state with setHierarchy.",
      explanationTe: "ఈ page manager_id తో API URL build చేస్తుంది, headers pass చేస్తుంది, response.data.statusCode check చేస్తుంది, response.data.result చదివి setHierarchy తో state లో store చేస్తుంది.",
      flow: "URL manager_id -> axios.get -> response.data.result -> setHierarchy -> JSX renders hierarchy.",
      flowTe: "URL manager_id -> axios.get -> response.data.result -> setHierarchy -> JSX hierarchy render చేస్తుంది.",
    },
    {
      title: "5. API error handling",
      file: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
      code: lines([
        "try {",
        "    var response = await axios.get(`/api/directory/manager/hierarchy/?manager_id=${Manger_Id}`, { headers: headers });",
        "    if (response.data.statusCode == 200) {",
        "        setHierarchy(response.data.result);",
        "    } else {",
        "        setHierarchy([]);",
        "    }",
        "} catch (error) {",
        "    console.log(\"not found\");",
        "    if (error.response.status === 403) { alert(error.response.data.detail) }",
        "}",
      ]),
      explanation: "The page handles both API success-false and request failure. If statusCode is not 200, it clears data. If request fails, catch runs and 403 shows backend detail.",
      explanationTe: "ఈ page API success-false మరియు request failure రెండింటిని handle చేస్తుంది. statusCode 200 కాకపోతే data clear చేస్తుంది. Request fail అయితే catch run అవుతుంది మరియు 403 అయితే backend detail చూపిస్తుంది.",
      flow: "API success -> set data. API non-200 -> empty state. API error -> catch -> show/handle error.",
      flowTe: "API success -> data set. API non-200 -> empty state. API error -> catch -> error handle.",
    },
  ],
  auth: [
    {
      title: "1. Login form builds payload",
      file: "src/PayrollComponents/SignUp/LoginForm.js",
      code: lines([
        "const email = data.email.trim();",
        "const password = data.password.trim();",
        "",
        "var req = {};",
        "if (email.match(mailRegexx)) {",
        "  req = { email: email, password: password };",
        "} else if (email.match(phoneRegexx)) {",
        "  req = { phone: email, password: password };",
        "}",
      ]),
      explanation: "Login supports email or phone. The form first trims values, then creates the API payload as either { email, password } or { phone, password }.",
      explanationTe: "Login email లేదా phone support చేస్తుంది. Form ముందుగా values trim చేసి, API payload ని { email, password } లేదా { phone, password } గా create చేస్తుంది.",
      flow: "Form data -> validation/trim -> req payload -> login API.",
      flowTe: "Form data -> validation/trim -> req payload -> login API.",
    },
    {
      title: "2. Login API stores session data",
      file: "src/PayrollComponents/SignUp/LoginForm.js",
      code: snippets.loginFlow,
      explanation: "After /api/user/login/ succeeds, the code creates UserInfoToSesson, stores user-info, stores RolesFromDb, writes cookies, and navigates to /payroll-dashboard.",
      explanationTe: "/api/user/login/ success అయిన తర్వాత code UserInfoToSesson create చేస్తుంది, user-info store చేస్తుంది, RolesFromDb store చేస్తుంది, cookies write చేస్తుంది, /payroll-dashboard కి navigate చేస్తుంది.",
      flow: "Login API response -> sessionStorage/cookies -> navigate dashboard -> PrivateRoute can restore auth.",
      flowTe: "Login API response -> sessionStorage/cookies -> dashboard navigate -> PrivateRoute auth restore చేయగలదు.",
    },
    {
      title: "3. PrivateRoute verifies login",
      file: "src/Privaterote.js",
      code: snippets.privateRouteAuth,
      explanation: "PrivateRoute is the gate for HRMS pages. If userinfoCookie is missing, it redirects to login. If present, it sets axios token and renders TopHeader plus the page children.",
      explanationTe: "PrivateRoute HRMS pages కి gate. userinfoCookie లేకపోతే login కి redirect చేస్తుంది. ఉంటే axios token set చేసి TopHeader మరియు page children render చేస్తుంది.",
      flow: "Open protected URL -> PrivateRoute checks cookie -> redirect or render page.",
      flowTe: "Protected URL open -> PrivateRoute cookie check -> redirect లేదా page render.",
    },
    {
      title: "4. Logout clears all auth storage",
      file: "src/sessionLogout.js",
      code: snippets.logoutFlow,
      explanation: "SessionLogIn removes user-info, RolesFromDb, profile data, cookies, and axios Authorization. Then it navigates to login.",
      explanationTe: "SessionLogIn user-info, RolesFromDb, profile data, cookies, axios Authorization remove చేస్తుంది. తర్వాత login కి navigate చేస్తుంది.",
      flow: "Logout/401 -> clear storage/cookies/header -> navigate('/').",
      flowTe: "Logout/401 -> storage/cookies/header clear -> navigate('/').",
    },
    {
      title: "5. Roles connect auth to UI permissions",
      file: "src/Components/Dashboard/MoreSection.js",
      code: snippets.roleMenuFullFilter,
      explanation: "Auth does not stop at login. RolesFromDb is used later to show or hide menu cards. This connects backend permissions to frontend UI.",
      explanationTe: "Auth login దగ్గరే ఆగదు. RolesFromDb తర్వాత menu cards show/hide చేయడానికి వాడుతుంది. ఇది backend permissions ని frontend UI తో connect చేస్తుంది.",
      flow: "Login response RolesFromDb -> storage -> MoreSection filter -> allowed UI.",
      flowTe: "Login response RolesFromDb -> storage -> MoreSection filter -> allowed UI.",
    },
  ],
  pages: [
    {
      title: "1. Page imports show page responsibilities",
      file: "src/Components/WorkFromHome/WFHApprovals.js",
      code: snippets.wfhImports,
      explanation: "A page's imports reveal its work. This page has API calls, date formatting, forms, Redux selected company, routing, table UI, modals, error popup, and child components.",
      explanationTe: "Page imports ఆ page పని ఏమిటో చూపిస్తాయి. ఈ page లో API calls, date formatting, forms, Redux selected company, routing, table UI, modals, error popup, child components ఉన్నాయి.",
      flow: "Read imports first -> identify concepts -> then read state/effects/functions/JSX.",
      flowTe: "ముందుగా imports చదవండి -> concepts identify చేయండి -> తర్వాత state/effects/functions/JSX చదవండి.",
    },
    {
      title: "2. Page state stores screen data",
      file: "src/Components/WorkFromHome/WFHApprovals.js",
      code: snippets.wfhStateAndForms,
      explanation: "The page keeps filters, form controls, selected rows, modal state, loading state, and API data in hooks. Each state variable controls some part of the screen.",
      explanationTe: "Page filters, form controls, selected rows, modal state, loading state, API data ని hooks లో ఉంచుతుంది. ప్రతి state variable screen లోని ఒక part ని control చేస్తుంది.",
      flow: "Initial state -> user/API changes state -> React re-renders related UI.",
      flowTe: "Initial state -> user/API state change చేస్తుంది -> React related UI re-render చేస్తుంది.",
    },
    {
      title: "3. Effects load or refetch data",
      file: "src/Components/WorkFromHome/WFHApprovals.js",
      code: snippets.wfhEffects,
      explanation: "useEffect blocks run API loading at the right time: initial load, filter changes, and dependent dropdown changes. Dependencies decide when each effect runs.",
      explanationTe: "useEffect blocks correct time లో API loading run చేస్తాయి: initial load, filter changes, dependent dropdown changes. Dependencies effect ఎప్పుడు run అవ్వాలో decide చేస్తాయి.",
      flow: "Component renders -> effect runs -> API updates state -> component renders again.",
      flowTe: "Component render -> effect run -> API state update -> component మళ్లీ render.",
    },
    {
      title: "4. API function prepares params and updates rows",
      file: "src/Components/WorkFromHome/WFHApprovals.js",
      code: snippets.wfhFetchList,
      explanation: "The fetch function builds query params from filters, sends them to API, then stores returned rows/total count. This is the main data loading flow for table pages.",
      explanationTe: "Fetch function filters నుంచి query params build చేసి API కి పంపుతుంది, తర్వాత returned rows/total count store చేస్తుంది. Table pages కి ఇది main data loading flow.",
      flow: "Filters/page number -> params -> axios.get -> response rows/count -> table state.",
      flowTe: "Filters/page number -> params -> axios.get -> response rows/count -> table state.",
    },
    {
      title: "5. JSX renders table and modals from state",
      file: "src/Components/WorkFromHome/WFHApprovals.js",
      code: snippets.wfhDataTable,
      explanation: "JSX uses current state to render DataTable. paginationServer means the backend controls which rows are shown. User page changes update state and trigger reload.",
      explanationTe: "JSX current state తో DataTable render చేస్తుంది. paginationServer అంటే backend ఏ rows show అవ్వాలో control చేస్తుంది. User page change చేస్తే state update అయి reload trigger అవుతుంది.",
      flow: "State rows -> DataTable render -> user changes page -> state changes -> API fetches next rows.",
      flowTe: "State rows -> DataTable render -> user page change -> state change -> API next rows fetch.",
    },
  ],
  components: [
    {
      title: "1. Props pass data into a component",
      file: "src/Components/Organization/OrganizationHierarchy.js",
      code: snippets.orgHierarchyFetch,
      explanation: "OrganizationHierarchy accepts companyId. If companyId is provided, it uses that. If not, it reads company data from sessionStorage. This is a prop fallback pattern.",
      explanationTe: "OrganizationHierarchy companyId accept చేస్తుంది. companyId ఉంటే దానిని వాడుతుంది. లేకపోతే sessionStorage నుంచి company data చదువుతుంది. ఇది prop fallback pattern.",
      flow: "Parent passes companyId -> component uses prop. No prop -> component uses stored user company.",
      flowTe: "Parent companyId pass చేస్తుంది -> component prop వాడుతుంది. Prop లేకపోతే stored user company వాడుతుంది.",
    },
    {
      title: "2. URL query params pass data between pages",
      file: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
      code: snippets.managerHierarchy,
      explanation: "This component reads manager_id from the current URL. That lets MoreSection navigate to the hierarchy page and pass manager_id without props.",
      explanationTe: "ఈ component current URL నుంచి manager_id చదువుతుంది. దాంతో MoreSection props లేకుండా hierarchy page కి manager_id pass చేయగలదు.",
      flow: "navigate('/showmanagerallhierarchy?manager_id=...') -> page reads URLSearchParams -> API uses manager_id.",
      flowTe: "navigate('/showmanagerallhierarchy?manager_id=...') -> page URLSearchParams చదువుతుంది -> API manager_id వాడుతుంది.",
    },
    {
      title: "3. Context shares data without props",
      file: "src/Components/Common/QuickAccessContext.js",
      code: snippets.quickAccess,
      explanation: "QuickAccessProvider gives quickAccess and setQuickAccess to child components. MoreSection can save the clicked card in context and localStorage.",
      explanationTe: "QuickAccessProvider child components కి quickAccess మరియు setQuickAccess ఇస్తుంది. MoreSection clicked card ని context మరియు localStorage లో save చేయగలదు.",
      flow: "Provider wraps app -> child uses context setter -> shared context value updates.",
      flowTe: "Provider app wrap చేస్తుంది -> child context setter వాడుతుంది -> shared context value update అవుతుంది.",
    },
    {
      title: "4. Child UI is rendered from arrays",
      file: "src/Components/Dashboard/MoreSection.js",
      code: snippets.roleMenuUiRender,
      explanation: "MoreSection renders many Card components by mapping allowedServices. This is component composition: one repeated UI pattern fed by data.",
      explanationTe: "MoreSection allowedServices map చేసి చాలా Card components render చేస్తుంది. ఇది component composition: data ఆధారంగా repeated UI pattern.",
      flow: "allowedServices array -> map -> many Card components -> click handler per card.",
      flowTe: "allowedServices array -> map -> many Card components -> ప్రతి card కి click handler.",
    },
  ],
  flow: [
    {
      title: "1. Application starts in index.js",
      file: "src/index.js",
      code: snippets.indexAxios,
      explanation: "index.js is the entry point. It loads storageUtils, configures axios, creates the React root, wraps App with Redux Provider, and renders the app.",
      explanationTe: "index.js entry point. ఇది storageUtils load చేస్తుంది, axios configure చేస్తుంది, React root create చేస్తుంది, App ని Redux Provider తో wrap చేసి render చేస్తుంది.",
      flow: "index.js -> axios setup -> Redux Provider -> App.",
      flowTe: "index.js -> axios setup -> Redux Provider -> App.",
    },
    {
      title: "2. App creates providers and routes",
      file: "src/App.js",
      code: snippets.appProviders,
      explanation: "App.js composes global providers and route groups. This gives every page access to shared app context and route matching.",
      explanationTe: "App.js global providers మరియు route groups compose చేస్తుంది. దాంతో ప్రతి page shared app context మరియు route matching access పొందుతుంది.",
      flow: "App providers -> BrowserRouter -> Routes -> route group functions.",
      flowTe: "App providers -> BrowserRouter -> Routes -> route group functions.",
    },
    {
      title: "3. Protected route prepares auth and layout",
      file: "src/Privaterote.js",
      code: snippets.privateRouteAuth,
      explanation: "Before a protected page renders, PrivateRoute checks login, sets token header, and renders TopHeader around the page.",
      explanationTe: "Protected page render అవ్వకముందు PrivateRoute login check చేస్తుంది, token header set చేస్తుంది, page చుట్టూ TopHeader render చేస్తుంది.",
      flow: "Route matched -> PrivateRoute -> auth/header -> page children.",
      flowTe: "Route matched -> PrivateRoute -> auth/header -> page children.",
    },
    {
      title: "4. Page makes API call and renders UI",
      file: "src/Components/Dashboard/ShowManagersAllHierarchyView.js",
      code: snippets.managerHierarchy,
      explanation: "The page reads needed inputs, creates headers, calls API, stores response in state, and renders UI based on that state.",
      explanationTe: "Page అవసరమైన inputs చదివి headers create చేస్తుంది, API call చేస్తుంది, response state లో store చేసి ఆ state ఆధారంగా UI render చేస్తుంది.",
      flow: "Input -> headers -> axios -> response -> setState -> JSX.",
      flowTe: "Input -> headers -> axios -> response -> setState -> JSX.",
    },
    {
      title: "5. User action continues the flow",
      file: "src/Components/Dashboard/MoreSection.js",
      code: snippets.roleMenuUiRender,
      explanation: "When the user clicks a menu card, the app navigates to another route and stores quick access. That starts the same route/page/API/render cycle again.",
      explanationTe: "User menu card click చేస్తే app another route కి navigate చేసి quick access store చేస్తుంది. దాంతో route/page/API/render cycle మళ్లీ start అవుతుంది.",
      flow: "Click -> navigate -> new route -> protected wrapper -> new page -> API/UI.",
      flowTe: "Click -> navigate -> new route -> protected wrapper -> new page -> API/UI.",
    },
  ],
  state: [
    {
      title: "1. Redux store setup",
      file: "src/Redux/store.js",
      code: snippets.reduxStore,
      explanation: "This file creates the global Redux store. loadState reads old Redux data from localStorage. createStore(rootReducer, persistedState) creates the store with saved data. store.subscribe runs after every Redux update and saves the latest state back to localStorage.",
      explanationTe: "ఈ file global Redux store create చేస్తుంది. loadState localStorage నుంచి old Redux data చదువుతుంది. createStore(rootReducer, persistedState) saved data తో store create చేస్తుంది. store.subscribe ప్రతి Redux update తర్వాత latest state ని localStorage లో save చేస్తుంది.",
      flow: "Browser opens app -> store.js loads persisted reduxState -> Provider gives store to App -> any component can read Redux with useSelector.",
      flowTe: "Browser app open చేస్తుంది -> store.js persisted reduxState load చేస్తుంది -> Provider store ని App కి ఇస్తుంది -> ఏ component అయినా useSelector తో Redux చదవగలదు.",
    },
    {
      title: "2. Reducer decides how state changes",
      file: "src/Redux/reducers.js",
      code: snippets.reduxReducer,
      explanation: "The reducer is the update rule book. initialState defines the default shape. When an action comes in, switch(action.type) decides which part of state should change. It returns a new state object instead of directly changing old state.",
      explanationTe: "Reducer state ఎలా change అవ్వాలో చెప్పే rule book. initialState default shape define చేస్తుంది. Action వచ్చినప్పుడు switch(action.type) state లో ఏ part change అవ్వాలో decide చేస్తుంది. Old state ని direct change చేయకుండా new state object return చేస్తుంది.",
      flow: "dispatch(action) -> reducer receives action -> matching case returns new state -> UI using that state re-renders.",
      flowTe: "dispatch(action) -> reducer action receive చేస్తుంది -> matching case new state return చేస్తుంది -> ఆ state వాడుతున్న UI re-render అవుతుంది.",
    },
    {
      title: "3. Component reads Redux with useSelector",
      file: "src/Components/TaskManagment/TaskManagementDashboardView.js",
      code: lines([
        "import { useSelector } from 'react-redux';",
        "",
        "const TaskManagementDashboardView = () => {",
        "    const multitenant = useSelector((state) => state.data);",
        "",
        "    const getAlprojects = async () => {",
        "        const headers = ApiHeaders(multitenant)",
        "        const response = await axios.get(`/api/project/manage`, { headers: headers });",
        "        setTotalProjectList(response.data);",
        "    };",
        "}",
      ]),
      explanation: "This page reads state.data from Redux and stores it in multitenant. Then it passes multitenant to ApiHeaders. That means Redux selected company data becomes API request headers.",
      explanationTe: "ఈ page Redux లోని state.data ని చదివి multitenant లో store చేస్తుంది. తర్వాత multitenant ని ApiHeaders కి pass చేస్తుంది. అంటే Redux selected company data API request headers గా మారుతుంది.",
      flow: "Redux selected company -> useSelector -> multitenant variable -> ApiHeaders(multitenant) -> axios request headers.",
      flowTe: "Redux selected company -> useSelector -> multitenant variable -> ApiHeaders(multitenant) -> axios request headers.",
    },
    {
      title: "4. Local useState handles page-only data",
      file: "src/Components/TaskManagment/TaskManagementDashboardView.js",
      code: lines([
        "const [TotalProjectList, setTotalProjectList] = useState([]);",
        "const [employee, setemployee] = useState([]);",
        "const [CountOfTotalTasks, setCountOfTotalTasks] = useState(0);",
        "const [selectedProject, setSelectedProject] = useState('');",
        "",
        "setTotalProjectList(response.data);",
        "setSelectedProject(results[0]?.id);",
      ]),
      explanation: "These values belong only to this page, so they stay in local useState instead of Redux. API response updates TotalProjectList. User/project selection updates selectedProject. Count values update the dashboard cards.",
      explanationTe: "ఈ values ఈ page కి మాత్రమే సంబంధించినవి కాబట్టి Redux లో కాకుండా local useState లో ఉన్నాయి. API response TotalProjectList update చేస్తుంది. User/project selection selectedProject update చేస్తుంది. Count values dashboard cards update చేస్తాయి.",
      flow: "API response or user action -> setState function -> component re-renders -> screen shows updated data.",
      flowTe: "API response లేదా user action -> setState function -> component re-render -> screen updated data చూపిస్తుంది.",
    },
    {
      title: "5. Context stores small app-wide UI state",
      file: "src/Components/Common/QuickAccessContext.js",
      code: snippets.quickAccess,
      explanation: "QuickAccessContext is not Redux. It is a smaller shared state container. MoreSection can call setQuickAccess(service), and another component can read quickAccess without passing props through every parent.",
      explanationTe: "QuickAccessContext Redux కాదు. ఇది చిన్న shared state container. MoreSection setQuickAccess(service) call చేయగలదు, మరో component props pass చేయకుండా quickAccess read చేయగలదు.",
      flow: "QuickAccessProvider wraps app -> child calls setQuickAccess -> context value changes -> localStorage stores quick access -> other components can read it.",
      flowTe: "QuickAccessProvider app ని wrap చేస్తుంది -> child setQuickAccess call చేస్తుంది -> context value change అవుతుంది -> localStorage quick access store చేస్తుంది -> other components read చేయగలవు.",
    },
    {
      title: "6. Which state should go where?",
      file: "Project state decision rule",
      code: lines([
        "Use local useState when:",
        "- value is needed only inside one page",
        "- modal open/close",
        "- table loading",
        "- selected row",
        "",
        "Use Context when:",
        "- small UI data is needed by many nearby screens",
        "- quick access",
        "- theme",
        "",
        "Use Redux when:",
        "- business data is needed by many unrelated pages",
        "- selected company",
        "- employee details",
        "- setup progress",
      ]),
      explanation: "This project uses three state levels. Local state is for page UI. Context is for small shared UI needs. Redux is for cross-page business data. This is the important architecture concept behind Step 5.",
      explanationTe: "ఈ project మూడు state levels వాడుతుంది. Local state page UI కోసం. Context small shared UI needs కోసం. Redux cross-page business data కోసం. Step 5 వెనుక ఉన్న important architecture concept ఇదే.",
      flow: "Small page value -> useState. Shared UI value -> Context. Shared business value -> Redux.",
      flowTe: "Small page value -> useState. Shared UI value -> Context. Shared business value -> Redux.",
    },
  ],
};

const coreProjectConcepts = [
  {
    title: "1. Axios integration for a whole project",
    projectUse: "This project sets axios.defaults.baseURL in src/index.js, sets JSON headers there, and later sets Authorization in PrivateRoute/PrivateRoutepayroll. Individual pages, such as WFHApprovals.js, call axios.get/post directly.",
    projectUseTe: "ఈ project లో axios.defaults.baseURL src/index.js లో set అవుతుంది. JSON headers కూడా అక్కడే set అవుతున్నాయి. Authorization PrivateRoute/PrivateRoutepayroll లో set అవుతుంది. WFHApprovals.js లాంటి pages direct గా axios.get/post call చేస్తున్నాయి.",
    whyImportant: "A large app has hundreds of API calls. If base URL, token, tenant headers, and errors are not centralized, every page repeats logic and bugs become harder to fix.",
    whyImportantTe: "Large app లో API calls చాలా ఉంటాయి. Base URL, token, tenant headers, errors centralize చేయకపోతే ప్రతి page లో repeat అవుతుంది, bugs fix చేయడం కష్టం అవుతుంది.",
    howToUse: "For new projects, create src/api/apiClient.js with axios.create, request interceptor for token, response interceptor for 401, and separate service files like projectService.js or attendanceService.js.",
    howToUseTe: "కొత్త projects లో src/api/apiClient.js create చేసి axios.create, token request interceptor, 401 response interceptor పెట్టాలి. projectService.js, attendanceService.js లాంటి service files create చేయాలి.",
    code: snippets.bestAxiosSetup,
    files: ["src/index.js", "src/Privaterote.js", "src/Components/Common/ApiHeaders.js", "src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "2. API headers and multi-tenant context",
    projectUse: "This project uses ApiHeaders(multitenant) to send X-CURRENT-COMPANY, X-SELECTED-COMPANY, and x-system-ip-address headers.",
    projectUseTe: "ఈ project ApiHeaders(multitenant) ద్వారా X-CURRENT-COMPANY, X-SELECTED-COMPANY, x-system-ip-address headers పంపుతుంది.",
    whyImportant: "When one app supports multiple companies or tenants, every request must know the active company. Without this, users may see or update the wrong company data.",
    whyImportantTe: "ఒక app multiple companies/tenants support చేస్తే ప్రతి request active company తెలుసుకోవాలి. లేకపోతే user wrong company data చూడవచ్చు లేదా update చేయవచ్చు.",
    howToUse: "Keep tenant header creation in one helper. In future projects, call that helper inside the API client interceptor so page files do not manually pass headers every time.",
    howToUseTe: "Tenant headers creation ఒక helper లో ఉంచాలి. Future projects లో API client interceptor లో ఈ helper call చేస్తే page files ప్రతి సారి headers pass చేయాల్సిన అవసరం ఉండదు.",
    code: snippets.apiHeaders,
    files: ["src/Components/Common/ApiHeaders.js"],
  },
  {
    title: "3. Routing and route grouping",
    projectUse: "This project splits routes into route group files and exports lazy route components from routeComponents.js. App.js combines all route groups inside BrowserRouter.",
    projectUseTe: "ఈ project routes ని route group files గా split చేస్తుంది. routeComponents.js lazy components export చేస్తుంది. App.js BrowserRouter లో route groups combine చేస్తుంది.",
    whyImportant: "Big projects cannot keep all routes in one file. Grouping routes makes navigation easier to search, review, and protect.",
    whyImportantTe: "Big projects లో అన్ని routes ఒక file లో ఉంచడం maintain చేయడం కష్టం. Route grouping వల్ల search/review/protect చేయడం easy అవుతుంది.",
    howToUse: "Use publicRoutes, privateRoutes, payrollRoutes, adminRoutes arrays. Map route config to Route JSX. Keep protected wrapper logic separate.",
    howToUseTe: "publicRoutes, privateRoutes, payrollRoutes, adminRoutes arrays వాడండి. Route config ని map చేసి Route JSX render చేయండి. Protected wrapper logic separate గా ఉంచండి.",
    code: snippets.bestRouteSetup,
    files: ["src/App.js", "src/routes/routeGroups.jsx", "src/routes/routeComponents.js", "src/routes/ReportsRoutes.jsx"],
  },
  {
    title: "4. Protected routes and authentication",
    projectUse: "PrivateRoute reads userinfoCookie, restores sessionStorage, sets axios Authorization, reloads roles, renders TopHeader, and renders the page.",
    projectUseTe: "PrivateRoute userinfoCookie చదివి sessionStorage restore చేస్తుంది, axios Authorization set చేస్తుంది, roles reload చేస్తుంది, TopHeader + page render చేస్తుంది.",
    whyImportant: "Protected routes prevent unauthenticated users from opening business pages and keep token setup consistent.",
    whyImportantTe: "Protected routes unauthenticated users business pages open చేయకుండా protect చేస్తాయి మరియు token setup consistent గా ఉంచుతాయి.",
    howToUse: "Create one AuthGuard/PrivateRoute. It should check token, redirect unauthenticated users, load profile/roles, and render shared layout.",
    howToUseTe: "ఒక AuthGuard/PrivateRoute create చేయాలి. అది token check చేసి unauthenticated users redirect చేయాలి, profile/roles load చేసి shared layout render చేయాలి.",
    code: snippets.privateRouteAuth,
    files: ["src/Privaterote.js", "src/PrivateRoutepayroll.js"],
  },
  {
    title: "5. Role and permission handling",
    projectUse: "MoreSection reads RolesFromDb and user roles to decide which cards should appear. PrivateRoute also checks RolesFromDb for protected paths.",
    projectUseTe: "MoreSection RolesFromDb మరియు user roles ఆధారంగా cards show/hide చేస్తుంది. PrivateRoute కూడా protected paths కోసం RolesFromDb check చేస్తుంది.",
    whyImportant: "Large products usually have ADMIN, HR, MANAGER, EMPLOYEE, and module-level permissions. UI and routes must both respect permissions.",
    whyImportantTe: "Large products లో ADMIN, HR, MANAGER, EMPLOYEE, module-level permissions ఉంటాయి. UI మరియు routes రెండూ permissions respect చేయాలి.",
    howToUse: "Create hasPermission(module, submodule, action). Use it in menus, buttons, and route guards. Avoid scattering raw RolesFromDb checks everywhere.",
    howToUseTe: "hasPermission(module, submodule, action) helper create చేయండి. Menus, buttons, route guards లో వాడండి. Raw RolesFromDb checks అన్ని files లో scatter చేయవద్దు.",
    code: snippets.moreServices,
    files: ["src/Components/Dashboard/MoreSection.js", "src/Privaterote.js", "src/sessionLogout.js"],
  },
  {
    title: "6. Forms with react-hook-form",
    projectUse: "WFHApprovals.js uses useForm for filters, approve modal, and reject modal. It registers fields, watches dates, validates required reason fields, and handles submit callbacks.",
    projectUseTe: "WFHApprovals.js filters, approve modal, reject modal కోసం useForm వాడుతుంది. Fields register చేస్తుంది, dates watch చేస్తుంది, required reason validation చేస్తుంది, submit callbacks handle చేస్తుంది.",
    whyImportant: "Forms become complex quickly. A form library reduces manual state, validation code, and error display bugs.",
    whyImportantTe: "Forms త్వరగా complex అవుతాయి. Form library manual state, validation code, error display bugs తగ్గిస్తుంది.",
    howToUse: "Use one useForm per independent form. Use register for normal fields, Controller for controlled components, watch for reactive values, and reset when closing modals.",
    howToUseTe: "Independent form కి ఒక useForm వాడండి. Normal fields కి register, controlled components కి Controller, reactive values కి watch, modal close అయ్యేటప్పుడు reset వాడండి.",
    code: snippets.wfhStateAndForms,
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "7. React DataTable and server pagination",
    projectUse: "WFHApprovals.js uses react-data-table-component with columns, data, paginationServer, paginationTotalRows, onChangeRowsPerPage, and onChangePage.",
    projectUseTe: "WFHApprovals.js DataTable లో columns, data, paginationServer, paginationTotalRows, onChangeRowsPerPage, onChangePage వాడుతుంది.",
    whyImportant: "Tables in business apps often have thousands of rows. Server pagination keeps the UI fast and reduces browser memory usage.",
    whyImportantTe: "Business apps లో tables కి వేల rows ఉండొచ్చు. Server pagination UI fast గా ఉంచుతుంది మరియు browser memory usage తగ్గిస్తుంది.",
    howToUse: "Keep currentPage, perPage, totalRows, loading, and rows in state. Send page/page_size to API. Update rows and total count from the API response.",
    howToUseTe: "currentPage, perPage, totalRows, loading, rows state లో ఉంచండి. API కి page/page_size పంపండి. API response నుంచి rows మరియు total count update చేయండి.",
    code: snippets.wfhDataTable,
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "8. useEffect, useCallback, and data flow",
    projectUse: "WFHApprovals.js loads initial data in one useEffect, refetches when filters change in another, and reloads employees when department changes. fetchApproverList is wrapped in useCallback.",
    projectUseTe: "WFHApprovals.js ఒక useEffect లో initial data load చేస్తుంది, ఇంకొక effect filters change అయితే refetch చేస్తుంది, department change అయితే employees reload చేస్తుంది. fetchApproverList useCallback తో wrap అయింది.",
    whyImportant: "Effects are where most React bugs happen: stale data, infinite loops, duplicate API calls, and memory issues.",
    whyImportantTe: "React bugs ఎక్కువగా effects లోనే వస్తాయి: stale data, infinite loops, duplicate API calls, memory issues.",
    howToUse: "Use one effect per job. Keep dependency arrays correct. Use useCallback when a function is used by effects or child components and depends on state.",
    howToUseTe: "ఒక్కో పని కోసం ఒక effect వాడండి. Dependency arrays correct గా పెట్టండి. Function effects/child components లో use అయితే మరియు state మీద depend అయితే useCallback వాడండి.",
    code: snippets.wfhEffects,
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "9. Validation before API calls",
    projectUse: "WFHApprovals.js validates date range before fetching or exporting data. If To Date is before From Date, it sets an error and stops.",
    projectUseTe: "WFHApprovals.js fetch/export ముందు date range validate చేస్తుంది. To Date, From Date కంటే ముందు ఉంటే error set చేసి stop చేస్తుంది.",
    whyImportant: "Validation protects the backend, prevents useless API calls, and gives the user a clear message.",
    whyImportantTe: "Validation backend ని protect చేస్తుంది, useless API calls తగ్గిస్తుంది, user కి clear message ఇస్తుంది.",
    howToUse: "Create small validation helpers. Call them before submit or fetch. Store validation messages in state or form errors.",
    howToUseTe: "చిన్న validation helpers create చేయండి. Submit/fetch ముందు call చేయండి. Validation messages state లేదా form errors లో store చేయండి.",
    code: snippets.wfhDateValidation,
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "10. Modal action workflows",
    projectUse: "WFHApprovals.js opens approve/reject modals, validates reason fields, posts approve/reject payload, closes modal, shows feedback, and refreshes the list.",
    projectUseTe: "WFHApprovals.js approve/reject modals open చేస్తుంది, reason fields validate చేస్తుంది, payload post చేస్తుంది, modal close చేస్తుంది, feedback show చేసి list refresh చేస్తుంది.",
    whyImportant: "Approval workflows are common in HR/payroll apps. They must be predictable and safe because they change business status.",
    whyImportantTe: "Approval workflows HR/payroll apps లో common. ఇవి business status change చేస్తాయి కాబట్టి predictable మరియు safe గా ఉండాలి.",
    howToUse: "Keep selectedRow, modalOpen, submitting, formErrors, submitHandler, and refreshList clearly separated.",
    howToUseTe: "selectedRow, modalOpen, submitting, formErrors, submitHandler, refreshList ని clearly separate గా maintain చేయండి.",
    code: snippets.wfhApproveReject,
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "11. Images and assets",
    projectUse: "This project imports images from src/images, such as MoreSection icons, dashboard icons, profile fallbacks, and login backgrounds.",
    projectUseTe: "ఈ project src/images నుంచి MoreSection icons, dashboard icons, profile fallback images, login backgrounds import చేస్తుంది.",
    whyImportant: "Images are part of UI architecture. Incorrect asset organization causes broken paths, heavy bundles, and inconsistent UI.",
    whyImportantTe: "Images UI architecture లో భాగం. Assets organization తప్పైతే broken paths, heavy bundles, inconsistent UI వస్తాయి.",
    howToUse: "Keep common assets in src/assets or src/images. Use imports for bundled assets. Use public folder only for truly static public files. Optimize large images.",
    howToUseTe: "Common assets ని src/assets లేదా src/images లో పెట్టండి. Bundled assets కోసం imports వాడండి. Public folder నిజంగా static public files కోసం మాత్రమే వాడండి. Large images optimize చేయండి.",
    code: lines([
      "import AdminOrganizationHierarchy from './../../images/m_AdminOrganizationHierarchy.png'",
      "import LearningHubIcon from './../../images/Instructions_Icon.png'",
      "",
      "{ name: \"Admin Organization Hierarchy\", icon: `${AdminOrganizationHierarchy}`, path: \"/showmanagerallhierarchy\", moduleKey: \"Dashboard\" },",
      "{ name: \"Learning Hub\", icon: `${LearningHubIcon}`, path: \"/learning-hub\", moduleKey: \"LearningHub\" },",
    ]),
    files: ["src/Components/Dashboard/MoreSection.js", "src/images/*"],
  },
  {
    title: "12. State management for big projects",
    projectUse: "This project uses Redux for selected company and shared data, Context for quick access/auth/video/global UI state, and local useState for page-level data.",
    projectUseTe: "ఈ project selected company/shared data కోసం Redux, quick access/auth/video/global UI state కోసం Context, page-level data కోసం local useState వాడుతుంది.",
    whyImportant: "Putting everything in Redux makes code heavy. Putting everything in local state makes sharing hard. Big projects need the right state in the right place.",
    whyImportantTe: "అన్నీ Redux లో పెడితే code heavy అవుతుంది. అన్నీ local state లో పెడితే sharing కష్టం. Big projects లో correct state correct place లో ఉండాలి.",
    howToUse: "Use local state for page UI, Context for small app-wide UI needs, Redux/Zustand/RTK for cross-page business data, and server cache libraries for repeated API data when needed.",
    howToUseTe: "Page UI కోసం local state, small app-wide UI కోసం Context, cross-page business data కోసం Redux/Zustand/RTK, repeated API data కోసం server cache libraries వాడండి.",
    code: snippets.reduxStore,
    files: ["src/Redux/store.js", "src/Redux/reducers.js", "src/Components/Common/QuickAccessContext.js"],
  },
  {
    title: "13. Error, loading, empty, and success states",
    projectUse: "WFHApprovals.js uses loader, dataloading, errorAlert, errorMessage, isSuccess, ShimmerTable, NoDataMessage, and modal feedback.",
    projectUseTe: "WFHApprovals.js loader, dataloading, errorAlert, errorMessage, isSuccess, ShimmerTable, NoDataMessage, modal feedback వాడుతుంది.",
    whyImportant: "Professional apps do not just show data. They must clearly show loading, no data, success, validation errors, and API errors.",
    whyImportantTe: "Professional apps data మాత్రమే చూపవు. Loading, no data, success, validation errors, API errors clear గా చూపాలి.",
    howToUse: "Every API screen should plan these states: initial loading, refetch loading, empty data, success message, validation error, API error, unauthorized redirect.",
    howToUseTe: "ప్రతి API screen లో initial loading, refetch loading, empty data, success message, validation error, API error, unauthorized redirect states plan చేయాలి.",
    code: lines([
      "const [loader, setLoader] = useState(false);",
      "const [dataloading, setDataLoading] = useState(false);",
      "const [errorAlert, setErrorAlert] = useState(false);",
      "const [errorMessage, setErrorMessage] = useState(\"\");",
      "const [isSuccess, setIsSuccess] = useState(false);",
      "",
      "{loader ? <DataTable ... noDataComponent={<NoDataMessage />} /> : <ShimmerTable/>}",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "14. Export and file download handling",
    projectUse: "WFHApprovals.js exports data by calling the same WFH endpoint with is_export=true and responseType blob, then creates a temporary download link.",
    projectUseTe: "WFHApprovals.js is_export=true మరియు responseType blob తో WFH endpoint call చేసి temporary download link create చేస్తుంది.",
    whyImportant: "Reports, payroll, attendance, and HR apps often need Excel/PDF downloads. Blob handling must be done carefully.",
    whyImportantTe: "Reports, payroll, attendance, HR apps లో Excel/PDF downloads common. Blob handling జాగ్రత్తగా చేయాలి.",
    howToUse: "Set responseType: 'blob', create Blob, use URL.createObjectURL, create link, click it, remove link, and revoke object URL when possible.",
    howToUseTe: "responseType: 'blob' set చేయండి, Blob create చేయండి, URL.createObjectURL వాడండి, link create/click/remove చేయండి, possible అయితే object URL revoke చేయండి.",
    code: lines([
      "const response = await axios.get(`/api/attendance/wfh/request/approver/`, {",
      "  headers,",
      "  params,",
      "  responseType: \"blob\"",
      "});",
      "",
      "const blob = new Blob([response.data], {",
      "  type: \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\"",
      "});",
      "const url = URL.createObjectURL(blob);",
      "const link = document.createElement(\"a\");",
      "link.href = url;",
      "link.download = `work_from_home_approvalLogs_${date}.xlsx`;",
      "document.body.appendChild(link);",
      "link.click();",
      "link.remove();",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "15. Folder structure for scalable projects",
    projectUse: "This project separates Components, PayrollComponents, routes, Redux, Context, images, and vendor. It works, but many pages still contain UI, API, validation, and table logic in one file.",
    projectUseTe: "ఈ project Components, PayrollComponents, routes, Redux, Context, images, vendor గా split అయింది. ఇది work అవుతుంది, కానీ చాలా pages లో UI, API, validation, table logic ఒకే file లో ఉన్నాయి.",
    whyImportant: "As projects grow, a single huge page file becomes hard to test, debug, and reuse.",
    whyImportantTe: "Project grow అయితే ఒక huge page file test/debug/reuse చేయడం కష్టం అవుతుంది.",
    howToUse: "For new projects, use feature folders with pages, components, hooks, services, utils, and types. Move API calls to services and repeated logic to custom hooks.",
    howToUseTe: "కొత్త projects లో feature folders లో pages, components, hooks, services, utils, types ఉంచండి. API calls services లోకి, repeated logic custom hooks లోకి move చేయండి.",
    code: snippets.bestStructure,
    files: ["src/Components", "src/PayrollComponents", "src/routes", "src/Redux", "src/Context"],
  },
  {
    title: "16. Component decomposition",
    projectUse: "Some pages in this project, such as WFHApprovals.js and several payroll/report pages, keep imports, API calls, filters, tables, modals, and export logic in one large component.",
    projectUseTe: "ఈ project లో WFHApprovals.js మరియు కొన్ని payroll/report pages లో imports, API calls, filters, tables, modals, export logic అన్నీ ఒక పెద్ద component లో ఉన్నాయి.",
    whyImportant: "Large components are hard to read and risky to change. Splitting them makes testing, reuse, and debugging easier.",
    whyImportantTe: "పెద్ద components read చేయడం మరియు change చేయడం risky. Split చేస్తే testing, reuse, debugging easy అవుతుంది.",
    howToUse: "Split a big page into Page, FilterPanel, DataTableSection, ActionModals, DetailDrawer, and hooks such as useWfhApprovals.",
    howToUseTe: "పెద్ద page ని Page, FilterPanel, DataTableSection, ActionModals, DetailDrawer, useWfhApprovals hook లాగా split చేయండి.",
    code: lines([
      "features/wfh-approvals/",
      "  WfhApprovalsPage.jsx",
      "  WfhApprovalsFilterPanel.jsx",
      "  WfhApprovalsTable.jsx",
      "  WfhApprovalModals.jsx",
      "  useWfhApprovals.js",
      "  wfhApprovalsService.js",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "17. Custom hooks for repeated logic",
    projectUse: "The project repeats patterns like loading state, API fetch, pagination, filters, and modal state inside page components.",
    projectUseTe: "ఈ project లో loading state, API fetch, pagination, filters, modal state patterns page components లో repeat అవుతున్నాయి.",
    whyImportant: "When the same behavior appears in many pages, a custom hook removes duplication and keeps pages focused on UI.",
    whyImportantTe: "అదే behavior చాలా pages లో ఉంటే custom hook duplication తగ్గించి pages ని UI పై focus చేయిస్తుంది.",
    howToUse: "Create hooks like usePagination, useModal, useApiRequest, useDebouncedValue, and usePermissions.",
    howToUseTe: "usePagination, useModal, useApiRequest, useDebouncedValue, usePermissions లాంటి hooks create చేయండి.",
    code: lines([
      "const useModal = () => {",
      "  const [isOpen, setIsOpen] = useState(false);",
      "  const open = () => setIsOpen(true);",
      "  const close = () => setIsOpen(false);",
      "  return { isOpen, open, close };",
      "};",
      "",
      "const approveModal = useModal();",
      "const rejectModal = useModal();",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js", "src/PayrollComponents/PayrollReportsNew/useRestrictedReports.js"],
  },
  {
    title: "18. Service layer for APIs",
    projectUse: "Many project pages call axios directly. For example, WFHApprovals.js builds params and calls axios.get/post inside the component.",
    projectUseTe: "ఈ project లో చాలా pages direct గా axios call చేస్తున్నాయి. Example WFHApprovals.js component లోనే params build చేసి axios.get/post call చేస్తుంది.",
    whyImportant: "A service layer separates API contract from UI. If an endpoint changes, you update one service instead of many components.",
    whyImportantTe: "Service layer API contract ని UI నుంచి separate చేస్తుంది. Endpoint change అయితే ఒక service file update చేస్తే సరిపోతుంది.",
    howToUse: "Create service files per feature, such as wfhService.getApprovals(params), wfhService.approve(payload), and wfhService.reject(payload).",
    howToUseTe: "Feature-wise service files create చేయండి: wfhService.getApprovals(params), wfhService.approve(payload), wfhService.reject(payload).",
    code: lines([
      "// features/wfh-approvals/wfhService.js",
      "export const getWfhApprovals = (params) =>",
      "  apiClient.get('/api/attendance/wfh/request/approver/', { params });",
      "",
      "export const approveWfh = (payload) =>",
      "  apiClient.post('/api/attendance/wfh/request/approver/', payload);",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "19. Environment configuration",
    projectUse: "src/index.js has multiple commented base URLs and one active production URL. package.json has start/build scripts.",
    projectUseTe: "src/index.js లో multiple commented base URLs ఉన్నాయి మరియు active production URL ఉంది. package.json లో start/build scripts ఉన్నాయి.",
    whyImportant: "Apps need different URLs for local, QA, staging, and production. Hard-coded URLs create deployment mistakes.",
    whyImportantTe: "Apps కి local, QA, staging, production కోసం different URLs అవసరం. Hard-coded URLs deployment mistakes కి కారణం అవుతాయి.",
    howToUse: "Use .env files and REACT_APP_API_BASE_URL. Keep environment-specific values outside components.",
    howToUseTe: ".env files మరియు REACT_APP_API_BASE_URL వాడండి. Environment-specific values components లో పెట్టకండి.",
    code: lines([
      "// .env.development",
      "REACT_APP_API_BASE_URL=https://qa.example.com/qxbox/",
      "",
      "// apiClient.js",
      "const apiClient = axios.create({",
      "  baseURL: process.env.REACT_APP_API_BASE_URL,",
      "});",
    ]),
    files: ["src/index.js", ".env", "package.json"],
  },
  {
    title: "20. Storage and security",
    projectUse: "The project stores user-info, RolesFromDb, profile image/name, and reduxState in sessionStorage/localStorage. storageUtils overrides storage and encrypts values.",
    projectUseTe: "Project user-info, RolesFromDb, profile image/name, reduxState ని sessionStorage/localStorage లో store చేస్తుంది. storageUtils storage override చేసి values encrypt చేస్తుంది.",
    whyImportant: "Auth and role data are sensitive. Storage decisions affect security, refresh behavior, and logout correctness.",
    whyImportantTe: "Auth మరియు role data sensitive. Storage decisions security, refresh behavior, logout correctness మీద effect చూపుతాయి.",
    howToUse: "Store only what is required. Clear storage on logout. Prefer httpOnly cookies for highly sensitive tokens when backend supports it.",
    howToUseTe: "అవసరమైన data మాత్రమే store చేయండి. Logout లో storage clear చేయండి. Backend support ఉంటే sensitive tokens కోసం httpOnly cookies prefer చేయండి.",
    code: snippets.logoutFlow,
    files: ["src/storageUtils.js", "src/sessionLogout.js", "src/Redux/store.js"],
  },
  {
    title: "21. Performance and rendering",
    projectUse: "The project uses lazy route components and server pagination. Some large pages still do a lot of work in one render path.",
    projectUseTe: "Project lazy route components మరియు server pagination వాడుతుంది. కొన్ని large pages ఇంకా ఒకే render path లో చాలా work చేస్తాయి.",
    whyImportant: "Large React apps can become slow because of big bundles, repeated renders, large tables, and expensive calculations.",
    whyImportantTe: "Big bundles, repeated renders, large tables, expensive calculations వల్ల large React apps slow అవుతాయి.",
    howToUse: "Use lazy loading, server pagination, useMemo for derived data, useCallback for stable handlers, and split heavy components.",
    howToUseTe: "Lazy loading, server pagination, derived data కోసం useMemo, stable handlers కోసం useCallback, heavy components split చేయండి.",
    code: lines([
      "const filteredRows = useMemo(() => {",
      "  return rows.filter((row) => row.status === selectedStatus);",
      "}, [rows, selectedStatus]);",
      "",
      "const handlePageChange = useCallback((page) => {",
      "  setCurrentPage(page);",
      "}, []);",
    ]),
    files: ["src/routes/routeComponents.js", "src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "22. Debouncing search and filters",
    projectUse: "Several pages have search/filter inputs that can trigger API calls. WFHApprovals.js builds search_filter from form values.",
    projectUseTe: "చాలా pages లో search/filter inputs API calls trigger చేయవచ్చు. WFHApprovals.js form values నుంచి search_filter build చేస్తుంది.",
    whyImportant: "Without debounce, every key press can call the backend, causing slow UI and unnecessary server load.",
    whyImportantTe: "Debounce లేకపోతే ప్రతి key press backend call చేస్తుంది, UI slow అవుతుంది మరియు server load పెరుగుతుంది.",
    howToUse: "Use a debounced value or submit button for search-heavy screens. Trigger API only after user pauses typing or clicks Search.",
    howToUseTe: "Search-heavy screens లో debounced value లేదా submit button వాడండి. User typing pause చేసిన తర్వాత లేదా Search click చేసిన తర్వాత API call చేయండి.",
    code: lines([
      "const useDebouncedValue = (value, delay = 400) => {",
      "  const [debounced, setDebounced] = useState(value);",
      "  useEffect(() => {",
      "    const id = setTimeout(() => setDebounced(value), delay);",
      "    return () => clearTimeout(id);",
      "  }, [value, delay]);",
      "  return debounced;",
      "};",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "23. Error boundaries",
    projectUse: "The project handles many API errors locally, but there is no obvious app-level ErrorBoundary around route pages.",
    projectUseTe: "Project లో API errors local గా handle అవుతున్నాయి, కానీ route pages చుట్టూ app-level ErrorBoundary obvious గా కనిపించడం లేదు.",
    whyImportant: "A render error in one component can blank the whole React app. Error boundaries show fallback UI instead.",
    whyImportantTe: "ఒక component render error whole React app blank చేయవచ్చు. ErrorBoundary fallback UI చూపిస్తుంది.",
    howToUse: "Wrap route content or main layout in an ErrorBoundary. Log errors and show a friendly fallback with retry/navigation.",
    howToUseTe: "Route content లేదా main layout ని ErrorBoundary తో wrap చేయండి. Errors log చేసి retry/navigation తో friendly fallback చూపండి.",
    code: lines([
      "class ErrorBoundary extends React.Component {",
      "  state = { hasError: false };",
      "  static getDerivedStateFromError() { return { hasError: true }; }",
      "  componentDidCatch(error, info) { console.error(error, info); }",
      "  render() {",
      "    return this.state.hasError ? <PageError /> : this.props.children;",
      "  }",
      "}",
    ]),
    files: ["src/App.js"],
  },
  {
    title: "24. Accessibility basics",
    projectUse: "The project uses buttons, tables, forms, modals, icons, and images. Some icon-only actions need clear labels/titles.",
    projectUseTe: "Project buttons, tables, forms, modals, icons, images వాడుతుంది. కొన్ని icon-only actions కి clear labels/titles అవసరం.",
    whyImportant: "Accessible UI helps keyboard users, screen readers, and also improves general usability.",
    whyImportantTe: "Accessible UI keyboard users, screen readers కి help చేస్తుంది మరియు general usability కూడా improve అవుతుంది.",
    howToUse: "Use real buttons for actions, labels for inputs, alt text for images, aria-label for icon buttons, and keyboard-friendly modals.",
    howToUseTe: "Actions కోసం real buttons, inputs కి labels, images కి alt text, icon buttons కి aria-label, keyboard-friendly modals వాడండి.",
    code: lines([
      "<button type=\"button\" aria-label=\"View WFH request details\" onClick={() => openViewDetails(row)}>",
      "  <FaEye aria-hidden=\"true\" />",
      "</button>",
      "",
      "<label htmlFor=\"approvalReason\">Approval Reason</label>",
      "<textarea id=\"approvalReason\" {...register('approval_reason')} />",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js"],
  },
  {
    title: "25. Styling and responsive layout",
    projectUse: "The project uses Bootstrap classes, custom CSS files, inline styles, and feature CSS. LearningHub uses scoped CSS classes.",
    projectUseTe: "Project Bootstrap classes, custom CSS files, inline styles, feature CSS వాడుతుంది. LearningHub scoped CSS classes వాడుతుంది.",
    whyImportant: "Big apps become visually inconsistent when styling rules are scattered without naming conventions.",
    whyImportantTe: "Styling rules naming conventions లేకుండా scatter అయితే big apps visually inconsistent అవుతాయి.",
    howToUse: "Use a design system or consistent CSS naming. Keep reusable utility classes separate from feature-specific CSS.",
    howToUseTe: "Design system లేదా consistent CSS naming వాడండి. Reusable utility classes ని feature-specific CSS నుంచి separate ఉంచండి.",
    code: lines([
      ".FeaturePage { padding: 24px; }",
      ".FeaturePageHeader { display: flex; justify-content: space-between; }",
      "@media (max-width: 760px) {",
      "  .FeaturePageHeader { flex-direction: column; }",
      "}",
    ]),
    files: ["src/custom.css", "src/sidebar.css", "src/Components/LearningHub/LearningHub.css"],
  },
  {
    title: "26. Testing strategy",
    projectUse: "The project has setupTests.js from Create React App, but the scanned work focused on implementation files rather than visible test coverage.",
    projectUseTe: "Project లో Create React App setupTests.js ఉంది, కానీ visible test coverage implementation files కంటే తక్కువగా కనిపిస్తుంది.",
    whyImportant: "Large apps need tests for business rules, forms, route guards, API services, and critical workflows.",
    whyImportantTe: "Large apps కి business rules, forms, route guards, API services, critical workflows tests అవసరం.",
    howToUse: "Test helpers and services with unit tests. Test pages with React Testing Library. Mock API responses. Add regression tests for approval/payroll flows.",
    howToUseTe: "Helpers/services కి unit tests, pages కి React Testing Library tests వాడండి. API responses mock చేయండి. Approval/payroll flows కి regression tests add చేయండి.",
    code: lines([
      "test('validates date range before fetch', () => {",
      "  expect(validateDateRange('2026-06-10', '2026-06-01')).toBe(false);",
      "});",
      "",
      "test('shows no data message when rows are empty', () => {",
      "  render(<WfhApprovalsTable rows={[]} />);",
      "  expect(screen.getByText(/no data/i)).toBeInTheDocument();",
      "});",
    ]),
    files: ["src/setupTests.js"],
  },
  {
    title: "27. Constants and magic strings",
    projectUse: "The project has many strings such as role names, action names, route paths, API paths, and status values directly inside components.",
    projectUseTe: "Project లో role names, action names, route paths, API paths, status values చాలా components లో direct strings గా ఉన్నాయి.",
    whyImportant: "Magic strings cause typos and make refactoring hard.",
    whyImportantTe: "Magic strings typos కి కారణం అవుతాయి మరియు refactoring hard అవుతుంది.",
    howToUse: "Move repeated route paths, role names, statuses, API paths, and action names into constants files.",
    howToUseTe: "Repeated route paths, role names, statuses, API paths, action names constants files లో పెట్టండి.",
    code: lines([
      "export const ROLES = { ADMIN: 'ADMIN', HR: 'HR', EMPLOYEE: 'EMPLOYEE' };",
      "export const WFH_ACTIONS = { APPROVE: 'approve', REJECT: 'reject' };",
      "export const ROUTES = { WFH_APPROVALS: '/wfh-approvals' };",
      "export const API = { WFH_APPROVER: '/api/attendance/wfh/request/approver/' };",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js", "src/routes/*.jsx"],
  },
  {
    title: "28. Date and time handling",
    projectUse: "The project uses moment for formatting, pay-cycle calculation, and date validation in WFHApprovals.js and many report pages.",
    projectUseTe: "Project moment ని formatting, pay-cycle calculation, date validation కోసం WFHApprovals.js మరియు report pages లో వాడుతుంది.",
    whyImportant: "Date bugs are common in attendance/payroll apps because pay cycles, time zones, and formats matter.",
    whyImportantTe: "Attendance/payroll apps లో pay cycles, time zones, formats వల్ల date bugs common.",
    howToUse: "Keep date parsing/formatting helpers centralized. Use one internal API format, usually YYYY-MM-DD, and convert only at UI boundaries.",
    howToUseTe: "Date parsing/formatting helpers centralize చేయండి. Internal API format గా YYYY-MM-DD వాడి UI boundaries వద్ద మాత్రమే convert చేయండి.",
    code: lines([
      "const API_DATE_FORMAT = 'YYYY-MM-DD';",
      "const DISPLAY_DATE_FORMAT = 'DD-MM-YYYY';",
      "",
      "export const toApiDate = (date) => moment(date).format(API_DATE_FORMAT);",
      "export const toDisplayDate = (date) => moment(date).format(DISPLAY_DATE_FORMAT);",
    ]),
    files: ["src/Components/WorkFromHome/WFHApprovals.js", "src/Components/formatDate.js"],
  },
  {
    title: "29. Reusable utilities",
    projectUse: "This project has shared helpers like ApiHeaders, formatDate, sessionLogout, storageUtils, and common UI components.",
    projectUseTe: "Project లో ApiHeaders, formatDate, sessionLogout, storageUtils, common UI components లాంటి shared helpers ఉన్నాయి.",
    whyImportant: "Utilities prevent copy-paste logic and make behavior consistent across modules.",
    whyImportantTe: "Utilities copy-paste logic తగ్గించి modules అంతటా behavior consistent గా ఉంచుతాయి.",
    howToUse: "Move generic functions to shared/utils and feature-specific helpers to that feature folder. Do not create one huge utils file.",
    howToUseTe: "Generic functions shared/utils లో, feature-specific helpers feature folder లో పెట్టండి. ఒక పెద్ద utils file create చేయవద్దు.",
    code: lines([
      "shared/utils/date.js",
      "shared/utils/storage.js",
      "shared/utils/permissions.js",
      "features/wfh-approvals/wfhHelpers.js",
    ]),
    files: ["src/Components/Common/ApiHeaders.js", "src/sessionLogout.js", "src/storageUtils.js"],
  },
  {
    title: "30. Documentation inside the app",
    projectUse: "Learning Hub now documents this codebase inside the app with real source snippets and beginner-friendly explanations.",
    projectUseTe: "Learning Hub ఇప్పుడు actual source snippets మరియు beginner-friendly explanations తో codebase ని app లోనే document చేస్తుంది.",
    whyImportant: "Large teams need onboarding documentation. When docs live close to the product, developers learn faster.",
    whyImportantTe: "Large teams కి onboarding documentation అవసరం. Docs product దగ్గర ఉంటే developers వేగంగా నేర్చుకుంటారు.",
    howToUse: "Keep Learning Hub updated when major routes, API patterns, permissions, or folder structures change.",
    howToUseTe: "Major routes, API patterns, permissions, folder structures మారినప్పుడు Learning Hub update చేయండి.",
    code: lines([
      "Module -> Page -> File -> Code -> Explanation",
      "Actual project usage -> Why important -> How to use in new projects",
      "English explanation -> Telugu explanation",
    ]),
    files: ["src/Components/LearningHub/LearningHub.js"],
  },
];

const defaultModule = learningModules[0];
const defaultPage = defaultModule.pages[0];
const defaultFile = defaultPage.files[0];

const LearningHub = () => {
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const [selectedModuleId, setSelectedModuleId] = useState(defaultModule.id);
  const [selectedPageName, setSelectedPageName] = useState(defaultPage.name);
  const [selectedFilePath, setSelectedFilePath] = useState(defaultFile.path);
  const [language, setLanguage] = useState("en");

  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeStepId) || steps[0],
    [activeStepId]
  );

  const selectedModule = useMemo(
    () => learningModules.find((module) => module.id === selectedModuleId) || defaultModule,
    [selectedModuleId]
  );

  const selectedPage = useMemo(
    () => selectedModule.pages.find((page) => page.name === selectedPageName) || selectedModule.pages[0],
    [selectedModule, selectedPageName]
  );

  const selectedFile = useMemo(
    () => selectedPage.files.find((file) => file.path === selectedFilePath) || selectedPage.files[0],
    [selectedPage, selectedFilePath]
  );

  const copy = labels[language];
  const activeStepText = language === "te" && stepTelugu[activeStep.id]
    ? { ...activeStep, ...stepTelugu[activeStep.id] }
    : activeStep;
  const activeStepWalkthroughs = stepCodeWalkthroughs[activeStep.id] || [];
  const selectedFileExplanation = language === "te" && fileTelugu[selectedFile.path]
    ? fileTelugu[selectedFile.path]
    : selectedFile.explanation;
  const selectedModulePurpose = language === "te" && moduleTelugu[selectedModule.id]
    ? moduleTelugu[selectedModule.id]
    : selectedModule.purpose;
  const showDrillDownExplorer = [
    "modules",
    "pages",
    "components",
    "api-analysis",
    "auth",
    "flow",
  ].includes(activeStep.id);

  const handleModuleSelect = (moduleId) => {
    const module = learningModules.find((item) => item.id === moduleId) || defaultModule;
    setSelectedModuleId(module.id);
    setSelectedPageName(module.pages[0].name);
    setSelectedFilePath(module.pages[0].files[0].path);
  };

  const handlePageSelect = (pageName) => {
    const page = selectedModule.pages.find((item) => item.name === pageName) || selectedModule.pages[0];
    setSelectedPageName(page.name);
    setSelectedFilePath(page.files[0].path);
  };

  return (
    <section id="content-wrapper" className="LearningHubPage">
      <div className="MyMarginCls"></div>

      <div className="LearningHubHeader">
        <div>
          <p className="LearningHubEyebrow">{copy.portal}</p>
          <h1>Learning Hub</h1>
          <p>
            {copy.intro}
          </p>
        </div>
        <div className="LearningHubHeaderActions">
          <div className="LearningHubLanguage" aria-label={copy.language}>
            <span>{copy.language}</span>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
            <button
              type="button"
              className={language === "te" ? "active" : ""}
              onClick={() => setLanguage("te")}
            >
              తెలుగు
            </button>
          </div>
          <div className="LearningHubPath">{copy.path}</div>
        </div>
      </div>

      <div className="LearningHubLayout">
        <aside className="LearningHubSteps" aria-label="Learning Hub steps">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              className={step.id === activeStepId ? "active" : ""}
              onClick={() => setActiveStepId(step.id)}
            >
              <span>{index + 1}</span>
              {language === "te" && stepTelugu[step.id] ? stepTelugu[step.id].title : step.title}
            </button>
          ))}
        </aside>

        <main className="LearningHubContent">
          <section className="LearningHubPanel">
            <div className="LearningHubPanelHeader">
              <div>
                <p className="LearningHubEyebrow">Step {steps.findIndex((step) => step.id === activeStep.id) + 1}</p>
                <h2>{activeStepText.title}</h2>
              </div>
              <div className="LearningHubFiles">
                {activeStep.files.map((file) => (
                  <span key={file}>{file}</span>
                ))}
              </div>
            </div>

            <div className="LearningHubGridTwo">
              <div>
                <h3>{copy.whatCodeDoes}</h3>
                <ul>
                  {activeStepText.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <h3>{copy.whyWritten}</h3>
                <p>{activeStepText.why}</p>
                <h3>{copy.concepts}</h3>
                <p>{activeStepText.concepts}</p>
              </div>
              <CodeBlock code={activeStep.code} />
            </div>
          </section>

          {activeStepWalkthroughs.length > 0 && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">Full coding explanation</p>
                  <h2>{language === "te" ? "Code Step By Step" : "Code Step By Step"}</h2>
                  <p>
                    {language === "te"
                      ? "ఈ section summary కాదు. Actual code ఎలా పని చేస్తుంది, data flow ఎలా ఉంటుంది, beginner ఎలా అర్థం చేసుకోవాలో step by step explain చేస్తుంది."
                      : "This section is not only a summary. It explains how the actual code works, how data flows, and how a beginner should understand it step by step."}
                  </p>
                </div>
              </div>

              <div className="LearningHubCoreList">
                {activeStepWalkthroughs.map((item) => (
                  <article key={item.title} className="LearningHubCoreCard">
                    <div className="LearningHubCoreText">
                      <h3>{item.title}</h3>
                      <div className="LearningHubFiles LearningHubFilesInline">
                        <span>{item.file}</span>
                      </div>

                      <h4>{copy.explanation}</h4>
                      <p>{language === "te" ? item.explanationTe : item.explanation}</p>

                      <h4>{language === "te" ? "Execution Flow" : "Execution Flow"}</h4>
                      <p>{language === "te" ? item.flowTe : item.flow}</p>
                    </div>
                    <CodeBlock code={item.code} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "folders" && (
            <section className="LearningHubPanel">
              <h2>{copy.scannedFolder}</h2>
              <div className="LearningHubTableWrap">
                <table className="LearningHubTable">
                  <thead>
                    <tr>
                      <th>Folder</th>
                      <th>Files</th>
                      <th>Purpose</th>
                      <th>Stored Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folderRows.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.files}</td>
                        <td>{row.purpose}</td>
                        <td>{row.stores}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeStep.id === "modules" && (
            <section className="LearningHubPanel">
              <h2>{copy.businessScan}</h2>
              <div className="LearningHubModuleColumns">
                <ModuleCountList title="src/Components" rows={componentModuleRows} />
                <ModuleCountList title="src/PayrollComponents" rows={payrollModuleRows} />
              </div>
            </section>
          )}

          {activeStep.id === "api-analysis" && (
            <section className="LearningHubPanel">
              <h2>{copy.apiFamilies}</h2>
              <div className="LearningHubApiList">
                {apiFamilies.map((item) => (
                  <div key={item.area} className="LearningHubApiRow">
                    <strong>{item.area}</strong>
                    <span>{item.endpoints}</span>
                    <em>{item.consumed}</em>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "best-practices" && (
            <section className="LearningHubPanel">
              <h2>{copy.bestTitle}</h2>
              <div className="LearningHubBestGrid">
                {bestPracticeTopics.map((topic) => (
                  <article key={topic.title} className="LearningHubBestCard">
                    <div>
                      <h3>{topic.title}</h3>
                      <p><strong>{copy.currentPattern}:</strong> {language === "te" ? topic.currentTe : topic.current}</p>
                      <p><strong>{copy.recommendedPattern}:</strong> {language === "te" ? topic.recommendedTe : topic.recommended}</p>
                    </div>
                    <CodeBlock code={topic.code} />
                    {language === "en" && (
                      <p className="LearningHubTeluguNote">
                        <strong>{copy.teluguNote}:</strong> {topic.recommendedTe}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "page-concepts" && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">Actual page concept study</p>
                  <h2>WFHApprovals.js concepts</h2>
                  <p>
                    {language === "te"
                      ? "ఈ section actual project page code ని తీసుకుని concept-wise explain చేస్తుంది. Exact structure copy చేయడం కాదు; concept ని అన్ని projects లో ఎలా వాడాలో నేర్చుకోవడం లక్ష్యం."
                      : "This section takes real project page code and explains it concept by concept. The goal is not to copy the exact structure, but to understand how to use each concept in any project."}
                  </p>
                </div>
                <div className="LearningHubFiles">
                  <span>src/Components/WorkFromHome/WFHApprovals.js</span>
                </div>
              </div>

              <div className="LearningHubConceptList">
                {pageConceptStudies.map((item) => (
                  <article key={item.title} className="LearningHubConceptCard">
                    <div className="LearningHubConceptText">
                      <p className="LearningHubEyebrow">{item.actualFile}</p>
                      <h3>{item.title}</h3>
                      <h4>{copy.explanation}</h4>
                      <p>{language === "te" ? item.explanationTe : item.explanation}</p>
                      <h4>{language === "te" ? "అన్ని projects లో ఎలా వాడాలి" : "How To Use In Any Project"}</h4>
                      <p>{language === "te" ? item.generalUseTe : item.generalUse}</p>
                    </div>
                    <CodeBlock code={item.code} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "live-role-flow" && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">Real project coding flow</p>
                  <h2>{language === "te" ? "Roles Menu Full Coding Flow" : "Roles Menu Full Coding Flow"}</h2>
                  <p>
                    {language === "te"
                      ? "ఈ section MoreSection.js లోని actual role/menu logic ని end-to-end explain చేస్తుంది. API response storage లోకి ఎలా వస్తుంది, storage నుంచి UI cards ఎలా render అవుతాయి, click తర్వాత navigation ఎలా జరుగుతుంది అన్నది step by step."
                      : "This section explains the actual role/menu logic from MoreSection.js end to end: how API response data goes into storage, how storage becomes visible UI cards, and what happens after a card click."}
                  </p>
                </div>
                <div className="LearningHubFiles">
                  <span>src/Components/Dashboard/MoreSection.js</span>
                  <span>src/PayrollComponents/SignUp/LoginForm.js</span>
                </div>
              </div>

              <div className="LearningHubFlowStrip">
                <span>Login API</span>
                <span>Storage</span>
                <span>Permission Filter</span>
                <span>Allowed Cards</span>
                <span>Navigate</span>
              </div>

              <div className="LearningHubCoreList">
                {roleMenuLiveFlow.map((item) => (
                  <article key={item.title} className="LearningHubCoreCard">
                    <div className="LearningHubCoreText">
                      <h3>{item.title}</h3>

                      <h4>{copy.explanation}</h4>
                      <p>{language === "te" ? item.explanationTe : item.explanation}</p>

                      <h4>{language === "te" ? "Execution Flow" : "Execution Flow"}</h4>
                      <p>{language === "te" ? item.flowTe : item.flow}</p>
                    </div>
                    <CodeBlock code={item.code} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "coding-concepts" && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">Beginner to project-ready coding</p>
                  <h2>{language === "te" ? "All Coding Concepts" : "All Coding Concepts"}</h2>
                  <p>
                    {language === "te"
                      ? "ఈ section actual project files నుంచి coding concepts నేర్పుతుంది. ఒక page లో code చూస్తే imports, state, API, response, UI rendering, click handlers ఎలా connect అవుతాయో step by step అర్థం అవుతుంది."
                      : "This section teaches coding concepts from actual project files. It helps you understand how imports, state, API calls, responses, UI rendering, and click handlers connect inside a real page."}
                  </p>
                </div>
              </div>

              <div className="LearningHubCoreList">
                {codingConceptDeepDives.map((concept) => (
                  <article key={concept.title} className="LearningHubCoreCard">
                    <div className="LearningHubCoreText">
                      <h3>{concept.title}</h3>
                      <div className="LearningHubFiles LearningHubFilesInline">
                        <span>{concept.file}</span>
                      </div>

                      <h4>{copy.explanation}</h4>
                      <p>{language === "te" ? concept.explanationTe : concept.explanation}</p>

                      <h4>{language === "te" ? "Beginner Understanding" : "Beginner Understanding"}</h4>
                      <p>{language === "te" ? concept.beginnerTe : concept.beginner}</p>
                    </div>
                    <CodeBlock code={concept.code} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeStep.id === "core-concepts" && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">Large React project guide</p>
                  <h2>{language === "te" ? "పెద్ద React Projects కోసం Main Concepts" : "Main Concepts For Large React Projects"}</h2>
                  <p>
                    {language === "te"
                      ? "ఈ section ఈ project లో వాడిన important concepts ని తీసుకుని, future projects లో clean structure ఎలా build చేయాలో explain చేస్తుంది."
                      : "This section uses important concepts from this project and explains how to build cleaner structure in future projects."}
                  </p>
                </div>
              </div>

              <div className="LearningHubCoreList">
                {coreProjectConcepts.map((concept) => (
                  <article key={concept.title} className="LearningHubCoreCard">
                    <div className="LearningHubCoreText">
                      <h3>{concept.title}</h3>
                      <div className="LearningHubFiles LearningHubFilesInline">
                        {concept.files.map((file) => (
                          <span key={file}>{file}</span>
                        ))}
                      </div>

                      <h4>{language === "te" ? "ఈ project లో ఎలా వాడారు" : "How This Project Uses It"}</h4>
                      <p>{language === "te" ? concept.projectUseTe : concept.projectUse}</p>

                      <h4>{language === "te" ? "ఎందుకు important" : "Why It Is Important"}</h4>
                      <p>{language === "te" ? concept.whyImportantTe : concept.whyImportant}</p>

                      <h4>{language === "te" ? "New projects లో ఎలా వాడాలి" : "How To Use In New Projects"}</h4>
                      <p>{language === "te" ? concept.howToUseTe : concept.howToUse}</p>
                    </div>
                    <CodeBlock code={concept.code} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {showDrillDownExplorer && (
            <section className="LearningHubPanel">
              <div className="LearningHubPanelHeader">
                <div>
                  <p className="LearningHubEyebrow">{copy.drillDown}</p>
                  <h2>{copy.path}</h2>
                </div>
              </div>

              <div className="LearningHubNavigator">
                <div className="LearningHubNavColumn">
                  <h3>{copy.module}</h3>
                  {learningModules.map((module) => (
                    <button
                      key={module.id}
                      type="button"
                      className={module.id === selectedModule.id ? "active" : ""}
                      onClick={() => handleModuleSelect(module.id)}
                    >
                      {module.name}
                    </button>
                  ))}
                </div>

                <div className="LearningHubNavColumn">
                  <h3>{copy.page}</h3>
                  {selectedModule.pages.map((page) => (
                    <button
                      key={page.name}
                      type="button"
                      className={page.name === selectedPage.name ? "active" : ""}
                      onClick={() => handlePageSelect(page.name)}
                    >
                      {page.name}
                      <small>{page.path}</small>
                    </button>
                  ))}
                </div>

                <div className="LearningHubNavColumn">
                  <h3>{copy.file}</h3>
                  {selectedPage.files.map((file) => (
                    <button
                      key={file.path}
                      type="button"
                      className={file.path === selectedFile.path ? "active" : ""}
                      onClick={() => setSelectedFilePath(file.path)}
                    >
                      {file.path}
                    </button>
                  ))}
                </div>
              </div>

              <div className="LearningHubSelected">
                <div>
                  <p className="LearningHubEyebrow">{selectedModule.name}</p>
                  <h2>{selectedPage.name}</h2>
                  <p>{selectedModulePurpose}</p>
                  <p><strong>{copy.selectedFile}</strong> {selectedFile.path}</p>
                </div>
                <CodeBlock code={selectedFile.code} />
                <div className="LearningHubExplanation">
                  <h3>{copy.explanation}</h3>
                  <ul>
                    {selectedFileExplanation.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </section>
  );
};

const CodeBlock = ({ code }) => (
  <pre className="LearningHubCode">
    <code>{code}</code>
  </pre>
);

const ModuleCountList = ({ title, rows }) => (
  <div className="LearningHubModuleList">
    <h3>{title}</h3>
    <div>
      {rows.map(([name, count]) => (
        <span key={name}>
          {name}
          <strong>{count}</strong>
        </span>
      ))}
    </div>
  </div>
);

export default LearningHub;
