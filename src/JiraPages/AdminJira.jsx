import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import JiraHeader from './JiraHeader';
import { useSelector } from 'react-redux';

export default function AdminJira() {
  const { sidebarExpanded } = useSelector((state) => state.ui); // Get state from Redux

  return (
    <div className="d-flex vh-100">
      <SideNavbar />
      
      <div 
        className="flex-grow-1 d-flex flex-column"
        style={{ 
          marginLeft: sidebarExpanded ? '240px' : '72px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <JiraHeader />
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}