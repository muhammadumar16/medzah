import { useDispatch } from "react-redux";
import {
  decrementShoppingListQuantity,
  incrementShoppingListQuantity,
} from "store/cart";

const QuantityControl = ({ Id, quantity = 0 }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(incrementShoppingListQuantity(Id));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decrementShoppingListQuantity(Id));
    }
  };

  return (
    <div className="quantity-control">
      <button
        onClick={handleDecrease}
        className="btn btn-icon btn-soft-primary minus"
      >
        -
      </button>
      <input
        min={0}
        name="quantity"
        value={quantity}
        readOnly
        className="btn btn-icon btn-soft-primary qty-btn quantity p-0"
      />
      <button
        onClick={handleIncrease}
        className="btn btn-icon btn-soft-primary plus"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
