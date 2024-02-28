import React from "react";

const SignupFormInput = ({ label, icon, placeholder, name, type }) => {
  return (
    <div className="mb-2">
      {/* <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label> */}
      {/* <div className="form-icon position-relative"> */}
      {/* <i data-feather={icon} className="fea icon-sm icons" /> */}
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
      />
    </div>
    // </div>
  );
};

export default SignupFormInput;
