import React from "react";
import { useDispatch } from "react-redux";
import { tourTypesData } from "../../Utils/Redux/Actions/TourTypesActions";
import { statusUpdate } from "../../Utils/API/TourTypes";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";



const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdate,
    onStatusChange: () => dispatch(tourTypesData()),
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { Name, Active };
