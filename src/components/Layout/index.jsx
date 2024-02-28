import {
  FooterPage,
  HeaderPage,
  Offcanvas,
  SidebarPage,
} from "pages/PrivatePages";

const Layout = ({
  children,
  showSidebar = true,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <>
      <div className="page-wrapper toggled">
        {showSidebar && <SidebarPage />}
        <main className={`bg-light ${showSidebar ? "page-content" : ""}`}>
          {showHeader && <HeaderPage />}
          <div className="container-fluid">{children}</div>
          {showFooter && <FooterPage />}
        </main>
      </div>
      <Offcanvas />
    </>
  );
};

export default Layout;
