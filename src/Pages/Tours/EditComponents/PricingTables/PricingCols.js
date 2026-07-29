import React from "react";
import { statusUpdatePrice,statusUpdateAddon, statusUpdateRelated } from "../../../../Utils/API/Tours";
import { setRateFormat } from "../../../../Utils/CommonFunctions";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../../../Components/Common/StatusSwitch";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const Name = (cell) => {
  return cell.value ?  cell.value : "";
};
const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const Members = (cell) => {
  return cell.value ? cell.value : "";
};

const Rate = (cell) => {
  return cell.value ? setRateFormat(cell.value) + "%" : ""
}

const URL = (cell) => {
  return cell.value ?  <a href={`${cell.value}`} target="_blank" rel="noreferrer">{cell.row.original.name}</a> : "";
};
const Price = (cell) => {
  return cell.value ? cell.value : "";
};
const Date = (cell) => {
  return cell.value ? cell.value : "";
};
const Active = (props) => {
  const row = props.row.original;
  const active = Number(row.active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdatePrice,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

const ActiveAddon = (props) => {
  const row = props.row.original;
  const active = Number(row.active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdateAddon,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

// Esta tabla guarda el estado en related_active, no en el accessor active.
const ActiveRelated = (props) => {
  const row = props.row.original;
  const active = Number(row.related_active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdateRelated,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { Name, Code, Date, Members, Price, Active, Rate, ActiveAddon, URL,ActiveRelated };