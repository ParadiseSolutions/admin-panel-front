import React, { useState } from "react";
import Switch from "react-switch";
import { statusUpdate } from "../../Utils/API/TourTypes";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";

const Name = (cell) => {
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

  const [activeTourType, setActiveTourType] = useState(cell.value && cell.value === 1 ? true : false);
  

  const onChangeActive = () => {
    setActiveTourType(!activeTourType);
    if (cell.value === 1) {
      let data = { active: 0 };
      statusUpdate(id, data).then((resp) => {
        console.log("was 1 so changing to 0 " , resp);
        
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      statusUpdate(id, data)
        .then((resp) => {
          console.log("was 0 so changing to 1 " ,resp);
          
          
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            <Toast>
              <ToastHeader icon={<Spinner type="grow" size="sm" color="danger" />}>Oops...</ToastHeader>
              <ToastBody>Something went wrong, try again later.</ToastBody>
            </Toast>;
          }, 5000);
        });
    }
  };

  return (
    <Switch
      uncheckedIcon = {<Offsymbol/>}
      checkedIcon = {<OnSymbol/>}
      onColor="#3DC7F4"
      onChange={() => onChangeActive()}
      checked={activeTourType}
    />
  )
};

export {Name, Active}