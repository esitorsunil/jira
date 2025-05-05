// components/MembersTable.js


export default function MembersTable({ 
  members, 
  onRoleChange, 
  onRemoveMember, 
  sortConfig, 
  onSort 
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <TableHeader 
              label="Name" 
              sortKey="name" 
              sortConfig={sortConfig} 
              onSort={onSort} 
            />
            <TableHeader 
              label="Email" 
              sortKey="email" 
              sortConfig={sortConfig} 
              onSort={onSort} 
            />
            <TableHeader 
              label="Department" 
              sortKey="domain" 
              sortConfig={sortConfig} 
              onSort={onSort} 
            />
            <TableHeader 
              label="Role" 
              sortKey="role" 
              sortConfig={sortConfig} 
              onSort={onSort} 
            />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberRow 
              key={member.id} 
              member={member} 
              onRoleChange={onRoleChange} 
              onRemoveMember={onRemoveMember} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({ label, sortKey, sortConfig, onSort }) {
  return (
    <th 
      onClick={() => onSort(sortKey)}
      style={{ cursor: 'pointer' }}
    >
      {label}
      {sortConfig.key === sortKey && (
        <i className={`bi bi-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'}`} />
      )}
    </th>
  );
}

function MemberRow({ member, onRoleChange, onRemoveMember }) {
  return (
    <tr>
      <td>{member.name}</td>
      <td>{member.email}</td>
      <td>{member.domain}</td>
      <td>
        <select
          className="form-select form-select-sm"
          value={member.role}
          onChange={(e) => onRoleChange(member.id, e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="guest">Guest</option>
        </select>
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onRemoveMember(member.id)}
          disabled={member.role === 'admin'}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}