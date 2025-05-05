export default function Features() {
    const features = [
      {
        title: "Kanban Boards",
        description: "Visualize your workflow and optimize task management",
        icon: "bi-kanban"
      },
      {
        title: "Scrum Support",
        description: "Full agile methodology support with sprints and backlogs",
        icon: "bi-speedometer2"
      },
      {
        title: "Custom Workflows",
        description: "Tailor your workflow to match your team's process",
        icon: "bi-diagram-3"
      }
    ];
  
    return (
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">Our Features</h1>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className={`bi ${feature.icon} text-primary fs-1 mb-3`}></i>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }