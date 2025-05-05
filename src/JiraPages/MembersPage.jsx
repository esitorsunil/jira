// components/MembersPage.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, updateMemberRole, removeMember, addMember } from '../store/memberSlice';
import MembersTable from './MembersPage/MembersTable';
import AddMemberModal from './MembersPage/AddMembers';

export default function MembersPage() {
  const dispatch = useDispatch();
  const { list: members, status } = useSelector((state) => state.members);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'developer',
    domain: 'Frontend'
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Sorting function
  const sortedMembers = [...members].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRoleChange = (id, newRole) => {
    dispatch(updateMemberRole({ id, role: newRole }));
  };

  const handleRemoveMember = (id) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      dispatch(removeMember(id));
    }
  };

  const handleAddMember = () => {
    dispatch(addMember(newMember));
    setNewMember({
      name: '',
      email: '',
      role: 'developer',
      domain: 'Frontend'
    });
    setShowAddModal(false);
  };

  if (status === 'loading') return <div className="text-center py-5">Loading members...</div>;
  if (status === 'failed') return <div className="alert alert-danger">Error loading members</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workspace Members</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          Add Member
        </button>
      </div>

      <MembersTable
        members={sortedMembers}
        onRoleChange={handleRoleChange}
        onRemoveMember={handleRemoveMember}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <AddMemberModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newMember={newMember}
        onNewMemberChange={setNewMember}
        onAddMember={handleAddMember}
      />
    </div>
  );
}