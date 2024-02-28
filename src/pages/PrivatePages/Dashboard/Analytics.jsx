import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userProfile } from "store/users";
import ProductApi from "services/Product.service";
import useAPI from "hooks/useAPI";
import { allProducts } from "store/cart";
import Loader from "utility/Loader";

function Analytics() {
  const UserData = JSON.parse(localStorage.getItem("loggedUserInfo"));

  const { userID } = UserData;
  const allproducts = useAPI(ProductApi.getAllProducts);
  const [loading, setLoading] = useState(true);
  const getAllproducts = async () => {
    try {
      setLoading(true);
      const result = await allproducts.request();
      // console.log("result=>>", result.data.Data);
      dispatch(allProducts(result.data.Data));
    } catch (error) {
      console.log("Error Fetching Products Data =>>", error);
    } finally {
      setLoading(false);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile(userID));
    getAllproducts();
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Welcome back, Cristina!</h6>
                <h5 className="mb-0">Dashboard</h5>
              </div>
              <div className="mb-0 position-relative">
                <select className="form-select form-control" id="dailychart">
                  <option selected>This Month</option>
                  <option value="aug">August</option>
                  <option value="jul">July</option>
                  <option value="jun">June</option>
                </select>
              </div>
            </div>
            <div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
              <div className="col mt-4">
                <a
                  href="#!"
                  className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-user-circle fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Visitor</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={4589}>
                          2100
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-danger">
                    <i className="uil uil-chart-down" /> 0.5%
                  </span>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a
                  href="#!"
                  className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-usd-circle fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Revenue</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        $
                        <span className="counter-value" data-target={48575}>
                          35214
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-success">
                    <i className="uil uil-arrow-growth" /> 3.84%
                  </span>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a
                  href="#!"
                  className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-shopping-bag fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Orders</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={4800}>
                          3402
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-success">
                    <i className="uil uil-arrow-growth" /> 1.46%
                  </span>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a
                  href="#!"
                  className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-store fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Items</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={145}>
                          23
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-muted">
                    <i className="uil uil-analysis" /> 0.0%
                  </span>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a
                  href="#!"
                  className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-users-alt fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Users</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={9}>
                          1.5
                        </span>
                        M
                      </p>
                    </div>
                  </div>
                  <span className="text-danger">
                    <i className="uil uil-chart-down" /> 0.5%
                  </span>
                </a>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="row">
              <div className="col-xl-8 col-lg-7 mt-4">
                <div className="card shadow border-0 p-4 pb-0 rounded">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 fw-bold">Sales Analytics</h6>
                    <div className="mb-0 position-relative">
                      <select
                        className="form-select form-control"
                        id="yearchart"
                      >
                        <option selected>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </select>
                    </div>
                  </div>
                  <div id="dashboard" className="apex-chart" />
                </div>
              </div>
              {/*end col*/}
              <div className="col-xl-4 col-lg-5 mt-4 rounded">
                <div className="card shadow border-0">
                  <div className="p-4 border-bottom">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0 fw-bold">Upcoming Activity</h6>
                      <a href="#!" className="text-primary">
                        See More{" "}
                        <i className="uil uil-arrow-right align-middle" />
                      </a>
                    </div>
                  </div>
                  <div className="p-4" data-simplebar style={{ height: 365 }}>
                    <a
                      href="javascript:void(0)"
                      className="features feature-primary key-feature d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-users" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">
                            Meeting with Developers
                          </h6>
                          <small className="text-muted">Today 6:00pm</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-up text-warning" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="features feature-success key-feature d-flex align-items-center justify-content-between mt-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-gift" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">Cally's Birthday</h6>
                          <small className="text-muted">Tomorrow 10:00am</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-down text-success" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="features feature-primary key-feature d-flex align-items-center justify-content-between mt-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-users" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">Meeting with C.E.O</h6>
                          <small className="text-muted">Today 6:00pm</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-down text-success" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="features feature-danger key-feature d-flex align-items-center justify-content-between mt-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-video-plus" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">Movie Night</h6>
                          <small className="text-muted">Today 6:00pm</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-down text-success" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="features feature-primary key-feature d-flex align-items-center justify-content-between mt-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-users" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">Meeting with HR</h6>
                          <small className="text-muted">Today 6:00pm</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-down text-success" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="features feature-success key-feature d-flex align-items-center justify-content-between mt-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon text-center rounded-circle me-3">
                          <i className="ti ti-gift" />
                        </div>
                        <div className="flex-1">
                          <h6 className="mb-0 text-dark">Carlo's Birthday</h6>
                          <small className="text-muted">Today 6:00pm</small>
                        </div>
                      </div>
                      <i className="ti ti-arrow-down text-success" />
                    </a>
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="row">
              <div className="col-xl-4">
                <div className="row">
                  <div className="col-xl-12 mt-4">
                    <div className="card rounded shadow border-0 p-4">
                      <div className="d-flex justify-content-between mb-4">
                        <h6 className="mb-0">Monthly Sales Report</h6>
                        <div className="text-end">
                          <h5 className="mb-0">2384</h5>
                          <h6 className="text-muted mb-0">September</h6>
                        </div>
                      </div>
                      <div id="sale-chart" />
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-xl-12 mt-4">
                    <div className="card rounded shadow border-0 p-4">
                      <div className="d-flex justify-content-between mb-4">
                        <h6 className="mb-0">Weekly Top Products</h6>
                        <div className="text-end">
                          <h6 className="text-muted mb-0">Last Week</h6>
                        </div>
                      </div>
                      <div id="top-product-chart" />
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
              {/*end col*/}
              <div className="col-xl-8 mt-4">
                <div className="card border-0">
                  <div className="d-flex justify-content-between p-4 shadow rounded-top">
                    <h6 className="fw-bold mb-0">Invoice List</h6>
                    <ul className="list-unstyled mb-0">
                      <li className="dropdown dropdown-primary list-inline-item">
                        <button
                          type="button"
                          className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" />
                        </button>
                        <div className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3">
                          <a className="dropdown-item text-dark" href="#">
                            {" "}
                            Paid
                          </a>
                          <a className="dropdown-item text-dark" href="#">
                            {" "}
                            Unpaid
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="table-responsive shadow rounded-bottom"
                    data-simplebar
                    style={{ height: 545 }}
                  >
                    <table className="table table-center bg-white mb-0">
                      <thead>
                        <tr>
                          <th className="border-bottom p-3">No.</th>
                          <th
                            className="border-bottom p-3"
                            style={{ minWidth: 220 }}
                          >
                            Client Name
                          </th>
                          <th className="text-center border-bottom p-3">
                            Amount
                          </th>
                          <th
                            className="text-center border-bottom p-3"
                            style={{ minWidth: 150 }}
                          >
                            Generate(Dt.)
                          </th>
                          <th className="text-center border-bottom p-3">
                            Status
                          </th>
                          <th
                            className="text-end border-bottom p-3"
                            style={{ minWidth: 100 }}
                          >
                            Preview
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d01</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/01.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Howard Tanner</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$253</td>
                          <td className="text-center p-3">23th Sept 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d02</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/02.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Wendy Filson</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$482</td>
                          <td className="text-center p-3">11th Sept 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-success rounded px-3 py-1">
                              Paid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d03</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/03.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Faye Bridger</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$546</td>
                          <td className="text-center p-3">2nd Sept 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d04</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/04.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Ronald Curtis</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$154</td>
                          <td className="text-center p-3">1st Sept 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d05</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/05.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Melissa Hibner</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$458</td>
                          <td className="text-center p-3">1st Sept 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-success rounded px-3 py-1">
                              Paid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d06</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/06.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Randall Case</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$548</td>
                          <td className="text-center p-3">28th Aug 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-success rounded px-3 py-1">
                              Paid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d07</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/07.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Jerry Morena</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$658</td>
                          <td className="text-center p-3">25th Aug 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d08</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/08.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Lester McNally</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$457</td>
                          <td className="text-center p-3">20th Aug 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d09</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/09.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">
                                  Christopher Burrell
                                </span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$586</td>
                          <td className="text-center p-3">15th Aug 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-success rounded px-3 py-1">
                              Paid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                        {/* Start */}
                        <tr>
                          <th className="p-3">#d10</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/client/10.jpg"
                                  className="avatar avatar-ex-small rounded-circle shadow"
                                  alt="...."
                                />
                                <span className="ms-2">Mary Skeens</span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">$325</td>
                          <td className="text-center p-3">10th Aug 2021</td>
                          <td className="text-center p-3">
                            <div className="badge bg-soft-danger rounded px-3 py-1">
                              Unpaid
                            </div>
                          </td>
                          <td className="text-end p-3">
                            <a
                              href="invoice.html"
                              className="btn btn-sm btn-primary"
                            >
                              Preview
                            </a>
                          </td>
                        </tr>
                        {/* End */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
        </div>
      )}
    </>
  );
}

export default Analytics;
