import React, { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { locationsData } from "../../Utils/Redux/Actions/LocationsActions";
import { statusUpdate } from "../../Utils/API/Locations";
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

  const [activeLocation, setActiveLocation] = useState(cell.value && cell.value === 1 ? true : false);
  const dispatch = useDispatch();
  const locationsRequest = () => dispatch(locationsData());
  const onChangeActive = () => {
    setActiveLocation(!activeLocation);
    if (cell.value === 1) {
      let data = { active: 0 };
      statusUpdate(id, data).then((resp) => {
        console.log("was 1 so changing to 0 ", resp);

        locationsRequest();
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      statusUpdate(id, data)
        .then((resp) => {
          console.log("was 0 so changing to 1 ", resp);

          locationsRequest();
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

  return <Switch uncheckedIcon={<Offsymbol />} checkedIcon={<OnSymbol />} onColor="#3DC7F4" onChange={() => onChangeActive()} checked={activeLocation} />;
};

export { Name, Active };
