export const groupTickets = (tickets, users, grouping) => {
    const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  
    switch (grouping) {
      case 'status':
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
          return acc;
        }, {});
      case 'user':
        return tickets.reduce((acc, ticket) => {
          const user = users.find(u => u.id === ticket.userId);
          (acc[user.name] = acc[user.name] || []).push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          (acc[priorityNames[ticket.priority]] = acc[priorityNames[ticket.priority]] || []).push(ticket);
          return acc;
        }, {});
      default:
        return {};
    }
  };
  
  export const sortTickets = (tickets, sorting) => {
    switch (sorting) {
      case 'priority':
        return [...tickets].sort((a, b) => b.priority - a.priority);
      case 'title':
        return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };
  