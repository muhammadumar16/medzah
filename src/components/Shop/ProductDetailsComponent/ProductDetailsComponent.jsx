import React from "react";
import PropTypes from "prop-types";
import ImagesComponent from "./ImagesComponent";
import Details from "./Details";
import DescriptionInfo from "./DescriptionInfo";
//import { Test } from './ProductDetails.styles';

const ProductDetails = (props) => {
  const { item } = props;
  return (
    <>
      <div className="card border-0 rounded p-4 shadow mt-4">
        <div className="row align-items-center">
          <ImagesComponent item={item} />
          <Details item={item} />
        </div>
      </div>
      <div className="row">{/* <DescriptionInfo item={item} /> */}</div>
    </>
  );
};

ProductDetails.propTypes = {
  // bla: PropTypes.string,
};

ProductDetails.defaultProps = {
  // bla: 'test',
};

export default ProductDetails;
