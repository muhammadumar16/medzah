import Categories from "components/Shop/Category/Categories";
import {
  PRODUCTDETAILS,
  PRODUCTDETAILS2,
  PRODUCTDETAILS3,
  PRODUCTDETAILS4,
  PRODUCTDETAILS5,
} from "constants/shopConstants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";
import TopCategories from "components/Shop/TopCategories";
import { TOPCATEGORIES } from "constants/topCategoriesConstants";
// import { allProducts } from "constants/Products/productsDetails";
import { useSelector } from "react-redux";

export const Shop = () => {
  const searchTerm = useSelector((state) => state?.entities?.users?.searchTerm);
  const allProducts = useSelector((state) => state?.entities?.cart?.products);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  console.log("All Products Shop =>>", allProducts);

  useEffect(() => {
    feather.replace();
    filterProducts(searchTerm);
  }, [searchTerm]);

  const filterProducts = (term) => {
    if (!term) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.ProductTitle.toLowerCase().includes(term.toLowerCase()) ||
          product.Sku.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => {
    feather.replace();
  }, []);
  const selectHandler = () => {
    console.log("pressed");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="layout-specing">
          <div className="d-md-flex justify-content-between">
            <div>
              <h5 className="mb-0">Shop</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-1">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item text-capitalize">
                    <Link to="/">Medzah</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-capitalize active"
                    aria-current="page"
                  >
                    Shop
                  </li>
                </ul>
              </nav>
            </div>
            {/* <div className="mt-4 mt-sm-0">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-product"
              >
                Add Product
              </button>
            </div> */}
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h5 className="mb-0">All Products</h5>
            </div>
            {/*end col*/}
          </div>
          {filteredProducts?.length === 0 ? (
            <p style={{ marginTop: 20, color: "red" }}>
              Sorry, we couldn't find any products matching "{searchTerm}".
              Please try a different search term.
            </p>
          ) : (
            <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-2 row-cols-1">
              <Categories
                select={filteredProducts ? filteredProducts : allProducts}
                selectHandler={selectHandler}
              />
            </div>
          )}

          {/* <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-2 row-cols-1">
            <Categories
              select={filteredProducts}
              selectHandler={selectHandler}
            />
          </div> */}
          {/* <div className="row mt-4">
            <div className="col-12">
              <h5 className="mb-0">Top Categories</h5>
            </div>
          </div>
          <div className="row">
            <TopCategories
              select={TOPCATEGORIES}
              selectHandler={selectHandler}
            />
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h5 className="mb-0">Recent Products</h5>
            </div>
          </div>
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-2 row-cols-1">
            <Categories select={PRODUCTDETAILS} selectHandler={selectHandler} />
            <Categories
              select={PRODUCTDETAILS2}
              selectHandler={selectHandler}
            />
            <Categories
              select={PRODUCTDETAILS3}
              selectHandler={selectHandler}
            />
            <Categories
              select={PRODUCTDETAILS4}
              selectHandler={selectHandler}
            />
            <Categories
              select={PRODUCTDETAILS5}
              selectHandler={selectHandler}
            />
          </div> */}
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="add-product"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom p-3">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Shop Product
              </h5>
              <button
                type="button"
                className="btn btn-icon btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4 text-dark" />
              </button>
            </div>
            <div className="modal-body p-3 pt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-grid me-md-4">
                    <p className="text-muted">
                      Upload your shop image here, Please click "Upload Image"
                      Button.
                    </p>
                    <div className="preview-box d-block justify-content-center rounded shadow overflow-hidden bg-light p-1" />
                    <input
                      type="file"
                      id="input-file"
                      name="input-file"
                      accept="image/*"
                      onchange="{handleChange()}"
                      hidden
                    />
                    <label
                      className="btn-upload btn btn-primary mt-4"
                      htmlFor="input-file"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mt-4 mt-sm-0">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Shop Title <span className="text-danger">*</span>
                          </label>
                          <input
                            name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Title :"
                          />
                        </div>
                      </div>
   
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label"> Price: </label>
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text border bg-transparent"
                              id="basic-addon1"
                            >
                              $
                            </span>
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              placeholder="Price"
                              aria-label="Price"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                      </div>
        
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Label:</label>
                          <select className="form-control">
                            <option value="FE">Featured</option>
                            <option value="NE">New</option>
                            <option value="PO">Popular</option>
                            <option value="RE">Recent</option>
                            <option value="FR">Free</option>
                          </select>
                        </div>
                      </div>
               
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label"> Rating : </label>
                          <input
                            name="time"
                            type="text"
                            className="form-control"
                            id="time"
                            defaultValue={0}
                          />
                        </div>
                      </div>
                 
                      <div className="col-lg-12 text-end">
                        <button type="submit" className="btn btn-primary">
                          Add Product
                        </button>
                      </div>
            
                    </div>
                  </form>
                </div>
       
              </div>

            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
