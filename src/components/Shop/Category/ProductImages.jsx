import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductImages = (props) => {
  const { imageOptions } = props;
  console.log("Image", imageOptions);
  return (
    <>
      {imageOptions?.map((option) => (
        <Link
          key={option.id}
          to={option.imageLink}
          className={option?.imageStyle}
        >
          <img src={option.image} className="img-fluid" alt />
        </Link>
      ))}
    </>
  );
};

ProductImages.propTypes = {};

export default ProductImages;
