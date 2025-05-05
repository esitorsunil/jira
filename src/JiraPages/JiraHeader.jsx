import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileDropdown, closeProfileDropdown } from '../store/uiSlice';

export default function JiraHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const { profileDropdownOpen } = useSelector((state) => state.ui);

  useEffect(() => { 
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(closeProfileDropdown());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(closeProfileDropdown());
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    dispatch(closeProfileDropdown());
  };

  const toggleDropdown = () => {
    dispatch(toggleProfileDropdown());
  };

  return (
    <header className="bg-white shadow-sm py-2 px-4 d-flex align-items-center justify-content-end">
      {/* Profile Icon with Dropdown */}
      <div ref={dropdownRef} className="position-relative">
        {user && (
          <div className="d-flex align-items-center">
            <button 
              onClick={toggleDropdown}
              className="btn btn-link p-0 border-0"
              aria-label="Profile menu"
              aria-expanded={profileDropdownOpen}
            >
              <img 
                src={user.avatar || 'https://i.pravatar.cc/40'} 
                alt="Profile" 
                className="rounded-circle"
                width="40"
                height="40"
              />
            </button>

            {/* Dropdown Card */}
            {profileDropdownOpen && (
              <div 
                className="position-absolute end-0 mt-1 card shadow-sm" 
                style={{ 
                  width: '200px', 
                  zIndex: 1000,
                  top: '100%' // This ensures it appears below the profile icon
                }}
              >
                <div className="card-body p-3">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={user.avatar || 'https://i.pravatar.cc/40'} 
                      alt="Profile" 
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      <small className="text-muted">{user.role}</small>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogoutClick}
                    className="btn btn-sm btn-outline-danger w-100"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal show d-flex align-items-center justify-content-center">
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowLogoutConfirm(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to logout?</p>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 