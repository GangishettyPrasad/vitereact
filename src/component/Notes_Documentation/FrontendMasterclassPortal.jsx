import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  Chip, 
  Tabs, 
  Tab, 
  TextField, 
  Slider,
  Tooltip as MuiTooltip
} from '@mui/material';
import { 
  FaHtml5, 
  FaGlobe,
  FaCss3Alt, 
  FaBoxOpen, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaFolderOpen, 
  FaTerminal, 
  FaCopy, 
  FaCheck, 
  FaBookOpen, 
  FaPlay, 
  FaRedo 
} from 'react-icons/fa';

// Helper to escape HTML tags
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Custom code token highlighting
function highlightCode(code, type = 'html') {
  if (!code) return '';
  const placeholders = [];
  let tokenized = code;

  if (type === 'html') {
    // Escape HTML tags first but hide comments and strings to protect them
    tokenized = tokenized.replace(/(<!--[\s\S]*?-->)/g, (match) => {
      const id = `___COMMENT_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
      return id;
    });

    tokenized = tokenized.replace(/(["'])(.*?)\1/g, (match) => {
      const id = `___STRING_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #ce9178;">${escapeHtml(match)}</span>` });
      return id;
    });

    tokenized = escapeHtml(tokenized);

    const tags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'div', 'p', 'h1', 'h2', 'h3', 'form', 'label', 'input', 'select', 'textarea', 'button', 'table', 'tr', 'th', 'td', 'img', 'video', 'audio', 'iframe', 'svg', 'canvas', 'a'];
    tags.forEach(tag => {
      const regex = new RegExp(`&lt;${tag}\\b`, 'g');
      tokenized = tokenized.replace(regex, `&lt;<span style="color: #569cd6; font-weight: bold;">${tag}</span>`);
      const closeRegex = new RegExp(`&lt;\\/${tag}&gt;`, 'g');
      tokenized = tokenized.replace(closeRegex, `&lt;/<span style="color: #569cd6; font-weight: bold;">${tag}</span>&gt;`);
    });

    const attrs = ['class', 'id', 'src', 'alt', 'href', 'type', 'name', 'value', 'placeholder', 'required', 'pattern', 'controls', 'width', 'height', 'style', 'aria-label', 'role'];
    attrs.forEach(attr => {
      const regex = new RegExp(`\\b${attr}\\b(?=\\=)`, 'g');
      tokenized = tokenized.replace(regex, `<span style="color: #9cdcfe;">${attr}</span>`);
    });
  } else {
    // CSS syntax rules
    tokenized = tokenized.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => {
      const id = `___COMMENT_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #6a9955; font-style: italic;">${escapeHtml(match)}</span>` });
      return id;
    });

    tokenized = tokenized.replace(/([a-zA-Z0-9_\-.:,\s]+)(?=\s*\{)/g, (match) => {
      const id = `___SELECTOR_${placeholders.length}___`;
      placeholders.push({ id, html: `<span style="color: #d7ba7d; font-weight: bold;">${escapeHtml(match.trim())}</span>` });
      return id;
    });

    tokenized = escapeHtml(tokenized);

    tokenized = tokenized.replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span style="color: #9cdcfe;">$1</span>');
    tokenized = tokenized.replace(/(:\s*)([^;\n]+)(?=;)/g, '$1<span style="color: #ce9178;">$2</span>');
  }

  for (let i = placeholders.length - 1; i >= 0; i--) {
    tokenized = tokenized.replace(placeholders[i].id, placeholders[i].html);
  }

  return tokenized;
}

const ROADMAP_MODULES = [
  {
    id: 0,
    title: "0. Browser & Web Fundamentals",
    icon: <FaGlobe />,
    topics: [
      {
        name: "Internet & Web Lifecycle",
        theory: "How the Internet works, Client vs Server, HTTP & HTTPS protocols, DNS resolution, URL structures, and the complete Request-Response lifecycle.",
        whyExists: "Before writing frontend code, developers must understand how assets are requested, resolved, and delivered across network boundaries.",
        whenToUse: "Always consider network lifecycle when optimizing asset sizes, domain prefetching, and HTTPS security headers.",
        codeCss: `/* Sample URL & HTTP Headers Configuration */
/* URL: https://api.bharatpayroll.com:443/v1/employees?status=active */
/* Request Headers:
   GET /v1/employees HTTP/2
   Host: api.bharatpayroll.com
   Accept: application/json
   Authorization: Bearer jwt_token
*/
/* Response Headers:
   HTTP/2 200 OK
   Content-Type: application/json; charset=utf-8
   Cache-Control: public, max-age=3600
   Strict-Transport-Security: max-age=63072000; includeSubDomains
*/`,
        explanation: "1. HTTPS Protocol: Uses TLS/SSL to encrypt traffic.\n2. Host header: Tells the server which domain is requested.\n3. Cache-Control: Guides browsers and CDNs on resource caching rules.",
        browserInternals: "1. Parse URL: Extracts protocol, domain, port, path, and query params.\n2. DNS Lookup: Queries local host file, DNS cache, or root/authoritative nameservers to resolve IP.\n3. TCP Handshake: Performs 3-way syn-synack-ack connection.\n4. SSL/TLS Negotiation: Secure key exchange.\n5. HTTP Request: Client sends headers and data.\n6. Server Response: Server returns status, headers, and payload.",
        practices: "✅ Best Practice: Always serve resources over HTTPS. Use HSTS (Strict-Transport-Security) headers to enforce HTTPS.\n❌ Common Mistake: Serving images or scripts over HTTP on an HTTPS site (Mixed Content), causing modern browsers to block them.",
        interviews: "Q: What happens when you type a URL in the address bar and press Enter?\nA: The URL is parsed, a DNS lookup resolves the domain's IP, a TCP/IP connection is opened with a TLS handshake, an HTTP GET request is sent, the server processes it and sends an HTML response, and the browser rendering pipeline parses and displays it.",
        telugu: "Real-time analogy (Post Office Delivery): Meeru letter raasi address (URL) vesthe, Post Office (DNS) aa address IP address (house coordinates) ento chusi target building (Server) ki pampistundi. Server malli delivery response ni custom data blocks format lo client (browser) ki send chestundi.\n\nDetailed Tanglish explanation:\n- Client vs Server: User actions handle chese browser system client, data permanently store and process chese hardware setup server.\n- DNS: google.com lanti domain names ni 142.250.190.46 lanti machine IP addresses ga resolve chestundi.\n- Request-Response: User link click cheyagane client request pampistundi (GET, POST, etc.), server load data payload response format lo reply isthundi.",
        exercise: "Write a mock HTTP request header template with Accept and Authorization tokens.",
        exerciseCss: `/* Enter sample headers here */
GET /api/v1/auth HTTP/1.1
Host: secure.bharatpayroll.com
Accept: application/json
Authorization: Bearer token123`
      },
      {
        name: "Browser Rendering Pipeline",
        theory: "Browsers convert code to visual pixels using the rendering pipeline: DOM tree generation, CSSOM tree generation, Render Tree compilation, Layout calculations, Paint rasterization, and GPU Compositing.",
        whyExists: "Understanding layout, repaint, and composite operations allows developers to write performant CSS animations that run at a smooth 60fps.",
        whenToUse: "Always use when debugging animation performance, layout thrashing, and optimizing critical rendering paths.",
        codeCss: `/* Optimize animations by skipping Layout & Paint */
.gpu-card {
    will-change: transform, opacity;
    transform: translateZ(0); /* Force GPU composite layer */
    backface-visibility: hidden;
}
/* Triggering Reflow (Avoid in JS loops) */
/* element.style.width = '300px'; */`,
        explanation: "1. will-change: Hints to browser to create separate compositor layer.\n2. translateZ(0): Forces hardware acceleration.\n3. reflow triggers: avoid properties like width, height, margin in frequent updates.",
        browserInternals: "1. DOM generation: Parses HTML tokens to DOM nodes.\n2. CSSOM: Parses styles.\n3. Render Tree: Combines visible DOM and CSSOM nodes.\n4. Layout (Reflow): Computes geometry and coordinates.\n5. Paint: Fills pixels (borders, background colors, text).\n6. Composite: Layer coordinates merged by GPU threads.",
        practices: "✅ Best Practice: Animate only transform and opacity. These skip Layout and Paint phases entirely.\n❌ Common Mistake: Modifying layout-triggering properties (like offsetWidth) in loops, causing instant layout thrashing.",
        interviews: "Q: Explain Critical Rendering Path and how to optimize it.\nA: Critical Rendering Path is the sequence of steps the browser takes to render a page. Optimize it by minifying CSS/JS, using async/defer scripts, inlining critical CSS, and avoiding render-blocking resources.",
        telugu: "Real-time analogy (House Construction Map): House construct chesetappudu outline boundaries drawing DOM laantidi. Rangu ruchi styling guides paint design model CSSOM. Build structure Layout, color decoration Paint, final furniture arrangement Composite model laantidi.\n\nDetailed Tanglish explanation:\n- Rendering Pipeline: HTML parse ayyi DOM, CSS parse ayyi CSSOM modalouthundi. Rendu kalisthe Render Tree ready avthundi.\n- Layout vs Paint: Layout ante element dimensions, margins and positions design cheyadam. Paint ante actual background colors and text design visual rendering.\n- Composite: Rendered layers ni layer order index batti GPU hardware direct screen meeda composite frame combine chestundi.",
        exercise: "Create a GPU hardware-accelerated class definition that optimizes layout transforms.",
        exerciseCss: `.optimize-layer {
    will-change: transform;
    transform: translate3d(0, 0, 0);
}`
      },
      {
        name: "Browser Storage Systems",
        theory: "Client-side state storage mechanisms: SessionStorage (cleared on tab close), LocalStorage (persistent key-value, ~5MB), Cookies (sent with network requests, ~4KB, HttpOnly security), and HTTP Cache.",
        whyExists: "Web applications need to preserve state, cache responses, and secure credentials without constantly requesting data from server APIs.",
        whenToUse: "Use cookies for session authentication, LocalStorage for persistent user settings, and SessionStorage for temporary wizard form data.",
        codeCss: `/* Sample configuration storage object structure */
/* LocalStorage: localStorage.setItem('theme', 'dark'); */
/* Cookies: set-cookie: token=abc; Secure; HttpOnly; SameSite=Strict */`,
        explanation: "1. HttpOnly Flag: Prevents client-side scripts from reading auth cookies, defending against XSS.\n2. SameSite=Strict: Blocks cookies during cross-site requests, preventing CSRF.\n3. Cache-Control: Directs storage retention rules.",
        browserInternals: "Manages storage directories under sandbox profile folders. Restricts cross-origin resource storage via Same Origin Policy (SOP).",
        practices: "✅ Best Practice: Store authentication tokens in secure, HttpOnly, SameSite cookies. Do not put sensitive data in LocalStorage.\n❌ Common Mistake: Forgetting to clean up LocalStorage entries, leading to quota limit exceptions.",
        interviews: "Q: What is the security vulnerability of storing JWT tokens in LocalStorage?\nA: LocalStorage is accessible by any script running on the page. If the site is vulnerable to Cross-Site Scripting (XSS), an attacker can steal the JWT. Using HttpOnly cookies blocks JS access.",
        telugu: "Real-time analogy (Lockers): Pocket cash cookies laantidi, simple parameters API calls ventapadataayi. Office drawer keys SessionStorage laantidi, browser window close chesthe expire avthundi. Home locker LocalStorage laantidi, computer restart chesina files persistent ga untaayi.\n\nDetailed Tanglish explanation:\n- LocalStorage: Permanently key-value client side data storage setup. Expire avvadhu.\n- SessionStorage: User browser tab close chesetappudu variable session details clean auth state memory release chesthundi.\n- Cookies: API request payload thoti auto synchronize ayye standard parameters authentication validation uses.",
        exercise: "Create a CSS mockup showing dark mode themes driven by data attribute variables.",
        exerciseCss: `[data-theme="dark"] {
    --bg-color: #0f172a;
    --text-color: #f8fafc;
}`
      },
      {
        name: "Chrome DevTools Masterclass",
        theory: "Inspect and debug code using Google Chrome Developer Tools. Learn to use Elements, Console, Network, and Performance tabs for diagnostic analysis.",
        whyExists: "Frontend developers need tools to inspect runtime DOM, debug JavaScript issues, analyze network payloads, profile page performance, and simulate mobile devices.",
        whenToUse: "Always open DevTools during active layout design and API integration tasks.",
        codeCss: `/* Debugging class indicator targets */
.debug-outline {
    outline: 1px solid #ef4444 !important; /* Visible alignment test */
}`,
        explanation: "1. Elements Tab: View live DOM tree, modify CSS style attributes in real-time.\n2. Network Tab: Check HTTP codes, payload size, waterfall latency.\n3. Console: Check logs and test JS code snippets.",
        browserInternals: "Injects DevTools protocol agent hooks into the browser engine process, enabling real-time monitoring of script performance, DOM changes, and network activity.",
        practices: "✅ Best Practice: Use network throttling (Slow 3G) to inspect loading states and resource loading orders.\n❌ Common Mistake: Relying on console.log logs in production code, causing memory leak overflows.",
        interviews: "Q: How do you identify render blocking resources using DevTools?\nA: Open Network Tab, reload page, look at the waterfall chart. CSS stylesheets and JS scripts without async/defer attributes block DOM parsing and appear early in the timeline.",
        telugu: "Real-time analogy (X-Ray Scanner): Doctor patient skeleton checks scanner monitor tools use chesinatlu, DevTools system code structure runtime modifications changes tracking checks chesthundhi.\n\nDetailed Tanglish explanation:\n- Elements Tab: Direct HTML & CSS styling rules real-time modify chesi test cheyyachhu.\n- Network Tab: Response codes, payload values size, api performance levels and network throttle settings tests handles.\n- Console: Script console logs and error stack tracking rules checks.",
        exercise: "Define a CSS helper utility class to debug layout alignment issues.",
        exerciseCss: `.dev-debug * {
    outline: 1px dashed red !important;
}`
      }
    ]
  },
  {
    id: 1,
    title: "1. HTML Foundations",
    icon: <FaHtml5 />,
    topics: [
      {
        name: "Document Structure",
        theory: "An HTML document structure sets up the foundational DOM tree configuration. The DOCTYPE declaration specifies the rendering standard, html acts as the root, head contains metadata, and body holds viewable user page assets.",
        whyExists: "Browsers require a structured document type definition (DTD) to distinguish between standard HTML5 pages and legacy quirks rendering modes.",
        whenToUse: "Always use as the entry shell for all webpage layouts.",
        codeHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise Profile Page</title>
</head>
<body>
    <div id="root">
        <h1>Welcome to BharatPayroll Portal</h1>
    </div>
</body>
</html>`,
        explanation: "1. &lt;!DOCTYPE html&gt;: Forces the browser to render using the modern HTML5 standard.\n2. lang='en': Tells screen readers to utilize English speech synthesizers.\n3. &lt;meta name='viewport'&gt;: Key tag that enables responsive page scaling on mobile viewports.",
        browserInternals: "Loads HTML document | Tokenizes markup into nodes | Constructs Document Object Model (DOM) tree structure | Initiates CSSOM parser operations.",
        a11y: "Set correct lang attributes on the html root tag to support automatic screen reader translation engines.",
        practices: "✅ Best Practice: Always set viewport scaling parameters correctly.\n❌ Common Mistake: Forgetting DTD, which causes older IE quirks-mode layout rendering.",
        interviews: "Q: What happens if you omit the DOCTYPE declaration?\nA: The browser enters Quirks Mode, rendering pages using non-standard rules that break layout alignments.",
        telugu: "Real-time analogy (House Blueprint): Building construct chesetappudu architect blueprint design draw chesthado, HTML document structure kooda web page components root layout structures define chesthundi.\n\nDetailed Tanglish explanation:\n- <!DOCTYPE html>: Browser modern HTML5 rendering standard follow rules follow avvalani instruct chesthundhi.\n- <html>: Root element of the web page. lang='en' parameter screen readers text-to-speech rendering configurations and languages target configurations sets chesthundi.\n- <head>: Title, charset UTF-8, and meta responsive settings meta tags configurations settings store container storage head block.\n- <body>: Screen visible pages texts buttons link components actual data hold wrapper tag.",
        exercise: "Create an index.html shell containing a meta description and a main content heading.",
        exerciseHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="BharatPayroll Enterprise Employee portal homepage.">
    <title>BharatPayroll Portal</title>
</head>
<body>
    <h1>Employee Dashboard</h1>
</body>
</html>`
      },
      {
        name: "Semantic HTML",
        theory: "Semantic HTML uses tags that convey meaning and document structure to the browser, search engines, and screen readers (e.g. article, section, header, footer, aside, nav).",
        whyExists: "Using only div tags (div soup) makes it impossible for web crawlers and accessibility tools to understand the hierarchy and importance of page content.",
        whenToUse: "Always use semantic elements instead of generic div wrappers when structuring main page sections.",
        codeHtml: `<!-- Semantic layout structure -->
<header class="app-header">
    <nav class="nav-links">
        <a href="#home">Dashboard</a>
    </nav>
</header>
<main class="content-wrapper">
    <section class="metrics-container">
        <article class="metric-card">
            <h2>Active Users</h2>
            <p>1,240 Employees Online</p>
        </article>
    </section>
</main>
<footer class="app-footer">
    <p>&copy; 2026 BharatPayroll</p>
</footer>`,
        explanation: "1. &lt;header&gt;: Contains introductory content or nav links.\n2. &lt;main&gt;: Represents the unique, central content area of the document.\n3. &lt;article&gt;: Self-contained content that makes sense on its own (e.g. card, post).",
        browserInternals: "Loads the DOM nodes with accessibility attributes automatically | Provides logical structural nodes for crawlers.",
        a11y: "Using semantic tags gives screen readers landmarks to jump directly to sections (like main content or footer).",
        practices: "✅ Best Practice: Keep a single &lt;main&gt; tag per document.\n❌ Common Mistake: Overusing &lt;section&gt; as a general styling container instead of a simple &lt;div&gt;.",
        interviews: "Q: What is the benefit of Semantic HTML over generic divs?\nA: Better accessibility (screen readers navigate pages easily), improved SEO (crawlers index relevant sections faster), and cleaner, more maintainable code.",
        telugu: "Real-time analogy (Rooms in a House): Guest hall, kitchen and bedrooms ki clear naming blocks structures design partition templates unnattu. Semantics HTML layout tags also provide meaning to pages blocks instead of generic divs.\n\nDetailed Tanglish explanation:\n- article, section, header, footer: Navigation paths or page section boundaries distinct blocks structural indexes clear formats.\n- Search Engine Optimization (SEO): Google crawler bots semantic structures headings hierarchies understand chesukuni search index ranking increase chestharu.",
        exercise: "Write a semantic HTML structure for a sidebar article widget with a header and a footer.",
        exerciseHtml: `<aside class="news-sidebar">
    <article>
        <header>
            <h3>System Status Update</h3>
        </header>
        <p>All payroll systems operating normally.</p>
        <footer>
            <small>Updated 5m ago</small>
        </footer>
    </article>
</aside>`
      },
      {
        name: "Forms & Validations",
        theory: "Form validation protects server endpoints. Built-in HTML validations (required, pattern, min/max, type) provide instant user feedback without relying on JavaScript code.",
        whyExists: "Forms are target entry points for invalid data submissions. Relying solely on client JS validations leaves pages vulnerable if JS fails or is disabled.",
        whenToUse: "Use built-in validation attributes in all input fields that capture user details.",
        codeHtml: `<form class="auth-form" action="/login" method="POST">
    <div class="field-group">
        <label for="empEmail">Corporate Email:</label>
        <input type="email" id="empEmail" required placeholder="name@bharatpayroll.com" />
    </div>
    <div class="field-group">
        <label for="password">Security PIN:</label>
        <input type="text" id="password" required pattern="[0-9]{4,6}" placeholder="4-6 digit pin" />
    </div>
    <button type="submit" class="btn-submit">Authenticate</button>
</form>`,
        explanation: "1. type='email': Validates input format conforms to email structure.\n2. required: Prevents submit if value is empty.\n3. pattern='[0-9]{4,6}': Enforces regex standard limiting input to 4-6 numeric digits.",
        browserInternals: "Runs instant validation routine on click event of submit button | Blocks request cycle if constraint checks fail.",
        practices: "✅ Best Practice: Always link input fields to labels using corresponding ID matching labels.\n❌ Common Mistake: Using only placeholder attributes without labels, which blocks accessibility readers.",
        interviews: "Q: What is the purpose of the 'pattern' attribute?\nA: It runs form input matching using regular expressions (Regex). It validates field entries (like phone numbers, zip codes) natively before submitting data.",
        telugu: "Real-time analogy (Custom Checkpoints): Mall entrance or gate pass verification ticket format and details validation lanti di. Input values requirements match avvakopothe warning details immediate renders checks.\n\nDetailed Tanglish explanation:\n- validation attributes: required, pattern (regex rules), min/max criteria input box settings controls.\n- css status validation: :invalid and :valid pseudo-classes dynamic visual green/red borders updates triggers.",
        exercise: "Create a registration form requiring employee age (> 18) and matching input labels.",
        exerciseHtml: `<form>
    <label for="empAge">Age:</label>
    <input type="number" id="empAge" name="age" min="18" max="100" required />
    <button type="submit">Submit</button>
</form>`
      },
      {
        name: "Responsive Images & SVGs",
        theory: "Responsive images deliver optimal layouts for all screen sizes. Scalable Vector Graphics (SVGs) use mathematical nodes to scale infinitely without pixelating.",
        whyExists: "Serving heavy desktop images to mobile devices wastes bandwidth and slows page loads. Using raster formats for flat icons causes blurriness on retina displays.",
        whenToUse: "Use source elements in picture elements for responsive rendering, and inline SVGs for layout icons.",
        codeHtml: `<!-- Responsive Image Layout -->
<picture>
    <source media="(min-width: 1024px)" srcset="banner-desktop.jpg">
    <source media="(min-width: 768px)" srcset="banner-tablet.jpg">
    <img src="banner-mobile.jpg" alt="Company Announcement Banner" class="fluid-img" />
</picture>

<!-- SVG Icon Element -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="icon-svg">
    <path d="M12 2L2 22h20L12 2z" fill="#2563eb" />
</svg>`,
        explanation: "1. picture: Serves different image assets matching active media conditions.\n2. srcset: Defines resolution sizes for corresponding layouts.\n3. viewBox: Sets coordinate systems for vector graphics scaling.",
        browserInternals: "Checks network bandwidth and active screen width | downloads matched asset | parses XML paths of SVGs and renders elements.",
        practices: "✅ Best Practice: Always set width and height parameters to avoid layout shifts.\n❌ Common Mistake: Embedding inline SVGs with huge coordinate sets, bloated code chunks.",
        interviews: "Q: Why are SVGs preferred over PNGs for web icons?\nA: SVGs are vectors. They scale infinitely without blur, have small file sizes, and can be styled dynamically using CSS properties.",
        telugu: "Real-time analogy (Vector Stamps vs Photos): SVG vector stamp lanti di. Entha size scale up chesina quality reduce avvakunda high-definition clean details parameters sets. Raster images JPG/PNG scale chesthe pixelate blur formats aithayi.\n\nDetailed Tanglish explanation:\n- <picture> tag: screen size breakpoint checks viewport width matching correct resolution image standard auto selects dynamically.\n- inline SVG paths: code format standard XML vector draw paths fill properties highlights CSS direct controls styling targets.",
        exercise: "Create an SVG checked circle with fill: green and stroke-width: 3.",
        exerciseHtml: `<svg viewBox="0 0 24 24" width="48" height="48">
    <circle cx="12" cy="12" r="10" style="fill: #dcfce7; stroke: #16a34a; stroke-width: 3;" />
</svg>`
      },
      {
        name: "Accessibility (A11y) & Keyboard Nav",
        theory: "Web accessibility ensures pages can be navigated entirely using a keyboard, leveraging focus indicators, tab indexes, and ARIA labels.",
        whyExists: "Blind or motor-impaired users rely on screen readers and keyboards. Poor layout coding locks them out from completing transactions.",
        whenToUse: "Always build components with visible focus rings and proper roles.",
        codeHtml: `<button aria-label="Close Announcement Dialog" class="icon-btn" tabindex="0">
    &times;
</button>
<div role="status" aria-live="polite" class="alert-box">
    Payroll submitted successfully.
</div>`,
        codeCss: `.icon-btn:focus-visible {
    outline: 3px solid #3b82f6;
    outline-offset: 2px;
}
.alert-box {
    background-color: #f0fdf4;
    border-left: 4px solid #16a34a;
    padding: 12px;
}`,
        explanation: "1. aria-label: Provides descriptive context to screen readers.\n2. tabindex='0': Makes custom elements focusable via keyboard tab keys.\n3. focus-visible: Style trigger that targets keyboard users only, hiding outlines for mouse users.",
        browserInternals: "Exposes accessibility landmarks tree (A11y Tree) to operating system screen readers then schedules dynamic screen reads on status updates.",
        a11y: "Use aria-live='polite' to announce status updates without interrupting active user workflows.",
        practices: "✅ Best Practice: Ensure text-to-background contrast ratios are at least 4.5:1.\n❌ Common Mistake: Removing default outline focus indicators without styling a visible alternative.",
        interviews: "Q: What does aria-live='polite' do?\nA: It tells screen readers to wait until the user stops typing or reading before announcing dynamic update notifications.",
        telugu: "Real-time analogy (Blindfold Walk): Kanti choopu leni users screen readers text guidance updates and keyboard navigation use chesi internet search chestharu. Keyboard inputs buttons proper tab focus settings tabs tabs configurations templates sets.\n\nDetailed Tanglish explanation:\n- tabindex='0': div leda custom elements targets keyboard tab navigation support parameters controls.\n- focus-visible selectors: keyboard keys toggle outline focus visual borders only. mouse click focus outline hides.\n- aria-label credentials: Screen readers readable texts definitions setups coordinates.",
        exercise: "Add aria-label to a close button and style its focus-visible outline.",
        exerciseCss: `.close-btn:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 3px;
    border-radius: 4px;
}`
      }
    ]
  },
  {
    id: 2,
    title: "2. CSS Foundations",
    icon: <FaCss3Alt />,
    topics: [
      {
        name: "Selectors & Specificity",
        theory: "CSS Selectors target HTML elements. Specificity is the scoring system that determines which styles are applied when multiple rules target the same element (Inline = 1000, ID = 100, Class/Pseudo = 10, Element = 1).",
        whyExists: "Helps resolve style conflicts when different CSS selectors target the same elements, ensuring predictable rendering.",
        whenToUse: "Use selectors to structure CSS layouts. Keep specificity scores low to keep styles modular and easy to override.",
        codeCss: `/* Specificity: 0, 0, 1 */
div { color: red; }

/* Specificity: 0, 1, 0 */
.dashboard-title { color: blue; }

/* Specificity: 1, 0, 0 */
#header-title { color: green; }

/* Override specificity using inheritance architecture */
.nav-menu ul li a.active {
    color: #1d4ed8;
}`,
        explanation: "1. ID (#) selector has higher specificity than Class (.) selectors.\n2. Class selectors have higher specificity than basic tag (div, p) selectors.\n3. Inline styles override all external CSS rules except for !important.",
        browserInternals: "Matches selectors from right to left (e.g. finds all 'a', then filters to parent '.nav-menu') then calculates specificity weight then applies styles.",
        practices: "✅ Best Practice: Avoid using IDs for styling purposes; stick to class selectors.\n❌ Common Mistake: Overusing !important, which breaks style overrides and scaling.",
        interviews: "Q: What is the specificity score of '.nav-bar ul li a'?\nA: 1 class selector (10) + 3 element selectors (3) = 13.",
        telugu: "Real-time analogy (Priority System): Government job promotions lo seniority score hierarchy details priority index check selectors specifications. CSS specificity score overrides styling clashes selectors weight updates.\n\nDetailed Tanglish explanation:\n- inline styles = 1000 points priority index standard. ID selectors (#id) = 100 points class selectors (.) = 10 points tag selectors (div) = 1 point.\n- !important selector: standard rules overrides override breaks styles rules templates.",
        exercise: "Write styles for a button using a class selector and override its border on hover.",
        exerciseCss: `.action-btn {
    background-color: #1d4ed8;
    color: #fff;
    padding: 8px 16px;
    border: 1px solid transparent;
}
.action-btn:hover {
    border-color: #ffffff;
}`
      },
      {
        name: "Box Model",
        theory: "The CSS Box Model represents every element as a rectangular box, consisting of: Content (width/height), Padding (space inside borders), Border, and Margin (space outside borders). Setting box-sizing: border-box includes padding and borders in the element's total width.",
        whyExists: "By default (content-box), the browser adds padding and borders on top of the width, causing layouts to scale unpredictably and break grids.",
        whenToUse: "Always reset box-sizing globally in every CSS sheet using the * selector.",
        codeCss: `/* Global Box Model Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Container spacing rules */
.profile-card {
    width: 300px;
    padding: 20px;
    border: 2px solid #cbd5e1;
    margin: 15px auto;
    background-color: #ffffff;
}`,
        explanation: "1. box-sizing: border-box: Ensures the card's total width remains exactly 300px, including padding and borders.\n2. padding: Spacing inside the card boundary.\n3. margin: Spacing outside the card boundary, centering it horizontally.",
        browserInternals: "During Layout phase - calculates block element dimensions based on content space, padding, and margins - determines element boundaries.",
        practices: "✅ Best Practice: Always set box-sizing: border-box globally.\n❌ Common Mistake: Adding margins to adjacent elements and forgetting that vertical margins collapse.",
        interviews: "Q: What is the difference between border-box and content-box?\nA: In border-box, the defined width includes padding and borders. In content-box, padding and borders are added on top of the defined width, increasing the element's total size.",
        telugu: "Real-time analogy (Fragile Item Packing): Product inside glass item is Content. Bubble wrap sheets spacing padding. Cardboard boxes box outlines border. Outside distances margins standard spacing.\n\nDetailed Tanglish explanation:\n- box-sizing: border-box: padding scale size increases elements widths limits boundaries override. Width 300px unte exact width 300px constant checks calculations.\n- margin collapse: vertical side-by-side elements margins overlap overrides.",
        exercise: "Build a responsive card with 16px padding, a 1px border, and 24px margins.",
        exerciseCss: `.custom-card {
    box-sizing: border-box;
    max-width: 400px;
    padding: 16px;
    border: 1px solid #cbd5e1;
    margin: 24px;
}`
      },
      {
        name: "Flexbox Layout",
        theory: "Flexbox is a one-dimensional layout model. It manages alignment, spacing, distribution, and wrapping of child elements along a main axis (row) or cross axis (column).",
        whyExists: "Legacy layout techniques (like floats or table displays) were complex, required manual clearances, and did not support dynamic vertical centering.",
        whenToUse: "Use for navbars, card contents alignment, headers, sidebar item listings, and centering elements.",
        codeCss: `.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.flex-item-grow {
    flex-grow: 1;
}`,
        explanation: "1. display: flex: Activates Flexbox layout.\n2. justify-content: space-between: Distributes items evenly, pushing them to the container edges.\n3. align-items: center: Centers items vertically along the cross axis.",
        browserInternals: "Runs flex layout solver - calculates main-axis space - fits flexible child items based on flex-grow and flex-shrink rules.",
        practices: "✅ Best Practice: Use the gap property instead of margins for child spacing.\n❌ Common Mistake: Setting fixed widths on flex items, which prevents flexible scaling.",
        interviews: "Q: How do you center a div vertically and horizontally using Flexbox?\nA: Set display: flex, justify-content: center, and align-items: center on the parent container.",
        telugu: "Real-time analogy (Prayer Queue): Assembly line children row or columns height sequence ordering gap distributions setups configurations.\n\nDetailed Tanglish explanation:\n- display: flex: dynamic container row columns flex directions align sets.\n- justify-content: main-axis alignment distribution centers, align-items: cross-axis vertical centerings templates checks.",
        exercise: "Create a horizontal header with logo on left and links on right using Flexbox.",
        exerciseCss: `.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: #0f172a;
}`
      },
      {
        name: "Transitions, Transforms & Animations",
        theory: "Animations bring interfaces to life. CSS transitions animate state changes smoothly, transforms manipulate element position/size on the GPU, and keyframe animations create multi-step looping effects like spinners.",
        whyExists: "Sudden layout updates look jarring and unprofessional. Smooth animations improve user experience and make interfaces feel responsive and polished.",
        whenToUse: "Use transitions for hover/focus states, transforms for sliding modals and card lifts, and keyframes for loading spinners and skeleton screens.",
        whenNotToUse: "Avoid excessive animations that distract or cause motion sickness. Use prefers-reduced-motion media query for accessibility.",
        codeCss: `/* Hover card lift animation */
.animate-card {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    transform: translateY(0);
}
.animate-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* GPU-accelerated button scale */
.btn-scale {
    transition: transform 0.15s ease;
}
.btn-scale:active {
    transform: scale(0.96);
}

/* Loading spinner keyframe */
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

/* Skeleton loader pulse */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}`,
        explanation: "1. cubic-bezier: Custom timing curve gives smoother acceleration than linear ease.\n2. transform: translateY / scale: GPU-accelerated movement without triggering layout reflow.\n3. @keyframes: Defines animation checkpoints (from -> to or 0% -> 100%) the browser interpolates between.\n4. animation shorthand: name duration timing-function iteration-count.",
        browserInternals: "Browser separates transform/opacity changes onto the GPU Compositor thread - this bypasses Layout and Paint phases entirely, giving 60fps smooth animations without page jank.",
        practices: "✅ Best Practice: Only animate 'transform' and 'opacity'. Both run on the GPU compositor thread without triggering layout.\n❌ Common Mistake: Animating 'margin', 'top', 'left', or 'width' forces full layout recalculations causing frame drops.\n✅ Best Practice: Always include @media (prefers-reduced-motion: reduce) to disable animations for users with vestibular disorders.",
        interviews: "Q: Why is animating 'transform: translateY' better than animating 'top'?\nA: transform runs on the GPU compositor thread and skips Layout + Paint phases, giving 60fps performance. Animating 'top' triggers full layout recalculation on every frame causing jank.",
        telugu: "Real-time analogy (Smooth Cinema vs Slideshow): Chala paata projectors lo slides abrupt ga jump chestaayi. Modern movies lo movement smooth ga untundhi. Transition, transform combinations clean smooth animations 60fps dynamic UI experiences build chesthaayi.\n\nDetailed Tanglish explanation:\n- transition: hover color scale state smoothly timing curves (cubic-bezier) base changes handles.\n- transform: translation coordinates translateY scale rotate operations GPU acceleration direct render performance calculations updates.\n- keyframe loops: animation cycles loop templates keyframes 0% to 100% rotations targets checks.",
        exercise: "Create a loading spinner and a card that lifts on hover.",
        exerciseCss: `.custom-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
.lift-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.lift-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}`
      },
      {
        name: "CSS Variables & Theme Systems",
        theory: "CSS Custom Properties (variables) act as design tokens. Defining --primary-color once in :root and reusing it everywhere means one change updates the entire application. Combined with data-theme attributes, they power complete dark/light mode switches without JavaScript re-renders.",
        whyExists: "Enterprise apps have hundreds of components. Manually updating colors across every file leads to inconsistencies and bugs. Variables create a single source of truth.",
        whenToUse: "Use for colors, spacing scale, font sizes, border-radius, shadows - any repeated value in your design system.",
        whenNotToUse: "Don't use CSS variables for values that need to be computed in JavaScript logic. Use JS variables for that.",
        codeCss: `/* 1. Define design tokens in :root */
:root {
    --primary:     #2563eb;
    --primary-dk:  #1d4ed8;
    --bg:          #ffffff;
    --surface:     #f8fafc;
    --text:        #0f172a;
    --text-muted:  #64748b;
    --border:      #e2e8f0;
    --radius:      8px;
    --shadow:      0 4px 16px rgba(0,0,0,0.08);
}

/* 2. Dark mode override via data-theme attribute */
[data-theme="dark"] {
    --primary:    #3b82f6;
    --bg:         #0f172a;
    --surface:    #1e293b;
    --text:       #f8fafc;
    --text-muted: #94a3b8;
    --border:     #334155;
}

/* 3. Use variables in components */
body {
    background-color: var(--bg);
    color: var(--text);
    transition: background-color 0.3s, color 0.3s;
}

.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 24px;
}

.btn-primary {
    background: var(--primary);
    color: #fff;
    padding: 10px 20px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    transition: background 0.2s;
}
.btn-primary:hover {
    background: var(--primary-dk);
}`,
        explanation: "1. :root pseudo-class: Targets the topmost element (html) - variables defined here are globally accessible.\n2. var(--name, fallback): The fallback value is used if the variable is not defined.\n3. [data-theme='dark']: JavaScript toggles document.body.setAttribute('data-theme','dark') to switch themes instantly.",
        browserInternals: "CSS variables are resolved at computed-value time. When data-theme changes, the browser only re-cascades affected variable references - no full page repaint.",
        practices: "✅ Best Practice: Organize variables by category: --color-*, --space-*, --font-*, --radius-*, --shadow-*.\n✅ Best Practice: Always provide fallbacks: color: var(--text, #333).\n❌ Common Mistake: Naming variables too generically (--blue instead of --primary) making refactoring confusing.",
        interviews: "Q: How do you implement dark mode using only CSS?\nA: Define color tokens in :root, redefine them inside [data-theme='dark'] block, and toggle the attribute on <body> using a small JS toggle. The browser automatically re-applies all variable references.",
        telugu: "Real-time analogy (Global Brand Tokens): Corporate brand color design changes, global values update multi locations single change setups variables targets.\n\nDetailed Tanglish explanation:\n- :root values: topmost html tags global stylesheet design token values overrides sets.\n- data-theme switches: theme class toggle variables override dark light colors switches configurations.",
        exercise: "Create a themed card using CSS Variables, with a dark mode override.",
        exerciseCss: `:root {
    --card-bg: #ffffff;
    --card-text: #0f172a;
    --card-border: #e2e8f0;
}
[data-theme="dark"] {
    --card-bg: #1e293b;
    --card-text: #f8fafc;
    --card-border: #334155;
}
.themed-card {
    background: var(--card-bg);
    color: var(--card-text);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 20px;
    transition: background 0.3s, color 0.3s;
}`
      }
    ]
  },
  {
    id: 3,
    title: "3. UI Components",
    icon: <FaBoxOpen />,
    topics: [
      {
        name: "Buttons & Inputs",
        theory: "Enterprise UI components (like buttons and inputs) require states (hover, focus, disabled, active) and consistent styling, focus outlines, and size templates.",
        whyExists: "Default browser buttons and input controls look outdated, lack states, and do not adapt well to design themes.",
        whenToUse: "Always wrap form inputs and buttons in reusable styling layouts for consistent design themes.",
        codeHtml: `<button class="btn btn-primary" type="submit">Submit Query</button>
<button class="btn btn-primary" disabled>Loading...</button>
<div class="input-group">
    <label for="empCode" class="sr-only">Emp Code:</label>
    <input type="text" id="empCode" class="form-input" placeholder="BP-101" required />
</div>`,
        codeCss: `.btn {
    padding: 10px 20px;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-primary {
    background: #1d4ed8;
    color: #fff;
}
.btn-primary:hover {
    background: #1e40af;
}
.btn-primary:focus {
    outline: 3px solid rgba(29, 78, 216, 0.4);
}
.btn-primary:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

.input-group {
    margin-bottom: 16px;
}
.form-input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
}
.form-input:focus {
    border-color: #1d4ed8;
    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.15);
}`,
        explanation: "1. :focus states: Customizes outline glows for accessibility navigation.\n2. :disabled selector: Updates background color and changes cursor to not-allowed.\n3. sr-only class: Keeps the label visible to screen readers while hiding it visually.",
        browserInternals: "Loads stylesheets | overrides standard browser elements | renders custom border shadows and status transitions.",
        a11y: "Ensure outline borders are visible on keyboard focus to aid navigation.",
        practices: "✅ Best Practice: Keep active touch targets at least 44x44px for mobile devices.\n❌ Common Mistake: Removing focus outlines entirely without providing alternative styles.",
        interviews: "Q: How do you style disabled buttons in CSS?\nA: Use the :disabled pseudo-class selector to update background properties and set cursor: not-allowed.",
        telugu: "Real-time analogy (Physical Light Switch): Switch press chesthe visual indicators on/off toggles configurations setups. Custom buttons focus active disabled status overrides colors.\n\nDetailed Tanglish explanation:\n- pseudo-class states: :hover, :active, :focus, :disabled indicators templates controls.\n- sr-only screen readers readability updates label hiding controls.",
        exercise: "Build an input field that shows a red border when invalid.",
        exerciseCss: `.form-input:invalid {
    border-color: #ef4444;
}
.form-input:invalid:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}`
      },
      {
        name: "Cards & Modals",
        theory: "Cards display grouped information. Modals are overlay dialog boxes that temporarily capture user focus, requiring backdrop screens, close triggers, and keyboard focus locks.",
        whyExists: "Webpages need clean containers (Cards) and alert dialogs (Modals) to present notifications or prompt details without forcing page reloads.",
        whenToUse: "Use Cards for dashboards, and Modals for alerts, confirmations, or edit forms.",
        codeHtml: `<div class="card">
    <div class="card-header">Profile Detail</div>
    <div class="card-body">
        <p>Name: Prasad</p>
        <button class="btn btn-primary" onclick="openModal()">Edit Details</button>
    </div>
</div>

<!-- Backdrop modal container -->
<div class="modal-backdrop" id="modalBackdrop">
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <h3 id="modalTitle">Confirm Action</h3>
        <p>Are you sure you want to save modifications?</p>
        <div class="modal-actions">
            <button class="btn" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary">Confirm</button>
        </div>
    </div>
</div>`,
        codeCss: `.card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}
.card-header {
    background: #f8fafc;
    padding: 16px;
    font-weight: 700;
    border-bottom: 1px solid #e2e8f0;
}
.card-body {
    padding: 16px;
}

/* Modal styling sheets */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: none; /* Controlled via script/state */
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-content {
    background: #ffffff;
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}`,
        explanation: "1. position: fixed: Pins the modal backdrop to the viewport boundaries.\n2. z-index: 1000: Ensures the modal floats on top of other content.\n3. role='dialog': Semantic tag that informs screen readers of the active dialog box.",
        browserInternals: "Creates fixed layout window | overrides standard document layer order | stops base page scroll interactions.",
        a11y: "Add aria-modal='true' to focus screen readers inside the modal and prevent interactions with the background page.",
        practices: "✅ Best Practice: Allow closing the modal by pressing the Escape key or clicking the backdrop.\n❌ Common Mistake: Forgetting to lock focus inside the modal, letting keyboard users tab to background links.",
        interviews: "Q: How do you ensure screen readers treat modal popups as distinct modal windows?\nA: Use role='dialog', aria-modal='true', and match aria-labelledby to the modal title.",
        telugu: "Real-time analogy (Alert dialog): Main desk paper workspace details card blocks. Modal dialogue center view popup with background shade blocking backdrop.\n\nDetailed Tanglish explanation:\n- position: fixed: viewport screen scroll layers dynamic floats fixes. z-index sets layer stack visual indexes.\n- role='dialog' & aria-modal='true': Accessibility structures screen readers target modal active frames guidelines focus locks.",
        exercise: "Create a simple card UI with header, body content, and action button components.",
        exerciseHtml: `<div class="card" style="max-width: 300px;">
    <div class="card-header">Leave Balance</div>
    <div class="card-body">
        <p>12 Annual Leaves Remaining</p>
        <button class="btn btn-primary">Apply Leave</button>
    </div>
</div>`
      }
    ]
  },
  {
    id: 4,
    title: "4. Layout Development",
    icon: <FaLaptopCode />,
    topics: [
      {
        name: "Enterprise Dashboard Layout",
        theory: "An enterprise dashboard layout utilizes semantic HTML and CSS Grid/Flexbox to construct a responsive structural shell containing: sidebar, navbar top-rail, content pane, and footer.",
        whyExists: "Enterprise dashboards need a unified dashboard structure to display complex navigation drawers and widgets efficiently on different screen sizes.",
        whenToUse: "Use as the primary container shell layout for HRMS, CRM, and ERP system pages.",
        codeHtml: `<div class="dashboard-shell">
    <!-- 1. Left Drawer navigation -->
    <aside class="sidebar-drawer">
        <div class="logo">BharatPayroll</div>
        <nav class="sidebar-menu">
            <a href="#" class="active">Home</a>
            <a href="#">Employees</a>
            <a href="#">Payroll</a>
        </nav>
    </aside>

    <!-- 2. Main layout window -->
    <div class="main-window">
        <!-- Top bar navigation -->
        <header class="top-navbar">
            <button class="menu-toggle-btn">?</button>
            <div class="user-profile">Prasad</div>
        </header>

        <!-- Dynamic content wrapper -->
        <main class="content-pane">
            <h2>Welcome Admin Dashboard</h2>
            <div class="grid-layout">
                <div class="dashboard-card">Card 1</div>
                <div class="dashboard-card">Card 2</div>
            </div>
        </main>
    </div>
</div>`,
        codeCss: `.dashboard-shell {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
}
.sidebar-drawer {
    background: #0f172a;
    color: #ffffff;
    padding: 20px;
}
.sidebar-menu a {
    display: block;
    color: #cbd5e1;
    padding: 12px;
    text-decoration: none;
    border-radius: 6px;
}
.sidebar-menu a.active {
    background: #1e293b;
    color: #ffffff;
}
.main-window {
    display: flex;
    flex-direction: column;
    background: #f8fafc;
}
.top-navbar {
    height: 60px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid #e2e8f0;
}
.content-pane {
    padding: 24px;
    flex-grow: 1;
}
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}
.dashboard-card {
    background: #ffffff;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
    .dashboard-shell {
        grid-template-columns: 1fr;
    }
    .sidebar-drawer {
        display: none; /* Handle mobile drawer toggle state */
    }
}`,
        explanation: "1. grid-template-columns: 240px 1fr: Creates a fixed sidebar width while letting the content pane expand dynamically.\n2. min-height: 100vh: Forces the dashboard panel to occupy the entire viewport height.\n3. repeat(auto-fit, minmax(280px, 1fr)): Sets up a fluid, responsive card grid without requiring media queries.",
        browserInternals: "Loads Grid template configurations | positions sidebar and main panels | updates card counts based on resize events.",
        a11y: "Set aria-hidden='true' on the mobile sidebar toggle button when closed so screen readers ignore it.",
        practices: "✅ Best Practice: Use minmax parameters to prevent cards from shrinking too much.\n❌ Common Mistake: Using hardcoded pixel offsets, which break layouts when sidebars resize.",
        interviews: "Q: How do you build a responsive sidebar that adapts when viewports shrink?\nA: Define a Grid layout on the parent container, and use media queries at mobile breakpoints to collapse the sidebar or hide it behind a hamburger toggle.",
        telugu: "Real-time analogy (Office Cabin Partition): Grid structure cabins partitions. Left drawer navbar menu sidebar lists, main work desk dashboard grid modules scroll views.\n\nDetailed Tanglish explanation:\n- grid-template-columns: 240px 1fr: Sidebar size constant grid spacing left content panel fluid expand.\n- responsive media grid override mobile view grids columns values single row stack layouts.",
        exercise: "Write styles to hide the sidebar panel when screen sizes shrink below 768px.",
        exerciseCss: `@media (max-width: 768px) {
    .sidebar-drawer {
        display: none;
    }
}`
      }
    ]
  },
  {
    id: 5,
    title: "5. Responsive UI",
    icon: <FaMobileAlt />,
    topics: [
      {
        name: "Responsive Breakpoints",
        theory: "Responsive design uses media query breakpoints to adjust layouts for: Mobile (up to 480px), Tablet (481px to 768px), Laptop (769px to 1024px), and Desktop (1025px and up).",
        whyExists: "Users access web apps on different devices (phones, tablets, large monitors), requiring layouts that adapt automatically to each screen size.",
        whenToUse: "Always design websites using mobile-first styles, overriding rules at wider breakpoints.",
        codeCss: `/* Mobile First Base Styles (default) */
.content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
}

/* Tablet screens */
@media (min-width: 600px) {
    .content-grid {
        grid-template-columns: repeat(2, 1fr);
        padding: 24px;
    }
}

/* Desktop screens */
@media (min-width: 1024px) {
    .content-grid {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1200px;
        margin: 0 auto;
    }
}`,
        explanation: "1. default rules (mobile): Stacks elements vertically in a single column.\n2. @media (min-width: 600px): Renders 2 columns when viewports exceed 600px width.\n3. @media (min-width: 1024px): Displays a 4-column layout on large monitors, centering the content.",
        browserInternals: "Monitors screen resize events | matches active min-width breakpoint rules | overrides default stylesheet styles.",
        practices: "✅ Best Practice: Use relative units (rem, em) for media queries to handle text resizing gracefully.\n❌ Common Mistake: Defining too many narrow breakpoints, making CSS hard to maintain.",
        interviews: "Q: What is Mobile-First design, and why is it preferred?\nA: It starts by styling for the smallest screens first, adding layout complexity for larger viewports. This results in cleaner CSS and faster mobile load times.",
        telugu: "Real-time analogy (Bag Size Adjuster): Laptop monitor screen big bags layout, mobile screen pocket cases space fit controls layout resizing. Breakpoints screens size values media query overrides.\n\nDetailed Tanglish explanation:\n- media queries: @media (min-width: 600px) desktop custom tablet widths styling classes overrides.\n- mobile-first design: default screens simple layouts small mobile view size first styles rules, screen sizing increase breakpoint updates additions.",
        exercise: "Build a responsive element that stacks vertically on mobile but displays as a row on viewports wider than 768px.",
        exerciseCss: `.action-row {
    display: flex;
    flex-direction: column;
}
@media (min-width: 768px) {
    .action-row {
        flex-direction: row;
        justify-content: flex-end;
    }
}`
      }
    ]
  },
  {
    id: 6,
    title: "6. Enterprise Architecture",
    icon: <FaFolderOpen />,
    topics: [
      {
        name: "Enterprise UI Folder Layout",
        theory: "Enterprise frontend UI architecture structures directories, CSS Variables, and themes cleanly, using BEM (Block, Element, Modifier) rules to prevent style overrides.",
        whyExists: "Large projects with multiple developers often suffer from selector naming collisions and style overrides, causing layouts to break.",
        whenToUse: "Use this structural layout at the start of any enterprise React project.",
        codeCss: `/* Directory Architecture Structure Mock
src/
  ├── assets/styles/
  │     ├── _variables.css
  │     ├── _theme.css
  │     └── main.css
  └── components/
        └── Button/
              ├── Button.jsx
              └── Button.css
*/

/* BEM Naming Convention Example */
.card-block {
    background: #fff;
    padding: 20px;
}
/* Element inside block */
.card-block__title {
    font-size: 1.25rem;
    color: #000;
}
/* Modifier to card-block state */
.card-block--active {
    border-color: #1d4ed8;
}
.card-block__title--disabled {
    color: #94a3b8;
}`,
        explanation: "1. Block (__): Represents the main container element (e.g. .card-block).\n2. Element (__): Inner components (e.g. .card-block__title).\n3. Modifier (--): Styling states or variations (e.g. .card-block--active).",
        browserInternals: "Loads global CSS variables | builds class maps | matches simple BEM class names quickly, improving style lookup times.",
        practices: "✅ Best Practice: Structure layout states cleanly using BEM modifier tags.\n❌ Common Mistake: Creating deeply nested selectors (like .card div ul li a), which makes styles hard to maintain.",
        interviews: "Q: What is BEM methodology, and how does it prevent styling conflicts?\nA: BEM (Block-Element-Modifier) uses structured, flat class names. By avoiding nested CSS selectors, it prevents style conflicts and makes classes highly reusable.",
        telugu: "Real-time analogy (Labeled Folders in Office): Corporate offices files cabinets clear tags folders partition naming setups folder hierarchy. Flat CSS selector overrides naming conflicts BEM convention saves styling errors.\n\nDetailed Tanglish explanation:\n- BEM conventions: Block-Element-Modifier (e.g. .card-block__title--disabled) naming patterns CSS flat structure specificity clashes prevents.\n- Directory architecture: assets/styles variables structures module styling files separation folders clean setups.",
        exercise: "Write a button component using BEM conventions that supports primary and danger styles.",
        exerciseCss: `.c-btn {
    padding: 8px 16px;
    border-radius: 4px;
}
.c-btn--primary {
    background: #1d4ed8;
    color: #fff;
}
.c-btn--danger {
    background: #ef4444;
    color: #fff;
}`
      }
    ]
  }
];

const FrontendMasterclassPortal = () => {
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('theory');
  const [copied, setCopied] = useState(false);

  // Live Coding Sandbox State
  const [htmlCode, setHtmlCode] = useState('<div class="box"><h3>Hello Sandbox!</h3>\n<p>Edit HTML and click Run!</p>\n</div>');
  const [cssCode, setCssCode] = useState('.box {\n  background: #1e3a8a;\n  color: #ffffff;\n  padding: 20px;\n  border-radius: 8px;\n  text-align: center;\n  font-family: sans-serif;\n}');
  const [sandboxRefresh, setSandboxRefresh] = useState(0);
  const iframeRef = useRef(null);

  const activeModule = ROADMAP_MODULES[activeModuleIdx];
  const activeTopic = activeModule.topics[activeTopicIdx] || activeModule.topics[0];

  const handleCopy = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const updateSandboxPreview = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument || iframe.contentWindow.document;
      document.open();
      document.write(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body style="margin: 0; padding: 16px; background: #fafafa;">
            ${htmlCode}
          </body>
        </html>
      `);
      document.close();
    }
  }, [htmlCode, cssCode]);

  useEffect(() => {
    if (activeSubTab === 'sandbox') {
      updateSandboxPreview();
    }
  }, [activeSubTab, htmlCode, cssCode, sandboxRefresh, updateSandboxPreview]);

  const loadExerciseToSandbox = () => {
    if (activeTopic.exerciseHtml) setHtmlCode(activeTopic.exerciseHtml);
    if (activeTopic.exerciseCss) {
      setCssCode(activeTopic.exerciseCss);
    } else {
      setCssCode('/* Enter CSS rules here */');
    }
    setSandboxRefresh(prev => prev + 1);
    setActiveSubTab('sandbox');
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      
      {/* Page Title Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        color: '#fff',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.12)'
      }}>
        <Box display="inline-block" sx={{ px: 2, py: 0.5, borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#38bdf8', fontSize: '11px', fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Senior Frontend Architect Training
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
          Frontend Masterclass Portal
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#94a3b8', maxWidth: '850px', lineHeight: 1.6, fontSize: '15px' }}>
          Learn to independently design and build enterprise UIs from scratch. Master structural semantics, layouts, box models, components, responsiveness, and architecture patterns.
        </Typography>
      </Paper>

      {/* Grid container layout */}
      <Grid container spacing={3}>
        
        {/* Module Drawer Sidebar Selector */}
        <Grid item xs={12} md={3.5}>
          <Paper sx={{ 
            p: 2, 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}>
            <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 850, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Training Module:
            </Typography>
            
            {ROADMAP_MODULES.map((module, idx) => (
              <Button
                key={module.id}
                fullWidth
                onClick={() => { 
                  setActiveModuleIdx(idx); 
                  setActiveTopicIdx(0); 
                  setActiveSubTab('theory');
                }}
                startIcon={module.icon}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1.5,
                  px: 2,
                  borderRadius: '12px',
                  fontWeight: activeModuleIdx === idx ? 750 : 500,
                  bgcolor: activeModuleIdx === idx ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  color: activeModuleIdx === idx ? '#0284c7' : '#475569',
                  border: '1px solid',
                  borderColor: activeModuleIdx === idx ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(56, 189, 248, 0.05)',
                    borderColor: 'rgba(2, 132, 199, 0.1)'
                  }
                }}
              >
                {module.title}
              </Button>
            ))}

            <Divider sx={{ my: 1 }} />

            <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 850, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Module Topics:
            </Typography>

            {activeModule.topics.map((topic, idx) => (
              <Button
                key={topic.name}
                fullWidth
                onClick={() => { setActiveTopicIdx(idx); setActiveSubTab('theory'); }}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1,
                  px: 2,
                  fontWeight: activeTopicIdx === idx ? 700 : 500,
                  bgcolor: activeTopicIdx === idx ? '#f8fafc' : 'transparent',
                  color: activeTopicIdx === idx ? '#0f172a' : '#64748b',
                  fontSize: '13px',
                  borderLeft: activeTopicIdx === idx ? '3px solid #0284c7' : '3px solid transparent',
                  borderRadius: '0 8px 8px 0'
                }}
              >
                {topic.name}
              </Button>
            ))}
          </Paper>
        </Grid>

        {/* Dynamic Detail Workspace Viewport */}
        <Grid item xs={12} md={8.5}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            background: '#ffffff',
            minHeight: '500px'
          }}>
            
            {/* Title block */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 850, color: '#0f172a' }}>
                {activeTopic.name}
              </Typography>
              <Chip label={activeModule.title.split('. ')[1]} color="primary" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />
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
              <Tab value="code" label="2. Layout/CSS Codes" />
              <Tab value="explain" label="3. Line-by-Line & Internals" />
              <Tab value="a11y" label="4. A11y & Best Practices" />
              <Tab value="interviews" label="5. Interview Q&A" />
              <Tab value="telugu" label="6. Telugu Guide" />
              <Tab value="practice" label="7. Practice Exercise" />
              <Tab value="sandbox" label="8. Sandbox Playground" />
            </Tabs>

            {/* Sub-tab viewports */}

            {/* Sub-tab 1: Theory */}
            {activeSubTab === 'theory' && (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Introduction:</strong> {activeTopic.theory}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>Why it exists:</strong> {activeTopic.whyExists}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
                  <strong>When to use:</strong> {activeTopic.whenToUse}
                </Typography>
              </Box>
            )}

            {/* Sub-tab 2: Codes */}
            {activeSubTab === 'code' && (
              <Box display="flex" flexDirection="column" gap={3}>
                
                {/* HTML source block */}
                {activeTopic.codeHtml && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                        HTML Structure Setup
                      </Typography>
                      <Button size="small" onClick={() => handleCopy(activeTopic.codeHtml)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#0284c7', textTransform: 'none', fontSize: '12px' }}>
                        {copied ? 'Copied' : 'Copy HTML'}
                      </Button>
                    </Box>
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                      <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeTopic.codeHtml, 'html') }} />
                    </Box>
                  </Box>
                )}

                {/* CSS source block */}
                {activeTopic.codeCss && (
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 'bold' }}>
                        CSS Styling Definitions
                      </Typography>
                      <Button size="small" onClick={() => handleCopy(activeTopic.codeCss)} startIcon={copied ? <FaCheck /> : <FaCopy />} sx={{ color: copied ? '#10b981' : '#0284c7', textTransform: 'none', fontSize: '12px' }}>
                        {copied ? 'Copied' : 'Copy CSS'}
                      </Button>
                    </Box>
                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                      <pre style={{ margin: 0, background: '#1e1e1e', color: '#d4d4d4', padding: '20px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.6, fontFamily: '"Fira Code", monospace', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: highlightCode(activeTopic.codeCss, 'css') }} />
                    </Box>
                  </Box>
                )}

              </Box>
            )}

            {/* Sub-tab 3: Line-by-Line & Internals */}
            {activeSubTab === 'explain' && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Line-by-Line Details:</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {activeTopic.explanation}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Browser Internals Execution:</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                    {activeTopic.browserInternals}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Sub-tab 4: Accessibility & Best Practices */}
            {activeSubTab === 'a11y' && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Accessibility Considerations (ARIA / Landmarks):</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                    {activeTopic.a11y}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Best Practices & Common Pitfalls:</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {activeTopic.practices}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Sub-tab 5: Interview Questions */}
            {activeSubTab === 'interviews' && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>Common Interview Scenarios:</Typography>
                <Paper sx={{ p: 3, bgcolor: '#f8fafc', borderLeft: '4px solid #0284c7', borderRadius: '12px' }}>
                  <Typography variant="body2" sx={{ color: '#1e293b', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {activeTopic.interviews}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Sub-tab 6: Telugu translation */}
            {activeSubTab === 'telugu' && (
              <Paper sx={{ p: 3, bgcolor: '#f0f9ff', borderLeft: '5px solid #0284c7', borderRadius: '12px' }}>
                <Typography variant="subtitle2" sx={{ color: '#0369a1', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaBookOpen /> Telugu Masterclass Guide (Bilingual script):
                </Typography>
                <Typography variant="body2" sx={{ color: '#0c4a6e', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {activeTopic.telugu}
                </Typography>
              </Paper>
            )}

            {/* Sub-tab 7: Practice Exercise */}
            {activeSubTab === 'practice' && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>Coding Practice Challenge:</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                    {activeTopic.exercise}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={loadExerciseToSandbox} startIcon={<FaPlay />} sx={{ alignSelf: 'flex-start', textTransform: 'none', borderRadius: '8px' }}>
                  Load Challenge into Sandbox Playground
                </Button>
              </Box>
            )}

            {/* Sub-tab 8: Live Sandbox Playground */}
            {activeSubTab === 'sandbox' && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Typography variant="caption" color="textSecondary">
                  Practice coding here. Make modifications to the HTML and CSS panels and view live rendering updates instantly.
                </Typography>
                
                <Grid container spacing={2}>
                  
                  {/* HTML editor panel */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748b' }}>Edit HTML Markup:</Typography>
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      sx={{
                        mt: 0.5,
                        '& .MuiInputBase-root': {
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '12px',
                          bgcolor: '#1e1e1e',
                          color: '#d4d4d4'
                        }
                      }}
                    />
                  </Grid>

                  {/* CSS editor panel */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748b' }}>Edit CSS Styles:</Typography>
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      sx={{
                        mt: 0.5,
                        '& .MuiInputBase-root': {
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '12px',
                          bgcolor: '#1e1e1e',
                          color: '#d4d4d4'
                        }
                      }}
                    />
                  </Grid>

                </Grid>

                {/* Control bar */}
                <Box display="flex" gap={2}>
                  <Button variant="contained" color="success" onClick={updateSandboxPreview} startIcon={<FaPlay />} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                    Render Sandbox View
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => {
                    setHtmlCode('<div class="box"><h3>Refreshed!</h3></div>');
                    setCssCode('.box { background: #15803d; color: #fff; padding: 20px; text-align: center; border-radius: 8px; font-family: sans-serif; }');
                  }} startIcon={<FaRedo />} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                    Reset Sandbox Content
                  </Button>
                </Box>

                {/* Live rendering iframe preview */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748b' }}>Live Sandboxed Viewport Preview:</Typography>
                  <Box sx={{
                    mt: 1,
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    height: '240px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                  }}>
                    <iframe 
                      ref={iframeRef} 
                      title="live-sandbox-frame"
                      style={{ width: '100%', height: '100%', border: 'none' }} 
                    />
                  </Box>
                </Box>

              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FrontendMasterclassPortal;