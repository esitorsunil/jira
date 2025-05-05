// components/Workspace.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkspace, setCurrentWorkspace } from '../store/workSpaceSlice';
import WorkspaceSwitcher from './workspaceSwitcher';

export default function Workspace() {
  const [showModal, setShowModal] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const dispatch = useDispatch();
  const { workspaces, currentWorkspace } = useSelector((state) => state.workspace);

  const handleCreateWorkspace = () => {
    if (workspaceName.trim()) {
      const newWorkspace = {
        id: Date.now(),
        name: workspaceName
      };
      dispatch(addWorkspace(newWorkspace));
      dispatch(setCurrentWorkspace(newWorkspace));
      setWorkspaceName('');
      setShowModal(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Workspace Switcher */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {currentWorkspace 
            ? `Projects in ${currentWorkspace.name}` 
            : 'Create a project'}
        </h2>
        <WorkspaceSwitcher />
      </div>

      {/* Create Workspace Button */}
      <div className="text-end mb-3">
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus"></i> Create Workspace
        </button>
      </div>

      {/* Workspace Creation Modal */}
      {showModal && (
        <div className="modal-backdrop show d-flex align-items-center justify-content-center">
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create New Workspace</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="workspaceName" className="form-label">Workspace Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="workspaceName"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="Enter workspace name"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleCreateWorkspace}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}