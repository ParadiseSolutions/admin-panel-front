import React, { useState } from "react";
import Switch from "react-switch";
import { statusUpdate, statusUpdatePrice,statusUpdateAddon, triggerUpdate } from "../../../../Utils/API/Tours";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { setRateFormat } from "../../../../Utils/CommonFunctions";
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

const Price = (cell) => {
  return cell.value ? "$" + cell.value : "";
};
const Date = (cell) => {
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

  const onChangeActive = () => {
    setActiveDep(!activeDep);

    if (activeDep) {
      let data = { active: 0 };
      statusUpdatePrice(id, data).then((resp) => {
        triggerUpdate()
        // console.log(resp);
      });
    }
    if (activeDep) {
      let data = { active: 1 };
      statusUpdatePrice(id, data)
        .then((resp) => {
          triggerUpdate()
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

const ActiveAddon = (cell) => {
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

  const [activeDepAddon, setActiveDepAddon] = useState(
    cell.value && cell.value === 1 ? true : false
  );

  const onChangeActiveAddon = () => {
    setActiveDepAddon(!activeDepAddon);

    if (activeDepAddon) {
      let data = { active: 0 };
      statusUpdateAddon(id, data).then((resp) => {
        triggerUpdate()
        // console.log(resp);
      });
    }
    if (activeDepAddon) {
      let data = { active: 1 };
      statusUpdateAddon(id, data)
        .then((resp) => {
          triggerUpdate()
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
      onChange={() => onChangeActiveAddon()}
      checked={activeDepAddon}
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

export { Name, Code, Date, Members, Price, Active, Rate, ActiveAddon };
