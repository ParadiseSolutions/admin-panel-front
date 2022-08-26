import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeasonsAPI,
  getAvailableFromAPI,
  putSettingsAPI,
  getAvailableAPI,
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
// import classnames from "classnames";

// import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";
import { Select } from "antd";
const { Option } = Select;

const Settings = ({ history, tourSettings, id }) => {
  console.log("settings", tourSettings);

  //seasons request
  const [seasonData, setSeasonData] = useState();
  useEffect(() => {
    getSeasonsAPI().then((resp) => {
      setSeasonData(resp.data.data);
    });
  }, []);
  //seasons request
  const [availableData, setAvailableData] = useState([]);
  const [availableFromData, setAvailableFormData] = useState([])
  useEffect(() => {
    getAvailableFromAPI().then((resp) => {
      setAvailableData(resp.data.data);
    });
    getAvailableAPI().then((resp) => {
      setAvailableFormData(resp.data.data);
    });
  }, []);
  const [initialOptionsArea, setInitialOptionsArea] = useState([]);
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
      setInitialOptionsArea(optionsArea);
    }
  }, [availableData, tourSettings]);

  //season select
  const [seasonSelected, setSeasonSelected] = useState(
    tourSettings.available_seasons
  );
  function handleMulti(selected) {
    setSeasonSelected(selected);
  }

  //available from
  const [availableFromIDs, setAvailableFromIDs] = useState([]);
  useEffect(() => {
    setAvailableFromIDs(tourSettings.available_from);
  }, [tourSettings]);

  //seasonal price
  const [seasonalPrice, setSeasonalPrice] = useState(null);
  useEffect(() => {
    setSeasonalPrice(
      tourSettings?.seasonality && tourSettings.seasonality === 1 ? true : false
    );
  }, [tourSettings]);
  //form creation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tour_id: id,
      provider_tour_name: tourSettings.provider_tour_name
        ? tourSettings.provider_tour_name
        : "",
      available_seasons: tourSettings.available_seasons,
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
        available_seasons: seasonSelected,
        available_from: availableFromIDs,
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
        seasonality: seasonalPrice === true ? 1 : 0,
      };

      putSettingsAPI(id, data)
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "Settings has been created.", "success");
          }
        })
        .catch((error) => {
          console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validationType.handleSubmit();
        return false;
      }}
      className="custom-validation"
    >
      <TabPane tabId="1" className="">
        <Row xl={12} className=" d-flex justify-content-between pb-4 ">
          <Col className="col-4">
            <img
              src={SettingsImageThree}
              alt="image1"
              style={{ width: "480px", height: "146px" }}
            />
          </Col>
          <Col className="col-4">
            <img
              src={SettingsImageOne}
              alt="image1"
              style={{ width: "480px", height: "146px" }}
            />
          </Col>
          <Col className="col-4">
            <img
              src={SettingsImageTwo}
              alt="image1"
              style={{ width: "480px", height: "146px" }}
            />
          </Col>
        </Row>

        <Row xl={12}>
          <Row className="col-12 p-1" style={{ backgroundColor: "#E9F4FF" }}>
            <p
              className="py-2"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#495057",
                marginBottom: "0px",
              }}
            >
              TOUR SETTINGS
            </p>
          </Row>
          <Row className="col-12 d-flex justify-content-start">
            <Row>
              <Col className="col-1">
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
              <Col className="col-6">
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
              <Col className="col-5">
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
            </Row>
          </Row>
          <Row className="col-12 d-flex justify-content-start">
            <Row>
              <Col className="col-1">
                <Label className="form-label mt-2">Seasonal Prices</Label>
                <div className="form-check form-switch form-switch-md mx-4 ">
                  <Input
                    name="seasonality"
                    placeholder=""
                    type="checkbox"
                    checked={seasonalPrice}
                    className="form-check-input"
                    onChange={() => setSeasonalPrice(!seasonalPrice)}
                    onBlur={validationType.handleBlur}
                    value={seasonalPrice}
                    invalid={
                      validationType.touched.seasonality &&
                      validationType.errors.seasonality
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.seasonality &&
                  validationType.errors.seasonality ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.seasonality}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-outline my-2">
                  <Label className="form-label">Available Seasons</Label>

                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%", paddingTop: "5px" }}
                    placeholder="Please select"
                    defaultValue={initialOptionsArea}
                    onChange={handleMulti}
                  >
                    {map(availableData, (item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </Col>
              <Col className="col-2 d-flex justify-content-center ">
                <Label className="form-label mt-5">Available From: </Label>
              </Col>

              <Col className="d-flex">
                {availableFromData.length > 0 ? (
                  <>
                    {map(availableFromData, (available, index) => {
                      return (
                        <Col key={index} className="">
                          <div className="form-check mt-5">
                            <AvailableCheckbox
                              available={available}
                              availableFromIDs={availableFromIDs}
                              setAvailableFromIDs={setAvailableFromIDs}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </>
                ) : null}
              </Col>
            </Row>
          </Row>
          <Row className="col-12 p-1" style={{ backgroundColor: "#FFEFDE" }}>
            <p
              className="py-2"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#495057",
                marginBottom: "0px",
              }}
            >
              AGES
            </p>
          </Row>
          <Row className="col-12 d-flex justify-content-start mt-4">
            <Row>
              <Col className="d-flex col-4 ">
                <Col className="col-2">
                  <Label className="form-label">Infants</Label>
                </Col>
                <Col className="col-3 mx-2">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="From" type="text" disabled />
                    <Input
                      name="infants_range_from"
                      placeholder=""
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
                </Col>
                <Col className="col-3 mx-4">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="To" type="text" disabled />
                    <Input
                      name="infants_range_to"
                      placeholder=""
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
                </Col>
              </Col>
              <Col className="d-flex col-4 ">
                <Col className="col-2">
                  <Label className="form-label">Kids</Label>
                </Col>
                <Col className="col-3 mx-2">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="From" type="text" disabled />
                    <Input
                      name="kids_range_from"
                      placeholder=""
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
                </Col>
                <Col className="col-3 mx-4">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="To" type="text" disabled />
                    <Input
                      name="kids_range_to"
                      placeholder=""
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
                </Col>
              </Col>
              <Col className="d-flex col-4 ">
                <Col className="col-2">
                  <Label className="form-label">Teenagers</Label>
                </Col>
                <Col className="col-3 mx-2">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="From" type="text" disabled />
                    <Input
                      name="teenagers_range_from"
                      placeholder=""
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
                </Col>
                <Col className="col-3 mx-4">
                  <div className="form-outline d-flex mt-2">
                    <Input name="" placeholder="To" type="text" disabled />
                    <Input
                      name="teenagers_range_to"
                      placeholder=""
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
                </Col>
              </Col>
            </Row>
          </Row>

          <Row
            className="col-12 d-flex justify-content-end mt-5"
            style={{ paddingRight: "30px" }}
          >
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light col-2 mx-4"
              type="button"
              onClick={() => history.goBack()}
            >
              <i className="uil-angle-double-left" />
              Back
            </Button>
            <Button
              style={{ backgroundColor: "#F6851F" }}
              type="submit"
              className="font-16 btn-block col-2"
              // onClick={toggleCategory}
            >
              Continue
              <i className="uil-angle-double-right mx-1 " />
            </Button>
          </Row>
        </Row>
      </TabPane>
    </Form>
  );
};

export default Settings;
