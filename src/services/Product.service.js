import ApiClient from "api/ApiClient";

const getAllProducts = () => ApiClient.get("ProductInfo/ProductList");
const getAllShoppingList = () =>
  ApiClient.get("ShoppingCartInfo/ShoppingCartList");
const setShoppingList = (data) =>
  ApiClient.post("ShoppingCartInfo/SaveShoppingCart", data);
const deleteShoppingList = (data) =>
  ApiClient.post(`ShoppingCartInfo/RemoveShoppingCart?id=${data}`);

const services = {
  getAllProducts,
  getAllShoppingList,
  setShoppingList,
  deleteShoppingList,
};

export default services;
