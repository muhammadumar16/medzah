import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import usersReducer from "./users";
export default combineReducers({
  users: usersReducer,
  cart: cartReducer,
});
