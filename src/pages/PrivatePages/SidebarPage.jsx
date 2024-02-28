// SidebarPage.js
import React, { useState } from "react";
import Select from "components/Sidebar/Select/Select";
import { Link } from "react-router-dom";
import {
  CART,
  DASHBOARD,
  HOMEACCOUNT,
  INVOICE,
  ORDERS,
  ORDERWIZARD,
  RENTALS,
  SHOPPINGLIST,
  USERS,
} from "constants/sidebar";

function SidebarPage() {
  const [activeItem, setActiveItem] = useState(null);

  const selectHandler = (item) => {
    setActiveItem(item);
  };

  return (
    <nav id="sidebar" className="sidebar-wrapper sidebar-dark">
      <div
        className="sidebar-content"
        data-simplebar
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="sidebar-brand mx-2">
          <Link to="/">
            <span className="sidebar-colored">
              <img
                src="/assets/images/client/logo.png"
                height={55}
                alt="...."
              />
            </span>
          </Link>
        </div>
        <ul className="sidebar-menu">
          <Select
            select={DASHBOARD}
            active={activeItem === DASHBOARD}
            selectHandler={() => selectHandler(DASHBOARD)}
          />
          <Select
            select={HOMEACCOUNT}
            active={activeItem === HOMEACCOUNT}
            selectHandler={() => selectHandler(HOMEACCOUNT)}
          />
          <Select
            select={SHOPPINGLIST}
            active={activeItem === SHOPPINGLIST}
            selectHandler={() => selectHandler(SHOPPINGLIST)}
          />
          <Select
            select={RENTALS}
            active={activeItem === RENTALS}
            selectHandler={() => selectHandler(RENTALS)}
          />
          <Select
            select={ORDERWIZARD}
            active={activeItem === ORDERWIZARD}
            selectHandler={() => selectHandler(ORDERWIZARD)}
          />
          <Select
            select={CART}
            active={activeItem === CART}
            selectHandler={() => selectHandler(CART)}
          />
          <Select
            select={INVOICE}
            active={activeItem === INVOICE}
            selectHandler={() => selectHandler(INVOICE)}
          />
          <Select
            select={ORDERS}
            active={activeItem === ORDERS}
            selectHandler={() => selectHandler(ORDERS)}
          />
          <div
            style={{
              borderTop: "2px solid #1b263b",
              marginTop: "20px",
              width: "85%",
              marginLeft: "20px",
            }}
          />
          <Select
            select={USERS}
            active={activeItem === USERS}
            selectHandler={() => selectHandler(USERS)}
          />
        </ul>
      </div>
    </nav>
  );
}

export default SidebarPage;
