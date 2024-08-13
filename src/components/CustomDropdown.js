import React, { useState } from "react";

function CustomDropdown({ options, selectedOption, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false); 
  };

  return (
    <div className="custom-dropdown">
      <button 
        className={`dropdown-toggle ${isOpen ? 'dropdown-toggle-open' : ''}`} 
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="dropdown-menu-custom">
          {options.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(option)} 
              className="dropdown-item-custom"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
