//There are columns here that are not used in the websites page.
import React from "react";
import { useDispatch } from "react-redux";
import { statusUpdate } from "../../Utils/API/Websites";
import { websitesData } from "../../Utils/Redux/Actions/WebsitesActions";
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

const Domain = (cell) => {
  return cell.value ? cell.value : "";
};

const URL = (cell) => {
  return cell.value ?  <a href={`${cell.value}`} target="_blank" rel="noreferrer">{cell.value}</a> : "";
};

const Root = (cell) => {
  return cell.value ? cell.value : "";
};

const Folder = (cell) => {
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
    onStatusChange: () => dispatch(websitesData()),
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

export { Name, Code, Date, Domain, URL, Root, Folder, Active };
