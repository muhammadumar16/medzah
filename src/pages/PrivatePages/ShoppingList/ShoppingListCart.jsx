import ShoppingCart from "components/ShoppingList/ShoppingListCart";
import { CARTITEMSHEADINGS } from "constants/cartItems";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { replaceCartWithShoppingList } from "store/cart";

export const ShoppingListCart = () => {
  const { id } = useParams();
  const shoppinglist = useSelector(
    (state) => state?.entities?.cart?.shoppinglist
  );
  const filteredList = shoppinglist.filter(
    (item) => item.ShoppingListID === parseInt(id)
  );
  console.log("Filtered Shopping List=>>>", filteredList);
  const data = filteredList?.[0];
  const dispatch = useDispatch();

  console.log("Add item To Cart Data", data);
  const handleAddToCart = () => {
    dispatch(replaceCartWithShoppingList(data));
    toast.success("Added Items To Your Cart");
  };

  return (
    <div className="layout-specing">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        style={{ width: "350px" }}
      />
      <div className="d-md-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          Shopping List :{" "}
          <strong>{filteredList?.[0]?.ShoppingCartTitle}</strong>
        </h5>
        <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
          <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
            <li className="breadcrumb-item text-capitalize">
              <Link to="/">Medzah</Link>
            </li>
            <li className="breadcrumb-item text-capitalize">
              <Link to="/shoppinglist">Shopping List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          <ShoppingCart select={data} headings={CARTITEMSHEADINGS} />
        </div>
        <div className="col-12 mt-2 text-end mt-4">
          <button
            className="btn btn-sm p-2 btn-primary"
            onClick={handleAddToCart}
          >
            Add Items To My Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
};
