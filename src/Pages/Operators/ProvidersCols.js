import React, { useState } from "react";
import Switch from "react-switch";
import { updateOperatorStatus } from "../../Utils/API/Operators";
import { operatorsData } from "../../Utils/Redux/Actions/OperatorsActions";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
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

  const onChangeActive = () => {
    setActiveDep(!activeDep);

    if (cell.value === 1) {
      let data = { active: 0 };
      updateOperatorStatus(id, data).then((resp) => {
        var providersRequest = () => dispatch(operatorsData());
        providersRequest();
        // console.log(resp);
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      updateOperatorStatus(id, data)
        .then((resp) => {
          var providersRequest = () => dispatch(operatorsData());
          providersRequest();

          // console.log(resp);
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

export { Name, Phone, Active, LastName, Email, Rol };
