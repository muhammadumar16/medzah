import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Size = (props) => {
  const { select } = props;
  console.log(select.productSizes);
  return (
    <ul className="list-unstyled mb-0 ms-3">
      {select?.productSizes?.map((options) => (
        <li
          key={options.id}
          className={
            options.id === 1 ? "list-inline-item" : "list-inline-item ms-1"
          }
        >
          <Link to="#" className="btn btn-icon btn-soft-primary">
            {options.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Size.propTypes = {};

export default Size;
