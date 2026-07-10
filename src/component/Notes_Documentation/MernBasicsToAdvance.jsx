import React, { useState, useMemo, useEffect } from 'react';
import './MernBasicsToAdvance.css';
import { MERN_TELUGU_DATA } from './mernTeluguData';
import { 
  MdFolder, 
  MdHttp, 
  MdSecurity, 
  MdVpnKey, 
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
  MdSearch,
  MdZoomIn
} from 'react-icons/md';

/* ─── Syntax Highlighter for JS/SQL/Shell ─── */
function highlightCode(code, filename = '') {
  if (!code) return '';
  let tokenized = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  
  // 1. Comments -> Green
  tokenized = tokenized.replace(/(\/\/.*|#.*)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${match}</span>` });
    return id;
  });

  // 2. Strings -> Orange/Brown
  tokenized = tokenized.replace(/(["'])([\s\S]*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${match}</span>` });
    return id;
  });

  // 3. Keywords -> Blue
  const keywords = [
    'const', 'let', 'var', 'require', 'import', 'from', 'export', 'default', 'async', 'await',
    'function', 'return', 'if', 'else', 'try', 'catch', 'throw', 'new', 'class', 'use', 'get', 'post', 'listen'
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #569cd6; font-weight: 600;">${kw}</span>`);
  });

  // 4. Built-ins -> Teal
  const builtins = [
    'http', 'fs', 'express', 'mongoose', 'jwt', 'bcrypt', 'console', 'log', 'error', 'req', 'res', 'next', 'app',
    'Schema', 'model', 'connect', 'sign', 'verify'
  ];
  builtins.forEach(item => {
    const regex = new RegExp(`\\b${item}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #4ec9b0;">${item}</span>`);
  });

  // 5. Functions -> Yellow
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

export default function MernBasicsToAdvance() {
  const [selectedTopicId, setSelectedTopicId] = useState(MERN_TELUGU_DATA[0].id);
  const [lang, setLang] = useState("te"); // Default to Telugu (Tanglish) as requested
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("low"); // 'low' | 'medium' | 'high'
  const [zoomImage, setZoomImage] = useState(null);
  
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("completed_mern_topics");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync completion states
  useEffect(() => {
    localStorage.setItem("completed_mern_topics", JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Find active topic details
  const activeTopic = useMemo(() => {
    return MERN_TELUGU_DATA.find(t => t.id === selectedTopicId) || MERN_TELUGU_DATA[0];
  }, [selectedTopicId]);

  // Handle Search filter
  const filteredTopics = useMemo(() => {
    return MERN_TELUGU_DATA.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeExample = activeTopic.examples[difficulty];

  return (
    <div className="MernPageLayout">
      {/* Portal Header */}
      <div className="MernHeaderCard">
        <div className="MernHeaderContent">
          <div className="MernTechBadge">MERN Stack Roadmap</div>
          <h1>
            <span role="img" aria-label="mern">🚀</span>
            {lang === 'te' ? 'మర్న్ స్టాక్ (MERN) కంప్లీట్ గైడ్' : 'MERN Stack Complete Tutorial Guide'}
          </h1>
          <p>
            {lang === 'te'
              ? 'NodeJS, ExpressJS, MongoDB, Mongoose, JWT సెక్యూరిటీ మరియు ప్రొడక్షన్ డిప్లాయ్మెంట్స్ తెలుగు వివరణలతో నేర్చుకోండి.'
              : 'Learn NodeJS, ExpressJS, MongoDB schemas, JSON Web Tokens security, PM2 daemon, and production server host setups.'}
          </p>
        </div>
        <div className="MernHeaderActions">
          <div className="MernProgressBadge">
            <MdCheckCircle />
            <span>
              {lang === 'te' 
                ? `ప్రోగ్రెస్: ${Object.values(completedTopics).filter(Boolean).length} టాపిక్స్ కంప్లీట్`
                : `Progress: ${Object.values(completedTopics).filter(Boolean).length} Cleared`}
            </span>
          </div>
          
          <div className="MernSearchBox">
            <MdSearch />
            <input 
              type="text" 
              placeholder={lang === 'te' ? 'టాపిక్స్ శోధించండి...' : 'Search tutorials...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="MernLanguageSelector">
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
              Telugu (Tanglish)
            </button>
          </div>
        </div>
      </div>

      <div className="MernBodyGrid">
        {/* Sidebar */}
        <div className="MernSidebar">
          <div className="MernSidebarTitle">
            <span>{lang === 'te' ? 'కోర్సు చాప్టర్లు' : 'Course Chapters'}</span>
            <span className="SidebarCounter">{MERN_TELUGU_DATA.length} Topics</span>
          </div>
          <div className="SidebarList">
            {filteredTopics.map((top) => {
              const isCompleted = !!completedTopics[top.id];
              return (
                <button
                  key={top.id}
                  className={`MernSidebarItem ${selectedTopicId === top.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopicId(top.id)}
                >
                  <input 
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={() => toggleTopicCompletion(top.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="MernCheckbox"
                  />
                  <span className="TopicName">{top.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="MernContentArea">
          <div className="MernTopicDetailsCard">
            {/* Header */}
            <div className="MernTopicHeader">
              <div className="TitleWrapper">
                <h2>{activeTopic.title}</h2>
                <p>{activeTopic.description}</p>
              </div>
              <button 
                className={`MarkCompleteBtn ${completedTopics[activeTopic.id] ? 'completed' : ''}`}
                onClick={() => toggleTopicCompletion(activeTopic.id)}
              >
                <MdCheck />
                {completedTopics[activeTopic.id] 
                  ? (lang === 'te' ? 'పూర్తయింది (Done)' : 'Completed') 
                  : (lang === 'te' ? 'పూర్తయినట్లు మార్క్ చేయి' : 'Mark as Complete')}
              </button>
            </div>

            {/* Technical Diagram Section */}
            {activeTopic.imageUrl && (
              <div className="MernFlowchartSection">
                <div className="SectionSubHeader">
                  <MdAutorenew />
                  <span>{lang === 'te' ? 'టెక్నికల్ ఫ్లోచార్ట్ (Architecture Flowchart)' : 'Technical Architecture Flowchart'}</span>
                </div>
                <div className="FlowchartContainer" onClick={() => setZoomImage(activeTopic.imageUrl)}>
                  <img src={activeTopic.imageUrl} alt={activeTopic.title} className="FlowchartImage" />
                  <div className="ZoomHoverOverlay">
                    <MdZoomIn />
                    <span>{lang === 'te' ? 'జూమ్ చేయడానికి క్లిక్ చేయండి' : 'Click to Zoom'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Telugu concept box */}
            <div className="MernTeluguExplanationBox">
              <h4>💡 {lang === 'te' ? 'సులభమైన తెలుగు వివరణ (Telugu Concept Overview)' : 'Telugu Concept Overview'}</h4>
              <p>{activeTopic.telugu}</p>
            </div>

            {/* Core Definitions */}
            <div className="MernDetailsGrid">
              <div className="DetailCard">
                <strong>{lang === 'te' ? 'ఇది ఏమిటి? (What is it?)' : 'What is it?'}</strong>
                <p>{activeTopic.what}</p>
              </div>
              <div className="DetailCard">
                <strong>{lang === 'te' ? 'ఎందుకు ఉపయోగిస్తాము? (Why do we use it?)' : 'Why do we use it?'}</strong>
                <p>{activeTopic.why}</p>
              </div>
              <div className="DetailCard">
                <strong>{lang === 'te' ? 'ఇంటర్నల్ వర్కింగ్ (Internal Working)' : 'Internal Working'}</strong>
                <p>{activeTopic.internal}</p>
              </div>
            </div>

            {/* Real-time case studies */}
            <div className="MernCaseStudiesSection">
              <h3>{lang === 'te' ? 'రియల్-టైమ్ కేస్ స్టడీస్ (Real-Time Applications)' : 'Real-Time Applications & Case Studies'}</h3>
              <div className="CaseStudiesGrid">
                <div className="CaseStudyCard">
                  <h5>🌟 {lang === 'te' ? 'రియల్-టైమ్ ఉదాహరణ' : 'Real-Time Example'}</h5>
                  <p>{activeTopic.realtime}</p>
                </div>
                <div className="CaseStudyCard">
                  <h5>🏢 {lang === 'te' ? 'కంపెనీ ఉదాహరణ' : 'Company Example'}</h5>
                  <p>{activeTopic.company}</p>
                </div>
                <div className="CaseStudyCard">
                  <h5>💻 {lang === 'te' ? 'HRMS ఉదాహరణ' : 'HRMS Example'}</h5>
                  <p>{activeTopic.hrms}</p>
                </div>
              </div>
            </div>

            {/* Folder Structure & API flow */}
            <div className="MernStructureSection">
              <div className="StructureCard">
                <h5>📁 {lang === 'te' ? 'సిఫార్సు చేయబడిన ఫోల్డర్ స్ట్రక్చర్' : 'Recommended Folder Structure'}</h5>
                <pre>{activeTopic.folder}</pre>
              </div>
              <div className="StructureCard">
                <h5>🔄 {lang === 'te' ? 'ఏపీఐ డేటా ఫ్లో (API Data Flow)' : 'API Data Flow Lifecycle'}</h5>
                <pre>{activeTopic.flowDiagram}</pre>
              </div>
            </div>

            {/* Code Implementation Segment */}
            <div className="MernCodeSection">
              <div className="CodeSectionHeader">
                <h3>💻 {lang === 'te' ? 'కోడ్ ఇంప్లిమెంటేషన్ (Code Playground)' : 'Code Implementation'}</h3>
                <div className="DifficultyTabs">
                  <button 
                    className={difficulty === 'low' ? 'active' : ''} 
                    onClick={() => setDifficulty('low')}
                  >
                    🟢 {lang === 'te' ? 'లో లెవెల్' : 'Low Level'}
                  </button>
                  <button 
                    className={difficulty === 'medium' ? 'active' : ''} 
                    onClick={() => setDifficulty('medium')}
                  >
                    🟡 {lang === 'te' ? 'మీడియం' : 'Medium Level'}
                  </button>
                  <button 
                    className={difficulty === 'high' ? 'active' : ''} 
                    onClick={() => setDifficulty('high')}
                  >
                    🔴 {lang === 'te' ? 'అడ్వాన్స్డ్' : 'High Level'}
                  </button>
                </div>
              </div>

              <div className="CodeContainer">
                <div className="CodeHeader">
                  <span className="Filename">{activeExample.filename}</span>
                  <button 
                    className="CopyBtn"
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
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="CodeBlock">
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(activeExample.code, activeExample.filename) }} />
                </pre>
                
                {/* Line-by-line code explanation */}
                <div className="CodeExplanationList">
                  <h5>📝 {lang === 'te' ? 'లైన్-బై-లైన్ వివరణ' : 'Line-by-Line Code Breakdown'}</h5>
                  <ul>
                    {activeExample.explanation.map((exp, i) => <li key={i}>{exp}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Example Solving Section */}
            {activeTopic.solving && (
              <div className="MernSolvingSection" style={{ marginBottom: '28px' }}>
                <h3>🔍 {lang === 'te' ? 'ఉదాహరణల సాధన (Problem Solving)' : 'Real-World Problem Solving'}</h3>
                <div style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '8px', padding: '16px', color: '#115e59' }}>
                  <strong>🚨 {lang === 'te' ? 'సమస్య (Problem):' : 'Problem Statement:'}</strong>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '14px' }}>{activeTopic.solving.problem}</p>
                  <strong>💡 {lang === 'te' ? 'పరిష్కారం (Solution):' : 'Solution Strategy:'}</strong>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '14px' }}>{activeTopic.solving.solution}</p>
                  <strong>🛠️ {lang === 'te' ? 'సాధన కోడ్ (Action Code):' : 'Resolution Code:'}</strong>
                  <pre style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '13px', marginTop: '8px', overflowX: 'auto', fontFamily: 'monospace' }}>
                    <code>{activeTopic.solving.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Assignments Section */}
            {activeTopic.assignments && (
              <div className="MernAssignmentsSection" style={{ marginBottom: '28px' }}>
                <h3>📝 {lang === 'te' ? 'ప్రాక్టీస్ అసైన్‌మెంట్స్ (Hands-on Homework)' : 'Practice Assignments & Exercises'}</h3>
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '8px', padding: '16px', color: '#1e40af' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {activeTopic.assignments.map((asm, i) => (
                      <li key={i} style={{ fontSize: '14px', marginBottom: '8px', lineHeight: '1.5' }}>{asm}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Best practices & Mistakes */}
            <div className="MernGuidelinesSection">
              <h3>🛠️ {lang === 'te' ? 'ఇంజనీరింగ్ గైడ్‌లైన్స్ (Best Practices & Mistakes)' : 'Engineering Best Practices & Guidelines'}</h3>
              <div className="GuidelinesGrid">
                <div className="GuidelineCard success">
                  <h5>✅ Best Practices</h5>
                  <ul>
                    {activeTopic.bestPractices?.map((bp, i) => <li key={i}>{bp}</li>)}
                  </ul>
                </div>
                <div className="GuidelineCard danger">
                  <h5>❌ Common Mistakes</h5>
                  <ul>
                    {activeTopic.commonMistakes?.map((cm, i) => <li key={i}>{cm}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Prep Questions */}
            <div className="MernInterviewsSection">
              <h3>❓ {lang === 'te' ? 'టాప్ టెక్నికల్ ఇంటర్వ్యూ ప్రశ్నలు' : 'Top Technical Interview Questions'}</h3>
              <div className="InterviewItems">
                {activeTopic.interviews?.map((item, idx) => (
                  <div key={idx} className="InterviewQuestionBox">
                    <strong>Q: {item.q}</strong>
                    <p><strong>A:</strong> {item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="MernSummaryCard">
              <p><strong>Summary:</strong> {activeTopic.summary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Portal */}
      {zoomImage && (
        <div className="MernLightbox" onClick={() => setZoomImage(null)}>
          <div className="LightboxImageWrapper">
            <img src={zoomImage} alt="Zoomed Diagram" className="LightboxImage" />
            <button className="CloseLightboxBtn" onClick={() => setZoomImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}
