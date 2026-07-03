import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

// Global automatic VS-Code syntax highlighter
if (typeof window !== 'undefined') {
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const highlightElement = (el) => {
    if (el.getAttribute('data-highlighted') === 'true') return;
    el.setAttribute('data-highlighted', 'true');

    const code = el.textContent;
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

    // 3. Escape HTML
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
      'window', 'JSON', 'axios', 'CryptoJS', 'map', 'filter', 'reduce', 'forEach', 'flatMap', 'some', 'every', 'find'
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

    el.innerHTML = tokenized;
  };

  const runHighlight = () => {
    const preEls = document.querySelectorAll('pre');
    preEls.forEach(el => {
      const codeEl = el.querySelector('code');
      if (codeEl) {
        highlightElement(codeEl);
      } else {
        highlightElement(el);
      }
    });
  };

  // Run on mount and periodically to support dynamically rendered code sheets
  window.addEventListener('DOMContentLoaded', runHighlight);
  setInterval(runHighlight, 1000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
