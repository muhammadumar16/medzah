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
    allAddress: [],
    allOrders: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      const { Id, quantity: localQuantity, UnitID } = action?.payload;
      console.log(UnitID);
      if (!UnitID) {
        toast.error("Please Select any unit");
        return state;
      } else {
        const itemInCart = state?.cart?.find((item) => item?.Id === Id);

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
      const removeItem = state?.cart?.filter(
        (item) => item.Id !== action.payload
      );
      state.cart = removeItem;
    },
    removeAllCartItems: (state, action) => {
      state.cart = [];
    },
    addShoppingList: (state, action) => {
      state.shoppinglist = action.payload;
    },
    removeShoppingList: (state, action) => {
      const removeItem = state.shoppinglist?.filter(
        (list) => list.ShoppingListID !== action.payload
      );
      state.shoppinglist = removeItem;
    },
    updateUnitId: (state, action) => {
      const { itemId, unitId, UnitTitle, Price } = action.payload;
      const item = state.cart?.find((item) => item.Id === itemId);
      if (item) {
        item.UnitID = unitId;
        item.UnitTitle = UnitTitle;
        item.Price = Price;
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
      state.shoppinglist = state.shoppinglist?.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails?.filter(
          (item) => item.ShoppingListDetailID !== action.payload
        ),
      }));
    },
    updateShoppingListUnitId: (state, action) => {
      const { itemId, unitId, UnitTitle, Price } = action.payload;
      state.shoppinglist = state.shoppinglist?.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails?.map((item) =>
          item.ShoppingListDetailID === itemId
            ? {
                ...item,
                UnitID: unitId,
                UnitTitle,
                Price: Price,
              }
            : item
        ),
      }));
    },
    incrementShoppingListQuantity: (state, action) => {
      const itemId = action.payload;
      state.shoppinglist = state.shoppinglist?.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails?.map((item) =>
          item.ShoppingListDetailID === itemId
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
      state.shoppinglist = state.shoppinglist?.map((list) => ({
        ...list,
        lstshoppingDetails: list.lstshoppingDetails?.map((item) =>
          item.ShoppingListDetailID === itemId
            ? {
                ...item,
                Quantity: item.Quantity > 0 ? item.Quantity - 1 : 0,
              }
            : item
        ),
      }));
    },
    replaceCartWithShoppingList: (state, action) => {
      const shoppingListItems = action.payload.lstshoppingDetails?.map(
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
          ProductID: item.ProductID,
        })
      );

      state.cart = shoppingListItems;
    },
    setAllAddress: (state, action) => {
      state.allAddress = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const {
  setAllProducts,
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
  setAllAddress,
  removeAllCartItems,
  setAllOrders,
} = cartSlice.actions;

export default cartSlice.reducer;

export const GetAllShoppingList = () => {
  return apiCallBegan({
    url: `ShoppingListInfo/GetShoppingList`,
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
    onStart: shoppingListRequested.type,
    onSuccess: shoppingListSuccess.type,
    onError: shoppingListFailed.type,
  });
};
