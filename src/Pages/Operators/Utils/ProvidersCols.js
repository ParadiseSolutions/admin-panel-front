import React from "react";
import { updateStatusContactAPI } from "../../../Utils/API/Contacts";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../../Components/Common/StatusSwitch";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const LastName = (cell) => {
  return cell.value ? cell.value : "";
};
const Email = (cell) => {
  return cell.value ? cell.value : "";
};
const Department = (cell) => {
  return cell.value ? cell.value : "";
};
const Rol = (cell) => {
  return cell.value ? cell.value : "";
};

const Active = (cell) => {
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: updateStatusContactAPI,
    // Antes esto recargaba la pagina entera; ahora el padre actualiza la fila.
    onStatusChange: cell.onStatusChange,
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

export { Name, Department, Active, LastName, Email, Rol };
