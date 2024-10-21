import React, { useState } from "react";
import Switch from "react-switch";
import { statusUpdatePrice,statusUpdateAddon, triggerUpdate, statusUpdateRelated } from "../../../../Utils/API/Tours";
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

const URL = (cell) => {
  return cell.value ?  <a href={`${cell.value}`} target="_blank" rel="noreferrer">{cell.row.original.name}</a> : "";
};
const Price = (cell) => {
  return cell.value ? cell.value : "";
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
    } else {
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
    } else {
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
const ActiveRelated = (cell) => {
  const id = cell.row.original.id;
  console.log(cell.row.original.related_active)
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
    cell.cell.row.original.related_active && cell.cell.row.original.related_active === 1 ? true : false
  );

  const onChangeActiveAddon = () => {
    setActiveDepAddon(!activeDepAddon);

    if (activeDepAddon) {
      let data = { active: 0 };
      statusUpdateRelated(id, data).then((resp) => {
        triggerUpdate()
        // console.log(resp);
      });
    } else {
      let data = { active: 1 };
      statusUpdateRelated(id, data)
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

export { Name, Code, Date, Members, Price, Active, Rate, ActiveAddon, URL,ActiveRelated };