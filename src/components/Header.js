import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

function Header({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <div className="display-button" onClick={() => setShowDropdown(!showDropdown)}>
        <IoFilterSharp /> Display <FaChevronDown />
      </div>
      {showDropdown && (
        <div className="dropdown">
          <div>
            <label>Grouping</label>
            <select onChange={(e) => onGroupingChange(e.target.value)} value={grouping}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label>Ordering</label>
            <select onChange={(e) => onSortingChange(e.target.value)} value={sorting}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;