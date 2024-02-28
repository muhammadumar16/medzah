import ProductDetailsComponent from "components/Shop/ProductDetailsComponent";
import { PRODUCTSDATA } from "constants/Products/productsDetails";
import React from "react";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

export const ProductDetails = ({ route }) => {
  const allProducts = useSelector((state) => state?.entities?.cart?.products);
  console.log("Productdetails allproduct", allProducts);
  const { id } = useParams();
  console.log("ID", id);
  const item = allProducts.find((item) => item.Id === parseInt(id));
  return (
    <div className="layout-specing">
      <div className="d-md-flex justify-content-between align-items-center">
        <h5 className="mb-0">{item.ProductTitle}</h5>
        <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
          <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
            <li className="breadcrumb-item text-capitalize">
              <Link to="/">Medzah</Link>
            </li>
            <li className="breadcrumb-item text-capitalize">
              <Link to="/shop">Shop</Link>
            </li>
            {/* <li
              className="breadcrumb-item text-capitalize active"
              aria-current="page"
            >
              {item.description}
            </li> */}
          </ul>
        </nav>
      </div>
      <ProductDetailsComponent item={item} />
    </div>
  );
};
