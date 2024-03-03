import ApiClient from "api/ApiClient";
const getAllOrders = () => ApiClient.get(`OrderInfo/GetOrderInfo`);
const services = {
  getAllOrders,
};

export default services;
