import React from 'react';

const ModulesGuideUI = () => {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>📦 JavaScript Modules: export/import Guide</h1>

      <h2>🔸 Named Export</h2>
      <pre>
{`// Export
export const greet = (name) => \`Hello, \${name}!\`;

// Import
import { greet } from './file';
`}
      </pre>
      <p><strong>Telugu:</strong> ఒకే ఫైల్ నుండి ఒకదానికంటే ఎక్కువ ఫంక్షన్లను export చేయడానికి ఉపయోగిస్తారు.</p>

      <h2>🔹 Default Export</h2>
      <pre>
{`// Export
export default function greet(name) {
  return \`Hi \${name}!\`;
}

// Import
import greet from './file';
`}
      </pre>
      <p><strong>Telugu:</strong> ఒక ఫైల్ లో ఒకే ఒక్క main export ఉండే సందర్భాలలో ఉపయోగిస్తారు.</p>

      <h2>🚀 Dynamic Import</h2>
      <pre>
{`// Usage
const module = await import('./file');
const result = module.functionName();
`}
      </pre>
      <p><strong>Telugu:</strong> అవసరమైనప్పుడు మాత్రమే module ని load చేసుకోవచ్చు. ఇది performance improve చేయటానికి ఉపయోగపడుతుంది.</p>

      <h2>📊 Comparison Table</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Type</th>
            <th>Export Syntax</th>
            <th>Import Syntax</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Named</td>
            <td><code>export const fn = () =&gt;</code></td>
            <td><code>import {'{ fn }'} from '...'</code></td>
            <td>Multiple exports per file</td>
          </tr>
          <tr>
            <td>Default</td>
            <td><code>export default fn</code></td>
            <td><code>import fn from '...'</code></td>
            <td>Single main export</td>
          </tr>
          <tr>
            <td>Dynamic</td>
            <td>–</td>
            <td><code>const m = await import('...')</code></td>
            <td>Load only when needed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModulesGuideUI;
