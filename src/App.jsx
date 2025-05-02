import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Features from './Pages/Features';
import Templates from './Pages/Templates';
import Login from './Pages/Login';
import Navbar from './Components/NavBar';
import JiraAdminPage from './JiraPages/AdminJira';
import ProtectedRoute from './Components/ProtectRoute';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = [ '/jira', '/dashboard'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "flex-shrink-0" : ""} 
            style={{ minHeight: showNavbar ? 'calc(100vh - 56px)' : '100vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/jira" element={<JiraAdminPage />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<div className="container py-5 text-center">
            <h1>404 - Page Not Found</h1>
          </div>} />
        </Routes>
      </main>
    </>
  );
}

export default AppWrapper;