import React, { useEffect, useState } from "react";
import {
  getAvailableFromAPI,
  putSettingsAPI,
  getAvailableAPI,
  triggerUpdate,
  getVouchersTemplatesAPI,
} from "../../../Utils/API/Tours";
import SettingsImageOne from "../../../Components/Assets/images/settings1.png";
import SettingsImageTwo from "../../../Components/Assets/images/settings2.png";
import SettingsImageThree from "../../../Components/Assets/images/settings3.png";
import AvailableCheckbox from "./availableCheckbox";
import {
  TabPane,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  Tooltip,
} from "reactstrap";
// import classnames from "classnames";
import ReservePageModal from "../../../Components/Common/Modals/TourSetingsModal/ReservePageModal";
// import * as Yup from "yup";
import { useFormik } from "formik";
import { map, min, set } from "lodash";
import Swal from "sweetalert2";

const Settings = ({ history, tourSettings, id, toggle }) => {
  //seasons request
  const [availableData, setAvailableData] = useState([]);
  const [availableFromData, setAvailableFormData] = useState([]);

  const [activeDep, setActiveDep] = useState(false);
  const [providerNameTT, setProviderNameTT] = useState(false);
  const [providerURLTT, setProviderURLTT] = useState(false);
  const [infantsTT, setInfantsTT] = useState(false);
  const [kidsTT, setKidsTT] = useState(false);
  const [teenagersTT, setTeenagersTT] = useState(false);
  const [cruiseShipTourTT, setCruiseShipTourTT] = useState(false);
  const [cruiseShipTourURLTT, setCruiseShipTourURLTT] = useState(false);
  const [agesAcceptanceTT, setAgesAcceptanceTT] = useState(false);
  const [agesAcceptedSwitch, setAgesAcceptedSwitch] = useState(false);
  useEffect(() => {
    getAvailableFromAPI()
      .then((resp) => {
        setAvailableData(resp.data.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Something happened with the connection. Refresh the page and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    getAvailableAPI()
      .then((resp) => {
        setAvailableFormData(resp.data.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Something happened with the connection. Refresh the page and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, []);
  useEffect(() => {
    if (tourSettings && availableData) {
      let optionsArea = [];

      availableData.forEach((element) => {
        if (
          tourSettings.available_seasons &&
          tourSettings.available_seasons.includes(element.id.toString())
        ) {
          optionsArea.push({ label: element.name, value: element.id });
        }
      });
    }
    if (tourSettings?.payment_request === 1) {
      setActiveDep(true);
    } else {
      setActiveDep(false);
    }
  }, [availableData, tourSettings]);

  const onChangeActive = () => {
    setActiveDep(!activeDep);
  };

  //available from
  const [availableFromIDs, setAvailableFromIDs] = useState([]);

  useEffect(() => {
    setAvailableFromIDs(tourSettings.available_from);
    // setTemplateSelected(tourSettings.voucher_template_id);
    setAgesAcceptedSwitch(tourSettings.all_ages === 1 ? true : false);
  }, [tourSettings]);

  //modal reserve page
  const [reserveModal, setReserveModal] = useState(false);

  console.log(tourSettings, " tour settings");
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_id: id,
      provider_tour_name: tourSettings.provider_tour_name
        ? tourSettings.provider_tour_name
        : "",
      provider_tour_url: tourSettings.provider_tour_url
        ? tourSettings.provider_tour_url
        : "",
      infants_range_from: tourSettings.infants_range_from
        ? tourSettings.infants_range_from
        : "",
      infants_range_to: tourSettings.infants_range_to
        ? tourSettings.infants_range_to
        : "",
      kids_range_from: tourSettings.kids_range_from
        ? tourSettings.kids_range_from
        : "",
      kids_range_to: tourSettings.kids_range_to
        ? tourSettings.kids_range_to
        : "",
      teenagers_range_from: tourSettings.teenagers_range_from
        ? tourSettings.teenagers_range_from
        : "",
      teenagers_range_to: tourSettings.teenagers_range_to
        ? tourSettings.teenagers_range_to
        : "",
      cruise_ship_tour_name: tourSettings.cruise_excursion_name
        ? tourSettings.cruise_excursion_name
        : "",
      cruise_ship_tour_url: tourSettings.cruise_excursion_url
        ? tourSettings.cruise_excursion_url
        : "",
      min_age: tourSettings.people_range_from
        ? tourSettings.people_range_from
        : "",
      max_age: tourSettings.people_range_to ? tourSettings.people_range_to : "",
    },
    // validationSchema: Yup.object().shape({
    //   tour_name: Yup.string().required("Field required"),
    //   code: Yup.string()
    //     .required("Code is required")
    //     .max(2, "Must be exactly 2 chars")
    //     .required("Max 2 chars"),
    // }),
    onSubmit: (values) => {
      let data = {
        provider_tour_name: values.provider_tour_name
          ? values.provider_tour_name
          : "",
        provider_tour_url: values.provider_tour_url
          ? values.provider_tour_url
          : "",
        available_from: availableFromIDs ? availableFromIDs : [],
        infants_range_from: values.infants_range_from
          ? values.infants_range_from
          : "",
        infants_range_to: values.infants_range_to
          ? values.infants_range_to
          : "",
        kids_range_from: values.kids_range_from ? values.kids_range_from : "",
        kids_range_to: values.kids_range_to ? values.kids_range_to : "",
        teenagers_range_from: values.teenagers_range_from
          ? values.teenagers_range_from
          : "",
        teenagers_range_to: values.teenagers_range_to
          ? values.teenagers_range_to
          : "",

        payment_request: activeDep === true ? 1 : 0,
        all_ages: agesAcceptedSwitch === true ? 1 : 0,
        cruise_excursion_name: values.cruise_ship_tour_name
          ? values.cruise_ship_tour_name
          : "",
        cruise_excursion_url: values.cruise_ship_tour_url
          ? values.cruise_ship_tour_url
          : "",
        people_range_from: values.min_age ? values.min_age : "",
        people_range_to: values.max_age ? values.max_age : "",
      };

      //console.log('data a enviar', data)

      putSettingsAPI(id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            // triggerUpdate();
            Swal.fire("Edited!", "Settings has been created.", "success");
            toggle("3");
          }
        })
        .catch((error) => {
          let errorMessages = [];
          if (error.response.data.data) {
            Object.entries(error.response.data.data).map((item) =>
              errorMessages.push(item[1]),
            );
          } else {
            if (error.response.data.message === "Array to string conversion") {
              errorMessages.push("Available From is required");
            } else {
              errorMessages.push(error.response.data.message);
            }
          }

          Swal.fire(
            "Error!",
            // {error.response.},
            String(errorMessages[0]),
          );
        });
    },
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validationType.handleSubmit();
          return false;
        }}
        className="custom-validation"
      >
        <TabPane tabId="1" className="">
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-4">
              <img src={SettingsImageThree} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageOne} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-4">
              <img src={SettingsImageTwo} alt="image1" className="w-100" />
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <div className="mb-2 p-2" style={{ backgroundColor: "#E9F4FF" }}>
                <p
                  className="px-2 fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  TOUR SETTINGS
                </p>
              </div>
            </Col>

            <Col className="col-2">
              <div className="form-outline mt-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Provider Tour Name</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="Provider"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={providerNameTT}
                      target="Provider"
                      toggle={() => {
                        setProviderNameTT(!providerNameTT);
                      }}
                    >
                      The name that the Provider calls the tour on their own
                      website or service agreement.
                      <br />
                      <br />
                      This will be shown on all Provider correspondence to avoid
                      confusion where our assigned name is different.
                    </Tooltip>
                  </div>
                </div>
                <Input
                  name="provider_tour_name"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.provider_tour_name || ""}
                  invalid={
                    validationType.touched.provider_tour_name &&
                    validationType.errors.provider_tour_name
                      ? true
                      : false
                  }
                />
                {validationType.touched.provider_tour_name &&
                validationType.errors.provider_tour_name ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.provider_tour_name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-4">
              <div className="form-outline mt-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Provider Tour URL</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="ProviderTour"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={providerURLTT}
                      target="ProviderTour"
                      toggle={() => {
                        setProviderURLTT(!providerURLTT);
                      }}
                    >
                      Paste the URL from the Provider's website where the
                      information from this tour can be viewed.
                      <br />
                      <br />
                      This will be appear in internal tools such as Adventure
                      Finder, and is used by Marketing to compare pricing with
                      our rate sheet and to locate information about the tour.
                    </Tooltip>
                  </div>
                </div>
                <Input
                  name="provider_tour_url"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.provider_tour_url || ""}
                  invalid={
                    validationType.touched.provider_tour_url &&
                    validationType.errors.provider_tour_url
                      ? true
                      : false
                  }
                />
                {validationType.touched.provider_tour_url &&
                validationType.errors.provider_tour_url ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.provider_tour_url}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mt-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Cruise Ship Tour Name</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="CruiseShipTour"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={cruiseShipTourTT}
                      target="CruiseShipTour"
                      toggle={() => {
                        setCruiseShipTourTT(!cruiseShipTourTT);
                      }}
                    >
                      The name the cruise ships call this excursion on their
                      shore excursion lists. Make sure the one you choose is
                      comparable to the one we offer, even if not the same, it's
                      close..
                      <br />
                      <br />
                      This will appear on our Shore Excursions page, and is used
                      for SEO and price comparison purposes so the ship
                      passengers can see that they can save money with us.
                    </Tooltip>
                  </div>
                </div>
                <Input
                  name="cruise_ship_tour_name"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.cruise_ship_tour_name || ""}
                  invalid={
                    validationType.touched.cruise_ship_tour_name &&
                    validationType.errors.cruise_ship_tour_name
                      ? true
                      : false
                  }
                />
                {validationType.touched.cruise_ship_tour_name &&
                validationType.errors.cruise_ship_tour_name ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.cruise_ship_tour_name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-4">
              <div className="form-outline mt-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Cruise Ship Tour URL</Label>
                  <div>
                    <i
                      className="uil-question-circle font-size-15"
                      id="CruiseShipTourURL"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={cruiseShipTourURLTT}
                      target="CruiseShipTourURL"
                      toggle={() => {
                        setCruiseShipTourURLTT(!cruiseShipTourURLTT);
                      }}
                    >
                      Paste the URL from the cruise ship's website where this
                      tour is shown. This is for marketing reference when doing
                      pricing.
                    </Tooltip>
                  </div>
                </div>
                <Input
                  name="cruise_ship_tour_url"
                  placeholder=""
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.cruise_ship_tour_url || ""}
                  invalid={
                    validationType.touched.cruise_ship_tour_url &&
                    validationType.errors.cruise_ship_tour_url
                      ? true
                      : false
                  }
                />
                {validationType.touched.cruise_ship_tour_url &&
                validationType.errors.cruise_ship_tour_url ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.cruise_ship_tour_url}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            {tourSettings?.website_id !== 3 ? (
              <></>
            ) : (
              <>
                <Col className="col-1 d-flex align-items-center pt-4">
                  <Label className="form-label mb-0">Available From: </Label>
                </Col>

                {availableFromData.length > 0 ? (
                  <>
                    {map(availableFromData, (available, index) => {
                      return (
                        <Col key={index} className="col-2 pt-4">
                          <div className="">
                            <AvailableCheckbox
                              available={available}
                              availableFromIDs={availableFromIDs}
                              setAvailableFromIDs={setAvailableFromIDs}
                              availableFromData={availableFromData}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </>
                ) : null}
              </>
            )}
          </Row>

          <Row>
            <Col className="col-12 pt-4">
              <div
                className="mb-4 py-2 px-3"
                style={{ backgroundColor: "#FFEFDE" }}
              >
                <p
                  className="fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "0px",
                  }}
                >
                  KIDS SETTINGS
                </p>
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col className="col-3">
              <div className="d-flex align-items-center">
                <div className="d-flex justify-content-between">
                  <p
                    className="fs-5"
                    style={{
                      fontWeight: "bold",
                      color: "#495057",
                      marginBottom: "20px",
                    }}
                  >
                    Ages Accepted
                  </p>
                  <div>
                    <i
                      className="uil-question-circle font-size-15 mx-2"
                      id="agesAcceptance"
                    />
                    <Tooltip
                      placement="right"
                      isOpen={agesAcceptanceTT}
                      target="agesAcceptance"
                      toggle={() => {
                        setAgesAcceptanceTT(!agesAcceptanceTT);
                      }}
                    >
                      Specify the minimum and maximum ages allowed to
                      participate on the tour.
                      <br />
                      <br />
                      If all ages are welcome, select the "All Ages" toggle. If
                      there is no maximum age, leave "Max. Age" blank and only
                      fill in the Min. Age".
                    </Tooltip>
                  </div>
                </div>

                <div className="d-flex mb-2 form-check form-switch">
                  <Label className="mx-2">All Ages</Label>
                  <input
                    type="checkbox"
                    className="form-check-input mx-1"
                    id="customSwitchsizesm"
                    checked={agesAcceptedSwitch}
                    onChange={(e) => setAgesAcceptedSwitch(e.target.checked)}
                  />
                </div>
              </div>
              <div className="col-10 d-flex justify-content-between">
                <Col className="col-5">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Min. Age</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="minAge"
                      />
                      <Tooltip
                        placement="right"
                        // isOpen={infantsTT}
                        target="minAge"
                        toggle={() => {
                          // setInfantsTT(!infantsTT)
                        }}
                      >
                        {/* Use only if the tour specifies an infants price, or a different price for kids under a certain age than the normal kids price. <br/><br/> For example Kids 6 to 12 years are $50.00, but Kids under 6 years old are $5.00. */}
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group ">
                      <span className="input-group-text">From</span>
                      <Input
                        name="min_age"
                        placeholder="Years"
                        type="text"
                        disabled={agesAcceptedSwitch}
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.min_age || ""}
                        invalid={
                          validationType.touched.min_age &&
                          validationType.errors.min_age
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.min_age &&
                      validationType.errors.min_age ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.min_age}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Max. Age</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="maxAge"
                      />
                      <Tooltip
                        placement="right"
                        // isOpen={infantsTT}
                        target="maxAge"
                        toggle={() => {
                          // setInfantsTT(!infantsTT)
                        }}
                      >
                        {/* Use only if the tour specifies an infants price, or a different price for kids under a certain age than the normal kids price. <br/><br/> For example Kids 6 to 12 years are $50.00, but Kids under 6 years old are $5.00. */}
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group ">
                      <span className="input-group-text">To</span>
                      <Input
                        name="max_age"
                        placeholder="Years"
                        type="text"
                        disabled={agesAcceptedSwitch}
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.max_age || ""}
                        invalid={
                          validationType.touched.max_age &&
                          validationType.errors.max_age
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.max_age &&
                      validationType.errors.max_age ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.max_age}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-center">
                <p
                  className="fs-5"
                  style={{
                    fontWeight: "bold",
                    color: "#495057",
                    marginBottom: "20px",
                  }}
                >
                  Age Ranges for Pricing
                </p>
              </div>

              <div className=" d-flex justify-content-between">
                <Col className="col-3 ">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Infants</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="Infants"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={infantsTT}
                        target="Infants"
                        toggle={() => {
                          setInfantsTT(!infantsTT);
                        }}
                      >
                        Used only if your tour has infants pricing that is
                        different than kids pricing. If your tour has only one
                        Kids price, leave this section blank.
                        <br />
                        <br />
                        This will show in the price boxes and Kids note on the
                        website.
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-4">
                      <span className="input-group-text">From</span>
                      <Input
                        name="infants_range_from"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.infants_range_from || ""}
                        invalid={
                          validationType.touched.infants_range_from &&
                          validationType.errors.infants_range_from
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.infants_range_from &&
                      validationType.errors.infants_range_from ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.infants_range_from}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-text text-center"
                        style={{ minWidth: "59px" }}
                      >
                        To
                      </span>
                      <Input
                        name="infants_range_to"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.infants_range_to || ""}
                        invalid={
                          validationType.touched.infants_range_to &&
                          validationType.errors.infants_range_to
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.infants_range_to &&
                      validationType.errors.infants_range_to ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.infants_range_to}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Kids</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="Kids"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={kidsTT}
                        target="Kids"
                        toggle={() => {
                          setKidsTT(!kidsTT);
                        }}
                      >
                        Specify the age range that qualifies for kids pricing.
                        If there is no separate kids price, leave this section
                        blank. If all kids under a certain age pay kids price,
                        write zero in the From box.
                        <br />
                        <br />
                        This will appear in the price box and in the Kids note
                        on the website.
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-4">
                      <span className="input-group-text">From</span>
                      <Input
                        name="kids_range_from"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.kids_range_from || ""}
                        invalid={
                          validationType.touched.kids_range_from &&
                          validationType.errors.kids_range_from
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.kids_range_from &&
                      validationType.errors.kids_range_from ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.kids_range_from}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{ minWidth: "59px" }}
                      >
                        To
                      </span>
                      <Input
                        name="kids_range_to"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.kids_range_to || ""}
                        invalid={
                          validationType.touched.kids_range_to &&
                          validationType.errors.kids_range_to
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.kids_range_to &&
                      validationType.errors.kids_range_to ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.kids_range_to}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col className="col-3 ">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Teenagers</Label>
                    <div>
                      <i
                        className="uil-question-circle font-size-15"
                        id="Teenagers"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={teenagersTT}
                        target="Teenagers"
                        toggle={() => {
                          setTeenagersTT(!teenagersTT);
                        }}
                      >
                        Use if your tour specifies a teen price that is
                        different than kids price or adults price. If your tour
                        doesn't have a teen price, leave blank.
                        <br />
                        <br />
                        This will appear in the price boxes and the Kids note on
                        the website.
                      </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-4">
                      <span className="input-group-text">From</span>
                      <Input
                        name="teenagers_range_from"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.teenagers_range_from || ""}
                        invalid={
                          validationType.touched.teenagers_range_from &&
                          validationType.errors.teenagers_range_from
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.teenagers_range_from &&
                      validationType.errors.teenagers_range_from ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.teenagers_range_from}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{ minWidth: "59px" }}
                      >
                        To
                      </span>
                      <Input
                        name="teenagers_range_to"
                        placeholder="Years"
                        type="text"
                        onChange={validationType.handleChange}
                        onBlur={validationType.handleBlur}
                        value={validationType.values.teenagers_range_to || ""}
                        invalid={
                          validationType.touched.teenagers_range_to &&
                          validationType.errors.teenagers_range_to
                            ? true
                            : false
                        }
                      />
                      {validationType.touched.teenagers_range_to &&
                      validationType.errors.teenagers_range_to ? (
                        <FormFeedback type="invalid">
                          {validationType.errors.teenagers_range_to}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>

          <Row>
            <div className="col-12 d-flex justify-content-end mt-5">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light me-2"
                type="button"
                onClick={() => toggle("1")}
              >
                <i className="uil-angle-double-left" />
                Previous
              </Button>
              <Button
                type="submit"
                className="font-16 btn-orange"
                // onClick={toggleCategory}
              >
                Save and Continue
                <i className="uil-angle-double-right mx-1 " />
              </Button>
            </div>
          </Row>
        </TabPane>
      </Form>
      <ReservePageModal
        reserveModal={reserveModal}
        setReserveModal={setReserveModal}
        id={id}
      />
    </>
  );
};

export default Settings;
