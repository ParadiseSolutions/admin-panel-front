import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Utils/API/Users";
import { usersData } from "../../Utils/Redux/Actions/UsersActions";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";


const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const FullName = (cell) => {
  return cell.value ? cell.value : "";
}
const LastName = (cell) => {
  return cell.value ? cell.value : "";
};
const Email = (cell) => {
  return cell.value ?  <a href={`mailto:${cell.value}`} target="_blank" rel="noreferrer">{cell.value}</a> : "";
};
const Job = (cell) => {
  return cell.value ? cell.value : "";
};
const Department = (cell) => {
  return cell.value ? cell.value : "";
};
const Rol = (cell) => {
  return cell.value ? cell.value : "";
};

const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: updateUser,
    onStatusChange: () => dispatch(usersData()),
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

export { FullName, Name, Department, Active, LastName, Email, Rol, Job };
