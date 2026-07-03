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
  FaCss3Alt, 
  FaSlidersH, 
  FaBorderAll, 
  FaMobileAlt 
} from 'react-icons/fa';

// Helper to escape HTML tags for syntax highlighting
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Custom VS-Code style CSS Syntax Highlighter
function highlightCSS(code) {
  if (!code) return '';
  const placeholders = [];
  let tokenized = code;

  // 1. Comments (Green)
  tokenized = tokenized.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 2. Selectors (Yellow-Green)
  tokenized = tokenized.replace(/([a-zA-Z0-9_\-.:,\s]+)(?=\s*\{)/g, (match) => {
    const id = `___SELECTOR_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #d7ba7d; font-weight: bold;">${escapeHtml(match.trim())}</span>` });
    return id;
  });

  // 3. Escape HTML
  tokenized = escapeHtml(tokenized);

  // 4. CSS Rules & Values (Teal / Light Blue)
  tokenized = tokenized.replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span style="color: #9cdcfe;">$1</span>');
  
  // 5. CSS Values (Orange/Teal)
  tokenized = tokenized.replace(/(:\s*)([^;\n]+)(?=;)/g, '$1<span style="color: #ce9178;">$2</span>');

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

const CSS_DATABASE = [
  {
    id: 0,
    title: "1. CSS Box Model & Spacing",
    icon: <FaSlidersH />,
    category: "Baseline Styling",
    introduction: "The CSS Box Model is the structural foundation of webpage layouts. Every HTML element is represented as a rectangular box, consisting of: Content (text/images), Padding (spacing inside borders), Border, and Margin (spacing outside borders).",
    whyNeeded: "Understanding the Box Model is critical to control spacing and sizing. The default behavior calculates element width by adding padding and borders to the base width, which often breaks layouts. Using box-sizing: border-box forces the browser to include padding and borders in the element's total width.",
    whereUsed: "Used on button styles, card elements, input boxes, text paragraphs, and general containers to set margins and padding.",
    companyExample: "Tech portals like Medium and Apple use precise Box Model spacing to maintain structured layouts and clean typography.",
    image: null,
    code: `/* Reset box-sizing globally for predictability */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Styled Card element utilizing Box Model properties */
.employee-card {
    /* 1. Dimensions */
    width: 320px;
    height: auto;

    /* 2. Spacing inside the card boundary */
    padding: 24px;

    /* 3. Card boundary outline */
    border: 1px solid #cbd5e1;
    border-radius: 12px;

    /* 4. Spacing outside the card boundary */
    margin: 20px auto;

    /* 5. Background & shadows styling */
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}`,
    explanation: [
      "box-sizing: border-box: Ensures that padding and borders are included in the element's total width and height, preventing layout breakage.",
      "padding: 24px: Sets the spacing between the card's content and its border to 24px.",
      "border: 1px solid #cbd5e1: Sets a 1px solid gray border around the card.",
      "margin: 20px auto: Sets a 20px margin on the top and bottom, and automatically centers the card horizontally."
    ],
    executionFlow: "Browser parses CSS rules → builds layout tree → calculates box model dimensions: width = content + padding + border → renders element positioning.",
    telugu: "CSS Box Model anedhi web pages lo layout boxes sizing logic set cheyadaniki base framework. Spacing padding (inner boundary spacing) and margin (outer boundary spacing) logic separate chesthundi. `box-sizing: border-box` configure chesi, dynamic size clashes completely blocks chestham."
  },
  {
    id: 1,
    title: "2. Flexbox Layout (1D Axis)",
    icon: <FaCss3Alt />,
    category: "1D Layouts",
    introduction: "Flexbox (Flexible Box Layout) is a one-dimensional layout model. It aligns and distributes elements along a single axis (either horizontally as a row or vertically as a column) dynamically.",
    whyNeeded: "Flexbox simplifies horizontal and vertical centering, distributes spacing between elements automatically, and handles wrapping when elements exceed container widths.",
    whereUsed: "Used for navigation bars, button groups, sidebar menus, card headers, and toolbar elements.",
    companyExample: "Twitter and GitHub use Flexbox to align search bars, user profiles, and layout columns dynamically.",
    image: "/css_flexbox_grid_diagram.png",
    code: `/* Container elements aligned on a single row */
.navbar-container {
    /* 1. Activate Flexbox layout model */
    display: flex;

    /* 2. Set main axis direction (row = horizontal, column = vertical) */
    flex-direction: row;

    /* 3. Align elements along the horizontal main axis */
    justify-content: space-between;

    /* 4. Align elements along the vertical cross axis */
    align-items: center;

    /* 5. Spacing gap between child elements */
    gap: 16px;

    /* Styling parameters */
    padding: 16px 24px;
    background-color: #0f172a;
    color: #ffffff;
}

/* Child element utilizing flexible flex growth */
.search-input-wrapper {
    flex-grow: 1; /* Automatically occupies remaining space */
}`,
    explanation: [
      "display: flex: Activates the Flexbox layout model on the container element.",
      "flex-direction: row: Arranges child elements horizontally in a single row.",
      "justify-content: space-between: Pushes child elements to the outer edges, distributing the remaining space evenly between them.",
      "align-items: center: Centers child elements vertically along the cross axis.",
      "flex-grow: 1: Instructs the element to grow and occupy all remaining space in the container."
    ],
    executionFlow: "Browser initializes flex container → calculates available main-axis space → distributes gaps based on justify-content rules → centers elements vertically along cross axis.",
    telugu: "Flexbox anedhi elements ni single line axis (row or column) lo structure alignments align cheyadaniki use chese layout model. display: flex triggers and justify-content logic items spaces dynamically distribute chesthundhi."
  },
  {
    id: 2,
    title: "3. Grid Layout (2D System)",
    icon: <FaBorderAll />,
    category: "2D Layouts",
    introduction: "CSS Grid is a two-dimensional layout system. Unlike Flexbox, it handles alignment along both rows (horizontal) and columns (vertical) simultaneously, enabling complex grid structures.",
    whyNeeded: "Grid eliminates nested container elements when building complex layouts, enabling clean structures like dashboards, image galleries, and data tables.",
    whereUsed: "Used for dashboard main panels, layouts containing calendars, and complex grids.",
    companyExample: "Pinterest and Netflix use CSS Grid to render responsive card grids and image galleries.",
    image: "/css_flexbox_grid_diagram.png",
    code: `/* Responsive 3-Column Dashboard layout grid */
.dashboard-grid {
    /* 1. Activate two-dimensional grid layout model */
    display: grid;

    /* 2. Define column widths (repeat 3 columns, each sharing 1 fraction) */
    grid-template-columns: repeat(3, 1fr);

    /* 3. Spacing gaps between columns and rows */
    gap: 20px;
}

/* Sidebar spans 1 column, Main Content spans 2 columns */
.sidebar-panel {
    grid-column: span 1;
}

.main-content-panel {
    /* Span across 2 grid column fractions */
    grid-column: span 2;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
}`,
    explanation: [
      "display: grid: Activates the Grid layout model on the container element.",
      "grid-template-columns: repeat(3, 1fr): Sets up 3 equal columns, each taking 1 fraction (1fr) of the available space.",
      "gap: 20px: Sets a 20px spacing gap between rows and columns.",
      "grid-column: span 2: Instructs the item to span across 2 columns of the grid."
    ],
    executionFlow: "Browser defines layout rows and columns → creates grid areas → renders child items in the designated grid areas based on column and row span settings.",
    telugu: "CSS Grid anedhi horizontal (rows) and vertical (columns) paths logic dual grid arrays set up coordinate system. dashboard grids panels setup coordinates grid template columns columns distribution logic render."
  },
  {
    id: 3,
    title: "4. Media Queries & Responsive Design",
    icon: <FaMobileAlt />,
    category: "Responsive Design",
    introduction: "Media Queries enable responsive web design by applying CSS styles conditionally based on media characteristics, such as screen width, resolution, and orientation.",
    whyNeeded: "Websites must support multiple device screens (mobile, tablet, desktop) seamlessly, updating layouts automatically to fit the screen size.",
    whereUsed: "Used to build responsive layouts, hide elements on mobile screens, adjust font sizes, and scale columns.",
    companyExample: "Spotify and YouTube use media queries to hide sidebars and scale content cards down to a single column on mobile layouts.",
    image: null,
    code: `/* Default styling configurations (Desktop views) */
.dashboard-layout {
    display: flex;
    flex-direction: row;
    padding: 30px;
}

.sidebar-menu {
    width: 260px;
    display: block;
}

/* 1. Mobile screen breakpoint (max-width: 768px) */
@media (max-width: 768px) {
    .dashboard-layout {
        /* Stack components vertically on mobile screens */
        flex-direction: column;
        padding: 15px;
    }

    .sidebar-menu {
        /* Hide sidebar menu on mobile devices */
        display: none;
    }
    
    .dashboard-title {
        font-size: 1.5rem; /* Scale down typography size */
    }
}`,
    explanation: [
      "@media (max-width: 768px): Defines style rules that apply only when the viewport width is 768px or less.",
      "flex-direction: column: Stacks items vertically on mobile screens to fit the screen width.",
      "display: none: Hides the element on mobile devices to optimize the layout."
    ],
    executionFlow: "Browser detects viewport size → checks active media query breakpoints → applies conditional CSS styles over desktop defaults.",
    telugu: "Media Queries responsive page designs build coordinate systems. mobile views tablet views desktop views target width checks `@media (max-width: 768px)` blocks override logic stack alignments render."
  }
];

const CssMasterGuide = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeModule = CSS_DATABASE[activeTabIdx];

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(30, 64, 175, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#bfdbfe', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          CSS3 Masterclass
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          Professional CSS Layouts & Alignment Guide
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#dbeafe', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Master CSS layout systems. Learn the Box Model, Flexbox alignment, CSS Grid layout systems, and responsive design media queries with Telugu guides.
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
            <Typography variant="caption" sx={{ color: '#1d4ed8', fontWeight: 800, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select CSS Layout:
            </Typography>
            
            {CSS_DATABASE.map((module, idx) => (
              <Button
                key={module.id}
                fullWidth
                onClick={() => { setActiveTabIdx(idx); setActiveSubTab('theory'); }}
                startIcon={module.icon}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  borderRadius: '12px',
                  fontWeight: activeTabIdx === idx ? 700 : 500,
                  bgcolor: activeTabIdx === idx ? 'rgba(29, 78, 216, 0.08)' : 'transparent',
                  color: activeTabIdx === idx ? '#1d4ed8' : '#475569',
                  border: '1px solid',
                  borderColor: activeTabIdx === idx ? 'rgba(29, 78, 216, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(29, 78, 216, 0.04)',
                    borderColor: 'rgba(29, 78, 216, 0.1)'
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
              <Tab value="theory" label="1. What & Why" />
              <Tab value="image" label="2. Layout Diagram" />
              <Tab value="code" label="3. Working CSS Code" />
              <Tab value="explain" label="4. Line-by-Line" />
              <Tab value="flow" label="5. Execution Flow" />
              <Tab value="telugu" label="6. Telugu Explanation" />
            </Tabs>

            {/* Sub-tab viewport panels */}
            
            {/* Panel 1: Theory */}
            {activeSubTab === 'theory' && (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Introduction:</strong> {activeModule.introduction}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Why it is needed:</strong> {activeModule.whyNeeded}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Where it is used:</strong> {activeModule.whereUsed}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Real-World Company Examples:</strong> {activeModule.companyExample}
                </Typography>
              </Box>
            )}

            {/* Panel 2: Image */}
            {activeSubTab === 'image' && (
              <Box>
                {activeModule.image ? (
                  <Box sx={{ width: '100%', mt: 1, textAlign: 'center' }}>
                    <img 
                      src={activeModule.image} 
                      alt="CSS layouts infographics" 
                      style={{ maxWidth: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Refer to the Box Model spacing rules inside the CSS code tab.
                  </Typography>
                )}
              </Box>
            )}

            {/* Panel 3: Code */}
            {activeSubTab === 'code' && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                    CSS3 Layout Syntax Sheet
                  </Typography>
                  <Button size="small" onClick={() => handleCopyCode(activeModule.code)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#1d4ed8', textTransform: 'none', fontSize: '12px' }}>
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>
                </Box>
                <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                  <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCSS(activeModule.code) }} />
                </Box>
              </Box>
            )}

            {/* Panel 4: Line-by-Line */}
            {activeSubTab === 'explain' && (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Line-by-Line Explanation:</Typography>
                {activeModule.explanation.map((item, idx) => (
                  <Paper key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderLeft: '4px solid #1d4ed8', borderRadius: '8px' }}>
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                      {item.split(':').map((part, pIdx) => (
                        <span key={pIdx}>
                          {pIdx === 0 ? <strong>{part}</strong> : <>: {part}</>}
                        </span>
                      ))}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Panel 5: Execution Flow */}
            {activeSubTab === 'flow' && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Internal execution flow in browser:</Typography>
                <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  <Typography variant="body2" sx={{ color: '#1e293b', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {activeModule.executionFlow.split(' → ').map((step, sIdx) => (
                      <span key={sIdx}>
                        {sIdx > 0 && <span style={{ color: '#1d4ed8', fontWeight: 'bold' }}>{'\n  ↓\n'}</span>}
                        {step}
                      </span>
                    ))}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Panel 6: Telugu translation */}
            {activeSubTab === 'telugu' && (
              <Paper sx={{ p: 3, bgcolor: '#eff6ff', borderLeft: '5px solid #1d4ed8', borderRadius: '12px' }}>
                <Typography variant="subtitle2" sx={{ color: '#1e40af', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBookOpen /> Telugu Masterclass Explanation (Bilingual script):
                </Typography>
                <Typography variant="body2" sx={{ color: '#1e3a8a', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {activeModule.telugu}
                </Typography>
              </Paper>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CssMasterGuide;
