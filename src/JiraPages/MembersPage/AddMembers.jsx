// components/AddMemberModal.js
export default function AddMemberModal({ 
    show, 
    onClose, 
    newMember, 
    onNewMemberChange, 
    onAddMember 
  }) {
    return (
      <div className={`modal ${show ? 'show d-block' : ''}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Member</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <MemberForm 
                member={newMember} 
                onChange={onNewMemberChange} 
              />
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={onAddMember}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function MemberForm({ member, onChange }) {
    return (
      <>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={member.name}
            onChange={(e) => onChange({...member, name: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={member.email}
            onChange={(e) => onChange({...member, email: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={member.domain}
            onChange={(e) => onChange({...member, domain: e.target.value})}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
            <option value="QA">QA</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={member.role}
            onChange={(e) => onChange({...member, role: e.target.value})}
          >
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="guest">Guest</option>
          </select>
        </div>
      </>
    );
  }