import { CARTITEMSHEADINGS } from "constants/cartItems";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "./model.css";
import CheckoutDetails from "components/Shop/CheckOut/CheckoutDetails";
import DatePicker from "react-datepicker";
import Loader from "utility/Loader";

import useAPI from "hooks/useAPI";
import "react-datepicker/dist/react-datepicker.css";
import ProductApi from "services/Product.service";
import { removeAllCartItems, setAllAddress } from "store/cart";
import "./Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const saveShipmentAddress = useAPI(ProductApi.saveShipmentAddress);
  const getAllAddress = useAPI(ProductApi.getAllAddress);
  const checkOut = useAPI(ProductApi.checkOut);
  const cartItems = useSelector((state) => state?.entities?.cart?.cart);
  const alladdress = useSelector((state) => state?.entities?.cart?.allAddress);

  const [showTextarea, setShowTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonVisible, setButtonVisible] = useState(true);
  const [shipmentAddressId, setShipmentAddressId] = useState();
  const [purchaseNo, setPurchaseNo] = useState();
  const [loading, setLoading] = useState(false);

  const filterAddress = (searchTerm) => {
    console.log(searchTerm);
    return alladdress.filter((address) =>
      address.ShipmentAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const results = await getAllAddress.request();
        const data = results?.data?.Data;
        dispatch(setAllAddress(data));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchdata();
  }, [dispatch]);

  const saveShipmentHandler = async () => {
    const data = {
      ShipmentAddressID: 0,
      ShipmentAddress: searchTerm,
      Remarks: "This is a sample shipment address",
    };

    if (searchTerm) {
      try {
        setLoading(true);
        const result = await saveShipmentAddress.request(data);
        console.log("result-=>>>", result);
        if (result.data.Status === 101) {
          const results = await getAllAddress.request();
          dispatch(setAllAddress(result?.data?.Data));
          toast.success("Address Saved Successfully !! ");
        }
      } catch (error) {
        console.log("Error While Saving Address", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please Provide The Address !! ");
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleShoppingInstrutions = () => {
    setShowTextarea(!showTextarea);
  };

  const handleTextareaBlur = () => {
    setShowTextarea(false);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setButtonVisible(true);
    if (value.length > 0) {
      const filteredResults = filterAddress(value);
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-datepicker" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const day = startDate.getDate().toString().padStart(2, "0");
  const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = startDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const lstOrderDetails = cartItems.map((item) => ({
    ShoppingListDetailID: item.Id,
    ShoppingListID: 123,
    ProductId: item.ProductID,
    Quantity: item.quantity,
    UnitID: item.UnitID,
  }));
  const OrderInfoData = {
    OrderId: 0,
    OrderNo: "123456",
    UserId: 789,
    OrderStatus: 1,
    Remarks: textareaValue,
    PurchaseOrderNo: purchaseNo,
    ShippingDate: formattedDate,
    ShipmentAddressID: shipmentAddressId,
    lstOrderDetails,
  };

  const checkOutHandler = async () => {
    console.log("orderDtaa to send", OrderInfoData);
    try {
      setLoading(true);
      const results = await checkOut.request(OrderInfoData);
      console.log("result-=>>>", results);
      if (results.data.Status === 101) {
        toast.success("Order Placed Successfully");
        setTimeout(() => {
          navigate("/");
          dispatch(removeAllCartItems());
        }, 500);
      }
      if (results.data.Status === 107) {
        toast.error("SomeThing Went Wrong Contact Admin");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
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
        <div className="layout-specing">
          <div className="d-md-flex justify-content-between align-items-center">
            <h5 className="mb-0">Checkout</h5>
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
                <li className="breadcrumb-item text-capitalize">
                  <Link to="/shoppingcart">Cart</Link>
                </li>
                <li
                  className="breadcrumb-item text-capitalize active"
                  aria-current="page"
                >
                  Checkout
                </li>
              </ul>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-6 mt-4">
              <Link to="/shoppingcart" className="btn btn-sm btn-danger ms-2">
                Go To Shopping Cart
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <CheckoutDetails
                select={cartItems}
                headings={CARTITEMSHEADINGS}
              />
            </div>
          </div>
          <div
            className="col-12 row bg-white shadow rounded mt-2 mb-2 ml-2"
            style={{ marginLeft: "1px" }}
          >
            <div className="col-4 ">
              <div className="w-100 mt-4 ">
                <span
                  onClick={handleShoppingInstrutions}
                  style={{ cursor: "pointer" }}
                  className="btn btn-sm btn-outline-info"
                >
                  Add Shopping Instructions
                </span>
              </div>
              <div className="w-100 mt-2 ">
                {showTextarea && (
                  <textarea
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    onBlur={handleTextareaBlur}
                    maxLength={500}
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                )}
              </div>
            </div>
            <div className="col-4 mt-4">
              <p
                className="mb-1"
                style={{ textDecoration: "underline", width: "100%" }}
              >
                Required Purchase Order No #
              </p>

              <input
                type="text"
                placeholder="Enter Purchase Order No"
                title="Only numbers and dashes are allowed"
                value={purchaseNo}
                onChange={(e) => setPurchaseNo(e.target.value)}
              />

              <p>Please use only letters, numbers or dashes</p>
            </div>
            <div className="col-4 mt-4">
              <span style={{ textDecoration: "underline" }}>
                Base DC: <strong>PEN</strong>{" "}
              </span>
              <p style={{ textDecoration: "underline" }} className="mb-1">
                Shipping Method : <strong>----FEDEXGRNG</strong>
              </p>
              <span style={{ textDecoration: "underline" }}>
                Assigned Ship Day :
              </span>
            </div>
            <div className="text-end mb-5 mt-5">
              <span> Select The Shipping Day </span>
              {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="custom-datepicker"
            /> */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="search-bar p-0 mt-3">
                    <div id="search" className="menu-search mb-0">
                      <form>
                        <div className="position-relative" ref={searchRef}>
                          <label
                            htmlFor="s"
                            className="form-label required-label mx-1"
                          >
                            Search Address
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control border rounded me-2 searchwid"
                            name="s"
                            id="s"
                            placeholder="Search Address"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <div
                            className="search-results position-absolute p-2 "
                            style={{
                              width: 600,
                              maxHeight: 300,
                              overflowY: "auto",
                              zIndex: 1000,
                              backgroundColor: "white",
                            }}
                          >
                            {searchResults.map((address, index) => (
                              <span
                                key={address.ShipmentAddressID}
                                onClick={() => {
                                  setSearchResults([]);
                                  setSearchTerm(address.ShipmentAddress);
                                  setButtonVisible(!buttonVisible);
                                  setShipmentAddressId(
                                    address.ShipmentAddressID
                                  );
                                }}
                                className="list-group-item list-group-item-action d-flex align-items-center"
                                style={{
                                  borderBottom:
                                    index !== searchResults.length - 1
                                      ? "1px solid #ddd"
                                      : "none",
                                  padding: "10px 0",
                                  cursor: "pointer", // Adjust padding as needed
                                }}
                              >
                                <span>{address.ShipmentAddress}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-5">
                  {buttonVisible && (
                    <button
                      className="btn btn-success "
                      onClick={saveShipmentHandler}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-end">
            <button className="btn btn-success" onClick={checkOutHandler}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};
