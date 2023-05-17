import React, { useState } from "react";
import Switch from "react-switch";
import { statusUpdateTour } from "../../Utils/API/Tours";
import { Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toursData } from "../../Utils/Redux/Actions/ToursActions";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const CartName = (cell) => {
  return cell.value ? cell.value : "";
};
const CartID = (cell) => {
  return cell.value ? <a href={`${cell.value}`} target='_blank' rel="noreferrer"> {`${cell.value}`} </a> : "";
};

const Server = (cell) => {
  return cell.value ? cell.value : "";
};
const Website = (cell) => {
  return cell.value ? cell.value : "";
};
const TestLink = (cell) => {
  return cell.value ?  cell.value : "";
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

  const dispatch = useDispatch();
  const onChangeActive = () => {
    setActiveDep(!activeDep);

    if (cell.value === 1) {
      let data = { active: 0 };
      statusUpdateTour(id, data).then((resp) => {
        // console.log(resp);
        const toursRequest = () => dispatch(toursData());
          toursRequest();
      });
    }
    if (cell.value === 0) {
      let data = { active: 1 };
      statusUpdateTour(id, data)
        .then((resp) => {
          // console.log(resp);
          const toursRequest = () => dispatch(toursData());
          toursRequest();
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

export { CartName, CartID, Server, Website, TestLink, Active };
