import ApiClient from "api/ApiClient";

const getAllProducts = () => ApiClient.get("ProductInfo/ProductList");
const setShoppingList = (data) =>
  ApiClient.post("ShoppingListInfo/SaveShoppingList", data);
const saveShipmentAddress = (data) =>
  ApiClient.post("ShipmentAddressInfo/SaveShipmentAddress", data);
const deleteShoppingList = (data) =>
  ApiClient.post(`ShoppingListInfo/RemoveShoppingList?id=${data}`);
const getAllAddress = () =>
  ApiClient.get(`/ShipmentAddressInfo/GetShipmentAddressInfo`);
const checkOut = (data) => ApiClient.post(`OrderInfo/SaveOrderInfo`, data);

const services = {
  getAllProducts,
  setShoppingList,
  deleteShoppingList,
  saveShipmentAddress,
  getAllAddress,
  checkOut,
};

export default services;
