// import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import { useEffect, useState } from "react";
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
  const [mainClassSelected, setMainClassSelected] = useState(0);
  const [fishingAditionalInputs, setFishingAditionalInputs] = useState(false);
  const [flexiblePrice, setFlexiblePrice] = useState(false);
  const [customPricesCheck, setCustomPricesCheck] = useState(false);
  const [supportedClassRowTwo, setSupportedClassRowTwo] = useState(false);
  const [supportedClassRowThree, setSupportedClassRowThree] = useState(false);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const [suportedClassSelectedOne, setSuportedClassSelectedOne] = useState("");
  const [durationClassSelectedOne, setDurationClassSelectedOne] = useState("");
  const [suportedClassSelectedTwo, setSuportedClassSelectedTwo] = useState("");
  const [durationClassSelectedTwo, setDurationClassSelectedTwo] = useState("");
  const [suportedClassSelectedThree, setSuportedClassSelectedThree] =
    useState("");
  const [durationClassSelectedThree, setDurationClassSelectedThree] =
    useState("");
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
      setFishingAditionalInputs(
        dataEdit.activities.includes(50) ? true : false
      );
      setSuportedClassSelectedOne(
        dataEdit.supported_classes?.class_id_1 || null
      );
      setDurationClassSelectedOne(
        dataEdit.supported_classes?.duration_1 || null
      );
      setSuportedClassSelectedTwo(
        dataEdit.supported_classes?.class_id_2 || null
      );
      setDurationClassSelectedTwo(
        dataEdit.supported_classes?.duration_2 || null
      );
      setSuportedClassSelectedThree(
        dataEdit.supported_classes?.class_id_3 || null
      );
      setDurationClassSelectedThree(
        dataEdit.supported_classes?.duration_3 || null
      );
      setInitialDepartureLocationsOne(
        dataEdit.supported_classes?.departure_locations_1 || []
      );
      setInitialDepartureLocationsTwo(
        dataEdit.supported_classes?.departure_locations_2 || []
      );
      setInitialDepartureLocationsThree(
        dataEdit.supported_classes?.departure_locations_3 || []
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

  //multi select activities
  function handleMulti(selected) {
    console.log("selected activities", selected);
    setActivitiesSelected(selected);
    if (!selected || selected.length === 0) {
      setFishingAditionalInputs(false);
      return;
    }

    const containsFishing = selected.some((sel) => {
      if (typeof sel === "string" || typeof sel === "number") {
        if (String(sel).toLowerCase() === "fishing") return true;
        return activityData.some(
          (a) =>
            String(a.id) === String(sel) &&
            String(a.text).toLowerCase() === "fishing"
        );
      }
      if (sel && typeof sel === "object") {
        if (sel.label && String(sel.label).toLowerCase() === "fishing")
          return true;
        if (sel.value) {
          return activityData.some(
            (a) =>
              String(a.id) === String(sel.value) &&
              String(a.text).toLowerCase() === "fishing"
          );
        }
      }
      return false;
    });

    setFishingAditionalInputs(Boolean(containsFishing));
    // setSelectionID(selected);
  }

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
      net_price_1: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_1 : "",
      net_price_2: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_2 : "",
      net_price_3: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_3 : "",
      net_price_4: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_4 : "",
      net_price_5: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_5 : "",
      net_price_6: dataEdit && dataEdit.custom_prices ? dataEdit.custom_prices?.net_price_6 : "",
    },
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Name is required"),
    //   default_label: Yup.string().required("Default Label is required"),
    // }),
    onSubmit: (values) => {
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
        joined_fleet_at: values.joint_fleet,
        last_inspected_at: values.last_inspected,
        supported_classes: {
          class_id_1: suportedClassSelectedOne,
          duration_1: durationClassSelectedOne,
          departure_locations_1:
            dapatureLocationsSelectedOne.length > 0
              ? dapatureLocationsSelectedOne
              : initialDepartureLocationsOne,
          class_id_2: supportedClassRowTwo ? suportedClassSelectedTwo : null,
          duration_2: supportedClassRowTwo ? durationClassSelectedTwo : null,
          departure_locations_2: !supportedClassRowTwo
            ? []
            : dapatureLocationsSelectedTwo.length > 0
            ? dapatureLocationsSelectedTwo
            : initialDepartureLocationsTwo,
          class_id_3: supportedClassRowThree
            ? suportedClassSelectedThree
            : null,
          duration_3: supportedClassRowThree
            ? durationClassSelectedThree
            : null,
          departure_locations_3: !supportedClassRowThree
            ? []
            : dapatureLocationsSelectedThree.length > 0
            ? dapatureLocationsSelectedThree
            : initialDepartureLocationsThree,
        },
        has_custom_prices: customPricesCheck ? 1 : 0,
        custom_prices: {
          duration_1: customDurationOne ,
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
console.log('Submitting boat data:', data);
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
                  setDataEdit(null);
                  setIsEdit(false);
                }
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
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
                String(errorMessages[0])
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
                  setDataEdit(null);
                }
              );
            }
          })
          .catch((error) => {
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
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
                String(errorMessages[0])
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
          <Row>
            <Row>
              <Col className="col-2">
                <div className="form-outline mb-4">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Boat Name</Label>
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
                  <Label className="form-label">Type</Label>
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
                  <Label className="form-label">Length</Label>
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
                    <Label className="form-label">Make</Label>
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
                  <Label className="form-label">Location</Label>
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
                  <Label className="form-label">Marina</Label>
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
                  <Label className="form-label">A/C</Label>
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
                    <Label className="form-label">Capacity</Label>
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
                  <Label className="form-label">Shade</Label>
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
                  <Label className="form-label">Access.</Label>
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
                  {map(activityData, (item, index) => {
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
                    <Label className="form-label">Upload PDF</Label>
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
                        Upload a PDF of photos for display in our CE Tool Chest and other tools.
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

                      axios
                        .post(`${API_URL}/media-library/upload`, formData, {
                          headers: imagesOptions,
                        })
                        .then((response) => {
                          console.log("respuesta", response);
                          setPdfLink(response.data.data.url);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  />
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Upload Image</Label>
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
                        Upload an image to be displayed in the CE Tool Chest and other tools. (Image size: 500 x 325 px).
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

                      axios
                        .post(`${API_URL}/media-library/upload`, formData, {
                          headers: imagesOptions,
                        })
                        .then((response) => {
                          console.log("respuesta", response.data.data.url);
                          setImageLink(response.data.data.url);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
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
                      <Label className="form-label">Main Class</Label>
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
                          The primary class of the boat. It may take other type of trips but this is its main category.
                          
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
                      <option
                        value={1}
                        selected={dataEdit?.main_class_id === 1 ? true : false}
                      >
                        Economy
                      </option>
                      <option
                        value={2}
                        selected={dataEdit?.main_class_id === 2 ? true : false}
                      >
                        Full-Size
                      </option>
                      <option
                        value={3}
                        selected={dataEdit?.main_class_id === 3 ? true : false}
                      >
                        Premium
                      </option>
                      <option
                        value={4}
                        selected={dataEdit?.main_class_id === 4 ? true : false}
                      >
                        Premium Plus
                      </option>
                      <option
                        value={5}
                        selected={dataEdit?.main_class_id === 5 ? true : false}
                      >
                        Premium Max
                      </option>
                      <option
                        value={6}
                        selected={dataEdit?.main_class_id === 6 ? true : false}
                      >
                        Delux
                      </option>
                      <option
                        value={7}
                        selected={dataEdit?.main_class_id === 7 ? true : false}
                      >
                        Elite
                      </option>
                    </Input>
                  </Col>
                  <Col className="col-3 d-flex align-items-center mt-4">
                    <div className="d-flex mt-1 ">
                      <Label className="form-label">Flexible</Label>
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
                          Indicates whether this boat can be used for trips in other classifications. Enable this option if the boat is allowed to operate outside its primary class.
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
                    <div className="d-flex mt-1 ">
                      <Label className="form-label">Add Custom Prices</Label>
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
                          Add specific pricing for the boat, for example if the boat requires a specific amount to operate that is different than our standard pricing. This will show in the Boat Details in the Fishing Dispatch tool.
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
                               Specifies the trip classifications this boat can support when marked as flexible. Select the classes the boat is allowed to operate in addition to its primary classification.
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
                            <option
                              value={1}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 1
                                  ? true
                                  : false
                              }
                            >
                              Economy
                            </option>
                            <option
                              value={2}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 2
                                  ? true
                                  : false
                              }
                            >
                              Full-Size
                            </option>
                            <option
                              value={3}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 3
                                  ? true
                                  : false
                              }
                            >
                              Premium
                            </option>
                            <option
                              value={4}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 4
                                  ? true
                                  : false
                              }
                            >
                              Premium Plus
                            </option>
                            <option
                              value={5}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 5
                                  ? true
                                  : false
                              }
                            >
                              Premium Max
                            </option>
                            <option
                              value={6}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 6
                                  ? true
                                  : false
                              }
                            >
                              Delux
                            </option>
                            <option
                              value={7}
                              selected={
                                dataEdit?.supported_classes?.class_id_1 === 7
                                  ? true
                                  : false
                              }
                            >
                              Elite
                            </option>
                          </Input>
                        </Col>
                        <Col className="col-2">
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
                          <Input
                            type="select"
                            name=""
                            onChange={(e) => {
                              setDurationClassSelectedOne(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.supported_classes?.duration_1 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.supported_classes?.duration_1 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.supported_classes?.duration_1 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.supported_classes?.duration_1 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.supported_classes?.duration_1 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
                          </Input>
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
                                Choose which departure locations are available for the specified supported class and duration of trip for the particular boat.
                              </UncontrolledTooltip>
                            </div>
                          </div>
                          <Select
                            mode="multiple"
                            allowClear
                            rows="5"
                            style={{ width: "100%", paddingTop: "5px" }}
                            placeholder="Please select"
                            defaultValue={initialDepartureLocationsOne}
                            onChange={(e) =>
                              setDepartureLocationsSelectedOne(e)
                            }
                          >
                            {map(depatureLocationData, (item, index) => {
                              return (
                                <Option key={index} value={item.id}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Col>
                        <Col className="col-1 d-flex align-items-center mt-4">
                          <i
                            className="uil-plus-circle font-size-20 text-paradise"
                            style={{  cursor: "pointer" }}
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
                                 Specifies the trip classifications this boat can support when marked as flexible. Select the classes the boat is allowed to operate in addition to its primary classification.
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
                              <option
                                value={1}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 1
                                    ? true
                                    : false
                                }
                              >
                                Economy
                              </option>
                              <option
                                value={2}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 2
                                    ? true
                                    : false
                                }
                              >
                                Full-Size
                              </option>
                              <option
                                value={3}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 3
                                    ? true
                                    : false
                                }
                              >
                                Premium
                              </option>
                              <option
                                value={4}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 4
                                    ? true
                                    : false
                                }
                              >
                                Premium Plus
                              </option>
                              <option
                                value={5}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 5
                                    ? true
                                    : false
                                }
                              >
                                Premium Max
                              </option>
                              <option
                                value={6}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 6
                                    ? true
                                    : false
                                }
                              >
                                Delux
                              </option>
                              <option
                                value={7}
                                selected={
                                  dataEdit?.supported_classes?.class_id_2 === 7
                                    ? true
                                    : false
                                }
                              >
                                Elite
                              </option>
                            </Input>
                          </Col>
                          <Col className="col-2">
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
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setDurationClassSelectedTwo(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value={null}>Select....</option>
                              <option
                                value={"4 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_2 ===
                                  "4 Hours"
                                    ? true
                                    : false
                                }
                              >
                                4 Hours
                              </option>
                              <option
                                value={"6 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_2 ===
                                  "6 Hours"
                                    ? true
                                    : false
                                }
                              >
                                6 Hours
                              </option>
                              <option
                                value={"8 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_2 ===
                                  "8 Hours"
                                    ? true
                                    : false
                                }
                              >
                                8 Hours
                              </option>
                              <option
                                value={"10 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_2 ===
                                  "10 Hours"
                                    ? true
                                    : false
                                }
                              >
                                10 Hours
                              </option>
                              <option
                                value={"12 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_2 ===
                                  "12 Hours"
                                    ? true
                                    : false
                                }
                              >
                                12 Hours
                              </option>
                            </Input>
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
                                  Choose which departure locations are available for the specified supported class and duration of trip for the particular boat.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              rows="5"
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              defaultValue={initialDepartureLocationsTwo}
                              onChange={(e) =>
                                setDepartureLocationsSelectedTwo(e)
                              }
                              // disabled={
                              //   voucherInitialData?.brings_read_only === 1 ? true : false
                              // }
                            >
                              {map(depatureLocationData, (item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.name}
                                  </Option>
                                );
                              })}
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
                                  Specifies the trip classifications this boat can support when marked as flexible. Select the classes the boat is allowed to operate in addition to its primary classification.
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
                              <option
                                value={1}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 1
                                    ? true
                                    : false
                                }
                              >
                                Economy
                              </option>
                              <option
                                value={2}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 2
                                    ? true
                                    : false
                                }
                              >
                                Full-Size
                              </option>
                              <option
                                value={3}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 3
                                    ? true
                                    : false
                                }
                              >
                                Premium
                              </option>
                              <option
                                value={4}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 4
                                    ? true
                                    : false
                                }
                              >
                                Premium Plus
                              </option>
                              <option
                                value={5}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 5
                                    ? true
                                    : false
                                }
                              >
                                Premium Max
                              </option>
                              <option
                                value={6}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 6
                                    ? true
                                    : false
                                }
                              >
                                Delux
                              </option>
                              <option
                                value={7}
                                selected={
                                  dataEdit?.supported_classes?.class_id_3 === 7
                                    ? true
                                    : false
                                }
                              >
                                Elite
                              </option>
                            </Input>
                          </Col>
                          <Col className="col-2">
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
                                  For example, the boat may take 4 hour trips
                                  from the marina, 6 hour trips it can also pick
                                  up from Northern hotels, and for 8 hour trips
                                  it can pick up at all hotels.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Input
                              type="select"
                              name=""
                              onChange={(e) => {
                                setDurationClassSelectedThree(e.target.value);
                              }}
                              onBlur={validationType.handleBlur}
                              //   value={validationType.values.department || ""}
                            >
                              <option value={null}>Select....</option>
                              <option
                                value={"4 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_3 ===
                                  "4 Hours"
                                    ? true
                                    : false
                                }
                              >
                                4 Hours
                              </option>
                              <option
                                value={"6 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_3 ===
                                  "6 Hours"
                                    ? true
                                    : false
                                }
                              >
                                6 Hours
                              </option>
                              <option
                                value={"8 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_3 ===
                                  "8 Hours"
                                    ? true
                                    : false
                                }
                              >
                                8 Hours
                              </option>
                              <option
                                value={"10 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_3 ===
                                  "10 Hours"
                                    ? true
                                    : false
                                }
                              >
                                10 Hours
                              </option>
                              <option
                                value={"12 Hours"}
                                selected={
                                  dataEdit?.supported_classes?.duration_3 ===
                                  "12 Hours"
                                    ? true
                                    : false
                                }
                              >
                                12 Hours
                              </option>
                            </Input>
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
                                  Choose which departure locations are available for the specified supported class and duration of trip for the particular boat.
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <Select
                              mode="multiple"
                              allowClear
                              rows="5"
                              style={{ width: "100%", paddingTop: "5px" }}
                              placeholder="Please select"
                              defaultValue={initialDepartureLocationsThree}
                              onChange={(e) =>
                                setDepartureLocationsSelectedThree(e)
                              }
                              // disabled={
                              //   voucherInitialData?.brings_read_only === 1 ? true : false
                              // }
                            >
                              {map(depatureLocationData, (item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.name}
                                  </Option>
                                );
                              })}
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
                            onChange={(e) => {
                              setCustomDurationOne(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_1 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_1 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_1 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_1 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_1 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
                          </Input>
                        </Col>
                        <Col className="col-3">
                          <div className="d-flex justify-content-between">
                            <Label className="form-label">Net Price</Label>
                            <div>
                              <i
                                className="uil-question-circle font-size-15"
                                id="custom_price_1"
                              />
                              <UncontrolledTooltip
                                autohide={true}
                                placement="top"
                                target="custom_price_1"
                              ></UncontrolledTooltip>
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
                            onChange={(e) => {
                              setCustomDurationTwo(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_2 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_2 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_2 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_2 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_2 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
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
                            onChange={(e) => {
                              setCustomDurationThree(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_3 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_3 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_3 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_3 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_3 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
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
                            onChange={(e) => {
                              setCustomDurationFour(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_4 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_4 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_4 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_4 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_4 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
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
                            onChange={(e) => {
                              setCustomDurationFive(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_5 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_5 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_5 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_5 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_5 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
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
                            onChange={(e) => {
                              setCustomDurationSix(e.target.value);
                            }}
                            onBlur={validationType.handleBlur}
                            //   value={validationType.values.department || ""}
                          >
                            <option value={null}>Select....</option>
                            <option
                              value={"4 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_6 ===
                                "4 Hours"
                                  ? true
                                  : false
                              }
                            >
                              4 Hours
                            </option>
                            <option
                              value={"6 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_6 ===
                                "6 Hours"
                                  ? true
                                  : false
                              }
                            >
                              6 Hours
                            </option>
                            <option
                              value={"8 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_6 ===
                                "8 Hours"
                                  ? true
                                  : false
                              }
                            >
                              8 Hours
                            </option>
                            <option
                              value={"10 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_6 ===
                                "10 Hours"
                                  ? true
                                  : false
                              }
                            >
                              10 Hours
                            </option>
                            <option
                              value={"12 Hours"}
                              selected={
                                dataEdit?.custom_prices?.duration_6 ===
                                "12 Hours"
                                  ? true
                                  : false
                              }
                            >
                              12 Hours
                            </option>
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
