import React from "react";
import { useDispatch } from "react-redux";
import { statusUpdateRol } from "../../Utils/API/Roles";
import { rolesData } from "../../Utils/Redux/Actions/RolesActions";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";


const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const Department = (cell) => {
  return cell.value ? cell.value : "";
};

const Date = (cell) => {
  return cell.value ? cell.value : "";
};
const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdateRol,
    onStatusChange: () => dispatch(rolesData()),
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

export { Name, Department, Date, Active };
