import { useEffect, useState } from "react";
import { getProviderAPI, updateProviderAPI } from "../../../Utils/API/Providers";
import {
  Collapse,
  Form,
  Row,
  Input,
  Label,
  Col,
  FormFeedback,
  Button,
} from "reactstrap";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom'

const EditGeneralInformation = ({data}) => {
  //initial info
  const [initialData, setInitialData] = useState({})
  
  useEffect(() => {
    setInitialData(data)
  }, [data]);

  // console.log(initialData)
  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: initialData ? initialData.name : '',
      legal_name: initialData ? initialData.legal_name: '',
      code: initialData ? initialData.code : '',
      address1: initialData ? initialData.address1 : '',
      address2: initialData ? initialData.address2 : '',
      city: initialData ? initialData.city : '',
      state: initialData ? initialData.state : '',
      zip: initialData ? initialData.zip : '',
      country: initialData ? initialData.country : '',
      website_url: initialData ? initialData.website_url : '',
      reservation_email: initialData ? initialData.reservation_email : '',
      cc_email: initialData ? initialData.cc_email : '',
      // notification_email: initialData ? initialData.cc_email : '',
      description: initialData ? initialData.description : '',
      
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      code: Yup.string()
        .required("Code is required")
        .max(3, "Must be exactly 3 chars")
        .required("Max 3 chars"),
    }),
    onSubmit: (values) => {
      console.log(values);
      let data = {
        name: values.name ? values.name : '',
        legal_name: values.legal_name ? values.legal_name : '',
        code: values.code ? values.code : '',
        address1: values.address1 ? values.address1 : '',
        address2: values.address2 ? values.address2 : '',
        city: values.city ? values.city : '',
        state: values.state ? values.state : '',
        zip: values.zip ? values.zip : '',
        country: values.country ? values.country : '',
        website_url: values.website_url ? values.website_url : '',
        reservation_email: values.reservation_email ? values.reservation_email : '',
        cc_email: values.cc_email ? values.cc_email : '',
        notification_email: values.notification_email && values.notification_email === true ? 1 : 0,
        description: values.description ? values.description : '',
        
        };
     
        updateProviderAPI(initialData.id, data)
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.status === 200) {
              Swal.fire(
                "Edited!",
                "General Information has been edited.",
                "success"
              ).then(() => {
               
              });
            }
          })
          .catch((error) => {
            console.log(error.response);
            Swal.fire(
              "Error!",
              `${
                error.response.data.data.name
                  ? error.response.data.data.name
                  : error.response.data.data.code
              }`,
              "error"
            );
          });
    },
  });

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col1,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            General Information
          </button>
        </h2>
        <Collapse id="collapseOne" className="accordion-collapse" isOpen={col1}>
          <div className="accordion-body">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validationType.handleSubmit();
                return false;
              }}
              className="custom-validation"
            >
              <Row>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.name || ""}
                      invalid={
                        validationType.touched.name &&
                        validationType.errors.name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.name &&
                    validationType.errors.name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Legal Name</Label>
                    <Input
                      name="legal_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.legal_name || ""}
                      invalid={
                        validationType.touched.legal_name &&
                        validationType.errors.legal_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.legal_name &&
                    validationType.errors.legal_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.legal_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">2-Digit Code</Label>
                    <Input
                      name="code"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.code || ""}
                      invalid={
                        validationType.touched.code &&
                        validationType.errors.code
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.code &&
                    validationType.errors.code ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.code}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Address Line 1</Label>
                    <Input
                      name="address1"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.address1 || ""}
                      invalid={
                        validationType.touched.address1 &&
                        validationType.errors.address1
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.address1 &&
                    validationType.errors.address1 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.address1}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Address Line 2</Label>
                    <Input
                      name="address2"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.address2 || ""}
                      invalid={
                        validationType.touched.address2 &&
                        validationType.errors.address2
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.address2 &&
                    validationType.errors.address2 ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.address2}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-check form-switch form-switch-md mt-4">
                    <Label className="form-label">Notification Email</Label>
                    <Input
                      name="notification_email"
                      placeholder=""
                      type="checkbox"
                      className="form-check-input"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.notification_email || ""}
                      // defaultChecked={initialData.notification_email === 1 ? true : false}
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
              </Row>
              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">City</Label>
                    <Input
                      name="city"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.city || ""}
                      invalid={
                        validationType.touched.city &&
                        validationType.errors.city
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.city &&
                    validationType.errors.city ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.city}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">State/Province/Region</Label>
                    <Input
                      name="state"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.state || ""}
                      invalid={
                        validationType.touched.state &&
                        validationType.errors.state
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.state &&
                    validationType.errors.state ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.state}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">ZIP/Postal Code</Label>
                    <Input
                      name="zip"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.zip || ""}
                      invalid={
                        validationType.touched.zip &&
                        validationType.errors.zip
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.zip &&
                    validationType.errors.zip ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.zip}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Country</Label>
                    <Input
                      name="country"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.country || ""}
                      invalid={
                        validationType.touched.country &&
                        validationType.errors.country
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.country &&
                    validationType.errors.country ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.country}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Email</Label>
                    <Input
                      name="email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.email || ""}
                      invalid={
                        validationType.touched.email &&
                        validationType.errors.email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.email &&
                    validationType.errors.email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Reservation Email</Label>
                    <Input
                      name="reservation_email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.reservation_email || ""}
                      invalid={
                        validationType.touched.reservation_email &&
                        validationType.errors.reservation_email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.reservation_email &&
                    validationType.errors.reservation_email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.reservation_email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">CC Email</Label>
                    <Input
                      name="cc_email"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.cc_email || ""}
                      invalid={
                        validationType.touched.cc_email &&
                        validationType.errors.cc_email
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.cc_email &&
                    validationType.errors.cc_email ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.cc_email}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Phone</Label>
                    <Input
                      name="phone"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.phone || ""}
                      invalid={
                        validationType.touched.phone &&
                        validationType.errors.phone
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.phone &&
                    validationType.errors.phone ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">WhatsApp</Label>
                    <Input
                      name="whatsapp"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.whatsapp || ""}
                      invalid={
                        validationType.touched.whatsapp &&
                        validationType.errors.whatsapp
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.whatsapp &&
                    validationType.errors.whatsapp ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.whatsapp}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Website URL</Label>
                    <Input
                      name="website_url"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.website_url || ""}
                      invalid={
                        validationType.touched.website_url &&
                        validationType.errors.website_url
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.website_url &&
                    validationType.errors.website_url ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.website_url}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="col-12">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Provider Description</Label>
                    <Input
                      name="description"
                      placeholder=""
                      type="textarea"
                      rows="5"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.description || ""}
                      invalid={
                        validationType.touched.description &&
                        validationType.errors.description
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.description &&
                    validationType.errors.description ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.description}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className=" d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#F6851F", border: "none" }}
                    className="waves-effect waves-light mb-3 btn btn-success"
                  >
                    <i className="mdi mdi-plus me-1" />
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Collapse>
      </div>
      
    </div>
  );
};

export default EditGeneralInformation;
