import useAPI from "hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductApi from "services/Product.service";
import { GetAllShoppingList } from "store/cart";
import Loader from "utility/Loader";
import "./tableheader.css";

export const ShoppingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteShoppingList = useAPI(ProductApi.deleteShoppingList);
  const ListItems = useSelector((state) => state?.entities?.cart?.shoppinglist);
  const loading = useSelector(
    (state) => state?.entities?.cart?.shoppingListLoader
  );

  const handleRemoveList = async (itemId) => {
    try {
      const result = await deleteShoppingList.request(itemId);
      if (result.data.Status === 101) {
        toast.info("Shopping List Deleted !!");
      }
    } catch (error) {
      console.log("Error Fetching Products Data =>>", error);
    } finally {
      dispatch(GetAllShoppingList());
    }
  };
  const onClickHandler = (id, item) => {
    // console.log("Item and ID", id, item);
    navigate(`/shoppinglistcart/${id}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="layout-specing">
          <div className="d-md-flex justify-content-between align-items-center">
            <h5 className="mb-0">Shopping List</h5>
            <nav
              aria-label="breadcrumb"
              className="d-inline-block mt-2 mt-sm-0"
            >
              <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                <li className="breadcrumb-item text-capitalize">
                  <Link to="/">Medzah</Link>
                </li>
                <li className="breadcrumb-item text-capitalize">
                  <Link to="/shop">Shopping List</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr className="bg-success">
                      <th className="col-md-1">#Sr</th>
                      <th className="col-md-3">Name</th>
                      <th className="col-md-6">Description</th>
                      <th className="col-md-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListItems?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.ShoppingCartTitle}</td>
                        <td>{item.Remarks}</td>
                        <td>
                          <div className="btn-group dropdown-danger me-2 mt-2 ">
                            <button
                              type="button"
                              className="btn btn-primary dropdown-toggle mx-2 "
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span
                                onClick={() =>
                                  onClickHandler(item.ShoppingCartID, item)
                                }
                              >
                                View
                              </span>
                            </button>
                            <div className="dropdown-menu">
                              <a
                                href="javascript:void(0)"
                                onClick={() =>
                                  handleRemoveList(item.ShoppingCartID)
                                }
                                className="dropdown-item"
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
