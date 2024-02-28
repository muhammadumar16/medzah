import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addShoppingList, addToCart, removeShoppingList } from "store/cart";
import { currencySymbol } from "utility/Currency";
import "./model.css";

const Details = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ListItems = useSelector((state) => state?.entities?.cart?.shoppinglist);
  const { item } = props;
  const {
    Id,
    ProductTitle,
    ManufactureName,
    Sku,
    ManufactureNo,
    lstProductUnitAssociates,
  } = item;
  const initialUnit = lstProductUnitAssociates[0];
  const [selectedUnit, setSelectedUnit] = useState(initialUnit);
  const [price, setPrice] = useState(initialUnit.Price);

  const [createNewItem, setCreateNewItem] = useState(false);
  const [name, setName] = useState("");
  const image = item?.lstProductImages[0]?.ProductImage;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {}, [ListItems]);
  const handleCart = () => {
    console.log("selected Unit", selectedUnit);
    try {
      dispatch(
        addToCart({
          Id,
          ManufactureName,
          Sku,
          ManufactureNo,
          ProductTitle,
          image,
          quantity: quantity,
          UnitID: selectedUnit.UnitID,
          ...selectedUnit,
          lstProductUnitAssociates,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToList = () => {
    dispatch(addShoppingList(name));
    setName("");
    setCreateNewItem(false);
  };

  const handleRemoveList = (itemId) => {
    console.log(itemId);
    dispatch(removeShoppingList(itemId));
  };

  return (
    <>
      <div
        className="modal fade my-5 mx-5"
        id="add-product"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom p-3">
              <div className="column">
                <h5 className="modal-title" id="exampleModalLabel">
                  Shopping List
                </h5>
                <h6 className="mt-3">
                  Need to create a new Wishlist?{" "}
                  <button
                    onClick={() => setCreateNewItem(true)}
                    className="link-button"
                  >
                    Create Wishlist
                  </button>
                </h6>
              </div>

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
                <div className="col-md-12 mt-4 mt-sm-0">
                  {(ListItems?.length === 0 || createNewItem === true) && (
                    <form>
                      <div className="row">
                        <div className="col-8  ">
                          <div className="mb-3 ">
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control"
                              placeholder="Please Provide Your List Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 ">
                          <button
                            type="button"
                            onClick={handleAddToList}
                            className="btn btn-primary"
                          >
                            Add New List
                          </button>
                          {/* <button
                          type="button"
                          data-bs-dismiss="modal"
                          id="close-modal"
                          className="btn btn-primary mx-2"
                          onClick={handleRemoveList}
                        >
                          Remove
                        </button> */}
                        </div>
                      </div>
                    </form>
                  )}
                  {ListItems?.length > 0 && (
                    <>
                      <h5 className="mx-2" style={{ color: "blue" }}>
                        Existing Wishlists
                      </h5>
                      <div className="table-container">
                        {ListItems.map((item) => (
                          <div key={item.Id} className="table-row mb-3">
                            <div
                              className="table-cell"
                              data-bs-dismiss="modal"
                              id="close-modal"
                              style={{ color: "green", width: 50 }}
                              onClick={() =>
                                // navigate(`/shoppinglist/${item.id}`)
                                // console.log("first")
                                toast.success(`Product Added to ${item.name}`)
                              }
                            >
                              {item.name}
                            </div>

                            <button
                              onClick={() => handleRemoveList(item.Id)}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {/* {ListItems?.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div onClick={() => console.log("navigation")}>
                        {item.name}
                      </div>
                      <button
                        onClick={() => handleRemoveList(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-md-7 mt-4 mt-sm-0">
        <div className="section-title ms-md-4">
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
          />
          <div className="row align-items-center">
            <h5>{item.ProductTitle}</h5>
          </div>

          {item?.sku !== " " && (
            <ul className="list-unstyled text-muted">
              <li className="mb-0">
                <span className="text-primary h5 me-2">
                  <i className="uil uil-check-circle align-middle" />
                </span>
                SKU#: {item.Sku}
              </li>
            </ul>
          )}
          {item?.ManufactureName !== "" && (
            <ul className="list-unstyled text-muted">
              <li className="mb-0">
                <span className="text-primary h5 me-2">
                  <i className="uil uil-check-circle align-middle" />
                </span>
                Manufacture Name: {item.ManufactureName}
              </li>
            </ul>
          )}
          {item?.ManufactureNo !== "" && (
            <ul className="list-unstyled text-muted">
              <li className="mb-0">
                <span className="text-primary h5 me-2">
                  <i className="uil uil-check-circle align-middle" />
                </span>
                Manufacture#: {item.ManufactureNo}
              </li>
            </ul>
          )}
          <ul className="list-unstyled text-muted">
            <li className="mb-0">
              <span className="text-primary h5 me-2">
                <i className="uil uil-check-circle align-middle" />
              </span>
              Price: {currencySymbol} {price.toFixed(2)}
            </li>
          </ul>
          {item.lstProductUnitAssociates &&
            item.lstProductUnitAssociates.length > 0 && (
              <div className="d-flex align-items-center">
                <ul className="list-unstyled text-muted mb-0 me-2">
                  <li className="mb-0">
                    <span className="text-primary h5 me-2">
                      <i className="uil uil-check-circle align-middle" />
                    </span>
                    Units:
                  </li>
                </ul>
                <select
                  className="form-select mt-2"
                  style={{ width: "160px" }}
                  value={selectedUnit.UnitID || "default"}
                  onChange={(e) => {
                    const unitId = e.target.value;
                    const unit = item.lstProductUnitAssociates.find(
                      (u) => u.UnitID.toString() === unitId
                    );
                    if (unit) {
                      setPrice(unit.Price);
                      setSelectedUnit(unit);
                    } else {
                      // Reset to default state if needed
                    }
                  }}
                >
                  {/* <option value="default">Select</option> */}
                  {item.lstProductUnitAssociates.map((unit) => (
                    <option key={unit.UnitID} value={unit.UnitID}>
                      {unit.UnitTitle} - {currencySymbol}
                      {unit.Price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            )}

          {/* )} */}
          <div className="row mt-4">
            <div className="col-lg-6 col-12 mt-4 mt-lg-0">
              <div className="d-flex shop-list align-items-center">
                <h6 className="mb-0">Quantity:</h6>
                <div className="qty-icons ms-3">
                  <button
                    onClick={() => {
                      setQuantity(quantity > 1 ? quantity - 1 : 1);
                    }}
                    className="btn btn-icon btn-soft-primary minus"
                  >
                    -
                  </button>
                  <input
                    min={0}
                    name="quantity"
                    value={quantity}
                    type="number"
                    className="btn btn-icon btn-soft-primary qty-btn quantity"
                    readOnly
                  />
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className="btn btn-icon btn-soft-primary plus"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={handleCart} className="btn btn-success">
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/shoppingcart")}
              className="btn btn-primary mx-2"
            >
              View Cart
            </button>
            {/* <button
              className="btn btn-warning "
              data-bs-toggle="modal"
              data-bs-target="#add-product"
            >
              Add to Wishlist
            </button> */}
          </div>
          <p className="text-muted mt-3">
            Please note that if your shopping cart already contain this item,
            you will increase the item's quantity when you will add to it.
          </p>
        </div>
      </div>
    </>
  );
};

Details.propTypes = {};

export default Details;
