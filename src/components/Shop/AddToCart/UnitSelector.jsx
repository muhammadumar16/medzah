const UnitSelector = ({ item, selectedUnit, handleUnitChange }) => {
  return (
    <td className="">
      {item.lstProductUnitAssociates &&
        item.lstProductUnitAssociates.length > 0 && (
          <div className="d-flex align-items-center">
            <select
              className="form-select mt-2"
              style={{ width: "80px" }}
              value={selectedUnit?.UnitID || null}
              onChange={(e) => handleUnitChange(item, e.target.value)}
            >
              {item.lstProductUnitAssociates.map((unit) => (
                <option key={unit.UnitID} value={unit.UnitID}>
                  {unit.UnitTitle}
                </option>
              ))}
            </select>
          </div>
        )}
    </td>
  );
};

export default UnitSelector;

// import { useDispatch } from "react-redux";
// import { setSelectedUnitPrice } from "store/cart";

// const UnitSelector = ({ item }) => {
//   const dispatch = useDispatch();

//   return (
//     <td className="">
//       {item.lstProductUnitAssociates &&
//         item.lstProductUnitAssociates.length > 0 && (
//           <div className="d-flex align-items-center">
//             <select
//               className="form-select mt-2"
//               style={{ width: "92px" }}
//               onChange={(e) => {
//                 const selectedUnitId = e.target.value;
//                 if (selectedUnitId === "default") {
//                   console.log("No unit selected.");
//                   return;
//                 }
//                 const selectedUnit = item.lstProductUnitAssociates.find(
//                   (unit) => unit.UnitID === parseInt(selectedUnitId)
//                 );
//                 console.log("Selected Unit Price:", selectedUnit.Price);
//                 let price = 200;
//                 dispatch(
//                   setSelectedUnitPrice({
//                     UnitID: selectedUnit.UnitID,
//                     UnitTitle: selectedUnit.UnitTitle,
//                     UnitPrice: selectedUnit.Price,
//                     ProductID: item.ProductID,
//                   })
//                 );
//               }}
//             >
//               <option value="default">Select</option>
//               {item.lstProductUnitAssociates.map((unit) => (
//                 <option key={unit.UnitID} value={unit.UnitID}>
//                   {unit.UnitTitle}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//     </td>
//   );
// };

// export default UnitSelector;
