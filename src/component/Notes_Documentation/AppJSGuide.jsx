const AppJSGuide = () => {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI', background: '#f1f8e9' }}>
        <h2 style={{ color: '#33691e' }}>🗺️ App.js – Route Definitions</h2>
  
        <p>🔄 <strong>Login</strong>, <strong>Dashboard</strong>, <strong>Protected Routes</strong> అన్నీ ఇక్కడ define చేయాలి. Role ఆధారంగా protection కలదు.</p>
  
        <pre style={{ background: '#dcedc8', padding: '1rem', borderRadius: '10px', color: '#33691e' }}>
  {`import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Login from './Login';
  import ProtectedRoute from './ProtectedRoute';
  import Layout from './Layout';
  import Unauthorized from './Unauthorized';
  import HtmlPage from './pages/HtmlPage';
  import AdminPage from './pages/AdminPage';
  import UserPage from './pages/UserPage';
  
  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* 💼 Role-Based Nested Routes */}
            <Route
              path="html"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="css"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default App;`}
        </pre>
      </div>
    );
  };
  
  export default AppJSGuide;
  