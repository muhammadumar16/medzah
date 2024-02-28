import React from "react";
import PropTypes from "prop-types";

const ProductRating = (props) => {
  const { rating } = props;
  return (
    <div>
      <ul className="list-unstyled text-warning mb-0">
        {rating?.map((option) => (
          <li key={option?.id} className="list-inline-item">
            <i className={option.iconName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductRating.propTypes = {};

export default ProductRating;
