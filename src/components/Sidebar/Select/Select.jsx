import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Select = (props) => {
  const { select, style, active, selectHandler } = props;
  const cart = useSelector((state) => state?.entities?.cart?.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <li className={`d-flex align-items-center ${active ? "active" : ""}`}>
        <Link
          to={select.link}
          onClick={selectHandler}
          className="d-flex align-items-center"
          style={style}
        >
          <i className={select.icon} />
          {select.label}
        </Link>
        {select.badge && (
          <span className="ms-auto badge rounded-pill bg-danger mx-4">
            {getTotalQuantity() || 0}
          </span>
        )}
      </li>
    </>
  );
};

Select.propTypes = {
  // bla: PropTypes.string,
};

Select.defaultProps = {
  // bla: 'test',
};

export default Select;

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import SelectOption from "../SelectOption/SelectOption";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// // import "./style.css";

// const Select = (props) => {
//   const { select, handCarts, style } = props;
//   const cart = useSelector((state) => state?.entities?.cart?.cart);
//   const getTotalQuantity = () => {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.quantity;
//     });
//     return total;
//   };
//   const [showDropDown, setShowDropDown] = useState(false);
//   const active = "sidebar-dropdown active";
//   const deActive = "sidebar-dropdown";

//   return (
//     <>
//       <li className="d-flex align-items-center">
//         {/* {select.label === "My Profile" && (
//           <div
//             style={{
//               borderTop: "1px solid #ddd",
//               marginTop: "5px",
//               padding: "5px 5px",
//               width: "90%",
//               // margin: "0 auto",
//               position: "absolute",
//               left: 20,
//               bottom: 55,
//             }}
//           />
//         )} */}
//         <Link
//           to={select.link}
//           onClick={() => setShowDropDown((prevState) => !prevState)}
//           className="d-flex align-items-center"
//           style={style}
//         >
//           <i className={select.icon} />
//           {select.label}
//         </Link>
//         {select.badge && (
//           <span className="ms-auto badge rounded-pill bg-danger mx-4">
//             {getTotalQuantity() || 0}
//           </span>
//         )}
//       </li>
//     </>
//   );
// };

// Select.propTypes = {
//   // bla: PropTypes.string,
// };

// Select.defaultProps = {
//   // bla: 'test',
// };

// export default Select;
