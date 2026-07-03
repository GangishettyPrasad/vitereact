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
  FaUsers, 
  FaClock, 
  FaCalendarAlt, 
  FaBriefcase, 
  FaMoneyBillWave 
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
    'window', 'JSON', 'axios', 'CryptoJS', 'getCookie', 'reloadRoles', 'createSlice', 'configureStore', 'FormData'
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

// Phase 4: Core HRMS Modules Data
const PHASE4_DATABASE = [
  {
    id: 0,
    title: "1. Employee Onboarding & Directory",
    icon: <FaUsers />,
    category: "Core HRMS",
    theory: "Employee Onboarding uses a multi-step form wizard (stepper) to collect personal, job, and document details, while the Employee Directory displays a paginated list of active employees with search and filter capabilities.",
    code: `// Key snippets from AddEmployee.js and Directory.js of temp_bharatpayroll
const AddEmployee = () => {
  const [formStep, setFormStep] = useState(0);
  const { register, getValues, setValue, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });

  // 1️⃣ Dynamic Pincode City/State lookup API
  const getlocationswithpin = async (pincode) => {
    const headers = ApiHeaders(multitenant);
    if (pincode.length === 6) {
      await axios.post("/postzipcode/", { pincode }, { headers })
        .then(res => {
          setValue("City", res.data.City);
          setValue("State", res.data.State);
        })
        .catch(err => console.log(err));
    }
  };

  // 2️⃣ Dynamic designation lookup based on department
  const onDepartmentChange = async (deptId) => {
    const headers = ApiHeaders(multitenant);
    await axios.post(\`/designation_filter2/\`, { af_desg_dept_id: deptId }, { headers })
      .then(res => setDesignationsList(res.data))
      .catch(err => console.log(err));
  };

  // 3️⃣ File and Data Submission using FormData
  const submitForm = async () => {
    const data = getValues();
    const formData = new FormData();
    
    // Append text fields
    formData.append("First_Name", data.First_Name);
    formData.append("Last_Name", data.Last_Name);
    formData.append("Department_Name", data.Department_Name);
    
    // Append file objects
    formData.append("Upload_PanCard", data.Upload_PanCard[0]);
    formData.append("Upload_AdhaarCard", data.Upload_AdhaarCard[0]);

    const headers = ApiHeaders(multitenant);
    await axios.post("/api/user/add-employee/", formData, { headers })
      .then((res) => alert("Employee onboarded successfully!"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {formStep === 0 && (
        <section>
          <label>First Name</label>
          <input {...register("First_Name", { required: "Name is required" })} />
        </section>
      )}
      {/* Stepper buttons */}
      {formStep < 4 ? (
        <button type="button" disabled={!isValid} onClick={() => setFormStep(s => s + 1)}>Next</button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};`,
    explanation: [
      "useForm({ mode: 'all' }): Configures react-hook-form to validate inputs on blur and change events, providing real-time feedback.",
      "getlocationswithpin: Triggers an API call when a 6-digit pincode is entered, automatically populating the city and state fields.",
      "FormData: Utilizes the browser's native FormData object to send both text fields and file uploads in a single multipart/form-data request.",
      "designation_filter2: Dynamically fetches and updates the designations list based on the selected department."
    ],
    flow: "User types pincode → getlocationswithpin calls zip API → city/state fields auto-populate → User selects department → designation_filter2 updates designations list → User uploads documents → submitForm appends data to FormData → Axios posts multipart payload → Server registers employee.",
    internal: {
      react: "React tracks formStep and renders the active step view dynamically, using register to bind inputs without triggering redundant re-renders.",
      js: "Javascript executes async API calls to fetch location and designation details dynamically.",
      browser: "The browser's File API reads uploaded document blobs and attaches them to the FormData object."
    },
    telugu: "Employee Onboarding page lo personal details, documents uploads handle cheyadaniki multi-step form stepper system configure chestham. Pincode type cheyagaane City/State details automatic ga fetch chesi display cheyadaniki postzipcode API setup apply chestham. Text input variables normal ga string values capture chesthunte, files dynamic ga attach cheyadaniki native FormData API parameters append chestham.",
    realtime: "Enterprise applications use multi-step forms to organize complex workflows, and use FormData to send file attachments alongside text fields.",
    interview: [
      "Q: How do you handle file uploads alongside text fields in a single API call? - A: Use the browser's native FormData object and append both text fields and file blobs, then send the request with 'Content-Type': 'multipart/form-data'.",
      "Q: Explain how to implement dynamic dropdown filtering in React. - A: Bind an onChange handler to the parent dropdown (e.g. Department) to fetch data from the server, and update the child dropdown's state options list when the API resolves."
    ],
    bestPractices: "Set file upload size limits to prevent performance issues, validate document formats (e.g. only allow JPEG/PNG) before submission, and use stepper state verification to ensure users cannot skip mandatory steps."
  },
  {
    id: 1,
    title: "2. Attendance Tracking",
    icon: <FaClock />,
    category: "Core HRMS",
    theory: "Attendance Tracking handles employee clock-ins and check-outs, calculating daily work hours, shift schedules, and overtime hours.",
    code: `// Core logic mockup for CheckInOut.js
const CheckInOut = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    const headers = ApiHeaders(multitenant);
    await axios.post("/api/attendance/check-in/", {}, { headers })
      .then(res => alert("Checked in successfully!"))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return <button onClick={handleCheckIn} disabled={loading}>Check In</button>;
};`,
    explanation: [
      "handleCheckIn: Sends a clock-in request to the backend with authentication headers.",
      "setLoading: Toggles loading state to prevent double-clicks during request latency."
    ],
    flow: "User clicks Check In → handleCheckIn triggers API request → Axios sends Bearer token in headers → Server records clock-in time in database → UI updates with status.",
    internal: {
      react: "Tracks active loading states to disable buttons during requests.",
      js: "Handles async API requests using JavaScript promises.",
      browser: "Sends HTTP requests and updates localStorage with clock-in status."
    },
    telugu: "Attendance check-in check-out operations handle cheyadaniki clock controls. API request send chesthe database timestamp logs coordinate details write chesthundhi.",
    realtime: "HRMS dashboards require secure check-in modules, often capturing IP addresses or locations to prevent punch-in tampering.",
    interview: [
      "Q: How do you prevent double-clicks on API triggers? - A: Disable the button immediately by setting a local loading state to true, and reset it only after the promise resolves."
    ],
    bestPractices: "Validate client IP addresses or locations before recording attendance, and implement background check-in sync to recover from connection drops."
  },
  {
    id: 2,
    title: "3. Leave Management",
    icon: <FaCalendarAlt />,
    category: "Core HRMS",
    theory: "Leave Management allows employees to apply for leaves and check leave balances, while managers can review, approve, or reject applications dynamically.",
    code: `// Leave apply logic in ApplyLeave.js
const ApplyLeave = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const headers = ApiHeaders(multitenant);
    await axios.post("/api/leaves/apply/", data, { headers })
      .then(res => alert("Leave applied successfully!"))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("leaveType")}><option value="Sick">Sick</option></select>
      <input type="date" {...register("startDate")} />
      <button type="submit">Apply</button>
    </form>
  );
};`,
    explanation: [
      "onSubmit: Sends the leave application data (dates, type, reason) to the backend API.",
      "ApiHeaders: Attaches the user's token and company details to authorize the request."
    ],
    flow: "User enters dates and leave type → clicks Apply → form validation runs → Axios posts request to backend → Server calculates balances and records leave request.",
    internal: {
      react: "Manages form state and validation rules dynamically.",
      js: "Submits JSON payload asynchronous using promises.",
      browser: "Sends network request and displays feedback banners."
    },
    telugu: "Leaves configurations setups. user details inputs check leaves status apply trigger options checks.",
    realtime: "Leave tracking requires calendar integrations and automated notification alerts to inform managers of new applications.",
    interview: [
      "Q: How do you calculate leave duration between dates on the client side? - A: Parse both dates into Date objects, calculate the time difference in milliseconds, and convert it to days (duration = diffTime / (1000 * 60 * 60 * 24) + 1)."
    ],
    bestPractices: "Check leave balances on the client side to prevent invalid submissions, and implement automated fallback approval rules for expired requests."
  },
  {
    id: 3,
    title: "4. Performance Review",
    icon: <FaBriefcase />,
    category: "Core HRMS",
    theory: "Performance Review (MonthlyKRA) manages KPI/KRA checklists, allowing managers to assign questionnaires and track employee performance ratings.",
    code: `// KRA Questionnaire loader
const KRADashboard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const headers = ApiHeaders(multitenant);
      await axios.get("/get_questionnaire/", { headers })
        .then(res => setQuestions(res.data))
        .catch(err => console.log(err));
    };
    fetchQuestions();
  }, []);

  return <div>Loaded {questions.length} KPI targets</div>;
};`,
    explanation: [
      "fetchQuestions: Fetches the assigned KPI questionnaires from the server.",
      "setQuestions: Stores questions in local state to render checklist inputs dynamically."
    ],
    flow: "Dashboard mounts → fetchQuestions queries backend → server returns KPI lists → state updates → UI renders questionnaires list.",
    internal: {
      react: "useEffect hook triggers API call on mount to load data before rendering details.",
      js: "Retrieves list arrays and maps elements into checklist inputs dynamically.",
      browser: "Renders dynamically generated questionnaire forms."
    },
    telugu: "Monthly KRA performance checks evaluations setups questions list load options controls.",
    realtime: "KPI dashboards use interactive checklist grids, autosaving responses to prevent loss of progress during reviews.",
    interview: [
      "Q: Why call APIs inside useEffect instead of directly in the component body? - A: Calling APIs directly in the component body triggers a request on every single re-render, leading to infinite API call loops. useEffect restricts calls to mount or specific dependency updates."
    ],
    bestPractices: "Implement autosave features to preserve input progress, and use visual rating charts to summarize KPI scores."
  },
  {
    id: 4,
    title: "5. Savings & Taxes",
    icon: <FaMoneyBillWave />,
    category: "Core HRMS",
    theory: "Savings & Taxes handles investment declarations, tax calculations, and expense reimbursement claims.",
    code: `// Savings Declaration submission logic
const TaxDeclaration = () => {
  const [declarations, setDeclarations] = useState([]);

  const handlePost = async () => {
    const headers = ApiHeaders(multitenant);
    await axios.post("/api/tax/declare/", { declarations }, { headers })
      .then(res => alert("Tax declaration saved!"))
      .catch(err => console.log(err));
  };

  return <button onClick={handlePost}>Submit Tax Info</button>;
};`,
    explanation: [
      "handlePost: Sends the tax declaration payload to the backend.",
      "setDeclarations: Tracks investment values across categories (e.g. 80C, 80D)."
    ],
    flow: "User enters investment values → clicks Submit → handlePost triggers API call → server recalculates tax projections and updates records.",
    internal: {
      react: "Tracks investment inputs and computes real-time tax projection updates.",
      js: "Processes numeric calculations and validates inputs.",
      browser: "Sends JSON payload and displays success messages."
    },
    telugu: "Saving declaration forms setups. investments categories values tax configurations controls.",
    realtime: "Payroll portals validate investments against tax bracket rules dynamically to calculate monthly TDS deductions.",
    interview: [
      "Q: How do you handle numeric inputs safely in forms? - A: Parse input values to numbers using Number() or parseFloat() before processing, and validate ranges to prevent calculations with invalid inputs."
    ],
    bestPractices: "Provide clear tooltips explaining tax eligibility rules, and implement document upload requirements to verify declaration claims."
  }
];

const Phase4CodeGuide = () => {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeModule = PHASE4_DATABASE[activeModuleIdx];

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
        background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(79, 70, 229, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#c7d2fe', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Phase 4: Core HRMS Modules
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          Real-Time HRMS Core Modules Walkthrough
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Study the core modules of the HRMS application. Learn the workflows and implementation details for Onboarding, Attendance, Leaves, Performance KRAs, and Tax settings.
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
              Select Core Module:
            </Typography>
            
            {PHASE4_DATABASE.map((module, idx) => (
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
                  bgcolor: activeModuleIdx === idx ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  color: activeModuleIdx === idx ? '#4f46e5' : '#475569',
                  border: '1px solid',
                  borderColor: activeModuleIdx === idx ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(79, 70, 229, 0.04)',
                    borderColor: 'rgba(79, 70, 229, 0.1)'
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
              <Tab value="theory" label="1. Theory & Use Case" />
              <Tab value="code" label="2. Code Snippets" />
              <Tab value="explain" label="3. Line-by-Line" />
              <Tab value="flow" label="4. Execution Flow" />
              <Tab value="internal" label="5. Internal Working" />
              <Tab value="telugu" label="6. Telugu Explanation" />
              <Tab value="realtime" label="7. Real-Time Usage" />
              <Tab value="interview" label="8. Interview Q&A" />
              <Tab value="best" label="9. Best Practices" />
            </Tabs>

            {/* Sub-tab viewport panels */}
            
            {/* Panel 1: Theory */}
            {activeSubTab === 'theory' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1 }}>What is this and why is it needed?</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.theory}</Typography>
              </Box>
            )}

            {/* Panel 2: Code */}
            {activeSubTab === 'code' && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FaTerminal /> source_code_reference — Production Reference File
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => handleCopyCode(activeModule.code)}
                    startIcon={copied ? <FaCheck /> : <FaCopy />}
                    sx={{ 
                      color: copied ? '#10b981' : '#4f46e5', 
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
                    <Paper key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderLeft: '4px solid #4f46e5', borderRadius: '8px' }}>
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
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Execution Flow Step-by-Step:</Typography>
                <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  <Typography variant="body2" sx={{ color: '#1e293b', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {activeModule.flow.split(' → ').map((step, sIdx) => (
                      <span key={sIdx}>
                        {sIdx > 0 && <span style={{ color: '#4f46e5', fontWeight: 'bold' }}>{'\n  ↓\n'}</span>}
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
                  <Typography variant="subtitle2" sx={{ color: '#b45309', fontWeight: 800, mb: 0.5 }}>React Component Lifecycle & Rendering:</Typography>
                  <Typography variant="body2" sx={{ color: '#78350f', lineHeight: 1.6 }}>{activeModule.internal.react}</Typography>
                </Paper>
                <Paper sx={{ p: 2.5, bgcolor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#15803d', fontWeight: 800, mb: 0.5 }}>JS Engine Thread Asynchronous Processing:</Typography>
                  <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>{activeModule.internal.js}</Typography>
                </Paper>
                <Paper sx={{ p: 2.5, bgcolor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '10px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#1d4ed8', fontWeight: 800, mb: 0.5 }}>Browser Web APIs, Files & Networking:</Typography>
                  <Typography variant="body2" sx={{ color: '#1e40af', lineHeight: 1.6 }}>{activeModule.internal.browser}</Typography>
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
                  {activeModule.telugu}
                </Typography>
              </Paper>
            )}

            {/* Panel 7: Real-Time Usage */}
            {activeSubTab === 'realtime' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1.5 }}>Corporate Project Workflows:</Typography>
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
            {activeSubTab === 'best' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4f46e5', mb: 1.5 }}>Boilerplate Coding Best Practices:</Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>{activeModule.bestPractices}</Typography>
              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Phase4CodeGuide;
