import React from "react";
import { statusUpdatePayments } from "../../Utils/API/Payments";
import { paymentTypesData } from "../../Utils/Redux/Actions/PaymentTypesActions";
import { useDispatch } from "react-redux";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";
const CartName = (cell) => {
  return cell.value ? cell.value : "";
};
const CartID = (cell) => {
  return cell.value ? cell.value : "";
};


const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdatePayments,
    onStatusChange: () => dispatch(paymentTypesData()),
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

// const Active = (cell) => {
//     return (
//         <Badge
//           className={"badge badge-pill bg-pill font-size-12 bg-soft-" +
//           (cell.value === 1 ? "success" : "danger")}
//         >
//           {cell.value === 1 ? 'Active' : 'Inactive'}
//         </Badge>
//     )
// };

export { CartName, CartID, Active };
