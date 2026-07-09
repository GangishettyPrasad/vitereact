import React, { useState, useMemo, useEffect } from 'react';
import './DjangoSqlBasicsToAdvance.css';
import { DJANGO_SQL_TELUGU_DATA } from './djangoSqlTeluguData';
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

function highlightSqlOrPython(code, filename) {
  if (!code) return '';
  
  let tokenized = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];

  if (filename && filename.endsWith('.sql')) {
    // 1. Extract Comments (--) -> Green
    tokenized = tokenized.replace(/(--[^\n]*)/g, (match) => {
      const id = `___COMMENT_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${match}</span>` });
      return id;
    });

    // 2. Extract Strings
    tokenized = tokenized.replace(/(['"])([\s\S]*?)\1/g, (match) => {
      const id = `___STRING_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #ce9178;">${match}</span>` });
      return id;
    });

    // 3. Highlight SQL Keywords (Pink/Purple #c586c0)
    const sqlKeywords = [
      'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
      'CREATE', 'TABLE', 'INT', 'PRIMARY', 'KEY', 'VARCHAR', 'INNER', 'LEFT', 'RIGHT', 'JOIN',
      'ON', 'BEGIN', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'INDEX', 'COUNT', 'AVG', 'GROUP',
      'BY', 'HAVING'
    ];
    sqlKeywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'g');
      tokenized = tokenized.replace(regex, `<span style="color: #c586c0; font-weight: bold;">${kw}</span>`);
    });
  } else {
    // 1. Extract Comments (#) -> Green
    tokenized = tokenized.replace(/(#[^\n]*)/g, (match) => {
      const id = `___COMMENT_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${match}</span>` });
      return id;
    });

    // 2. Extract Strings
    tokenized = tokenized.replace(/(["'])([\s\S]*?)\1/g, (match) => {
      const id = `___STRING_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #ce9178;">${match}</span>` });
      return id;
    });

    // 3. Highlight Python Keywords (Blue #569cd6)
    const keywords = [
      'def', 'class', 'return', 'import', 'from', 'as', 'async', 'await', 'try', 'except',
      'finally', 'else', 'elif', 'if', 'for', 'while', 'break', 'continue', 'pass', 'yield',
      'lambda', 'in', 'is', 'not', 'and', 'or', 'raise', 'with'
    ];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'g');
      tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: 600;">${kw}</span>`);
    });

    // 4. Highlight Python/Django Built-ins & Classes (Teal #4ec9b0)
    const builtins = [
      'print', 'len', 'range', 'zip', 'enumerate', 'dict', 'list', 'set', 'tuple', 'int',
      'float', 'str', 'bool', 'classmethod', 'staticmethod', 'property', 'Exception',
      'models', 'View', 'JsonResponse', 'serializers', 'viewsets', 'APIView', 'Response',
      'BasePermission', 'IsAuthenticated', 'ForeignKey', 'CASCADE', 'objects', 'all', 'filter'
    ];
    builtins.forEach(item => {
      const regex = new RegExp(`\\b${item}\\b`, 'g');
      tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
    });

    // 5. Highlight Function Invocations (Yellow #dcdcaa)
    tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

    // 6. Highlight Numbers (Light Green #b5cea8)
    tokenized = tokenized.replace(/\b(\d+)\b/g, '<span style="color: #b5cea8;">$1</span>');
  }

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

export default function DjangoSqlBasicsToAdvance() {
  const [activeTopicId, setActiveTopicId] = useState("sql-crud");
  const [difficulty, setDifficulty] = useState("low"); // "low" | "medium" | "high"
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("completed_django_sql_telugu");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync completion states
  useEffect(() => {
    localStorage.setItem("completed_django_sql_telugu", JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId, e) => {
    e.stopPropagation();
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const activeTopic = useMemo(() => {
    return DJANGO_SQL_TELUGU_DATA.find(t => t.id === activeTopicId) || DJANGO_SQL_TELUGU_DATA[0];
  }, [activeTopicId]);

  const activeExample = useMemo(() => {
    if (activeTopic.examples && activeTopic.examples[difficulty]) {
      return activeTopic.examples[difficulty];
    }
    return {
      prereq: "None",
      code: "# No code.",
      filename: "main.py",
      explanation: ["No details."]
    };
  }, [activeTopic, difficulty]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCompleted = Object.keys(completedTopics).filter(k => completedTopics[k]).length;

  return (
    <div className="DjangoSqlPage">
      {/* Header */}
      <div className="DjangoSqlHeader">
        <div className="DjangoSqlTitle">
          <div className="DjangoSqlBadge">Telugu Tutorial</div>
          <h1>Django & SQL Basics to Advance (సులభమైన తెలుగులో)</h1>
          <p>Database queries commands, SQL Joins, Django views ORM, REST API serializers frameworks explained in spoken Telugu.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', padding: '8px 14px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
          <MdCheckCircle style={{ color: '#166534' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#166534' }}>Progress: {totalCompleted} / {DJANGO_SQL_TELUGU_DATA.length} Completed</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="DjangoSqlLayout">
        
        {/* Sidebar */}
        <div className="DjangoSqlSidebar">
          <span className="SidebarHeaderSpan">Chapters List</span>
          <div className="DjangoSidebarList">
            {DJANGO_SQL_TELUGU_DATA.map((t, index) => {
              const isCompleted = !!completedTopics[t.id];
              return (
                <button
                  key={t.id}
                  className={`DjangoSidebarBtn ${activeTopicId === t.id ? 'active' : ''}`}
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
                  <div className="DjangoSidebarNum">{index + 1}</div>
                  <span style={{ fontSize: '13px' }}>{t.title.split('(')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="DjangoSqlContent">
          
          <div className="DjangoTopicCard">
            {/* Title & Desc */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0c4a6e', marginBottom: '6px' }}>
                <MdPlayCircleOutline />
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spoken Telugu Chapter</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0c4a6e', margin: '0 0 4px' }}>{activeTopic.title}</h2>
              <p style={{ color: '#475569', fontSize: '14.5px', margin: 0 }}>{activeTopic.description}</p>
            </div>

            {/* Core Telugu Explanation */}
            <div className="DjangoSection">
              <div className="DjangoExplanationBox">
                <h4>
                  <span role="img" aria-label="bulb">💡</span>
                  సులభమైన తెలుగు వివరణ (Concept Telugu Explanation)
                </h4>
                <p>{activeTopic.telugu}</p>
              </div>
            </div>

            {/* Concept Details (What, Why, How, Rules, Where) */}
            <div className="DjangoSection">
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

            {/* Difficulty Selector */}
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
              
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                <strong>What you need to know first (ముందుగా కావాల్సినవి):</strong> {activeExample.prereq}
              </div>
            </div>

            {/* Grid for flowchart and code */}
            <div className="DjangoGridTwo">
              
              {/* Left Column: Flowchart */}
              <div>
                <div className="DjangoSection">
                  <h3>
                    <MdAutorenew />
                    System Architecture Flow (ఫ్లోచార్ట్)
                  </h3>
                  <div className="DjangoImageCard">
                    <div 
                      className="DjangoImageWrapper"
                      onClick={() => setLightboxOpen(true)}
                      title="Click to zoom diagram"
                    >
                      <img 
                        src={activeTopic.imageUrl} 
                        alt="Database SQL Django Flow" 
                        className="DjangoImage"
                      />
                      <span className="DjangoZoomBadge">🔍 View Large Diagram</span>
                    </div>
                    <div className="DjangoCaption">
                      Figure: Django and database data routing lifecycle flow.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Code block & line-by-line Telugu explanation */}
              <div>
                <div className="DjangoSection">
                  <h3>
                    <MdCode />
                    Code / Query Example (కోడ్ / క్వెరీ ఉదాహరణ)
                  </h3>
                  <div className="DjangoCodeContainer">
                    <div className="DjangoCodeHeader">
                      <span className="DjangoCodeFilename">{activeExample.filename}</span>
                      <button 
                        className="DjangoCopyBtn"
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
                    <pre className="DjangoCodeBox">
                      <code dangerouslySetInnerHTML={{ __html: highlightSqlOrPython(activeExample.code, activeExample.filename) }} />
                    </pre>
                  </div>
                </div>

                <div className="DjangoSection">
                  <h3>
                    <MdInfoOutline />
                    Line-by-Line Explanation (లైన్-బై-లైన్ వివరణ)
                  </h3>
                  <ul className="DjangoPointsList" style={{ paddingLeft: '16px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
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

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="DjangoLightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="DjangoLightboxContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="DjangoLightboxClose"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <img 
              src={activeTopic.imageUrl} 
              alt="Database SQL Django Flow Expanded" 
              className="DjangoLightboxImage"
            />
          </div>
        </div>
      )}

    </div>
  );
}
