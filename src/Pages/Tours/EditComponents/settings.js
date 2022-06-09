import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonsAPI, getAvailableFromAPI } from "../../../Utils/API/Tours";
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
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const Settings = ({ history, tourSettings, id }) => {
  // console.log(tourSettings);
  //get initial data tour types
  const dispatch = useDispatch();

  //seasons request
  const [seasonData, setSeasonData] = useState();
  useEffect(() => {
    getSeasonsAPI().then((resp) => {
      setSeasonData(resp.data.data);
    });
  }, []);
  //seasons request
  const [availableData, setAvailableData] = useState();
  useEffect(() => {
    getAvailableFromAPI().then((resp) => {
      setAvailableData(resp.data.data);
    });
  }, []);

  //form creation
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
        // cart_id: shoppingCartID,
        // website_id: websiteID,
        // type_id: tourTypeID,
        // category_id: mainCatID,
        // location_id: locationID,
        // provider_id: providerID,
        // operator_id: operatorID,
        // name: values.tour_name,
        // code: values.code,
      };
      console.log(data);
      //   createRol(data)
      //     .then((resp) => {
      //       console.log(resp.data);
      //       if (resp.data.status === 201) {
      //         Swal.fire(
      //           "Created!",
      //           "The Rol has been created.",
      //           "success"
      //         ).then(() => {
      //           history.goBack();
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.response);
      //       Swal.fire(
      //         "Error!",
      //         `${
      //           error.response.data.data[0]
      //         }`,
      //         "error"
      //       );
      //     });
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
      <TabPane tabId="1">
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
                    name="notification_email"
                    placeholder=""
                    type="checkbox"
                    className="form-check-input"
                    onChange={validationType.handleChange}
                    onBlur={validationType.handleBlur}
                    value={validationType.values.notification_email || ""}
                    invalid={
                      validationType.touched.notification_email &&
                      validationType.errors.notification_email
                        ? true
                        : false
                    }
                  />
                  {validationType.touched.notification_email &&
                  validationType.errors.notification_email ? (
                    <FormFeedback type="invalid">
                      {validationType.errors.notification_email}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col className="col-3">
                <div className="form-outline my-2">
                  <Label className="form-label">Available Seasons</Label>
                  <Input
                    type="select"
                    name=""
                    // disabled={operatorData ? false : true}
                    // onChange={(e) => {
                    //   setOperatorID(e.target.value);
                    // }}
                    onBlur={validationType.handleBlur}
                    //   value={validationType.values.department || ""}
                  >
                    <option>Select....</option>
                    {map(seasonData, (season, index) => {
                      return (
                        <option key={index} value={season.id}>
                          {season.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </Col>
              <Col className="col-2 d-flex justify-content-center ">
                <Label className="form-label mt-5">Available From: </Label>
              </Col>

              <Col className="d-flex">
                {map(availableData, (available, index) => {
                  return (
                    <Col key={index} className="">
                      <div className="form-check mt-5">
                        <input
                          name={available.name}
                          type="checkbox"
                          className="form-check-input"
                          // onChange={(e) => onChangeMembers(e)}
                          // checked={checked}
                        />

                        <Label className="form-label">{available.name}</Label>
                      </div>
                    </Col>
                  );
                })}
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
