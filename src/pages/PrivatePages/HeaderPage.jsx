import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut, searchProducts, userProfile } from "store/users";
import feather from "feather-icons";
import ProductApi from "services/Product.service";
import { PRODUCTSDATA } from "constants/Products/productsDetails";
import useAPI from "hooks/useAPI";
import { allProducts } from "store/cart";
import "./Header.css";

function HeaderPage() {
  const navigate = useNavigate();
  // const allproducts = useAPI(ProductApi.getAllProducts);
  const allProducts = useSelector((state) => state?.entities?.cart?.products);
  // const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const UserData = JSON.parse(localStorage.getItem("loggedUserInfo"));
  const { companyName, firstName, lastName, username, userID } = UserData;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.entities?.cart?.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const logoutHandler = () => {
    dispatch(userLoggedOut());
  };
  // const getAllproducts = async () => {
  //   try {
  //     const result = await allproducts.request();
  //     // console.log("result=>>", result.data.Data);
  //     dispatch(allProducts(result.data.Data));
  //   } catch (error) {
  //     console.log("Error Fetching Products Data =>>", error);
  //   }
  // };
  useEffect(() => {
    dispatch(userProfile(userID));
    // getAllproducts();

    feather.replace();

    const closeSidebarButton = document.getElementById("close-sidebar");

    if (closeSidebarButton) {
      const togglePageWrapper = () => {
        const pageWrapper = document.getElementsByClassName("page-wrapper")[0];
        pageWrapper.classList.toggle("toggled");
      };

      closeSidebarButton.addEventListener("click", togglePageWrapper);

      return () => {
        closeSidebarButton.removeEventListener("click", togglePageWrapper);
      };
    }
  }, []);
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
  // Utility function to filter products by name or SKU
  const filterProducts = (searchTerm) => {
    console.log(searchTerm);
    return allProducts.filter(
      (product) =>
        // product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // product.sku.toLowerCase().includes(searchTerm.toLowerCase())

        product.ProductTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Update the search term and filter the products
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredResults = filterProducts(value);
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="top-header">
      <div className="header-bar d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <a href="#" className="logo-icon me-3">
            <img
              src="/assets/images/logo-icon.png"
              height={30}
              className="small"
              alt="...."
            />
            <span className="big">
              <img
                src="/assets/images/logo-dark.png"
                height={24}
                className="logo-light-mode"
                alt="...."
              />
              <img
                src="/assets/images/logo-light.png"
                height={24}
                className="logo-dark-mode"
                alt="...."
              />
            </span>
          </a>
          <a
            id="close-sidebar"
            className="btn btn-icon btn-soft-light"
            href="javascript:void(0)"
          >
            <i className="ti ti-menu-2" />
          </a>
          <div className="search-bar p-0 d-none d-md-block ms-2">
            <div id="search" className="menu-search mb-0">
              <form>
                <div className="position-relative" ref={searchRef}>
                  <input
                    type="text"
                    className="form-control border rounded me-2 searchwid"
                    name="s"
                    id="s"
                    placeholder="Search Keywords..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  <div
                    className="search-results position-absolute p-2 auto-width"
                    style={{
                      // width: 250,
                      maxHeight: 300,
                      overflowY: "auto",
                      zIndex: 1000,
                      backgroundColor: "white",
                    }}
                  >
                    {searchResults.map((product, index) => (
                      <Link
                        to={`/productdetails/${product.Id}`}
                        key={product.Id}
                        onClick={() => {
                          setSearchResults([]);
                          setSearchTerm("");
                        }}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        style={{
                          borderBottom:
                            index !== searchResults.length - 1
                              ? "1px solid #ddd"
                              : "none",
                          padding: "10px 0", // Adjust padding as needed
                        }}
                      >
                        <img
                          src={product?.lstProductImages[0].ProductImage}
                          alt={product.ProductTitle || product.Sku}
                          style={{ width: 40, height: 40, marginRight: 10 }}
                        />
                        <span>{product.ProductTitle || product.Sku}</span>
                      </Link>
                    ))}
                  </div>

                  {/* <div className="search-results list-group position-absolute w-100">
                    {searchResults.map((product) => (
                      <Link
                        to={`/productdetails/${product.id}`}
                        key={product.id}
                        onClick={() => {
                          setSearchResults([]);
                          setSearchTerm("");
                        }}
                        className="list-group-item list-group-item-action"
                      >
                        {product.description} ({product.sku})
                      </Link>
                    ))}
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <ul className="list-unstyled mb-0">
          <li class="list-inline-item mb-0 mx-2">
            <Link to="/shoppingcart">
              <div class="btn btn-icon btn-soft-light position-relative">
                <i class="ti ti-shopping-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getTotalQuantity() || 0}
                </span>
              </div>
            </Link>
          </li>
          <li className="list-inline-item mb-0 ms-1">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                className="btn btn-soft-light dropdown-toggle p-0"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="/assets/images/client/05.jpg"
                  className="avatar avatar-ex-small rounded"
                  alt="...."
                />
              </button>
              <div
                className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
                style={{ minWidth: 200 }}
              >
                <Link
                  className="dropdown-item d-flex align-items-center text-dark pb-3"
                  to="/profile"
                >
                  <img
                    src="/assets/images/client/05.jpg"
                    className="avatar avatar-md-sm rounded-circle border shadow"
                    alt="...."
                  />
                  <div className="flex-1 ms-2">
                    <span className="d-block">
                      {firstName} {lastName}
                    </span>
                    <small className="text-muted">{companyName}</small>
                  </div>
                </Link>
                <Link className="dropdown-item text-dark" to="/">
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-home" />
                  </span>{" "}
                  Dashboard
                </Link>
                <Link className="dropdown-item text-dark" to="/profile">
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-settings" />
                  </span>{" "}
                  Profile
                </Link>
                <Link className="dropdown-item text-dark" to="/changepassword">
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-lock" />
                  </span>{" "}
                  Change Password
                </Link>
                {/* <a className="dropdown-item text-dark" href="email.html">
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-mail" />
                  </span>{" "}
                  Email
                </a> */}
                <div className="dropdown-divider border-top" />
                {/* <a className="dropdown-item text-dark" href="lock-screen.html">
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-lock" />
                  </span>{" "}
                  Lockscreen
                </a> */}
                <button
                  className="dropdown-item text-dark"
                  onClick={logoutHandler}
                >
                  <span className="mb-0 d-inline-block me-1">
                    <i className="ti ti-logout" />
                  </span>{" "}
                  Logout
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderPage;
