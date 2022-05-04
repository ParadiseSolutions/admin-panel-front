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

const SocialMedia = ({data}) => {
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
            Social Media Profiles
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
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Facebook</Label>
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
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Instagram</Label>
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
                
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Youtube</Label>
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
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Twitter</Label>
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
               
              </Row>
              <Row>
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">TripAdvisor</Label>
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
                <Col className="col-6">
                  <div className="form-outline mb-2">
                    <Label className="form-label">Yelp</Label>
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

export default SocialMedia;
