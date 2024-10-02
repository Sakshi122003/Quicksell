import React from 'react';
import { FaCircle, FaRegCircle, FaCheckCircle, FaExclamationCircle, FaRegClock } from 'react-icons/fa';

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4: return <FaExclamationCircle className="urgent" />;
    case 3: return <FaRegClock className="high" />;
    case 2: return <FaRegClock className="medium" />;
    case 1: return <FaRegClock className="low" />;
    default: return <FaRegCircle className="no-priority" />;
  }
};

export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'backlog': return <FaRegCircle />;
    case 'todo': return <FaCircle className="todo" />;
    case 'in progress': return <FaRegClock className="in-progress" />;
    case 'done': return <FaCheckCircle className="done" />;
    default: return <FaRegCircle />;
  }
};

export const getGroupIcon = (group, grouping) => {
  if (grouping === 'status') return getStatusIcon(group);
  if (grouping === 'priority') return getPriorityIcon(['No priority', 'Low', 'Medium', 'High', 'Urgent'].indexOf(group));
  return <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${group}`} alt={group} />;
};
