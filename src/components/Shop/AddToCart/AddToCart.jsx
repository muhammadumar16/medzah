import { useDispatch } from "react-redux";
import QuantityControl from "./QuantityControl";
import { removeCartItem, updateUnitId } from "store/cart";
import { currencySymbol } from "utility/Currency";
import { useEffect, useState } from "react";
import UnitSelector from "./UnitSelector";

const AddToCart = (props) => {
  const { select, headings } = props;
  const dispatch = useDispatch();
  const [selectedUnits, setSelectedUnits] = useState({});

  // useEffect(() => {
  //   const initialUnits = {};
  //   select.forEach((item) => {
  //     if (item.lstProductUnitAssociates && item.lstProductUnitAssociates[0]) {
  //       initialUnits[item.Id] = item.lstProductUnitAssociates[0];
  //     }
  //   });
  //   setSelectedUnits(initialUnits);
  // }, []);
  useEffect(() => {
    const initialUnits = {};
    select.forEach((item) => {
      // Find the pre-selected unit based on some criteria, e.g., UnitID = 2
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

  const handleUnitChange = (item, unitId) => {
    const parsedUnitId = parseInt(unitId, 10);
    const unit = item.lstProductUnitAssociates.find(
      (u) => u.UnitID === parsedUnitId
    );

    setSelectedUnits((prevUnits) => ({
      ...prevUnits,
      [item.Id]: {
        ...unit,
        UnitID: parsedUnitId,
      },
    }));

    dispatch(
      updateUnitId({
        itemId: item.Id,
        unitId: parsedUnitId,
        UnitTitle: unit.UnitTitle,
        Price: unit.Price,
      })
    );
  };

  return (
    <div className="table-responsive bg-white shadow rounded">
      <table className="table mb-0 table-center">
        <thead>
          <tr>
            <th className="border-bottom py-3" style={{ minWidth: 20 }} />
            {headings?.map((heading, index) => (
              <th
                key={heading?.id}
                className={`border-bottom py-3 ${
                  index === 0
                    ? "text-start"
                    : index === 4
                    ? "text-end"
                    : index === 2
                    ? "text-start"
                    : "text-center"
                }${index === 4 ? " pe-4" : ""} ${index === 2 ? "mx-5" : ""}`}
                style={{ minWidth: heading?.id === 1 ? 300 : 160 }}
              >
                {heading?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {select?.map((item) => (
            <tr key={item.Id} className="shop-list">
              <td className="h6 text-center">
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  onClick={() => dispatch(removeCartItem(item.Id))}
                  className="text-danger"
                >
                  <i className="uil uil-times" />
                </button>
              </td>
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
              <UnitSelector
                item={item}
                selectedUnit={selectedUnits[item.Id]}
                handleUnitChange={handleUnitChange}
              />

              <td className="text-center qty-icons">
                <QuantityControl
                  initialQuantity={item.quantity}
                  Id={item.Id}
                  quantity={item.quantity}
                />
              </td>
              <td className="text-end fw-bold pe-4">
                {currencySymbol}{" "}
                {(item?.quantity * selectedUnits?.[item.Id]?.Price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AddToCart.propTypes = {
  // bla: PropTypes.string,
};

AddToCart.defaultProps = {
  // bla: 'test',
};

export default AddToCart;
