import React from 'react';
import { getPriorityIcon } from '../utils/iconUtils';

function KanbanCard({ ticket, users, grouping }) {
  const user = users.find(u => u.id === ticket.userId);

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <img 
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`} 
            alt={user?.name} 
            className="user-avatar"
          />
        )}
      </div>
      <h3>{ticket.title}</h3>
      <div className="card-footer">
        {grouping !== 'priority' && getPriorityIcon(ticket.priority)}
        <div className="tag">{ticket.tag}</div>
      </div>
    </div>
  );
}

export default KanbanCard;