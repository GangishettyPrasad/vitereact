const DynamicRoutesGuide = () => {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#fff3e0' }}>
        <h2 style={{ color: '#e65100' }}>📦 DynamicRoutes.jsx – 100+ Page Support</h2>
  
        <p>🔁 Backend నుండి వచ్చే role ఆధారంగా dynamic గానే routes ని generate చేస్తాం. Easy for big apps.</p>
  
        <pre style={{ background: '#ffe0b2', padding: '1rem', borderRadius: '10px', color: '#e65100' }}>
  {`// 👉 Example rolePages config
  const rolePages = {
    admin: [
      { path: 'css', element: <AdminPage /> },
      { path: 'git', element: <GitGuide /> }
    ],
    user: [
      { path: 'html', element: <HtmlPage /> },
      { path: 'git', element: <GitGuide /> }
    ]
  };
  
  const DynamicRoutes = ({ role }) => {
    const routes = rolePages[role] || [];
  
    return (
      <>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute allowedRoles={[role]}>{element}</ProtectedRoute>}
          />
        ))}
      </>
    );
  };
  
  export default DynamicRoutes;`}
        </pre>
      </div>
    );
  };
  
  export default DynamicRoutesGuide;
  