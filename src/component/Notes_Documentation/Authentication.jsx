// AuthGuide.jsx
import React from 'react';

const Authentication = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#fefefe', lineHeight: '1.8' }}>
      <h1 style={{ color: '#2e7d32' }}>🔐 React Login & Role-Based Routing Guide (Telugu)</h1>

      {/* Step 1: Login.jsx */}
      <h2 style={{ color: '#1565c0' }}>📌 Step 1: Login Page (Login.jsx)</h2>
      <p>
        ఈ page లో మనం user login validate చేసి, <strong>localStorage</strong> లో login status మరియు user role save చేస్తాం.
        Example: admin@admin.com, password: admin123
      </p>
      <pre style={{ background: '#f3f3f3', padding: '10px' }}>
{`const fixedEmail = 'admin@admin.com';
const fixedPassword = 'admin123';
const fixedRole = 'admin';

if (formData.email === fixedEmail && formData.password === fixedPassword) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userRole', fixedRole);
  navigate('/dashboard');
}`}
      </pre>

      {/* Step 2: ProtectedRoute.jsx */}
      <h2 style={{ color: '#1565c0' }}>🛡️ Step 2: Protected Route (ProtectedRoute.jsx)</h2>
      <p>
        ఈ component validate చేస్తుంది: user login అయారా? మరియు role match అవుతుందా అనే విషయాలను.
      </p>
      <pre style={{ background: '#f3f3f3', padding: '10px' }}>
{`const RProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');

  if (!isLoggedIn) return <Navigate to="/" />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;

  return children;
};`}
      </pre>

      {/* Step 3: App.jsx */}
      <h2 style={{ color: '#1565c0' }}>🗺️ Step 3: App.jsx Routing Setup</h2>
      <p>Login, Unauthorized, Layout, Dashboard routes define చేస్తాం. Role-based access apply చేస్తాం.</p>
      <pre style={{ background: '#f3f3f3', padding: '10px' }}>
{`<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/unauthorized" element={<h2>🚫 Access Denied</h2>} />

    <Route
      path="/dashboard"
      element={
        <RProtectedRoute allowedRoles={['admin', 'user']}>
          <Layout />
        </RProtectedRoute>
      }
    >
      {/* Common routes */}
      <Route path="jsindex" element={<Index />} />
      <Route path="git" element={<GitGuide />} />

      {/* User-only */}
      <Route
        path="html"
        element={
          <RProtectedRoute allowedRoles={['user']}>
            <> <h3>HTML Page for User</h3> </>
          </RProtectedRoute>
        }
      />

      {/* Admin-only */}
      <Route
        path="css"
        element={
          <RProtectedRoute allowedRoles={['admin']}>
            <> <h3>CSS Page for Admin</h3> </>
          </RProtectedRoute>
        }
      />
    </Route>
  </Routes>
</Router>`}
      </pre>

      {/* Step 4: Optional Route List */}
      <h2 style={{ color: '#1565c0' }}>🗂️ Step 4: Dynamic Routes (Optional for 10+ routes)</h2>
      <p>Many routes ఉన్నప్పుడు ఈ structure use చేయొచ్చు: ఒక array లో routes define చేసి loop ద్వారా add చేయవచ్చు.</p>
      <pre style={{ background: '#f3f3f3', padding: '10px' }}>
{`const dashboardRoutes = [
  { path: 'jsindex', element: <Index />, roles: ['admin', 'user'] },
  { path: 'git', element: <GitGuide />, roles: ['admin', 'user'] },
  { path: 'css', element: <CSSPage />, roles: ['admin'] },
  { path: 'html', element: <HTMLPage />, roles: ['user'] },
];`}
      </pre>

      <p>
        App.jsx లో ఈ routes ని ఇలా loop చేయొచ్చు:
      </p>
      <pre style={{ background: '#f3f3f3', padding: '10px' }}>
{`{dashboardRoutes.map(({ path, element, roles }, idx) => (
  <Route
    key={idx}
    path={path}
    element={
      <RProtectedRoute allowedRoles={roles}>
        {element}
      </RProtectedRoute>
    }
  />
))}`}
      </pre>

      {/* Final Notes */}
      <h2 style={{ color: '#6a1b9a' }}>📘 Final Notes</h2>
      <ul>
        <li>🔐 Login page validates email/password → stores isLoggedIn + userRole</li>
        <li>🛡️ RProtectedRoute check చేస్తుంది login మరియు allowedRoles</li>
        <li>🚪 Logout చేయాలంటే: <code>localStorage.clear()</code></li>
        <li>📁 Route arrays use చేస్తే 100+ pages easy గా manage చేయొచ్చు</li>
        <li>👥 Example Roles: admin, user, student, manager</li>
      </ul>
    </div>
  );
};

export default Authentication;
