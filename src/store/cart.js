import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCallBegan } from "./actions/api";

const user = JSON.parse(localStorage.getItem("loggedUserInfo"));
const token = user?.loginToken;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cart: [],
    shoppinglist: [],
    shoppingListLoader: false,
  },
  reducers: {
    allProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      const { Id, quantity: localQuantity, UnitID } = action.payload;
      console.log(UnitID);
      if (!UnitID) {
        toast.error("Please Select any unit");
        return state;
      } else {
        const itemInCart = state.cart.find((item) => item.Id === Id);

        if (itemInCart) {
          itemInCart.quantity += localQuantity;
        } else {
          state.cart.push({ ...action.payload, quantity: localQuantity });
        }
        toast.success("Product added to your cart!");
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.Id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.Id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },
    removeCartItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.Id !== action.payload
      );
      state.cart = removeItem;
    },
    addShoppingList: (state, action) => {
      console.log("action payload=>>", action.payload);
      state.shoppinglist = action.payload;
    },
    removeShoppingList: (state, action) => {
      const removeItem = state.shoppinglist.filter(
        (list) => list.ShoppingCartID !== action.payload
      );
      state.shoppinglist = removeItem;
    },
    updateUnitId: (state, action) => {
      const { itemId, unitId, UnitTitle } = action.payload;
      const item = state.cart.find((item) => item.Id === itemId);
      if (item) {
        item.UnitID = unitId;
        item.UnitTitle = UnitTitle;
      }
    },

    shoppingListRequested: (state, action) => {
      state.shoppingListLoader = true;
    },
    shoppingListFailed: (state, action) => {
      state.shoppingListLoader = false;
    },
    shoppingListSuccess: (state, { payload }) => {
      state.shoppinglist = payload.Data;
      state.shoppingListLoader = false;
    },

    removeShoppingListItem: (state, action) => {
      state.shoppinglist = state.shoppinglist.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails.filter(
          (item) => item.ShoppingCardDetailID !== action.payload
        ),
      }));
    },
    updateShoppingListUnitId: (state, action) => {
      const { itemId, unitId, UnitTitle } = action.payload;
      state.shoppinglist = state.shoppinglist.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails.map((item) =>
          item.ShoppingCardDetailID === itemId
            ? {
                ...item,
                UnitID: unitId,
                UnitTitle,
              }
            : item
        ),
      }));
    },
    incrementShoppingListQuantity: (state, action) => {
      const itemId = action.payload;
      state.shoppinglist = state.shoppinglist.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails.map((item) =>
          item.ShoppingCardDetailID === itemId
            ? {
                ...item,
                Quantity: item.Quantity + 1,
              }
            : item
        ),
      }));
    },
    decrementShoppingListQuantity: (state, action) => {
      const itemId = action.payload;
      state.shoppinglist = state.shoppinglist.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails.map((item) =>
          item.ShoppingCardDetailID === itemId
            ? {
                ...item,
                Quantity: item.Quantity > 0 ? item.Quantity - 1 : 0,
              }
            : item
        ),
      }));
    },
    replaceCartWithShoppingList: (state, action) => {
      const shoppingListItems = action.payload.lstshoppingDetails.map(
        (item) => ({
          Id: item.ProductID,
          ManufactureName: item.ManufactureName,
          Sku: item.Sku,
          ManufactureNo: item.ManufactureNo,
          ProductTitle: item.ProductTitle,
          image:
            item.lstProductImages.length > 0
              ? item.lstProductImages[0].ProductImage
              : null,
          quantity: item.Quantity,
          UnitID: item.UnitID,
          UnitTitle: item.UnitTitle,
          Price: item.Price,
          lstProductUnitAssociates: item.lstProductUnitAssociates,
        })
      );

      state.cart = shoppingListItems;
    },
  },
});

export const {
  allProducts,
  addToCart,
  removeCartItem,
  incrementQuantity,
  decrementQuantity,
  addShoppingList,
  removeShoppingList,
  updateUnitId,
  shoppingListRequested,
  shoppingListSuccess,
  shoppingListFailed,
  removeShoppingListItem,
  incrementShoppingListQuantity,
  decrementShoppingListQuantity,
  updateShoppingListUnitId,
  replaceCartWithShoppingList,
} = cartSlice.actions;

export default cartSlice.reducer;

export const GetAllShoppingList = () => {
  return apiCallBegan({
    url: `ShoppingCartInfo/ShoppingCartList`,
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
    onStart: shoppingListRequested.type,
    onSuccess: shoppingListSuccess.type,
    onError: shoppingListFailed.type,
  });
};
