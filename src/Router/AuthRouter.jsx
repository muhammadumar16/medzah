import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SignInPage from "pages/PublicPages/SignInPage";
import SignUpPage from "pages/PublicPages/SignUpPage";
import ForgetPassword from "../pages/PublicPages/ForgetPassword";

const AuthRouter = () => {
  useEffect(() => {
    console.log("Public Router");
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthRouter;
