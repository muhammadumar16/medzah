import React from "react";
import Layout from "../../components/Layout/index";
import AdminRouter from "./AdminRouter";
import { useLocation } from "react-router-dom";

const PrivateRouter = () => {
  const location = useLocation();
  const isChangePasswordRoute = location.pathname === "/changepassword";
  return (
    <Layout
      showSidebar={!isChangePasswordRoute}
      showHeader={!isChangePasswordRoute}
      showFooter={!isChangePasswordRoute}
    >
      <AdminRouter />
    </Layout>
  );
};

export default PrivateRouter;
