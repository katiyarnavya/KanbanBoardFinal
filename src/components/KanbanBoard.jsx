import React, { useEffect, useState } from 'react';
import Header from './Header';
import KanbanColumn from './KanbanColumn';
import { fetchData } from '../utils/api';

const priorityMap = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};
const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState('status');
  const [sort, setSort] = useState('priority');

  useEffect(() => {
    fetchData().then((data) => {
      setTickets(data.tickets);
      setUsers(data.users);
    });
  }, []);

  const getGroupedData = () => {
    let groupedData = {};
    tickets.forEach((ticket) => {
      let key = ticket[group];
      const user = users.find((u) => u.id === ticket.userId);
      if (group === 'user') {
        key = user ? user.name : 'Unassigned';
      }
      ticket.username = user.name;
      ticket.available = user.available
      if (!groupedData[key]) groupedData[key] = [];
      groupedData[key].push(ticket);
    });

    if (sort === 'priority') {
      Object.keys(groupedData).forEach((key) => {
        groupedData[key].sort((a, b) => b.priority - a.priority);
      });
    } else if (sort === 'title') {
      Object.keys(groupedData).forEach((key) => {
        groupedData[key].sort((a, b) => a.title.localeCompare(b.title));
      });
    }
    Object.keys(groupedData).forEach((key) => {
      groupedData[key] = groupedData[key].map((ticket) => ({
        ...ticket,
        priority: priorityMap[ticket.priority] || 'Unknown Priority',
      }));
    });

    return groupedData;
  };

  return (
    <div className='kanban'>
      <Header onGroupChange={setGroup} onSortChange={setSort} />
      <div className="kanban-board">
        {Object.entries(getGroupedData()).map(([groupKey, tickets]) => (
          // {console.log(groupKey,tickets)};
          <KanbanColumn key={groupKey} group={group} title={groupKey} tickets={tickets} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
