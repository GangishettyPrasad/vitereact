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
  FaMoneyBillWave,
  FaSlidersH,
  FaFileAlt
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
    'window', 'JSON', 'axios', 'CryptoJS', 'getCookie', 'reloadRoles', 'createSlice', 'configureStore', 'FormData', 'Blob', 'FileReader'
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
    title: "1. Employee Onboarding",
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
    theory: "Attendance Tracking handles employee clock-ins and check-outs, calculating daily work hours, shift schedules, and overtime hours. It displays a paginated list of active logs with search and advanced multi-filtering.",
    code: `// File: src/components/Attendance/Attendance.jsx
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { AiOutlineReload, AiOutlineSearch } from "react-icons/ai";

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [filterattendanceList, setFilterAttendanceList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [listEmployes, setListEmployes] = useState([]);
  
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);

  // 1️⃣ DataTables Column Definitions
  const columns = [
    { name: "S.No", selector: (row) => row.Num, sortable: true },
    { name: "Emp Code", selector: (row) => row.emp_code, sortable: true },
    { name: "Employee", selector: (row) => row.employee, sortable: true },
    { name: "Check In Time", selector: (row) => row.log_in_time, sortable: true },
    { name: "Check Out Time", selector: (row) => row.log_out_time, sortable: true },
    { name: "Total Hours", selector: (row) => row.total_hr_spent, sortable: true },
    { name: "Status", cell: (row) => <button className="btn btn-sm">{row.status}</button> }
  ];

  // 2️⃣ Fetch Attendance list from backend API
  const getAttendanceList = async () => {
    setLoader(false);
    try {
      const response = await axios.get("/api/user/attendance_get/");
      const mapped = response.data.map((item, idx) => ({ ...item, Num: idx + 1 }));
      setAttendanceList(mapped);
      setFilterAttendanceList(mapped);
      setLoader(true);
    } catch (error) {
      console.error("Failed to load attendance", error);
      setLoader(true);
    }
  };

  // 3️⃣ Client-side instant keyword filter search
  useEffect(() => {
    const result = filterattendanceList.filter((att) => {
      return (
        att.emp_code.toLowerCase().includes(search.toLowerCase()) ||
        att.employee.toLowerCase().includes(search.toLowerCase()) ||
        att.department.toLowerCase().includes(search.toLowerCase())
      );
    });
    setAttendanceList(result);
  }, [search]);

  // 4️⃣ Server-side advanced multi-filtering searches
  const searchwithfilters = async () => {
    let req = {
      af_department: department,
      af_emp_code: employee,
      af_from_date: fromDate,
      af_to_date: toDate
    };
    await axios.post("/api/user/attendance_advancedfilter/", req)
      .then(res => {
        const mapped = res.data.map((item, idx) => ({ ...item, Num: idx + 1 }));
        setAttendanceList(mapped);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getAttendanceList();
  }, []);

  return (
    <div className="attendance-container">
      {/* Filters Area */}
      <div className="filters-grid" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        <button onClick={searchwithfilters}><AiOutlineSearch /> Search</button>
      </div>

      {/* Paginated DataTable */}
      {loader ? (
        <DataTable
          columns={columns}
          data={attendanceList}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input 
              type="text" 
              placeholder="Search..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          }
        />
      ) : <p>Loading Attendance Logs...</p>}
    </div>
  );
}`,
    explanation: [
      "columns array: Defines headers and selector accessors for the DataTable component.",
      "useEffect on search: Triggers client-side filtering instantly whenever the search input changes, avoiding API roundtrips.",
      "searchwithfilters: Sends a POST request with selected filters to fetch matching attendance records from the server."
    ],
    flow: "Page mounts → getAttendanceList fetches all logs → DataTable renders active list → User enters dates and clicks Search → searchwithfilters posts payload to server → server returns filtered records → state updates and DataTable re-renders.",
    internal: {
      react: "Manages state variable changes to trigger component updates when filters or search terms change.",
      js: "Executes client-side array filtering dynamically based on search terms.",
      browser: "Renders the list dynamically, handling pagination and sorting in memory."
    },
    telugu: "Attendance dashboard data rendering. DataTable component use chesi active check-in details display chestham. Client-side search optimization look: search input data key press key. advanced searches local filters values API post triggers checks.",
    realtime: "Enterprise grids load search queries and filters to handle millions of attendance records efficiently.",
    interview: [
      "Q: What is the benefit of filtering lists on the client side versus requesting data from the server? - A: Client-side filtering provides instant results and reduces server load, but is only suitable for small datasets. Large datasets should be filtered on the server using pagination.",
      "Q: How do you handle table columns sorting in React Data Table? - A: Add a 'sortable: true' attribute to the column definition and define a custom sort function if sorting complex objects."
    ],
    bestPractices: "Use server-side pagination for large datasets to keep pages fast, and implement auto-refresh rules to load new clock-ins in real-time."
  },
  {
    id: 2,
    title: "3. Leave Management",
    icon: <FaCalendarAlt />,
    category: "Core HRMS",
    theory: "Leave Management allows employees to apply for leaves, check balances, and track application history, automatically checking for backdated leaves and validation rules.",
    code: `// File: src/components/LeaveManagement/UserApplyLeave.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

export default function UserApplyLeave() {
  const [employeeDataRules, setEmployeeDataRules] = useState([]);
  const [userLeaveData, setUserLeaveData] = useState([]);
  const [SelectDayType, setSelectDayType] = useState("Full_Day");
  const [isBackdatedLeave, setisBackdatedLeave] = useState(false);
  const [dateisBack, setdateisBack] = useState(false);
  const [disable, setDisable] = useState(false);

  const { register, handleSubmit, setValue, getValues, formState: { errors }, clearErrors } = useForm();
  
  // Read session user details
  const userinfo = JSON.parse(sessionStorage.getItem("user-info") || "{}");
  const employeeNumber = userinfo?.data?.employee?.workDetails_EmployeeNumber;

  // 1️⃣ Dynamic Date math check for backdated leaves
  const checkthisdateisBackdated = (date) => {
    setdateisBack(false);
    const parsedDate = moment(date);
    const currentDate = moment();
    
    // Check if the selected date is before today
    if (parsedDate.isBefore(currentDate, "day")) {
      setdateisBack(true);
    }
  };

  // 2️⃣ Handle file attachment size limit validation
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // 2MB Limit
      alert("Please upload a file smaller than 2MB");
      setValue("LeaveAttachment", "");
    }
  };

  // 3️⃣ Submit Leave Form Data
  const onSubmit = async (data) => {
    setDisable(true);
    const formData = new FormData();
    formData.append("employee", employeeNumber);
    formData.append("leaveRule", data.leaveType);
    formData.append("startDate", moment(data.startDate).format("DD/MM/YYYY"));
    formData.append("endDate", moment(data.endDate).format("DD/MM/YYYY"));
    formData.append("reason", data.eventDescription);
    
    if (data.LeaveAttachment && data.LeaveAttachment[0]) {
      formData.append("attachment", data.LeaveAttachment[0]);
    }

    if (dateisBack && !isBackdatedLeave) {
      formData.append("isBackdated", true);
    }

    try {
      const response = await axios.post("/api/leave/apply/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Leave applied successfully!");
      setDisable(false);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Submission failed"));
      setDisable(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Leave Type</label>
        <select {...register("leaveType", { required: "Please select leave type" })}>
          <option value="">Select Type</option>
          {employeeDataRules.map(item => (
            <option key={item.leaveRule} value={item.leaveRule}>{item.leaveRuleDetails.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Start Date</label>
        <input 
          type="date" 
          {...register("startDate", { 
            required: "Start date is required",
            onChange: (e) => {
              checkthisdateisBackdated(e.target.value);
              clearErrors("startDate");
            }
          })} 
        />
      </div>

      {dateisBack && (
        <div style={{ color: 'red', fontSize: '12px' }}>
          Warning: You are applying for a backdated leave. Managers must approve backdated leaves.
        </div>
      )}

      <div>
        <label>Reason</label>
        <textarea {...register("eventDescription", { required: "Please enter a reason" })} />
      </div>

      <div>
        <label>Attachment (Max 2MB)</label>
        <input type="file" {...register("LeaveAttachment")} onChange={onFileChange} />
      </div>

      <button type="submit" disabled={disable}>Apply Leave</button>
    </form>
  );
}`,
    explanation: [
      "checkthisdateisBackdated: Compares the selected start date with the current date to flag backdated leaves dynamically.",
      "onFileChange: Validates files locally to ensure uploads do not exceed size limits (2MB).",
      "FormData configuration: Formats the request to upload file attachments alongside text fields."
    ],
    flow: "User selects leave type → User picks start date → Date check runs: sets dateisBack flag on backdated dates → User uploads file → File validator checks size → User submits form → Axios uploads FormData payload to the server.",
    internal: {
      react: "Tracks date validation states and dynamically renders warnings if backdated leaves are selected.",
      js: "Uses Moment.js to calculate date differences and parse date objects.",
      browser: "Parses uploaded files using the File API, validating size and type before sending."
    },
    telugu: "User apply leave modules configurations check. User backdated dates select chesthunnapudu date checker system warning alerts triggers setup coordinate. File size 2MB limits parameters verification checks values clear checks.",
    realtime: "Leave systems check leaves limits and calculate salary deductions dynamically before submitting requests.",
    interview: [
      "Q: How do you check if a date is in the past in React? - A: Use Moment.js (moment(date).isBefore(moment(), 'day')) or native JavaScript (new Date(date) < new Date().setHours(0,0,0,0)).",
      "Q: Why use FormData instead of standard JSON payloads? - A: JSON payloads do not support binary data (like files or images). FormData formats requests as multipart payloads, allowing files to be sent alongside text fields."
    ],
    bestPractices: "Validate file size and formats on the client side, implement clear backdated leave policies in code, and display leave balances clearly on the application form."
  },
  {
    id: 3,
    title: "4. Performance Review (KRA)",
    icon: <FaBriefcase />,
    category: "Core HRMS",
    theory: "Performance Review (MonthlyKRA) manages KPI/KRA checklists, allowing employees to submit self-evaluations and managers to record scores, enforcing deadlines dynamically.",
    code: `// File: src/components/MonthlyKRA/EmployeeKRA.jsx
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import { Modal, Form } from "react-bootstrap";

export default function EmployeeKRA() {
  const [employeeKRAList, setEmployeeKRAList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [setNameForQuestion, setSetNameForQuestion] = useState("");
  const [deadLineDate, setdeadLineDate] = useState(null);
  
  const [show, setShow] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [disable, setDisable] = useState(false);

  // 1️⃣ Compare current date with form deadline to toggle read-only state
  const today = new Date().toISOString().split("T")[0];
  const deadlineStr = deadLineDate ? new Date(deadLineDate).toISOString().split("T")[0] : "";
  const isDisabled = today > deadlineStr; // True if deadline is in the past

  // 2️⃣ Fetch questions list assigned to active form set
  const getListOfdata = async (empId, setNum) => {
    await axios.get(\`/api/performance_management/v2/retrive/questions/\${empId}/?set_number=\${setNum}\`)
      .then(res => {
        if (res.data.statusCode === 200) {
          const results = res.data.result.results;
          setSetNameForQuestion(results[0]?.setName || "");
          const mapped = results.map(item => ({
            question: item.question,
            questionId: item.questionId,
            answers: item.answer || ""
          }));
          setQuestionsList(mapped);
        }
      });
  };

  // 3️⃣ Save draft self-evaluation answers (candidateStatus: "Save")
  const onsaveEmployeeAnswers = async () => {
    const userinfo = JSON.parse(sessionStorage.getItem("user-info") || "{}");
    const qAnswersPayload = questionsList.map(item => ({
      question: item.questionId,
      answer: item.answers
    }));

    const req = {
      employee: userinfo?.data?.employee?.id,
      set_name: setNameForQuestion,
      candidateStatus: "Save",
      ques_ans: qAnswersPayload
    };

    await axios.post("/api/performance_management/employee/kra/create/", req)
      .then(() => alert("Draft saved successfully!"))
      .catch(err => console.error(err));
  };

  // 4️⃣ Submit final evaluation answers (candidateStatus: "SUBMITTED")
  const onSubmitFinal = async () => {
    setDisable(true);
    const userinfo = JSON.parse(sessionStorage.getItem("user-info") || "{}");
    const qAnswersPayload = questionsList.map(item => ({
      question: item.questionId,
      answer: item.answers
    }));

    // Verify all questions are answered before submitting
    const allAnswered = qAnswersPayload.every(item => item.answer !== "");
    if (!allAnswered) {
      alert("All questions are mandatory before final submission!");
      setDisable(false);
      return;
    }

    const req = {
      employee: userinfo?.data?.employee?.id,
      set_name: setNameForQuestion,
      candidateStatus: "SUBMITTED",
      ques_ans: qAnswersPayload
    };

    await axios.post("/api/performance_management/employee/kra/create/", req)
      .then(() => {
        alert("Performance evaluation submitted successfully!");
        setShow(false);
        setDisable(false);
      })
      .catch(err => {
        console.error(err);
        setDisable(false);
      });
  };

  const handleTextareaChange = (val, idx) => {
    const updated = [...questionsList];
    updated[idx].answers = val;
    setQuestionsList(updated);
  };

  return (
    <div>
      {/* Questionnaire modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Self Evaluation Questionnaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Form Set: {setNameForQuestion}</h5>
          
          {questionsList.map((q, idx) => (
            <div key={q.questionId} style={{ marginBottom: '15px' }}>
              <label>Q{idx+1}: {q.question}</label>
              <textarea 
                className="form-control" 
                value={q.answers} 
                disabled={submited || isDisabled}
                onChange={e => handleTextareaChange(e.target.value, idx)}
              />
            </div>
          ))}

          {isDisabled && (
            <p style={{ color: 'red' }}>
              Warning: Submission deadline has passed. Please contact your manager to extend the deadline.
            </p>
          )}

          {!submited && (
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button disabled={isDisabled} onClick={onsaveEmployeeAnswers}>Save Draft</button>
              <button disabled={isDisabled || disable} onClick={onSubmitFinal}>Submit Evaluation</button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}`,
    explanation: [
      "isDisabled: Compares the current date string (YYYY-MM-DD) with the form deadline date string to lock inputs dynamically.",
      "candidateStatus 'Save' vs 'SUBMITTED': 'Save' writes a draft in the database, allowing users to return and edit. 'SUBMITTED' locks the form and marks it ready for manager review.",
      "allAnswered validation: Checks every element in the array to block submissions with empty answer fields."
    ],
    flow: "Component mounts → fetch KRA forms list → User clicks evaluation action → getListOfdata loads questions → Modal opens → date check compares today vs deadline → User types answers → clicks Save Draft (saves values without locking) or clicks Submit (validates all fields are filled, posts final payload, locks form).",
    internal: {
      react: "Dynamically updates local textarea value matrices on keystroke events without reloading page states.",
      js: "Performs array checks (`every()`) and compares date strings in the ISO format.",
      browser: "Manages state variables in memory and renders warning logs if validation checks fail."
    },
    telugu: "Monthly KRA appraisals evaluation forms setup. Questionnaires list load chesthunnapudu deadline dates check triggers check coordinates. Current date check: deadline cross aiethe textareas automatically disabled state switches blocks coordinate setups.",
    realtime: "Corporate reviews use strict evaluation windows, requiring automated deadline locks to prevent retrospective updates.",
    interview: [
      "Q: What is the difference between saving a draft and final submission in databases? - A: Drafts are stored with edit permissions enabled, allowing users to make updates. Final submissions write values with lock flags set to true, making fields read-only and notifying managers.",
      "Q: How do you verify that every element in an array meets a condition in JavaScript? - A: Use the native 'Array.prototype.every()' method, which returns true only if all elements in the array pass the validation check."
    ],
    bestPractices: "Display deadline dates clearly in UI headers, implement autosave features to preserve input progress, and wrap date comparisons in try/catch blocks."
  },
  {
    id: 4,
    title: "5. Savings & Taxes",
    icon: <FaMoneyBillWave />,
    category: "Core HRMS",
    theory: "Savings & Taxes manages tax regime selections (Old vs New Regime) and investment declarations, dynamically clearing contrasting data configurations on regime changes.",
    code: `// File: src/components/savingDeclaration/RegimeForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function RegimeForm() {
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [oldRegime, setOldRegime] = useState({});
  const [newRegime, setNewRegime] = useState({});
  
  const [oldRegimePopUp, setOldRegimePopUp] = useState(false);
  const [newRegimePopUp, setNewRegimePopUp] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  // 1️⃣ Fetch active regimes details and CTC from backend
  const getEmployeeBankDetails = async () => {
    try {
      const response = await axios.get("/api/investment_declaration/regime-select");
      const list = response.data;
      const lastElement = list[list.length - 1];

      // Check if regime changes are enabled by HR
      if (lastElement.enableRegimeSelection === false) {
        setShowDetails(false);
      } else {
        // Extract calculations for both regimes
        list.forEach(element => {
          if (element.regimeType === "old_regime") {
            setOldRegime(element);
          } else if (element.regimeType === "new_regime") {
            setNewRegime(element);
          }
        });
        setEmployeeDetails(list[2]);
        setShowDetails(true);
      }
    } catch (e) {
      console.error(e);
      setShowDetails(false);
    }
  };

  // 2️⃣ Handle switching regimes and delete contrasting data
  const switchRegimeSubmit = (targetRegimeIdToDelete) => {
    const apiUrl = '/api/investment_declaration/regime-select';
    
    // Post selected target to delete opposing configuration values
    axios.post(apiUrl, { investmentId: targetRegimeIdToDelete })
      .then(res => {
        alert("Tax regime switched successfully!");
        navigate('/saving-declaration-form');
      })
      .catch(err => console.error(err));

    setOldRegimePopUp(false);
    setNewRegimePopUp(false);
  };

  useEffect(() => {
    getEmployeeBankDetails();
  }, []);

  return (
    <div className="regime-form-container">
      {showDetails ? (
        <div>
          <h3>Select Tax Regime</h3>
          <p>Total CTC: {employeeDetails.employeeCtc}</p>
          <p>Gross Per Year: {employeeDetails.empGrossYear}</p>

          <table className="table">
            <thead>
              <tr>
                <th>Old Regime Brackets</th>
                <th>New Regime Brackets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 to 2.5 Lakhs (0%)</td>
                <td>0 to 3 Lakhs (0%)</td>
              </tr>
              {/* Render dynamic calculations */}
              <tr>
                <td>Total Old Tax: {oldRegime.totalTax}</td>
                <td>Total New Tax: {newRegime.totalTax}</td>
              </tr>
            </tbody>
          </table>

          <button onClick={() => setOldRegimePopUp(true)}>Select Old Regime</button>
          <button onClick={() => setNewRegimePopUp(true)}>Select New Regime</button>
        </div>
      ) : <p>Regime selection is currently disabled by HR.</p>}

      {/* Warning Modals */}
      <Modal show={oldRegimePopUp} onHide={() => setOldRegimePopUp(false)}>
        <Modal.Header closeButton><h3>Confirm Old Regime</h3></Modal.Header>
        <Modal.Body>
          <p>Warning: Selecting the Old Regime will delete your New Regime declarations. Continue?</p>
          <button onClick={() => switchRegimeSubmit(newRegime.investmentId)}>Yes, Switch</button>
          <button onClick={() => setOldRegimePopUp(false)}>Cancel</button>
        </Modal.Body>
      </Modal>
    </div>
  );
}`,
    explanation: [
      "enableRegimeSelection: HR-controlled variable that enables or disables regime selections on the client side.",
      "switchRegimeSubmit: Sends a POST request to delete the declarations of the opposing tax regime and activate the selected one.",
      "totalTax and healthCessCuttings: Renders dynamic calculations for both regimes to help employees make informed decisions."
    ],
    flow: "Page mounts → getEmployeeBankDetails fetches calculations → Regime comparison table renders → User clicks Select Old Regime → warning modal opens → User confirms selection → switchRegimeSubmit posts investment ID of the opposing regime → database updates → page redirects.",
    internal: {
      react: "Toggles visibility based on active states and HR configurations.",
      js: "Loops through calculations to separate data for Old and New regimes.",
      browser: "Renders confirmation modals and handles page transitions."
    },
    telugu: "Tax saving declaration select regime form setups. Old vs New regime values dynamic calculations columns render indicators checks. switch trigger check: Old Regime post inputs trigger check new regime declarations cleanups trigger sets.",
    realtime: "Regime switchers perform complex salary calculations and tax projections to help employees select the optimal tax regime.",
    interview: [
      "Q: Why clean up opposing regime data when switching tax regimes? - A: Cleaning up opposing regime data prevents calculation conflicts and ensures that the payroll engine calculates TDS deductions using the correct tax rules.",
      "Q: Explain how to render modal screens in React. - A: Create a modal component, bind its visibility to a state variable (e.g. showModal), and toggle the state to show or hide the modal dynamically."
    ],
    bestPractices: "Display total tax projections for both regimes side-by-side, implement clear warning confirmations, and disable selection windows after payroll runs."
  },
  {
    id: 5,
    title: "6. Company Profile & Master Setups",
    icon: <FaSlidersH />,
    category: "Core HRMS",
    theory: "Company Profile & Master Setups (DesignationMaster) manages organization departments, shifts, and designation rules, incorporating validations to prevent deleting designations with active employees.",
    code: `// File: src/components/EimAdmin/Designation/DesignationMaster.jsx
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// 1️⃣ Skeleton Shimmer Loader Component
const ShimmerTable = () => {
  const rows = Array(5).fill(null);
  return (
    <div style={{ width: "100%", padding: "10px" }}>
      {rows.map((_, i) => (
        <div key={i} style={{ display: "flex", gap: "15px", marginBottom: "15px", height: "40px", background: "#e0e0e0", borderRadius: "6px" }} />
      ))}
    </div>
  );
};

export default function DesignationMaster() {
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  
  const [countries, setCountries] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [isEdited, setisEdited] = useState(false);
  const [editId, setEditId] = useState(null);

  const userinfo = JSON.parse(sessionStorage.getItem("user-info") || "{}");

  // 2️⃣ Fetch Designations List from Server
  const getCountries = async (page, size = perPage) => {
    setLoader(false);
    const url = \`/api/company/v2/designation/details/\${userinfo.data.id}/?page=\${page}&page_size=\${size}\`;
    try {
      const res = await axios.get(url);
      if (res.data.statusCode === 200) {
        const results = res.data.result.results.map((item, idx) => ({
          ...item,
          Num: idx + 1 + (page - 1) * size
        }));
        setCountries(results);
        setTotalRows(res.data.result.count);
      }
      setLoader(true);
    } catch (e) {
      console.error(e);
      setLoader(true);
    }
  };

  // 3️⃣ Create or Edit Designation
  const onSubmit = async (data) => {
    const req = {
      company: userinfo.data.id,
      name: data.designationName
    };

    try {
      if (!isEdited) {
        // Create new designation
        await axios.post("/api/company/designation/", req);
      } else {
        // Update existing designation
        await axios.patch(\`/api/company/update/designation/\${editId}/\`, req);
      }
      setShow(false);
      getCountries(1);
    } catch (err) {
      alert("Error saving designation: " + (err.response?.data?.message || "Failed"));
    }
  };

  // 4️⃣ Delete Designation
  const deleteDesignation = async (id) => {
    try {
      await axios.delete(\`/api/company/update/designation/\${id}/\`);
      getCountries(1);
    } catch (e) {
      alert("Delete failed: " + (e.response?.data?.message || "Failed"));
    }
  };

  const columns = [
    { name: "S.No", selector: (row) => row.Num, sortable: true },
    { name: "Designation Name", selector: (row) => row.name, sortable: true },
    { name: "Employee Count", selector: (row) => row.noOfEmployees, sortable: true },
    {
      name: "Action",
      cell: (row) => {
        // Enforce Validation: Block deleting designations with active employees
        const cannotDelete = row.noOfEmployees > 0;
        
        return (
          <div>
            <button onClick={() => {
              setisEdited(true);
              setEditId(row.id);
              setValue("designationName", row.name);
              setShow(true);
            }}><AiOutlineEdit /></button>
            
            <button 
              disabled={cannotDelete}
              style={{ color: cannotDelete ? '#ccc' : 'red' }}
              onClick={() => deleteDesignation(row.id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    getCountries(1);
  }, []);

  return (
    <div>
      <button onClick={() => { setisEdited(false); reset(); setShow(true); }}>Add Designation</button>
      {loader ? (
        <DataTable columns={columns} data={countries} pagination paginationServer paginationTotalRows={totalRows} onChangePage={getCountries} />
      ) : <ShimmerTable />}
    </div>
  );
}`,
    explanation: [
      "cannotDelete validation: Blocks deleting designations if the active employee count is greater than zero, protecting data integrity.",
      "ShimmerTable: Displays a skeleton loader using CSS gradients to show a loading state during API calls.",
      "paginationServer: Configures the DataTable to request data dynamically from the server on page transitions."
    ],
    flow: "Page mounts → getCountries fetches designations → DataTable renders list → User clicks Delete → check noOfEmployees: if > 0 button is disabled → if 0 deleteDesignation posts API request → server deletes designation → table refreshes.",
    internal: {
      react: "Uses conditional rendering to toggle between the Shimmer Table and the actual DataTable.",
      js: "Handles server-side pagination offsets: idx + 1 + (page - 1) * size.",
      browser: "Applies CSS animations to render skeleton loading effects."
    },
    telugu: "Company profile settings. designations records details CRUD setups. delete block check: active employees count greater than 0 aiethe delete button disable chestham. loading display targets look custom Shimmer table skeleton animations sets.",
    realtime: "Enterprise applications use skeleton loaders and strict database integrity rules to manage organizational settings securely.",
    interview: [
      "Q: Why use skeleton loaders instead of simple loading spinners? - A: Skeleton loaders show the layout structure of the page, improving perceived performance and user experience compared to blank screens with spinning icons.",
      "Q: Explain how server-side pagination works. - A: The client requests a specific page and size (e.g. page=2, limit=10), and the server queries the database using offset limits (offset = (page-1)*limit) and returns only those records along with the total count."
    ],
    bestPractices: "Prevent deleting organization settings that are referenced by active records, use path aliases, and implement clear skeleton loaders."
  },
  {
    id: 6,
    title: "7. Reports & Logs",
    icon: <FaFileAlt />,
    category: "Core HRMS",
    theory: "Reports & Logs manages system tracking logs, utilizing nested expandable rows to display detailed records and exporting log data to Excel files dynamically.",
    code: `// File: src/components/SystemTrack/Systemtrack.jsx
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";

export default function Systemtrack() {
  const [directoryList, setDirectoryList] = useState([]);
  const [sortedOptions, setSortedOptions] = useState([]);
  const [selectedEmployeesIDs, setSelectedEmployeesIDs] = useState([]);
  const [todate, settodate] = useState(moment().format("YYYY-MM-DD"));
  const [todate1, settodate1] = useState(moment().format("YYYY-MM-DD"));
  const [loader, setLoader] = useState(false);

  // 1️⃣ Nested Expandable rows component
  const ExpandedComponent = ({ data }) => (
    <div style={{ padding: '15px', background: '#f8fafc' }}>
      <table className="table">
        <thead>
          <tr>
            <th>System Name</th>
            <th>On Time</th>
            <th>Off Time</th>
            <th>Break Duration</th>
            <th>System IP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.systemName.join(', ')}</td>
            <td>{data.systemOnChar.map(t => moment(t).format("DD-MM hh:mm")).join(', ')}</td>
            <td>{data.systemOffChar.map(t => moment(t).format("DD-MM hh:mm")).join(', ')}</td>
            <td>{data.instanceDuration.join(' mins, ')}</td>
            <td>{data.systemIp.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // 2️⃣ Fetch logs list from server
  const getUsersList = async (page = 1) => {
    const url = \`/api/attendance/keylogger/logs/v2?page=\${page}&start_date=\${todate}&end_date=\${todate1}\`;
    await axios.get(url)
      .then(res => {
        if (res.data.statusCode === 200) {
          setDirectoryList(res.data.result.paginatedData.results);
        }
      });
  };

  // 3️⃣ Export data and download Excel file dynamically
  const onExportExcel = async () => {
    const url = \`/api/attendance/keylogger/logs/v2?download=true&start_date=\${todate}&end_date=\${todate1}\`;
    try {
      const response = await axios.get(url, {
        responseType: 'blob', // Receive response as binary blob
      });

      // Convert response data to Excel Blob object
      const excelBlob = new Blob([response.data], { type: 'text/ms-excel' });
      const downloadURL = window.URL.createObjectURL(excelBlob);
      
      // Create temporary DOM anchor link and trigger download click
      const link = document.createElement("a");
      link.download = \`SystemTrack_Report_\${moment().format("DD-MM-YYYY")}.xlsx\`;
      link.href = downloadURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  const columns = [
    { name: "Emp ID", selector: (row) => row.empId, sortable: true },
    { name: "Name", selector: (row) => row.employeeName_, sortable: true },
    { name: "Department", selector: (row) => row.employeeDepartment, sortable: true }
  ];

  return (
    <div>
      <Multiselect 
        options={sortedOptions} 
        displayValue="employeeName" 
        onSelect={(list) => setSelectedEmployeesIDs(list.map(i => i.id))} 
      />
      <button onClick={onExportExcel}>Export Excel</button>
      
      <DataTable 
        columns={columns} 
        data={directoryList} 
        expandableRows 
        expandableRowsComponent={ExpandedComponent} 
      />
    </div>
  );
}`,
    explanation: [
      "expandableRows: DataTable property that allows rows to expand and display nested detail panels.",
      "responseType 'blob': Configures Axios to receive binary data streams rather than parsing responses as JSON.",
      "URL.createObjectURL: Generates a temporary URL representing the binary Blob object in browser memory, enabling direct file downloads."
    ],
    flow: "Page mounts → fetches list → User clicks row → Row expands and displays sub-table → User clicks Export → Axios requests binary data stream → converts response to Blob object → creates DOM anchor link → triggers file download.",
    internal: {
      react: "Renders nested components dynamically when rows are expanded.",
      js: "Handles binary data objects and processes data conversions.",
      browser: "Creates temporary download URLs and downloads the generated file."
    },
    telugu: "Reports and tracking dashboards. System activity logs DataTable expandableRows component display targets. Excel download process logic: Axios responseType key block 'blob' values coordinate sets, browser URL download links trigger chestharu.",
    realtime: "Payroll portals generate salary registers, attendance history reports, and activity logs using excel export configurations.",
    interview: [
      "Q: How do you download files from API responses in JavaScript? - A: Configure Axios with 'responseType: blob', convert the response to a Blob object, generate a download URL using window.URL.createObjectURL(), and trigger a download click using a temporary anchor link.",
      "Q: What is the purpose of responseType: 'blob' in Axios? - A: Instructs Axios to receive raw binary data streams (like Excel sheets or PDF files) rather than parsing them as JSON."
    ],
    bestPractices: "Export data asynchronously for large reports to prevent page freezing, display loading indicators during download processing, and clean up generated Blob URLs after downloads finish."
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
