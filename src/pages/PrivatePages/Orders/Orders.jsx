import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import useAPI from "hooks/useAPI";
import Orders from "services/Orders.service";
import { setAllOrders } from "store/cart";
import { useDispatch, useSelector } from "react-redux";

const orders = [
  {
    datePlaced: "2024-04-01",
    orderNumber: "ORD12345",
    poNumber: "PO123",
    placedBy: "John Doe",
    orderCost: "$100",
    proofDelivery: "Yes",
    status: "Shipped",
  },
  {
    datePlaced: "2024-04-02",
    orderNumber: "ORD54321",
    poNumber: "PO456",
    placedBy: "Jane Smith",
    orderCost: "$150",
    proofDelivery: "No",
    status: "Pending",
  },
  {
    datePlaced: "2024-04-01",
    orderNumber: "ORD12345",
    poNumber: "PO123",
    placedBy: "John Doe",
    orderCost: "$100",
    proofDelivery: "Yes",
    status: "Shipped",
  },
  {
    datePlaced: "2024-04-02",
    orderNumber: "ORD54321",
    poNumber: "PO456",
    placedBy: "Jane Smith",
    orderCost: "$150",
    proofDelivery: "No",
    status: "Pending",
  },
  {
    datePlaced: "2024-04-01",
    orderNumber: "ORD12345",
    poNumber: "PO123",
    placedBy: "John Doe",
    orderCost: "$100",
    proofDelivery: "Yes",
    status: "Shipped",
  },
  {
    datePlaced: "2024-04-02",
    orderNumber: "ORD54321",
    poNumber: "PO456",
    placedBy: "Jane Smith",
    orderCost: "$150",
    proofDelivery: "No",
    status: "Pending",
  },
];

export const OrdersPage = () => {
  const dispatch = useDispatch();
  const AllOrdersData = useSelector(
    (state) => state?.entities?.cart?.allOrders
  );
  console.log("AllOrders Data=>>>>", AllOrdersData);
  const getAllOrders = useAPI(Orders.getAllOrders);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const results = await getAllOrders.request();
        const data = results?.data?.Data;
        dispatch(setAllOrders(data));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchdata();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="layout-specing">
        <div className="d-md-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Orders</h5>
          <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
            <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
              <li className="breadcrumb-item text-capitalize">
                <Link to="/">Medzah</Link>
              </li>
              <li className="breadcrumb-item text-capitalize">Orders</li>
            </ul>
          </nav>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-lg-9">
              <div className="text-center subcribe-form mb-2 mt-3">
                <form style={{ maxWidth: 800 }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="rounded-pill shadow"
                    placeholder="Search Order By Name and Sku"
                    required
                  />
                  <button type="submit" className="btn btn-pills btn-primary">
                    Search Orders
                  </button>
                </form>
              </div>
            </div>

            {/* <div className="col-md-2  mt-3 ">
              <button
                type="button"
                className="btn btn-outline-primary ms-2 mt-3 mt-md-0 "
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div> */}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className="col-12 card">
            <div className="table-responsive card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date Placed</th>
                    <th>Order Nbr</th>
                    <th>PO Nbr</th>
                    <th>Placed By</th>
                    <th>Order Cost</th>
                    <th>Proof Delivery</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AllOrdersData?.map((order, index) => (
                    <tr key={index}>
                      <td>{order.OrderDate.slice(0, 10)}</td>
                      <td>{order.OrderNo}</td>
                      <td>{order.PurchaseOrderNo}</td>
                      <td>{order.UserId}</td> <td></td>
                      <td></td>
                      <td>
                        <span
                          className={`badge ${
                            order.OrderStatus === 1 ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {order.OrderStatus === 1 ? "Pending" : "Shipped"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
