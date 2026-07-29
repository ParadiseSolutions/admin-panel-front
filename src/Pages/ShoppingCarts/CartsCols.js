import React from "react";
import { statusUpdate } from "../../Utils/API/ShoppingCarts";
import { useDispatch } from "react-redux";
import { shoppingCartsData } from "../../Utils/Redux/Actions/ShoppingCartActions";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const CartName = (cell) => {
  return cell.value ? cell.value : "";
};
const CartID = (cell) => {
  return cell.value ? cell.value : "";
};

const Server = (cell) => {
  return cell.value ? cell.value : "";
};
const Website = (cell) => {
  return cell.value ? cell.value : "";
};
const TestLink = (cell) => {
  return cell.value ?  <a href={cell.value} target="_blank" rel="noreferrer">{cell.value}</a> : "";
};
const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdate,
    onStatusChange: () => dispatch(shoppingCartsData()),
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { CartName, CartID, Server, Website, TestLink, Active };
