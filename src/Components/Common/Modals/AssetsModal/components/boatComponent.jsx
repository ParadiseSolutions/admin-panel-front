// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  getAccesability,
  getActivities,
  getBoatLocation,
  getBoatType,
  getDepatureLocations,
  getMarinaLocation,
  postBoat,
  putBoat,
} from "../../../../../Utils/API/Assets";
import { API_URL, imagesOptions } from "../../../../../Utils/API";
import { map } from "lodash";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SUPPORTED_CLASS_OPTIONS } from "../constants/boatClassOptions";
import {
  getDurationOptionsForLocation,
  normalizeDurationValues,
  pruneDurationValue,
  pruneDurationValues,
} from "../constants/boatDurationOptions";
import {
  ACTIVITY_SHORTCUTS,
  filterActivityOptions,
  getAllowedActivityNames,
  resolveActivitySelection,
} from "../constants/boatActivityOptions";
import {
  DEPARTURE_SHORTCUTS,
  resolveDepartureLocationSelection,
} from "../constants/boatDepartureLocationOptions";
import {
  RequiredFieldsLegend,
  RequiredMark,
} from "../constants/boatFormUi";

const BoatComponent = ({
  setMenu,
  setAssetModal,
  dataEdit,
  setDataEdit,
  resetTable,
  isEdit,
  setIsEdit,
}) => {
  const { id } = useParams();
  const [boatTypeData, setBoatTypeData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [boatLocationData, setBoatLocationData] = useState([]);
  const [accesData, setAccessData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [depatureLocationData, setDepartureLocationData] = useState([]);
  const [activitiesSelected, setActivitiesSelected] = useState([]);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
  const [boatTypeSelected, setBoatTypeSelected] = useState(0);
  const [locationSelected, setLocationSelected] = useState(0);
  const [boatLocationSelected, setBoatLocationSelected] = useState(0);
  const [boatSailingSelected, setBoatSailingSelected] = useState(0);
  const [boatShadeSelected, setBoatShadeSelected] = useState(0);
  const [boatACSelected, setBoatACSelected] = useState(0);
  const [boatAccessSelected, setBoatAccessSelected] = useState(0);
  const [pdfLink, setPdfLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [mainClassSelected, setMainClassSelected] = useState(0);
  const editActivitiesSyncedRef = useRef(false);
  const fishingAditionalInputs = Number(boatTypeSelected) === 3;
  const selectedBoatTypeName =
    boatTypeData.find((type) => Number(type.id) === Number(boatTypeSelected))
      ?.name || "";
  const filteredActivityData = useMemo(
    () =>
      filterActivityOptions(
        activityData,
        getAllowedActivityNames({
          boatTypeId: boatTypeSelected,
          boatTypeName: selectedBoatTypeName,
          locationId: locationSelected,
        }),
      ),
    [
      activityData,
      boatTypeSelected,
      selectedBoatTypeName,
      locationSelected,
    ],
  );
  const filteredDepartureLocationData = useMemo(
    () =>
      depatureLocationData.filter((item) => {
        const matchesLocation =
          Number(item.location_id) === Number(locationSelected);
        // Treat missing active as enabled (legacy rows).
        const isActive =
          item.active == null ||
          item.active === "" ||
          Number(item.active) === 1;
        return matchesLocation && isActive;
      }),
    [depatureLocationData, locationSelected],
  );
  const filteredCustomWorkflowDurationOptions = useMemo(
    () => getDurationOptionsForLocation(locationSelected),
    [locationSelected],
  );

  const normalizeDepartureName = (value) =>
    String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(/^marina\s+/i, "");

  const findDepartureIdsForMarina = (marinaId, departureOptions) => {
    if (!marinaId || !departureOptions?.length) {
      return [];
    }
    const marina = boatLocationData.find(
      (item) => Number(item.id) === Number(marinaId),
    );
    const marinaName = normalizeDepartureName(marina?.name);
    const matchingDeparture =
      departureOptions.find((item) => Number(item.id) === Number(marinaId)) ||
      (marinaName
        ? departureOptions.find(
            (item) => normalizeDepartureName(item.name) === marinaName,
          )
        : null) ||
      (marinaName
        ? departureOptions.find((item) => {
            const departureName = normalizeDepartureName(item.name);
            return (
              !!departureName &&
              (departureName.includes(marinaName) ||
                marinaName.includes(departureName))
            );
          })
        : null);
    return matchingDeparture ? [matchingDeparture.id] : [];
  };

  // Tracks which Marina+section defaults were already applied, so clearing the
  // only chip is respected instead of being re-defaulted on the next render.
  const appliedDepartureDefaultsRef = useRef(new Set());

  const [flexiblePrice, setFlexiblePrice] = useState(false);
  const [customPricesCheck, setCustomPricesCheck] = useState(false);
  const [customPickUpCheck, setCustomPickUpCheck] = useState(false);
  const [customPickUpRowTwo, setCustomPickUpRowTwo] = useState(false);
  const [customPickUpRowThree, setCustomPickUpRowThree] = useState(false);
  const [customPickUpIsRowOpen, setCustomPickUpIsRowOpen] = useState(false);
  const [customPickUpDurationOne, setCustomPickUpDurationOne] = useState([]);
  const [customPickUpDurationTwo, setCustomPickUpDurationTwo] = useState([]);
  const [customPickUpDurationThree, setCustomPickUpDurationThree] = useState(
    [],
  );
  const [initialCustomPickUpDurationOne, setInitialCustomPickUpDurationOne] =
    useState([]);
  const [initialCustomPickUpDurationTwo, setInitialCustomPickUpDurationTwo] =
    useState([]);
  const [
    initialCustomPickUpDurationThree,
    setInitialCustomPickUpDurationThree,
  ] = useState([]);
  const [customPickUpDepartureOne, setCustomPickUpDepartureOne] = useState([]);
  const [customPickUpDepartureTwo, setCustomPickUpDepartureTwo] = useState([]);
  const [customPickUpDepartureThree, setCustomPickUpDepartureThree] = useState(
    [],
  );
  const [initialCustomPickUpDepartureOne, setInitialCustomPickUpDepartureOne] =
    useState([]);
  const [initialCustomPickUpDepartureTwo, setInitialCustomPickUpDepartureTwo] =
    useState([]);
  const [
    initialCustomPickUpDepartureThree,
    setInitialCustomPickUpDepartureThree,
  ] = useState([]);
  const [supportedClassRowTwo, setSupportedClassRowTwo] = useState(false);
  const [supportedClassRowThree, setSupportedClassRowThree] = useState(false);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const [suportedClassSelectedOne, setSuportedClassSelectedOne] = useState("");
  const [durationClassSelectedOne, setDurationClassSelectedOne] = useState([]);
  const [suportedClassSelectedTwo, setSuportedClassSelectedTwo] = useState("");
  const [durationClassSelectedTwo, setDurationClassSelectedTwo] = useState([]);
  const [suportedClassSelectedThree, setSuportedClassSelectedThree] =
    useState("");
  const [durationClassSelectedThree, setDurationClassSelectedThree] = useState(
    [],
  );
  const [initialDurationOne, setInitialDurationOne] = useState([]);
  const [initialDurationTwo, setInitialDurationTwo] = useState([]);
  const [initialDurationThree, setInitialDurationThree] = useState([]);
  const [initialMainDepartureLocations, setInitialMainDepartureLocations] =
    useState([]);
  const [mainDepartureLocationsSelected, setMainDepartureLocationsSelected] =
    useState([]);
  const [initialDepartureLocationsOne, setInitialDepartureLocationsOne] =
    useState([]);
  const [initialDepartureLocationsTwo, setInitialDepartureLocationsTwo] =
    useState([]);
  const [initialDepartureLocationsThree, setInitialDepartureLocationsThree] =
    useState([]);
  const [dapatureLocationsSelectedOne, setDepartureLocationsSelectedOne] =
    useState([]);
  const [dapatureLocationsSelectedTwo, setDepartureLocationsSelectedTwo] =
    useState([]);
  const [dapatureLocationsSelectedThree, setDepartureLocationsSelectedThree] =
    useState([]);
  const [customDurationOne, setCustomDurationOne] = useState(null);
  const [customDurationTwo, setCustomDurationTwo] = useState(null);
  const [customDurationThree, setCustomDurationThree] = useState(null);
  const [customDurationFour, setCustomDurationFour] = useState(null);
  const [customDurationFive, setCustomDurationFive] = useState(null);
  const [customDurationSix, setCustomDurationSix] = useState(null);

  //initial request
  useEffect(() => {
    getBoatType().then((resp) => {
      setBoatTypeData(resp.data.data);
    });
    getBoatLocation().then((resp) => {
      setLocationData(resp.data.data);
    });
    getMarinaLocation().then((resp) => {
      setBoatLocationData(resp.data.data);
    });
    getAccesability().then((resp) => {
      setAccessData(resp.data.data);
    });
    getActivities({
      search: "",
      tipo: "boats",
      list: "admin_cargarActivityCombo",
    }).then((resp) => {
      setActivityData(resp.data.results);
    });
    getDepatureLocations().then((resp) => {
      setDepartureLocationData(resp.data.data);
    });
  }, []);

  //edit request
  useEffect(() => {
    if (isEdit && dataEdit) {
      setBoatTypeSelected(dataEdit.type_id);
      setLocationSelected(dataEdit.location_id);
      setBoatLocationSelected(dataEdit.asset_marina_location_id);
      setBoatSailingSelected(dataEdit.sailing);
      setBoatShadeSelected(dataEdit.shade);
      setBoatACSelected(dataEdit.ac);
      setBoatAccessSelected(dataEdit.access_id);
      setMainClassSelected(dataEdit.main_class_id);
      setFlexiblePrice(dataEdit.has_supported_classes === 1 ? true : false);
      setInitialOptionsArea(dataEdit.activities);
      setActivitiesSelected(dataEdit.activities);
      setSuportedClassSelectedOne(
        dataEdit.supported_classes?.class_id_1 || null,
      );
      setInitialDurationOne(
        normalizeDurationValues(dataEdit.supported_classes?.duration_1),
      );
      setSuportedClassSelectedTwo(
        dataEdit.supported_classes?.class_id_2 || null,
      );
      setInitialDurationTwo(
        normalizeDurationValues(dataEdit.supported_classes?.duration_2),
      );
      setSuportedClassSelectedThree(
        dataEdit.supported_classes?.class_id_3 || null,
      );
      setInitialDurationThree(
        normalizeDurationValues(dataEdit.supported_classes?.duration_3),
      );
      const hasCustomPickup =
        dataEdit.has_custom_pickup === 1 || dataEdit.has_custom_pick_up === 1;
      const customPickupLocations =
        dataEdit.custom_pickup_locations ?? dataEdit.custom_pick_up_locations;

      setInitialMainDepartureLocations(
        hasCustomPickup && dataEdit.has_supported_classes !== 1
          ? []
          : dataEdit.list_departure_locations || [],
      );
      setInitialDepartureLocationsOne(
        dataEdit.supported_classes?.departure_locations_1 || [],
      );
      setInitialDepartureLocationsTwo(
        dataEdit.supported_classes?.departure_locations_2 || [],
      );
      setInitialDepartureLocationsThree(
        dataEdit.supported_classes?.departure_locations_3 || [],
      );
      if (
        dataEdit.supported_classes?.class_id_2 &&
        dataEdit.supported_classes?.class_id_2 !== ""
      ) {
        setSupportedClassRowTwo(true);
      }
      if (
        dataEdit.supported_classes?.class_id_3 &&
        dataEdit.supported_classes?.class_id_3 !== ""
      ) {
        setSupportedClassRowThree(true);
      }
      setCustomPricesCheck(dataEdit.has_custom_prices === 1 ? true : false);
      setCustomPickUpCheck(hasCustomPickup);
      setInitialCustomPickUpDurationOne(
        normalizeDurationValues(customPickupLocations?.duration_1),
      );
      setInitialCustomPickUpDurationTwo(
        normalizeDurationValues(customPickupLocations?.duration_2),
      );
      setInitialCustomPickUpDurationThree(
        normalizeDurationValues(customPickupLocations?.duration_3),
      );
      setInitialCustomPickUpDepartureOne(
        customPickupLocations?.departure_locations_1 || [],
      );
      setInitialCustomPickUpDepartureTwo(
        customPickupLocations?.departure_locations_2 || [],
      );
      setInitialCustomPickUpDepartureThree(
        customPickupLocations?.departure_locations_3 || [],
      );
      if (
        customPickupLocations?.duration_2?.length ||
        customPickupLocations?.departure_locations_2?.length
      ) {
        setCustomPickUpRowTwo(true);
      }
      if (
        customPickupLocations?.duration_3?.length ||
        customPickupLocations?.departure_locations_3?.length
      ) {
        setCustomPickUpRowThree(true);
      }
      setCustomDurationOne(dataEdit.custom_prices?.duration_1 || null);
      setCustomDurationTwo(dataEdit.custom_prices?.duration_2 || null);
      setCustomDurationThree(dataEdit.custom_prices?.duration_3 || null);
      setCustomDurationFour(dataEdit.custom_prices?.duration_4 || null);
      setCustomDurationFive(dataEdit.custom_prices?.duration_5 || null);
      setCustomDurationSix(dataEdit.custom_prices?.duration_6 || null);
      setPdfLink(dataEdit.pdf_url || "");
      setImageLink(dataEdit.image_url || "");
    }
  }, [dataEdit, isEdit]);

  useEffect(() => {
    editActivitiesSyncedRef.current = false;
  }, [isEdit, dataEdit?.id]);

  useEffect(() => {
    if (customPickUpCheck) {
      setInitialMainDepartureLocations([]);
      setMainDepartureLocationsSelected([]);
    }
  }, [customPickUpCheck]);

  const clearDepartureLocationSelections = () => {
    setMainDepartureLocationsSelected([]);
    setInitialMainDepartureLocations([]);
    setDepartureLocationsSelectedOne([]);
    setDepartureLocationsSelectedTwo([]);
    setDepartureLocationsSelectedThree([]);
    setInitialDepartureLocationsOne([]);
    setInitialDepartureLocationsTwo([]);
    setInitialDepartureLocationsThree([]);
    setCustomPickUpDepartureOne([]);
    setCustomPickUpDepartureTwo([]);
    setCustomPickUpDepartureThree([]);
    setInitialCustomPickUpDepartureOne([]);
    setInitialCustomPickUpDepartureTwo([]);
    setInitialCustomPickUpDepartureThree([]);
  };

  // Drop selected activities that are no longer valid for boat type / location.
  useEffect(() => {
    if (!activityData.length || !Number(boatTypeSelected)) {
      return;
    }

    const allowedIds = new Set(
      filteredActivityData.map((item) => Number(item.id)),
    );

    if (
      isEdit &&
      !editActivitiesSyncedRef.current &&
      initialOptionsArea?.length
    ) {
      const hydrated = initialOptionsArea
        .map((id) => Number(id))
        .filter((id) => allowedIds.has(id));
      setActivitiesSelected(hydrated);
      editActivitiesSyncedRef.current = true;
      return;
    }

    setActivitiesSelected((prev) => {
      const next = (prev || []).filter((id) => allowedIds.has(Number(id)));
      if (
        next.length === (prev || []).length &&
        next.every((id, index) => Number(id) === Number(prev[index]))
      ) {
        return prev;
      }
      return next;
    });
  }, [
    filteredActivityData,
    activityData.length,
    boatTypeSelected,
    isEdit,
    initialOptionsArea,
  ]);

  // Drop custom-workflow duration selections not allowed for the current Location.
  useEffect(() => {
    if (!locationSelected) {
      return;
    }

    const pruneList = (prev) => {
      const next = pruneDurationValues(prev, locationSelected);
      if (
        next.length === (prev || []).length &&
        next.every((value, index) => value === (prev || [])[index])
      ) {
        return prev;
      }
      return next;
    };
    const pruneSingle = (prev) => {
      const next = pruneDurationValue(prev, locationSelected);
      return next === prev ? prev : next;
    };

    setCustomPickUpDurationOne(pruneList);
    setCustomPickUpDurationTwo(pruneList);
    setCustomPickUpDurationThree(pruneList);
    setInitialCustomPickUpDurationOne(pruneList);
    setInitialCustomPickUpDurationTwo(pruneList);
    setInitialCustomPickUpDurationThree(pruneList);
    setDurationClassSelectedOne(pruneList);
    setDurationClassSelectedTwo(pruneList);
    setDurationClassSelectedThree(pruneList);
    setInitialDurationOne(pruneList);
    setInitialDurationTwo(pruneList);
    setInitialDurationThree(pruneList);
    setCustomDurationOne(pruneSingle);
    setCustomDurationTwo(pruneSingle);
    setCustomDurationThree(pruneSingle);
    setCustomDurationFour(pruneSingle);
    setCustomDurationFive(pruneSingle);
    setCustomDurationSix(pruneSingle);
  }, [locationSelected, filteredCustomWorkflowDurationOptions]);

  // Drop departure selections that do not belong to the current Location.
  useEffect(() => {
    if (!locationSelected || depatureLocationData.length === 0) {
      return;
    }
    const allowedIds = new Set(
      filteredDepartureLocationData.map((item) => Number(item.id)),
    );
    const prune = (prev) => {
      const next = (prev || []).filter((id) => allowedIds.has(Number(id)));
      if (
        next.length === (prev || []).length &&
        next.every((id, index) => Number(id) === Number(prev[index]))
      ) {
        return prev;
      }
      return next;
    };

    setMainDepartureLocationsSelected(prune);
    setInitialMainDepartureLocations(prune);
    setDepartureLocationsSelectedOne(prune);
    setDepartureLocationsSelectedTwo(prune);
    setDepartureLocationsSelectedThree(prune);
    setInitialDepartureLocationsOne(prune);
    setInitialDepartureLocationsTwo(prune);
    setInitialDepartureLocationsThree(prune);
    setCustomPickUpDepartureOne(prune);
    setCustomPickUpDepartureTwo(prune);
    setCustomPickUpDepartureThree(prune);
    setInitialCustomPickUpDepartureOne(prune);
    setInitialCustomPickUpDepartureTwo(prune);
    setInitialCustomPickUpDepartureThree(prune);
  }, [
    locationSelected,
    depatureLocationData.length,
    filteredDepartureLocationData,
  ]);

  // Default empty/enabled Departure Location selects to the Marina name.
  // Never overwrite selections the user already customized, and only default
  // each Marina+section once so the user can clear the last chip on purpose.
  useEffect(() => {
    if (!boatLocationSelected || filteredDepartureLocationData.length === 0) {
      return;
    }

    const defaultIds = findDepartureIdsForMarina(
      boatLocationSelected,
      filteredDepartureLocationData,
    );
    if (!defaultIds.length) {
      return;
    }

    const allowedIds = new Set(
      filteredDepartureLocationData.map((item) => Number(item.id)),
    );
    const hasValidSelection = (ids = []) =>
      (ids || []).some((id) => allowedIds.has(Number(id)));

    const applied = appliedDepartureDefaultsRef.current;
    // Apply the default only once per Marina + section combination.
    const applyDefaultOnce = (section, current, initial, setter) => {
      const key = `${boatLocationSelected}:${section}`;
      if (applied.has(key)) {
        return;
      }
      applied.add(key);
      if (!hasValidSelection(current) && !hasValidSelection(initial)) {
        setter(defaultIds);
      }
    };

    // Main Departure Location(s) — only when custom pick-up is not enabled.
    if (fishingAditionalInputs && !customPickUpCheck) {
      applyDefaultOnce(
        "main",
        mainDepartureLocationsSelected,
        initialMainDepartureLocations,
        setMainDepartureLocationsSelected,
      );
    }

    // Custom pick-up departure rows (only enabled ones).
    if (customPickUpCheck) {
      applyDefaultOnce(
        "custom1",
        customPickUpDepartureOne,
        initialCustomPickUpDepartureOne,
        setCustomPickUpDepartureOne,
      );
      if (customPickUpRowTwo) {
        applyDefaultOnce(
          "custom2",
          customPickUpDepartureTwo,
          initialCustomPickUpDepartureTwo,
          setCustomPickUpDepartureTwo,
        );
      }
      if (customPickUpRowThree) {
        applyDefaultOnce(
          "custom3",
          customPickUpDepartureThree,
          initialCustomPickUpDepartureThree,
          setCustomPickUpDepartureThree,
        );
      }
    }

    // Supported-class departure rows (only enabled ones).
    if (flexiblePrice) {
      applyDefaultOnce(
        "class1",
        dapatureLocationsSelectedOne,
        initialDepartureLocationsOne,
        setDepartureLocationsSelectedOne,
      );
      if (supportedClassRowTwo) {
        applyDefaultOnce(
          "class2",
          dapatureLocationsSelectedTwo,
          initialDepartureLocationsTwo,
          setDepartureLocationsSelectedTwo,
        );
      }
      if (supportedClassRowThree) {
        applyDefaultOnce(
          "class3",
          dapatureLocationsSelectedThree,
          initialDepartureLocationsThree,
          setDepartureLocationsSelectedThree,
        );
      }
    }
  }, [
    boatLocationSelected,
    boatLocationData,
    filteredDepartureLocationData,
    fishingAditionalInputs,
    flexiblePrice,
    customPickUpCheck,
    customPickUpRowTwo,
    customPickUpRowThree,
    supportedClassRowTwo,
    supportedClassRowThree,
    mainDepartureLocationsSelected,
    initialMainDepartureLocations,
    customPickUpDepartureOne,
    initialCustomPickUpDepartureOne,
    customPickUpDepartureTwo,
    initialCustomPickUpDepartureTwo,
    customPickUpDepartureThree,
    initialCustomPickUpDepartureThree,
    dapatureLocationsSelectedOne,
    initialDepartureLocationsOne,
    dapatureLocationsSelectedTwo,
    initialDepartureLocationsTwo,
    dapatureLocationsSelectedThree,
    initialDepartureLocationsThree,
  ]);

  //multi select activities
  function handleMulti(selected) {
    setActivitiesSelected(
      resolveActivitySelection(selected, filteredActivityData),
    );
  }

  function handleDepartureMulti(selected, setter) {
    setter(
      resolveDepartureLocationSelection(
        selected,
        filteredDepartureLocationData,
      ),
    );
  }

  const departureLocationSelectOptions = (
    <>
      {filteredDepartureLocationData.length > 0 &&
        map(DEPARTURE_SHORTCUTS, (shortcut) => (
          <Option key={shortcut.value} value={shortcut.value}>
            {shortcut.label}
          </Option>
        ))}
      {map(filteredDepartureLocationData, (item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </>
  );

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      boat_name: dataEdit ? dataEdit.name : "",
      boat_length: dataEdit ? dataEdit.length : "",
      boat_make: dataEdit ? dataEdit.make : "",
      boat_model: dataEdit ? dataEdit.model : "",
      boat_capacity: dataEdit ? dataEdit.capacity : "",
      boat_bathroom: dataEdit ? dataEdit.bathrooms : "",
      notes: dataEdit ? dataEdit.notes : "",
      joint_fleet: dataEdit ? dataEdit.joined_fleet_at : "",
      last_inspected: dataEdit ? dataEdit.last_inspected_at : "",
      net_price_1:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_1
          : "",
      net_price_2:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_2
          : "",
      net_price_3:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_3
          : "",
      net_price_4:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_4
          : "",
      net_price_5:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_5
          : "",
      net_price_6:
        dataEdit && dataEdit.custom_prices
          ? dataEdit.custom_prices?.net_price_6
          : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
      const mainDepartureLocations = customPickUpCheck
        ? null
        : mainDepartureLocationsSelected.length > 0
          ? mainDepartureLocationsSelected
          : initialMainDepartureLocations;

      let data = {
        provider_operator_id: +id,
        asset_id: 1,
        name: values.boat_name,
        type_id: boatTypeSelected,
        length: values.boat_length,
        make: values.boat_make,
        model: values.boat_model,
        location_id: locationSelected,
        asset_marina_location_id: boatLocationSelected,
        capacity: values.boat_capacity,
        sailing: boatSailingSelected,
        bathrooms: values.boat_bathroom,
        shade: boatShadeSelected,
        ac: boatACSelected,
        access_id: boatAccessSelected,
        activities: activitiesSelected,
        main_class_id: mainClassSelected,
        pdf_url: pdfLink,
        image_url: imageLink,
        notes: values.notes,
        has_supported_classes: flexiblePrice ? 1 : 0,
        departure_locations: mainDepartureLocations,
        joined_fleet_at: values.joint_fleet,
        last_inspected_at: values.last_inspected,
        supported_classes: {
          class_id_1: suportedClassSelectedOne,
          duration_1:
            durationClassSelectedOne.length > 0
              ? durationClassSelectedOne
              : initialDurationOne,
          departure_locations_1: !flexiblePrice
            ? []
            : dapatureLocationsSelectedOne.length > 0
              ? dapatureLocationsSelectedOne
              : initialDepartureLocationsOne,
          class_id_2: supportedClassRowTwo ? suportedClassSelectedTwo : null,
          duration_2: !supportedClassRowTwo
            ? null
            : durationClassSelectedTwo.length > 0
              ? durationClassSelectedTwo
              : initialDurationTwo,
          departure_locations_2: !supportedClassRowTwo
            ? []
            : dapatureLocationsSelectedTwo.length > 0
              ? dapatureLocationsSelectedTwo
              : initialDepartureLocationsTwo,
          class_id_3: supportedClassRowThree
            ? suportedClassSelectedThree
            : null,
          duration_3: !supportedClassRowThree
            ? null
            : durationClassSelectedThree.length > 0
              ? durationClassSelectedThree
              : initialDurationThree,
          departure_locations_3: !supportedClassRowThree
            ? []
            : dapatureLocationsSelectedThree.length > 0
              ? dapatureLocationsSelectedThree
              : initialDepartureLocationsThree,
        },
        has_custom_prices: customPricesCheck ? 1 : 0,
        has_custom_pickup: customPickUpCheck ? 1 : 0,
        custom_pickup_locations: customPickUpCheck
          ? {
              duration_1:
                customPickUpDurationOne.length > 0
                  ? customPickUpDurationOne
                  : initialCustomPickUpDurationOne,
              departure_locations_1:
                customPickUpDepartureOne.length > 0
                  ? customPickUpDepartureOne
                  : initialCustomPickUpDepartureOne,
              duration_2: !customPickUpRowTwo
                ? null
                : customPickUpDurationTwo.length > 0
                  ? customPickUpDurationTwo
                  : initialCustomPickUpDurationTwo,
              departure_locations_2: !customPickUpRowTwo
                ? []
                : customPickUpDepartureTwo.length > 0
                  ? customPickUpDepartureTwo
                  : initialCustomPickUpDepartureTwo,
              duration_3: !customPickUpRowThree
                ? null
                : customPickUpDurationThree.length > 0
                  ? customPickUpDurationThree
                  : initialCustomPickUpDurationThree,
              departure_locations_3: !customPickUpRowThree
                ? []
                : customPickUpDepartureThree.length > 0
                  ? customPickUpDepartureThree
                  : initialCustomPickUpDepartureThree,
            }
          : null,
        custom_prices: {
          duration_1: customDurationOne,
          net_price_1: values.net_price_1 !== "" ? values.net_price_1 : null,
          duration_2: customDurationTwo,
          net_price_2: values.net_price_2 !== "" ? values.net_price_2 : null,
          duration_3: customDurationThree,
          net_price_3: values.net_price_3 !== "" ? values.net_price_3 : null,
          duration_4: customDurationFour,
          net_price_4: values.net_price_4 !== "" ? values.net_price_4 : null,
          duration_5: customDurationFive,
          net_price_5: values.net_price_5 !== "" ? values.net_price_5 : null,
          duration_6: customDurationSix,
          net_price_6: values.net_price_6 !== "" ? values.net_price_6 : null,
        },
      };
      if (dataEdit) {
        putBoat(dataEdit.id, data)
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire("Edited!", "Asset has been edited.", "success").then(
                () => {
                  setAssetModal(false);
                  resetTable();
                  setSupportedClassRowTwo(false);
                  setSupportedClassRowThree(false);
                  setCustomPickUpRowTwo(false);
                  setCustomPickUpRowThree(false);
                  setCustomPickUpIsRowOpen(false);
                  setDataEdit(null);
                  setIsEdit(false);
                },
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message),
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0]),
              );
            }
          });
      } else {
        postBoat(data)
          .then((resp) => {
            if (resp.data.status === 201) {
              Swal.fire("Created!", "Asset has been created.", "success").then(
                () => {
                  setAssetModal(false);
                  resetTable();
                  setSupportedClassRowTwo(false);
                  setSupportedClassRowThree(false);
                  setCustomPickUpRowTwo(false);
                  setCustomPickUpRowThree(false);
                  setCustomPickUpIsRowOpen(false);
                  setDataEdit(null);
                },
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message),
              );
            } else {
              let errorMessages = [];
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true;
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0]),
              );
            }
          });
      }
    },
  });
  return (
    <>
      <div className="modal-body">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <RequiredFieldsLegend />
          <Row>
            <Row>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">
                      Boat Name
                      <RequiredMark />
                    </Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_name"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_name"
                      >
                        Type the name of the Boat. Try to find out this
                        information as it is very useful. Sometimes you won't be
                        able to obtain this information in which case you can
                        leave it blank, but try to find it out.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="boat_name"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_name || ""}
                    invalid={
                      validationType.touched.boat_name &&
                      validationType.errors.boat_name
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_name &&
                  validationType.errors.boat_name ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Type
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_type"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_type"
                    >
                      Choose the type of boat you are defining.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatTypeSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(boatTypeData, (type, index) => {
                    return (
                      <option
                        key={index}
                        value={type.id}
                        selected={
                          dataEdit ? type.id === dataEdit.type_id : false
                        }
                      >
                        {type.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Length
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_length"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_length"
                    >
                      Enter the length of the boat in feet.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <div className="input-group">
                  <Input
                    name="boat_length"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_length || ""}
                    invalid={
                      validationType.touched.boat_length &&
                      validationType.errors.boat_length
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_length &&
                  validationType.errors.boat_length ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_length}
                    </FormFeedback>
                  ) : null}
                  <span
                    className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                    id="basic-addon1"
                    style={{ fontSize: "0.85em" }}
                  >
                    Feet
                  </span>
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">
                      Make
                      <RequiredMark />
                    </Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_make"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_make"
                      >
                        Type the Make of your boat, such as Bertram, Lagoon, or
                        Criss Craft.
                        <br />
                        For example, if you have a Sea Ray Sundancer, then Sea
                        Ray is the Make and Sundancer is the model. If you have
                        a Lagoon 450, then Lagoon is the make and 450 is the
                        model.
                        <br />
                        This is similar to Vehicles, where the Make would be
                        Chevrolet and the Model Suburban.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="boat_make"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_make || ""}
                    invalid={
                      validationType.touched.boat_make &&
                      validationType.errors.boat_make
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_make &&
                  validationType.errors.boat_make ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_make}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Model</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_model"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_model"
                      >
                        Enter the model of your boat, such as 450, Express, or
                        Sundancer.
                        <br />
                        For example, if the Make is Sea Ray, the Model might be
                        Sundancer. This is similar to Vehicles where the Make
                        might be Toyota while the model might be Corolla or
                        Camry.
                        <br />
                        If you don't know the model of your boat, you can leave
                        this field blank, but fill it if you have it.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="boat_model"
                    placeholder=""
                    type="text"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_model || ""}
                    invalid={
                      validationType.touched.boat_model &&
                      validationType.errors.boat_model
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_model &&
                  validationType.errors.boat_model ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_model}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Location
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_location"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_location"
                    >
                      Choose the location of your boat. For example, on Cancun
                      Discounts, you will need to specify if the boat is in
                      Cancun, or Playa del Carmen, or Cozumel. On Puerto
                      Vallarta Tours you will need to specify if the boat is
                      located in Nuevo Vallarta or Puerto Vallarta.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setLocationSelected(+e.target.value);
                    setBoatLocationSelected(0);
                    clearDepartureLocationSelections();
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(locationData, (location, index) => {
                    if (location.active === 0) {
                      return null;
                    }
                    return (
                      <option
                        key={index}
                        value={location.id}
                        selected={
                          dataEdit
                            ? location.id === dataEdit.location_id
                            : false
                        }
                      >
                        {location.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col className="col-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Marina
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_marina"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_marina"
                    >
                      Choose what Marina or Beach your Boat is located at. For
                      example, if your boat is in Cozumel, you will need to
                      choose if it is located in Marina Caleta, Puerto Abrigo,
                      or Marina Cozumel.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name="price_type"
                  onChange={(e) => {
                    setBoatLocationSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(boatLocationData, (location, index) => {
                    if (locationSelected !== location.location_id) {
                      return null;
                    }
                    return (
                      <option
                        key={index}
                        value={location.id}
                        selected={
                          dataEdit
                            ? location.id === dataEdit.asset_marina_location_id
                            : false
                        }
                      >
                        {location.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col className="col-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    A/C
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_ac"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_ac"
                    >
                      Does your boat feature an air-conditioned cabin?
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatACSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    selected={dataEdit ? dataEdit.ac === "Yes" : false}
                    value={"Yes"}
                  >
                    Yes
                  </option>
                  <option
                    selected={dataEdit ? dataEdit.ac === "No" : false}
                    value={"No"}
                  >
                    No
                  </option>
                </Input>
              </Col>
              <Col className="col-1">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">
                      Capacity
                      <RequiredMark />
                    </Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_capacity"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_capacity"
                      >
                        How many people can this boat take?
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="boat_capacity"
                    placeholder=""
                    type="number"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_capacity || ""}
                    invalid={
                      validationType.touched.boat_capacity &&
                      validationType.errors.boat_capacity
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_capacity &&
                  validationType.errors.boat_capacity ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_capacity}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col className="col-1">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Bathroom</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="boat_bathroom"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="boat_bathroom"
                      >
                        Select how many bathrooms are available on board the
                        boat.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    name="boat_bathroom"
                    placeholder=""
                    type="number"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.boat_bathroom || ""}
                    invalid={
                      validationType.touched.boat_bathroom &&
                      validationType.errors.boat_bathroom
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.boat_bathroom &&
                  validationType.errors.boat_bathroom ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.boat_bathroom}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Shade
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_shade"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_shade"
                    >
                      Is there shade available on board your boat? This is
                      important especially for elderly people.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatShadeSelected(e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  <option
                    selected={dataEdit ? dataEdit.shade === "Yes" : false}
                    value={"Yes"}
                  >
                    Yes
                  </option>
                  <option
                    selected={dataEdit ? dataEdit.shade === "No" : false}
                    value={"No"}
                  >
                    No
                  </option>
                </Input>
              </Col>
              <Col className="col-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">
                    Access.
                    <RequiredMark />
                  </Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="boat_access"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="boat_access"
                    >
                      Is your boat wheelchair accessible?
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setBoatAccessSelected(+e.target.value);
                  }}
                  onBlur={validationType.handleBlur}
                  //   value={validationType.values.department || ""}
                >
                  <option value={null}>Select....</option>
                  {map(accesData, (acces, index) => {
                    return (
                      <option
                        key={index}
                        value={acces.id}
                        selected={
                          dataEdit ? dataEdit.access_id === acces.id : false
                        }
                      >
                        {acces.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>

              <Col className="col">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Activities</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="activities"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="activities"
                    >
                      Pending
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Select
                  mode="multiple"
                  allowClear
                  rows="5"
                  style={{ width: "100%", paddingTop: "5px" }}
                  placeholder="Please select"
                  // defaultValue={initialOptionsArea}
                  onChange={handleMulti}
                  value={activitiesSelected}
                >
                  {filteredActivityData.length > 0 &&
                    map(ACTIVITY_SHORTCUTS, (shortcut) => (
                      <Option key={shortcut.value} value={shortcut.value}>
                        {shortcut.label}
                      </Option>
                    ))}
                  {map(filteredActivityData, (item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.text}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="col-6">
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <Label className="form-label">Upload PDF</Label>
                      {uploadingPdf && (
                        <small
                          style={{
                            color: "#9aa0a6",
                            fontSize: "12px",
                            marginLeft: "8px",
                            alignSelf: "center",
                          }}
                        >
                          Uploading...
                        </small>
                      )}
                      {pdfLink && (
                        <>
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18"
                          width="18"
                          className="mx-2"
                          viewBox="0 0 640 640"
                          style={{ cursor: "pointer" }}
                          id="show_pdf_preview"
                          onClick={() => {
                            window.open(
                              pdfLink,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }}
                        >
                          <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                          </svg>
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="show_pdf_preview"
                          >
                            Show Preview
                          </UncontrolledTooltip>
                        </>
                      )}
                    </div>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="upload_pdf"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="upload_pdf"
                      >
                        Upload a PDF of photos for display in our CE Tool Chest
                        and other tools.
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    type="file"
                    id="fileInput"
                    name="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("document", file);
                      formData.append("media_type_name", "boat_asset_pdf");

                      setUploadingPdf(true);

                      axios
                        .post(`${API_URL}/media-library/upload`, formData, {
                          headers: imagesOptions,
                        })
                        .then((response) => {
                          setPdfLink(response.data.data.url);
                        })
                        .catch((error) => {
                          console.error(error);
                        })
                        .finally(() => setUploadingPdf(false));
                    }}
                  />
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <Label className="form-label">Upload Image (500x325 px)</Label>
                      {uploadingImage && (
                        <small
                          style={{
                            color: "#9aa0a6",
                            fontSize: "12px",
                            marginLeft: "8px",
                            alignSelf: "center",
                          }}
                        >
                          Uploading...
                        </small>
                      )}
                      {imageLink && (
                        <>
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18"
                          width="18"
                          className="mx-2"
                          viewBox="0 0 640 640"
                          style={{ cursor: "pointer" }}
                          id="show_image_preview"
                          onClick={() => {
                            window.open(
                              imageLink,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }}
                        >
                          <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                          </svg>
                          <UncontrolledTooltip
                            autohide={true}
                            placement="top"
                            target="show_image_preview"
                          >
                            Show Preview
                          </UncontrolledTooltip>
                        </>
                      )}
                    </div>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="upload_image"
                      />
                      <UncontrolledTooltip
                        autohide={true}
                        placement="top"
                        target="upload_image"
                      >
                        Upload an image to be displayed in the CE Tool Chest and
                        other tools. (Image size: 500 x 325 px).
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <Input
                    type="file"
                    id="fileInput"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("document", file);
                      formData.append("media_type_name", "boat_asset_image");

                      setUploadingImage(true);

                      axios
                        .post(`${API_URL}/media-library/upload`, formData, {
                          headers: imagesOptions,
                        })
                        .then((response) => {
                          setImageLink(response.data.data.url);
                        })
                        .catch((error) => {
                          console.error(error);
                        })
                        .finally(() => setUploadingImage(false));
                    }}
                  />
                </div>
              </Col>
              <Col className="col-6">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Notes</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="notes"
                    />
                    <UncontrolledTooltip
                      autohide={true}
                      placement="top"
                      target="notes"
                    >
                      Include any notes about the boat such as its current
                      status, maintenance, restrictions, etc. This may display
                      in the CE Tool Chest, Fishing Dispatch or other internal
                      tools.
                    </UncontrolledTooltip>
                  </div>
                </div>
                <Input
                  name="notes"
                  placeholder=""
                  type="textarea"
                  style={{ height: 124 }}
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.notes || ""}
                  invalid={
                    validationType.touched.notes && validationType.errors.notes
                      ? true
                      : false
                  }
                />
              </Col>
            </Row>
            {fishingAditionalInputs ? (
              <>
                <Row className="">
                  <Col className="col-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Join Fleet</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="join_fleet"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="join_fleet"
                        >
                          Include any notes about the boat such as its current
                          status, maintenance, restrictions, etc. This may
                          display in the CE Tool Chest, Fishing Dispatch or
                          other internal tools.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <Input
                      name="joint_fleet"
                      className="form-control"
                      type="date"
                      // defaultValue="2019-08-19"
                      id="example-date-input"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.joint_fleet || ""}
                      invalid={
                        validationType.touched.joint_fleet &&
                        validationType.errors.joint_fleet
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.joint_fleet &&
                    validationType.errors.joint_fleet ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.joint_fleet}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Last Inspected</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="last_inspected"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="last_inspected"
                        >
                          Include any notes about the boat such as its current
                          status, maintenance, restrictions, etc. This may
                          display in the CE Tool Chest, Fishing Dispatch or
                          other internal tools.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <Input
                      name="last_inspected"
                      className="form-control"
                      type="date"
                      // defaultValue="2019-08-19"
                      id="example-date-input"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_inspected || ""}
                      invalid={
                        validationType.touched.last_inspected &&
                        validationType.errors.last_inspected
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_inspected &&
                    validationType.errors.last_inspected ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_inspected}
                      </FormFeedback>
                    ) : null}
                  </Col>
                  <Col className="col-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Boat Class</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="main_class_boat"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="main_class_boat"
                        >
                          The primary class of the boat. It may take other type
                          of trips but this is its main category.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <Input
                      type="select"
                      name=""
                      onChange={(e) => {
                        setMainClassSelected(e.target.value);
                      }}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option value={null}>Select....</option>
                      {SUPPORTED_CLASS_OPTIONS.map(({ value, label }) => (
                        <option
                          key={value}
                          value={value}
                          selected={dataEdit?.main_class_id === value}
                        >
                          {label}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  <Col className="col-4">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label">Departure Location(s)</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="departure_location_general"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="departure_location_general"
                        >
                          Choose the main departure locations for this boat when
                          custom pick-up is not enabled.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <Select
                      mode="multiple"
                      allowClear
                      rows="5"
                      disabled={customPickUpCheck}
                      style={{ width: "100%", paddingTop: "5px" }}
                      placeholder="Please select"
                      value={
                        customPickUpCheck
                          ? []
                          : mainDepartureLocationsSelected.length > 0
                            ? mainDepartureLocationsSelected
                            : initialMainDepartureLocations
                      }
                      onChange={(values) =>
                        handleDepartureMulti(
                          values,
                          setMainDepartureLocationsSelected,
                        )
                      }
                    >
                      {departureLocationSelectOptions}
                    </Select>
                  </Col>
                  <Col className="col-1 d-flex align-items-center mt-4">
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <Label className="form-label mb-0">Custom</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="custom_pick_up"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="custom_pick_up"
                        >
                          Enable custom pick-up locations by duration. When
                          enabled, define specific departure locations for each
                          trip duration.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <div className="form-check form-switch form-switch-md  mx-4">
                      <Input
                        name="custom_pick_up"
                        placeholder=""
                        type="checkbox"
                        checked={customPickUpCheck}
                        className="form-check-input"
                        onChange={() => {
                          const nextValue = !customPickUpCheck;
                          setCustomPickUpCheck(nextValue);
                          if (nextValue) {
                            setInitialMainDepartureLocations([]);
                            setMainDepartureLocationsSelected([]);
                          }
                        }}
                        value={customPickUpCheck}
                      />
                    </div>
                  </Col>
                </Row>
                {customPickUpCheck ? (
                  <>
                    <Row className="mt-4">
                      <div
                        className="p-3"
                        style={{ backgroundColor: "#E9F4FF" }}
                      >
                        <p className="fs-5 fw-bold text-uppercase text-dark mb-0">
                          Custom Pick-Up Locations
                        </p>
                      </div>
                    </Row>
                    <Row className="mb-2 d-flex">
                      <Col className="col-3">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">Duration</Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="custom_pick_up_duration_one"
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target="custom_pick_up_duration_one"
                            >
                              Select the duration of the trip to define its
                              available pick-up locations.
                            </UncontrolledTooltip>
                          </div>
                        </div>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%", paddingTop: "5px" }}
                          placeholder="Please select"
                          value={
                            customPickUpDurationOne.length > 0
                              ? customPickUpDurationOne
                              : initialCustomPickUpDurationOne
                          }
                          onChange={(values) =>
                            setCustomPickUpDurationOne(values)
                          }
                        >
                          {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                            <Option key={value} value={value}>
                              {label}
                            </Option>
                          ))}
                        </Select>
                      </Col>
                      <Col className="col">
                        <div className="d-flex justify-content-between">
                          <Label className="form-label">
                            Depature Location
                          </Label>
                          <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id="custom_pick_up_departure_one"
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target="custom_pick_up_departure_one"
                            >
                              Choose which departure locations are available for
                              the selected duration.
                            </UncontrolledTooltip>
                          </div>
                        </div>
                        <Select
                          mode="multiple"
                          allowClear
                          rows="5"
                          style={{ width: "100%", paddingTop: "5px" }}
                          placeholder="Please select"
                          value={
                            customPickUpDepartureOne.length > 0
                              ? customPickUpDepartureOne
                              : initialCustomPickUpDepartureOne
                          }
                          onChange={(values) =>
                            handleDepartureMulti(
                              values,
                              setCustomPickUpDepartureOne,
                            )
                          }
                        >
                          {departureLocationSelectOptions}
                        </Select>
                      </Col>
                      <Col className="col-1 d-flex align-items-center mt-4">
                        <i
                          className="uil-plus-circle font-size-20 text-paradise"
                          style={{ cursor: "pointer" }}
                          onClick={() => setCustomPickUpRowTwo(true)}
                        />
                      </Col>
                    </Row>
                    {customPickUpRowTwo ? (
                      <Row className="mb-2 d-flex">
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="custom_pick_up_duration_two"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="custom_pick_up_duration_two"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              customPickUpDurationTwo.length > 0
                                ? customPickUpDurationTwo
                                : initialCustomPickUpDurationTwo
                            }
                            onChange={(values) =>
                              setCustomPickUpDurationTwo(values)
                            }
                          >
                            {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                              <Option key={value} value={value}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col className="col">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">
                              Depature Location
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="custom_pick_up_departure_two"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="custom_pick_up_departure_two"
                              >
                                Choose which departure locations are available
                                for the selected duration.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            rows="5"
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              customPickUpDepartureTwo.length > 0
                                ? customPickUpDepartureTwo
                                : initialCustomPickUpDepartureTwo
                            }
                            onChange={(values) =>
                              handleDepartureMulti(
                                values,
                                setCustomPickUpDepartureTwo,
                              )
                            }
                          >
                            {departureLocationSelectOptions}
                          </Select>
                        </Col>
                        <Col className="col-1 d-flex align-items-center mt-4">
                          {customPickUpIsRowOpen || !customPickUpRowThree ? (
                            <i
                              className="uil-plus-circle font-size-20 text-paradise"
                              style={{ cursor: "pointer" }}
                              onClick={() => setCustomPickUpRowThree(true)}
                            />
                          ) : (
                            <i
                              className="uil-minus-circle font-size-20 text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setCustomPickUpRowThree(true);
                                setCustomPickUpRowTwo(false);
                                setCustomPickUpIsRowOpen(true);
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    ) : null}
                    {customPickUpRowThree ? (
                      <Row className="mb-2 d-flex">
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="custom_pick_up_duration_three"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="custom_pick_up_duration_three"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              customPickUpDurationThree.length > 0
                                ? customPickUpDurationThree
                                : initialCustomPickUpDurationThree
                            }
                            onChange={(values) =>
                              setCustomPickUpDurationThree(values)
                            }
                          >
                            {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                              <Option key={value} value={value}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col className="col">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">
                              Depature Location
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="custom_pick_up_departure_three"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="custom_pick_up_departure_three"
                              >
                                Choose which departure locations are available
                                for the selected duration.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            rows="5"
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              customPickUpDepartureThree.length > 0
                                ? customPickUpDepartureThree
                                : initialCustomPickUpDepartureThree
                            }
                            onChange={(values) =>
                              handleDepartureMulti(
                                values,
                                setCustomPickUpDepartureThree,
                              )
                            }
                          >
                            {departureLocationSelectOptions}
                          </Select>
                        </Col>
                        <Col className="col-1 d-flex align-items-center mt-4">
                          <i
                            className="uil-minus-circle font-size-20 text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setCustomPickUpRowThree(false);
                              setCustomPickUpIsRowOpen(false);
                            }}
                          />
                        </Col>
                      </Row>
                    ) : null}
                  </>
                ) : null}
                <Row className="">
                  <Col className="col-3 d-flex align-items-center mt-4">
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <Label className="form-label mb-0">Flexible</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="flexible"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="flexible"
                        >
                          Indicates whether this boat can be used for trips in
                          other classifications. Enable this option if the boat
                          is allowed to operate outside its primary class.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <div className="form-check form-switch form-switch-md  mx-4">
                      <Input
                        name="seasonality"
                        placeholder=""
                        type="checkbox"
                        checked={flexiblePrice}
                        className="form-check-input"
                        onChange={() => {
                          setFlexiblePrice(!flexiblePrice);
                        }}
                        // onBlur={validationType.handleBlur}
                        value={flexiblePrice}
                      />
                    </div>
                  </Col>
                  <Col className="col-3 d-flex align-items-center mt-4">
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <Label className="form-label mb-0">Add Custom Prices</Label>
                      <div>
                        <i
                          className="uil-question-circle font-size-15"
                          id="custom_prices"
                        />
                        <UncontrolledTooltip
                          autohide={true}
                          placement="top"
                          target="custom_prices"
                        >
                          Add specific pricing for the boat, for example if the
                          boat requires a specific amount to operate that is
                          different than our standard pricing. This will show in
                          the Boat Details in the Fishing Dispatch tool.
                        </UncontrolledTooltip>
                      </div>
                    </div>
                    <div className="form-check form-switch form-switch-md  mx-4">
                      <Input
                        name="seasonality"
                        placeholder=""
                        type="checkbox"
                        checked={customPricesCheck}
                        className="form-check-input"
                        onChange={() => {
                          setCustomPricesCheck(!customPricesCheck);
                        }}
                        // onBlur={validationType.handleBlur}
                        value={customPricesCheck}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="">
                  {flexiblePrice ? (
                    <>
                      <Row className="mt-4">
                        <div
                          className="p-3"
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 fw-bold text-uppercase text-dark mb-0">
                            Class Flexibility
                          </p>
                        </div>
                      </Row>
                      <Row className=" mb-2 d-flex ">
                        <Col className="col-2">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">
                              Supported Class
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="supported_class_one"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="supported_class_one"
                              >
                                Specifies the trip classifications this boat can
                                support when marked as flexible. Select the
                                classes the boat is allowed to operate in
                                addition to its primary classification.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Input
                            type="select"
                            name=""
                            onChange={(e) => {
                              setSuportedClassSelectedOne(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            {SUPPORTED_CLASS_OPTIONS.map(({ value, label }) => (
                              <option
                                key={value}
                                value={value}
                                selected={
                                  dataEdit?.supported_classes?.class_id_1 ===
                                  value
                                }
                              >
                                {label}
                              </option>
                            ))}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="duration_one"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="duration_one"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              durationClassSelectedOne.length > 0
                                ? durationClassSelectedOne
                                : initialDurationOne
                            }
                            onChange={(values) =>
                              setDurationClassSelectedOne(values)
                            }
                          >
                            {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                              <Option key={value} value={value}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col className="col">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">
                              Depature Location
                            </Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="departure_location_one"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="departure_location_one"
                              >
                                Choose which departure locations are available
                                for the specified supported class and duration
                                of trip for the particular boat.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            rows="5"
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            value={
                              dapatureLocationsSelectedOne.length > 0
                                ? dapatureLocationsSelectedOne
                                : initialDepartureLocationsOne
                            }
                            onChange={(values) =>
                              handleDepartureMulti(
                                values,
                                setDepartureLocationsSelectedOne,
                              )
                            }
                          >
                            {departureLocationSelectOptions}
                          </Select>
                        </Col>
                        <Col className="col-1 d-flex align-items-center mt-4">
                          <i
                            className="uil-plus-circle font-size-20 text-paradise"
                            style={{ cursor: "pointer" }}
                            onClick={() => setSupportedClassRowTwo(true)}
                          />
                        </Col>
                      </Row>
                      {supportedClassRowTwo ? (
                        <Row className=" mb-2 d-flex ">
                          <Col className="col-2">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Supported Class
                              </Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="suported_class_two"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="suported_class_two"
                                >
                                  Specifies the trip classifications this boat
                                  can support when marked as flexible. Select
                                  the classes the boat is allowed to operate in
                                  addition to its primary classification.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setSuportedClassSelectedTwo(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value={null}>Select....</option>
                              {SUPPORTED_CLASS_OPTIONS.map(
                                ({ value, label }) => (
                                  <option
                                    key={value}
                                    value={value}
                                    selected={
                                      dataEdit?.supported_classes
                                        ?.class_id_2 === value
                                    }
                                  >
                                    {label}
                                  </option>
                                ),
                              )}
                            </Input>
                          </Col>
                          <Col className="col-3">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Duration</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="duration_two"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="duration_two"
                                >
                                  Select the duration of the trip to define its
                                  available pick-up locations.
                                  <br />
                                  <br />
                                  For example, the boat may take 4 hour trips
                                  from the marina, 6 hour trips it can also pick
                                  up from Northern hotels, and for 8 hour trips
                                  it can pick up at all hotels.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              value={
                                durationClassSelectedTwo.length > 0
                                  ? durationClassSelectedTwo
                                  : initialDurationTwo
                              }
                              onChange={(values) =>
                                setDurationClassSelectedTwo(values)
                              }
                            >
                              {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                                <Option key={value} value={value}>
                                  {label}
                                </Option>
                              ))}
                            </Select>
                          </Col>
                          <Col className="col">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Depature Location
                              </Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="departure_location_two"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="departure_location_two"
                                >
                                  Choose which departure locations are available
                                  for the specified supported class and duration
                                  of trip for the particular boat.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              rows="5"
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              value={
                                dapatureLocationsSelectedTwo.length > 0
                                  ? dapatureLocationsSelectedTwo
                                  : initialDepartureLocationsTwo
                              }
                              onChange={(values) =>
                                handleDepartureMulti(
                                  values,
                                  setDepartureLocationsSelectedTwo,
                                )
                              }
                            >
                              {departureLocationSelectOptions}
                            </Select>
                          </Col>
                          <Col className="col-1 d-flex align-items-center mt-4">
                            {isRowOpen || !supportedClassRowThree ? (
                              <>
                                <i
                                  className="uil-plus-circle font-size-20 text-paradise"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setSupportedClassRowThree(true);
                                  }}
                                />
                              </>
                            ) : (
                              <i
                                className="uil-minus-circle font-size-20 text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setSupportedClassRowThree(true);
                                  setSupportedClassRowTwo(false);
                                  setIsRowOpen(true);
                                }}
                              />
                            )}
                          </Col>
                        </Row>
                      ) : null}

                      {supportedClassRowThree ? (
                        <Row className=" mb-2 d-flex ">
                          <Col className="col-2">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Supported Class
                              </Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="suported_class_three"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="suported_class_three"
                                >
                                  Specifies the trip classifications this boat
                                  can support when marked as flexible. Select
                                  the classes the boat is allowed to operate in
                                  addition to its primary classification.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setSuportedClassSelectedThree(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value={null}>Select....</option>
                              {SUPPORTED_CLASS_OPTIONS.map(
                                ({ value, label }) => (
                                  <option
                                    key={value}
                                    value={value}
                                    selected={
                                      dataEdit?.supported_classes
                                        ?.class_id_3 === value
                                    }
                                  >
                                    {label}
                                  </option>
                                ),
                              )}
                            </Input>
                          </Col>
                          <Col className="col-3">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">Duration</Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="duration_three"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="duration_three"
                                >
                                  Select the duration of the trip to define its
                                  available pick-up locations.
                                  <br />
                                  <br />
                                  For example, the boat may take 4 hour trips
                                  from the marina, 6 hour trips it can also pick
                                  up from Northern hotels, and for 8 hour trips
                                  it can pick up at all hotels.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              value={
                                durationClassSelectedThree.length > 0
                                  ? durationClassSelectedThree
                                  : initialDurationThree
                              }
                              onChange={(values) =>
                                setDurationClassSelectedThree(values)
                              }
                            >
                              {filteredCustomWorkflowDurationOptions.map(({ value, label }) => (
                                <Option key={value} value={value}>
                                  {label}
                                </Option>
                              ))}
                            </Select>
                          </Col>
                          <Col className="col">
                            <div className="d-flex justify-content-between">
                              <Label className="form-label">
                                Depature Location
                              </Label>
                              <div>
                                <i
                                  className="uil-question-circle font-size-15"
                                  id="departure_location_three"
                                />
                                <UncontrolledTooltip
                                  autohide={true}
                                  placement="top"
                                  target="departure_location_three"
                                >
                                  Choose which departure locations are available
                                  for the specified supported class and duration
                                  of trip for the particular boat.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              rows="5"
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              value={
                                dapatureLocationsSelectedThree.length > 0
                                  ? dapatureLocationsSelectedThree
                                  : initialDepartureLocationsThree
                              }
                              onChange={(values) =>
                                handleDepartureMulti(
                                  values,
                                  setDepartureLocationsSelectedThree,
                                )
                              }
                            >
                              {departureLocationSelectOptions}
                            </Select>
                          </Col>
                          <Col className="col-1 d-flex align-items-center mt-4">
                            <i
                              className="uil-minus-circle font-size-20 text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => setSupportedClassRowThree(false)}
                            />
                          </Col>
                        </Row>
                      ) : null}
                    </>
                  ) : null}
                </Row>

                <Row className="mt-3">
                  {customPricesCheck ? (
                    <>
                      <Row className="mt-4">
                        <div
                          className="p-3"
                          style={{ backgroundColor: "#FFEFDE" }}
                        >
                          <p className="fs-5 fw-bold text-uppercase text-dark mb-0">
                            Custom Prices
                          </p>
                        </div>
                      </Row>
                      <Row className="col-12">
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationOne || ""}
                            onChange={(e) => {
                              setCustomDurationOne(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="net_price_1"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="net_price_1"
                              >
                                The price that needs to be paid to the boat for
                                the trip.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_1"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_1 || ""}
                              invalid={
                                validationType.touched.net_price_1 &&
                                validationType.errors.net_price_1
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_1 &&
                            validationType.errors.net_price_1 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_1}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            {/* <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div> */}
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationTwo || ""}
                            onChange={(e) => {
                              setCustomDurationTwo(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="net_price_2"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="net_price_2"
                              >
                                The price that needs to be paid to the boat for
                                the trip.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_2"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_2 || ""}
                              invalid={
                                validationType.touched.net_price_2 &&
                                validationType.errors.net_price_2
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_2 &&
                            validationType.errors.net_price_2 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_2}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row className="col-12">
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            {/* <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div> */}
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationThree || ""}
                            onChange={(e) => {
                              setCustomDurationThree(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            {/* <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id=""
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target=""
                            >
                            </UncontrolledTooltip>
                          </div> */}
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_3"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_3 || ""}
                              invalid={
                                validationType.touched.net_price_3 &&
                                validationType.errors.net_price_3
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_3 &&
                            validationType.errors.net_price_3 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_3}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            {/* <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div> */}
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationFour || ""}
                            onChange={(e) => {
                              setCustomDurationFour(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            {/* <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id=""
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target=""
                            >
                            </UncontrolledTooltip>
                          </div> */}
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_4"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_4 || ""}
                              invalid={
                                validationType.touched.net_price_4 &&
                                validationType.errors.net_price_4
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_4 &&
                            validationType.errors.net_price_4 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_4}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row className="col-12">
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            {/* <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div> */}
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationFive || ""}
                            onChange={(e) => {
                              setCustomDurationFive(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            {/* <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id=""
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target=""
                            >
                            </UncontrolledTooltip>
                          </div> */}
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_5"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_5 || ""}
                              invalid={
                                validationType.touched.net_price_5 &&
                                validationType.errors.net_price_5
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_5 &&
                            validationType.errors.net_price_5 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_5}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Duration</Label>
                            {/* <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="main_class"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="main_class"
                              >
                                Select the duration of the trip to define its
                                available pick-up locations.
                                <br />
                                <br />
                                For example, the boat may take 4 hour trips from
                                the marina, 6 hour trips it can also pick up
                                from Northern hotels, and for 8 hour trips it
                                can pick up at all hotels.
                              </UncontrolledTooltip>
                            </div> */}
                          </div>
                          <Input
                            type="select"
                            name=""
                            value={customDurationSix || ""}
                            onChange={(e) => {
                              setCustomDurationSix(e.target.value || null);
                            }}
                            onBlur={validationType.handleBlur}
                          >
                            <option value="">Select....</option>
                            {filteredCustomWorkflowDurationOptions.map(
                              ({ value, label }) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ),
                            )}
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            {/* <div>
                            <i
                              className="uil-question-circle font-size-15"
                              id=""
                            />
                            <UncontrolledTooltip
                              autohide={true}
                              placement="top"
                              target=""
                            >
                            </UncontrolledTooltip>
                          </div> */}
                          </div>
                          <div className="input-group">
                            <span
                              className="input-group-text form-label fw-bold bg-paradise text-white border-0"
                              id="basic-addon1"
                              style={{ fontSize: "0.85em" }}
                            >
                              $
                            </span>
                            <Input
                              name="net_price_6"
                              placeholder=""
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.net_price_6 || ""}
                              invalid={
                                validationType.touched.net_price_6 &&
                                validationType.errors.net_price_6
                                  ? true
                                  : false
                              }
                            />
                            {validationType.touched.net_price_6 &&
                            validationType.errors.net_price_6 ? (
                              <FormFeedback type="invalid">
                                {validationType.errors.net_price_6}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    </>
                  ) : null}
                </Row>
              </>
            ) : null}
            <Row>
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-start">
                {!dataEdit ? (
                  <Button
                    type="button"
                    color="paradise"
                    outline
                    className="waves-effect waves-light mb-3 btn mx-4"
                    onClick={() => setMenu(0)}
                  >
                    Back
                  </Button>
                ) : null}
              </Col>
              <Col className="col-6 mx-6 mt-2 d-flex justify-content-end">
                <Button
                  type="button"
                  color="paradise"
                  outline
                  className="waves-effect waves-light mb-3 btn mx-4"
                  onClick={() => {
                    setAssetModal(false);
                    setIsEdit(false);
                    setDataEdit(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                >
                  <i className="mdi mdi-plus me-1" />
                  Submit
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default BoatComponent;
