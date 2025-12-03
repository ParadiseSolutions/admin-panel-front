import React, { useState } from "react";
import Switch from "react-switch";
import { changeActiveBoats, updateProviders } from "../../Utils/API/Providers";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { providersData } from "../../Utils/Redux/Actions/ProvidersActions";
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
      updateProviders(id, data).then((resp) => {
        var providersRequest = () => dispatch(providersData());
    providersRequest();
        // console.log(resp);
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      updateProviders(id, data)
        .then((resp) => {
          var providersRequest = () => dispatch(providersData());
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
              <ToastBody>Something went wrong. Please, try again later!</ToastBody>
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
const ActiveBoat = (boat) => {
  console.log('boat',boat);
  const dispatch = useDispatch();
  const id = boat.cell.id;
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
    boat.cell.active && boat.cell.active === 1 ? true : false
  );

  const onChangeActive = () => {
    setActiveDep(!activeDep);

    if (boat.cell.active === 1) {
      let data = { active: 0 };
      changeActiveBoats(id, data).then((resp) => {
        var providersRequest = () => dispatch(providersData());
        providersRequest();
        // console.log(resp);
      });
    }
    if (boat.cell.active === 0) {
      let data = { active: 1 };
     changeActiveBoats(id, data).then((resp) => {
        var providersRequest = () => dispatch(providersData());
        providersRequest();
        // console.log(resp);
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
