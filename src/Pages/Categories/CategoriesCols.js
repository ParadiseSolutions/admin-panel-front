import React, { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { categoriesData } from "../../Utils/Redux/Actions/CategoriesActions";
import { statusUpdate } from "../../Utils/API/Categories";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";



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
  const id = cell.row.original.id;
  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };
  const OnSymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };

  const [activeCategory, setActiveCategory] = useState(cell.value && cell.value === 1 ? true : false);
  const dispatch = useDispatch();
  const categoriesRequest = () => dispatch(categoriesData());
  const onChangeActive = () => {
    setActiveCategory(!activeCategory);
    if (cell.value === 1) {
      let data = { active: 0 };
      statusUpdate(id, data).then((resp) => {
        // console.log("was 1 so changing to 0 ", resp);

        categoriesRequest();
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      statusUpdate(id, data)
        .then((resp) => {
          // console.log("was 0 so changing to 1 ", resp);

          categoriesRequest();
        })
        .catch((error) => {
          // console.log(error);
          setTimeout(() => {
            <Toast>
              <ToastHeader icon={<Spinner type="grow" size="sm" color="danger" />}>Oops...</ToastHeader>
              <ToastBody>Something went wrong, try again later.</ToastBody>
            </Toast>;
          }, 5000);
        });
    }
  };

  return <Switch uncheckedIcon={<Offsymbol />} checkedIcon={<OnSymbol />} onColor="#3DC7F4" onChange={() => onChangeActive()} checked={activeCategory} />;
};

export { Name, Code, parentCategory, Active };
