import React, { useState } from 'react';

const ManageTeam = () => {
  const [teamName, setTeamName] = useState('My Team'); // Example team name
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Alice', role: 'Owner' },
    { name: 'Bob', role: 'Admin' },
  ]); // Example team members
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('User');

  const handleInvite = () => {
    setTeamMembers([...teamMembers, { name: newMemberName, role: newMemberRole }]);
    setNewMemberName('');
  };

  const handleChangeRole = (index, role) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].role = role;
    setTeamMembers(updatedMembers);
  };

  const handleRemove = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>{`Manage Team: ${teamName}`}</h2>
      <div>
        <h3>Team Members:</h3>
        {teamMembers.map((member, index) => (
          <div key={index}>
            <span>{member.name} - {member.role}</span>
            <select onChange={(e) => handleChangeRole(index, e.target.value)} value={member.role}>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Invite New Member:</h3>
        <input type="text" placeholder="Name" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
        <select onChange={e => setNewMemberRole(e.target.value)} value={newMemberRole}>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button onClick={handleInvite}>Invite</button>
      </div>
    </div>
  );
};

export default ManageTeam;