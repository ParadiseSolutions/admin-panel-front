import React, { useState } from "react";
import Switch from "react-switch";
import { statusUpdateTour, triggerUpdate } from "../../../Utils/API/Tours";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toursData } from "../../../Utils/Redux/Actions/ToursActions";
import { createStorageSync, getCookie, getStorageSync, setCookie } from "../../../Utils/API";
import Tours from "..";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const CartName = (cell) => {
  return cell.value ? cell.value : "";
};
const CartID = (cell) => {
  return cell.value ? cell.value : "";
};

const Server = (cell) => {
  return cell.value ? cell.value : "";
};
const Website = (cell) => {
  return cell.value ? cell.value : "";
};
const TestLink = (cell) => {
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

  const [activeDep, setActiveDep] = useState(
    cell.value && cell.value === 1 ? true : false
  );

  const updateLocalStorageStatus = (newInfo, cell) => {
    let tourInfo = getCookie("tour_data", true);
    if (tourInfo && newInfo?.id) {
      tourInfo[cell.row.index] = newInfo
      setCookie("tour_data", JSON.stringify(tourInfo), 24 * 60 * 60)
    }
  }

  const onChangeActive = () => {
    setActiveDep(!activeDep);
    if (activeDep) {
      let data = { active: 0 };
      statusUpdateTour(id, data).then((resp) => {
        triggerUpdate();
        updateLocalStorageStatus(resp.data.data, cell)
      });
    } else {
      let data = { active: 1 };
      statusUpdateTour(id, data)
        .then((resp) => {
          // console.log(resp);
          triggerUpdate();
          updateLocalStorageStatus(resp.data.data, cell)
        })
        .catch((error) => {
          // console.log(error);
          setTimeout(() => {
            <Toast>
              <ToastHeader
                icon={<Spinner type="grow" size="sm" color="danger" />}
              >
                Oops...
              </ToastHeader>
              <ToastBody>Something goes wrong try again later!!!</ToastBody>
            </Toast>;
          }, 5000);
        });
    }
  };
  return (
    <Switch
      uncheckedIcon={<Offsymbol />}
      checkedIcon={<OnSymbol />}
      onColor="#3DC7F4"
      onChange={() => onChangeActive()}
      checked={activeDep}
    />
  );
};

export { CartName, CartID, Server, Website, TestLink, Active };
