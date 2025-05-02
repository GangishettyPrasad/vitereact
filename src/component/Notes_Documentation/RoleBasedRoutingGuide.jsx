import React from 'react';

const RoleBasedRoutingGuide = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#fffefc' }}>
      <h2 style={{ color: '#4a148c' }}>🔐 Role-Based Authentication & Routing – JSX + </h2>

      <h3 style={{ color: '#00695c' }}>📄 1. Login.jsx లో ఏమి జరుగుతుంది?</h3>
      <ul>
        <li><strong>useState</strong> తో form data (email/password) capture చేస్తాం.</li>
        <li><strong>Fixed credentials</strong> తో compare చేసి login success అయితే <strong>localStorage లో role మరియు isLoggedIn</strong> values save చేస్తాం.</li>
        <li><strong>navigate('/dashboard')</strong> తో protected route కి పంపుతాం.</li>
        <li>Example:
          <pre style={{ background: '#f3e5f5', padding: '10px' }}>
{`if (email === 'admin@site.com') {
  localStorage.setItem('role', 'admin');
  localStorage.setItem('isLoggedIn', 'true');
  navigate('/dashboard');
}`}          </pre>
        </li>
      </ul>

      <h3 style={{ color: '#00695c' }}>🛡️ 2. ProtectedRoute.jsx లో ఏమి జరుగుతుంది?</h3>
      <ul>
        <li><strong>localStorage</strong> నుండి user login అయ్యాడా లేదా అని check చేస్తుంది.</li>
        <li>Login అయితే <code>{`children`}</code> render చేస్తుంది, లేకపోతే <code>&lt;Navigate to="/" /&gt;</code> తో login page కి పంపుతుంది.</li>
        <li>Example:
          <pre style={{ background: '#e3f2fd', padding: '10px' }}>
{`const isLoggedIn = localStorage.getItem('isLoggedIn');
return isLoggedIn ? children : <Navigate to="/" />;`}          </pre>
        </li>
      </ul>

      <h3 style={{ color: '#00695c' }}>📂 3. App.js లో ఏమి జరుగుతుంది?</h3>
      <ul>
        <li>అన్ని routes define చేస్తాం: public (login), protected (dashboard + nested routes)</li>
        <li><strong>ProtectedRoute</strong> wrapper తో secure చేయడం.</li>
        <li><strong>Role-based</strong> pages like only admin/user access configuration చేస్తాం.</li>
        <li>Example:
          <pre style={{ background: '#fce4ec', padding: '10px' }}>
{`<Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
  <Route path="css" element={<ProtectedRoute allowedRoles={["admin"]}>...</ProtectedRoute>} />
</Route>`}          </pre>
        </li>
      </ul>

      <h3 style={{ color: '#00695c' }}>⚙️ 4. DynamicRoute.jsx (role based access)</h3>
      <ul>
        <li>ఈ file లో <strong>allowedRoles prop</strong> pass చేసి, localStorage నుండి role check చేస్తాం.</li>
        <li>User కి access ఉంటే <code>{`children`}</code> render చేస్తాం, లేకపోతే <strong>/unauthorized</strong> page కి పంపిస్తాం.</li>
        <li>Example:
          <pre style={{ background: '#fff3e0', padding: '10px' }}>
{`const userRole = localStorage.getItem('role');
if (allowedRoles.includes(userRole)) {
  return children;
} else {
  return <Navigate to="/unauthorized" />;
}`}          </pre>
        </li>
      </ul>

      <h3 style={{ color: '#4e342e' }}>💡 Real-Time Strategy (Simple vs Complex)</h3>
      <p>
        ✅ <strong>Simple Project:</strong> 1 user/admin – Login, save role, protect route with just isLoggedIn check.<br/>
        ✅ <strong>Large Project (100+ routes):</strong>
        Use centralized <strong>AuthContext</strong> or config-based dynamic routing structure.
      </p>

      <h3 style={{ color: '#1a237e' }}>🎯 Summary (Easy Reference)</h3>
      <ol>
        <li><strong>Login.jsx</strong>: Role + Login logic (store in localStorage)</li>
        <li><strong>ProtectedRoute.jsx</strong>: Login check</li>
        <li><strong>DynamicRoute.jsx</strong>: Role check (admin/user)</li>
        <li><strong>App.js</strong>: Routes definition + wrapper usage</li>
      </ol>
    </div>
  );
};

export default RoleBasedRoutingGuide;
