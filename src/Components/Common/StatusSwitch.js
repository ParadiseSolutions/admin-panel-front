import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";

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

// El valor visible se lee siempre de los datos de la fila, nunca de un state
// propio: asi el switch no puede quedar desfasado cuando react-table remonta la
// celda al paginar. Quien actualiza la fila es el padre, via onStatusChange.
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

// El payload se calcula del valor real de la fila, no de un state local: de otro
// modo el segundo click sobre la misma fila reenvia el mismo valor y el cambio
// se pierde en silencio.
// Si onStatusChange devuelve una promesa (por ejemplo el dispatch que recarga la
// lista) el indicador se mantiene hasta que los datos nuevos llegan.
const useStatusToggle = ({ id, active, request, onStatusChange }) => {
  const [saving, setSaving] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggle = () => {
    if (saving) return;
    const nextActive = active ? 0 : 1;
    setSaving(true);
    request(id, { active: nextActive })
      .then((resp) => {
        const pending =
          typeof onStatusChange === "function"
            ? onStatusChange(id, nextActive, resp)
            : null;
        return Promise.resolve(pending);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "The status could not be updated. Refresh the page and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        if (isMounted.current) setSaving(false);
      });
  };

  return [saving, toggle];
};

export { StatusSwitch, useStatusToggle, SwitchLabel };
export default StatusSwitch;
