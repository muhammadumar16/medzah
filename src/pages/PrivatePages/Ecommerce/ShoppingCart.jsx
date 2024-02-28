import AddToCart from "components/Shop/AddToCart";
import { CARTITEMSHEADINGS } from "constants/cartItems";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  GetAllShoppingList,
  addShoppingList,
  removeShoppingList,
} from "store/cart";
import { currencySymbol } from "utility/Currency";
import "./model.css";
import useAPI from "hooks/useAPI";
import ProductApi from "services/Product.service";
import Loader from "utility/Loader";

export const ShoppingCart = () => {
  // const allShoppingLists = useAPI(ProductApi.getAllShoppingList);
  // const deleteShoppingList = useAPI(ProductApi.deleteShoppingList);
  const setShoppingList = useAPI(ProductApi.setShoppingList);
  // const ListItems = useSelector((state) => state?.entities?.cart?.shoppinglist);
  const cartItems = useSelector((state) => state?.entities?.cart?.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [createNewItem, setCreateNewItem] = useState(false);
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const taxes = 60;
  const totalAmount = taxes + subtotal;
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item?.Price * item.quantity;
    });
    setSubtotal(totalPrice);
  };

  useEffect(() => {
    getTotal();
  }, [cartItems]);

  const lstshoppingDetails = cartItems.map((item) => ({
    ShoppingCardDetailID: item.Id,
    ShoppingCartID: 123,
    ProductID: item.ProductID,
    Quantity: item.quantity,
    UnitID: item.UnitID,
  }));

  const ListData = {
    ShoppingCartID: 0,
    ShoppingCartTitle: name,
    Inactive: false,
    Remarks: remarks,
    lstshoppingDetails,
  };

  // const handleAddToList = async ({ itemID, itemName, itemRemarks }) => {
  const handleAddToList = async () => {
    if (name && remarks) {
      try {
        setLoading(true);
        const result = await setShoppingList.request(ListData);
        if (result.data.Status === 101) {
          toast.success("Shopping List Created Successfully !! ");
          dispatch(GetAllShoppingList());
        }
      } catch (error) {
        console.log("Error Fetching Products Data =>>", error);
      } finally {
        setLoading(false);
      }
      // if ((name || itemName) && (remarks || itemRemarks)) {
      // if (itemName && itemRemarks) {
      //   try {
      //     setLoading(true);
      //     const result = await setShoppingList.request({
      //       ...ListData,
      //       ShoppingCartID: itemID,
      //     });
      //     if (result.data.Status === 101) {
      //       toast.success(`Added to Shoppinglist ${itemRemarks}`);
      //       getAllShoppingLists();
      //     }
      //   } catch (error) {
      //     console.log("Error Fetching Products Data =>>", error);
      //   } finally {
      //     setLoading(false);
      //   }
      // } else {

      // }
    } else {
      toast.warning("Provide ListName & Remarks ");
    }
  };

  // const getAllShoppingLists = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await allShoppingLists.request();
  //     dispatch(addShoppingList(result?.data?.Data));
  //   } catch (error) {
  //     console.log("Error Fetching Products Data =>>", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleRemoveList = async (itemId) => {
  //   try {
  //     setLoading(true);
  //     const result = await deleteShoppingList.request(itemId);
  //     if (result.data.Status === 101) {
  //       setLoading(false);
  //       toast.info("Shopping List Deleted !!");
  //     }
  //   } catch (error) {
  //     console.log("Error Fetching Products Data =>>", error);
  //   } finally {
  //     getAllShoppingLists();
  //   }
  // };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        style={{ width: "350px" }}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="layout-specing">
            <div className="d-md-flex justify-content-between align-items-center">
              <h5 className="mb-0">Shopping Cart</h5>
              <nav
                aria-label="breadcrumb"
                className="d-inline-block mt-2 mt-sm-0"
              >
                <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item text-capitalize">
                    <Link to="/">Medzah</Link>
                  </li>
                  <li className="breadcrumb-item text-capitalize">
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-capitalize active"
                    aria-current="page"
                  >
                    Cart
                  </li>
                </ul>
              </nav>
            </div>
            {cartItems.length === 0 ? (
              <p>
                Your Shopping Cart Is Empty. Go Add Something{" "}
                <Link to="/shop" className="btn btn-sm btn-danger my-2 mx-2">
                  Go Back
                </Link>
              </p>
            ) : (
              <>
                <div className="row">
                  <div className="col-12 mt-4">
                    <AddToCart
                      select={cartItems}
                      headings={CARTITEMSHEADINGS}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-6 mt-4">
                    <Link to="/shop" className="btn btn-soft-primary ms-2">
                      Shop More
                    </Link>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#add-product"
                      className="btn btn-danger ms-2"
                    >
                      Save List
                    </button>
                  </div>
                  <div className="col-lg-4 col-md-6 ms-auto mt-4">
                    <div className="table-responsive bg-white rounded shadow">
                      <table className="table table-center table-padding mb-0">
                        <tbody>
                          <tr>
                            <td className="h6 ps-4 py-3">Subtotal</td>
                            <td className="text-end fw-bold pe-4">
                              {currencySymbol} {subtotal.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="h6 ps-4 py-3">Taxes</td>
                            <td className="text-end fw-bold pe-4">
                              {currencySymbol} {taxes.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="bg-light">
                            <td className="h6 ps-4 py-3">Total</td>
                            <td className="text-end fw-bold pe-4">
                              {currencySymbol} {totalAmount.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-end">
                      <Link to="/checkout" className="btn btn-success">
                        Proceed to checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

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
                    {/* <h6 className="mt-3">
                      <button
                        onClick={() => setCreateNewItem(true)}
                        className="link-button"
                      >
                        Create Shoppinglist
                      </button>
                    </h6> */}
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
                      {/* {(ListItems?.length === 0 || createNewItem === true) && ( */}
                      <form>
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-3">
                              <input
                                name="name"
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="List Name"
                                autoComplete="false"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="mb-3">
                              <textarea
                                name="remarks"
                                id="remarks"
                                className="form-control"
                                placeholder="Description"
                                autoComplete="false"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                rows={4}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 d-flex justify-content-end">
                            <button
                              type="button"
                              onClick={handleAddToList}
                              className="btn btn-primary "
                              data-bs-dismiss="modal"
                              id="close-modal"
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      </form>

                      {/* )} */}
                      {/* {ListItems?.length > 0 && (
                        <>
                          <h5 className="mx-2" style={{ color: "blue" }}>
                            Existing Shoppinglist
                          </h5>
                          <div className="table-container">
                            {ListItems.map((item) => (
                              <div key={item.Id} className="table-row mb-3">
                                <div
                                  className="table-cell"
                                  data-bs-dismiss="modal"
                                  id="close-modal"
                                  style={{ color: "green", width: 50 }}
                                  onClick={() => {
                                    handleAddToList({
                                      itemName: item.ShoppingCartTitle,
                                      itemID: item.ShoppingCartID,
                                      itemRemarks: item.Remarks,
                                    });
                                  }}
                                >
                                  Name: {item.ShoppingCartTitle}
                                </div>
                                <div
                                  className="table-cell"
                                  data-bs-dismiss="modal"
                                  id="close-modal"
                                  style={{ color: "green", width: 50 }}
                                >
                                  Description: {item.Remarks}
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveList(item.ShoppingCartID)
                                  }
                                  className="btn btn-sm btn-danger"
                                  data-bs-dismiss="modal"
                                  id="close-modal"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )} */}
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
