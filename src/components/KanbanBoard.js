import React from 'react';
import './KanbanBoard.css';
import { FaCircle, FaRegCircle, FaCheckCircle, FaExclamationCircle, FaRegClock } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return <FaExclamationCircle className="urgent" />;
      case 3: return <FaRegClock className="high" />;
      case 2: return <FaRegClock className="medium" />;
      case 1: return <FaRegClock className="low" />;
      default: return <FaRegCircle className="no-priority" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'backlog': return <FaRegCircle />;
      case 'todo': return <FaCircle className="todo" />;
      case 'in progress': return <FaRegClock className="in-progress" />;
      case 'done': return <FaCheckCircle className="done" />;
      default: return <FaRegCircle />;
    }
  };

  const groupTickets = () => {
    let groupedTickets = {};

    if (grouping === 'status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        (acc[user.name] = acc[user.name] || []).push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        (acc[priorityNames[ticket.priority]] = acc[priorityNames[ticket.priority]] || []).push(ticket);
        return acc;
      }, {});
    }

    return groupedTickets;
  };

  const sortTickets = (ticketsToSort) => {
    if (sorting === 'priority') {
      return ticketsToSort.sort((a, b) => b.priority - a.priority);
    } else if (sorting === 'title') {
      return ticketsToSort.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketsToSort;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, groupTickets]) => (
        <div key={group} className="column">
          <div className="column-header">
            <div className="group-icon">
              {grouping === 'status' && getStatusIcon(group)}
              {grouping === 'priority' && getPriorityIcon(priorityNames.indexOf(group))}
              {grouping === 'user' && <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${group}`} alt={group} />}
            </div>
            <h2>{group}</h2>
            <span className="ticket-count">{groupTickets.length}</span>
            <div className="column-actions">
              <IoAdd />
              <BsThreeDots />
            </div>
          </div>
          {sortTickets(groupTickets).map(ticket => (
            <div key={ticket.id} className="card">
              <div className="card-header">
                <span className="ticket-id">{ticket.id}</span>
                {grouping !== 'user' && (
                  <img 
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${users.find(u => u.id === ticket.userId)?.name}`} 
                    alt={users.find(u => u.id === ticket.userId)?.name} 
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
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;