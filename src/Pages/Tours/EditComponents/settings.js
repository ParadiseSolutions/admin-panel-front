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
} from "reactstrap";
import Switch from "react-switch";
// import classnames from "classnames";
import ReservePageModal from "../../../Components/Common/Modals/TourSetingsModal/ReservePageModal";
// import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

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

const Settings = ({ history, tourSettings, id, toggle }) => {
  //seasons request
  const [availableData, setAvailableData] = useState([]);
  const [availableFromData, setAvailableFormData] = useState([]);
  const [templatesData, setTemplatesData] = useState([]);
  const [templateSelected, setTemplateSelected] = useState("");
  const [activeDep, setActiveDep] = useState(false);

  useEffect(() => {
    getAvailableFromAPI().then((resp) => {
      setAvailableData(resp.data.data);
    });
    getAvailableAPI().then((resp) => {
      setAvailableFormData(resp.data.data);
    });
    getVouchersTemplatesAPI().then((resp) => {
      setTemplatesData(resp.data.data);
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
    }else{
      setActiveDep(false)
    }
  }, [availableData, tourSettings]);

  const onChangeActive = () => {
setActiveDep(!activeDep)
  };

  //available from
  const [availableFromIDs, setAvailableFromIDs] = useState([]);

  useEffect(() => {
    setAvailableFromIDs(tourSettings.available_from);
    setTemplateSelected(tourSettings.voucher_template_id);
  }, [tourSettings]);

  //modal reserve page
  const [reserveModal, setReserveModal] = useState(false);

  // console.log("template id", tourSettings);
  //form creation

  // console.log('id',availableFromIDs)
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
        voucher_template_id: templateSelected,
        payment_request: activeDep === true ? 1 : 0
      };

      //console.log('data a enviar', data)

      putSettingsAPI(id, data)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data.status === 200) {
            triggerUpdate();
            Swal.fire("Edited!", "Settings has been created.", "success");
            toggle("3");
          }
        })
        .catch((error) => {
          let errorMessages = [];
          if (error.response.data.data) {
            Object.entries(error.response.data.data).map((item) =>
              errorMessages.push(item[1])
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
            String(errorMessages[0])
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
            <Col className="col-1 mb-3">
              <div className="form-outline mt-2">
                <Label className="form-label">Tour ID</Label>
                <Input
                  name="tour_id"
                  placeholder=""
                  type="text"
                  disabled
                  value={validationType.values.tour_id || ""}
                />
              </div>
            </Col>
            <Col className="col-1 mb-3">
              <div className="form-outline mt-2">
                <Label className="form-label">Tour Hash</Label>
                <Input
                  name="tour_hash"
                  placeholder=""
                  type="text"
                  disabled
                  value={tourSettings?.hash || ""}
                />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mt-2">
                <Label className="form-label">Provider Tour Name</Label>
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
                <Label className="form-label">Provider Tour URL</Label>
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
            <Col className="mb-2 col-2" style={{ paddingTop: "7px" }}>
              <div className="form-outline mb-2" id="voucher_currency">
                <Label className="form-label">Voucher Template</Label>
                <div className="input-group">
                  <Input
                    type="select"
                    name=""
                    onChange={(e) => {
                      setTemplateSelected(e.target.value);
                    }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option value="">Select....</option>
                    {map(templatesData, (template, index) => {
                      return (
                        <option
                          key={index}
                          value={template.voucher_template_id}
                          selected={
                            tourSettings && tourSettings.voucher_template_id
                              ? template.voucher_template_id ===
                                tourSettings.voucher_template_id
                              : false
                          }
                        >
                          {template.voucher_template}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </Col>
            <Col className="col-2">
              <Label className="form-label mt-2 mx-3">Payment Request</Label>
              <div className="form-check form-switch form-switch-md mt-1">
                <Switch
                  uncheckedIcon={<Offsymbol />}
                  checkedIcon={<OnSymbol />}
                  onColor="#3DC7F4"
                  onChange={(e) => onChangeActive(e)}
                  checked={activeDep}
                />
              </div>
            </Col>
          </Row>

          <Row>
            {tourSettings?.website_id !== 3 ? (
              <></>
            ) : (
              <>
                <Col className="col-1 d-flex align-items-center">
                  <Label className="form-label mb-0">Available From: </Label>
                </Col>

                {availableFromData.length > 0 ? (
                  <>
                    {map(availableFromData, (available, index) => {
                      return (
                        <Col key={index} className="col-2">
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
            <Col className="col-12">
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
                  AGE RANGES FOR PRICE TIERS
                </p>
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col className="col-md-4 col-12 px-xxl-5">
              <Label className="form-label">Infants</Label>
              <div className="d-flex align-items-center">
                <div className="input-group me-4">
                  <span className="input-group-text">From</span>
                  <Input
                    name="infants_range_from"
                    placeholder="Years"
                    type="number"
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
                    type="number"
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
            <Col className="col-md-4 col-12 px-xxl-5">
              <Label className="form-label">Kids</Label>
              <div className="d-flex align-items-center">
                <div className="input-group me-4">
                  <span className="input-group-text">From</span>
                  <Input
                    name="kids_range_from"
                    placeholder="Years"
                    type="number"
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
                    type="number"
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
            <Col className="col-md-4 col-12 px-xxl-5">
              <Label className="form-label">Teenagers</Label>
              <div className="d-flex align-items-center">
                <div className="input-group me-4">
                  <span className="input-group-text">From</span>
                  <Input
                    name="teenagers_range_from"
                    placeholder="Years"
                    type="number"
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
                    type="number"
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
                Continue
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
