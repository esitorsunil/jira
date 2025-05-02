export default function Templates() {
    const templates = [
      { name: "Software Development", category: "Development" },
      { name: "Marketing Campaign", category: "Marketing" },
      { name: "Bug Tracking", category: "IT" }
    ];
  
    return (
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">Project Templates</h1>
        
        <div className="row g-4">
          {templates.map((template, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{template.category}</span>
                  <h3>{template.name}</h3>
                  <button className="btn btn-sm btn-outline-primary mt-2">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }