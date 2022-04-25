import { useState } from "react";
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

const GeneralInformation = () => {
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  function togglecol1() {
    setcol1(!col1);
    setcol2(false);
    setcol3(false);
  }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
      members: [],
      modules: [],
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
        name: values.name,
        code: values.code,
      };
      //   createDepartment(data)
      //     .then((resp) => {
      //       console.log(resp.data);
      //       if (resp.data.status === 201) {
      //         Swal.fire(
      //           "Created!",
      //           "The department has been created.",
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
      //           error.response.data.data.name
      //             ? error.response.data.data.name
      //             : error.response.data.data.code
      //         }`,
      //         "error"
      //       );
      //     });
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
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Legal Name</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-outline mb-2">
                    <Label className="form-label">2-Digit Code</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
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
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Address Line 2</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-2">
                  <div className="form-check form-switch form-switch-md mt-4">
                    <Label className="form-label">Notification Email</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="checkbox"
                      className="form-check-input"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
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
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">State/Province/Region</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">ZIP/Postal Code</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Country</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
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
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Reservation Email</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">CC Email</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Phone</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
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
                      name="first_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-3">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Website URL</Label>
                    <Input
                      name="last_name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.last_name || ""}
                      invalid={
                        validationType.touched.last_name &&
                        validationType.errors.last_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.last_name &&
                    validationType.errors.last_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.last_name}
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
                      name="first_name"
                      placeholder=""
                      type="textarea"
                      rows="5"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.first_name || ""}
                      invalid={
                        validationType.touched.first_name &&
                        validationType.errors.first_name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.first_name &&
                    validationType.errors.first_name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.first_name}
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
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col2,
            })}
            type="button"
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Contacts
          </button>
        </h2>
        <Collapse id="collapseTwo" className="accordion-collapse" isOpen={col2}>
          <div className="accordion-body"></div>
        </Collapse>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col3,
            })}
            type="button"
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Social Media
          </button>
        </h2>
        <Collapse
          id="collapseThree"
          className="accordion-collapse"
          isOpen={col3}
        >
          <div className="accordion-body"></div>
        </Collapse>
      </div>
    </div>
  );
};

export default GeneralInformation;
