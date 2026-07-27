import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import { statusUpdatePrice,statusUpdateAddon, statusUpdateRelated } from "../../../../Utils/API/Tours";
import { setRateFormat } from "../../../../Utils/CommonFunctions";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
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
const SwitchLabel = ({ text }) => {
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
      {text}
    </div>
  );
};

// El valor visible se lee siempre de la fila, nunca de un state propio: asi el
// switch no puede quedar desfasado cuando react-table remonta la celda al
// paginar. El padre es quien actualiza la fila via onStatusChange.
const StatusSwitch = ({ active, saving, onToggle }) => {
  return (
    <div className="d-inline-flex flex-column align-items-center">
      <Switch
        uncheckedIcon={<SwitchLabel text="No" />}
        checkedIcon={<SwitchLabel text="Yes" />}
        onColor="#3DC7F4"
        disabled={saving}
        onChange={onToggle}
        checked={active}
      />
      <div
        className="d-flex align-items-center text-muted mt-1"
        style={{ minHeight: "14px", fontSize: "10px" }}
        role="status"
        aria-live="polite"
      >
        {saving ? (
          <>
            <Spinner
              size="sm"
              className="me-1"
              style={{ width: "10px", height: "10px" }}
            />
            Saving...
          </>
        ) : null}
      </div>
    </div>
  );
};

const useStatusToggle = ({ id, active, request, onStatusChange }) => {
  const [saving, setSaving] = useState(false);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggle = () => {
    const nextActive = active ? 0 : 1;
    setSaving(true);
    request(id, { active: nextActive })
      .then(() => {
        if (isMounted.current) setSaving(false);
        if (typeof onStatusChange === "function") {
          onStatusChange(id, nextActive);
        }
      })
      .catch(() => {
        if (isMounted.current) setSaving(false);
        Swal.fire({
          title: "Error",
          text: "The status could not be updated. Refresh the page and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return [saving, toggle];
};

const Active = (props) => {
  const row = props.row.original;
  const active = Number(row.active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdatePrice,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

const ActiveAddon = (props) => {
  const row = props.row.original;
  const active = Number(row.active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdateAddon,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

// Esta tabla guarda el estado en related_active, no en el accessor active.
const ActiveRelated = (props) => {
  const row = props.row.original;
  const active = Number(row.related_active) === 1;
  const [saving, toggle] = useStatusToggle({
    id: row.id,
    active: active,
    request: statusUpdateRelated,
    onStatusChange: props.onStatusChange,
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { Name, Code, Date, Members, Price, Active, Rate, ActiveAddon, URL,ActiveRelated };