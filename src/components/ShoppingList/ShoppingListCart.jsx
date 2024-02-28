// import { useDispatch } from "react-redux";
// import QuantityControl from "./QuantityControl";
// import { removeCartItem, updateUnitId } from "store/cart";
// import { currencySymbol } from "utility/Currency";
// import { useEffect, useState } from "react";
// import UnitSelector from "./UnitSelector";

// const ShoppingListCart = (props) => {
//   const { select, headings } = props;
//   console.log("select", select);
//   const dispatch = useDispatch();
//   const [selectedUnits, setSelectedUnits] = useState({});

//   useEffect(() => {
//     const initialUnits = {};
//     select?.lstshoppingDetails?.forEach((item) => {
//       if (Array.isArray(item.lstProductUnitAssociates)) {
//         const preSelectedUnit = item.lstProductUnitAssociates.find(
//           (u) => u.UnitID === item.UnitID
//         );
//         if (preSelectedUnit) {
//           initialUnits[item.ShoppingCardDetailID] = preSelectedUnit;
//         } else if (item.lstProductUnitAssociates.length > 0) {
//           initialUnits[item.ShoppingCardDetailID] =
//             item.lstProductUnitAssociates[0];
//         }
//       }
//     });
//     setSelectedUnits(initialUnits);
//   }, [select]);

//   const handleUnitChange = (item, unitId) => {
//     const parsedUnitId = parseInt(unitId, 10);
//     const unit = item.lstshoppingDetails[0].lstProductUnitAssociates.find(
//       (u) => u.UnitID === parsedUnitId
//     );

//     setSelectedUnits((prevUnits) => ({
//       ...prevUnits,
//       [item.ShoppingCardDetailID]: {
//         ...unit,
//         UnitID: parsedUnitId,
//       },
//     }));

//     dispatch(
//       updateUnitId({
//         itemId: item.ShoppingCardDetailID,
//         unitId: parsedUnitId,
//         UnitTitle: unit.UnitTitle,
//       })
//     );
//   };

//   return (
//     <div className="table-responsive bg-white shadow rounded">
//       <table className="table mb-0 table-center">
//         <thead>
//           <tr>
//             <th className="border-bottom py-3" style={{ minWidth: 20 }} />
//             {headings?.map((heading, index) => (
//               <th
//                 key={heading?.id}
//                 className={`border-bottom py-3 ${
//                   index === 0
//                     ? "text-start"
//                     : index === 4
//                     ? "text-end"
//                     : index === 2
//                     ? "text-start"
//                     : "text-center"
//                 }${index === 4 ? " pe-4" : ""} ${index === 2 ? "mx-5" : ""}`}
//                 style={{ minWidth: heading?.id === 1 ? 300 : 160 }}
//               >
//                 {heading?.name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {select?.lstshoppingDetails?.map((item) => (
//             <tr key={item.ShoppingCardDetailID} className="shop-list">
//               <td>
//                 <div className="d-flex align-items-center">
//                   {item.lstProductImages &&
//                     item.lstProductImages.length > 0 && (
//                       <img
//                         src={item.lstProductImages[0].ProductImage}
//                         className="img-fluid avatar avatar-small rounded shadow"
//                         style={{ height: "auto" }}
//                         alt="Product"
//                       />
//                     )}
//                   <h6 className="mb-0 ms-2">{item?.ProductTitle}</h6>
//                 </div>
//               </td>
//               <td className="text-center">
//                 {currencySymbol}{" "}
//                 {selectedUnits?.item.ShoppingCardDetailID?.Price.toFixed(2)}
//               </td>
//               <UnitSelector
//                 item={item}
//                 selectedUnit={selectedUnits[item.ShoppingCardDetailID]}
//                 handleUnitChange={handleUnitChange}
//               />
//               <td className="text-center qty-icons">
//                 <QuantityControl
//                   initialQuantity={item.Quantity}
//                   Id={item.ShoppingCardDetailID}
//                   quantity={item.Quantity}
//                 />
//               </td>
//               <td className="text-end fw-bold pe-4">
//                 {currencySymbol} {(item?.Quantity * item?.Price).toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShoppingListCart;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateShoppingListUnitId, removeShoppingListItem } from "store/cart";
import { currencySymbol } from "utility/Currency";
import UnitSelector from "./UnitSelector";
import QuantityControl from "./QuantityControl";
import { Link } from "react-router-dom";

const ShoppingListCart = ({ select, headings }) => {
  const dispatch = useDispatch();
  const [selectedUnits, setSelectedUnits] = useState({});

  useEffect(() => {
    const initialUnits = {};
    select?.lstshoppingDetails?.forEach((item) => {
      // Correcting the check for the presence of lstProductUnitAssociates
      if (
        Array.isArray(item.lstProductUnitAssociates) &&
        item.lstProductUnitAssociates.length
      ) {
        initialUnits[item.ShoppingCardDetailID] =
          item.lstProductUnitAssociates.find((u) => u.UnitID === item.UnitID) ||
          item.lstProductUnitAssociates[0];
      }
    });
    setSelectedUnits(initialUnits);
  }, [select]);

  const handleUnitChange = (item, unitId) => {
    const parsedUnitId = parseInt(unitId, 10);
    const unit = item.lstProductUnitAssociates.find(
      (u) => u.UnitID === parsedUnitId
    );

    setSelectedUnits((prevUnits) => ({
      ...prevUnits,
      [item.ShoppingCardDetailID]: unit,
    }));

    dispatch(
      updateShoppingListUnitId({
        itemId: item.ShoppingCardDetailID,
        unitId: parsedUnitId,
        UnitTitle: unit.UnitTitle,
      })
    );
  };

  return (
    <>
      {select?.lstshoppingDetails?.length === 0 ? (
        <p>
          Your Shopping List Is Empty. Go Add Something{" "}
          <Link to="/shoppinglist" className="btn btn-sm btn-danger my-2 mx-2">
            Go Back
          </Link>
        </p>
      ) : (
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
                    }${index === 4 ? " pe-4" : ""} ${
                      index === 2 ? "mx-5" : ""
                    }`}
                    style={{ minWidth: heading?.id === 1 ? 300 : 160 }}
                  >
                    {heading?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {select?.lstshoppingDetails?.map((item) => (
                <tr key={item.ShoppingCardDetailID} className="shop-list">
                  <td className="h6 text-center">
                    <button
                      style={{ border: "none", backgroundColor: "transparent" }}
                      onClick={() =>
                        dispatch(
                          removeShoppingListItem(item.ShoppingCardDetailID)
                        )
                      }
                      className="text-danger"
                    >
                      <i className="uil uil-times" />
                    </button>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.lstProductImages && item.lstProductImages[0] && (
                        <img
                          src={item.lstProductImages[0].ProductImage}
                          alt="Product"
                          className="img-fluid avatar avatar-small rounded shadow"
                          style={{ height: "auto" }}
                        />
                      )}
                      <h6 className="mb-0 ms-2">{item.ProductTitle}</h6>
                    </div>
                  </td>
                  <td className="text-center">
                    {currencySymbol}{" "}
                    {selectedUnits[item.ShoppingCardDetailID]?.Price.toFixed(2)}
                  </td>
                  <UnitSelector
                    item={item}
                    selectedUnit={selectedUnits[item.ShoppingCardDetailID]}
                    handleUnitChange={handleUnitChange}
                  />
                  <td className="text-center qty-icons">
                    <QuantityControl
                      initialQuantity={item.Quantity}
                      Id={item.ShoppingCardDetailID}
                      quantity={item.Quantity}
                    />
                  </td>
                  <td className="text-end fw-bold pe-4">
                    {currencySymbol}{" "}
                    {(
                      item.Quantity *
                      selectedUnits[item.ShoppingCardDetailID]?.Price
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ShoppingListCart;
