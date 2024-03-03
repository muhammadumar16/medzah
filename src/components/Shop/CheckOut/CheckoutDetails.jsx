import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencySymbol } from "utility/Currency";

const CheckoutDetails = (props) => {
  const { select, headings } = props;
  const [selectedUnits, setSelectedUnits] = useState({});
  const cartItems = useSelector((state) => state?.entities?.cart?.cart);
  const [subtotal, setSubtotal] = useState(0);
  const taxes = 60;
  const totalAmount = taxes + subtotal;
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item?.Price * item.quantity;
    });
    setSubtotal(totalPrice);
  };

  useEffect(() => {
    getTotal();
  }, [cartItems]);

  useEffect(() => {
    const initialUnits = {};
    select.forEach((item) => {
      const preSelectedUnit = item.lstProductUnitAssociates.find(
        (u) => u.UnitID === item.UnitID
      );

      if (preSelectedUnit) {
        initialUnits[item.Id] = preSelectedUnit;
      } else if (
        item.lstProductUnitAssociates &&
        item.lstProductUnitAssociates[0]
      ) {
        // Fallback to the first unit if the specific one is not found
        initialUnits[item.Id] = item.lstProductUnitAssociates[0];
      }
    });
    setSelectedUnits(initialUnits);
  }, []);

  return (
    <div className="table-responsive bg-white shadow rounded">
      <table className="table mb-0 table-center">
        <thead>
          <tr>
            <th className="border-bottom py-3 px-5" style={{ minWidth: 20 }}>
              ID
            </th>
            {headings?.map((heading, index) => (
              <th
                key={heading?.id}
                className={`border-bottom py-3 ${
                  index === 0 ? "text-start" : "text-center"
                }${index === 5 ? " pe-5" : ""} `}
                style={{ minWidth: heading?.id === 1 ? 200 : 160 }}
              >
                {heading?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {select?.map((item, index) => (
            <tr key={item.Id} className="shop-list">
              <td className="h6 text-center">{index + 1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    className="img-fluid avatar avatar-small rounded shadow"
                    style={{ height: "auto" }}
                    alt="Image"
                  />
                  <h6 className="mb-0 ms-2">{item?.ProductTitle}</h6>
                </div>
              </td>
              <td className="text-center">
                {currencySymbol} {selectedUnits?.[item.Id]?.Price.toFixed(2)}
              </td>

              <td className="text-center">
                {item.lstProductUnitAssociates &&
                  item.lstProductUnitAssociates.length > 0 && (
                    <span>{item.UnitTitle}</span>
                  )}
              </td>

              <td className="text-center ">
                <div className="quantity-control">{item.quantity}</div>
              </td>
              <td className="text-center fw-bold pe-4">
                {currencySymbol}{" "}
                {(item?.quantity * selectedUnits?.[item.Id]?.Price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="col-lg-4 col-md-6 ms-auto mt-2 mb-2 mx-4">
        <div className="table-responsive bg-white rounded ">
          <table className="table table-center table-padding mb-0">
            <tbody>
              <tr>
                <td className="h6 ps-4 py-3">Freight</td>
                <td className="text-end fw-bold pe-4">
                  {currencySymbol} {taxes.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="h6 ps-4 py-3">Total</td>
                <td className="text-end fw-bold pe-4">
                  {currencySymbol} {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
CheckoutDetails.propTypes = {
  // bla: PropTypes.string,
};

CheckoutDetails.defaultProps = {
  // bla: 'test',
};

export default CheckoutDetails;
