import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductBadges = (props) => {
  const { ProductBadges } = props;
  console.log(ProductBadges);
  return (
    <ul className="label list-unstyled mb-0">
      {ProductBadges?.map((option) => (
        <li key={option?.id}>
          <Link to={option?.link} className={option?.badge}>
            {option?.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

ProductBadges.propTypes = {};

export default ProductBadges;
