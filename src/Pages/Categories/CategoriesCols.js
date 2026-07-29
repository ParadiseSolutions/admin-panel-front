import React from "react";
import { useDispatch } from "react-redux";
import { categoriesData } from "../../Utils/Redux/Actions/CategoriesActions";
import { statusUpdate } from "../../Utils/API/Categories";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../Components/Common/StatusSwitch";



const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
    return cell.value ? cell.value : "";
};

const parentCategory = (cell) => {
    return cell.value ? cell.value : "";
};

const Active = (cell) => {
  const dispatch = useDispatch();
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdate,
    onStatusChange: () => dispatch(categoriesData()),
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { Name, Code, parentCategory, Active };
