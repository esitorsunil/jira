import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function SideNavbar() {
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { path: "/jira/home", icon: "bi-house", label: "Home" },
    { path: "/jira/projects", icon: "bi-folder", label: "Workspace" },
    { path: "/jira/my-tasks", icon: "bi-list-check", label: "My Tasks" },
    { path: "/jira/members", icon: "bi-people", label: "Members" },
    { path: "/jira/settings", icon: "bi-gear", label: "Settings" }
  ];

  return (
    <div className={`sidenav bg-dark text-white ${expanded ? 'expanded' : 'collapsed'}`}
         style={{
           width: expanded ? '240px' : '72px',
           transition: 'width 0.3s ease'
         }}>
      {/* Toggle Button */}
      <div className="toggle-btn d-flex justify-content-end p-3">
        <button 
          className="btn btn-sm btn-outline-light rounded-circle text-blue"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
        >
          <i className={`bi bi-chevron-${expanded ? 'left' : 'right'}`}></i>
        </button>
      </div>

      {/* Logo */}
      <div className="logo-area px-3 mb-4 d-flex align-items-center text-white">
        <i className="bi bi-kanban fs-4 me-2"></i>
        {expanded && <span className="fw-bold">Jira Admin</span>}
      </div>

      {/* Navigation Links */}
      <nav className="nav flex-column px-2 text-white">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `nav-link d-flex align-items-center py-3 px-3 rounded mb-1 text-white ${isActive ? 'bg-primary' : 'hover-bg-dark'}`
            }
          >
            <i className={`bi ${item.icon} me-3 fs-5`}></i>
            {expanded && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}