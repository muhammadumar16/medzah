import { Checkout } from "pages/PrivatePages/Ecommerce/Checkout";
import { ProductDetails } from "pages/PrivatePages/Ecommerce/ProductDetails";
import { Shop } from "pages/PrivatePages/Ecommerce/Shop";
import { ShoppingCart } from "pages/PrivatePages/Ecommerce/ShoppingCart";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Analytics from "pages/PrivatePages/Dashboard/Analytics";
import { Profile } from "pages/PrivatePages/Profile";
import { ChangePassword } from "pages/PublicPages/ChangePassword";
import { ShoppingList } from "pages/PrivatePages/ShoppingList/ShoppingList";
import { ShoppingListCart } from "pages/PrivatePages/ShoppingList/ShoppingListCart";

const AdminRouter = () => {
  useEffect(() => {
    console.log("Admin Router");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Analytics />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="/shoppinglist" element={<ShoppingList />} />
      <Route path="/shoppinglistcart/:id" element={<ShoppingListCart />} />
      <Route path="/shoppingcart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRouter;
