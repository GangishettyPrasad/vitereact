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
  FaHtml5, 
  FaCode, 
  FaListUl, 
  FaFileImage 
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
  tokenized = tokenized.replace(/(<!--[\s\S]*?-->)/g, (match) => {
    const id = `___COMMENT_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 2. Strings (Orange)
  tokenized = tokenized.replace(/(["'])(.*?)\1/g, (match) => {
    const id = `___STRING_${placeholders.length}___`;
    placeholders.push({ id, html: `<span style="color: #ce9178;">${escapeHtml(match)}</span>` });
    return id;
  });

  // 3. Escape HTML tags
  tokenized = escapeHtml(tokenized);

  // 4. HTML Elements (Blue)
  const tags = [
    'header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 
    'form', 'label', 'input', 'select', 'option', 'textarea', 'button', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'ul', 'ol', 'li', 'img', 'video', 'audio', 'iframe', 'source'
  ];
  tags.forEach(tag => {
    const regex = new RegExp(`&lt;${tag}\\b`, 'g');
    tokenized = tokenized.replace(regex, `&lt;<span style="color: #569cd6; font-weight: bold;">${tag}</span>`);
    const closeRegex = new RegExp(`&lt;\\/${tag}&gt;`, 'g');
    tokenized = tokenized.replace(closeRegex, `&lt;/<span style="color: #569cd6; font-weight: bold;">${tag}</span>&gt;`);
  });

  // 5. HTML Attributes (Teal)
  const attrs = [
    'class', 'id', 'src', 'alt', 'href', 'type', 'name', 'value', 'placeholder', 'required', 'pattern', 
    'controls', 'width', 'height', 'action', 'method', 'target'
  ];
  attrs.forEach(attr => {
    const regex = new RegExp(`\\b${attr}\\b(?=\\=)`, 'g');
    tokenized = tokenized.replace(regex, `<span style="color: #9cdcfe;">${attr}</span>`);
  });

  // Restore placeholders
  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

const HTML_DATABASE = [
  {
    id: 0,
    title: "1. HTML5 Semantic Elements",
    icon: <FaHtml5 />,
    category: "Structure & SEO",
    introduction: "HTML5 Semantic Elements clearly describe their meaning to both the browser and the developer. Instead of using generic <div> tags everywhere, tags like <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> define the layout structure of a webpage.",
    whyNeeded: "Generic <div> wrappers convey no meaning to search engine web crawlers. Semantic elements provide structured indicators, improving accessibility for screen readers and SEO rankings.",
    whereUsed: "Used to construct the base template shell layout of all web pages, defining header menus, sidebars, main contents, and footers.",
    companyExample: "Google, Amazon, and YouTube use semantic layouts to help search engines index their website content efficiently.",
    image: "/html_semantics_diagram.png",
    code: `<!-- Complete HTML5 Semantic layout template -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Enterprise Semantic Structure</title>
</head>
<body>
    <!-- 1. Header block for brand logos and search bars -->
    <header>
        <h1>BharatPayroll Dashboard</h1>
        <nav>
            <ul>
                <li><a href="/dashboard">Home</a></li>
                <li><a href="/employees">Directory</a></li>
            </ul>
        </nav>
    </header>

    <!-- 2. Main content container -->
    <main>
        <!-- A section representing a thematic grouping -->
        <section id="announcements">
            <h2>Latest Announcements</h2>
            <article>
                <h3>New Attendance Rule Active</h3>
                <p>Starting Monday, check-in windows will lock after 10:00 AM.</p>
            </article>
        </section>

        <!-- Aside block representing side rails and ads -->
        <aside>
            <h3>Quick Links</h3>
            <p>Download Payslip PDF</p>
        </aside>
    </main>

    <!-- 3. Footer block containing copyright and contacts -->
    <footer>
        <p>&copy; 2026 BharatPayroll. All rights reserved.</p>
    </footer>
</body>
</html>`,
    explanation: [
      "&lt;header&gt;: Defines header menus and branding titles.",
      "&lt;nav&gt;: Wraps navigation links for accessibility scanners.",
      "&lt;main&gt;: Represents the main content of the document.",
      "&lt;section&gt;: Groups related content, such as sections for announcements or data grids.",
      "&lt;article&gt;: Defines self-contained content, such as a blog post or announcement card.",
      "&lt;aside&gt;: Defines sidebar content that is separate from the main article.",
      "&lt;footer&gt;: Defines copyright and contact details at the bottom of the page."
    ],
    executionFlow: "Browser parses index.html → loads DOM tree → identifies semantic tags → optimizes layout indexing for screen readers and search crawlers.",
    telugu: "HTML5 Semantic Elements anevi layout construct cheyadaniki use chese descriptive elements. Prathi element structural meaning defines chesthundi. Web crawlers automatic page index cheyadaniki, layout structure access indicators clear checks handle cheyadaniki idhi important."
  },
  {
    id: 1,
    title: "2. Form Controls & Validation",
    icon: <FaCode />,
    category: "Data Collection",
    introduction: "Form Controls handle user input and data collection. HTML5 provides built-in validation rules (like required, pattern, and specific input types) to validate data in the browser before sending it to the server.",
    whyNeeded: "Validating input values on the client side prevents invalid data entries from reaching the server, saving network bandwidth and server resources.",
    whereUsed: "Used on login screens, employee onboarding forms, password reset pages, and settings screens.",
    companyExample: "LinkedIn and Netflix use HTML5 form validations to verify email formats and password lengths before sending login requests.",
    code: `<form action="/submit-form" method="POST">
    <!-- Email input with automatic format validation -->
    <div class="form-group">
        <label for="empEmail">Email Address:</label>
        <input 
            type="email" 
            id="empEmail" 
            name="email" 
            required 
            placeholder="name@company.com"
        />
    </div>

    <!-- Pincode input validating exactly 6 digits -->
    <div class="form-group">
        <label for="pincode">Pincode:</label>
        <input 
            type="text" 
            id="pincode" 
            name="pincode" 
            required 
            pattern="[0-9]{6}" 
            placeholder="6-digit pincode"
        />
    </div>

    <!-- Dropdown selection list -->
    <div class="form-group">
        <label for="dept">Department:</label>
        <select id="dept" name="department" required>
            <option value="">Select Department</option>
            <option value="HR">Human Resources</option>
            <option value="IT">Information Technology</option>
        </select>
    </div>

    <!-- Textarea input field -->
    <div class="form-group">
        <label for="reason">Reason:</label>
        <textarea id="reason" name="reason" placeholder="Enter reason..."></textarea>
    </div>

    <button type="submit">Submit Data</button>
</form>`,
    explanation: [
      "type='email': Automatically validates email format structure.",
      "required: Prevents form submission if the input field is empty.",
      "pattern='[0-9]{6}': Uses regular expressions to validate that the input contains exactly 6 digits.",
      "select and option: Renders a dropdown select list.",
      "textarea: Renders a multi-line text input field."
    ],
    executionFlow: "User enters form data → clicks submit → browser validates inputs against defined rules → blocks submission and displays error prompts if validations fail → submits data to defined action URL if successful.",
    telugu: "Form components user inputs capture and validate chesthadu. pattern validation (`[0-9]{6}`) exact number count values checking handle chesthundi. fields variables input type select options form submits target checks validations."
  },
  {
    id: 2,
    title: "3. Structured Data (Tables & Lists)",
    icon: <FaListUl />,
    category: "Data Display",
    introduction: "Tables and Lists organize and display structured datasets. Table elements (like thead, tbody, tr, th, and td) render data grids, and list elements (like ul, ol, and li) organize items.",
    whyNeeded: "Displays data (such as attendance history, logs, and rosters) in an organized, structured grid layout.",
    whereUsed: "Used to display employee logs, rosters, tax calculation sheets, and transaction history.",
    companyExample: "Trading platforms and banking portals use structured HTML tables to render transaction histories and stock prices.",
    code: `<!-- Structured Table for Employee Attendance -->
<table border="1" style="width: 100%; border-collapse: collapse;">
    <!-- 1. Table Header -->
    <thead>
        <tr style="background-color: #f1f5f9;">
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
            <th>Status</th>
        </tr>
    </thead>
    
    <!-- 2. Table Body -->
    <tbody>
        <tr>
            <td>BP-101</td>
            <td>Prasad</td>
            <td>09:00 AM</td>
            <td>06:00 PM</td>
            <td><strong style="color: green;">Present</strong></td>
        </tr>
        <tr>
            <td>BP-102</td>
            <td>Mounika</td>
            <td>08:50 AM</td>
            <td>06:10 PM</td>
            <td><strong style="color: green;">Present</strong></td>
        </tr>
    </tbody>
</table>

<!-- Nested structured lists -->
<h3>Employee Task Checklist</h3>
<ul>
    <li>Onboarding Wizard Complete
        <ol>
            <li>Fill profile forms</li>
            <li>Upload ID documents</li>
        </ol>
    </li>
    <li>Collect biometric token</li>
</ul>`,
    explanation: [
      "&lt;table&gt;: Main container tag for HTML data grids.",
      "&lt;thead&gt; &amp; &lt;tbody&gt;: Separates header row definitions from data row lists.",
      "&lt;tr&gt;: Defines a single row of table data cells.",
      "&lt;th&gt; &amp; &lt;td&gt;: Renders header cells and body cells respectively.",
      "&lt;ul&gt; &amp; &lt;ol&gt;: Renders unordered (bulleted) and ordered (numbered) lists."
    ],
    executionFlow: "Browser parses layout parameters → builds grid alignments → loops through rows inside table body → displays data in rows and columns.",
    telugu: "Structured table format and lists data display coordinates. table standard tags (`thead`, `tbody`, `tr`, `td`) grids construct chesthadu. list tags (`ul`, `ol`, `li`) items organize layout render."
  },
  {
    id: 3,
    title: "4. Media Elements & iFrames",
    icon: <FaFileImage />,
    category: "Rich Media",
    introduction: "Media elements embed rich media (like images, audio, video, and iframes) directly into webpages.",
    whyNeeded: "Enables embedding rich media (such as company profile videos, documents, maps, and audio messages) directly in the UI.",
    whereUsed: "Used to display employee avatars, training videos, Google Maps locations, and document previews.",
    companyExample: "YouTube, Airbnb, and Spotify use media tags to embed video players, location maps, and audio tracks.",
    code: `<!-- 1. Display Image with alt fallback -->
<img 
    src="/public/html_semantics_diagram.png" 
    alt="HTML5 Layout Semantic Structure" 
    width="100%" 
    style="border-radius: 8px; border: 1px solid #cbd5e1;"
/>

<!-- 2. Embed Video Player with control buttons -->
<video width="100%" controls poster="/public/html_semantics_diagram.png">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

<!-- 3. Embed Audio Messages -->
<audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
</audio>

<!-- 4. Embed interactive Google Maps location using iFrame -->
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7579788319087!2d78.38148817505295!3d17.4338787834612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!2spanel_location!2shyd!5e0!3m2!1sen!2sin!4v1711200000000" 
    width="100%" 
    height="300" 
    style="border: 0; border-radius: 8px;" 
    allowfullscreen="" 
    loading="lazy"
></iframe>`,
    explanation: [
      "img alt attribute: Displays fallback description text if the image fails to load.",
      "video controls: Enables native video playback controls (Play, Pause, Volume, Fullscreen).",
      "source: Specifies the URL path and format type of the media file.",
      "iframe: Embeds an external webpage (like Google Maps or PDF readers) inside the current page."
    ],
    executionFlow: "Browser reads source paths → sends media network request → allocates render window in layout grid → loads media file stream asynchronously.",
    telugu: "Media elements and iframes rich elements display handle coordinates. video and audio native controls support elements setups. iframe external location map coordinates embedded setups."
  }
];

const HtmlMasterGuide = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  const activeModule = HTML_DATABASE[activeTabIdx];

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(22, 101, 52, 0.15)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#bbf7d0', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          HTML5 Masterclass
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          Day-to-Day Essential HTML5 Guide
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#dcfce7', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Master HTML5 elements and validation systems. Learn structure, semantic blocks, forms, media layouts, and table setups with in-depth explanations and Telugu masterclass guides.
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
            <Typography variant="caption" sx={{ color: '#166534', fontWeight: 800, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select HTML Concept:
            </Typography>
            
            {HTML_DATABASE.map((module, idx) => (
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
                  bgcolor: activeTabIdx === idx ? 'rgba(21, 128, 61, 0.08)' : 'transparent',
                  color: activeTabIdx === idx ? '#15803d' : '#475569',
                  border: '1px solid',
                  borderColor: activeTabIdx === idx ? 'rgba(21, 128, 61, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(21, 128, 61, 0.04)',
                    borderColor: 'rgba(21, 128, 61, 0.1)'
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
              <Chip label={activeModule.category} color="success" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />
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
              <Tab value="image" label="2. Diagram Infographic" />
              <Tab value="code" label="3. Working Code" />
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
                      alt="HTML structural infographics" 
                      style={{ maxWidth: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Refer to the structured layout code tab to view layout parameters.
                  </Typography>
                )}
              </Box>
            )}

            {/* Panel 3: Code */}
            {activeSubTab === 'code' && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                    HTML5 Working Boilerplate Snippet
                  </Typography>
                  <Button size="small" onClick={() => handleCopyCode(activeModule.code)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#15803d', textTransform: 'none', fontSize: '12px' }}>
                    {copied ? 'Copied' : 'Copy Code'}
                  </Button>
                </Box>
                <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                  <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeModule.code) }} />
                </Box>
              </Box>
            )}

            {/* Panel 4: Line-by-Line */}
            {activeSubTab === 'explain' && (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Line-by-Line Explanation:</Typography>
                {activeModule.explanation.map((item, idx) => (
                  <Paper key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderLeft: '4px solid #15803d', borderRadius: '8px' }}>
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
                        {sIdx > 0 && <span style={{ color: '#15803d', fontWeight: 'bold' }}>{'\n  ↓\n'}</span>}
                        {step}
                      </span>
                    ))}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Panel 6: Telugu translation */}
            {activeSubTab === 'telugu' && (
              <Paper sx={{ p: 3, bgcolor: '#eff6ff', borderLeft: '5px solid #15803d', borderRadius: '12px' }}>
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

export default HtmlMasterGuide;
