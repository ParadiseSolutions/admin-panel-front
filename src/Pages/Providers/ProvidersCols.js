import React from "react";
import { changeActiveBoats, updateProviders } from "../../Utils/API/Providers";
import { providersData } from "../../Utils/Redux/Actions/ProvidersActions";
import { useDispatch } from "react-redux";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const LastName = (cell) => {
  return cell.value ? cell.value : "";
};
const Email = (cell) => {
  return cell.value ?  <a href={`mailto:${cell.value}`} target="_blank" rel="noreferrer">{cell.value}</a> : "";
};
const Phone = (cell) => {
  return cell.value ?  <a href={`tel:${cell.value}`}>{cell.value}</a> : "";
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
    request: updateProviders,
    // El listado pasa su propio refresh para conservar el filtro Show Active;
    // sin el, recargar traeria la lista completa.
    onStatusChange: cell.onStatusChange || (() => dispatch(providersData())),
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

const ActiveBoat = ({ cell, onStatusChange }) => {
  const active = Number(cell.active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.id,
    active: active,
    request: changeActiveBoats,
    onStatusChange: onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

// const Active = (boat) => {
//     return (
//         <Badge
//           className={"badge badge-pill bg-pill font-size-12 bg-soft-" +
//           (cell.active === 1 ? "success" : "danger")}
//         >
//           {cell.value === 1 ? 'Active' : 'Inactive'}
//         </Badge>
//     )
// };

export { Name, Phone, Active, LastName, Email, Rol, ActiveBoat };
