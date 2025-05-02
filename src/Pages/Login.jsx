import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('admin@jiraclone.com');
  const [password, setPassword] = useState('admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://esitorsunil.github.io/jira-clone-data/user.json');
      const users = response.data.users;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }));

        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/jira');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-10">
            <div className="card overflow-hidden shadow" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                {/* Left Side - Login Form */}
                <div className="col-md-6 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5">
                    <div className="text-center mb-4">
                      <div className="bg-primary text-white p-3 rounded mb-3 d-inline-block">
                        <h2 className="m-0">JIRA CLONE</h2>
                      </div>
                      <h3 className="fw-bold mb-2">Welcome Back</h3>
                      <p className="text-muted">Please enter your credentials</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="alert alert-danger">
                          {error}
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control form-control-lg" 
                          id="email" 
                          placeholder="name@company.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                          type="password" 
                          className="form-control form-control-lg" 
                          id="password" 
                          placeholder="••••••••" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="remember" />
                          <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-decoration-none small text-primary">
                          Forgot password?
                        </Link>
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing In...
                          </>
                        ) : 'Sign In'}
                      </button>
                      <div className="text-center">
                        <p className="text-muted mb-0">Don't have an account? 
                          <Link to="/signup" className="text-decoration-none text-primary ms-1">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right Side - Branded Image */}
                <div className="col-md-6 d-none d-md-block bg-primary">
                  <div className="h-100 d-flex flex-column justify-content-center align-items-center text-white p-4" 
                       style={{
                         backgroundImage: 'linear-gradient(rgba(0, 82, 204, 0.9), rgba(0, 82, 204, 0.9)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center'
                       }}>
                    <h2 className="display-5 fw-bold mb-4 text-center">Jira Management Tool</h2>
                    <p className="lead text-center mb-5">
                      The ultimate solution for agile project management
                    </p>
                    <div className="d-flex gap-3">
                      {['kanban', 'people', 'graph-up'].map((icon, i) => (
                        <div key={i} className="text-center">
                          <i className={`bi bi-${icon} fs-1 mb-2`}></i>
                          <p className="m-0 small">
                            {icon === 'kanban' && 'Kanban Boards'}
                            {icon === 'people' && 'Team Collaboration'}
                            {icon === 'graph-up' && 'Advanced Analytics'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}