import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductIcons = (props) => {
  const { colorIcons } = props;

  return (
    <ul className="list-unstyled shop-icons">
      {colorIcons?.map((option) => (
        <li key={option?.id} className={option?.margin}>
          <Link to={option?.link} className={option?.colorStyle}>
            <i data-feather={option?.icon} className="icons" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

ProductIcons.propTypes = {};

export default ProductIcons;
