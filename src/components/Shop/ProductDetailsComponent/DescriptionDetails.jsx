import React from "react";
import PropTypes from "prop-types";

const DescriptionDetails = (props) => {
  const { select } = props;
  return (
    <ul className="list-unstyled text-muted">
      {select?.descriptionDetails?.map((options) => (
        <li key={options.id} className="mb-0">
          <span className="text-primary h5 me-2">
            <i className="uil uil-check-circle align-middle" />
          </span>
          {options.details}
        </li>
      ))}
    </ul>
  );
};

DescriptionDetails.propTypes = {};

export default DescriptionDetails;
