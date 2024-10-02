import React from 'react';
import KanbanCard from './KanbanCard';
import { BsThreeDots } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { getGroupIcon } from '../utils/iconUtils';

function KanbanColumn({ group, tickets, users, grouping }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="group-icon">
          {getGroupIcon(group, grouping)}
        </div>
        <h2>{group}</h2>
        <span className="ticket-count">{tickets.length}</span>
        <div className="column-actions">
          <IoAdd />
          <BsThreeDots />
        </div>
      </div>
      {tickets.map(ticket => (
        <KanbanCard key={ticket.id} ticket={ticket} users={users} grouping={grouping} />
      ))}
    </div>
  );
}

export default KanbanColumn;
