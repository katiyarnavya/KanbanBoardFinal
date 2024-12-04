import React from 'react';
import TicketCard from './TicketCard';
import three_dot_menu from '../assets/three_dot_menu.svg';
import Img_High_priority from '../assets/Img_High_Priority.svg'
import Img_Low_Priority from '../assets/Img_Low_Priority.svg'
import Img_Medium_Priority from '../assets/Img_Medium_Priority.svg'
import no_priority from '../assets/No-priority.svg'
import urgent_priority from '../assets/SVG_Urgent_Priority_grey.svg'
import add from '../assets/add.svg';
import to_do from '../assets/To-do.svg';
import backlog from '../assets/Backlog.svg';
import in_progress from '../assets/in-progress.svg';
import done from '../assets/Done.svg';
import Avatar from './Avatar';

const priorityMap = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const priorityLogoMap = {
  4: urgent_priority,
  3: Img_High_priority,
  2: Img_Medium_Priority,
  1: Img_Low_Priority,
  0: no_priority,
}

const statusMap = {
  "Todo": 1,
  "In progress": 2,
  "Backlog": 3,
  "Done": 4,
}
const statusLogoMap = {
  "Todo": to_do,
  "In progress": in_progress,
  "Backlog": backlog,
  "Done": done
}


const KanbanColumn = ({ group, title, tickets }) => {
  // console.log('title: ----- ', title, group);
  // console.log('tickets: ', tickets);
  const checkAvailability = () => {
    const ticket = tickets.find((ticket) => ticket.username == title);
    return ticket.available;
  }
  return (
    <div className="kanban-column">
      <div className='column-title'>
        <div>
          {
            group == "priority" && <img src={priorityLogoMap[title]} alt={priorityLogoMap[title]} className="priority" />
          }
          {
            group == "status" && <img src={statusLogoMap[title]} alt={statusLogoMap[title]} className="priority" />
          }
          {
            group == "user" && <><Avatar name={title} status={checkAvailability()} /> <span></span></>
          }
          <span className='column-title-name'>{priorityMap[title] ? priorityMap[title] : title}</span>
          <span className='column-title-count'> {tickets?.length} </span>
        </div>
        <div>
          <img src={add} alt="add" className="priority" />
          <img src={three_dot_menu} alt="menu" className="priority" />
        </div>
      </div>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} group={group} />
      ))}
    </div>
  );
};

export default KanbanColumn;
