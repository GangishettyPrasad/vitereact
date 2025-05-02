const RoleBasedRoutingGuide = () => {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI', lineHeight: 1.8, backgroundColor: '#fffdf5' }}>
        <h1 style={{ color: '#4a148c', marginBottom: '1.5rem' }}>🔐 Multi-User Role-Based Routing System – Step-by-Step Guide (Telugu + JSX Format)</h1>
  
        {/* Step 1: Login.jsx */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a237e' }}>1️⃣ Login.jsx – Multiple User Login (Role Based)</h2>
          <p><strong>Login.jsx</strong> లో predefined users array create చేసి, login submit ayyaka role ni localStorage లో store chestham.</p>
          <pre style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>{`
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const users = [
      { email: 'admin@site.com', password: 'admin123', role: 'admin' },
      { email: 'user@site.com', password: 'user123', role: 'user' },
      { email: 'editor@site.com', password: 'edit123', role: 'editor' },
    ];
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
  
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', user.role);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    };
  
    return (
      <div>
        <h2>🔐 Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} placeholder="Enter Email" /><br /><br />
          <input type="password" name="password" onChange={handleChange} placeholder="Enter Password" /><br /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;`}</pre>
        </section>
  
        {/* Step 2: ProtectedRoute.jsx */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a237e' }}>2️⃣ ProtectedRoute.jsx – General Login Check</h2>
          <p>Login ayyaka access ivvadaniki simple check:</p>
          <pre style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>{`
  import { Navigate } from 'react-router-dom';
  
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? children : <Navigate to="/" />;
  };
  
  export default ProtectedRoute;`}</pre>
        </section>
  
        {/* Step 3: RProtectedRoute.jsx */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a237e' }}>3️⃣ RProtectedRoute.jsx – Role-Based Protected Routes</h2>
          <p>Role based access kosam:</p>
          <pre style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>{`
  import { Navigate } from 'react-router-dom';
  
  const RProtectedRoute = ({ allowedRoles, children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('role');
  
    return isLoggedIn && allowedRoles.includes(userRole)
      ? children
      : <Navigate to="/unauthorized" />;
  };
  
  export default RProtectedRoute;`}</pre>
        </section>
  
        {/* Step 4: App.js – Role-based Routes Setup */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a237e' }}>4️⃣ App.js – Complete Route Setup (Common + Role-Based)</h2>
          <p>App.js లో routes nii groups gaa divide cheyali. Eg:</p>
          <pre style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>{`
  <Route path="/" element={<Login />} />
  <Route path="/unauthorized" element={<h2>🚫 Unauthorized</h2>} />
  
  <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
  
    {/* Common Pages */}
    <Route path="home" element={<MyTabs />} />
    <Route path="git" element={<GitGuide />} />
  
    {/* Admin Only */}
    <Route path="adminpanel" element={
      <RProtectedRoute allowedRoles={['admin']}>
        <AdminPanel />
      </RProtectedRoute>
    } />
  
    {/* User Only */}
    <Route path="profile" element={
      <RProtectedRoute allowedRoles={['user']}>
        <UserProfile />
      </RProtectedRoute>
    } />
  
    {/* Editor Only */}
    <Route path="editor" element={
      <RProtectedRoute allowedRoles={['editor']}>
        <EditorDashboard />
      </RProtectedRoute>
    } />
  </Route>`}</pre>
        </section>
  
        {/* Step 5: Handling 100+ Routes with Role Mapping */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#1a237e' }}>5️⃣ DynamicRouteConfig.jsx – 100+ Routes Dynamic Setup</h2>
          <p>Role wise route objects create cheyandi and `.map()` tho render cheyyandi:</p>
          <pre style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>{`
  const routeConfig = [
    { path: 'adminpanel', element: <AdminPanel />, roles: ['admin'] },
    { path: 'profile', element: <UserProfile />, roles: ['user'] },
    { path: 'editor', element: <EditorDashboard />, roles: ['editor'] },
    { path: 'git', element: <GitGuide />, roles: ['admin', 'user', 'editor'] },
  ];
  
  // In App.js
  {routeConfig.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <RProtectedRoute allowedRoles={route.roles}>
          {route.element}
        </RProtectedRoute>
      }
    />
  ))}`}</pre>
          <p><strong>➡️ Ivi scale avuthayi, 100+ routes, 10+ roles easy ga handle cheyyachu.</strong></p>
        </section>
  
       <>
       <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.8', background: '#f5f5ff', color: '#222' }}>
      <h2 style={{ color: '#4a148c' }}>🔐 Login Authentication + Role Based Routing ()</h2>

      <p><strong style={{ color: '#00695c' }}>Step 1: Login Page</strong> – <code style={{ backgroundColor: '#fff3e0' }}>Login.jsx</code> లో ఉన్నది.</p>
      <pre style={{ background: '#263238', color: '#fff', padding: '1rem', borderRadius: '10px' }}>
{`1️⃣ User email & password check చేస్తాం
2️⃣ login success అయితే: localStorage లో isLoggedIn, role save చేస్తాం
3️⃣ navigate('/dashboard')`}
      </pre>
      
      <p style={{ color: '#1e88e5' }}><strong>Code:</strong></p>
      <pre style={{ background: '#eceff1', padding: '1rem', borderRadius: '10px', overflowX: 'auto' }}>
{`const handleSubmit = (e) => {
  e.preventDefault();
  if (email === 'admin@site.com' && password === 'admin123') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', 'admin');
    navigate('/dashboard');
  }
}`}
      </pre>

      <hr />

      <p><strong style={{ color: '#6a1b9a' }}>Step 2: ProtectedRoute</strong> – <code style={{ backgroundColor: '#ede7f6' }}>ProtectedRoute.jsx</code></p>
      <pre style={{ background: '#263238', color: '#fff', padding: '1rem', borderRadius: '10px' }}>
{`isLoggedIn === 'true' అయితే మాత్రమే children render చేస్తుంది
లేదంటే Navigate("/") తో login page కి పంపుతుంది.`}
      </pre>
      <p style={{ color: '#1e88e5' }}><strong>Code:</strong></p>
      <pre style={{ background: '#eceff1', padding: '1rem', borderRadius: '10px', overflowX: 'auto' }}>
{`const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/" />;
}`}
      </pre>

      <hr />

      <p><strong style={{ color: '#006064' }}>Step 3: RProtectedRoute (Role Based)</strong> – <code style={{ backgroundColor: '#e0f7fa' }}>RProtectedRoute.jsx</code></p>
      <pre style={{ background: '#263238', color: '#fff', padding: '1rem', borderRadius: '10px' }}>
{`allowedRoles లో user role వుంటే children render అవుతుంది
లేదంటే Navigate("/unauthorized") కు పంపుతుంది.`}
      </pre>
      <p style={{ color: '#1e88e5' }}><strong>Code:</strong></p>
      <pre style={{ background: '#eceff1', padding: '1rem', borderRadius: '10px', overflowX: 'auto' }}>
{`const RProtectedRoute = ({ allowedRoles, children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');
  if (!isLoggedIn) return <Navigate to="/" />;
  return allowedRoles.includes(role) ? children : <Navigate to="/unauthorized" />;
}`}
      </pre>

      <hr />

      <p><strong style={{ color: '#b71c1c' }}>Step 4: App.js</strong> – Main Routing Structure</p>
      <pre style={{ background: '#263238', color: '#fff', padding: '1rem', borderRadius: '10px' }}>
{`/dashboard → ProtectedRoute → Layout
/dashboard/html → RProtectedRoute(['user'])
/dashboard/css → RProtectedRoute(['admin'])
/dashboard/myTabs → Common page`}
      </pre>
      <p style={{ color: '#1e88e5' }}><strong>Code Sample:</strong></p>
      <pre style={{ background: '#eceff1', padding: '1rem', borderRadius: '10px', overflowX: 'auto' }}>
{`<Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
  <Route path="myTabs" element={<MyTabs />} />
  <Route path="html" element={<RProtectedRoute allowedRoles={['user']}><Html /></RProtectedRoute>} />
  <Route path="css" element={<RProtectedRoute allowedRoles={['admin']}><Css /></RProtectedRoute>} />
</Route>`}
      </pre>

      <hr />

      <p><strong style={{ color: '#33691e' }}>Step 5: Dynamic Routes Handling (100+ routes)</strong> – <code style={{ backgroundColor: '#f1f8e9' }}>DynamicRouteConfig.js</code></p>
      <p>మీ app లో 100+ pages ఉంటే, array లో route definitions ఉంచి <strong>map</strong> తో loop చేయడం ఉత్తమం:</p>
      <pre style={{ background: '#eceff1', padding: '1rem', borderRadius: '10px', overflowX: 'auto' }}>
{`const routes = [
  { path: 'git', role: ['admin', 'user'], element: <GitGuide /> },
  { path: 'reactdatatable', role: ['admin'], element: <ReactDataTable /> },
];

{routes.map(({ path, role, element }) => (
  <Route key={path} path={path} element={<RProtectedRoute allowedRoles={role}>{element}</RProtectedRoute>} />
))}`}
      </pre>

      <p style={{ marginTop: '2rem', color: '#4a148c' }}><strong>✅ ఈ structure ఉపయోగించి మీరు scalable & secure React app create చేయవచ్చు 🔐</strong></p>
    </div>
       </>
      </div>
    );
  };
  
  export default RoleBasedRoutingGuide;
  