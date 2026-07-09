import React, { useState, useMemo, useEffect } from 'react';
import './PythonBackendPortal.css';
import { PYTHON_BACKEND_DATA } from './PythonBackendData';
import { 
  MdFolder, 
  MdHttp, 
  MdSecurity, 
  MdVpnKey, 
  MdGridOn, 
  MdContentCopy, 
  MdCheck, 
  MdBuild, 
  MdInfoOutline,
  MdPlayCircleOutline,
  MdHelpOutline,
  MdCheckCircle,
  MdCode,
  MdInput,
  MdAutorenew,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdSearch
} from 'react-icons/md';

/* ─── Extended Chapters List (Total 25 Parts) ─── */

const CHAPTERS_LIST = [
  { id: 1, title: "Part 1: Python Introduction", key: "intro" },
  { id: 2, title: "Part 2: Installation & Environment Setup", key: "env" },
  { id: 3, title: "Part 3: Python Basics & Operators", key: "basics" },
  { id: 4, title: "Part 4: Control Flow (if-else, match-case)", key: "control" },
  { id: 5, title: "Part 5: Loops & Iterations", key: "loops" },
  { id: 6, title: "Part 6: Functions & Coroutines", key: "funcs" },
  { id: 7, title: "Part 7: Collections & Data Structures", key: "collections" },
  { id: 8, title: "Part 8: Object Oriented Programming", key: "oop" },
  { id: 9, title: "Part 9: Exception Handling", key: "exceptions" },
  { id: 10, title: "Part 10: Modules & Packages", key: "modules" },
  { id: 11, title: "Part 11: File Handling & Logging", key: "files" },
  { id: 12, title: "Part 12: Advanced Python & Multithreading", key: "advanced" },
  { id: 13, title: "Part 13: Database & SQL Core", key: "database" },
  { id: 14, title: "Part 14: SQLAlchemy ORM Integration", key: "sqlalchemy" },
  { id: 15, title: "Part 15: FastAPI Web Framework", key: "fastapi" },
  { id: 16, title: "Part 16: REST API Design & Standards", key: "rest" },
  { id: 17, title: "Part 17: Authentication & RBAC Security", key: "security" },
  { id: 18, title: "Part 18: Enterprise Project Architecture", key: "arch" },
  { id: 19, title: "Part 19: Complete HRMS Backend Project", key: "hrms_proj" },
  { id: 20, title: "Part 20: Cloud Deployment & Docker", key: "deployment" },
  { id: 21, title: "Part 21: Pytest Unit Testing", key: "testing" },
  { id: 22, title: "Part 22: Real-Time Backend Problems", key: "problems" },
  { id: 23, title: "Part 23: System Design & Scaling", key: "sysdesign" },
  { id: 24, title: "Part 24: Mini Enterprise Projects", key: "mini" },
  { id: 25, title: "Part 25: Interview Prep & FAQ", key: "interview" }
];

/* ─── Syntax Highlighter Helper ─── */

function highlightPythonCode(code) {
  if (!code) return '';
  
  // Escape HTML characters
  let tokenized = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];

  // 1. Extract Comments (# or docstrings) -> Green
  tokenized = tokenized.replace(/(#[^\n]*|"""[\s\S]*?"""|'''[\s\S]*?''')/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${match}</span>` });
    return id;
  });

  // 2. Extract Strings (single, double quotes) -> Orange/Brown
  tokenized = tokenized.replace(/(["'])([\s\S]*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${match}</span>` });
    return id;
  });

  // 3. Highlight Keywords (Blue #569cd6)
  const keywords = [
    'def', 'class', 'return', 'import', 'from', 'as', 'async', 'await', 'try', 'except',
    'finally', 'else', 'elif', 'if', 'for', 'while', 'break', 'continue', 'pass', 'yield',
    'lambda', 'in', 'is', 'not', 'and', 'or', 'raise', 'with', 'match', 'case'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: 600;">${kw}</span>`);
  });

  // 4. Highlight Python Built-ins & decorators (Teal #4ec9b0)
  const builtins = [
    'print', 'len', 'range', 'zip', 'enumerate', 'dict', 'list', 'set', 'tuple', 'int',
    'float', 'str', 'bool', 'BaseModel', 'Field', 'FastAPI', 'Depends', 'HTTPException',
    'classmethod', 'staticmethod', 'property', 'Exception', 'ValueError', 'TypeError', 'list_all_leaves'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 5. Highlight Function Invocations (Yellow #dcdcaa)
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // 6. Highlight Numbers (Light Green #b5cea8)
  tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

export default function PythonBackendPortal() {
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [selectedTopicId, setSelectedTopicId] = useState("intro-what");
  const [lang, setLang] = useState("en");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("completed_python_topics");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync completion state to local storage
  useEffect(() => {
    localStorage.setItem("completed_python_topics", JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId, e) => {
    e.stopPropagation();
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Find all active topics in loaded data
  const loadedTopicsMap = useMemo(() => {
    const map = {};
    PYTHON_BACKEND_DATA.forEach(chap => {
      chap.topics.forEach(top => {
        map[top.id] = { ...top, chapterId: chap.id };
      });
    });
    return map;
  }, []);

  // Handle Dynamic Topic Retrieval
  const activeTopic = useMemo(() => {
    if (loadedTopicsMap[selectedTopicId]) {
      return loadedTopicsMap[selectedTopicId];
    }
    
    // Auto-generate placeholder contents for not-yet-loaded curriculum topics
    const targetChap = CHAPTERS_LIST.find(c => c.id === expandedChapter) || CHAPTERS_LIST[0];
    return {
      id: selectedTopicId,
      name: selectedTopicId.replace(/-/g, ' ').toUpperCase(),
      description: `Comprehensive guide to ${targetChap.title} parameters and engineering standards.`,
      what: `${targetChap.title} is a core foundation of Python Backend API development, defining structured workflows and performance frameworks.`,
      why: "We use this architectural layer to manage data models, enforce security, scale network endpoints, and optimize system resource allocation.",
      when: "Deploy this coding standard anytime you are writing scalable services, building microservice tasks, or configuring database relationships.",
      internal: "Python compiles source modules and executes them within the Python Virtual Machine (PVM). Data operations are managed asynchronously using event loops or concurrent thread workers.",
      syntax: `# Standard Enterprise Template
def execute_backend_logic(payload: dict) -> dict:
    # Business logic goes here
    return {"status": "success", "processed_data": payload}`,
      flowDiagram: `+-----------------------------------------+
|             Client Request              |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|           FastAPI / Web Router          |
+-----------------------------------------+
                     |
                     v
+-----------------------------------------+
|           Database / ORM layer          |
+-----------------------------------------+`,
      english: "This module ensures that developers build reliable backend services that adhere to industrial PEP and clean architecture design principles.",
      telugu: "Ee backend module scale-up configurations, robust systems build cheyyadaniki, business logic control flows design cheyyadaniki chala clear specifications standard protocols and parameters provide chesthundi.",
      analogy: "Think of this like building a high-speed train track. The rails (folder architecture, config files) must be laid out perfectly before the train (web traffic, data requests) can run at full speed.",
      hrms: "In an HRMS, this setup defines how user authentication credentials, payroll records, and attendance data models are mapped to the database.",
      payroll: "In Payroll, this handles calculated values for taxes, PF limits, and pay-scale bracket validations.",
      beginner: "Start by writing simple files and variables, making sure your packages and env setups are clean before handling database integration.",
      advanced: "Advanced systems use concurrency (asyncio), connection pooling, custom authentication middleware, and robust containerized deployments.",
      code: `import asyncio

async def main():
    print("Initiating enterprise service...")
    await asyncio.sleep(1)
    print("System active and running.")

asyncio.run(main())`,
      codeFilename: "main_service.py",
      bestPractices: [
        "Use type annotations on all parameters and return types.",
        "Always separate production secrets from code files using env files.",
        "Write unit tests (pytest) to cover all edge cases and error bounds."
      ],
      commonMistakes: [
        "Ignoring clean folder architecture, mixing databases and controllers.",
        "Failing to handle database transaction rollbacks during write exceptions.",
        "Using hardcoded configuration strings across different services."
      ],
      performanceTips: [
        "Implement Redis caching layer for slow read queries.",
        "Use async databases libraries to handle non-blocking concurrent calls.",
        "Keep virtual environment clean of unused dependencies to speed up deployment builds."
      ],
      interviews: [
        {
          q: "How does SQLAlchemy handle session connections?",
          a: "SQLAlchemy uses a Session object which represents a transactional context. We yield the session in dependency injection and commit it when the transaction succeeds, or roll it back on exceptions."
        }
      ],
      challenge: {
        desc: "Implement a validated search endpoint structure with proper return models.",
        reqs: ["Type annotations are required.", "Handle validation exceptions cleanly."]
      },
      miniProject: {
        desc: "Mini REST Employee Directory Service",
        steps: [
          "Configure standard routers.",
          "Write Pydantic schema schemas.",
          "Implement basic database repository calls."
        ]
      },
      summary: "Understanding these engineering standards prepares backend developers to build, test, and deploy clean, maintainable, and highly concurrent web services."
    };
  }, [selectedTopicId, loadedTopicsMap, expandedChapter]);

  // Handle Search Filtering
  const filteredChapters = useMemo(() => {
    if (!searchQuery) return CHAPTERS_LIST;
    
    // Check if search matches chapter titles or topic names
    return CHAPTERS_LIST.filter(c => {
      const matchTitle = c.title.toLowerCase().includes(searchQuery.toLowerCase());
      const hasMatchingLoadedTopic = (loadedTopicsMap && Object.values(loadedTopicsMap).some(t => 
        t.chapterId === c.id && t.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      return matchTitle || hasMatchingLoadedTopic;
    });
  }, [searchQuery, loadedTopicsMap]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTopicListForChapter = (chapterId) => {
    // Check if we have loaded topics for this chapter in DB
    const loaded = PYTHON_BACKEND_DATA.find(c => c.id === chapterId);
    if (loaded) {
      return loaded.topics;
    }
    
    // Otherwise fallback to generating standard curriculum topics dynamically
    switch (chapterId) {
      case 3:
        return [
          { id: "basics-vars", name: "Variables & Data Types" },
          { id: "basics-casting", name: "Type Casting & Inputs" },
          { id: "basics-ops", name: "Python Operators (7 types)" }
        ];
      case 4:
        return [
          { id: "cf-if", name: "If, Elif & Else Conditions" },
          { id: "cf-nested", name: "Nested Conditions" },
          { id: "cf-match", name: "Match-Case Statements" }
        ];
      case 5:
        return [
          { id: "loops-for", name: "For Loops & Sequences" },
          { id: "loops-while", name: "While Loops & Iterators" },
          { id: "loops-helpers", name: "Range, Zip & Enumerate" }
        ];
      case 6:
        return [
          { id: "func-basics", name: "Function Signatures & Args" },
          { id: "func-kwargs", name: "args & kwargs packing" },
          { id: "func-lambda", name: "Lambda & Decorators" }
        ];
      case 7:
        return [
          { id: "coll-lists", name: "List Operations" },
          { id: "coll-tuples", name: "Tuple Configurations" },
          { id: "coll-dicts", name: "Dictionaries & Sets" }
        ];
      case 8:
        return [
          { id: "oop-classes", name: "Classes & Constructors" },
          { id: "oop-inherit", name: "Inheritance & Encapsulation" },
          { id: "oop-poly", name: "Polymorphism & ABCs" }
        ];
      case 9:
        return [
          { id: "exc-try", name: "Try, Except & Finally" },
          { id: "exc-custom", name: "Creating Custom Exceptions" }
        ];
      case 10:
        return [
          { id: "mod-imports", name: "Imports & __init__.py" },
          { id: "mod-pip", name: "Package Management & pip" }
        ];
      case 11:
        return [
          { id: "file-txt", name: "TXT, CSV & JSON Handling" },
          { id: "file-log", name: "Logging Core Systems" }
        ];
      case 12:
        return [
          { id: "adv-threads", name: "Threading vs Multiprocessing" },
          { id: "adv-asyncio", name: "Asyncio Concurrency" }
        ];
      case 13:
        return [
          { id: "db-sql", name: "SQL Basics & CRUD" },
          { id: "db-joins", name: "Joins & Transactions" }
        ];
      case 14:
        return [
          { id: "orm-models", name: "SQLAlchemy Models" },
          { id: "orm-alembic", name: "Alembic DB Migrations" }
        ];
      case 15:
        return [
          { id: "fast-basics", name: "FastAPI Project Setup" },
          { id: "fast-pydantic", name: "Pydantic Schemas" },
          { id: "fast-dep", name: "Dependency Injection (Depends)" }
        ];
      case 16:
        return [
          { id: "rest-design", name: "REST Core Status Codes" },
          { id: "rest-params", name: "Filtering & Pagination" }
        ];
      case 17:
        return [
          { id: "sec-jwt", name: "JWT Auth & OAuth2" },
          { id: "sec-rbac", name: "Role Based Access (RBAC)" }
        ];
      case 18:
        return [
          { id: "arch-folders", name: "Enterprise Folders Spec" }
        ];
      case 19:
        return [
          { id: "proj-db", name: "HRMS Database Mapping" },
          { id: "proj-apis", name: "Onboarding & Leave APIs" }
        ];
      case 20:
        return [
          { id: "dep-docker", name: "Docker Containerization" },
          { id: "dep-nginx", name: "Nginx & AWS Deployment" }
        ];
      case 21:
        return [
          { id: "test-pytest", name: "Pytest Framework" },
          { id: "test-mock", name: "Mocking Database Queries" }
        ];
      case 22:
        return [
          { id: "prob-otp", name: "Email OTP & Password Reset" },
          { id: "prob-celery", name: "Celery & Redis Caching" }
        ];
      case 23:
        return [
          { id: "sys-micro", name: "Monolith vs Microservices" },
          { id: "sys-scale", name: "Load Balancing & CDNs" }
        ];
      case 24:
        return [
          { id: "mini-crm", name: "E-Commerce Backend" }
        ];
      case 25:
        return [
          { id: "int-python", name: "Top 300 Python Q&A" },
          { id: "int-fastapi", name: "Top 200 FastAPI Q&A" }
        ];
      default:
        return [
          { id: `${chapterId}-1`, name: "Core Fundamentals" },
          { id: `${chapterId}-2`, name: "Advanced Implementations" }
        ];
    }
  };

  const totalLoadedCompleted = Object.keys(completedTopics).filter(k => completedTopics[k]).length;

  return (
    <div className="PythonPortalPage">
      {/* Portal Header */}
      <div className="PythonPortalHeader">
        <div className="PythonHeaderTitle">
          <div className="PythonBadge">Python Backend Roadmap</div>
          <h1>
            <span role="img" aria-label="python">🐍</span>
            Python Backend Masterclass Portal
          </h1>
          <p>Learn core Python, OOP, Databases, FastAPI APIs, Security, and Production Deployment workflows.</p>
        </div>
        <div className="PythonHeaderActions">
          {/* Progress Tracker Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0f9ff', padding: '6px 12px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
            <MdCheckCircle style={{ color: '#0284c7' }} />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0369a1' }}>Progress: {totalLoadedCompleted} Topics Cleared</span>
          </div>
          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MdSearch style={{ position: 'absolute', left: '10px', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder="Search curriculum..."
              className="PythonSearchInput"
              style={{ paddingLeft: '32px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Language Selection */}
          <div className="PythonLangSelector">
            <button 
              className={lang === "en" ? "active" : ""} 
              onClick={() => setLang("en")}
            >
              English
            </button>
            <button 
              className={lang === "te" ? "active" : ""} 
              onClick={() => setLang("te")}
            >
              Telugu
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="PythonPortalLayout">
        
        {/* Navigation Sidebar (25 Chapters) */}
        <div className="PythonSidebar">
          <div className="PythonSidebarTitle">
            <span>Course Chapters</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>25 Chapters</span>
          </div>
          <div className="SidebarButtonsList">
            {filteredChapters.map((chap) => {
              const isExpanded = expandedChapter === chap.id;
              const topicsList = getTopicListForChapter(chap.id);
              
              return (
                <div key={chap.id} className="SidebarChapterGroup">
                  <button 
                    className="ChapterHeaderBtn"
                    onClick={() => setExpandedChapter(isExpanded ? null : chap.id)}
                  >
                    <span>{chap.title}</span>
                    {isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                  </button>
                  
                  {isExpanded && (
                    <div className="ChapterTopicList">
                      {topicsList.map((top) => {
                        const isCompleted = !!completedTopics[top.id];
                        return (
                          <button
                            key={top.id}
                            className={`TopicSelectBtn ${selectedTopicId === top.id ? 'active' : ''}`}
                            onClick={() => setSelectedTopicId(top.id)}
                          >
                            <label className="CheckboxLabel">
                              <input 
                                type="checkbox" 
                                checked={isCompleted}
                                onChange={(e) => toggleTopicCompletion(top.id, e)}
                                className="TopicCheckbox"
                              />
                              <span>{top.name}</span>
                            </label>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="PythonContentArea">
          
          <div className="PythonTopicCard">
            {/* Header of selected topic */}
            <div className="TopicCardHeader">
              <div className="TopicCardTitle">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', marginBottom: '6px' }}>
                  <MdCode />
                  <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Topic Guide</span>
                </div>
                <h2>{activeTopic.name}</h2>
                <p>{activeTopic.description}</p>
              </div>
              {completedTopics[activeTopic.id] && (
                <div className="ProgressStatusBadge">
                  <MdCheck />
                  Completed
                </div>
              )}
            </div>

            {/* Core definitions: What, Why, When, Internal */}
            <div className="SubTopicSection">
              <h3>
                <MdInfoOutline />
                Core Concept Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: '1.6', color: '#334155' }}>
                  <strong>What is it?</strong> {activeTopic.what}
                </p>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: '1.6', color: '#334155' }}>
                  <strong>Why do we use it?</strong> {activeTopic.why}
                </p>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: '1.6', color: '#334155' }}>
                  <strong>When should we use it?</strong> {activeTopic.when}
                </p>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: '1.6', color: '#334155' }}>
                  <strong>How does it work internally?</strong> {activeTopic.internal}
                </p>
              </div>
            </div>

            {/* ASCII Flow Diagram */}
            <div className="SubTopicSection">
              <h3>
                <MdAutorenew />
                System Flow Diagram
              </h3>
              <div className="AsciiDiagramContainer">
                <pre className="AsciiDiagram">{activeTopic.flowDiagram}</pre>
              </div>
            </div>

            {/* Double-column description (English vs Telugu) */}
            <div className="SubTopicSection">
              <h3>
                <MdPlayCircleOutline />
                Concept Explanations
              </h3>
              <div className="DualColumnExplanation">
                <div className="ExplanationColumn">
                  <h4>English Explanation</h4>
                  <p>{activeTopic.english}</p>
                </div>
                <div className="ExplanationColumn telugu">
                  <h4>Telugu Explanation (Tanglish)</h4>
                  <p>{activeTopic.telugu}</p>
                </div>
              </div>
            </div>

            {/* Analogies and Case Studies */}
            <div className="SubTopicSection">
              <h3>
                <MdInfoOutline />
                Real-Time Case Studies & Analogies
              </h3>
              <div className="AnalogyGrid">
                <div className="AnalogyCard">
                  <h4>Real-Time Analogy</h4>
                  <p>{activeTopic.analogy}</p>
                </div>
                <div className="AnalogyCard">
                  <h4>HRMS Case Study</h4>
                  <p>{activeTopic.hrms}</p>
                </div>
                <div className="AnalogyCard">
                  <h4>Payroll Case Study</h4>
                  <p>{activeTopic.payroll}</p>
                </div>
              </div>
            </div>

            {/* Beginner vs Advanced details */}
            <div className="SubTopicSection">
              <h3>
                <MdHelpOutline />
                Depth Explanations
              </h3>
              <div className="DepthExplanationGrid">
                <div className="DepthCard beginner">
                  <h4>Beginner Explanation</h4>
                  <p>{activeTopic.beginner}</p>
                </div>
                <div className="DepthCard advanced">
                  <h4>Advanced Explanation</h4>
                  <p>{activeTopic.advanced}</p>
                </div>
              </div>
            </div>

            {/* Code Implementation Box */}
            <div className="SubTopicSection">
              <h3>
                <MdCode />
                Code Implementation
              </h3>
              <div className="PythonCodeContainer">
                <div className="PythonCodeHeader">
                  <span className="PythonCodeFilename">{activeTopic.codeFilename}</span>
                  <button 
                    className="PythonCopyBtn"
                    onClick={() => handleCopy(activeTopic.code)}
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
                <pre className="PythonCodeBox">
                  <code dangerouslySetInnerHTML={{ __html: highlightPythonCode(activeTopic.code) }} />
                </pre>
              </div>
            </div>

            {/* Engineering guidelines & Best practices */}
            <div className="SubTopicSection">
              <h3>
                <MdBuild />
                Engineering Best Practices
              </h3>
              <div className="BestPracticesGrid">
                <div className="BestPracticesCard success">
                  <h4>Best Practices</h4>
                  <ul>
                    {activeTopic.bestPractices.map((bp, i) => <li key={i}>{bp}</li>)}
                  </ul>
                </div>
                <div className="BestPracticesCard danger">
                  <h4>Common Mistakes</h4>
                  <ul>
                    {activeTopic.commonMistakes.map((cm, i) => <li key={i}>{cm}</li>)}
                  </ul>
                </div>
                <div className="BestPracticesCard warning">
                  <h4>Performance Tips</h4>
                  <ul>
                    {activeTopic.performanceTips.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Prep FAQ */}
            <div className="SubTopicSection">
              <h3>
                <MdHelpOutline />
                Technical Interview Q&A
              </h3>
              <div className="InterviewList">
                {activeTopic.interviews.map((item, index) => (
                  <div key={index} className="InterviewItem">
                    <strong>Q: {item.q}</strong>
                    <p><strong>A:</strong> {item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding Challenge & Projects */}
            <div className="SubTopicSection">
              <h3>
                <MdInput />
                Practice & Assessment
              </h3>
              <div className="PracticeGrid">
                <div className="PracticeCard">
                  <h4>Coding Challenge</h4>
                  <p>{activeTopic.challenge.desc}</p>
                  <h5>Requirements:</h5>
                  <ul>
                    {activeTopic.challenge.reqs.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
                <div className="PracticeCard">
                  <h4>Mini Project</h4>
                  <p>{activeTopic.miniProject.desc}</p>
                  <h5>Implementation Steps:</h5>
                  <ul>
                    {activeTopic.miniProject.steps.map((st, i) => <li key={i}>{st}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Topic Summary */}
            <div className="SubTopicSection">
              <div className="SummaryBox">
                <p><strong>Summary:</strong> {activeTopic.summary}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
