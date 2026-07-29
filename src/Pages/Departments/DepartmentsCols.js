import React from "react";
import { useDispatch } from "react-redux";
import { statusUpdate } from "../../Utils/API/Departments";
import { departmentsData } from "../../Utils/Redux/Actions/DepartmentsActions";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const Members = (cell) => {
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
    request: statusUpdate,
    onStatusChange: () => dispatch(departmentsData()),
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

export { Name, Code, Date, Members, Active };
