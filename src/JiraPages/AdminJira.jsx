export default function JiraAdminPage() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="container py-4">
        <h1 className="mb-4">Admin Dashboard</h1>
        <div className="alert alert-primary">
          Welcome, {user?.name} (Admin)
        </div>
        {/* Add your admin-specific content here */}
      </div>
    );
  }