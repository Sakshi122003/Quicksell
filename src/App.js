import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
    localStorage.setItem('sorting', newSorting);
  };

  return (
    <div className="app">
      <Header 
        grouping={grouping} 
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <main>
        <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
      </main>
    </div>
  );
}

export default App;