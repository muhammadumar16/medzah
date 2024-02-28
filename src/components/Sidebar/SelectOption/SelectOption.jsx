import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SelectOption = (props) => {
  const { options } = props;
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (optionId) => {
    setActiveOption(optionId);
  };

  return (
    <div className="sidebar-submenu d-block">
      <ul>
        {options?.map((option) => (
          <li
            key={option.id}
            className={option.id === activeOption ? "active" : ""}
          >
            <Link to={option.link} onClick={() => handleOptionClick(option.id)}>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

SelectOption.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectOption;
