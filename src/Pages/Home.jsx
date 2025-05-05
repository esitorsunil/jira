import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Project Management <span className="text-warning">Made Simple</span>
              </h1>
              <p className="lead mb-4">
                Organize, track, and manage your agile projects with our Jira-inspired platform.
              </p>
              <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-light btn-lg px-4">
                  Get Started
                </Link>
                <Link to="/features" className="btn btn-outline-light btn-lg px-4">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Dashboard Preview" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Key Features</h2>
          <div className="row g-4">
            {['Kanban Boards', 'Scrum Support', 'Real-time Collaboration'].map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <i className={`bi bi-${index === 0 ? 'kanban' : index === 1 ? 'speedometer2' : 'people'} text-primary fs-1 mb-3`}></i>
                    <h5>{feature}</h5>
                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/features" className="btn btn-sm btn-outline-primary">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}