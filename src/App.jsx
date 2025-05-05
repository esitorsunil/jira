import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Features from './Pages/Features';
import Templates from './Pages/Templates';
import Login from './Pages/Login';
import Navbar from './Components/NavBar';
import JiraAdminPage from './JiraPages/AdminJira';
import ProtectedRoute from './Components/ProtectRoute';
import MyTasks from './JiraPages/Tasks';

import Settings from './JiraPages/Settings';
import JiraHome from './JiraPages/JiraHome';
import Workspace from './JiraPages/Projects';
import MembersPage from './JiraPages/MembersPage';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/jira', '/jira/*', '/dashboard'];
  const showNavbar = !hideNavbarPaths.some(path => 
    location.pathname === path || location.pathname.startsWith(path.replace('*', ''))
  );

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

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/jira" element={<JiraAdminPage />}>
              <Route index element={<Navigate to="/jira/my-tasks" replace />} />
              <Route path="home" element={<JiraHome />} />
              <Route path="projects" element={<Workspace />} />
              <Route path="my-tasks" element={<MyTasks />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
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