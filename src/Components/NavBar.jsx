import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-2">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <span className="fw-bold text-dark">
            <i className="bi bi-kanban-fill me-2 text-primary"></i>
            Jira Management Tool
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler"
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link text-dark ${isActive ? 'text-primary fw-semibold' : ''}`
                } 
                to="/features"
              >
                Features
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link text-dark ${isActive ? 'text-primary fw-semibold' : ''}`
                } 
                to="/templates"
              >
                Templates
              </NavLink>
            </li>
          </ul>

          {/* Signin Button */}
          <div className="d-flex">
            <Link 
              to="/login" 
              className="btn btn-primary"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}