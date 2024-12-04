import React, { useState } from 'react';
import './Header.css';
import down from '../assets/down.svg';
import display from '../assets/Display.svg';

const Header = ({ onGroupChange, onSortChange }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [groupValue, setGroupValue] = useState("status");
  const [orderValue, setOrderValue] = useState("priority");

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="header">
      <div className="dropdown">
        {/* Dropdown Toggle Button */}
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <img src={display} alt="display" className="dropdown-icon" />
          <span className='display'>Display</span> <img src={down} alt="down" className="dropdown-icon" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <div className='selection'>
                <span>Grouping </span>
                <select value={groupValue} onChange=
                  {(e) => {
                    const group = e.target.value;
                    onGroupChange(group);
                    closeDropdown();
                    setGroupValue(group)
                  }
                  }
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </li>
            <li>

              <div className='selection'>
                <span>Ordering </span>
                <select value={orderValue} onChange={(e) => {
                  const order = e.target.value;
                  onSortChange(order)
                  closeDropdown();
                  setOrderValue(order)
                }}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div >
  );
};

export default Header;
