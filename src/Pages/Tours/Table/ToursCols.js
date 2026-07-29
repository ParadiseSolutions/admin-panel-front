import React from "react";
import { statusUpdateTour, triggerUpdate } from "../../../Utils/API/Tours";
import { getCookie, setCookie } from "../../../Utils/API";
import Swal from "sweetalert2";
import { updateProviders } from "../../../Utils/API/Providers";
import {
  StatusSwitch,
  useStatusToggle,
} from "../../../Components/Common/StatusSwitch";
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
// Cuando hay una busqueda activa, la tabla se repinta desde este listado
// guardado en sessionStorage y no desde Redux, asi que hay que reflejar el
// cambio ahi o al recargar reaparece el estado viejo.
// Solo se toca el campo active: la respuesta del API trae una version reducida
// del tour y sustituir la fila entera dejaria sin datos a las demas columnas.
const updateLocalStorageStatus = (tourId, nextActive) => {
  const tourInfo = getCookie("tour_data", true);
  if (!Array.isArray(tourInfo)) return;
  const updated = tourInfo.map((tour) =>
    Number(tour.id) === Number(tourId) ? { ...tour, active: nextActive } : tour
  );
  setCookie("tour_data", JSON.stringify(updated), 24 * 60 * 60);
};

const askDisableProvider = (tourData) => {
  return Swal.fire({
    title: "Deactivate Provider?",
    icon: "question",
    text: `Since this tour was the last one asigned to this provider, this action may deactivate the provider. Do you want to proceed?`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#F38430",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      return updateProviders(tourData.tour.provider_id, { active: 0 });
    }
    return null;
  });
};

const Active = (cell) => {
  const active = Number(cell.value) === 1;
  const [saving, toggle] = useStatusToggle({
    id: cell.row.original.id,
    active: active,
    request: statusUpdateTour,
    onStatusChange: (id, nextActive, resp) => {
      const tourData = resp?.data?.data;
      triggerUpdate();
      updateLocalStorageStatus(id, nextActive);
      if (typeof cell.onStatusChange === "function") {
        cell.onStatusChange(id, nextActive);
      }
      if (tourData?.ask_disable_provider === 1) {
        return askDisableProvider(tourData);
      }
      return null;
    },
  });

  return <StatusSwitch active={active} saving={saving} onToggle={toggle} />;
};

export { CartName, CartID, Server, Website, TestLink, Active };
