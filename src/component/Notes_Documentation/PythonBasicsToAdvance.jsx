import React, { useState, useMemo, useEffect } from 'react';
import './PythonBasicsToAdvance.css';
import { PYTHON_TELUGU_DATA } from './pythonTeluguData';
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
  MdAutorenew
} from 'react-icons/md';

/* ─── Syntax Highlighter Helper ─── */

function highlightPythonCode(code) {
  if (!code) return '';
  
  // Escape HTML characters
  let tokenized = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];

  // 1. Extract Comments (#) -> Green
  tokenized = tokenized.replace(/(#[^\n]*)/g, (match) => {
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
    'float', 'str', 'bool', 'classmethod', 'staticmethod', 'property', 'Exception',
    'ZeroDivisionError', 'KeyError', 'ValueError', 'FileNotFoundError', 'BaseModel', 'FastAPI', 'Depends', 'HTTPException'
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

export default function PythonBasicsToAdvance() {
  const [activeTopicId, setActiveTopicId] = useState("intro");
  const [difficulty, setDifficulty] = useState("low"); // "low" | "medium" | "high"
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("completed_python_telugu");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync completion states
  useEffect(() => {
    localStorage.setItem("completed_python_telugu", JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId, e) => {
    e.stopPropagation();
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const activeTopic = useMemo(() => {
    return PYTHON_TELUGU_DATA.find(t => t.id === activeTopicId) || PYTHON_TELUGU_DATA[0];
  }, [activeTopicId]);

  // Retrieve current active example based on difficulty selection
  const activeExample = useMemo(() => {
    if (activeTopic.examples && activeTopic.examples[difficulty]) {
      return activeTopic.examples[difficulty];
    }
    return {
      prereq: "None",
      code: "# No code loaded.",
      filename: "main.py",
      explanation: ["No explanation available."]
    };
  }, [activeTopic, difficulty]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCompleted = Object.keys(completedTopics).filter(k => completedTopics[k]).length;

  return (
    <div className="PythonTeluguPage">
      {/* Header */}
      <div className="PythonTeluguHeader">
        <div className="PythonTeluguTitle">
          <div className="PythonTeluguBadge">Telugu Tutorial</div>
          <h1>Python Basics to Advance (సులభమైన తెలుగులో)</h1>
          <p>Absolute beginner nundi advanced levels programing variables, algorithms, functions code files in spoken Telugu.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', padding: '8px 14px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
          <MdCheckCircle style={{ color: '#166534' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#166534' }}>Progress: {totalCompleted} / {PYTHON_TELUGU_DATA.length} Completed</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="PythonTeluguLayout">
        
        {/* Sidebar */}
        <div className="PythonTeluguSidebar">
          <span className="SidebarHeaderSpan">Python Chapters</span>
          <div className="TeluguSidebarList">
            {PYTHON_TELUGU_DATA.map((t, index) => {
              const isCompleted = !!completedTopics[t.id];
              return (
                <button
                  key={t.id}
                  className={`TeluguSidebarBtn ${activeTopicId === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTopicId(t.id);
                    setCopied(false);
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => toggleTopicCompletion(t.id, e)}
                    style={{ accentColor: '#2f80c5', cursor: 'pointer' }}
                  />
                  <div className="TeluguSidebarNum">{index + 1}</div>
                  <span style={{ fontSize: '13px' }}>{t.title.split('(')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="PythonTeluguContent">
          
          <div className="TeluguTopicCard">
            {/* Title & Desc */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0c4a6e', marginBottom: '6px' }}>
                <MdPlayCircleOutline />
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Telugu Chapter</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0c4a6e', margin: '0 0 4px' }}>{activeTopic.title}</h2>
              <p style={{ color: '#475569', fontSize: '14.5px', margin: 0 }}>{activeTopic.description}</p>
            </div>

            {/* Core Telugu Explanation block */}
            <div className="TeluguSection">
              <div className="TeluguExplanationBox">
                <h4>
                  <span role="img" aria-label="bulb">💡</span>
                  సులభమైన తెలుగు వివరణ (Telugu Concept Explanation)
                </h4>
                <p>{activeTopic.telugu}</p>
              </div>
            </div>

            {/* Beginner-friendly split details: What, Why, How, Rules, Where */}
            <div className="TeluguSection">
              <h3>
                <MdInfoOutline />
                Concept Details (కాన్సెప్ట్ వివరాలు)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>వాట్ (What is it?):</strong> {activeTopic.what}
                </p>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>వై (Why we use it?):</strong> {activeTopic.why}
                </p>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>హౌ (How to use it?):</strong> {activeTopic.how}
                </p>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>రూల్స్ (Rules of usage):</strong> {activeTopic.rules}
                </p>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>వేర్ (Where we use it in real life):</strong> {activeTopic.where}
                </p>
              </div>
            </div>

            {/* Code Difficulty Selection Tab Header */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                  Examples by Difficulty (ఉదాహరణ స్థాయి):
                </span>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => { setDifficulty("low"); setCopied(false); }}
                    style={{ 
                      padding: '6px 12px', borderRadius: '6px', border: '1px solid', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                      background: difficulty === 'low' ? '#dcfce7' : '#ffffff',
                      borderColor: difficulty === 'low' ? '#86efac' : '#cbd5e1',
                      color: difficulty === 'low' ? '#166534' : '#64748b'
                    }}
                  >
                    🟢 Low (Beginner)
                  </button>
                  <button 
                    onClick={() => { setDifficulty("medium"); setCopied(false); }}
                    style={{ 
                      padding: '6px 12px', borderRadius: '6px', border: '1px solid', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                      background: difficulty === 'medium' ? '#ffedd5' : '#ffffff',
                      borderColor: difficulty === 'medium' ? '#fdbb2d' : '#cbd5e1',
                      color: difficulty === 'medium' ? '#9a3412' : '#64748b'
                    }}
                  >
                    🟡 Medium (Intermediate)
                  </button>
                  <button 
                    onClick={() => { setDifficulty("high"); setCopied(false); }}
                    style={{ 
                      padding: '6px 12px', borderRadius: '6px', border: '1px solid', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                      background: difficulty === 'high' ? '#fee2e2' : '#ffffff',
                      borderColor: difficulty === 'high' ? '#fca5a5' : '#cbd5e1',
                      color: difficulty === 'high' ? '#991b1b' : '#64748b'
                    }}
                  >
                    🔴 High (Advanced)
                  </button>
                </div>
              </div>
              
              {/* Prerequisites description box */}
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                <strong>What you need to know first (ముందుగా కావాల్సినవి):</strong> {activeExample.prereq}
              </div>
            </div>

            {/* Grid for key points and code */}
            <div className="TeluguGridTwo">
              
              {/* Left Column: Flowchart & Info */}
              <div>
                <div className="TeluguSection">
                  <h3>
                    <MdAutorenew />
                    Program Flow (ఫ్లోచార్ట్)
                  </h3>
                  <div className="TeluguImageCard">
                    <div 
                      className="TeluguImageWrapper"
                      onClick={() => setLightboxOpen(true)}
                      title="Click to zoom flowchart"
                    >
                      <img 
                        src={activeTopic.imageUrl} 
                        alt="Beginner Python Flow" 
                        className="TeluguImage"
                      />
                      <span className="TeluguZoomBadge">🔍 View Large Flowchart</span>
                    </div>
                    <div className="TeluguCaption">
                      Figure: Program execution lifecycle diagram.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Code block & Line-by-line Telugu explanation */}
              <div>
                <div className="TeluguSection">
                  <h3>
                    <MdCode />
                    Code Example (కోడ్ ఉదాహరణ)
                  </h3>
                  <div className="TeluguCodeContainer">
                    <div className="TeluguCodeHeader">
                      <span className="TeluguCodeFilename">{activeExample.filename}</span>
                      <button 
                        className="TeluguCopyBtn"
                        onClick={() => handleCopy(activeExample.code)}
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
                    <pre className="TeluguCodeBox">
                      <code dangerouslySetInnerHTML={{ __html: highlightPythonCode(activeExample.code) }} />
                    </pre>
                  </div>
                </div>

                <div className="TeluguSection">
                  <h3>
                    <MdInfoOutline />
                    Line-by-Line Explanation (లైన్-బై-లైన్ వివరణ)
                  </h3>
                  <ul className="TeluguPointsList" style={{ paddingLeft: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    {activeExample.explanation.map((exp, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', color: '#475569', marginBottom: '6px' }}>{exp}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Flowchart Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="TeluguLightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="TeluguLightboxContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="TeluguLightboxClose"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <img 
              src={activeTopic.imageUrl} 
              alt="Beginner Python Flow Expanded" 
              className="TeluguLightboxImage"
            />
          </div>
        </div>
      )}

    </div>
  );
}
