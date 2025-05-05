// components/WorkspaceSwitcher.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentWorkspace } from '../store/workspaceSlice';

export default function WorkspaceSwitcher() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { workspaces, currentWorkspace } = useSelector((state) => state.workspace);

  const handleWorkspaceChange = (workspace) => {
    dispatch(setCurrentWorkspace(workspace));
    setShowDropdown(false);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {currentWorkspace ? currentWorkspace.name : 'Select Workspace'}
      </button>
      <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
            className="dropdown-item"
            onClick={() => handleWorkspaceChange(workspace)}
          >
            {workspace.name}
          </button>
        ))}
      </div>
    </div>
  );
}